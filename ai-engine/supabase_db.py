import os
import json
import urllib.request
import urllib.error

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

class SupabaseDB:
    """Supabase PostgreSQL REST API Client for Audit Logs & Lead Tracking."""

    @staticmethod
    def _headers():
        return {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    @classmethod
    def insert_lead(cls, company_name: str, website_url: str, contact_email: str, health_score: int, issues: list):
        if not SUPABASE_URL or not SUPABASE_KEY:
            return None

        url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/leads"
        payload = json.dumps({
            "company_name": company_name,
            "website_url": website_url,
            "contact_email": contact_email,
            "health_score": health_score,
            "issues": issues
        }).encode("utf-8")

        req = urllib.request.Request(url, data=payload, headers=cls._headers(), method="POST")
        try:
            res = urllib.request.urlopen(req)
            return json.loads(res.read().decode("utf-8"))
        except Exception as e:
            print("[SupabaseDB Error] insert_lead failed:", e)
            return None

    @classmethod
    def log_audit_action(cls, module_name: str, action_type: str, target_info: str, status: str, details: dict = None):
        if not SUPABASE_URL or not SUPABASE_KEY:
            return None

        url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/audit_logs"
        payload = json.dumps({
            "module_name": module_name,
            "action_type": action_type,
            "target_info": target_info,
            "status": status,
            "details": details or {}
        }).encode("utf-8")

        req = urllib.request.Request(url, data=payload, headers=cls._headers(), method="POST")
        try:
            res = urllib.request.urlopen(req)
            return json.loads(res.read().decode("utf-8"))
        except Exception as e:
            print("[SupabaseDB Error] log_audit_action failed:", e)
            return None

if __name__ == "__main__":
    print("SupabaseDB module initialized.")
