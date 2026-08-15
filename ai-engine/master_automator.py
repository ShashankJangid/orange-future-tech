#!/usr/bin/env python3
"""
Orange Future Tech - Master Autonomous Supervisor & Automator
--------------------------------------------------------------
Unifies and supervises all 24/7 autonomous AI services:
1. Secure API Server (port 8080)
2. Agentic AI Core Loop (Lead Gen, Web Audits, Outreach, Social Publishing)
3. n8n Cloud MCP & Workflow Synchronization
4. Telegram & Twilio Real-Time Alert Dispatcher
5. cc-connect AI Coding Agent Bridge
"""

import sys
import os
import time
import subprocess
import signal
import json
import argparse
from pathlib import Path

# Add script folder to path
SCRIPT_DIR = Path(__file__).parent.resolve()
sys.path.insert(0, str(SCRIPT_DIR))

import config
from db import init_db, log_action, get_recent_logs
from notifier import Notifier

PID_FILE = SCRIPT_DIR / "master_automator.pid"
LOG_DIR = SCRIPT_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)

class MasterAutomator:
    """Supervises and manages all autonomous business services."""

    def __init__(self):
        init_db()
        self.processes = {}

    def log(self, msg: str):
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        formatted = f"[{timestamp}] [MASTER AUTOMATOR] {msg}"
        print(formatted)
        log_action("MasterAutomator", "INFO", msg, "SUCCESS")

    def run_health_check(self) -> dict:
        """Executes system health check and returns status summary."""
        self.log("Running comprehensive health check...")
        status_script = SCRIPT_DIR / "engine_status.py"
        res = subprocess.run([sys.executable, str(status_script)], capture_output=True, text=True)
        self.log("Health check completed.")
        return {"output": res.stdout, "errors": res.stderr}

    def run_single_cycle(self):
        """Runs a complete one-shot autonomous cycle."""
        self.log("Starting one-shot autonomous AI cycle...")
        Notifier.send_telegram_alert("🚀 *ONE-SHOT AUTONOMOUS AI CYCLE INITIATED*")

        from agent_core import AutonomousBusinessAgent
        from n8n_client import N8nClient

        # 1. Run Agent Core Operations
        agent = AutonomousBusinessAgent()
        agent.run_autonomous_cycle()

        # 2. Sync with n8n Cloud MCP Server
        self.log("Synchronizing with n8n Cloud MCP Server...")
        mcp_res = N8nClient.call_mcp_method("initialize")
        mcp_status = "SUCCESS" if "result" in mcp_res else "WARNING"
        self.log(f"n8n MCP Sync Result: {mcp_status}")

        Notifier.send_telegram_alert("✅ *ONE-SHOT AUTONOMOUS AI CYCLE COMPLETED SUCCESSFULLY*")
        self.log("One-shot cycle execution complete.")

    def start_subprocesses(self):
        """Spawns background processes for API server, agent core loop, and cc-connect bridge."""
        self.log("Starting all background autonomous services...")

        # 1. Secure API Server (port 8080)
        server_log = open(LOG_DIR / "server.log", "a")
        server_proc = subprocess.Popen(
            [sys.executable, str(SCRIPT_DIR / "server.py")],
            stdout=server_log,
            stderr=server_log
        )
        self.processes["api_server"] = {"proc": server_proc, "cmd": "server.py", "log": server_log}
        self.log(f"API Server started (PID {server_proc.pid})")

        # 2. Agent Core Loop Daemon
        core_log = open(LOG_DIR / "agent_core.log", "a")
        core_proc = subprocess.Popen(
            [sys.executable, str(SCRIPT_DIR / "agent_core.py")],
            stdout=core_log,
            stderr=core_log
        )
        self.processes["agent_core"] = {"proc": core_proc, "cmd": "agent_core.py", "log": core_log}
        self.log(f"Agent Core Loop started (PID {core_proc.pid})")

        # 3. cc-connect Bridge
        bridge_script = SCRIPT_DIR / "run_cc_connect.sh"
        if bridge_script.exists():
            bridge_log = open(LOG_DIR / "cc_connect.log", "a")
            bridge_proc = subprocess.Popen(
                ["bash", str(bridge_script)],
                stdout=bridge_log,
                stderr=bridge_log
            )
            self.processes["cc_connect"] = {"proc": bridge_proc, "cmd": "run_cc_connect.sh", "log": bridge_log}
            self.log(f"cc-connect Bridge started (PID {bridge_proc.pid})")

        # Save main PID
        with open(PID_FILE, "w") as f:
            f.write(str(os.getpid()))

        Notifier.send_telegram_alert(
            "🌟 *ORANGE FUTURE TECH - MASTER AUTOMATION SUPERVISOR ONLINE*\n\n"
            f"- API Server: PID {server_proc.pid} (Port 8080)\n"
            f"- Agent Core: PID {core_proc.pid}\n"
            "- Real-Time Telemetry: Active"
        )

    def supervise_loop(self):
        """Continuously monitors sub-processes and restarts them if killed."""
        self.log("Entering continuous supervisor monitoring loop...")
        try:
            while True:
                time.sleep(10)
                for name, info in list(self.processes.items()):
                    proc = info["proc"]
                    ret = proc.poll()
                    if ret is not None:
                        self.log(f"WARNING: Sub-process '{name}' exited with code {ret}. Restarting...")
                        Notifier.send_telegram_alert(f"⚠️ *PROCESS ALERT*: `{name}` exited with code {ret}. Restarting now...")
                        
                        log_file = info["log"]
                        if name == "api_server":
                            new_proc = subprocess.Popen([sys.executable, str(SCRIPT_DIR / "server.py")], stdout=log_file, stderr=log_file)
                        elif name == "agent_core":
                            new_proc = subprocess.Popen([sys.executable, str(SCRIPT_DIR / "agent_core.py")], stdout=log_file, stderr=log_file)
                        elif name == "cc_connect":
                            new_proc = subprocess.Popen(["bash", str(SCRIPT_DIR / "run_cc_connect.sh")], stdout=log_file, stderr=log_file)
                        
                        self.processes[name]["proc"] = new_proc
                        self.log(f"Sub-process '{name}' restarted with PID {new_proc.pid}")
        except KeyboardInterrupt:
            self.log("Shutdown signal received. Terminating all sub-processes...")
            self.stop_all()

    def stop_all(self):
        """Stops all running sub-processes safely."""
        self.log("Stopping all autonomous services...")
        for name, info in self.processes.items():
            proc = info["proc"]
            if proc.poll() is None:
                proc.terminate()
                self.log(f"Terminated '{name}' (PID {proc.pid})")
            if "log" in info:
                info["log"].close()
        
        if PID_FILE.exists():
            PID_FILE.unlink()
        
        Notifier.send_telegram_alert("🛑 *MASTER AUTOMATION SUPERVISOR STOPPED*")
        self.log("All services shut down cleanly.")

def main():
    parser = argparse.ArgumentParser(description="Orange Future Tech Master Automator")
    parser.add_argument("command", choices=["start", "stop", "status", "once"], help="Automation command")
    args = parser.parse_args()

    automator = MasterAutomator()

    if args.command == "once":
        automator.run_single_cycle()
    elif args.command == "status":
        health = automator.run_health_check()
        print(health["output"])
    elif args.command == "start":
        automator.start_subprocesses()
        automator.supervise_loop()
    elif args.command == "stop":
        if PID_FILE.exists():
            with open(PID_FILE, "r") as f:
                pid = int(f.read().strip())
            try:
                os.kill(pid, signal.SIGTERM)
                print(f"Sent SIGTERM to Master Automator (PID {pid})")
            except Exception as e:
                print(f"Error stopping process: {e}")
        else:
            print("No active Master Automator PID file found.")

if __name__ == "__main__":
    main()
