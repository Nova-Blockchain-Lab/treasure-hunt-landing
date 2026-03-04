"use client"

import { useRef, useState, useEffect } from "react"
import { Mic, Building2, GraduationCap, Flag, CircleChevronDown, Lightbulb } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"

const useCases = [
  {
    icon: Mic,
    color: "text-neon-pink",
    title: "Conferences & Summits",
    description:
      "Drive booth traffic and keep attendees engaged between sessions. Turn passive badge-scanners into active participants exploring every corner.",
  },
  {
    icon: Building2,
    color: "text-neon-cyan",
    title: "Corporate Events",
    description:
      "Gamify team building, product launches, and internal summits. Give employees a reason to explore the space and interact with every activation.",
  },
  {
    icon: GraduationCap,
    color: "text-neon-purple",
    title: "Universities & Campuses",
    description:
      "Orientation weeks, open days, and campus events come alive. Students explore, compete, and discover spaces they'd never find on their own.",
  },
  {
    icon: Flag,
    color: "text-neon-yellow",
    title: "Festivals & Expos",
    description:
      "Create an exploration layer across massive venues. Reward attendees for visiting stages, sponsor areas, and hidden experiences throughout the grounds.",
  },
  {
    icon: CircleChevronDown,
    color: "text-neon-blue",
    title: "Brand Activations",
    description:
      "Connect physical marketing campaigns to measurable engagement. Know exactly which touchpoints drove interaction and for how long.",
  },
  {
    icon: Lightbulb,
    color: "text-neon-pink",
    title: "Hackathons",
    description:
      "Keep builders energized between coding sessions. Reward participation across workshops, sponsor booths, and social areas with real prizes.",
  },
]

export function UseCasesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    const itemWidth = el.scrollWidth / useCases.length
    const index = Math.round(el.scrollLeft / itemWidth)
    setActiveIndex(Math.min(index, useCases.length - 1))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener("scroll", updateScrollState)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 340
    el.scrollBy({ left: direction === "left" ? -cardWidth - 20 : cardWidth + 20, behavior: "smooth" })
  }

  return (
    <section
      className="py-20 md:py-[120px] relative overflow-hidden"
      id="where"
      style={{
        background: `
          radial-gradient(ellipse at 70% 50%, rgba(255,87,177,0.05) 0%, transparent 50%),
          var(--bg-primary)
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
            <div>
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-neon-cyan" />
                03 / Use Cases
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] mb-4 text-balance">
                Where It
                <br />
                <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-[1.05rem] text-text-secondary max-w-[680px] leading-relaxed">
                Any venue with a crowd becomes an interactive playground. Treasure Hunt adapts to your scale, your
                audience, and your goals.
              </p>
            </div>

            {/* Desktop navigation arrows */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-11 h-11 rounded-full border border-neon-pink/30 flex items-center justify-center transition-all duration-300 hover:bg-neon-pink/10 hover:border-neon-pink hover:shadow-[var(--glow-pink)] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:border-neon-pink/30 disabled:hover:shadow-none cursor-pointer disabled:cursor-default"
                aria-label="Scroll left"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-11 h-11 rounded-full border border-neon-pink/30 flex items-center justify-center transition-all duration-300 hover:bg-neon-pink/10 hover:border-neon-pink hover:shadow-[var(--glow-pink)] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:border-neon-pink/30 disabled:hover:shadow-none cursor-pointer disabled:cursor-default"
                aria-label="Scroll right"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Gallery scroll container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none transition-opacity duration-300" style={{ opacity: canScrollLeft ? 1 : 0 }} />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none transition-opacity duration-300" style={{ opacity: canScrollRight ? 1 : 0 }} />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {useCases.map((useCase, i) => (
              <RevealOnScroll key={i} delay={80 * (i + 1)} className="self-stretch">
                <div
                  className="group relative w-[280px] sm:w-[300px] md:w-[320px] h-full shrink-0 snap-start rounded-2xl border border-neon-pink/15 backdrop-blur-[12px] p-7 md:p-9 text-center overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-neon-pink/30 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-linear-to-r before:from-transparent before:via-neon-pink before:to-transparent before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100 [@media(hover:none)_and_(pointer:coarse)]:backdrop-blur-none"
                  style={{
                    background: "linear-gradient(to bottom right, rgba(37,26,106,0.6), rgba(21,14,65,0.8))",
                  }}
                >
                  <span className={`block mb-5 ${useCase.color}`}>
                    <useCase.icon className="w-10 h-10 mx-auto transition-transform duration-400 group-hover:scale-110" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl md:text-[1.4rem] mb-3">{useCase.title}</h3>
                  <p className="text-[0.88rem] text-text-secondary leading-relaxed">{useCase.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Dot indicators - mobile only */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {useCases.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-neon-pink w-6" : "bg-text-muted/40"
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
    </section>
  )
}
