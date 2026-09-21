"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Clock, Video, Globe, ChevronLeft, ChevronRight, Check, ArrowLeft, Mail } from "lucide-react"
import { capture } from "@/lib/posthog"
import { getSlots, lisbonNow, type SlotsResponse } from "@/lib/slots"

/** details -> the emailed code -> done. Microsoft requires the code step. */
type Stage = "picking" | "details" | "code" | "booked"

export type BookingDict = Record<string, string>

/** "2026-09-15T14:30" -> "14:30". Slots are Lisbon wall-clock; never parsed as Date. */
const timeOf = (slot: string) => slot.slice(11, 16)
const dayOf = (slot: string) => slot.slice(0, 10)

/** Weekday index (Mon=0) for a "YYYY-MM-DD" key, via UTC so no local shift applies. */
function weekdayIndex(day: string) {
  const [y, m, d] = day.split("-").map(Number)
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7
}

/** UTC everywhere: slot keys are plain calendar dates, never instants. */
function utcDate(day: string) {
  const [y, m, d] = day.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
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

/** Mon-first week of narrow weekday initials, in the visitor's locale. */
function weekdayInitials(locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" })
  // 2024-01-01 was a Monday.
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + i))))
}

export function BookingWidget({
  dict,
  locale,
  compact = false,
  initialNotes = "",
}: {
  dict: BookingDict
  locale: string
  /** Set when rendered inside the modal, where the page already owns the h1.
      It only affects heading level — the summary rail is always shown, because
      hiding it left mobile visitors with a bare calendar and no explanation. */
  compact?: boolean
  /** Seeds the notes field, e.g. with the packages tier the visitor clicked. */
  initialNotes?: string
}) {
  // On /book this widget IS the page, so its title is the h1. Inside the modal
  // it sits under the page's own h1 and must not compete with it.
  const Heading = compact ? "h2" : "h1"
  const monthLabel = (month: string) =>
    new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" })
      .format(utcDate(`${month}-01`))
  const longDate = (day: string) =>
    new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })
      .format(utcDate(day))
  const [data, setData] = useState<SlotsResponse | null>(null)
  const [failed, setFailed] = useState(false)
  const [month, setMonth] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [stage, setStage] = useState<Stage>("picking")
  const [form, setForm] = useState({ name: "", email: "", notes: initialNotes })
  const [code, setCode] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stageHeading = useRef<HTMLHeadingElement>(null)

  // Every stage swap unmounts the control that had focus, so without this a
  // keyboard user is dropped back to the top of the document mid-booking.
  useEffect(() => {
    if (stage !== "picking") stageHeading.current?.focus()
  }, [stage])

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
        capture("booking_code_sent")
      } else if (data.status === "invalid_code") {
        setError(dict.errorCode)
      } else if (data.status === "booked") {
        setStage("booked")
        capture("booking_confirmed", { slot })
      } else {
        setError(data.error ?? dict.errorGeneric)
      }
    } catch {
      setError(dict.errorNetwork)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    let live = true
    getSlots()
      .then((d) => {
        if (!live) return
        setData(d)
        // Land on the first day that still has time on it and preselect it, so
        // the picker opens showing real times rather than an empty "pick a day".
        const first = d.slots.find((s) => s > lisbonNow())
        setMonth(first ? dayOf(first).slice(0, 7) : null)
        setDay(first ? dayOf(first) : null)
      })
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [])

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>()
    // /api/slots is cached, so its payload cannot know the time it is served at
    // and still includes slots that have since passed. Drop them here.
    const now = lisbonNow()
    for (const s of data?.slots ?? []) {
      if (s <= now) continue
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
          {dict.unavailable}{" "}
          <a
            // Shown only when /api/slots is down. Must track CALCOM_USERNAME /
            // CALCOM_EVENT_SLUG; it pointed at the retired Microsoft Bookings
            // page until Sept 2026. The cal.com profile renders as "Treasure
            // Hunt", so this exposes no personal name.
            href="https://cal.com/treasurehunt/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F0605D] underline underline-offset-2"
          >
            {dict.unavailableLink}
          </a>
          .
        </p>
      </div>
    )
  }

  const slotsToday = day ? byDay.get(day) ?? [] : []

  return (
    <div className="grid lg:grid-cols-[300px_1fr] rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[#131921] overflow-hidden">
      {/* Meeting summary. Never hidden: on a phone this is the only thing that
          says what the calendar below is for, and hiding it left the modal as a
          bare date grid with no context at all. On small screens it collapses to
          a header with the facts on one wrapping row. */}
      <aside className="flex flex-col gap-4 lg:gap-5 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[rgba(240,246,252,0.06)]">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#8B949E]">
            NOVA Blockchain Lab
          </span>
          <Heading className="font-display text-2xl sm:text-3xl tracking-wide text-[#E6EDF3]">{dict.heading}</Heading>
        </div>

        <p className="text-sm leading-relaxed text-[#8B949E]">
          {dict.intro}
        </p>

        <dl className="flex flex-row flex-wrap lg:flex-col gap-x-5 gap-y-2 lg:gap-3 text-sm text-[#E6EDF3]">
          <div className="flex items-center gap-2 lg:gap-3">
            <Clock className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>{dict.duration.replace("{minutes}", String(data?.durationMinutes ?? 30))}</dd>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Video className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>{data?.location ?? "\u00A0"}</dd>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Globe className="w-4 h-4 shrink-0 text-[#58A6FF]" aria-hidden />
            <dd>{dict.timezone}</dd>
          </div>
        </dl>

        {/* What arrives afterwards. The picker asked for a commitment without
            saying what it led to. The step-by-step instructions that used to sit
            here were cut: "Pick a day" and "Days with availability are
            highlighted" already say it, one screen to the right. */}
        <p className="flex items-start gap-2.5 mt-1 pt-4 border-t border-[rgba(240,246,252,0.06)] text-[0.8rem] leading-relaxed text-[#8B949E]">
          <Mail className="w-4 h-4 shrink-0 mt-0.5 text-[#58A6FF]" aria-hidden />
          {dict.afterBooking}
        </p>

        {slot && (
          <div className="lg:mt-auto pt-4 border-t border-[rgba(240,246,252,0.06)]">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#8B949E] mb-1">
              {dict.selected}
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
              {month ? monthLabel(month) : "\u00A0"}
            </h3>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label={dict.prevMonth}
                disabled={!month || months.indexOf(month) <= 0}
                onClick={() => setMonth((m) => (m ? shiftMonth(m, -1) : m))}
                className="grid place-items-center w-11 h-11 rounded-lg text-[#8B949E] transition-colors hover:text-[#E6EDF3] hover:bg-[#1A2233] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label={dict.nextMonth}
                disabled={!month || months.indexOf(month) >= months.length - 1}
                onClick={() => setMonth((m) => (m ? shiftMonth(m, 1) : m))}
                className="grid place-items-center w-11 h-11 rounded-lg text-[#8B949E] transition-colors hover:text-[#E6EDF3] hover:bg-[#1A2233] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdayInitials(locale).map((w, i) => (
              <span
                key={i}
                className="grid place-items-center font-mono text-[0.65rem] tracking-widest uppercase text-[#7D8590] h-8"
              >
                {w}
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
                  aria-current={selected ? "date" : undefined}
                  aria-label={longDate(cell)}
                  onClick={() => {
                    setDay(cell)
                    setSlot(null)
                    capture("booking_date_select", { day: cell })
                  }}
                  className={[
                    "grid place-items-center h-11 rounded-lg text-sm transition-colors cursor-pointer",
                    selected
                      ? "bg-[#C9433F] text-white font-medium"
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
            {day ? longDate(day) : dict.pickDay}
          </h3>

          {!day ? (
            <p className="text-sm text-[#7D8590]">
              {data ? dict.availabilityHint : dict.loading}
            </p>
          ) : (
            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
              {slotsToday.map((s) => {
                const selected = s === slot
                return (
                  <button
                    key={s}
                    type="button"
                    aria-current={selected || undefined}
                    onClick={() => {
                      setSlot(s)
                      capture("booking_slot_select", { slot: s })
                    }}
                    className={[
                      "flex items-center justify-center gap-2 h-11 shrink-0 rounded-lg border font-mono text-sm transition-all cursor-pointer",
                      selected
                        ? "border-[#F0605D] bg-[#C9433F] text-white"
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
              className="mt-4 shrink-0 w-full h-12 rounded-lg bg-[#C9433F] text-white font-display text-base tracking-widest uppercase transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.98] cursor-pointer"
            >
              {dict.continue}
            </button>
          )}
        </section>
      </div>
      ) : (
        <div className="p-7">
          {stage === "booked" ? (
            <div role="status" className="flex flex-col items-center text-center gap-4 py-10">
              <div className="grid place-items-center w-14 h-14 rounded-full bg-[rgba(63,185,80,0.12)]">
                <Check className="w-7 h-7 text-[#3FB950]" aria-hidden />
              </div>
              <h3 ref={stageHeading} tabIndex={-1} className="font-display text-2xl tracking-wide text-[#E6EDF3]">{dict.bookedHeading}</h3>
              <p className="text-sm text-[#8B949E] max-w-[46ch]">
                {slot && `${longDate(dayOf(slot))}, ${timeOf(slot)}. `}
                {dict.bookedBody.replace("{email}", form.email)}
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
                {dict.back}
              </button>

              {stage === "details" ? (
                <>
                  <h3 ref={stageHeading} tabIndex={-1} className="font-display text-2xl tracking-wide text-[#E6EDF3]">{dict.detailsHeading}</h3>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={dict.name}
                    aria-label={dict.name}
                    autoComplete="name"
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={dict.email}
                    aria-label={dict.email}
                    autoComplete="email"
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={dict.notes}
                    aria-label={dict.notes}
                    className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors resize-none"
                  />
                </>
              ) : (
                <>
                  <h3 ref={stageHeading} tabIndex={-1} className="font-display text-2xl tracking-wide text-[#E6EDF3]">{dict.codeHeading}</h3>
                  <p className="text-sm text-[#8B949E]">
                    {dict.codeIntro.split("{email}")[0]}
                    <span className="text-[#E6EDF3]">{form.email}</span>
                    {dict.codeIntro.split("{email}")[1]}
                  </p>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    aria-label={dict.codeLabel}
                    className="w-full h-12 px-4 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] font-mono text-lg tracking-[0.4em] text-center focus:border-[rgba(240,96,93,0.4)] transition-colors"
                  />
                </>
              )}

              {error && <p role="alert" className="text-sm text-[#F0605D]">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full h-12 rounded-lg bg-[#C9433F] text-white font-display text-base tracking-widest uppercase transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {busy ? dict.working : stage === "code" ? dict.confirm : dict.continue}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
