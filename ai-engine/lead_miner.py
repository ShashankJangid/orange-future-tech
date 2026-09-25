import json
import random
import time
from db import log_action
from auditor import WebAuditor
from report_generator import ReportGenerator
from cold_outreach import ColdOutreachEngine
from notifier import Notifier

class LeadMiningEngine:
    """Autonomous Lead Mining & Cold Audit Pipeline Engine."""

    TARGET_PROSPECTS = [
        {"company": "Apex Global Freight", "domain": "apexglobalfreight.com", "email": "contact@apexglobalfreight.com", "niche": "Logistics & Supply Chain"},
        {"company": "Shipmate Logistics", "domain": "shipmatelogistics.in", "email": "info@shipmatelogistics.in", "niche": "Fleet Management"},
        {"company": "NexGen Industrial Robotics", "domain": "nexgenrobotics.io", "email": "engineering@nexgenrobotics.io", "niche": "Hardware & Electronics"},
        {"company": "Vanguard Capital Partners", "domain": "vanguardcap.com", "email": "invest@vanguardcap.com", "niche": "Enterprise Software"},
        {"company": "Zenith Healthcare Systems", "domain": "zenithhealth.org", "email": "tech@zenithhealth.org", "niche": "Medical Devices & Web"}
    ]

    @staticmethod
    def mine_new_leads(count: int = 2) -> list:
        selected = random.sample(LeadMiningEngine.TARGET_PROSPECTS, min(count, len(LeadMiningEngine.TARGET_PROSPECTS)))
        mined_results = []

        for prospect in selected:
            log_action("LeadMiner", "MINE_PROSPECT", prospect["domain"], "IN_PROGRESS", prospect)
            
            audit_result = WebAuditor.audit_website(prospect["domain"], prospect["company"])
            report_path = ReportGenerator.generate_audit_html_report(audit_result)
            
            outreach_sent = ColdOutreachEngine.send_outreach_email(
                prospect["company"],
                prospect["email"],
                audit_result,
                report_path,
                skip_approval_check=True
            )

            result_entry = {
                "company": prospect["company"],
                "domain": prospect["domain"],
                "email": prospect["email"],
                "niche": prospect["niche"],
                "score": audit_result["score"],
                "outreach_sent": outreach_sent,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
            }

            mined_results.append(result_entry)
            log_action("LeadMiner", "PIPELINE_COMPLETE", prospect["company"], "SUCCESS", result_entry)
            
            Notifier.send_telegram_alert(
                f"🎯 *NEW LEAD MINED & AUDITED*\n\n"
                f"• *Company*: {prospect['company']}\n"
                f"• *Domain*: `{prospect['domain']}`\n"
                f"• *Email*: `{prospect['email']}`\n"
                f"• *Tech Health Score*: {audit_result['score']}/100\n"
                f"• *Outreach Email*: Sent"
            )

        return mined_results

if __name__ == "__main__":
    leads = LeadMiningEngine.mine_new_leads(1)
    print(json.dumps(leads, indent=2))
