import os
import json
import smtplib
import urllib.request
import urllib.error
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import RESEND_API_KEY
from db import log_action
from notifier import Notifier

HOSTINGER_API_TOKEN = os.getenv("HOSTINGER_API_TOKEN", "57aae8293805f0e9d7424cfe755455df5fb7c4191030d1747b5086611f5facdf")
HOSTINGER_MAILBOX_ID = os.getenv("HOSTINGER_MAILBOX_ID", "AC6b561e5b00e0bde3a92a445b3c1a")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "teams@orangefuturetech.com")

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")

class ColdOutreachEngine:
    """Populates branded email templates and dispatches cold audit outreach."""

    @staticmethod
    def send_outreach_email(company_name: str, target_email: str, audit_data: dict, report_path: str = None):
        log_action("ColdOutreach", "DISPATCH_START", target_email, "IN_PROGRESS")
        
        score = audit_data.get("score", 70)
        bugs = audit_data.get("issues", [])
        top_bug = bugs[0]["title"] if bugs else "Page speed bottlenecks"

        subject = f"Technical Audit Summary for {company_name} - Quick Feedback"

        html_body = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Technical Proposal - Orange Future Tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; max-width: 600px; width: 100%;">
          <tr>
            <td style="background-color: #0b0f17; padding: 24px 40px; border-bottom: 4px solid #ff6b00;">
              <span style="font-size: 22px; font-weight: 800; color: #ffffff;">ORANGE <span style="color: #ff6b00;">FUTURE</span> TECH</span>
              <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 4px;">Software Engineering &amp; Electronics Solutions</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Technical Health Audit: {company_name}</h1>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">Dear <strong>{company_name} Engineering Team</strong>,</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                Our automated engineering scanner completed a performance &amp; technical check for your web infrastructure. Overall technical health score: <strong>{score}/100</strong>.
              </p>
              
              <div style="background-color: #fff7ed; border-left: 4px solid #ff6b00; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #c2410c; text-transform: uppercase;">KEY DIAGNOSTIC FINDING</div>
                <div style="font-size: 13px; color: #9a3412; margin-top: 4px;">Detected: <strong>{top_bug}</strong>. Addressing this can improve user retention by up to 35%.</div>
              </div>

              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #ff6b00;">
                    <a href="https://orangefuturetech.com/portal" target="_blank" style="font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block;">View Complete Audit &amp; Schedule Call &rarr;</a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; color: #334155;">Best regards,</p>
              <div style="font-size: 15px; font-weight: 700; color: #0f172a;">Engineering &amp; Solutions Team</div>
              <div style="font-size: 13px; color: #ff6b00; font-weight: 600;">Orange Future Tech</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>'''

        # Method 1: Hostinger Agentic Mail REST API (Official Domain teams@orangefuturetech.com)
        if HOSTINGER_API_TOKEN and HOSTINGER_MAILBOX_ID:
            try:
                url = f"https://api.mail.hostinger.com/api/v1/mailboxes/{HOSTINGER_MAILBOX_ID}/send"
                payload = json.dumps({
                    "to": [target_email],
                    "displayName": "Orange Future Tech",
                    "subject": subject,
                    "html": html_body
                }).encode("utf-8")

                req = urllib.request.Request(
                    url,
                    data=payload,
                    headers={
                        "Authorization": f"Bearer {HOSTINGER_API_TOKEN}",
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
                    }
                )
                res = urllib.request.urlopen(req, timeout=10)
                if res.getcode() in [200, 204]:
                    log_action("ColdOutreach", "DISPATCH_HOSTINGER_AGENTIC_API", target_email, "SUCCESS")
                    Notifier.alert_email_sent(company_name, target_email, report_path)
                    return True
            except Exception as e:
                log_action("ColdOutreach", "DISPATCH_HOSTINGER_FAILED", target_email, "ERROR", {"error": str(e)})

        # Method 2: Standard SMTP Fallback
        if SMTP_USER and SMTP_PASS:
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = subject
                msg["From"] = f"Orange Future Tech <{SENDER_EMAIL}>"
                msg["Reply-To"] = SENDER_EMAIL
                msg["To"] = target_email
                msg.attach(MIMEText(html_body, "html"))

                with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                    server.starttls()
                    server.login(SMTP_USER, SMTP_PASS)
                    server.sendmail(SMTP_USER, target_email, msg.as_string())

                log_action("ColdOutreach", "DISPATCH_REAL_SMTP", target_email, "SUCCESS")
                Notifier.alert_email_sent(company_name, target_email, report_path)
                return True
            except Exception as e:
                log_action("ColdOutreach", "DISPATCH_SMTP_FAILED", target_email, "ERROR", {"error": str(e)})

        # Method 3: Resend API Fallback
        if RESEND_API_KEY and len(RESEND_API_KEY) > 5 and RESEND_API_KEY != "your_resend_api_key_here":
            try:
                payload = json.dumps({
                    "from": f"Orange Future Tech <{SENDER_EMAIL}>",
                    "to": [target_email],
                    "subject": subject,
                    "html": html_body
                }).encode("utf-8")

                req = urllib.request.Request(
                    "https://api.resend.com/emails",
                    data=payload,
                    headers={
                        "Authorization": f"Bearer {RESEND_API_KEY}",
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0"
                    }
                )
                res = urllib.request.urlopen(req, timeout=10)
                log_action("ColdOutreach", "DISPATCH_REAL_RESEND", target_email, "SUCCESS")
                Notifier.alert_email_sent(company_name, target_email, report_path)
                return True
            except Exception as e:
                log_action("ColdOutreach", "DISPATCH_RESEND_FAILED", target_email, "ERROR", {"error": str(e)})

        log_action("ColdOutreach", "SIMULATED_DISPATCH", target_email, "SUCCESS")
        return False

if __name__ == "__main__":
    ColdOutreachEngine.send_outreach_email("Shipmate Logistics", "sjangidji@gmail.com", {"score": 95, "issues": [{"title": "Sub-millisecond API & Cloud Database Architecture"}]})
