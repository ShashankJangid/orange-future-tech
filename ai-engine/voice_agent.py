import json
import os
import time
from db import log_action
from notifier import Notifier

class VoiceAgentEngine:
    """24/7 Autonomous AI Voice Telephony Handler."""

    PHONE_NUMBER = "+918958347428"

    @staticmethod
    def handle_inbound_call(caller_phone: str, raw_transcript: str = None) -> dict:
        log_action("VoiceAgent", "INBOUND_CALL_RECEIVED", caller_phone, "SUCCESS", {"raw_transcript": raw_transcript})

        welcome_prompt = (
            "Hello! Thank you for calling Orange Future Tech. I am Aria, Lead AI Engineering Consultant. "
            "We build custom enterprise software, AI agents, and multi-layer PCB hardware. How can I assist your team today?"
        )

        if not raw_transcript:
            Notifier.send_telegram_alert(
                f"📞 *INBOUND PHONE CALL ANSWERED*\n\n"
                f"• *Caller*: `{caller_phone}`\n"
                f"• *Status*: Connected & AI Conversing\n"
                f"• *Target Line*: `{VoiceAgentEngine.PHONE_NUMBER}`"
            )
            return {
                "action": "speak",
                "text": welcome_prompt,
                "voice_id": "elevenlabs_aria_v2",
                "listen_after": True
            }

        ai_response = VoiceAgentEngine._process_speech_query(raw_transcript, caller_phone)
        return {
            "action": "speak",
            "text": ai_response["speech"],
            "is_deal_qualified": ai_response["is_deal_qualified"],
            "listen_after": not ai_response["is_deal_qualified"]
        }

    @staticmethod
    def _process_speech_query(query: str, caller_phone: str) -> dict:
        q = query.lower()
        is_deal_qualified = False

        if any(w in q for w in ["build", "website", "software", "cost", "price", "project", "hire", "deal"]):
            speech = (
                "That sounds like a fantastic fit for our engineering team. We specialize in high-concurrency enterprise web platforms, "
                "AI integrations, and custom PCB hardware. I am logging your requirements right now, and our senior engineering team will email you "
                "a tailored proposal within 2 hours. Shall I also dispatch the briefing packet to your phone via SMS?"
            )
            is_deal_qualified = True

            Notifier.alert_high_priority_lead(
                company_name=f"Inbound Phone Client ({caller_phone})",
                contact_email=caller_phone,
                deal_size="INBOUND PHONE DEAL (Qualified)"
            )
        elif any(w in q for w in ["iit", "dps", "work", "client"]):
            speech = (
                "We have a strong institutional track record. We engineered customized breach-free ID Card Generator software for IIT Jodhpur "
                "and campus automation including Smart ID platforms for DPS Indirapuram. Would you like us to email you our complete portfolio?"
            )
        else:
            speech = (
                "Thank you for sharing that. At Orange Future Tech, we handle full-stack web platforms, autonomous AI agents, and custom PCB electronics. "
                "Feel free to connect with our team anytime at teams@orangefuturetech.com or visit orangefuturetech.com."
            )

        return {"speech": speech, "is_deal_qualified": is_deal_qualified}

if __name__ == "__main__":
    res = VoiceAgentEngine.handle_inbound_call("+918958347428")
    print(json.dumps(res, indent=2))
