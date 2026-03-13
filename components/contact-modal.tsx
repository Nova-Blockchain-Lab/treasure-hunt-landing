"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"
import { usePostHog } from "posthog-js/react"
import { trackEvent } from "@/lib/analytics"
import type { Variant } from "@/lib/ab-test"

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
}

type FormStatus = "idle" | "sending" | "success" | "error"

export function ContactModal({
  dict,
  open,
  onClose,
  variant = "control",
  triggerLocation = "unknown",
}: {
  dict: ContactFormDict
  open: boolean
  onClose: () => void
  variant?: Variant
  triggerLocation?: string
}) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const formStartFired = useRef(false)
  const posthog = usePostHog()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    // Track modal open
    posthog?.capture("contact_modal_open", { trigger_location: triggerLocation, variant })

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, handleKeyDown, posthog, triggerLocation, variant])

  useEffect(() => {
    if (!open) {
      // Reset form state when modal closes
      const timer = setTimeout(() => setStatus("idle"), 300)
      formStartFired.current = false
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleFormStart = useCallback(
    (fieldName: string) => {
      if (formStartFired.current) return
      formStartFired.current = true
      posthog?.capture("contact_form_start", { field_name: fieldName, variant })
    },
    [posthog, variant]
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

    posthog?.capture("contact_form_submit", { event_size: data.eventSize, variant })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      trackEvent({ name: "form_submitted", params: { event_size: data.eventSize } })
      posthog?.capture("contact_form_success", { event_size: data.eventSize, variant })
    } catch {
      setStatus("error")
      trackEvent({ name: "form_error", params: { error_type: "submission_failed" } })
      posthog?.capture("contact_form_error", { error_type: "submission_failed", variant })
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dict.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(6,8,15,0.90)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] bg-[#0D1117] border border-[rgba(240,246,252,0.08)] rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#484F58] hover:text-[#8B949E] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-2xl sm:text-3xl tracking-wide mb-1">{dict.title}</h3>
        <p className="text-[0.9rem] text-[#8B949E] mb-8">{dict.subtitle}</p>

        {status === "success" ? (
          <div className="py-12 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(63,185,80,0.12)] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#3FB950]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[#E6EDF3] font-medium">{dict.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              required
              placeholder={dict.name}
              onFocus={() => handleFormStart("name")}
              className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#484F58] text-sm focus:outline-none focus:border-[rgba(240,96,93,0.4)] transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={dict.email}
              onFocus={() => handleFormStart("email")}
              className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#484F58] text-sm focus:outline-none focus:border-[rgba(240,96,93,0.4)] transition-colors"
            />
            <select
              name="eventSize"
              required
              defaultValue=""
              onFocus={() => handleFormStart("eventSize")}
              className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] text-sm focus:outline-none focus:border-[rgba(240,96,93,0.4)] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-[#484F58]">
                {dict.eventSize}
              </option>
              {dict.eventSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              rows={3}
              placeholder={dict.message}
              onFocus={() => handleFormStart("message")}
              className="w-full px-4 py-3 rounded-lg bg-[#161B22] border border-[rgba(240,246,252,0.08)] text-[#E6EDF3] placeholder:text-[#484F58] text-sm focus:outline-none focus:border-[rgba(240,96,93,0.4)] transition-colors resize-none"
            />

            {status === "error" && (
              <p className="text-sm text-[#F0605D]">
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
              className="w-full bg-[#F0605D] text-white font-display text-base tracking-widest uppercase py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(240,96,93,0.35)] active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
            >
              {status === "sending" ? dict.sending : dict.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
