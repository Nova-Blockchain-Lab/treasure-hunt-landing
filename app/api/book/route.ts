import { NextResponse } from "next/server"

// Creates a real appointment on daraujo@novaims.unl.pt's calendar through the
// same anonymous Bookings API the public booking page uses (see
// app/api/slots/route.ts for why no credentials are involved).
//
// Microsoft enforces email verification on self-service bookings, so this is a
// TWO-STEP call and the client drives both:
//   1. POST without `code`  -> upstream throws SelfServiceBookingEmailVerification
//      RequiredException and emails a 6-digit code -> we answer "code_sent".
//   2. POST with `code`     -> booked (200, Teams meeting created), or
//      "InvalidCode" -> we answer "invalid_code".
// There is no way to skip step 1: the check is server-side at Microsoft.
const BOOKINGS_BASE =
  "https://bookings.cloud.microsoft/BookingsService/api/V1/bookingBusinessesc2/mbx:84c98cdef247426285ae07dfbe0a4b95@e4bd69ff-e6f7-4c2e-b247-41b54ba2490e"
const STAFF_ID = "1c1c7887-e0fc-479b-ac7d-6983d0f026ff"
const SERVICE_ID = "a7b0ce05-cbfb-4954-a359-00c28aac1115" // "30 minutes meeting"
const SLOT_MINUTES = 30
const TIME_ZONE = "GMT Standard Time"

// Every booking also goes to the rest of the team. Bookings-with-me is a 1:1
// product, so they ride along as additional `customers` — that is the only
// attendee list this API exposes. Override with a comma-separated env var.
const TEAM_ATTENDEES = (
  process.env.BOOKING_ATTENDEES ??
  "jrpereira@novaims.unl.pt,aandrade@novaims.unl.pt,fribeiro@novaims.unl.pt"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean)

const SLOT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** "2026-09-15T17:30" + 30min -> "2026-09-15T18:00:00", staying in wall-clock. */
function endOf(slot: string) {
  const [h, m] = [Number(slot.slice(11, 13)), Number(slot.slice(14, 16))]
  const t = h * 60 + m + SLOT_MINUTES
  return `${slot.slice(0, 10)}T${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}:00`
}

const EMPTY_LOCATION = {
  address: {
    postOfficeBox: "", postalCode: "", countryOrRegion: "", state: "",
    city: "", street: "", type: "", name: "", locationSource: "LOCATION_SOURCE_TYPE_NONE",
  },
  coordinates: { accuracy: 0, altitude: 0, altitudeAccuracy: 0, latitude: 0, longitude: 0 },
  displayName: "", locationEmailAddress: "", locationType: "default", locationUri: "",
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Malformed request" }, { status: 400 })
  }

  const slot = String(body.slot ?? "")
  const name = String(body.name ?? "").trim().slice(0, 120)
  const email = String(body.email ?? "").trim().slice(0, 200)
  const notes = String(body.notes ?? "").trim().slice(0, 1000)
  const code = String(body.code ?? "").trim().slice(0, 12)

  if (!SLOT_RE.test(slot)) return NextResponse.json({ error: "Invalid slot" }, { status: 400 })
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
  if (code && !/^\d{4,10}$/.test(code)) {
    return NextResponse.json({ status: "invalid_code" }, { status: 200 })
  }

  const payload = {
    appointment: {
      startTime: { dateTime: `${slot}:00`, timeZone: TIME_ZONE },
      endTime: { dateTime: endOf(slot), timeZone: TIME_ZONE },
      serviceId: SERVICE_ID,
      isLocationOnline: true,
      staffMemberIds: [STAFF_ID],
      customers: [
        { name, emailAddress: email, notes, timeZone: TIME_ZONE },
        ...TEAM_ATTENDEES.map((emailAddress) => ({
          name: emailAddress.split("@")[0],
          emailAddress,
          notes: "",
          timeZone: TIME_ZONE,
        })),
      ],
      serviceLocation: EMPTY_LOCATION,
      customerTimeZone: TIME_ZONE,
      verificationCode: code,
    },
  }

  let res: Response
  try {
    res = await fetch(`${BOOKINGS_BASE}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
  } catch (err) {
    console.error("book: Bookings request failed", err)
    return NextResponse.json({ error: "Booking service unreachable" }, { status: 502 })
  }

  const text = await res.text()

  if (res.ok) {
    let id: string | undefined
    try {
      id = JSON.parse(text)?.appointment?.id
    } catch {
      // A 200 is the booking; an unparsable body only costs us the id.
    }
    return NextResponse.json({ status: "booked", id })
  }

  // Upstream reports both of these as HTTP 500 with the reason in the body.
  if (text.includes("SelfServiceBookingEmailVerificationRequired")) {
    return NextResponse.json({ status: "code_sent" })
  }
  if (text.includes("InvalidCode")) {
    return NextResponse.json({ status: "invalid_code" })
  }

  console.error("book: Bookings rejected the appointment", res.status, text.slice(0, 400))
  return NextResponse.json(
    { error: "That slot could not be booked. It may have just been taken." },
    { status: 409 },
  )
}
