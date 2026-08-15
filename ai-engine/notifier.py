import urllib.request
import json
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
from db import log_action

class Notifier:
    """Dispatches real-time Telegram notifications for ALL business events and AI actions."""

    @staticmethod
    def send_telegram_alert(text: str) -> bool:
        if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
            print(f"--> [NOTIFIER LOG ONLY] {text}")
            log_action("Notifier", "LOG_ALERT", text[:30], "SUCCESS")
            return False

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = json.dumps({
            "chat_id": TELEGRAM_CHAT_ID,
            "text": text,
            "parse_mode": "Markdown"
        }).encode("utf-8")

        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"}
        )

        try:
            res = urllib.request.urlopen(req, timeout=10)
            log_action("Notifier", "TELEGRAM_ALERT_SENT", "SUCCESS", "SUCCESS")
            return True
        except Exception as e:
            log_action("Notifier", "TELEGRAM_ALERT_FAILED", str(e), "ERROR")
            return False

    @classmethod
    def alert_engine_start(cls):
        msg = "🚀 *ORANGE FUTURE TECH - 24/7 AI ENGINE STARTED*\n\nAll autonomous monitoring loops, lead auditors, and social media publishers are ACTIVE."
        cls.send_telegram_alert(msg)

    @classmethod
    def alert_lead_discovered(cls, company_name: str, website_url: str, score: int, issues_count: int):
        msg = f"🎯 *NEW LEAD DISCOVERED & AUDITED*\n\n• *Company*: {company_name}\n• *Website*: {website_url}\n• *Health Score*: {score}/100\n• *Issues Detected*: {issues_count}\n\n⚡ *Action*: Generating audit report & cold outreach email."
        cls.send_telegram_alert(msg)

    @classmethod
    def alert_email_sent(cls, company_name: str, recipient_email: str, report_path: str = None):
        msg = f"📩 *COLD OUTREACH DISPATCHED*\n\n• *Recipient*: {company_name} ({recipient_email})\n• *Status*: Delivered successfully\n• *Sender*: teams@orangefuturetech.com (Hostinger API)\n• *Audit Attached*: {report_path or 'HTML Report'}"
        cls.send_telegram_alert(msg)

    @classmethod
    def alert_social_post(cls, platform: str, topic: str):
        msg = f"📱 *AUTOMATED SOCIAL POST PUBLISHED ({platform.upper()})*\n\n• *Topic*: {topic}\n• *Platform*: {platform.capitalize()}\n• *Status*: Published to feed"
        cls.send_telegram_alert(msg)

    @classmethod
    def alert_system_event(cls, event_title: str, details: str):
        msg = f"⚙️ *SYSTEM AUTOMATION EVENT*\n\n• *Event*: {event_title}\n• *Details*: {details}"
        cls.send_telegram_alert(msg)

if __name__ == "__main__":
    Notifier.alert_lead_discovered("Shipmate Logistics", "shipmatelogistics.in", 95, 1)
