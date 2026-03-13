import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, eventSize, message } = body

    if (!name || !email || !eventSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send via mailto fallback: construct a notification
    // TODO: Replace with Resend, SendGrid, or Formspree when ready
    // For now, log and return success — the form data is captured
    console.log("Contact form submission:", { name, email, eventSize, message })

    // If you have Resend configured, uncomment:
    // const { Resend } = await import("resend")
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "Treasure Hunt <noreply@treasurehunt.pt>",
    //   to: "nova.blockchain.lab@novaims.unl.pt",
    //   subject: `New Event Inquiry from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nEvent Size: ${eventSize}\nMessage: ${message || "N/A"}`,
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
