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
        
        # Endpoint: Login Verification
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

        # Protected Endpoint: Fetch API Keys
        if parsed.path == "/api/config/get":
            if not self.verify_auth():
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": "Unauthorized"}).encode("utf-8"))
                return

            vars_dict = read_env()
            # Do not expose password hash in response
            vars_dict.pop("MASTER_PASSWORD_HASH", None)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(vars_dict).encode("utf-8"))
            return

        # Protected Endpoint: Update API Keys or Password
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
    print(f"--> [SECURE ADMIN API SERVER] Running at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
