#!/usr/bin/env node
/**
 * Preflight for the Cal.com booking backend.
 *
 *   CALCOM_USERNAME=... CALCOM_EVENT_SLUG=... node scripts/check-booking.mjs
 *
 * Confirms the event type resolves, is publicly bookable without an API key,
 * and actually returns slots — the three things that silently break the picker.
 * Read-only: it never creates a booking.
 */
const username = process.env.CALCOM_USERNAME
const slug = process.env.CALCOM_EVENT_SLUG
const key = process.env.CALCOM_API_KEY

const ok = (m) => console.log(`  \x1b[32mok\x1b[0m    ${m}`)
const bad = (m) => console.log(`  \x1b[31mFAIL\x1b[0m  ${m}`)
const warn = (m) => console.log(`  \x1b[33mwarn\x1b[0m  ${m}`)

if (!username || !slug) {
  console.log("\nCal.com is NOT configured — the site is using the Microsoft Bookings fallback.")
  console.log("Set both of these (see .env.example) to switch:\n")
  console.log("  CALCOM_USERNAME    your cal.com handle, from your booking link cal.com/<handle>")
  console.log("  CALCOM_EVENT_SLUG  the event type slug, from cal.com/<handle>/<slug>\n")
  process.exit(1)
}

const auth = key ? { Authorization: `Bearer ${key}` } : {}
const day = (offset) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10)

console.log(`\nChecking cal.com/${username}/${slug}\n`)

const url =
  `https://api.cal.com/v2/slots?eventTypeSlug=${encodeURIComponent(slug)}` +
  `&username=${encodeURIComponent(username)}&start=${day(0)}&end=${day(60)}` +
  `&timeZone=Europe%2FLisbon`

const started = Date.now()
let res
try {
  res = await fetch(url, { headers: { "cal-api-version": "2024-09-04", ...auth } })
} catch (err) {
  bad(`could not reach api.cal.com: ${err.message}`)
  process.exit(1)
}
const ms = Date.now() - started
const text = await res.text()

if (res.status === 404) {
  bad(`event type not found. Check the handle and slug in your cal.com booking link.`)
  process.exit(1)
}
if (!res.ok) {
  bad(`slots responded ${res.status}: ${text.slice(0, 200)}`)
  process.exit(1)
}
ok(`event type resolves (${ms} ms)`)
if (!key) ok("publicly bookable with no API key — nothing secret to deploy")
else warn("CALCOM_API_KEY is set; only needed if the event type is private")

let byDay
try {
  byDay = JSON.parse(text).data
} catch {
  bad("unexpected response shape from /v2/slots")
  process.exit(1)
}

const days = Object.keys(byDay ?? {})
const slots = Object.values(byDay ?? {}).flat()
if (!slots.length) {
  bad("0 slots in the next 60 days — the picker would show its fallback.")
  console.log("        Check the event type's availability schedule and that a calendar is connected.")
  process.exit(1)
}
ok(`${slots.length} slots across ${days.length} days`)

const first = slots[0].start
ok(`first slot ${first}  (Lisbon wall-clock used by the widget: ${first.slice(0, 16)})`)

// The SMALLEST gap between consecutive slots on any day. The first gap alone is
// misleading: a day's first two free slots are often not adjacent.
const mins = (() => {
  let min = Infinity
  for (const d of Object.values(byDay)) {
    for (let i = 1; i < d.length; i++) {
      const gap = (Date.parse(d[i].start) - Date.parse(d[i - 1].start)) / 60000
      if (gap > 0 && gap < min) min = gap
    }
  }
  return Number.isFinite(min) ? min : null
})()
if (mins) {
  const configured = Number(process.env.CALCOM_EVENT_MINUTES) || 30
  if (mins === configured) ok(`slot interval ${mins} min matches CALCOM_EVENT_MINUTES`)
  else warn(`slot interval looks like ${mins} min but CALCOM_EVENT_MINUTES=${configured} — the widget would display the wrong duration`)
}

const book = await fetch("https://api.cal.com/v2/bookings", {
  method: "POST",
  headers: { "cal-api-version": "2026-02-25", "Content-Type": "application/json", ...auth },
  body: JSON.stringify({}),
})
if (book.status === 401 || book.status === 403) bad(`booking endpoint requires auth (${book.status}) — set CALCOM_API_KEY`)
else ok(`booking endpoint reachable (${book.status} on an empty body, as expected)`)

console.log("\nReady. Set these in Vercel and redeploy.\n")
