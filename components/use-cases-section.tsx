"use client"

import { useRef, useState, useEffect } from "react"
import { Mic, Building2, GraduationCap, Flag, CircleChevronDown, Lightbulb } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"

const icons: LucideIcon[] = [Mic, Building2, GraduationCap, Flag, CircleChevronDown, Lightbulb]

interface UseCasesDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  description: string
  items: { title: string; description: string }[]
}

export function UseCasesSection({ dict }: { dict: UseCasesDict }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const itemWidth = el.scrollWidth / dict.items.length
      const index = Math.round(el.scrollLeft / itemWidth)
      setActiveIndex(Math.min(index, dict.items.length - 1))
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [dict.items.length])

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0A0E14]" id="where">
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
            <p className="text-lg text-[#8B949E] max-w-[680px] leading-relaxed">
              {dict.description}
            </p>
          </div>
        </RevealOnScroll>

        {/* Desktop: 3x2 grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {dict.items.map((useCase, i) => {
            const Icon = icons[i]
            return (
              <RevealOnScroll key={i} delay={80 * (i + 1)} variant="fade-scale">
                <div className="rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-7 md:p-9 text-center transition-all duration-300 hover:border-[rgba(240,96,93,0.2)] hover:bg-[#1A2233] h-full">
                  <span className="block mb-5 text-[#58A6FF]">
                    <Icon className="w-10 h-10 mx-auto" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl md:text-[1.4rem] mb-3">{useCase.title}</h3>
                  <p className="text-[0.925rem] text-[#8B949E] leading-relaxed">{useCase.description}</p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>

        {/* Mobile: horizontal snap scroll */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {dict.items.map((useCase, i) => {
              const Icon = icons[i]
              return (
                <div
                  key={i}
                  className="w-[260px] shrink-0 snap-start rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-5 text-center"
                >
                  <span className="block mb-5 text-[#58A6FF]">
                    <Icon className="w-10 h-10 mx-auto" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl mb-3">{useCase.title}</h3>
                  <p className="text-[0.925rem] text-[#8B949E] leading-relaxed">{useCase.description}</p>
                </div>
              )
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {dict.items.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#F0605D] w-6" : "bg-[#484F58]/40"
                }`}
                onClick={() => {
                  const el = scrollRef.current
                  if (!el) return
                  const children = el.querySelectorAll(":scope > div")
                  children[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
                }}
                aria-label={`Go to use case ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
