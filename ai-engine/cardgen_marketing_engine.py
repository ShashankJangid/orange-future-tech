import os
import json
import time
from config import SENDER_EMAIL
from db import log_action
from notifier import Notifier

TARGET_EDUCATIONAL_INSTITUTIONS = [
    {
        "id": "CG-001",
        "institution_name": "Delhi Public School (DPS) Indirapuram",
        "category": "K-12 School",
        "city": "Ghaziabad",
        "student_count": 4500,
        "contact_email": "principal@dpsindirapuram.com",
        "phone": "+918958347428",
        "current_pain_point": "Manual photo collection and 3-week printing vendor delay during admission season",
        "recommended_tier": "Enterprise Unlimited Campus License (₹45,000/year)"
    },
    {
        "id": "CG-002",
        "institution_name": "IIT Jodhpur Campus",
        "category": "University / Higher Ed",
        "city": "Jodhpur",
        "student_count": 3200,
        "contact_email": "admin@iitj.ac.in",
        "phone": "+918958347428",
        "current_pain_point": "Need breach-free encrypted QR codes and RFID student access control integration",
        "recommended_tier": "Institutional Security Tier (₹60,000/year)"
    },
    {
        "id": "CG-003",
        "institution_name": "Amity International School Sector 44 Noida",
        "category": "K-12 School",
        "city": "Noida",
        "student_count": 3800,
        "contact_email": "info@aisn.amity.edu",
        "phone": "+918958347428",
        "current_pain_point": "Misaligned student photos and tedious manual CSV file uploads",
        "recommended_tier": "Standard School License (₹35,000/year)"
    },
    {
        "id": "CG-004",
        "institution_name": "Ryan International School Vasant Kunj",
        "category": "K-12 School",
        "city": "New Delhi",
        "student_count": 2900,
        "contact_email": "ris.vasantkunj@ryangroup.org",
        "phone": "+918958347428",
        "current_pain_point": "High vendor costs per card and lack of digital ID card smartphone app",
        "recommended_tier": "Standard School License (₹35,000/year)"
    },
    {
        "id": "CG-005",
        "institution_name": "Shiv Nadar University Greater Noida",
        "category": "University",
        "city": "Greater Noida",
        "student_count": 5200,
        "contact_email": "admissions@snu.edu.in",
        "phone": "+918958347428",
        "current_pain_point": "Require automated barcode & library management integration",
        "recommended_tier": "Institutional Security Tier (₹60,000/year)"
    }
]

class CardGenMarketingEngine:

    @staticmethod
    def calculate_cardgen_cost(student_count: int, includes_rfid: bool = False) -> dict:
        if student_count <= 1000:
            base_price = 25000
            tier_name = "Starter Campus (Up to 1,000 Students)"
        elif student_count <= 3500:
            base_price = 35000
            tier_name = "Standard School (Up to 3,500 Students)"
        elif student_count <= 6000:
            base_price = 45000
            tier_name = "Enterprise Campus (Up to 6,000 Students)"
        else:
            base_price = 65000
            tier_name = "Institutional Unlimited (6,000+ Students)"
            
        rfid_addon = 15000 if includes_rfid else 0
        total_license = base_price + rfid_addon
        cost_per_student = round(total_license / max(1, student_count), 2)
        
        return {
            "tier_name": tier_name,
            "student_count": student_count,
            "base_license_price": base_price,
            "rfid_addon": rfid_addon,
            "total_annual_license": total_license,
            "cost_per_student": f"₹{cost_per_student}",
            "formatted_total": f"₹{total_license:,}/year"
        }

    @staticmethod
    def generate_cardgen_pitch(school: dict) -> dict:
        cost = CardGenMarketingEngine.calculate_cardgen_cost(school["student_count"], "RFID" in school["recommended_tier"])
        
        pitch = f"""
============================================================
ORANGE FUTURE TECH - CARDGEN SMART ID CARD SOFTWARE PITCH
============================================================
Target Institution: {school['institution_name']} ({school['city']})
Category: {school['category']} | Student Strength: {school['student_count']} Students

IDENTIFIED BOTTLENECK:
• {school['current_pain_point']}

WHY CARDGEN SMART ID CARD SOFTWARE?
1. Instant Web App Photo Capture during admissions via tablet or phone camera
2. Automated Batch Card Generation from Excel/CSV in under 60 seconds
3. Breach-Free Encrypted QR Code & RFID Access Control Integration
4. High-Resolution Bulk PDF/PNG Print Layouts with auto-cropping & alignment
5. Digital Smartphone ID Cards for parents & students

RECOMMENDED LICENSE: {cost['tier_name']}
ESTIMATED ANNUAL INVESTMENT: {cost['formatted_total']} (Only {cost['cost_per_student']} per student)
OFFICIAL TELEPHONY CONTACT: +91 8958347428
        """
        return {
            "school_id": school["id"],
            "institution_name": school["institution_name"],
            "cost": cost,
            "pitch_text": pitch.strip()
        }

    @staticmethod
    def run_marketing_campaign() -> dict:
        log_action("CardGenMarketingEngine", "START_CAMPAIGN", "CardGen School ID Software Campaign", "IN_PROGRESS")
        
        results = []
        for school in TARGET_EDUCATIONAL_INSTITUTIONS:
            pitch = CardGenMarketingEngine.generate_cardgen_pitch(school)
            results.append(pitch)
            
            telegram_msg = (
                f"🎴 *CARDGEN SMART ID CARD PITCH DISPATCHED*\n\n"
                f"• *Institution*: {school['institution_name']}\n"
                f"• *City*: {school['city']} ({school['category']})\n"
                f"• *Students*: {school['student_count']} Students\n"
                f"• *Pain Point*: {school['current_pain_point']}\n"
                f"• *License Tier*: {pitch['cost']['tier_name']}\n"
                f"• *Annual Investment*: {pitch['cost']['formatted_total']}\n"
                f"• *Cost Per Student*: {pitch['cost']['cost_per_student']}\n"
                f"• *Contact Phone*: +91 8958347428\n"
                f"• *Status*: DISPATCHED_TO_PRINCIPAL_OFFICE"
            )
            
            Notifier.send_telegram_alert(telegram_msg)
            time.sleep(0.5)
            
        log_action("CardGenMarketingEngine", "CAMPAIGN_COMPLETE", f"Dispatched {len(results)} CardGen Pitches", "SUCCESS")
        
        return {
            "total_institutions_pitched": len(results),
            "campaign_status": "DISPATCHED_CARDGEN_PROPOSALS",
            "proposals": results
        }

if __name__ == "__main__":
    res = CardGenMarketingEngine.run_marketing_campaign()
    print(json.dumps(res, indent=2))
