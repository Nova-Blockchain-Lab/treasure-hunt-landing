/**
 * Shared bits of the booking slot feed.
 *
 * Slots are Lisbon wall-clock strings ("2026-09-15T14:30"), never instants, so
 * nothing here parses them with `new Date`. Both the route that produces them
 * and the widget that renders them compare them as plain strings.
 */

export type SlotsResponse = {
  timeZone: string
  durationMinutes: number
  /** Where the call happens. Comes from the backend so the widget never claims
      "Microsoft Teams" while the booking is actually created elsewhere. */
  location: string
  slots: string[]
}

/**
 * "now" as a Lisbon wall-clock prefix ("2026-09-08T00:53"), so it compares
 * directly against a slot string. Using the UTC date instead would be a day out
 * for the hour either side of midnight.
 */
export function lisbonNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)!.value
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`
}

let inFlight: Promise<SlotsResponse> | undefined

/**
 * The slot feed, fetched at most once per page load and shared by every caller.
 *
 * /api/slots is a statically cached route, so this is a CDN hit measured in
 * milliseconds. Firing it as soon as the page mounts is what lets the picker
 * paint filled in the moment the modal opens, instead of showing a spinner.
 */
export function getSlots(): Promise<SlotsResponse> {
  inFlight ??= fetch("/api/slots")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch((err) => {
      inFlight = undefined // a failed load must not be cached for the session
      throw err
    })
  return inFlight
}
