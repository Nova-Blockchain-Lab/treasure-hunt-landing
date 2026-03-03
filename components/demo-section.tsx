"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RevealOnScroll } from "./reveal-on-scroll"

const phones = [
  {
    src: "/ethdenver-home.png",
    alt: "Treasure Hunt home screen at ETHDenver",
    caption: "Home base: scan, explore, compete",
  },
  {
    src: "/ethdenver-map.png",
    alt: "Interactive venue map with checkpoint tracking",
    caption: "Interactive venue map with live checkpoint tracking",
  },
  {
    src: "/ethdenver-leaderboard.png",
    alt: "Live leaderboard at ETHDenver",
    caption: "Live leaderboard keeps players competing all day",
  },
  {
    src: "/ethdenver-merch.png",
    alt: "Built-in merch store",
    caption: "Built-in merch store where rewards become real items",
  },
]

const stats = [
  { value: "207", label: "Active Players" },
  { value: "59", label: "Venue Checkpoints" },
  { value: "462K+", label: "Rewards Claimed" },
  { value: "4", label: "Days of Play" },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          let current = 0
          const increment = target / 60
          function updateCounter() {
            current += increment
            if (current >= target) {
              setCount(target)
              return
            }
            setCount(Math.round(current))
            requestAnimationFrame(updateCounter)
          }
          updateCounter()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-display text-[1.6rem] md:text-[2.2rem] text-neon-yellow tracking-wide">
      {count}
      {suffix}
    </span>
  )
}

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

  // Track scroll position for dot indicators on mobile
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
      className="py-20 md:py-[120px] relative"
      id="demo"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(255,87,177,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(34,209,238,0.04) 0%, transparent 50%),
          var(--bg-primary)
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-neon-cyan" />
              Live at ETHDenver 2026
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] mb-6 text-balance">
              See What{" "}
              <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                207 Players
              </span>{" "}
              Experienced at ETHDenver
            </h2>
          </div>
        </RevealOnScroll>

        {/* Phone carousel - fixed: scroll indicators for mobile */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 md:justify-items-center gap-4 md:gap-8 mb-12 overflow-x-auto md:overflow-visible scroll-snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {phones.map((phone, i) => (
            <RevealOnScroll key={i} delay={100 * (i + 1)}>
              <div className="flex flex-col items-center gap-4 shrink-0 snap-center">
                <div className="w-[180px] sm:w-[200px] md:w-[220px] bg-[#0a0a0a] rounded-[32px] p-2 border border-neon-pink/20 transition-all duration-400 hover:shadow-[var(--glow-pink)] hover:border-neon-pink/50">
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
                <p className="text-[0.82rem] text-text-secondary text-center max-w-[200px] leading-normal">
                  {phone.caption}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Scroll dot indicators - only visible on mobile */}
        <div className="flex md:hidden justify-center gap-2 mb-8">
          {phones.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-neon-pink w-6" : "bg-text-muted/40"
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

        {/* Stats - fixed: proper 2x2 grid on mobile */}
        <RevealOnScroll delay={500}>
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-5 md:gap-12 mx-auto max-w-md md:max-w-none my-14 md:my-10">
            {stats.map((stat, i) => {
              const { target, suffix } = parseStatValue(stat.value)
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <AnimatedCounter target={target} suffix={suffix} />
                  <span className="font-mono text-[0.65rem] text-text-muted tracking-widest uppercase">
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
              href="https://hunt.ethdenver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-linear-to-br from-neon-pink to-[#e04a9e] text-white font-display text-lg tracking-widest uppercase px-10 py-4 rounded-lg shadow-[var(--glow-pink)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_40px_rgba(255,87,177,0.7),0_0_80px_rgba(255,87,177,0.3)] active:scale-[0.97]"
            >
              {"See Treasure Hunt in Action \u2192"}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
