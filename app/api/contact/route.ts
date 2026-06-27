import { NextResponse } from "next/server"

// Lead delivery via Resend's HTTP API (no SDK dependency — plain fetch).
// Requires RESEND_API_KEY. The `from` address must be on a domain verified in
// that Resend account; it defaults to urbancheckin.pt (a verified domain we
// reuse) and is overridable via CONTACT_FROM — switch it to a treasurehunt.pt
// address once that domain is verified in the same account. If the key is
// absent we return an explicit error, never a fake success.
const CONTACT_TO = process.env.CONTACT_EMAIL || "nova.blockchain.lab@novaims.unl.pt"
const CONTACT_FROM = process.env.CONTACT_FROM || "Treasure Hunt <noreply@urbancheckin.pt>"

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
        { error: "The contact form is not configured yet. Please email us directly at " + CONTACT_TO },
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
        to: [CONTACT_TO],
        reply_to: email,
        subject: `New event inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nEvent size: ${eventSize}\nMessage: ${message || "N/A"}`,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error("Contact form: Resend send failed", res.status, detail)
      return NextResponse.json({ error: "Failed to send. Please email us directly at " + CONTACT_TO }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
