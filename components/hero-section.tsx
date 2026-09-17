"use client"

import Image from "next/image"
import { trackEvent } from "@/lib/analytics"

interface HeroDict {
  srTitle: string
  headline: string
  headlineHighlight: string
  tagline: string
  taglineSuffix: string
  trustBadge: string
  bookDemo: string
  seeItLive: string
}

interface HeroProps {
  dict: HeroDict
  onOpenContact?: () => void
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  secondaryIsButton?: boolean
  trustBadgeClassName?: string
}

export function HeroSection({
  dict,
  onOpenContact,
  onPrimaryAction,
  onSecondaryAction,
  secondaryIsButton,
  trustBadgeClassName,
}: HeroProps) {
  const handlePrimary = onPrimaryAction || onOpenContact

  return (
    <section className="relative min-h-[88svh] md:min-h-screen flex items-center overflow-hidden pt-[56px] sm:pt-[72px]" id="hero">
      {/* Ambient gradient background: two drifting blobs, in CSS. */}
      <div className="absolute inset-0 overflow-hidden bg-[#06080F]" aria-hidden>
        <div className="absolute inset-0 animate-[ambient-a_8s_ease-in-out_infinite] motion-reduce:animate-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(240,96,93,0.09),transparent_55%)]" />
        <div className="absolute inset-0 animate-[ambient-b_8s_ease-in-out_infinite] motion-reduce:animate-none bg-[radial-gradient(ellipse_at_50%_60%,rgba(88,166,255,0.055),transparent_55%)]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #E6EDF3 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-2 max-w-[1100px] mx-auto px-5 md:px-6 py-10 md:py-[60px]">
        {/* No entrance animation on the LCP image or the headline below it: a
            framer `initial={{opacity:0}}` is inline `opacity:0` in the
            prerendered HTML, so both stayed invisible until ~260 KB of JS had
            hydrated and LCP was gated on that instead of on the preloaded
            image. The supporting lines still animate, in CSS, from first paint. */}
        <div>
          <Image
            src="/treasure-hunt-logo.png"
            alt="Treasure Hunt - Interactive Event Engagement Game"
            width={1600}
            height={682}
            className="block w-full max-w-[300px] sm:max-w-[440px] md:max-w-[720px] mx-auto mb-8 sm:mb-12 md:mb-16 h-auto"
            style={{ height: "auto" }}
            sizes="(max-width: 640px) 300px, (max-width: 768px) 440px, 720px"
            priority
          />
        </div>

        {/* Visible headline */}
        <h1
          className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-center sm:text-left text-balance"
        >
          {dict.headline}
          <br />
          <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
            {dict.headlineHighlight}
          </span>
        </h1>

        <p
          className="hero-rise [animation-delay:0.1s] text-[clamp(1rem,2vw,1.25rem)] font-normal text-[#E6EDF3] mb-4 max-w-[640px] text-center sm:text-left mx-auto sm:mx-0"
        >
          <strong className="font-semibold">{dict.tagline}</strong>{dict.taglineSuffix}
        </p>

        {/* Trust badge */}
        <p
          className={`hero-rise [animation-delay:0.2s] font-mono text-sm tracking-wide mb-10 text-center sm:text-left ${trustBadgeClassName || "text-[#7D8590]"}`}
        >
          {dict.trustBadge}
        </p>

        <div
          className="hero-rise [animation-delay:0.3s] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <button
            onClick={handlePrimary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C9433F] text-white font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3.5 sm:py-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97] text-center"
          >
            {dict.bookDemo}
          </button>
          {secondaryIsButton ? (
            <button
              onClick={onSecondaryAction}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent text-[#FF9A76] font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3 sm:py-3.5 border-2 border-[rgba(255,154,118,0.3)] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97] text-center whitespace-nowrap"
            >
              {dict.seeItLive}
            </button>
          ) : (
            <a
              href="https://hunt.ethdenver.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: "external_link_clicked", params: { url: "https://hunt.ethdenver.com/", link_text: dict.seeItLive, location: "hero" } })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent text-[#FF9A76] font-display text-base sm:text-lg tracking-wider sm:tracking-widest uppercase px-6 sm:px-10 py-3 sm:py-3.5 border-2 border-[rgba(255,154,118,0.3)] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[rgba(255,154,118,0.08)] hover:border-[#FF9A76] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97] text-center whitespace-nowrap"
            >
              {dict.seeItLive}
            </a>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #06080F)" }}
      />
    </section>
  )
}
