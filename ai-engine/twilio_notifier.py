import os
import json
import urllib.request
import urllib.parse
from db import log_action

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "+18005550199")
TWILIO_TO_NUMBER = os.getenv("TWILIO_TO_NUMBER", "")

class TwilioNotifier:
    """Dispatches real-time SMS & WhatsApp alerts to the business owner via Twilio API."""

    @classmethod
    def send_sms_alert(cls, message_text: str) -> bool:
        log_action("TwilioNotifier", "SEND_SMS_START", message_text[:30], "IN_PROGRESS")
        if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_TO_NUMBER:
            log_action("TwilioNotifier", "SEND_SMS_SKIPPED", "Missing TWILIO_AUTH_TOKEN or TWILIO_TO_NUMBER in .env", "SUCCESS")
            return False

        url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json"
        data = urllib.parse.urlencode({
            "From": TWILIO_FROM_NUMBER,
            "To": TWILIO_TO_NUMBER,
            "Body": f"[Orange AI Alert] {message_text}"
        }).encode("utf-8")

        import base64
        auth_header = "Basic " + base64.b64encode(f"{TWILIO_ACCOUNT_SID}:{TWILIO_AUTH_TOKEN}".encode("utf-8")).decode("utf-8")

        req = urllib.request.Request(
            url,
            data=data,
            headers={
                "Authorization": auth_header,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        )
        try:
            res = urllib.request.urlopen(req, timeout=10)
            res_data = json.loads(res.read().decode("utf-8"))
            log_action("TwilioNotifier", "SEND_SMS_SUCCESS", TWILIO_TO_NUMBER, "SUCCESS", {"sid": res_data.get("sid")})
            return True
        except Exception as e:
            log_action("TwilioNotifier", "SEND_SMS_FAILED", TWILIO_TO_NUMBER, "ERROR", {"error": str(e)})
            return False

if __name__ == "__main__":
    print("TwilioNotifier module initialized.")
