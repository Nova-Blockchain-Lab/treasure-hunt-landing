import { NextResponse } from "next/server"

// Lead delivery via Resend's HTTP API (no SDK dependency — plain fetch).
// If no key is set we return an explicit error, never a fake success.
//
// TWO Resend accounts exist. The account behind RESEND_API_KEY has
// urbancheckin.pt verified; a second account (the one the Lisbon Games Week
// deployment uses) has treasurehunt.pt verified. `from` must be on a domain
// verified in whichever account the key belongs to, so the key and the
// from-address travel together: CONTACT_RESEND_KEY is the treasurehunt.pt
// account and takes precedence when set, falling back to RESEND_API_KEY.
//
// Do NOT point one account's key at the other account's domain: Resend
// rejects it and this route 502s (that mistake shipped once and was rolled
// back).
//
// DELIVERABILITY: leads fail SILENTLY here. Resend reports success while
// Outlook can still file the mail in Junk, so check Junk first if leads seem
// to stop. leads@treasurehunt.pt was a cold sender to novaims.unl.pt and its
// first messages were junked; marking it "not junk" fixes it PER MAILBOX
// (Outlook Safe Senders), so each recipient has to do it, or an admin adds a
// tenant-level allow. Neither treasurehunt.pt nor urbancheckin.pt publishes a
// _dmarc record, which is the durable fix and a single DNS TXT away.
// CONTACT_TO is where leads are delivered: the same four people who are on
// every booking (see app/api/book/route.ts). Comma-separated, overridable via
// CONTACT_EMAIL.
//
// WATCH THIS: leads used to go to a personal Gmail precisely because NOVA's
// Microsoft 365 quarantined Resend mail sent from the reused urbancheckin.pt
// domain, so @novaims.unl.pt delivery is the known-fragile part of this route.
// A quarantined lead fails silently — Resend still returns 202. If leads stop
// arriving, that is the first thing to check, and the real fix is verifying
// treasurehunt.pt in Resend (then set CONTACT_FROM) or an IT allowlist.
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

    const apiKey = process.env.CONTACT_RESEND_KEY || process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("Contact form: no Resend key set — lead NOT delivered:", { name, email, eventSize })
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
