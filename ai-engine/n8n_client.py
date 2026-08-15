import urllib.request
import json
import os
from db import log_action

N8N_MCP_URL = os.getenv("N8N_MCP_URL", "https://orangefuturetech.app.n8n.cloud/mcp-server/http")
N8N_BEARER_TOKEN = os.getenv("N8N_BEARER_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxODgxNDQ5Yi0wZjUzLTQ1YzMtOTI3Zi0yY2NkYzFkOTFlMWYiLCJpc3MiOiJuOG4iLCJhdWQiOiJtY3Atc2VydmVyLWFwaSIsImp0aSI6ImFkZDg4Mzg0LTE4OWItNDcyZS05YjE0LTBlZDNiMDA5MWIwZSIsImlhdCI6MTc4Njc4ODE5OH0.yh3CfcIxflAgj8t56-4hGWHjRQ5pIoukpaT74iaTwhE")

class N8nClient:
    """Client for triggering n8n cloud workflows and MCP server integrations."""

    @staticmethod
    def call_mcp_method(method: str, params: dict = None) -> dict:
        log_action("N8nClient", "MCP_CALL_START", method, "IN_PROGRESS")
        payload = json.dumps({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params or {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "orange-ai-engine", "version": "1.0.0"}
            }
        }).encode("utf-8")

        req = urllib.request.Request(
            N8N_MCP_URL,
            data=payload,
            headers={
                "Authorization": f"Bearer {N8N_BEARER_TOKEN}",
                "Content-Type": "application/json",
                "Accept": "application/json, text/event-stream",
                "User-Agent": "OrangeFutureTech/1.0"
            }
        )
        try:
            res = urllib.request.urlopen(req, timeout=10)
            raw_response = res.read().decode("utf-8")
            
            # Parse SSE format if present (e.g. data: {...})
            data = None
            for line in raw_response.splitlines():
                if line.startswith("data: "):
                    data = json.loads(line[6:])
                    break
            if data is None:
                data = json.loads(raw_response)

            log_action("N8nClient", "MCP_CALL_SUCCESS", method, "SUCCESS")
            return data
        except Exception as e:
            log_action("N8nClient", "MCP_CALL_FAILED", method, "ERROR", {"error": str(e)})
            return {"error": str(e)}

if __name__ == "__main__":
    res = N8nClient.call_mcp_method("initialize")
    print("N8n MCP Response:", json.dumps(res, indent=2))
