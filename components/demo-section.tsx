"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { TextShimmer } from "./text-shimmer"
import { NumberTicker } from "./number-ticker"
import { phones } from "@/data/demo-phones"

interface EventCardDict {
  title: string
  location: string
  stat1: string
  stat2: string
}

interface DemoDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  headingSuffix: string
  seeItLive: string
  seeReport: string
  seeFmReport: string
  phones: string[]
  stats: { value: string; label: string }[]
  ethdenverCard: EventCardDict
  futureMakerCard: EventCardDict
}

function parseStatValue(value: string) {
  const hasK = value.includes("K")
  const hasM = value.includes("M")
  const hasPlus = value.includes("+")
  const numStr = value.replace(/[KM+,]/g, "")
  const target = parseFloat(numStr)
  const suffix = (hasK ? "K" : hasM ? "M" : "") + (hasPlus ? "+" : "")
  const decimalPlaces = numStr.includes(".") ? (numStr.split(".")[1]?.length || 0) : 0
  return { target, suffix, decimalPlaces }
}

export function DemoSection({ dict, lang }: { dict: DemoDict; lang: string }) {
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

  const ethReportHref = lang === "en" ? "/ethdenver-report" : `/${lang}/ethdenver-report`
  const fmReportHref = lang === "en" ? "/futuremaker-report" : `/${lang}/futuremaker-report`

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
                {dict.eyebrow}
              </TextShimmer>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              {dict.heading}{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>{" "}
              {dict.headingSuffix}
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
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 220px"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-[0.82rem] text-[#8B949E] text-center max-w-[200px] leading-normal">
                  {dict.phones[i] ?? phone.caption}
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
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 md:gap-12 mx-auto max-w-md md:max-w-none my-14 md:my-10">
            {dict.stats.map((stat, i) => {
              const { target, suffix, decimalPlaces } = parseStatValue(stat.value)
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="font-display text-[1.6rem] md:text-[2.2rem] text-[#E3B341] tracking-wide">
                    <NumberTicker value={target} decimalPlaces={decimalPlaces} className="text-[#E3B341] font-display text-[1.6rem] md:text-[2.2rem]" />
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

        {/* Event Cards */}
        <RevealOnScroll delay={600}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* ETHDenver Card - Primary with glow */}
            <div className="md:col-span-7 rounded-xl border border-[rgba(240,96,93,0.3)] bg-[#131921] p-6 shadow-[0_0_20px_rgba(240,96,93,0.08)] transition-all duration-300 hover:border-[rgba(240,96,93,0.5)] hover:shadow-[0_0_30px_rgba(240,96,93,0.12)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F0605D] text-lg">&#9733;</span>
                <h3 className="font-display text-lg tracking-wide text-white">{dict.ethdenverCard.title}</h3>
              </div>
              <p className="text-sm text-[#8B949E] mb-3">{dict.ethdenverCard.location}</p>
              <p className="text-sm text-[#E6EDF3] mb-1">{dict.ethdenverCard.stat1}</p>
              <p className="text-sm text-[#E6EDF3] mb-5">{dict.ethdenverCard.stat2}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://hunt.ethdenver.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F0605D] text-white font-display text-sm tracking-wider uppercase px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(240,96,93,0.3)] active:scale-[0.97] cursor-pointer"
                >
                  {dict.seeItLive}
                </a>
                <Link
                  href={ethReportHref}
                  className="inline-flex items-center justify-center gap-2 text-[#FF9A76] font-display text-sm tracking-wider uppercase px-5 py-2.5 border border-[rgba(255,154,118,0.3)] rounded-lg transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  {dict.seeReport}
                </Link>
              </div>
            </div>

            {/* Future Maker Card */}
            <div className="md:col-span-5 rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-6 transition-all duration-300 hover:border-[rgba(240,246,252,0.15)] hover:bg-[#1A2233]">
              <h3 className="font-display text-lg tracking-wide text-white mb-3">{dict.futureMakerCard.title}</h3>
              <p className="text-sm text-[#8B949E] mb-3">{dict.futureMakerCard.location}</p>
              <p className="text-sm text-[#E6EDF3] mb-1">{dict.futureMakerCard.stat1}</p>
              <p className="text-sm text-[#E6EDF3] mb-5">{dict.futureMakerCard.stat2}</p>
              <Link
                href={fmReportHref}
                className="inline-flex items-center justify-center gap-2 text-[#FF9A76] font-display text-sm tracking-wider uppercase px-5 py-2.5 border border-[rgba(255,154,118,0.3)] rounded-lg transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {dict.seeFmReport}
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
