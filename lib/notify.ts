// One place that talks to Resend, shared by the contact form and the booking
// route. See app/api/contact/route.ts for the deliverability history — the
// account/domain pairing rules live with the env vars below.
//
// TWO Resend accounts exist. The account behind RESEND_API_KEY has
// urbancheckin.pt verified; a second account has treasurehunt.pt verified.
// `from` must be on a domain verified in whichever account the key belongs to,
// so the key and the from-address travel together: CONTACT_RESEND_KEY is the
// treasurehunt.pt account and takes precedence. Do NOT point one account's key
// at the other account's domain — Resend rejects it (that shipped once and was
// rolled back).

const CONTACT_TO = (
  process.env.CONTACT_EMAIL ||
  "daraujo@novaims.unl.pt,jrpereira@novaims.unl.pt,aandrade@novaims.unl.pt,fribeiro@novaims.unl.pt"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean)

const CONTACT_FROM = process.env.CONTACT_FROM || "Treasure Hunt <leads@treasurehunt.pt>"

export const PUBLIC_CONTACT = process.env.PUBLIC_CONTACT || "nova.blockchain.lab@novaims.unl.pt"

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "failed"; detail?: string }

export async function sendLeadEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string
  text: string
  replyTo?: string
}): Promise<SendResult> {
  const apiKey = process.env.CONTACT_RESEND_KEY || process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: "unconfigured" }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    })
    if (!res.ok) return { ok: false, reason: "failed", detail: await res.text() }
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: "failed", detail: String(err) }
  }
}
