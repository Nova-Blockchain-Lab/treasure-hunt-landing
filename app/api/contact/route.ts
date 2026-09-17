import { NextResponse } from "next/server"
import { sendLeadEmail, PUBLIC_CONTACT } from "@/lib/notify"

// Lead delivery goes through lib/notify (shared with app/api/book/route.ts).
// If no key is set we return an explicit error, never a fake success.
//
// DELIVERABILITY: leads fail SILENTLY at the mailbox. Resend reports success
// while Outlook can still file the mail in Junk, so check Junk first if leads
// seem to stop. leads@treasurehunt.pt was a cold sender to novaims.unl.pt and
// its first messages were junked; marking it "not junk" fixes it PER MAILBOX
// (Outlook Safe Senders), so each recipient has to do it, or an admin adds a
// tenant-level allow. Neither treasurehunt.pt nor urbancheckin.pt publishes a
// _dmarc record, which is the durable fix and a single DNS TXT away.
//
// WATCH THIS: leads used to go to a personal Gmail precisely because NOVA's
// Microsoft 365 quarantined Resend mail sent from the reused urbancheckin.pt
// domain, so @novaims.unl.pt delivery is the known-fragile part of this route.
// A quarantined lead fails silently — Resend still returns 202.

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, eventSize, message } = body

    if (!name || !email || !eventSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const sent = await sendLeadEmail({
      subject: `New event inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nEvent size: ${eventSize}\nMessage: ${message || "N/A"}`,
      replyTo: email,
    })

    if (!sent.ok && sent.reason === "unconfigured") {
      console.error("Contact form: no Resend key set — lead NOT delivered:", { name, email, eventSize })
      return NextResponse.json(
        { error: "The contact form is not configured yet. Please email us directly at " + PUBLIC_CONTACT },
        { status: 503 },
      )
    }
    if (!sent.ok) {
      console.error("Contact form: Resend send failed", sent.detail)
      return NextResponse.json({ error: "Failed to send. Please email us directly at " + PUBLIC_CONTACT }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
