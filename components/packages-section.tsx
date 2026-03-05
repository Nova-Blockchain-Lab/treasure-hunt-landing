"use client"

import { Check, X, ArrowRight } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { SpotlightCard } from "./spotlight-card"
import { tiers, categories } from "@/data/packages"

function PackageCard({ tierIndex }: { tierIndex: number }) {
  const t = tiers[tierIndex]

  return (
    <SpotlightCard
      className={`rounded-2xl flex flex-col ${
        t.featured
          ? "border-2 !border-[rgba(240,96,93,0.3)] shadow-[0_0_40px_rgba(240,96,93,0.06)]"
          : ""
      }`}
      color={t.featured ? "rgba(240, 96, 93, 0.08)" : "rgba(88, 166, 255, 0.04)"}
    >
      {/* Header */}
      <div className="p-7 pb-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-display text-[1.8rem] tracking-[0.04em]">{t.name}</h3>
          {t.badge && (
            <span className="shrink-0 bg-[#F0605D] text-white font-mono text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
              {t.badge}
            </span>
          )}
        </div>
        <p className="text-[0.85rem] text-[#8B949E] mb-1">{t.subtitle}</p>
        <p className="text-[0.75rem] text-[#484F58] font-mono tracking-wide">{t.bestFor}</p>
      </div>

      {/* Divider */}
      <div className="mx-7 my-5 h-px bg-[rgba(240,246,252,0.06)]" />

      {/* Feature rows */}
      <div className="px-7 flex-1">
        {categories.map((cat, ci) => (
          <div key={ci} className={ci > 0 ? "mt-5" : ""}>
            <div className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#58A6FF] mb-2.5">
              {cat.title}
            </div>
            <div className="flex flex-col gap-2">
              {cat.features.map((feature, fi) => {
                const val = feature.values[tierIndex]
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
                      {feature.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-7 pt-6 mt-auto">
        <a
          href={t.mailto}
          className={`flex items-center justify-center gap-2 font-display text-[0.9rem] tracking-widest uppercase py-3.5 rounded-lg transition-all duration-300 cursor-pointer ${
            t.featured
              ? "bg-[#F0605D] text-white hover:shadow-[0_0_24px_rgba(240,96,93,0.35)]"
              : "border border-[rgba(240,246,252,0.1)] text-[#E6EDF3] hover:border-[rgba(240,96,93,0.3)] hover:text-[#F0605D]"
          }`}
        >
          {t.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </SpotlightCard>
  )
}

export function PackagesSection() {
  return (
    <section className="py-24 md:py-32 relative bg-[#06080F]" id="packages">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              05 / Packages
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-4 text-balance">
              Find the Right Fit
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                for Your Event
              </span>
            </h2>
            <p className="text-[#8B949E] text-lg max-w-[520px] mx-auto">
              Every package includes the core Treasure Hunt platform. Pick the tier that matches your scale.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((_, i) => (
              <PackageCard key={i} tierIndex={i} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
