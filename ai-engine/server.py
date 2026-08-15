import json
import os
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

ENV_PATH = Path(__file__).parent / ".env"

def read_env():
    env_vars = {
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
    lines.append("# Orange Future Tech AI Engine API Configuration\n")
    for k, v in new_vars.items():
        lines.append(f"{k}={v}\n")
    with open(ENV_PATH, "w", encoding="utf-8") as f:
        f.writelines(lines)

class APIHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/config":
            vars_dict = read_env()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(vars_dict).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/config":
            content_len = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_len).decode("utf-8")
            try:
                data = json.loads(post_body)
                current = read_env()
                current.update(data)
                write_env(current)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "API keys updated successfully"}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))

def run_server(port=8080):
    server_address = ("", port)
    httpd = HTTPServer(server_address, APIHandler)
    print(f"--> [API CONTROL SERVER] Running at http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
