"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"
import { capture } from "@/lib/posthog"
import { trackEvent } from "@/lib/analytics"
import type { Variant } from "@/lib/ab-test"
import { BookingWidget, type BookingDict } from "@/components/booking-widget"
import { localeTags, type Locale } from "@/i18n/config"

interface ContactFormDict {
  title: string
  subtitle: string
  name: string
  email: string
  eventSize: string
  eventSizeOptions: string[]
  message: string
  submit: string
  sending: string
  success: string
  error: string
  bookCallHint: string
  bookCall: string
  messageHint: string
  messageLink: string
}

type FormStatus = "idle" | "sending" | "success" | "error"

/** Booking is the default path; the message form is the fallback for anyone who
    does not want to commit to a slot. */
type Mode = "book" | "message"

export function PlanEventModal({
  dict,
  bookingDict,
  lang,
  open,
  onClose,
  variant = "control",
  triggerLocation = "unknown",
  packageTier,
}: {
  dict: ContactFormDict
  bookingDict: BookingDict
  lang: string
  /** Set when the visitor came from a specific packages tier, so the intent
      survives into the booking notes instead of being analytics-only. */
  packageTier?: string
  open: boolean
  onClose: () => void
  variant?: Variant
  triggerLocation?: string
}) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [mode, setMode] = useState<Mode>("book")
  const formStartFired = useRef(false)

  // A native <dialog> opened with showModal() gives us the focus trap, the
  // Escape handler, the inert background and focus restore on close — all of
  // which were previously missing here and are AA requirements.
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  // showModal() does not stop the page behind from scrolling.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    capture("contact_modal_open", { trigger_location: triggerLocation, variant, mode: "book" })
  }, [open, triggerLocation, variant])

  useEffect(() => {
    if (open) return
    // Reset behind the close animation so the copy does not flip mid-fade.
    const timer = setTimeout(() => {
      setStatus("idle")
      setMode("book")
    }, 300)
    formStartFired.current = false
    return () => clearTimeout(timer)
  }, [open])

  const switchMode = useCallback(
    (next: Mode) => {
      setMode(next)
      capture("plan_modal_mode_switch", { mode: next, trigger_location: triggerLocation, variant })
    },
    [triggerLocation, variant],
  )

  const handleFormStart = useCallback(
    (fieldName: string) => {
      if (formStartFired.current) return
      formStartFired.current = true
      capture("contact_form_start", { field_name: fieldName, variant })
    },
    [variant]
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      eventSize: (form.elements.namedItem("eventSize") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    capture("contact_form_submit", { event_size: data.eventSize, variant })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      trackEvent({ name: "form_submitted", params: { event_size: data.eventSize } })
      capture("contact_form_success", { event_size: data.eventSize, variant })
    } catch {
      setStatus("error")
      trackEvent({ name: "form_error", params: { error_type: "submission_failed" } })
      capture("contact_form_error", { error_type: "submission_failed", variant })
    }
  }

  const booking = mode === "book"

  const switchLine = booking ? (
    <p className="text-center text-[0.8rem] text-[#8B949E]">
      {dict.messageHint}{" "}
      <button
        type="button"
        onClick={() => switchMode("message")}
        className="text-[#F0605D] underline decoration-[rgba(240,96,93,0.4)] underline-offset-2 hover:decoration-[#F0605D] cursor-pointer"
      >
        {dict.messageLink}
      </button>
    </p>
  ) : (
    <p className="text-center text-[0.8rem] text-[#8B949E]">
      {dict.bookCallHint}{" "}
      <button
        type="button"
        onClick={() => switchMode("book")}
        className="text-[#F0605D] underline decoration-[rgba(240,96,93,0.4)] underline-offset-2 hover:decoration-[#F0605D] cursor-pointer"
      >
        {dict.bookCall}
      </button>
    </p>
  )

  return (
    <dialog
      ref={dialogRef}
      aria-label={dict.title}
      onClose={onClose}
      onClick={(e) => {
        // A click that lands on the dialog box itself is a backdrop click: the
        // panel below covers the whole element.
        if (e.target === dialogRef.current) onClose()
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-[480px] bg-transparent p-0 text-[#E6EDF3] backdrop:bg-[rgba(6,8,15,0.90)] backdrop:backdrop-blur-sm open:animate-in open:fade-in open:duration-200 data-[mode=book]:max-w-[1040px]"
      data-mode={mode}
    >
      <div className="relative max-h-[92dvh] overflow-y-auto overscroll-contain rounded-2xl border border-[rgba(240,246,252,0.08)] bg-[#0D1117] p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center text-[#7D8590] hover:text-[#E6EDF3] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {booking ? (
          <div className="flex flex-col gap-5">
            <BookingWidget
              // Remount when the tier changes: the widget is mounted with the
              // dialog closed, so its useState(initialNotes) had already run
              // with "" by the time a packages CTA set the tier.
              key={packageTier ?? "default"}
              dict={bookingDict}
              locale={localeTags[lang as Locale] ?? "en"}
              compact
              initialNotes={packageTier ? `${packageTier} — ` : ""}
            />
            {switchLine}
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide mb-1">{dict.title}</h3>
            <p className="text-[0.9rem] text-[#8B949E] mb-8">{dict.subtitle}</p>

            {status === "success" ? (
              <div role="status" className="py-12 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(63,185,80,0.12)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#3FB950]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[#E6EDF3] font-medium mb-6">{dict.success}</p>
                {switchLine}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="sr-only" htmlFor="pe-name">{dict.name}</label>
                <input
                  id="pe-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={dict.name}
                  onFocus={() => handleFormStart("name")}
                  className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                />
                <label className="sr-only" htmlFor="pe-email">{dict.email}</label>
                <input
                  id="pe-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={dict.email}
                  onFocus={() => handleFormStart("email")}
                  className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors"
                />
                <label className="sr-only" htmlFor="pe-size">{dict.eventSize}</label>
                <select
                  id="pe-size"
                  name="eventSize"
                  required
                  defaultValue=""
                  onFocus={() => handleFormStart("eventSize")}
                  className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-[#7D8590]">
                    {dict.eventSize}
                  </option>
                  {dict.eventSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <label className="sr-only" htmlFor="pe-message">{dict.message}</label>
                <textarea
                  id="pe-message"
                  name="message"
                  rows={3}
                  placeholder={dict.message}
                  onFocus={() => handleFormStart("message")}
                  className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.24)] text-[#E6EDF3] placeholder:text-[#7D8590] text-sm focus:border-[rgba(240,96,93,0.4)] transition-colors resize-none"
                />

                {status === "error" && (
                  <p role="alert" className="text-sm text-[#F0605D]">
                    {dict.error}{" "}
                    <a
                      href="mailto:nova.blockchain.lab@novaims.unl.pt"
                      className="underline"
                    >
                      nova.blockchain.lab@novaims.unl.pt
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#C9433F] text-white font-display text-base tracking-widest uppercase py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                >
                  {status === "sending" ? dict.sending : dict.submit}
                </button>

                {switchLine}
              </form>
            )}
          </>
        )}
      </div>
    </dialog>
  )
}
