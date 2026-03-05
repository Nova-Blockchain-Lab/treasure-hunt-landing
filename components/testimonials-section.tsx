"use client"

import { RevealOnScroll } from "./reveal-on-scroll"
import { SpotlightCard } from "./spotlight-card"

const testimonials = [
  {
    quote:
      "Treasure Hunt completely transformed our ETHDenver experience. 207 players engaged across 59 checkpoints over 4 days \u2014 the energy was incredible.",
    author: "ETHDenver Organizer",
    role: "Event Operations",
  },
  {
    quote:
      "My booth was tucked in a back corner, I barely had anyone stopping by. Then Treasure Hunt hid a checkpoint at my spot and suddenly people kept showing up. They'd scan the tag, see my custom kicks, and start buying. That one checkpoint completely turned my weekend around.",
    author: "Custom Sneaker Vendor",
    role: "ETHDenver 2026",
  },
  {
    quote:
      "No app download, no complicated setup. Players were scanning checkpoints within 30 seconds of signing in. The merch store was a huge hit.",
    author: "NOVA Blockchain Lab",
    role: "Platform Developer",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 relative bg-[#06080F]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              04 / What They Say
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                Event Organizers
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={120 * (i + 1)} variant="fade-scale">
              <SpotlightCard className="p-8 h-full" color="rgba(240, 96, 93, 0.04)">
                <div className="flex flex-col h-full">
                  <svg className="w-8 h-8 text-[#F0605D] opacity-40 mb-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[0.925rem] text-[#8B949E] leading-relaxed mb-6 flex-1">
                    {t.quote}
                  </p>
                  <div>
                    <div className="font-display text-base text-[#E6EDF3]">{t.author}</div>
                    <div className="text-sm text-[#484F58]">{t.role}</div>
                  </div>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
