"use client"

import Image from "next/image"
import { useState } from "react"
import { fill } from "@/lib/utils"

interface DemoDict {
  label: string
  /** Five room names, then the entrance. */
  rooms: string[]
  /** One name per checkpoint, same order as SPOTS. */
  spots: string[]
  tapLabel: string
  playerSees: string
  points: string
  found: string
  redeem: string
  reset: string
  youSee: string
  visited: string
  quiet: string
  none: string
  allVisited: string
  start: string
  progress: string
  enough: string
  redeemed: string
}

interface HeroDict {
  eyebrow: string
  headline: string
  tagline: string
  bookDemo: string
  seeResults: string
  trustBadge: string
  demo: DemoDict
}

// The demo floor plan, in % of the board.
const ROOMS = [
  { left: 3, top: 5, width: 45, height: 40 },
  { left: 52, top: 5, width: 45, height: 55 },
  { left: 3, top: 50, width: 27, height: 45 },
  { left: 33, top: 50, width: 15, height: 22 },
  { left: 52, top: 65, width: 45, height: 30, dashed: true },
]
const SPOTS: [number, number][] = [[26, 28], [65, 26], [86, 45], [16, 76], [40.5, 63], [80, 82]]
const PER_TAP = 100
const HAT = 300
const GRID =
  "linear-gradient(rgba(230,237,243,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(230,237,243,.05) 1px, transparent 1px)"
const RULE = "border-[rgba(230,237,243,0.1)]"

// The whole game in one card: tap a tag, see what's left, redeem. It replaced
// the three-step "How it works" section, so those three steps live here now.
function HuntDemo({ d }: { d: DemoDict }) {
  const [found, setFound] = useState(() => SPOTS.map(() => false))
  const [redeemed, setRedeemed] = useState(false)

  const n = found.filter(Boolean).length
  const points = n * PER_TAP - (redeemed ? HAT : 0)
  const visited = d.spots.filter((_, i) => found[i])
  const quiet = d.spots.filter((_, i) => !found[i])
  const message = redeemed
    ? d.redeemed
    : points >= HAT
      ? d.enough
      : n > 0
        ? fill(d.progress, { n: HAT - points })
        : d.start

  return (
    <div className="rounded-lg border border-[rgba(230,237,243,0.14)] bg-[#0A0E14]">
      <p className={`m-0 border-b ${RULE} px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-[#F0605D]`}>
        {d.label}
      </p>

      <div
        className="relative m-4 aspect-[4/3] overflow-hidden"
        style={{ backgroundImage: GRID, backgroundSize: "24px 24px" }}
      >
        {ROOMS.map((r, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute border ${r.dashed ? "border-dashed" : ""} border-[rgba(230,237,243,0.22)] px-1.5 py-1 font-mono text-[10px] uppercase leading-tight text-[#8B949E] sm:px-2 sm:text-[11px]`}
            style={{ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` }}
          >
            {d.rooms[i]}
          </div>
        ))}
        <div
          aria-hidden
          className="absolute border-t-2 border-[#8B949E] pt-1 text-center font-mono text-[10px] uppercase text-[#8B949E] sm:text-[11px]"
          style={{ left: "33%", top: "86%", width: "15%" }}
        >
          {d.rooms[5]}
        </div>

        {SPOTS.map(([x, y], i) => (
          <button
            key={i}
            type="button"
            disabled={found[i]}
            onClick={() => setFound((f) => f.map((v, j) => v || j === i))}
            aria-label={fill(d.tapLabel, { spot: d.spots[i] })}
            className={`absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition sm:size-14 ${
              found[i]
                ? "bg-[#F0605D] font-mono text-xs font-semibold text-[#06080F] sm:text-[13px]"
                : "cursor-pointer bg-[#0A0E14] hover:scale-110"
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {found[i] ? (
              `+${PER_TAP}`
            ) : (
              <>
                <span aria-hidden className="absolute inset-0 rounded-full border-2 border-[#F0605D] opacity-60 motion-safe:animate-ping" />
                <Image src="/treasure-hunt-mark.png" alt="" width={128} height={122} unoptimized className="h-auto w-full" />
              </>
            )}
          </button>
        ))}
      </div>

      <div className={`grid border-t ${RULE} sm:grid-cols-2`}>
        <div className="flex flex-col gap-2 p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B949E]">{d.playerSees}</span>
          <p className="m-0 flex items-baseline gap-2">
            <span className="font-display text-[44px] leading-none text-[#F0605D]">{points}</span>
            <span className="text-sm text-[#8B949E]">
              {d.points} · {fill(d.found, { n, total: SPOTS.length })}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setRedeemed(true)}
              disabled={points < HAT || redeemed}
              className="min-h-11 cursor-pointer rounded border border-[#F0605D] px-4 text-sm font-semibold text-[#F0605D] transition-colors hover:bg-[#F0605D] hover:text-[#06080F] disabled:cursor-not-allowed disabled:border-[#30363D] disabled:bg-transparent disabled:text-[#8B949E]"
            >
              {fill(d.redeem, { cost: HAT })}
            </button>
            <button
              type="button"
              onClick={() => {
                setFound(SPOTS.map(() => false))
                setRedeemed(false)
              }}
              className="min-h-11 cursor-pointer px-2 font-mono text-[13px] text-[#8B949E] underline underline-offset-4 hover:text-[#E6EDF3]"
            >
              {d.reset}
            </button>
          </div>
        </div>
        <div className={`flex flex-col gap-2 border-t ${RULE} p-4 text-sm sm:border-l sm:border-t-0`}>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8B949E]">{d.youSee}</span>
          <span>
            {d.visited}: {visited.length ? visited.join(", ") : d.none}
          </span>
          <span className="text-[#8B949E]">
            {d.quiet}: {quiet.length ? quiet.join(", ") : d.allVisited}
          </span>
        </div>
      </div>

      <p role="status" className={`m-0 border-t ${RULE} px-4 py-3 text-sm text-[#C5CDD6]`}>
        {message}
      </p>
    </div>
  )
}

export function HeroSection({ dict, onOpenContact }: { dict: HeroDict; onOpenContact?: () => void }) {
  return (
    <section id="hero" className="bg-[#06080F] pt-[56px] sm:pt-[72px]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-12 px-5 pb-16 pt-10 sm:pb-20 sm:pt-14">
        {/* The h1 is the LCP element: never animate it (see CLAUDE.md, SEO notes). */}
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-5">
          <p className="m-0 font-mono text-[13px] uppercase tracking-[0.08em] text-[#8B949E]">{dict.eyebrow}</p>
          <h1 className="m-0 font-display text-[clamp(3.25rem,7.4vw,6.5rem)] font-normal leading-[0.92] text-balance">
            {dict.headline}
          </h1>
          <p className="hero-rise m-0 max-w-[520px] text-lg text-[#C5CDD6] sm:text-[19px]">{dict.tagline}</p>
          <div className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:0.1s]">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded bg-[#C9433F] px-6 font-semibold text-white transition hover:-translate-y-px hover:bg-[#B03935]"
            >
              {dict.bookDemo}
            </button>
            <a
              href="#results"
              className="inline-flex min-h-12 items-center px-1 font-medium text-[#E6EDF3] underline underline-offset-[5px] hover:text-[#F0605D]"
            >
              {dict.seeResults}
            </a>
          </div>
          <p className="hero-rise m-0 font-mono text-[13px] text-[#8B949E] [animation-delay:0.2s]">{dict.trustBadge}</p>
        </div>

        <div className="min-w-0 flex-[1_1_460px]">
          <HuntDemo d={dict.demo} />
        </div>
      </div>
    </section>
  )
}
