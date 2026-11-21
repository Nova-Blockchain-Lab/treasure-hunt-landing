"use client"

import { useState } from "react"
import { localeTags, type Locale } from "@/i18n/config"
import { fill } from "@/lib/utils"

interface PackagesDict {
  eyebrow: string
  heading: string
  attendees: string
  fits: string
  tiers: { name: string; subtitle: string; bestFor: string }[]
  note: string
  cta: string
}

// Slider position 0..100 -> 20..3,000 attendees on a log scale, so the
// Starter range (up to 100) gets real travel instead of the first 3%.
function attendeesAt(pos: number) {
  const raw = 20 * Math.pow(150, pos / 100)
  const step = raw < 100 ? 10 : raw < 1000 ? 50 : 100
  return Math.round(raw / step) * step
}

export function PackagesSection({
  dict,
  lang,
  onOpenContact,
}: {
  dict: PackagesDict
  lang: string
  onOpenContact?: (location: string, buttonText: string, packageTier?: string) => void
}) {
  const [pos, setPos] = useState(50)
  const size = attendeesAt(pos)
  const tier = size <= 100 ? 0 : size <= 1000 ? 1 : 2
  const label = new Intl.NumberFormat(localeTags[lang as Locale] ?? "en").format(size) + (size >= 3000 ? "+" : "")

  return (
    <section id="packages" className="bg-[#0A0E14]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:py-20">
        <div className="sd-rise mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex flex-[1_1_360px] flex-col gap-2.5">
            <p className="m-0 font-mono text-[13px] uppercase tracking-[0.08em] text-[#F0605D]">{dict.eyebrow}</p>
            <h2 className="m-0 font-display text-[clamp(2.4rem,4.6vw,3.75rem)] font-normal leading-none">{dict.heading}</h2>
          </div>
          <div className="w-full max-w-[520px] flex-[1_1_360px]">
            <label htmlFor="attendees" className="flex items-baseline justify-between gap-3">
              <span className="text-[#8B949E]">{dict.attendees}</span>
              <span className="font-display text-[40px] leading-none text-[#F0605D]">{label}</span>
            </label>
            <input
              id="attendees"
              type="range"
              min={0}
              max={100}
              value={pos}
              aria-valuetext={label}
              onChange={(e) => setPos(Number(e.target.value))}
              className="m-0 h-11 w-full cursor-pointer accent-[#F0605D]"
            />
            <p role="status" className="m-0 text-sm text-[#C5CDD6]">
              {fill(dict.fits, { tier: dict.tiers[tier].name })}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {dict.tiers.map((t, i) => (
            <div
              key={t.name}
              className={`flex-[1_1_220px] rounded-md border p-[22px] transition duration-200 ${
                i === tier ? "-translate-y-1 border-[#F0605D]" : "border-[rgba(230,237,243,0.12)]"
              }`}
            >
              {/* Dim the unselected tiers by border and name colour only: opacity
                  pushed their 12px grey text under 3:1. */}
              <p className="m-0 font-mono text-xs uppercase tracking-[0.08em] text-[#8B949E]">{t.bestFor}</p>
              <h3
                className={`m-0 mb-2.5 mt-1.5 font-display text-4xl font-normal leading-none ${i === tier ? "text-[#F0605D]" : "text-[#8B949E]"}`}
              >
                {t.name}
              </h3>
              <p className="m-0 text-[#C5CDD6]">{t.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* The fitted tier rides into the booking notes (PlanEventModal's packageTier). */}
          <button
            type="button"
            onClick={() => onOpenContact?.("packages", dict.cta, dict.tiers[tier].name)}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded bg-[#C9433F] px-6 font-semibold text-white transition hover:-translate-y-px hover:bg-[#B03935]"
          >
            {dict.cta}
          </button>
          <p className="m-0 max-w-[560px] text-[#8B949E]">{dict.note}</p>
        </div>
      </div>
    </section>
  )
}
