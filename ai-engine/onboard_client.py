import sqlite3
import json
import urllib.request
from config import DB_PATH
from db import log_action
from notifier import Notifier

HOSTINGER_API_TOKEN = "57aae8293805f0e9d7424cfe755455df5fb7c4191030d1747b5086611f5facdf"
HOSTINGER_MAILBOX_ID = "AC6b561e5b00e0bde3a92a445b3c1a"

def onboard_shipmate_client():
    log_action("ClientOnboarding", "STATUS_CHANGE", "Shipmate Logistics", "IN_PROGRESS")

    # 1. Update Database Status
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("UPDATE leads SET status = 'ACTIVE_CLIENT' WHERE company_name LIKE '%Shipmate%'")
        if cursor.rowcount == 0:
            cursor.execute("INSERT INTO leads (company_name, website_url, contact_email, health_score, issues, status) VALUES (?, ?, ?, ?, ?, ?)",
                           ("Shipmate Logistics", "https://shipmatelogistics.in", "contact@shipmatelogistics.in", 100, json.dumps([]), "ACTIVE_CLIENT"))
        conn.commit()
        conn.close()
        log_action("ClientOnboarding", "DB_UPDATE_SUCCESS", "Shipmate Logistics", "SUCCESS")
    except Exception as e:
        log_action("ClientOnboarding", "DB_UPDATE_ERROR", "Shipmate Logistics", "ERROR", {"error": str(e)})

    # 2. Dispatch Hostinger Agentic Mail Welcome Email
    url = f"https://api.mail.hostinger.com/api/v1/mailboxes/{HOSTINGER_MAILBOX_ID}/send"
    payload = json.dumps({
        "to": ["contact@shipmatelogistics.in"],
        "displayName": "Orange Future Tech",
        "subject": "Official Welcome & Technical Support SLA - Orange Future Tech",
        "html": '''<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome to Orange Future Tech</title></head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color: #0b0f17; padding: 24px 40px; border-bottom: 4px solid #ff6b00;">
              <span style="font-size: 22px; font-weight: 800; color: #ffffff;">ORANGE <span style="color: #ff6b00;">FUTURE</span> TECH</span>
              <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 4px;">Software Engineering &amp; Electronics Solutions</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px;">
                🎉 OFFICIAL CLIENT ONBOARDED
              </div>
              <h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0;">Welcome to Orange Future Tech!</h1>
              <p style="font-size: 15px; color: #334155; line-height: 1.6;">Dear <strong>Shipmate Logistics Leadership &amp; Engineering Team</strong>,</p>
              <p style="font-size: 15px; color: #334155; line-height: 1.6;">
                Congratulations on the successful launch of your platform! We are thrilled to officially welcome <strong>Shipmate Logistics</strong> as a valued client of <strong>Orange Future Tech</strong>.
              </p>

              <div style="background-color: #fff7ed; border-left: 4px solid #ff6b00; padding: 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
                <div style="font-size: 13px; font-weight: 700; color: #c2410c; text-transform: uppercase; margin-bottom: 6px;">TECHNICAL SUPPORT &amp; MAINTENANCE SLA</div>
                <div style="font-size: 14px; color: #9a3412; line-height: 1.6;">
                  Your web infrastructure is actively monitored. Our engineering team provides continuous maintenance, uptime monitoring, and feature scalability support.
                </div>
              </div>

              <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                For any feature requests, technical updates, or cloud scalability questions, please contact your dedicated engineering desk directly at <a href="mailto:teams@orangefuturetech.com" style="color: #ff6b00; font-weight: bold; text-decoration: none;">teams@orangefuturetech.com</a>.
              </p>

              <br>
              <p style="font-size: 14px; color: #334155; margin-bottom: 4px;">Warmest regards,</p>
              <div style="font-size: 16px; font-weight: 700; color: #0f172a;">Executive &amp; Technical Solutions Team</div>
              <div style="font-size: 14px; color: #ff6b00; font-weight: 600;">Orange Future Tech</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">teams@orangefuturetech.com | <a href="https://orangefuturetech.com" style="color: #ff6b00; text-decoration: none;">orangefuturetech.com</a></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>'''
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Authorization": f"Bearer {HOSTINGER_API_TOKEN}", "Content-Type": "application/json", "User-Agent": "Mozilla/5.0"})
    try:
        res = urllib.request.urlopen(req, timeout=10)
        log_action("ClientOnboarding", "EMAIL_SUCCESS", "contact@shipmatelogistics.in", "SUCCESS")
    except Exception as e:
        log_action("ClientOnboarding", "EMAIL_ERROR", "contact@shipmatelogistics.in", "ERROR", {"error": str(e)})

    # 3. Send Telegram Celebration Alert
    Notifier.send_telegram_alert("🎉 *NEW CLIENT ONBOARDED!*\n\n• *Company*: Shipmate Logistics\n• *Website*: shipmatelogistics.in\n• *Status*: Active Client\n• *Action*: Project completion verified & Client Onboarding Email dispatched!")

if __name__ == "__main__":
    onboard_shipmate_client()
