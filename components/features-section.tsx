"use client"

import { MapPin, Sparkles, Smartphone, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SpotlightCard } from "./spotlight-card"
import { RevealOnScroll } from "./reveal-on-scroll"
import { features } from "@/data/features"

const iconMap: Record<string, LucideIcon> = { MapPin, Sparkles, Smartphone, TrendingUp }

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 relative bg-[#06080F]" id="what">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              01 / Features
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              What Treasure Hunt
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                Does for Your Event
              </span>
            </h2>
            <p className="text-lg text-[#8B949E] max-w-[680px] leading-relaxed">
              Treasure Hunt turns any venue into an interactive game. Attendees explore your space, scan checkpoints,
              earn rewards, and compete on live leaderboards {"\u2014"} all from their phone browser, no app download
              required.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.iconName]
            return (
              <RevealOnScroll key={i} delay={100 * (i + 1)} variant="fade-scale">
                <SpotlightCard className="p-9 h-full" color="rgba(88, 166, 255, 0.06)">
                  <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-xl bg-[rgba(88,166,255,0.08)] text-[#58A6FF]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{feature.title}</h3>
                  <p className="text-[#8B949E] text-[0.925rem] leading-relaxed">{feature.description}</p>
                </SpotlightCard>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
