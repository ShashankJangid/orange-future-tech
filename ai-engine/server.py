import json
import os
import hashlib
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

ENV_PATH = Path(__file__).parent / ".env"
DEFAULT_MASTER_PASSWORD_HASH = hashlib.sha256("OrangeFutureTech2026!".encode("utf-8")).hexdigest()

def read_env():
    env_vars = {
        "MASTER_PASSWORD_HASH": DEFAULT_MASTER_PASSWORD_HASH,
        "GROQ_API_KEY": "",
        "GEMINI_API_KEY": "",
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": "",
        "RESEND_API_KEY": "",
        "SENDER_EMAIL": "teams@orangefuturetech.com",
        "LINKEDIN_ACCESS_TOKEN": "",
        "INSTAGRAM_ACCESS_TOKEN": "",
        "TWITTER_BEARER_TOKEN": "",
        "SUPABASE_URL": "",
        "SUPABASE_KEY": ""
    }
    if ENV_PATH.exists():
        with open(ENV_PATH, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env_vars[k.strip()] = v.strip()
    return env_vars

def write_env(new_vars):
    lines = []
    lines.append("# Orange Future Tech Secure API Configuration\n")
    for k, v in new_vars.items():
        lines.append(f"{k}={v}\n")
    with open(ENV_PATH, "w", encoding="utf-8") as f:
        f.writelines(lines)

class SecureAPIHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Password")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "online", "service": "Orange Future Tech AI Server"}).encode("utf-8"))
            return
        
        self.send_response(404)
        self.end_headers()

    def verify_auth(self):
        auth_header = self.headers.get("X-Admin-Password", "")
        if not auth_header:
            auth_header = self.headers.get("Authorization", "").replace("Bearer ", "")
        
        env_vars = read_env()
        stored_hash = env_vars.get("MASTER_PASSWORD_HASH", DEFAULT_MASTER_PASSWORD_HASH)
        provided_hash = hashlib.sha256(auth_header.encode("utf-8")).hexdigest()
        
        return provided_hash == stored_hash

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/chat":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
            try:
                from chat_bot import chat
                data = json.loads(post_body)
                messages = data.get("messages", [])
                session_id = data.get("session_id", "web-visitor")
                
                if not messages and "query" in data:
                    messages = [{"role": "user", "content": data["query"]}]
                elif not messages and "message" in data:
                    messages = [{"role": "user", "content": data["message"]}]

                reply = chat(messages, session_id=session_id)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "reply": reply}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return
        
        if parsed.path == "/api/voice/inbound":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
            try:
                from voice_agent import VoiceAgentEngine
                data = json.loads(post_body)
                caller = data.get("caller_phone", "+918958347428")
                transcript = data.get("transcript", None)
                voice_response = VoiceAgentEngine.handle_inbound_call(caller, transcript)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "voice": voice_response}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/leads/mine":
            try:
                from lead_miner import LeadMiningEngine
                leads = LeadMiningEngine.mine_new_leads(2)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "leads": leads}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/deals/close":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
            try:
                from deal_closer import DealCloserEngine
                data = json.loads(post_body)
                company = data.get("company_name", "Inbound Client")
                email = data.get("contact_email", "client@orangefuturetech.com")
                reqs = data.get("requirements", "Custom Web & AI Application")
                deal = DealCloserEngine.process_and_close_deal(company, email, reqs)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "deal": deal}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/schools/mine-and-pitch":
            try:
                from school_campaign_engine import SchoolCampaignEngine
                res = SchoolCampaignEngine.run_campaign()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "campaign": res}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/schools/calculate-quote":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
            try:
                from school_campaign_engine import SchoolCampaignEngine
                from notifier import Notifier
                data = json.loads(post_body)
                school_name = data.get("school_name", "Prospective School Client")
                contact_email = data.get("contact_email", "admin@school.edu.in")
                phone = data.get("phone", "+918958347428")
                base_pkg = data.get("base_package", "Standard AI School Portal (₹2,00,000)")
                extra_views = int(data.get("extra_vr_views", 3))
                
                quote = SchoolCampaignEngine.calculate_quote(base_pkg, extra_views)
                
                alert_text = (
                    f"🏫 *NEW SCHOOL WEBSITE + 360 VR INQUIRY*\n\n"
                    f"• *School*: {school_name}\n"
                    f"• *Email*: {contact_email}\n"
                    f"• *Phone*: {phone}\n"
                    f"• *Package*: {quote['base_package']}\n"
                    f"• *360 VR Views*: {extra_views} Views\n"
                    f"• *Total Estimated Investment*: {quote['formatted_total']}\n"
                    f"• *Action*: Needs proposal & 360 VR setup briefing"
                )
                Notifier.send_telegram_alert(alert_text)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "quote": quote}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/cardgen/marketing-campaign":
            try:
                from cardgen_marketing_engine import CardGenMarketingEngine
                res = CardGenMarketingEngine.run_marketing_campaign()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "campaign": res}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/cardgen/request-demo":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
            try:
                from cardgen_marketing_engine import CardGenMarketingEngine
                from notifier import Notifier
                data = json.loads(post_body)
                institution = data.get("institution_name", "School / University")
                email = data.get("contact_email", "admin@school.edu.in")
                phone = data.get("phone", "+918958347428")
                students = int(data.get("student_count", 2500))
                rfid = bool(data.get("includes_rfid", False))
                
                cost = CardGenMarketingEngine.calculate_cardgen_cost(students, rfid)
                
                alert_text = (
                    f"🎴 *NEW CARDGEN SMART ID DEMO REQUEST*\n\n"
                    f"• *Institution*: {institution}\n"
                    f"• *Email*: {email}\n"
                    f"• *Phone*: {phone}\n"
                    f"• *Student Count*: {students} Students\n"
                    f"• *License Tier*: {cost['tier_name']}\n"
                    f"• *Annual Investment*: {cost['formatted_total']}\n"
                    f"• *Cost Per Student*: {cost['cost_per_student']}\n"
                    f"• *Action*: Schedule live demo & software trial"
                )
                Notifier.send_telegram_alert(alert_text)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "cost": cost}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/login":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8")
            try:
                data = json.loads(post_body)
                pwd = data.get("password", "")
                env_vars = read_env()
                stored_hash = env_vars.get("MASTER_PASSWORD_HASH", DEFAULT_MASTER_PASSWORD_HASH)
                provided_hash = hashlib.sha256(pwd.encode("utf-8")).hexdigest()

                if provided_hash == stored_hash:
                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self._send_cors_headers()
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "success", "authenticated": True, "token": provided_hash}).encode("utf-8"))
                else:
                    self.send_response(401)
                    self.send_header("Content-Type", "application/json")
                    self._send_cors_headers()
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "Invalid Admin Password"}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        if parsed.path == "/api/config/get":
            if not self.verify_auth():
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": "Unauthorized"}).encode("utf-8"))
                return

            vars_dict = read_env()
            vars_dict.pop("MASTER_PASSWORD_HASH", None)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(vars_dict).encode("utf-8"))
            return

        if parsed.path == "/api/config/save":
            if not self.verify_auth():
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": "Unauthorized"}).encode("utf-8"))
                return

            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8")
            try:
                data = json.loads(post_body)
                new_password = data.pop("new_master_password", None)
                
                current = read_env()
                current.update(data)
                
                if new_password:
                    current["MASTER_PASSWORD_HASH"] = hashlib.sha256(new_password.encode("utf-8")).hexdigest()

                write_env(current)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "API keys updated securely"}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run_server(port=8080):
    server_address = ("", port)
    httpd = HTTPServer(server_address, SecureAPIHandler)
    print(f"--> [SECURE ADMIN & AI API SERVER] Running at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
