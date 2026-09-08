// Plain-text summary for LLM crawlers and AI search. Lives at /llms.txt.
// Content is grounded in the same event data as the reports — no invented
// numbers. Update the figures here when a new event report ships.
const BASE = 'https://www.treasurehunt.pt'

const body = `# Treasure Hunt

> Interactive event engagement game (a QR and NFC scavenger hunt) built by NOVA
> Blockchain Lab at NOVA IMS, Lisbon. Attendees play in the phone browser with
> no app download, scan NFC tags or QR codes placed around a venue, climb a live
> leaderboard, and spend points on real items in a built-in merch store.
> Organisers choose where checkpoints go, so the game drives foot traffic to
> sponsors, booths and under-visited areas, and get real-time analytics plus a
> post-event report.

## What it is used for
- Conferences and summits: turn passive attendees into active explorers, fill
  the gaps between sessions, give sponsors measurable booth traffic.
- Trade shows and expos: pull visitors to specific stands.
- Corporate events and team building: product launches, offsites, internal summits.
- Universities: orientation weeks, open days, campus tours.
- Festivals, brand activations, hackathons.

## How it works
1. Checkpoints (NFC tags and/or QR codes) are placed where the organiser wants traffic.
2. Attendees open a URL, sign in with one tap, and start playing in roughly 30 seconds.
3. Each tap or scan is an instant reward and a tracked data point.
4. A live leaderboard drives competition; points buy real merch in-game.
5. The organiser gets a live dashboard during the event and a full report after.

## Deployments and measured results
- ETHDenver 2026 (Denver, CO, Feb 18-21): 207 players, 992 treasures found,
  462,255 BUFFI minted, 59 checkpoints. Report: ${BASE}/ethdenver-report
- Future Maker 2026 (NOVA IMS, Lisbon, Mar 16-19): 2,591 treasures, 115
  checkpoints. Report: ${BASE}/futuremaker-report
- Portugal Smart Cities Summit 2026 (FIL Pavilion 3, Lisbon, May 12-14): 351
  players, 8,123 treasures, 103 checkpoints. Report: ${BASE}/smartcities-report
- Festival da Juventude 2026 (Cadaval, May 22-23): 126 players, 2,182 treasures,
  57 tags. Report: ${BASE}/cadaval-report
- Spring Bootcamp 2026 (NOVA IMS, Apr 7): 7 teams, 20 hunters, 220 treasures,
  42 tags. Report: ${BASE}/springbootcamp-report
- Data with Purpose Summit 2026 (Taguspark, Oeiras, Jun 25): 58 players, 777 tag
  finds, 25 tags. Report: ${BASE}/datasummit-report

Totals across deployments: 10,000+ treasure finds, 500+ checkpoints, 500+ players, 8 events.

## Technical notes
- Runs entirely in the mobile browser. No app download, no wallet setup, no seed
  phrases; sign-in is one tap.
- Built on Nova Cidade L3, a dedicated Layer 3 chain. A built-in paymaster covers
  all transaction fees, so participants never pay anything.
- Every reward minted, checkpoint scanned and merch purchase is recorded and
  verifiable, which is what lets sponsors audit engagement figures.

## Packages
Starter (up to 100 attendees), Pro (100-1,000), Enterprise (1,000+). Pricing is
quote-based; there is no public price list. NFC checkpoints, custom checkpoint
design and custom reward names start at Pro. On-site staff, custom feature
development, a multi-event dashboard and the post-event analytics report are
Enterprise.

## Key pages
- Home: ${BASE}
- NFC treasure hunt: ${BASE}/nfc-treasure-hunt
- QR scavenger hunt for events: ${BASE}/qr-scavenger-hunt-events
- Event gamification: ${BASE}/event-gamification
- Trade show booth traffic: ${BASE}/trade-show-booth-traffic
- Team building scavenger hunt: ${BASE}/team-building-scavenger-hunt
- Scavenger hunts for universities: ${BASE}/scavenger-hunt-universities
- Goosechase alternative: ${BASE}/goosechase-alternative
- Scavify alternative: ${BASE}/scavify-alternative
- Blog: ${BASE}/blog

## Languages
English (${BASE}), Portuguese (${BASE}/pt), Spanish (${BASE}/es), Italian
(${BASE}/it), German (${BASE}/de), French (${BASE}/fr). The home page is fully
translated in all six; the landing pages and blog are written per language.

## Contact
NOVA Blockchain Lab, NOVA IMS, Lisbon, Portugal. nova.blockchain.lab@novaims.unl.pt
`

export function GET() {
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
