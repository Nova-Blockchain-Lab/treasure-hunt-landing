import { NextResponse } from "next/server"

// Live free/busy for the "Bookings with me" page of daraujo@novaims.unl.pt.
//
// This is the same endpoint the public Microsoft booking page calls for a
// signed-out visitor, so it needs no token, no app registration and no tenant
// admin consent — verified with a bare server-side POST. It is an internal
// Microsoft API though, not a documented one: if the shape ever changes this
// route returns 503 and the caller should fall back to linking out to /book.
//
// The ids come from GET <BOOKINGS_BASE>/services and are stable per mailbox.
const BOOKINGS_BASE =
  "https://bookings.cloud.microsoft/BookingsService/api/V1/bookingBusinessesc2/mbx:84c98cdef247426285ae07dfbe0a4b95@e4bd69ff-e6f7-4c2e-b247-41b54ba2490e"
const STAFF_ID = "1c1c7887-e0fc-479b-ac7d-6983d0f026ff"
const SERVICE_ID = "a7b0ce05-cbfb-4954-a359-00c28aac1115" // "30 minutes meeting"
const SLOT_MINUTES = 30

// Microsoft returns and expects wall-clock strings paired with a Windows time
// zone name. Everything here stays in Lisbon local time and is labelled as
// such in the UI. ponytail: no per-visitor conversion; add one only if the
// analytics show real non-Iberian booking traffic.
const TIME_ZONE = "GMT Standard Time"

type AvailabilityItem = {
  status: string
  startDateTime: { dateTime: string }
  endDateTime: { dateTime: string }
}

/** "2026-09-09T13:30:00" -> minutes since midnight, no Date/TZ maths. */
function toMinutes(dateTime: string) {
  const [h, m] = dateTime.slice(11, 16).split(":").map(Number)
  return h * 60 + m
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

/** Cut one free window into whole slots: 13:30-14:30 -> 13:30, 14:00. */
function slotsIn(item: AvailabilityItem) {
  const day = item.startDateTime.dateTime.slice(0, 10)
  const end = toMinutes(item.endDateTime.dateTime)
  const out: string[] = []
  for (let t = toMinutes(item.startDateTime.dateTime); t + SLOT_MINUTES <= end; t += SLOT_MINUTES) {
    out.push(`${day}T${pad(Math.floor(t / 60))}:${pad(t % 60)}`)
  }
  return out
}

/**
 * "now" as Lisbon wall-clock ("2026-09-08T00:53"), so it compares directly
 * against the slot strings. Using the UTC date instead would query the wrong
 * day for the hour either side of midnight, and would offer slots already past.
 */
function lisbonNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)!.value
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`
}

export async function GET(request: Request) {
  const daysParam = Number(new URL(request.url).searchParams.get("days"))
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(daysParam, 1), 60) : 21

  const now = lisbonNow()
  const start = new Date(`${now.slice(0, 10)}T00:00:00Z`)
  const end = new Date(start.getTime() + days * 86400000)
  const iso = (d: Date) => d.toISOString().slice(0, 10)

  try {
    const res = await fetch(`${BOOKINGS_BASE}/getStaffAvailability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        staffIds: [STAFF_ID],
        serviceId: SERVICE_ID,
        startDateTime: { dateTime: `${iso(start)}T00:00:00`, timeZone: TIME_ZONE },
        endDateTime: { dateTime: `${iso(end)}T23:59:59`, timeZone: TIME_ZONE },
      }),
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Bookings responded ${res.status}`)

    const data = await res.json()
    const items: AvailabilityItem[] = data?.staffAvailabilityResponse?.[0]?.availabilityItems
    if (!Array.isArray(items)) throw new Error("unexpected availability payload")

    const slots = items
      .filter((i) => i.status === "BOOKINGSAVAILABILITYSTATUS_AVAILABLE")
      .flatMap(slotsIn)
      .filter((s) => s > now) // upstream happily returns this morning's slots

    return NextResponse.json({ timeZone: "Europe/Lisbon", durationMinutes: SLOT_MINUTES, slots })
  } catch (err) {
    console.error("slots: Bookings availability lookup failed", err)
    return NextResponse.json({ error: "Availability unavailable" }, { status: 503 })
  }
}
