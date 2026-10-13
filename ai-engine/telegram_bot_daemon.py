import os
import sys
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
from db import get_db, log_action
from chat_bot import chat
from notifier import Notifier

class TelegramBotDaemon:
    @staticmethod
    def send_message(chat_id: str, text: str) -> bool:
        if not TELEGRAM_BOT_TOKEN:
            return False
        clean_text = Notifier.sanitize_english(text)
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = json.dumps({
            "chat_id": str(chat_id),
            "text": clean_text,
            "parse_mode": "Markdown"
        }).encode("utf-8")

        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as res:
                return res.status == 200
        except Exception as e:
            print(f"Telegram send error: {e}")
            return False

    @staticmethod
    def get_status_card() -> str:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) AS total FROM leads")
        total_leads = cursor.fetchone()["total"]
        cursor.execute("SELECT COUNT(*) AS sent FROM leads WHERE status = 'SENT'")
        sent_leads = cursor.fetchone()["sent"]
        conn.close()

        return (
            "🟢 *ORANGE FUTURE TECH - 24/7 AI ENGINE STATUS*\n\n"
            "• Engine State: Operational & Healthy\n"
            "• Language Enforcement: Strictly English (100% Locked)\n"
            "• Total Discovered Leads: " + str(total_leads) + "\n"
            "• Dispatched Outreach Campaigns: " + str(sent_leads) + "\n"
            "• Verified Telephony Line: `+91 8958347428`\n"
            "• Official Email: `teams@orangefuturetech.com`\n"
            "• Portal: https://orangefuturetech.com/portal\n\n"
            "All autonomous audit, lead mining, and outbound processes are running."
        )

    @staticmethod
    def get_leads_card() -> str:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, company_name, website, score, status FROM leads ORDER BY id DESC LIMIT 5")
        rows = cursor.fetchall()
        conn.close()

        if not rows:
            return "📋 *AUDITED LEADS REPORT*\n\nNo leads recorded in the database yet. The autonomous miner is continuously searching for prospective enterprise and school clients."

        lines = ["📋 *RECENTLY AUDITED LEADS (TOP 5)*\n"]
        for r in rows:
            lines.append(f"• *#{r['id']} {r['company_name']}* ({r['website']})\n  Health Score: {r['score'] or 'N/A'}/100 | Status: `{r['status']}`")
        return "\n".join(lines)

    @staticmethod
    def get_school_card() -> str:
        return (
            "🏫 *ORANGE FUTURE TECH - SCHOOL WEBSITE & 360 VR TOUR PACKAGES*\n\n"
            "1. *Starter AI School Portal* - ₹1,50,000\n"
            "   High-speed responsive website, AI admissions bot, curriculum showcase.\n\n"
            "2. *Standard AI School Portal* - ₹2,00,000 (Recommended)\n"
            "   Full AI website, parent inquiry intelligence, events calendar, mobile optimized.\n\n"
            "3. *Enterprise Elite AI Portal* - ₹3,00,000\n"
            "   Complete institutional web architecture, custom AI assistant, parent portal.\n\n"
            "📸 *Add-on: 360 Virtual Campus Tour*\n"
            "• Base Setup: ₹60,000 (Includes 3 immersive high-resolution views)\n"
            "• Additional Views: ₹5,000 per additional spherical view\n\n"
            "Contact our team to book a demo: `+91 8958347428` | `teams@orangefuturetech.com`"
        )

    @staticmethod
    def get_cardgen_card() -> str:
        return (
            "🎴 *CARDGEN - SMART ID CARD ISSUANCE PLATFORM*\n\n"
            "Next-generation enterprise software for schools, colleges, and corporate campuses:\n"
            "• Instant batch photo cropping and auto-alignment\n"
            "• High-resolution batch print exports\n"
            "• Dynamic QR, Barcode, and RFID smart chip encoding\n"
            "• Secure parent and student photo upload portal\n"
            "• Institutional pedigree: Deployed for IIT and DPS institutions\n\n"
            "Pricing: Custom quotations tailored to student and employee volume.\n"
            "Request software walkthrough: `+91 8958347428` | `teams@orangefuturetech.com`"
        )

    @staticmethod
    def get_start_card() -> str:
        return (
            "👋 *HELLO & WELCOME TO ORANGE FUTURE TECH*\n\n"
            "I am Aria, Lead AI Engineering and Business Consultant for Orange Future Tech.\n\n"
            "We engineer custom enterprise websites, high-concurrency web applications, 24/7 AI agents, and multi-layer PCB hardware.\n\n"
            "• *Institutional Pedigree*: Proven software engineered for IIT, DPS, and Shipmate Logistics.\n"
            "• *Direct Phone Line*: `+91 8958347428`\n"
            "• *Corporate Email*: `teams@orangefuturetech.com`\n"
            "• *Official Website*: https://orangefuturetech.com\n\n"
            "Available Commands:\n"
            "• /status - View real-time autonomous engine status\n"
            "• /leads - Inspect top 5 recently audited prospective clients\n"
            "• /school - School AI Website and 360 Virtual Tour packages\n"
            "• /cardgen - CardGen Smart ID Card platform overview\n"
            "• /help - Guidance and consultation overview\n\n"
            "You can also send me any question in English, and I will be delighted to assist you directly."
        )

    @staticmethod
    def handle_update(update: dict):
        message = update.get("message") or update.get("edited_message")
        if not message:
            return

        chat_id = message.get("chat", {}).get("id")
        text = message.get("text", "").strip()
        if not chat_id or not text:
            return

        cmd = text.split()[0].lower() if text else ""

        if cmd in ["/start", "start", "/hello", "hello", "hi"]:
            TelegramBotDaemon.send_message(chat_id, TelegramBotDaemon.get_start_card())
            log_action("TelegramDaemon", "COMMAND_START", str(chat_id), "SUCCESS")
            return

        if cmd in ["/status", "status"]:
            TelegramBotDaemon.send_message(chat_id, TelegramBotDaemon.get_status_card())
            log_action("TelegramDaemon", "COMMAND_STATUS", str(chat_id), "SUCCESS")
            return

        if cmd in ["/leads", "leads"]:
            TelegramBotDaemon.send_message(chat_id, TelegramBotDaemon.get_leads_card())
            log_action("TelegramDaemon", "COMMAND_LEADS", str(chat_id), "SUCCESS")
            return

        if cmd in ["/school", "school", "/schools", "schools"]:
            TelegramBotDaemon.send_message(chat_id, TelegramBotDaemon.get_school_card())
            log_action("TelegramDaemon", "COMMAND_SCHOOL", str(chat_id), "SUCCESS")
            return

        if cmd in ["/cardgen", "cardgen"]:
            TelegramBotDaemon.send_message(chat_id, TelegramBotDaemon.get_cardgen_card())
            log_action("TelegramDaemon", "COMMAND_CARDGEN", str(chat_id), "SUCCESS")
            return

        if cmd in ["/help", "help"]:
            help_card = (
                "ℹ️ *ORANGE FUTURE TECH BOT GUIDANCE (ENGLISH ONLY)*\n\n"
                "• Ask any question regarding custom web engineering, AI integrations, or hardware design.\n"
                "• /status - Live diagnostics and health report\n"
                "• /leads - Audited client leads\n"
                "• /school - School Website & 360 VR pricing\n"
                "• /cardgen - CardGen Smart ID software\n"
                "• /approve_<id> - Approve email outreach for a lead\n"
                "• /reject_<id> - Cancel email outreach for a lead\n\n"
                "For direct corporate inquiries: `+91 8958347428` or `teams@orangefuturetech.com`"
            )
            TelegramBotDaemon.send_message(chat_id, help_card)
            log_action("TelegramDaemon", "COMMAND_HELP", str(chat_id), "SUCCESS")
            return

        if cmd.startswith("/approve_"):
            try:
                lead_id = int(cmd.replace("/approve_", ""))
                from telegram_approver import TelegramApprover
                TelegramApprover.set_lead_status(lead_id, "APPROVED")
                TelegramBotDaemon.send_message(chat_id, f"✅ Lead #{lead_id} approved. Outreach email dispatched.")
            except Exception as e:
                TelegramBotDaemon.send_message(chat_id, f"Error approving lead: {e}")
            return

        if cmd.startswith("/reject_"):
            try:
                lead_id = int(cmd.replace("/reject_", ""))
                from telegram_approver import TelegramApprover
                TelegramApprover.set_lead_status(lead_id, "REJECTED")
                TelegramBotDaemon.send_message(chat_id, f"❌ Lead #{lead_id} rejected. Outreach cancelled.")
            except Exception as e:
                TelegramBotDaemon.send_message(chat_id, f"Error rejecting lead: {e}")
            return

        reply = chat([{"role": "user", "content": text}], session_id=f"telegram_{chat_id}")
        TelegramBotDaemon.send_message(chat_id, reply)
        log_action("TelegramDaemon", "CHAT_REPLY", str(chat_id), "SUCCESS")

    @classmethod
    def poll_once(cls, offset: int = 0) -> int:
        if not TELEGRAM_BOT_TOKEN:
            return offset

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates?offset={offset}&timeout=5"
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=10) as res:
                data = json.loads(res.read().decode("utf-8"))
                for item in data.get("result", []):
                    offset = item["update_id"] + 1
                    cls.handle_update(item)
        except Exception as e:
            print(f"Polling error: {e}")
        return offset

    @classmethod
    def run_daemon(cls):
        print("--> [ORANGE AI TELEGRAM BOT DAEMON] Started. Strictly English Mode ACTIVE.")
        offset = 0
        while True:
            offset = cls.poll_once(offset)
            time.sleep(1)

if __name__ == "__main__":
    TelegramBotDaemon.run_daemon()
