import os
import json
import urllib.request
import sqlite3
from datetime import datetime
from pathlib import Path

# ------------------------------------------------------------
# Load .env automatically (requires python‑dotenv)
import config

# Helper to print a section header
def print_header(title):
    print('\n' + '=' * 10 + f' {title} ' + '=' * 10)


# ------------------------------------------------------------
# 1. Environment & Config
# ------------------------------------------------------------
print_header('ENVIRONMENT VARIABLES')
for var in [
    'HOSTINGER_API_TOKEN',
    'HOSTINGER_MAILBOX_ID',
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_FROM_NUMBER',
    'TWILIO_TO_NUMBER',
    'SUPABASE_URL',
    'SUPABASE_KEY',
    'DB_PATH',
]:
    print(f"{var}: {os.getenv(var, '<not set>')}")

# ------------------------------------------------------------
# 2. Database Connection & Leads Summary
# ------------------------------------------------------------
print_header('DATABASE STATUS')
# Default location if DB_PATH not set – same folder as this script
default_db = Path(__file__).parent / 'audit_engine.db'
DB_PATH = os.getenv('DB_PATH', str(default_db))
try:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) FROM leads')
    leads_count = cur.fetchone()[0]
    cur.execute("SELECT status, COUNT(*) FROM leads GROUP BY status")
    status_counts = cur.fetchall()
    print(f"Leads total: {leads_count}")
    for status, cnt in status_counts:
        print(f"  {status}: {cnt}")
    conn.close()
except Exception as e:
    print(f"Database error ({DB_PATH}): {e}")

# ------------------------------------------------------------
# 3. Hostinger Mail API health check (simple GET to /me)
# ------------------------------------------------------------
print_header('HOSTINGER MAIL API')
hostinger_token = os.getenv('HOSTINGER_API_TOKEN')
if hostinger_token:
    try:
        req = urllib.request.Request(
            'https://api.mail.hostinger.com/api/v1/me',
            headers={'Authorization': f'Bearer {hostinger_token}'},
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            print('API reachable – account:', data.get('data', {}).get('email', '<unknown>'))
    except Exception as e:
        print('API check failed:', e)
else:
    print('HOSTINGER_API_TOKEN not set')

# ------------------------------------------------------------
# 4. Supabase connectivity (simple GET to /rest/v1/leads?limit=1)
# ------------------------------------------------------------
print_header('SUPABASE CONNECTION')
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
if supabase_url and supabase_key:
    try:
        req = urllib.request.Request(
            f"{supabase_url}/rest/v1/leads?limit=1",
            headers={'apikey': supabase_key, 'Authorization': f'Bearer {supabase_key}'},
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            print('Supabase reachable – sample record count:', len(data))
    except Exception as e:
        print('Supabase check failed:', e)
else:
    print('Supabase credentials not set')

# ------------------------------------------------------------
# 5. n8n workflow reachable (ping the webhook endpoint)
# ------------------------------------------------------------
print_header('N8N WORKFLOW')
webhook_url = os.getenv('N8N_WEBHOOK_URL', 'https://orangefuturetech.app.n8n.cloud/webhook/lead-audit-webhook')
try:
    req = urllib.request.Request(webhook_url, method='GET')
    with urllib.request.urlopen(req, timeout=5) as resp:
        print('Webhook reachable – status', resp.getcode())
except Exception as e:
    print('Webhook check failed:', e)

# ------------------------------------------------------------
# 6. Telegram Bot health (simple getMe)
# ------------------------------------------------------------
print_header('TELEGRAM BOT')
bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
if bot_token:
    try:
        req = urllib.request.Request(f'https://api.telegram.org/bot{bot_token}/getMe')
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            if data.get('ok'):
                print('Bot online – username:', data['result'].get('username'))
            else:
                print('Bot response not ok')
    except Exception as e:
        print('Telegram check failed:', e)
else:
    print('TELEGRAM_BOT_TOKEN not set')

# ------------------------------------------------------------
# 7. Twilio credentials presence
# ------------------------------------------------------------
print_header('TWILIO CONFIG')
print('Account SID:', os.getenv('TWILIO_ACCOUNT_SID', '<not set>'))
print('Auth Token:', '<hidden>' if os.getenv('TWILIO_AUTH_TOKEN') else '<not set>')
print('From Number:', os.getenv('TWILIO_FROM_NUMBER', '<not set>'))
print('To Number:', os.getenv('TWILIO_TO_NUMBER', '<not set>'))

# ------------------------------------------------------------
# 8. Vercel deployment status (quick reminder)
# ------------------------------------------------------------
print_header('VERCEL DEPLOYMENT')
print('Check https://vercel.com/dashboard for latest deployment status.')

# ------------------------------------------------------------
# Final timestamp
# ------------------------------------------------------------
print('\nAll checks performed at', datetime.now().isoformat() + 'Z')
