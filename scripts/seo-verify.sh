#!/usr/bin/env bash
# SEO verification harness for www.treasurehunt.pt.
#
# Re-pulls Google Search Console search analytics for the last 28 days and diffs
# against the 2026-06-27 baseline captured right after the SEO pass shipped. The
# point of the SEO work ("does it actually improve search?") is a LAGGING metric:
# Google must recrawl -> reindex -> re-rank, which takes days to weeks. Run this
# ~3+ weeks after deploy (≈ 2026-07-20 onward) to see real movement.
#
# Requires gcloud Application Default Credentials with the webmasters scope on
# this machine (see ~/.claude/CLAUDE.md "Google Search Console API Access").
#
# Usage:  bash scripts/seo-verify.sh
set -euo pipefail

PROP="sc-domain%3Atreasurehunt.pt"
QUOTA_PROJECT="graphic-ring-205711"
API="https://www.googleapis.com/webmasters/v3/sites/${PROP}/searchAnalytics/query"

# Baseline captured 2026-06-27 (28d window): 1 click, 99 impressions, pos ~12.9
BASE_CLICKS=1
BASE_IMPR=99

END=$(date -v-3d +%Y-%m-%d 2>/dev/null || date -d '3 days ago' +%Y-%m-%d)
START=$(date -v-31d +%Y-%m-%d 2>/dev/null || date -d '31 days ago' +%Y-%m-%d)

TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null) || {
  echo "ERROR: could not get a GSC access token (gcloud ADC). Re-auth with:"
  echo "  gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform"
  exit 1
}

q() {  # $1 = JSON body
  curl -s -H "Authorization: Bearer $TOKEN" -H "x-goog-user-project: ${QUOTA_PROJECT}" \
    -H "Content-Type: application/json" -d "$1" "$API"
}

echo "=== treasurehunt.pt search performance  ${START} -> ${END} ==="
q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[]}" | python3 -c "
import json,sys
d=json.load(sys.stdin); r=(d.get('rows') or [{}])[0]
c=r.get('clicks',0); i=r.get('impressions',0); p=r.get('position',0)
print(f'  clicks      : {c:.0f}   (baseline ${BASE_CLICKS}  ->  delta {c-${BASE_CLICKS}:+.0f})')
print(f'  impressions : {i:.0f}   (baseline ${BASE_IMPR}  ->  delta {i-${BASE_IMPR}:+.0f})')
print(f'  avg position: {p:.1f}')
"

echo ""
echo "=== top queries ==="
q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"query\"],\"rowLimit\":25}" | python3 -c "
import json,sys
for r in json.load(sys.stdin).get('rows',[]):
  print(f\"  {r['clicks']:>3.0f}c {r['impressions']:>5.0f}i  pos {r['position']:>4.1f}  {r['keys'][0]}\")
"

echo ""
echo "=== new landing-page URLs (impressions = Google is ranking them) ==="
q "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"page\"],\"rowLimit\":100}" | python3 -c "
import json,sys
slugs=['nfc-treasure-hunt','event-gamification','qr-scavenger-hunt-events','goosechase-alternative','scavify-alternative','scavenger-hunt-universities','trade-show-booth-traffic','team-building-scavenger-hunt','caca-ao-tesouro-digital-empresas','peddy-paper-digital','team-building-eventos']
rows=[r for r in json.load(sys.stdin).get('rows',[]) if any(s in r['keys'][0] for s in slugs)]
if not rows: print('  (none yet — pages discovered but not yet earning impressions; check again later)')
for r in rows: print(f\"  {r['clicks']:>3.0f}c {r['impressions']:>5.0f}i  pos {r['position']:>4.1f}  {r['keys'][0]}\")
"
