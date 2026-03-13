"use client"

import { RevealOnScroll } from "./reveal-on-scroll"
import { trackEvent } from "@/lib/analytics"

interface CTADict {
  heading: string
  headingHighlight: string
  description: string
  trustSignal: string
  bookDemo: string
  seeItLive: string
}

interface CTASectionProps {
  dict: CTADict
  onOpenContact?: () => void
  onSecondaryAction?: () => void
  secondaryIsButton?: boolean
}

export function CTASection({ dict, onOpenContact, onSecondaryAction, secondaryIsButton }: CTASectionProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#06080F]" id="cta">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(240,96,93,0.06) 0%, transparent 60%),
            #06080F
          `,
        }}
      />

      <RevealOnScroll>
        <div className="relative z-2 max-w-[720px] mx-auto text-center px-5 md:px-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] mb-6 text-balance">
            {dict.heading}
            <br />
            <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
              {dict.headingHighlight}
            </span>
          </h2>

          <p className="text-xl text-[#8B949E] mb-4">{dict.description}</p>

          {/* Trust signal */}
          <p className="font-mono text-sm text-[#484F58] tracking-wide mb-12">
            {dict.trustSignal}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2.5 bg-[#F0605D] text-white font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3.5 sm:py-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97]"
            >
              {dict.bookDemo}
            </button>
            {secondaryIsButton ? (
              <button
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center gap-2.5 bg-transparent text-[#FF9A76] font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3 sm:py-3.5 border-2 border-[rgba(255,154,118,0.3)] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {dict.seeItLive}
              </button>
            ) : (
              <a
                href="https://hunt.ethdenver.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ name: "external_link_clicked", params: { url: "https://hunt.ethdenver.com/", link_text: dict.seeItLive, location: "cta_section" } })}
                className="inline-flex items-center justify-center gap-2.5 bg-transparent text-[#FF9A76] font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3 sm:py-3.5 border-2 border-[rgba(255,154,118,0.3)] rounded-lg transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {dict.seeItLive}
              </a>
            )}
          </div>

          <p className="font-mono text-[0.85rem] text-[#484F58] tracking-wide mt-6">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="text-[#58A6FF] border-b border-[rgba(88,166,255,0.3)] transition-colors duration-300 hover:border-[#58A6FF]"
            >
              nova.blockchain.lab@novaims.unl.pt
            </a>
          </p>
        </div>
      </RevealOnScroll>
    </section>
  )
}
