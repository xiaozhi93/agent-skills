#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CURSOR_SKILLS="${HOME}/.cursor/skills"
SKILL="${1:-*}"

link_skill() {
  local name="$1"
  local src="${ROOT}/skills/${name}"
  local dest="${CURSOR_SKILLS}/${name}"

  if [[ ! -d "$src" ]]; then
    echo "ERROR: skill not found: ${name}" >&2
    return 1
  fi
  if [[ -e "$dest" && ! -L "$dest" ]]; then
    echo "ERROR: ${dest} exists and is not a symlink. Remove or backup first." >&2
    return 1
  fi

  mkdir -p "$CURSOR_SKILLS"
  ln -sfn "$src" "$dest"
  echo "Linked ${dest} -> ${src}"
}

if [[ "$SKILL" == "--all" || "$SKILL" == "*" ]]; then
  for dir in "${ROOT}/skills"/*/; do
    link_skill "$(basename "$dir")"
  done
else
  link_skill "$SKILL"
fi

echo "Done. Edit files in ${ROOT}/skills/ and test in a new Cursor chat."
