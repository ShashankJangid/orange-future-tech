import json
import time
from db import log_action
from notifier import Notifier

class DealCloserEngine:
    """Autonomous Deal Closer & Project Brief Handoff Generator."""

    @staticmethod
    def process_and_close_deal(company_name: str, contact_email: str, raw_requirements: str, estimated_budget: str = "₹1,50,000 - ₹3,00,000") -> dict:
        log_action("DealCloser", "START_DEAL_QUALIFICATION", company_name, "IN_PROGRESS", {"email": contact_email})

        tech_stack = ["React 19 / Next.js", "Node.js Cloud Backend", "Supabase PostgreSQL", "Inbound AI Voice Agent"]
        if "pcb" in raw_requirements.lower() or "hardware" in raw_requirements.lower() or "electronics" in raw_requirements.lower():
            tech_stack.extend(["Custom 4-Layer PCB Schematics", "ESP32 / LoRaWAN C++ Firmware"])

        project_brief = {
            "deal_id": f"DEAL-{int(time.time())}",
            "company_name": company_name,
            "contact_email": contact_email,
            "raw_requirements": raw_requirements,
            "tech_stack": tech_stack,
            "estimated_budget": estimated_budget,
            "timeline": "14-21 Business Days",
            "status": "QUALIFIED_READY_FOR_TEAM",
            "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        log_action("DealCloser", "DEAL_QUALIFIED_AND_CLOSED", company_name, "SUCCESS", project_brief)

        telegram_msg = (
            f"🎉 *DEAL CLOSED BY AI & READY FOR TEAM ASSIGNMENT*\n\n"
            f"• *Deal ID*: `{project_brief['deal_id']}`\n"
            f"• *Company*: {company_name}\n"
            f"• *Client Contact*: `{contact_email}`\n"
            f"• *Budget*: {estimated_budget}\n"
            f"• *Timeline*: {project_brief['timeline']}\n\n"
            f"🛠 *Required Stack*: {', '.join(tech_stack)}\n"
            f"📝 *Client Requirements*: \"{raw_requirements}\"\n\n"
            f"👉 *Action Required*: Assign project deliverables to your engineering team!"
        )

        Notifier.send_telegram_alert(telegram_msg)
        return project_brief

if __name__ == "__main__":
    res = DealCloserEngine.process_and_close_deal(
        "Apex Global Freight",
        "contact@apexglobalfreight.com",
        "We need a modern enterprise dashboard with real-time IoT vehicle tracking and an automated WhatsApp bot for driver dispatching."
    )
    print(json.dumps(res, indent=2))
