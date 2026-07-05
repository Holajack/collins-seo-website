#!/usr/bin/env bash
#
# sync.sh — pull The Perfect Brew's latest code from the dev branch and deploy.
#
# Usage:
#   ./sync.sh                 # sync with a default commit message
#   ./sync.sh "your message"  # sync with your own commit message
#
# Every run clones the dev branch fresh into a throwaway folder (wiping any
# leftover first, so it can never collide with itself), copies the app over
# this repo, then commits and pushes — which triggers the Vercel deploy.

{  # Brace-wrapped so bash reads the whole script before executing it — that
   # makes it safe even when a sync overwrites this very file mid-run.

  set -euo pipefail

  BRANCH="claude/coffee-brew-calculator-nr8xdn"
  SRC="https://github.com/Holajack/collins-seo-website.git"
  TMP="/tmp/pb-sync"
  MSG="${1:-Sync from dev branch}"

  # The repo to update is wherever this script lives (perfect-brew's root), so
  # it works no matter where you keep your clone.
  DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

  printf '→ Cloning %s …\n' "$BRANCH"
  rm -rf "$TMP"
  git clone --quiet --depth 1 --branch "$BRANCH" "$SRC" "$TMP"

  printf '→ Copying the app into %s …\n' "$DEST"
  cp -R "$TMP/standalone/." "$DEST/"
  rm -rf "$TMP"

  cd "$DEST"
  git add -A

  if git diff --cached --quiet; then
    printf '✓ Already up to date — nothing new to sync.\n'
    exit 0
  fi

  printf '→ Committing and pushing …\n'
  git commit --quiet -m "$MSG"

  # Retry the push a few times so a flaky connection doesn't fail the sync.
  for attempt in 1 2 3 4; do
    if git push; then
      printf '✓ Synced and pushed. Vercel will deploy in a minute or two.\n'
      exit 0
    fi
    printf '… push failed (attempt %s) — retrying in %ss\n' "$attempt" "$((attempt * 2))"
    sleep "$((attempt * 2))"
  done

  printf '✗ Pushed commit is ready locally, but the push kept failing.\n'
  printf '  Check your connection and run: git push\n'
  exit 1
}
