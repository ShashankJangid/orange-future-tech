import re
import json
import time
import urllib.request
import urllib.parse
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
from db import get_db, log_action

class TelegramApprover:
    """Pre-flight error checker and Telegram interactive approval system for client outreach."""

    @staticmethod
    def perform_preflight_checks(company_name: str, recipient_email: str, subject: str, html_body: str) -> dict:
        """Scans email draft for errors, template bugs, and spam flags before sending."""
        errors = []
        warnings = []

        # 1. Email format check
        email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        if not re.match(email_regex, recipient_email):
            errors.append(f"Invalid recipient email format: '{recipient_email}'")

        # 2. Template variable check
        for placeholder in ["None", "undefined", "{company}", "{score}", "[object Object]"]:
            if placeholder in subject or placeholder in html_body:
                errors.append(f"Unreplaced template placeholder detected: '{placeholder}'")

        # 3. Subject length and spam check
        if not subject or len(subject.strip()) == 0:
            errors.append("Email subject line is empty.")
        elif subject.isupper():
            warnings.append("Subject is in ALL CAPS (may trigger spam filters).")

        # 4. Body content check
        if not html_body or len(html_body.strip()) < 50:
            errors.append("HTML body is suspiciously short or empty.")

        passed = len(errors) == 0
        return {
            "passed": passed,
            "errors": errors,
            "warnings": warnings,
            "status_label": "✅ PASSED (0 Errors)" if passed else f"❌ FAILED ({len(errors)} Error(s))"
        }

    @classmethod
    def request_approval(cls, company_name: str, recipient_email: str, subject: str, html_body: str, report_path: str = None) -> dict:
        """Runs pre-flight check, saves approval request in DB, and sends Telegram alert."""
        check_result = cls.perform_preflight_checks(company_name, recipient_email, subject, html_body)
        
        # Save to DB
        conn = get_db()
        cursor = conn.cursor()
        created_at = time.strftime("%Y-%m-%dT%H:%M:%S")
        
        cursor.execute('''
            INSERT INTO leads (company_name, website, email, report_path, status, created_at)
            VALUES (?, ?, ?, ?, 'PENDING_APPROVAL', ?)
            ON CONFLICT(website) DO UPDATE SET
                email=excluded.email,
                status='PENDING_APPROVAL'
        ''', (company_name, f"https://{recipient_email.split('@')[-1]}", recipient_email, report_path, created_at))
        conn.commit()

        cursor.execute("SELECT id FROM leads WHERE email = ? ORDER BY id DESC LIMIT 1", (recipient_email,))
        row = cursor.fetchone()
        lead_id = row["id"] if row else 1
        conn.close()

        # Format Telegram Message
        error_details = ""
        if check_result["errors"]:
            error_details = "\n⚠️ *ERRORS DETECTED*:\n" + "\n".join(f"• {e}" for e in check_result["errors"])
        
        warning_details = ""
        if check_result["warnings"]:
            warning_details = "\n⚡ *WARNINGS*:\n" + "\n".join(f"• {w}" for w in check_result["warnings"])

        body_snippet = re.sub('<[^<]+?>', '', html_body)[:150].strip().replace('\n', ' ')

        telegram_msg = (
            f"🛑 *PRE-OUTREACH APPROVAL REQUIRED* (Lead ID: `#{lead_id}`)\n\n"
            f"• *Client*: {company_name}\n"
            f"• *Recipient*: `{recipient_email}`\n"
            f"• *Subject*: {subject}\n"
            f"• *Pre-Flight Diagnostic*: {check_result['status_label']}"
            f"{error_details}"
            f"{warning_details}\n\n"
            f"📋 *Body Preview*:\n_{body_snippet}..._\n\n"
            f"--- *REPLY TO APPROVE / REJECT* ---\n"
            f"✅ Reply `/approve_{lead_id}` to authorize send\n"
            f"❌ Reply `/reject_{lead_id}` to reject outreach"
        )

        from notifier import Notifier
        Notifier.send_telegram_alert(telegram_msg)
        log_action("TelegramApprover", "REQUEST_APPROVAL", recipient_email, "PENDING", {"lead_id": lead_id, "check": check_result})

        return {"lead_id": lead_id, "check": check_result}

    @classmethod
    def poll_approval_from_telegram(cls, lead_id: int) -> str:
        """Polls Telegram updates to check if owner approved or rejected lead_id."""
        if not TELEGRAM_BOT_TOKEN:
            return "AUTO_APPROVED"

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=5) as res:
                data = json.loads(res.read().decode("utf-8"))
                updates = data.get("result", [])
                for update in updates:
                    msg_text = update.get("message", {}).get("text", "").strip()
                    if f"/approve_{lead_id}" in msg_text or msg_text.lower() in [f"approve {lead_id}", f"yes {lead_id}"]:
                        cls.set_lead_status(lead_id, "APPROVED")
                        return "APPROVED"
                    elif f"/reject_{lead_id}" in msg_text or msg_text.lower() in [f"reject {lead_id}", f"no {lead_id}"]:
                        cls.set_lead_status(lead_id, "REJECTED")
                        return "REJECTED"
        except Exception as e:
            print(f"--> [TELEGRAM APPROVER] Error checking updates: {e}")

        # Check DB status
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT status FROM leads WHERE id = ?", (lead_id,))
        row = cursor.fetchone()
        conn.close()

        if row and row["status"] in ["APPROVED", "REJECTED"]:
            return row["status"]

        return "PENDING"

    @staticmethod
    def set_lead_status(lead_id: int, status: str):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("UPDATE leads SET status = ? WHERE id = ?", (status, lead_id))
        conn.commit()
        conn.close()
        log_action("TelegramApprover", "SET_STATUS", str(lead_id), status)

if __name__ == "__main__":
    res = TelegramApprover.request_approval("Test Client", "test@example.com", "Proposal for Test Client", "<h1>Hello World</h1><p>Test proposal body</p>")
    print("Approval Requested:", res)
