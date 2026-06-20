#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL="${1:-*}"

if [[ "$SKILL" == "--all" ]]; then
  SKILL="*"
fi

echo "Linking skill(s): $SKILL"
npx skills add "$ROOT" --skill "$SKILL" -g -a cursor -y
echo "Done. Edit files in $ROOT/skills/ and test in a new Cursor chat."
