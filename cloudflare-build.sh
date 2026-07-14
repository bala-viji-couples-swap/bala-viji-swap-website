#!/usr/bin/env bash
# Cloudflare Pages: build a clean static bundle WITHOUT .git
# Settings:
#   Build command:       bash cloudflare-build.sh
#   Build output dir:    dist
#   Framework preset:    None
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

rm -rf dist
mkdir -p dist

# Site runtime only
cp -a assets css js looks stories tv dist/
cp -a *.html dist/ 2>/dev/null || true

# Optional: ignore private draft if present
rm -f dist/pasted-text.txt 2>/dev/null || true

# Safety: never ship git
rm -rf dist/.git

echo "Cloudflare dist ready:"
du -sh dist
find dist -type f | wc -l
# Fail build if anything huge slipped in
while IFS= read -r -d '' f; do
  size=$(wc -c <"$f")
  # 20 MiB hard stop (Workers limit is 25 MiB)
  if [ "$size" -gt $((20 * 1024 * 1024)) ]; then
    echo "ERROR: file too large for Cloudflare assets: $f ($size bytes)" >&2
    exit 1
  fi
done < <(find dist -type f -print0)

echo "OK — no file over 20 MiB"
