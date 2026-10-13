#!/usr/bin/env bash

set -e

install_npm() {
  echo "Installing cc-connect via npm..."
  npm install -g cc-connect@latest
  echo "cc-connect installed via npm."
}

install_brew() {
  echo "Installing cc-connect via Homebrew..."
  brew install cc-connect
  echo "cc-connect installed via Homebrew."
}

install_go() {
  echo "Installing cc-connect via Go..."
  go install github.com/chenhg5/cc-connect/cmd/cc-connect@latest
  echo "cc-connect installed via Go."
}

if command -v npm >/dev/null 2>&1; then
  install_npm
elif command -v brew >/dev/null 2>&1; then
  install_brew
elif command -v go >/dev/null 2>&1; then
  install_go
else
  echo "No supported package manager found."
  exit 1
fi

echo "Installation complete."
