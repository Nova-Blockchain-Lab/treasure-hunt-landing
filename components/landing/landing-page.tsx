"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SpotlightCard } from "@/components/spotlight-card"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SiteFooter } from "@/components/site-footer"
import { ContactModal } from "@/components/contact-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { resolveIcon } from "@/components/landing/icon-map"
import type { LandingContent } from "@/lib/landing/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = any

export function LandingPage({
  content,
  dict,
  lang,
}: {
  content: LandingContent
  dict: Dict
  lang: string
}) {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = useCallback(() => setContactOpen(true), [])
  const closeContact = useCallback(() => setContactOpen(false), [])
  const homeHref = lang === "en" ? "/" : `/${lang}`

  return (
    <main className="bg-[#06080F] min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 px-5 md:px-6 bg-[rgba(6,8,15,0.85)] backdrop-blur-xl border-b border-[rgba(240,246,252,0.06)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[56px] sm:h-[72px]">
          <Link href={homeHref} className="flex items-center" aria-label="Treasure Hunt home">
            <Image
              src="/treasure-hunt-name.png"
              alt="Treasure Hunt"
              width={240}
              height={32}
              className="h-8 sm:h-12 w-auto"
              style={{ width: "auto" }}
              sizes="240px"
              priority
            />
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <LanguageSwitcher />
            <button
              onClick={openContact}
              className="font-display text-[0.85rem] sm:text-[0.95rem] tracking-widest text-[#F0605D] border border-[rgba(240,96,93,0.3)] px-4 sm:px-5 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-[rgba(240,96,93,0.08)]"
            >
              {content.primaryCta}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 md:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              "radial-gradient(ellipse at 50% 30%, rgba(240,96,93,0.08), transparent 55%), #06080F",
              "radial-gradient(ellipse at 55% 40%, rgba(88,166,255,0.06), transparent 55%), #06080F",
              "radial-gradient(ellipse at 50% 30%, rgba(240,96,93,0.08), transparent 55%), #06080F",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-[900px] mx-auto text-center">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-5">
            {content.eyebrow}
          </div>
          <h1 className="font-display text-[clamp(2.2rem,6vw,4.2rem)] leading-[0.95] mb-6 text-balance">
            {content.headline}
            <br />
            <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
              {content.headlineHighlight}
            </span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-[#E6EDF3] max-w-[640px] mx-auto mb-8 leading-relaxed">
            {content.subhead}
          </p>
          <button
            onClick={openContact}
            className="inline-flex items-center justify-center gap-2.5 bg-[#F0605D] text-white font-display text-base sm:text-lg tracking-widest uppercase px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97]"
          >
            {content.primaryCta}
          </button>
          <p className="font-mono text-xs tracking-wide text-[#484F58] mt-6">{content.trust}</p>
        </div>
      </section>

      {/* Stats strip */}
      {content.stats && content.stats.length > 0 && (
        <section className="px-5 md:px-6 pb-4">
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((s, i) => (
              <RevealOnScroll key={i} delay={80 * i} variant="fade-scale">
                <div className="text-center rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] py-6 px-3">
                  <div className="font-display text-3xl md:text-4xl text-[#FF9A76]">{s.value}</div>
                  <div className="font-mono text-[0.7rem] tracking-wide uppercase text-[#8B949E] mt-1">
                    {s.label}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-20 md:py-28 px-5 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <RevealOnScroll>
            <div className="mb-14 max-w-[720px]">
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[0.98] mb-5 text-balance">
                {content.benefitsHeading}{" "}
                <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                  {content.benefitsHighlight}
                </span>
              </h2>
              {content.benefitsIntro && (
                <p className="text-lg text-[#8B949E] leading-relaxed">{content.benefitsIntro}</p>
              )}
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.benefits.map((b, i) => {
              const Icon = resolveIcon(b.icon)
              return (
                <RevealOnScroll key={i} delay={80 * (i % 3)} variant="fade-scale">
                  <SpotlightCard className="p-6 sm:p-8 h-full" color="rgba(88, 166, 255, 0.06)">
                    <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-xl bg-[rgba(88,166,255,0.08)] text-[#58A6FF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl mb-3">{b.title}</h3>
                    <p className="text-[#8B949E] text-[0.925rem] leading-relaxed">{b.description}</p>
                  </SpotlightCard>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      {content.comparison && (
        <section className="py-16 md:py-24 px-5 md:px-6 bg-[#0D1117]">
          <div className="max-w-[900px] mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-[0.98] mb-10 text-balance">
                {content.comparison.heading}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-scale">
              <div className="overflow-x-auto rounded-xl border border-[rgba(240,246,252,0.06)]">
                <table className="w-full text-left border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-[#131921]">
                      <th className="p-4 font-mono text-xs uppercase tracking-wide text-[#8B949E]" />
                      <th className="p-4 font-display text-lg text-[#FF9A76]">{content.comparison.ourLabel}</th>
                      <th className="p-4 font-display text-lg text-[#8B949E]">{content.comparison.theirLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparison.rows.map((r, i) => (
                      <tr key={i} className="border-t border-[rgba(240,246,252,0.06)]">
                        <td className="p-4 text-[0.9rem] text-[#E6EDF3] font-medium">{r.label}</td>
                        <td className="p-4 text-[0.9rem] text-[#E6EDF3]">{r.us}</td>
                        <td className="p-4 text-[0.9rem] text-[#8B949E]">{r.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* How it works */}
      {content.steps && (
        <section className="py-20 md:py-28 px-5 md:px-6">
          <div className="max-w-[1100px] mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-[0.98] mb-12 text-balance">
                {content.steps.heading}
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.steps.items.map((s, i) => (
                <RevealOnScroll key={i} delay={100 * i}>
                  <div className="h-full rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-6 sm:p-8">
                    <div className="font-display text-4xl text-[rgba(240,96,93,0.5)] mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl mb-3">{s.title}</h3>
                    <p className="text-[#8B949E] text-[0.925rem] leading-relaxed">{s.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 md:px-6 bg-[#0D1117]">
        <div className="max-w-[820px] mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-[0.98] mb-10 text-balance">
              {content.faqHeading}
            </h2>
          </RevealOnScroll>
          <div className="flex flex-col gap-3">
            {content.faq.map((item, i) => (
              <RevealOnScroll key={i} delay={50 * i}>
                <details className="group rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-5 sm:p-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-display text-lg sm:text-xl text-[#E6EDF3]">
                    {item.q}
                    <ChevronDown className="w-5 h-5 text-[#8B949E] transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                  </summary>
                  <p className="text-[#8B949E] text-[0.95rem] leading-relaxed mt-4">{item.a}</p>
                </details>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-5 md:px-6 relative overflow-hidden">
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[0.98] mb-5 text-balance">
            {content.ctaHeading}
          </h2>
          <p className="text-lg text-[#8B949E] max-w-[560px] mx-auto mb-8 leading-relaxed">
            {content.ctaSubhead}
          </p>
          <button
            onClick={openContact}
            className="inline-flex items-center justify-center gap-2.5 bg-[#F0605D] text-white font-display text-base sm:text-lg tracking-widest uppercase px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97]"
          >
            {content.ctaButton}
          </button>
        </div>
      </section>

      <SiteFooter dict={dict.footer} navDict={dict.nav} lang={lang} />
      <ContactModal
        dict={dict.contactForm}
        open={contactOpen}
        onClose={closeContact}
        variant="control"
        triggerLocation={`landing:${content.slug}`}
      />
    </main>
  )
}
