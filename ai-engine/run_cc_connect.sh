#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v cc-connect >/dev/null 2>&1; then
  echo "cc-connect not found, running install script..."
  if [[ -f "install_cc_connect.sh" ]]; then
    bash ./install_cc_connect.sh
  else
    echo "install_cc_connect.sh not found."
    exit 1
  fi
else
  echo "cc-connect already installed."
fi

echo "Starting cc-connect bridge with strictly English configuration..."
cc-connect --config "$SCRIPT_DIR/config.toml" &
PID=$!
echo "cc-connect started with PID $PID"

wait $PID
