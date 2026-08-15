#!/usr/bin/env bash

# Orange Future Tech - Master Automation Launcher Script
# Usage:
#   ./start_all.sh start   - Start full 24/7 background automation suite
#   ./start_all.sh once    - Run single full automated cycle and exit
#   ./start_all.sh status  - Perform instant system health diagnostic check
#   ./start_all.sh stop    - Stop all running background automation processes

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_EXEC="python3"

COMMAND="${1:-start}"

echo "==========================================================="
echo "  ORANGE FUTURE TECH - 24/7 MASTER AUTOMATION SYSTEM       "
echo "==========================================================="

case "$COMMAND" in
  start)
    echo "Launching 24/7 Master Autonomous Suite..."
    $PYTHON_EXEC "$SCRIPT_DIR/ai-engine/master_automator.py" start
    ;;
  once)
    echo "Running single autonomous AI cycle..."
    $PYTHON_EXEC "$SCRIPT_DIR/ai-engine/master_automator.py" once
    ;;
  status)
    echo "Running diagnostic health check..."
    $PYTHON_EXEC "$SCRIPT_DIR/ai-engine/master_automator.py" status
    ;;
  stop)
    echo "Stopping Master Automation Suite..."
    $PYTHON_EXEC "$SCRIPT_DIR/ai-engine/master_automator.py" stop
    ;;
  *)
    echo "Usage: $0 {start|once|status|stop}"
    exit 1
    ;;
esac
