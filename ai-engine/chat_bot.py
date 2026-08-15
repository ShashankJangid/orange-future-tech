import os
import sys
import json
import re
import urllib.request
from pathlib import Path

# Ensure directory is on python path and .env is loaded
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

SYSTEM_PROMPT = """You are Aria, the senior engineering & business consultant for Orange Future Tech (orangefuturetech.com).

About Orange Future Tech:
- We build custom high-performance websites, web applications, mobile platforms, 24/7 AI agents, and custom multi-layer PCB hardware solutions.
- High-Profile Clients & Track Record: We have engineered custom software for IIT (Indian Institute of Technology), DPS (Delhi Public School), and Shipmate Logistics.
- Technology Expertise: React, Node.js, Python, PostgreSQL, AI/LLM systems, IoT telemetry, and PCB hardware.
- Official Email: teams@orangefuturetech.com | Booking Portal: https://orangefuturetech.com/portal

Communication & Tone Guidelines:
- Respond in clear, refined, natural, and professional language.
- DO NOT use special markdown formatting characters such as double asterisks (**), hashtags (###), underscores (_), or backticks (`).
- Write in clean, well-spaced paragraphs or clean bullet points (- point).
- Confidently highlight our track record with IIT and DPS when discussing software or website upgrades to build trust.
- Provide direct answers and invite the user to schedule a discovery call or email us."""

def refine_clean_text(text: str) -> str:
    """Sanitizes text by removing markdown artifacts and special characters for a clean, refined output."""
    if not text:
        return ""
    # Remove markdown headers (# Title -> Title)
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.MULTILINE)
    # Remove bold and italic markers (**word** -> word, *word* -> word, _word_ -> word)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    # Remove code blocks and backticks
    text = re.sub(r"```[a-zA-Z]*\n?", "", text)
    text = re.sub(r"```", "", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    # Clean markdown link brackets [Title](URL) -> Title (URL)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", text)
    # Clean extraneous asterisks or tildes
    text = text.replace("**", "").replace("~~", "").replace("`", "")
    # Normalize excess whitespace/newlines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

def chat(messages: list, session_id: str = "web-visitor") -> str:
    """Send conversation history to Groq API and return a refined, clean text response."""
    api_key = os.getenv("GROQ_API_KEY", GROQ_API_KEY)
    if not api_key:
        fallback = "Our AI consultant is ready to assist you. Please connect directly with our engineering team at teams@orangefuturetech.com or visit https://orangefuturetech.com/portal to schedule a discovery call."
        return refine_clean_text(fallback)

    payload = json.dumps({
        "model": GROQ_MODEL,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}] + messages,
        "temperature": 0.6,
        "max_tokens": 512,
        "stream": False
    }).encode("utf-8")

    req = urllib.request.Request(
        GROQ_API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "OrangeFutureTech/1.0"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            data = json.loads(res.read().decode("utf-8"))
            raw_reply = data["choices"][0]["message"]["content"].strip()
            clean_reply = refine_clean_text(raw_reply)
            log_action("ChatBot", "GROQ_RESPONSE", session_id, "SUCCESS")
            return clean_reply
    except Exception as e:
        log_action("ChatBot", "GROQ_ERROR", session_id, "ERROR", {"error": str(e)})
        fallback = "I would be glad to assist with your project. Please feel free to reach out to our team at teams@orangefuturetech.com or book a discovery call at https://orangefuturetech.com/portal."
        return refine_clean_text(fallback)

if __name__ == "__main__":
    test_msgs = [{"role": "user", "content": "Can you build a new website for my company?"}]
    print("Clean Refined Output:")
    print(chat(test_msgs))
