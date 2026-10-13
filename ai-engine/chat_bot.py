import os
import sys
import json
import re
import urllib.request
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

ENV_PATH = SCRIPT_DIR / ".env"
if ENV_PATH.exists():
    with open(ENV_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

from db import log_action

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

SYSTEM_PROMPT = """You are Aria, the senior engineering and business consultant for Orange Future Tech (orangefuturetech.com).

CRITICAL LANGUAGE REQUIREMENT:
- You must ALWAYS communicate and respond strictly and exclusively in ENGLISH.
- Under NO circumstance should you generate responses in any other language (such as Hindi, Chinese, Russian, Spanish, French, etc.), even if the user messages you in another language.
- If a user sends a query in another language, interpret their intent accurately but formulate your entire reply in polished, professional English.

About Orange Future Tech:
- We build custom high-performance websites, web applications, mobile platforms, 24/7 autonomous AI agents, and custom multi-layer PCB hardware solutions.
- High-Profile Clients and Track Record: We have engineered custom software for IIT (Indian Institute of Technology), DPS (Delhi Public School), and Shipmate Logistics.
- Technology Expertise: React, Next.js, Node.js, Python, PostgreSQL, AI/LLM systems, IoT telemetry, and PCB hardware.
- Official Phone: +91 8958347428
- Official Email: teams@orangefuturetech.com | Booking Portal: https://orangefuturetech.com/portal

Communication and Tone Guidelines:
- Respond in clear, refined, natural, and professional English.
- DO NOT use markdown headers or double asterisks.
- Write in clean, well-spaced paragraphs or clean bullet points (- point).
- Confidently highlight our track record with IIT and DPS when discussing software, websites, or Smart ID platforms to establish high trust.
- Provide direct answers and invite the user to schedule a discovery call or email us."""

def has_non_latin_chars(text: str) -> bool:
    cjk_count = len(re.findall(r"[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u0600-\u06ff\u0900-\u097f]", text))
    return cjk_count > 3

def refine_clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    text = re.sub(r"```[a-zA-Z]*\n?", "", text)
    text = re.sub(r"```", "", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", text)
    text = text.replace("**", "").replace("~~", "").replace("`", "")
    text = re.sub(r"\n{3,}", "\n\n", text)
    
    if has_non_latin_chars(text):
        return (
            "Hello! I am Aria, AI Consultant at Orange Future Tech. We engineer high-performance custom websites, "
            "AI agents, and enterprise platforms for clients including IIT and DPS. "
            "Please contact our team at teams@orangefuturetech.com or call +91 8958347428 to discuss your requirements."
        )
    return text.strip()

def chat(messages: list, session_id: str = "web-visitor") -> str:
    groq_key = os.getenv("GROQ_API_KEY", GROQ_API_KEY)
    gemini_key = os.getenv("GEMINI_API_KEY", GEMINI_API_KEY)

    if groq_key:
        try:
            payload = json.dumps({
                "model": GROQ_MODEL,
                "messages": [{"role": "system", "content": SYSTEM_PROMPT}] + messages,
                "temperature": 0.5,
                "max_tokens": 512,
                "stream": False
            }).encode("utf-8")

            req = urllib.request.Request(
                GROQ_API_URL,
                data=payload,
                headers={
                    "Authorization": f"Bearer {groq_key}",
                    "Content-Type": "application/json",
                    "User-Agent": "OrangeFutureTech/1.0"
                }
            )
            with urllib.request.urlopen(req, timeout=15) as res:
                data = json.loads(res.read().decode("utf-8"))
                raw_reply = data["choices"][0]["message"]["content"].strip()
                clean_reply = refine_clean_text(raw_reply)
                log_action("ChatBot", "GROQ_RESPONSE", session_id, "SUCCESS")
                return clean_reply
        except Exception as e:
            log_action("ChatBot", "GROQ_ERROR", session_id, "ERROR", {"error": str(e)})

    if gemini_key:
        try:
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={gemini_key}"
            last_message = messages[-1]["content"] if messages else "Hello"
            payload = json.dumps({
                "system_instruction": {
                    "parts": [{"text": SYSTEM_PROMPT}]
                },
                "contents": [
                    {"role": "user", "parts": [{"text": last_message}]}
                ]
            }).encode("utf-8")

            req = urllib.request.Request(
                gemini_url,
                data=payload,
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=15) as res:
                data = json.loads(res.read().decode("utf-8"))
                raw_reply = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                clean_reply = refine_clean_text(raw_reply)
                log_action("ChatBot", "GEMINI_RESPONSE", session_id, "SUCCESS")
                return clean_reply
        except Exception as e:
            log_action("ChatBot", "GEMINI_ERROR", session_id, "ERROR", {"error": str(e)})

    fallback = (
        "Hello! I am Aria, Lead AI Engineering Consultant for Orange Future Tech. "
        "We build custom high-performance websites, AI automations, and enterprise platforms for institutions including IIT and DPS. "
        "How can I assist your project today? You can reach us directly at teams@orangefuturetech.com or +91 8958347428."
    )
    return refine_clean_text(fallback)

if __name__ == "__main__":
    test_msgs = [{"role": "user", "content": "Can you build a new website for my company?"}]
    print("Clean Refined Output:")
    print(chat(test_msgs))
