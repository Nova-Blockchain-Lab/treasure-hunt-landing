"use client"

import { useEffect, useMemo, useState } from "react"
import { Clock, Video, Globe, ChevronLeft, ChevronRight, Check, ArrowLeft, Users } from "lucide-react"
import { usePostHog } from "posthog-js/react"

type SlotsResponse = { timeZone: string; durationMinutes: number; slots: string[] }

/** details -> the emailed code -> done. Microsoft requires the code step. */
type Stage = "picking" | "details" | "code" | "booked"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

/** "2026-09-15T14:30" -> "14:30". Slots are Lisbon wall-clock; never parsed as Date. */
const timeOf = (slot: string) => slot.slice(11, 16)
const dayOf = (slot: string) => slot.slice(0, 10)

/** Weekday index (Mon=0) for a "YYYY-MM-DD" key, via UTC so no local shift applies. */
function weekdayIndex(day: string) {
  const [y, m, d] = day.split("-").map(Number)
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7
}

function monthLabel(month: string) {
  const [y, m] = month.split("-").map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

function shiftMonth(month: string, by: number) {
  const [y, m] = month.split("-").map(Number)
  const total = y * 12 + (m - 1) + by
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`
}

/** Calendar cells for a month: leading blanks so the 1st lands on its weekday. */
function monthCells(month: string) {
  const [y, m] = month.split("-").map(Number)
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const lead = weekdayIndex(`${month}-01`)
  const cells: (string | null)[] = Array(lead).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(`${month}-${String(d).padStart(2, "0")}`)
  return cells
}

function longDate(day: string) {
  const [y, m, d] = day.split("-").map(Number)
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return `${names[wd]}, ${MONTHS[m - 1]} ${d}`
}

export function BookingWidget() {
  const [data, setData] = useState<SlotsResponse | null>(null)
  const [failed, setFailed] = useState(false)
  const [month, setMonth] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [stage, setStage] = useState<Stage>("picking")
  const [form, setForm] = useState({ name: "", email: "", notes: "" })
  const [code, setCode] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const posthog = usePostHog()

  async function submit(withCode: string) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, ...form, code: withCode }),
      })
      const data = await res.json()
      if (data.status === "code_sent") {
        setStage("code")
        posthog?.capture("booking_code_sent")
      } else if (data.status === "invalid_code") {
        setError("That code doesn't match. Check the email and try again.")
      } else if (data.status === "booked") {
        setStage("booked")
        posthog?.capture("booking_confirmed", { slot })
      } else {
        setError(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setError("Could not reach the booking service. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    fetch("/api/slots?days=60")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: SlotsResponse) => {
        setData(d)
        setMonth(d.slots.length ? dayOf(d.slots[0]).slice(0, 7) : null)
      })
      .catch(() => setFailed(true))
  }, [])

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const s of data?.slots ?? []) {
      const key = dayOf(s)
      map.set(key, [...(map.get(key) ?? []), s])
    }
    return map
  }, [data])

  // Only offer month navigation across months that actually hold slots.
  const months = useMemo(() => [...new Set([...byDay.keys()].map((d) => d.slice(0, 7)))].sort(), [byDay])

  if (failed) {
    return (
      <div className="rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-8 text-center">
        <p className="text-[#8B949E] text-sm">
          Live availability is unavailable right now.{" "}
          <a
            href="https://outlook.office.com/bookwithme/user/84c98cdef247426285ae07dfbe0a4b95@novaims.unl.pt?anonymous"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F0605D] underline underline-offset-2"
          >
            Book on Microsoft&apos;s page instead
          </a>
          .
        </p>
      </div>
    )
  }

  const slotsToday = day ? byDay.get(day) ?? [] : []

  return (
    <div className="grid lg:grid-cols-[300px_1fr] rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[#131921] overflow-hidden">
      {/* Meeting summary */}
      <aside className="flex flex-col gap-5 p-7 border-b lg:border-b-0 lg:border-r border-[rgba(240,246,252,0.06)]">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#8B949E]">
            NOVA Blockchain Lab
          </span>
          <h2 className="font-display text-3xl tracking-wide text-[#E6EDF3]">Book a call</h2>
        </div>

        <p className="text-sm leading-relaxed text-[#8B949E]">
          Thirty minutes with the team behind Treasure Hunt. Bring your event date, venue and
          rough headcount and we&apos;ll tell you what is realistic.
        </p>

        <dl className="flex flex-col gap-3 text-sm text-[#E6EDF3]">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>{data?.durationMinutes ?? 30} minutes</dd>
          </div>
          <div className="flex items-center gap-3">
            <Video className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>Microsoft Teams</dd>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>Lisbon time (WEST)</dd>
          </div>
        </dl>

        {slot && (
          <div className="mt-auto pt-5 border-t border-[rgba(240,246,252,0.06)]">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#8B949E] mb-1">
              Selected
            </p>
            <p className="text-[#E6EDF3] text-sm">
              {longDate(dayOf(slot))}
              <br />
              <span className="font-mono text-[#F0605D]">{timeOf(slot)}</span>
            </p>
          </div>
        )}
      </aside>

      {/* Calendar + times */}
      {stage === "picking" ? (
      <div className="grid sm:grid-cols-[1fr_200px] gap-7 p-7">
        <section>
          <header className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl tracking-wide text-[#E6EDF3]">
              {month ? monthLabel(month) : "Loading"}
            </h3>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!month || months.indexOf(month) <= 0}
                onClick={() => setMonth((m) => (m ? shiftMonth(m, -1) : m))}
                className="grid place-items-center w-11 h-11 rounded-lg text-[#8B949E] transition-colors hover:text-[#E6EDF3] hover:bg-[#1A2233] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!month || months.indexOf(month) >= months.length - 1}
                onClick={() => setMonth((m) => (m ? shiftMonth(m, 1) : m))}
                className="grid place-items-center w-11 h-11 rounded-lg text-[#8B949E] transition-colors hover:text-[#E6EDF3] hover:bg-[#1A2233] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((w) => (
              <span
                key={w}
                className="grid place-items-center font-mono text-[0.65rem] tracking-widest uppercase text-[#7D8590] h-8"
              >
                {w[0]}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {(month ? monthCells(month) : Array(35).fill(null)).map((cell, i) => {
              if (!cell) return <span key={`blank-${i}`} className="h-11" />
              const free = byDay.has(cell)
              const selected = cell === day
              return (
                <button
                  key={cell}
                  type="button"
                  disabled={!free}
                  aria-pressed={selected}
                  aria-label={longDate(cell)}
                  onClick={() => {
                    setDay(cell)
                    setSlot(null)
                    posthog?.capture("booking_date_select", { day: cell })
                  }}
                  className={[
                    "grid place-items-center h-11 rounded-lg text-sm transition-colors cursor-pointer",
                    selected
                      ? "bg-[#F0605D] text-white font-medium"
                      : free
                        ? "bg-[#1A2233] text-[#E6EDF3] hover:bg-[#243049]"
                        : "text-[#7D8590] cursor-default",
                  ].join(" ")}
                >
                  {Number(cell.slice(8))}
                </button>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col min-h-[320px]">
          <h3 className="font-display text-xl tracking-wide text-[#E6EDF3] mb-5">
            {day ? longDate(day) : "Pick a day"}
          </h3>

          {!day ? (
            <p className="text-sm text-[#7D8590]">
              {data ? "Days with availability are highlighted." : "Loading availability…"}
            </p>
          ) : (
            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
              {slotsToday.map((s) => {
                const selected = s === slot
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSlot(s)
                      posthog?.capture("booking_slot_select", { slot: s })
                    }}
                    className={[
                      "flex items-center justify-center gap-2 h-11 shrink-0 rounded-lg border font-mono text-sm transition-all cursor-pointer",
                      selected
                        ? "border-[#F0605D] bg-[#F0605D] text-white"
                        : "border-[rgba(240,246,252,0.10)] text-[#E6EDF3] hover:border-[#F0605D] hover:text-[#F0605D]",
                    ].join(" ")}
                  >
                    {selected && <Check className="w-3.5 h-3.5" aria-hidden />}
                    {timeOf(s)}
                  </button>
                )
              })}
            </div>
          )}

          {slot && (
            <button
              type="button"
              onClick={() => setStage("details")}
              className="mt-4 shrink-0 w-full h-12 rounded-lg bg-[#F0605D] text-white font-display text-base tracking-widest uppercase transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.98] cursor-pointer"
            >
              Continue
            </button>
          )}
        </section>
      </div>
      ) : (
        <div className="p-7">
          {stage === "booked" ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <div className="grid place-items-center w-14 h-14 rounded-full bg-[rgba(63,185,80,0.12)]">
                <Check className="w-7 h-7 text-[#3FB950]" aria-hidden />
              </div>
              <h3 className="font-display text-2xl tracking-wide text-[#E6EDF3]">You&apos;re booked</h3>
              <p className="text-sm text-[#8B949E] max-w-[46ch]">
                {slot && `${longDate(dayOf(slot))} at ${timeOf(slot)} Lisbon time.`} A Microsoft
                Teams invitation is on its way to {form.email}, and the team has been added to the
                meeting.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4 max-w-[420px]"
              onSubmit={(e) => {
                e.preventDefault()
                submit(stage === "code" ? code : "")
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setStage(stage === "code" ? "details" : "picking")
                }}
                className="flex items-center gap-2 self-start text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden />
                Back
              </button>

              {stage === "details" ? (
                <>
                  <h3 className="font-display text-2xl tracking-wide text-[#E6EDF3]">Your details</h3>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email address"
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="What is the event? Date, venue, rough headcount."
                    className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors resize-none"
                  />
                  <p className="flex items-start gap-2 text-[0.8rem] text-[#7D8590]">
                    <Users className="w-4 h-4 shrink-0 mt-0.5 text-[#58A6FF]" aria-hidden />
                    Three people from the Treasure Hunt team are added to every booking.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl tracking-wide text-[#E6EDF3]">Confirm your email</h3>
                  <p className="text-sm text-[#8B949E]">
                    Microsoft sent a 6-digit code to <span className="text-[#E6EDF3]">{form.email}</span>.
                    Enter it to finish booking.
                  </p>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    aria-label="Verification code"
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#7D8590] font-mono text-lg tracking-[0.4em] text-center focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                </>
              )}

              {error && <p className="text-sm text-[#F0605D]">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full h-12 rounded-lg bg-[#F0605D] text-white font-display text-base tracking-widest uppercase transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {busy ? "Working…" : stage === "code" ? "Confirm booking" : "Continue"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
