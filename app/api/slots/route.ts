import { NextResponse } from "next/server"
import { lisbonNow, type SlotsResponse } from "@/lib/slots"
import { CALCOM_LOCATION, CALCOM_MINUTES, calcomConfigured, calcomSlots } from "@/lib/calcom"

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
const DAYS = 60

// Microsoft returns and expects wall-clock strings paired with a Windows time
// zone name. Everything here stays in Lisbon local time and is labelled as
// such in the UI. ponytail: no per-visitor conversion; add one only if the
// analytics show real non-Iberian booking traffic.
const TIME_ZONE = "GMT Standard Time"

// getStaffAvailability takes ~15 s on EVERY call, warm or cold (measured: 13.9,
// 15.5, 15.4 s). That is upstream and cannot be tuned, so the only fix is that
// no visitor is ever on the other end of it: this route is prerendered and
// revalidated in the background, making it a CDN hit for everyone. The 15 s is
// paid by a regeneration nobody is waiting on.
//
// It follows that the response body must NOT depend on the moment it was
// generated, or the cached copy is wrong as soon as it is served. So the
// already-past slots are dropped client-side (see components/booking-widget)
// rather than here.
export const dynamic = "force-static"
export const revalidate = 300

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

export async function GET() {
  const start = new Date(`${lisbonNow().slice(0, 10)}T00:00:00Z`)
  const end = new Date(start.getTime() + DAYS * 86400000)
  const iso = (d: Date) => d.toISOString().slice(0, 10)

  // Cal.com is the backend once CALCOM_USERNAME + CALCOM_EVENT_SLUG are set.
  // It answers in ~0.2 s and books without a verification code.
  if (calcomConfigured()) {
    try {
      const body: SlotsResponse = {
        timeZone: "Europe/Lisbon",
        durationMinutes: CALCOM_MINUTES,
        location: CALCOM_LOCATION,
        slots: await calcomSlots(iso(start), iso(end)),
      }
      return NextResponse.json(body)
    } catch (err) {
      console.error("slots: cal.com availability lookup failed", err)
      return NextResponse.json({ error: "Availability unavailable" }, { status: 503 })
    }
  }

  // ponytail: Microsoft Bookings fallback, kept only until Cal.com is live.
  // Delete this block, BOOKINGS_BASE/STAFF_ID/SERVICE_ID and slotsIn/toMinutes
  // once CALCOM_* is set in production.
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
      // Deliberately no `cache` option: under force-static Next pins any
      // `no-store` fetch to force-cache anyway, which would freeze the Data
      // Cache entry forever. Left alone, the fetch inherits the segment's
      // revalidate and expires in step with the route.
    })

    if (!res.ok) throw new Error(`Bookings responded ${res.status}`)

    const data = await res.json()
    const items: AvailabilityItem[] = data?.staffAvailabilityResponse?.[0]?.availabilityItems
    if (!Array.isArray(items)) throw new Error("unexpected availability payload")

    const body: SlotsResponse = {
      timeZone: "Europe/Lisbon",
      durationMinutes: SLOT_MINUTES,
      location: "Microsoft Teams",
      slots: items
        .filter((i) => i.status === "BOOKINGSAVAILABILITYSTATUS_AVAILABLE")
        .flatMap(slotsIn),
    }
    return NextResponse.json(body)
  } catch (err) {
    console.error("slots: Bookings availability lookup failed", err)
    // A failure is cached for `revalidate` seconds like any other response, so
    // the widget shows its "book on Microsoft's page" fallback for at most that
    // long before the next regeneration heals it.
    return NextResponse.json({ error: "Availability unavailable" }, { status: 503 })
  }
}
