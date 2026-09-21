// The one WhatsApp callback for every edition of the Treasure Hunt.
//
// WHY THE MARKETING SITE OWNS IT. Meta allows ONE callback URL per app, and one
// app ("Treasure Hunt Verify") serves every edition of the game. Whichever game
// deployment held that URL received everyone's verification messages and
// silently dropped the ones minted elsewhere: a player at the NEI messaged the
// number, the delivery landed on the Lisbon Games Week deployment, whose parser
// only matches LGW- codes, and their number never verified. Nobody noticed
// because the drop is a 200.
//
// This site is the right host precisely because it is not an edition. It outlives
// every one of them, it owns the apex domain, and it has no database to keep
// awake — the game deployments bill Neon by compute uptime, so a webhook that
// wakes them on every stray "hi" is not free there and is free here.
//
// IT IS DELIBERATELY DUMB. It does not read the code, does not know the markers,
// and does not decide which edition a message belongs to. Each edition's parser
// already ignores a code it did not mint, and each only stamps a number it
// already knows, so fanning out unconditionally is both less code here and more
// correct than routing: a plain "hi" carrying no code still has to reach every
// edition, because it opens Meta's 24h free-form window for whichever one holds
// that number. Routing on the marker would drop exactly those.
//
// ⚠️ THE BODY IS FORWARDED BYTE FOR BYTE. The HMAC covers raw bytes, so a body
// that has been through JSON.parse/stringify verifies nowhere. Nothing in this
// file parses it, and nothing should start.
//
// ⚠️ ALWAYS 200 ONCE THE SIGNATURE IS GOOD. Meta retries a non-2xx with backoff
// for days, and a retry replays the delivery to EVERY target, including the ones
// that already accepted it. A target being down is logged, never signalled back.

import { type NextRequest } from "next/server"
import { secretEquals, sign, signatureMatches } from "@/lib/webhook-signature"

// node:crypto, and outbound fetch to several hosts per delivery.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** How long a single edition gets to accept a forwarded delivery. Meta's own
 *  timeout is short, and one unreachable deployment must not hold the others. */
const TARGET_TIMEOUT_MS = 8000

/**
 * The deployments to fan out to, from WHATSAPP_RELAY_TARGETS: a comma-separated
 * list of origins, e.g. "https://nei.treasurehunt.pt,https://lgw.treasurehunt.pt".
 *
 * An env var rather than a constant because adding an edition is then a Vercel
 * setting and a redeploy, not a code change in a repo nobody touches between
 * events.
 */
function relayTargets(): string[] {
  return (process.env.WHATSAPP_RELAY_TARGETS ?? "")
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter(Boolean)
}

/** Meta's subscription handshake: echo hub.challenge if the token matches. */
export async function GET(request: NextRequest): Promise<Response> {
  const params = request.nextUrl.searchParams
  const expected = process.env.WHATSAPP_VERIFY_TOKEN
  const token = params.get("hub.verify_token")

  if (!expected) {
    console.error("WHATSAPP_VERIFY_TOKEN is unset — refusing the webhook handshake.")
    return new Response("Not configured", { status: 503 })
  }
  if (params.get("hub.mode") !== "subscribe" || !token || !secretEquals(token, expected)) {
    return new Response("Forbidden", { status: 403 })
  }
  return new Response(params.get("hub.challenge") ?? "", { status: 200 })
}

export async function POST(request: NextRequest): Promise<Response> {
  const appSecret = process.env.WHATSAPP_APP_SECRET
  const relaySecret = process.env.WEBHOOK_RELAY_SECRET
  if (!appSecret || !relaySecret) {
    // Both are required here, unlike on a game deployment: without the first
    // there is nothing to authenticate Meta with, and without the second there
    // is no way to prove to an edition that the forwarded body came from us.
    console.error("WHATSAPP_APP_SECRET or WEBHOOK_RELAY_SECRET is unset — cannot relay.")
    return new Response("Not configured", { status: 503 })
  }

  const raw = await request.text()
  if (!signatureMatches(raw, request.headers.get("x-hub-signature-256"), appSecret)) {
    console.warn("[wa-relay] rejected a delivery with a bad Meta signature.")
    return new Response("Unauthorized", { status: 401 })
  }

  const targets = relayTargets()
  if (targets.length === 0) {
    // Loud, because the symptom downstream is "phone verification stopped
    // working" with a perfectly healthy-looking 200 here.
    console.error("[wa-relay] WHATSAPP_RELAY_TARGETS is empty — a delivery was accepted and dropped.")
    return new Response("OK", { status: 200 })
  }

  const signature = sign(raw, relaySecret)
  await Promise.all(
    targets.map(async (origin) => {
      try {
        const res = await fetch(`${origin}/api/webhooks/whatsapp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-th-relay-signature": signature,
          },
          body: raw,
          signal: AbortSignal.timeout(TARGET_TIMEOUT_MS),
        })
        if (!res.ok) console.error(`[wa-relay] ${origin} answered ${res.status}`)
      } catch (err) {
        console.error(`[wa-relay] ${origin} failed:`, err)
      }
    }),
  )

  return new Response("OK", { status: 200 })
}
