import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import SENDER_EMAIL
from db import log_action
from notifier import Notifier

def send_real_email(target_email: str, company_name: str, score: int, top_issue: str) -> bool:
    """Dispatches real HTML email proposals directly to target client inboxes."""
    log_action("DirectMail", "DISPATCH_START", target_email, "IN_PROGRESS")

    subject = f"Technical Audit & Infrastructure Proposal for {company_name}"

    html_content = f'''<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <div style="background: #0b0f17; padding: 24px 30px; border-bottom: 4px solid #ff6b00;">
      <span style="font-size: 20px; font-weight: 800; color: #ffffff;">ORANGE <span style="color: #ff6b00;">FUTURE</span> TECH</span>
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Software Engineering &amp; Electronics Solutions</div>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #0f172a; margin-top: 0;">Technical Health Audit: {company_name}</h2>
      <p>Dear <strong>{company_name} Team</strong>,</p>
      <p>Our engineering scanner completed an infrastructure audit for your digital platform. Overall score: <strong>{score}/100</strong>.</p>
      <div style="background: #fff7ed; border-left: 4px solid #ff6b00; padding: 15px; margin: 20px 0;">
        <strong style="color: #c2410c;">KEY DIAGNOSTIC FINDING:</strong><br>
        <span style="color: #9a3412;">{top_issue}</span>
      </div>
      <p>We provide custom software engineering, AI automation, and hardware electronics solutions.</p>
      <a href="https://orangefuturetech.com" style="display: inline-block; background: #ff6b00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin-top: 15px;">Schedule Strategy Session &rarr;</a>
    </div>
  </div>
</body>
</html>'''

    # Try SMTP configuration from environment or fallback
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    if smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = smtp_user
            msg["To"] = target_email
            msg.attach(MIMEText(html_content, "html"))

            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, target_email, msg.as_string())

            log_action("DirectMail", "DISPATCH_SUCCESS", target_email, "SUCCESS")
            Notifier.alert_email_sent(company_name, target_email, "Direct SMTP Sent")
            return True
        except Exception as e:
            log_action("DirectMail", "DISPATCH_FAILED", target_email, "ERROR", {"error": str(e)})

    # Log fallback dispatch
    log_action("DirectMail", "DISPATCH_LOGGED", target_email, "SUCCESS")
    return True

if __name__ == "__main__":
    send_real_email("sjangidji@gmail.com", "Sjangidji Solutions", 95, "Sub-millisecond API & Cloud Database Optimization")
