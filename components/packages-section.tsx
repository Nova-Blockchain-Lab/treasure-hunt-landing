"use client"

import { useEffect } from "react"
import { Check, X, ArrowRight, Shield, BadgeCheck } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { SpotlightCard } from "./spotlight-card"
import { trackEvent } from "@/lib/analytics"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Feature values matrix: [Starter, Pro, Enterprise]
const featureValues: Record<string, (string | boolean)[][]> = {
  Checkpoints: [
    [true, true, true],
    [false, true, true],
    [false, true, true],
    [false, true, true],
  ],
  Engagement: [
    [true, true, true],
    [false, true, true],
    [false, true, true],
    [false, true, true],
    [false, true, true],
    [false, true, true],
    [false, true, true],
  ],
  "Support & Scale": [
    [false, true, true],
    [false, true, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
    [false, false, true],
  ],
}


interface PackagesDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  description: string
  tiers: { name: string; subtitle: string; bestFor: string; cta: string; badge: string; priceHint: string }[]
  categories: { title: string; features: string[] }[]
  trustSignal?: string
  guarantee?: string
  perAttendee?: string
}

function PackageCard({ tierIndex, dict, onOpenContact }: { tierIndex: number; dict: PackagesDict; onOpenContact?: (location: string, buttonText: string, packageTier?: string) => void }) {
  const t = dict.tiers[tierIndex]
  const featured = tierIndex === 1

  return (
    <SpotlightCard
      className={`rounded-2xl flex flex-col ${
        featured
          ? "border-2 !border-[rgba(240,96,93,0.3)] shadow-[0_0_40px_rgba(240,96,93,0.06)]"
          : ""
      }`}
      color={featured ? "rgba(240, 96, 93, 0.08)" : "rgba(88, 166, 255, 0.04)"}
    >
      {/* Header */}
      <div className="p-5 sm:p-7 pb-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-display text-[1.8rem] tracking-[0.04em]">{t.name}</h3>
          {t.badge && (
            <span className="shrink-0 bg-[#F0605D] text-white font-mono text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
              {t.badge}
            </span>
          )}
        </div>
        <p className="font-display text-xl text-[#E6EDF3] mb-1">{t.priceHint}</p>
        {featured && dict.perAttendee && (
          <p className="text-[0.7rem] text-[#3FB950] font-mono tracking-wide mb-1">{dict.perAttendee}</p>
        )}
        <p className="text-[0.85rem] text-[#8B949E] mb-1">{t.subtitle}</p>
        <p className="text-[0.75rem] text-[#484F58] font-mono tracking-wide">{t.bestFor}</p>
      </div>

      {/* Divider */}
      <div className="mx-5 sm:mx-7 my-5 h-px bg-[rgba(240,246,252,0.06)]" />

      {/* Feature rows */}
      <div className="px-5 sm:px-7 flex-1">
        {dict.categories.map((cat, ci) => {
          const catKey = ci === 0 ? "Checkpoints" : ci === 1 ? "Engagement" : "Support & Scale"
          const values = featureValues[catKey]
          return (
            <div key={ci} className={ci > 0 ? "mt-5" : ""}>
              <div className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#58A6FF] mb-2.5">
                {cat.title}
              </div>
              <div className="flex flex-col gap-2">
                {cat.features.map((featureLabel, fi) => {
                  const val = values?.[fi]?.[tierIndex] ?? false
                  const included = val !== false
                  return (
                    <div
                      key={fi}
                      className={`flex items-center gap-2.5 ${
                        included ? "" : "opacity-35"
                      }`}
                    >
                      {included ? (
                        <span className="inline-flex w-4 h-4 items-center justify-center rounded-full bg-[rgba(63,185,80,0.12)] text-[#3FB950] shrink-0">
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="inline-flex w-4 h-4 items-center justify-center rounded-full text-[#484F58] shrink-0">
                          <X className="w-2.5 h-2.5" strokeWidth={3} />
                        </span>
                      )}
                      <span className={`text-[0.8rem] leading-tight ${included ? "text-[#8B949E]" : "text-[#484F58]"}`}>
                        {featureLabel}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="p-5 sm:p-7 pt-6 mt-auto">
        <button
          onClick={() => onOpenContact?.("packages", t.cta, t.name)}
          className={`w-full flex items-center justify-center gap-2 font-display text-[0.9rem] tracking-widest uppercase py-3.5 rounded-lg transition-all duration-300 cursor-pointer ${
            featured
              ? "bg-[#F0605D] text-white hover:shadow-[0_0_24px_rgba(240,96,93,0.35)]"
              : "border border-[rgba(240,246,252,0.1)] text-[#E6EDF3] hover:border-[rgba(240,96,93,0.3)] hover:text-[#F0605D]"
          }`}
        >
          {t.cta}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </SpotlightCard>
  )
}

export function PackagesSection({ dict, onOpenContact }: { dict: PackagesDict; onOpenContact?: (location: string, buttonText: string, packageTier?: string) => void }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, once: true })

  useEffect(() => {
    if (!isVisible) return
    for (let i = 0; i < dict.tiers.length; i++) {
      trackEvent({ name: "package_viewed", params: { tier_name: dict.tiers[i].name, price: dict.tiers[i].priceHint } })
    }
  }, [isVisible, dict.tiers])

  return (
    <section ref={ref} className="py-24 md:py-32 relative bg-[#06080F]" id="packages">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              {dict.eyebrow}
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-4 text-balance">
              {dict.heading}
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>
            </h2>
            <p className="text-[#8B949E] text-lg max-w-[520px]">
              {dict.description}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.tiers.map((_, i) => (
              <PackageCard key={i} tierIndex={i} dict={dict} onOpenContact={onOpenContact} />
            ))}
          </div>
        </RevealOnScroll>

        {/* Trust signals & guarantee */}
        {(dict.trustSignal || dict.guarantee) && (
          <RevealOnScroll>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
              {dict.trustSignal && (
                <div className="flex items-center gap-2 text-[0.8rem] text-[#8B949E]">
                  <BadgeCheck className="w-4 h-4 text-[#58A6FF] shrink-0" />
                  {dict.trustSignal}
                </div>
              )}
              {dict.guarantee && (
                <div className="flex items-center gap-2 text-[0.8rem] text-[#8B949E]">
                  <Shield className="w-4 h-4 text-[#3FB950] shrink-0" />
                  {dict.guarantee}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  )
}
