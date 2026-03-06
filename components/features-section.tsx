"use client"

import { MapPin, Sparkles, Smartphone, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SpotlightCard } from "./spotlight-card"
import { RevealOnScroll } from "./reveal-on-scroll"

const icons: LucideIcon[] = [MapPin, Sparkles, Smartphone, TrendingUp]

interface FeaturesDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  description: string
  items: { title: string; description: string }[]
}

export function FeaturesSection({ dict }: { dict: FeaturesDict }) {
  return (
    <section className="py-24 md:py-32 relative bg-[#06080F]" id="what">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              {dict.eyebrow}
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              {dict.heading}
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>
            </h2>
            <p className="text-lg text-[#8B949E] max-w-[680px] leading-relaxed">
              {dict.description}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.items.map((feature, i) => {
            const Icon = icons[i]
            return (
              <RevealOnScroll key={i} delay={100 * (i + 1)} variant="fade-scale">
                <SpotlightCard className="p-6 sm:p-9 h-full" color="rgba(88, 166, 255, 0.06)">
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
