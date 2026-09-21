// The HMAC scheme the WhatsApp webhook trusts, in one place because two
// different secrets ride on it and neither may be checked sloppily.
//
// Meta signs its own deliveries with WHATSAPP_APP_SECRET. The landing page's
// relay (app/api/webhooks/whatsapp on treasurehunt.pt) signs the ones it
// forwards with WEBHOOK_RELAY_SECRET. Same format, same compare, different key.
//
// ⚠️ THE SIGNATURE COVERS THE RAW BYTES. Re-serialising parsed JSON changes key
// order and whitespace, so a digest over JSON.stringify(JSON.parse(body)) never
// matches. Every caller reads request.text() exactly once and passes that string
// around, and the relay forwards that same string untouched — a body that has
// been through a parse/stringify round trip cannot be verified by anyone.

import { createHmac, timingSafeEqual } from "node:crypto"

/** `sha256=<hex>` — Meta's header format, which the relay copies so the
 *  receiving end has one shape to check rather than two. */
export function sign(raw: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`
}

/**
 * Constant-time compare that tolerates unequal lengths. timingSafeEqual throws
 * on those, and the throw itself would leak the length, so the length check is
 * explicit and non-throwing.
 */
export function secretEquals(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8")
  const bb = Buffer.from(b, "utf8")
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/**
 * Whether `header` is a valid signature over `raw` under `secret`.
 *
 * A missing header or a missing secret is false, never true: an unset secret
 * must not turn into an open door, and the caller decides whether having no
 * secret at all is a 503.
 */
export function signatureMatches(
  raw: string,
  header: string | null | undefined,
  secret: string | undefined,
): boolean {
  if (!secret || !header) return false
  return secretEquals(header, sign(raw, secret))
}
