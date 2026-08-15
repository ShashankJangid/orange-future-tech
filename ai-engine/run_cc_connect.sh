#!/usr/bin/env bash

# run_cc_connect.sh - Install and launch cc-connect bridge for AGY agents

# Ensure we are in the project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Install cc-connect if not already installed
if ! command -v cc-connect >/dev/null 2>&1; then
  echo "cc-connect not found, running install script..."
  if [[ -f "install_cc_connect.sh" ]]; then
    bash ./install_cc_connect.sh
  else
    echo "install_cc_connect.sh not found. Please ensure the script exists."
    exit 1
  fi
else
  echo "cc-connect already installed."
fi

# Launch cc-connect in background
echo "Starting cc-connect bridge..."
cc-connect &
PID=$!
echo "cc-connect started with PID $PID"

# Keep the script alive to monitor the process (optional)
wait $PID
