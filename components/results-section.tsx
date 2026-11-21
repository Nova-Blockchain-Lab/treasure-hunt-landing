"use client"

import Link from "next/link"
import { useState } from "react"
import { homeEvents } from "@/data/home-events"
import { localeTags, type Locale } from "@/i18n/config"
import { fill } from "@/lib/utils"

interface ResultsDict {
  eyebrow: string
  heading: string
  intro: string
  finds: string
  checkpoints: string
  players: string
  minted: string
  standVisits: string
  stands: string
  phones: string
  giveaways: string
  readReport: string
  events: Record<string, { title: string; location: string }>
}

interface Quote {
  quote: string
  author: string
  role: string
}

const RULE = "border-[rgba(230,237,243,0.1)]"

export function ResultsSection({ dict, quote, lang }: { dict: ResultsDict; quote: Quote; lang: string }) {
  // Smart Cities: the largest deployment, so the first card a visitor sees.
  const [selected, setSelected] = useState(3)
  const nf = new Intl.NumberFormat(localeTags[lang as Locale] ?? "en")
  const max = Math.max(...homeEvents.map((e) => e.stats[0]))

  // Only the two bilingual reports have a real /pt version; the rest are
  // EN-only and their /<locale>/ variants canonicalise back to the EN URL.
  // Same rule as site-footer.tsx.
  const ptPrefix = lang === "pt" ? "/pt" : ""
  const ev = homeEvents[selected]
  const href = ev.report.startsWith("http") ? ev.report : `${ev.bilingual ? ptPrefix : ""}/${ev.report}`
  const labels = ev.token
    ? [dict.finds, dict.checkpoints, dict.players, fill(dict.minted, { token: ev.token })]
    : [dict.standVisits, dict.stands, dict.phones, dict.giveaways]
  const card = dict.events[ev.key]

  return (
    <section id="results" className="bg-[#0A0E14]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:py-20">
        <div className="sd-rise mb-8 flex flex-col gap-2.5">
          <p className="m-0 font-mono text-[13px] uppercase tracking-[0.08em] text-[#F0605D]">{dict.eyebrow}</p>
          <h2 className="m-0 font-display text-[clamp(2.4rem,4.6vw,3.75rem)] font-normal leading-none">{dict.heading}</h2>
          <p className="m-0 max-w-[640px] text-[#8B949E]">{dict.intro}</p>
        </div>

        <div className="flex flex-wrap items-start gap-10">
          <div className={`min-w-0 flex-[3_1_440px] border-b ${RULE}`}>
            {homeEvents.map((e, i) => {
              const on = i === selected
              const v = e.stats[0]
              return (
                <button
                  key={e.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(i)}
                  className={`grid min-h-[52px] w-full cursor-pointer grid-cols-[1fr_4rem] items-center gap-x-4 gap-y-1.5 border-t ${RULE} px-3 py-2.5 text-left font-medium transition-colors sm:grid-cols-[minmax(6rem,13rem)_1fr_4.5rem] ${
                    on
                      ? "bg-[rgba(240,96,93,0.1)] text-[#E6EDF3]"
                      : "text-[#8B949E] hover:bg-[rgba(230,237,243,0.04)] hover:text-[#E6EDF3]"
                  }`}
                >
                  <span>{dict.events[e.key].title.replace(/\s*\d{4}$/, "")}</span>
                  <span className="col-span-2 row-start-2 block h-3.5 sm:col-span-1 sm:row-start-auto">
                    <span
                      className={`sd-grow block h-full rounded-sm ${on ? "bg-[#F0605D]" : "bg-[#3A414B]"}`}
                      style={{ width: `${(v / max) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-mono text-sm">{nf.format(v)}</span>
                </button>
              )
            })}
          </div>

          <div className="flex min-w-0 flex-[2_1_320px] flex-col gap-5 rounded-lg border border-[rgba(230,237,243,0.14)] bg-[#06080F] p-6">
            <div>
              <h3 className="m-0 font-display text-[34px] font-normal leading-[1.05]">{card.title}</h3>
              <p className="m-0 mt-1 font-mono text-[13px] text-[#8B949E]">{card.location}</p>
            </div>
            <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-5">
              {ev.stats.map((v, i) => (
                <div key={i} className="flex flex-col-reverse">
                  <dt className="text-[13px] text-[#8B949E]">{labels[i]}</dt>
                  <dd className={`m-0 font-display text-[40px] leading-none ${i === 0 ? "text-[#F0605D]" : ""}`}>
                    {nf.format(v)}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center font-medium text-[#F0605D] underline underline-offset-[5px] hover:text-[#FF9A76]"
            >
              {dict.readReport}
            </Link>
          </div>
        </div>

        <blockquote className="sd-rise m-0 mt-14 max-w-[860px]">
          <p className="m-0 text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug">{quote.quote}</p>
          <footer className="mt-3 font-mono text-[13px] text-[#8B949E]">
            {quote.author}, {quote.role}
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
