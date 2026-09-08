import { NextResponse } from "next/server"

// Lead delivery via Resend's HTTP API (no SDK dependency — plain fetch).
// Requires RESEND_API_KEY. If the key is absent we return an explicit error,
// never a fake success.
//
// `from` MUST be on a domain verified in the Resend account. treasurehunt.pt
// is verified (the Lisbon Games Week deployment sends vouchers from it), so we
// send as treasurehunt.pt rather than the unrelated urbancheckin.pt we used to
// reuse. That alignment is the point: a lead from treasurehunt.pt sent from
// urbancheckin.pt was landing in Junk at novaims.unl.pt, with Outlook warning
// recipients they "don't often get email from" the sender.
// CONTACT_TO is where leads are delivered: the same four people who are on
// every booking (see app/api/book/route.ts). Comma-separated, overridable via
// CONTACT_EMAIL.
//
// WATCH THIS: delivery to @novaims.unl.pt is the fragile part of this route,
// and it fails SILENTLY — Resend still reports success while Outlook files the
// mail in Junk or quarantines it. Verified once from the live form: with the
// treasurehunt.pt sender it reaches the Inbox. If leads stop arriving, check
// Junk first.
const CONTACT_TO = (
  process.env.CONTACT_EMAIL ||
  "daraujo@novaims.unl.pt,jrpereira@novaims.unl.pt,aandrade@novaims.unl.pt,fribeiro@novaims.unl.pt"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean)
const PUBLIC_CONTACT = process.env.PUBLIC_CONTACT || "nova.blockchain.lab@novaims.unl.pt"
const CONTACT_FROM = process.env.CONTACT_FROM || "Treasure Hunt <leads@treasurehunt.pt>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, eventSize, message } = body

    if (!name || !email || !eventSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("Contact form: RESEND_API_KEY not set — lead NOT delivered:", { name, email, eventSize })
      return NextResponse.json(
        { error: "The contact form is not configured yet. Please email us directly at " + PUBLIC_CONTACT },
        { status: 503 },
      )
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: email,
        subject: `New event inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nEvent size: ${eventSize}\nMessage: ${message || "N/A"}`,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error("Contact form: Resend send failed", res.status, detail)
      return NextResponse.json({ error: "Failed to send. Please email us directly at " + PUBLIC_CONTACT }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
