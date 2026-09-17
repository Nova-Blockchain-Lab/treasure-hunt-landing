// Cal.com API v2 — the booking backend once CALCOM_USERNAME + CALCOM_EVENT_SLUG
// are set. Verified live against api.cal.com on 2026-09-16:
//
//   GET  /v2/slots?eventTypeSlug=&username=&start=&end=&timeZone=
//        header cal-api-version: 2024-09-04
//        -> { data: { "2026-09-17": [{ start: "2026-09-17T16:45:00.000+01:00" }, … ] } }
//        0.21–0.56 s for a 60-day window (Microsoft's equivalent: 15.4 s).
//
//   POST /v2/bookings   header cal-api-version: 2026-02-25
//        { start, eventTypeSlug, username, attendee:{name,email,timeZone,language}, guests[] }
//
// Neither call needs an API key while the event type is public — confirmed by a
// bare unauthenticated POST, which came back with field-level validation rather
// than 401. CALCOM_API_KEY is sent only if set, for a private event type.
//
// Why this replaced Microsoft Bookings: Microsoft enforces a 6-digit emailed
// verification code on every self-service booking, server-side and unskippable,
// which put an inbox round-trip in the middle of the funnel. Cal.com books in
// one POST.

const API = "https://api.cal.com/v2"
const SLOTS_VERSION = "2024-09-04"
const BOOKINGS_VERSION = "2026-02-25"

export const CALCOM_USERNAME = process.env.CALCOM_USERNAME
export const CALCOM_EVENT_SLUG = process.env.CALCOM_EVENT_SLUG
export const CALCOM_MINUTES = Number(process.env.CALCOM_EVENT_MINUTES) || 30
// Whatever the Cal.com event type is configured to use. Override if you point
// the event type at Teams/Zoom/Meet rather than Cal Video.
export const CALCOM_LOCATION = process.env.CALCOM_LOCATION || "Cal Video"

/** Cal.com is the backend only once both ids are configured. */
export function calcomConfigured(): boolean {
  return Boolean(CALCOM_USERNAME && CALCOM_EVENT_SLUG)
}

function authHeader(): Record<string, string> {
  const key = process.env.CALCOM_API_KEY
  return key ? { Authorization: `Bearer ${key}` } : {}
}

/**
 * Available slots as Lisbon wall-clock strings ("2026-09-17T16:45"), the same
 * shape the widget already consumes. Asking Cal.com for timeZone=Europe/Lisbon
 * means the returned offsets are Lisbon's, so the first 16 chars are already
 * the local wall-clock — no Date parsing anywhere.
 */
export async function calcomSlots(startDay: string, endDay: string): Promise<string[]> {
  const url =
    `${API}/slots?eventTypeSlug=${encodeURIComponent(CALCOM_EVENT_SLUG!)}` +
    `&username=${encodeURIComponent(CALCOM_USERNAME!)}` +
    `&start=${startDay}&end=${endDay}&timeZone=Europe%2FLisbon`

  const res = await fetch(url, {
    headers: { "cal-api-version": SLOTS_VERSION, ...authHeader() },
  })
  if (!res.ok) throw new Error(`cal.com slots responded ${res.status}: ${(await res.text()).slice(0, 200)}`)

  const body = await res.json()
  const byDay: Record<string, { start: string }[]> = body?.data
  if (!byDay || typeof byDay !== "object") throw new Error("unexpected cal.com slots payload")

  return Object.values(byDay)
    .flat()
    .map((s) => s.start.slice(0, 16))
    .sort()
}

/**
 * "2026-09-17T16:45" (Lisbon wall-clock) -> "2026-09-17T15:45:00.000Z".
 *
 * Lisbon is UTC+0 in winter and UTC+1 in summer, so the offset is resolved from
 * the actual instant rather than assumed. Read the naive string as if it were
 * UTC, ask what Lisbon calls that instant, and subtract the difference.
 */
export function lisbonToUtcIso(slot: string): string {
  const asUtc = new Date(`${slot}:00Z`)
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(asUtc)
  const get = (t: string) => parts.find((p) => p.type === t)!.value
  const rendered = `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`
  const offsetMs = Date.parse(`${rendered}:00Z`) - asUtc.getTime()
  return new Date(asUtc.getTime() - offsetMs).toISOString()
}

export type BookResult =
  | { ok: true; id?: string }
  | { ok: false; taken: boolean; detail: string }

/**
 * Book a slot. One call, no verification code.
 * `slot` is Lisbon wall-clock; Cal.com wants a real instant, so the offset is
 * resolved from the slot list rather than guessed (Lisbon is +00 or +01).
 */
export async function calcomBook(opts: {
  startIso: string
  name: string
  email: string
  notes: string
  guests: string[]
}): Promise<BookResult> {
  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "cal-api-version": BOOKINGS_VERSION,
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({
      start: opts.startIso,
      eventTypeSlug: CALCOM_EVENT_SLUG,
      username: CALCOM_USERNAME,
      attendee: {
        name: opts.name,
        email: opts.email,
        timeZone: "Europe/Lisbon",
        language: "en",
      },
      ...(opts.guests.length ? { guests: opts.guests } : {}),
      ...(opts.notes ? { metadata: { notes: opts.notes.slice(0, 500) } } : {}),
    }),
    cache: "no-store",
  })

  const text = await res.text()
  if (res.ok) {
    let id: string | undefined
    try {
      id = JSON.parse(text)?.data?.uid
    } catch {
      // A 2xx is the booking; an unparsable body only costs us the id.
    }
    return { ok: true, id }
  }
  // Cal.com returns 400/409 with a reason when the slot went in the meantime.
  return { ok: false, taken: /no longer available|already booked|slot/i.test(text), detail: text.slice(0, 300) }
}
