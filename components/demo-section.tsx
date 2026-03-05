"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { TextShimmer } from "./text-shimmer"
import { NumberTicker } from "./number-ticker"
import { phones } from "@/data/demo-phones"
import { stats } from "@/data/demo-stats"

function parseStatValue(value: string) {
  const hasK = value.includes("K")
  const hasPlus = value.includes("+")
  const numStr = value.replace(/[K+,]/g, "")
  const target = parseFloat(numStr)
  const suffix = (hasK ? "K" : "") + (hasPlus ? "+" : "")
  return { target, suffix }
}

export function DemoSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const scrollLeft = el.scrollLeft
      const itemWidth = el.scrollWidth / phones.length
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(Math.min(index, phones.length - 1))
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      className="py-24 md:py-32 relative bg-[#0A0E14]"
      id="demo"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              <TextShimmer duration={3} spread={1.5} className="font-mono text-xs tracking-[0.2em] uppercase [--base-color:#58A6FF] [--base-gradient-color:#E6EDF3]">
                Live at ETHDenver 2026
              </TextShimmer>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              See What{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                207 Players
              </span>{" "}
              Experienced at ETHDenver
            </h2>
          </div>
        </RevealOnScroll>

        {/* Phone carousel */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 md:justify-items-center gap-4 md:gap-8 mb-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {phones.map((phone, i) => (
            <RevealOnScroll key={i} delay={100 * (i + 1)}>
              <div className="flex flex-col items-center gap-4 shrink-0 snap-center">
                <div
                  className={`w-[180px] sm:w-[200px] md:w-[220px] bg-[#0a0a0a] rounded-[32px] p-2 border transition-all duration-400 ${
                    i === activeIndex
                      ? "border-[rgba(240,96,93,0.4)] shadow-[0_0_20px_rgba(240,96,93,0.15)] md:scale-105"
                      : "border-[rgba(240,246,252,0.08)] hover:border-[rgba(240,96,93,0.25)] md:opacity-60"
                  }`}
                >
                  <div className="rounded-3xl overflow-hidden">
                    <Image
                      src={phone.src}
                      alt={phone.alt}
                      width={220}
                      height={440}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-[0.82rem] text-[#8B949E] text-center max-w-[200px] leading-normal">
                  {phone.caption}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Scroll dot indicators - mobile only */}
        <div className="flex md:hidden justify-center gap-2 mb-8">
          {phones.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#F0605D] w-6" : "bg-[#484F58]/40"
              }`}
              onClick={() => {
                scrollRef.current?.children[i]?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                })
              }}
              aria-label={`Go to phone ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats with NumberTicker */}
        <RevealOnScroll delay={500}>
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-5 md:gap-12 mx-auto max-w-md md:max-w-none my-14 md:my-10">
            {stats.map((stat, i) => {
              const { target, suffix } = parseStatValue(stat.value)
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="font-display text-[1.6rem] md:text-[2.2rem] text-[#E3B341] tracking-wide">
                    <NumberTicker value={target} className="text-[#E3B341] font-display text-[1.6rem] md:text-[2.2rem]" />
                    {suffix}
                  </span>
                  <span className="font-mono text-[0.65rem] text-[#484F58] tracking-widest uppercase">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
          <div className="text-center">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="inline-flex items-center gap-2.5 bg-[#F0605D] text-white font-display text-lg tracking-widest uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97]"
            >
              Book a Demo
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
