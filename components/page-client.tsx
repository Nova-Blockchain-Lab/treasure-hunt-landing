"use client"

import { useState, useCallback, useEffect } from "react"
import { usePostHog } from "posthog-js/react"
import { trackEvent } from "@/lib/analytics"
import { useAnalyticsTracking } from "@/hooks/use-analytics-tracking"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { SocialProofStrip } from "@/components/social-proof-strip"
import { FeaturesSection } from "@/components/features-section"
import { DemoSection } from "@/components/demo-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { PackagesSection } from "@/components/packages-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { StickyCTABar } from "@/components/sticky-cta-bar"
import { ContactModal } from "@/components/contact-modal"
import type { Variant } from "@/lib/ab-test"
import { AB_TEST_NAME } from "@/lib/ab-test"

function SectionDivider() {
  return (
    <div
      className="h-16"
      style={{
        background: "linear-gradient(to bottom, rgba(10,14,20,1), rgba(6,8,15,1))",
      }}
    />
  )
}

function SectionDividerReverse() {
  return (
    <div
      className="h-16"
      style={{
        background: "linear-gradient(to bottom, rgba(6,8,15,1), rgba(10,14,20,1))",
      }}
    />
  )
}

function scrollToDemo() {
  const el = document.querySelector("#demo")
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PageClient({ dict, lang, variant = "control" }: { dict: any; lang: string; variant?: Variant }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactTrigger, setContactTrigger] = useState("unknown")
  const posthog = usePostHog()

  const isVariant = variant === "variant"

  useAnalyticsTracking()

  // Register experiment on mount
  useEffect(() => {
    if (posthog) {
      posthog.capture("$experiment_started", {
        experiment: AB_TEST_NAME,
        variant,
      })
    }
  }, [posthog, variant])

  const closeContact = useCallback(() => setContactOpen(false), [])

  const openContactFrom = useCallback((location: string, buttonText: string, packageTier?: string) => {
    // GA4 tracking (existing)
    trackEvent({ name: "cta_clicked", params: { button_text: buttonText, location, package_tier: packageTier } })
    trackEvent({ name: "form_opened", params: { source: location } })
    // PostHog tracking
    posthog?.capture("cta_click", { location, cta_text: buttonText, variant, package_tier: packageTier })
    setContactTrigger(location)
    setContactOpen(true)
  }, [posthog, variant])

  // Hero primary action: variant scrolls to demo, control opens modal
  const heroPrimaryAction = useCallback(() => {
    if (isVariant) {
      trackEvent({ name: "cta_clicked", params: { button_text: dict.hero.bookDemo, location: "hero" } })
      posthog?.capture("cta_click", { location: "hero", cta_text: dict.hero.bookDemo, variant, action: "scroll_to_demo" })
      scrollToDemo()
    } else {
      openContactFrom("hero", dict.hero.bookDemo)
    }
  }, [isVariant, dict.hero.bookDemo, posthog, variant, openContactFrom])

  // Hero secondary action: variant opens modal
  const heroSecondaryAction = useCallback(() => {
    openContactFrom("hero_secondary", dict.hero.seeItLive)
  }, [openContactFrom, dict.hero.seeItLive])

  // CTA section secondary: variant scrolls to demo
  const ctaSecondaryAction = useCallback(() => {
    trackEvent({ name: "cta_clicked", params: { button_text: dict.cta.seeItLive, location: "cta_section_secondary" } })
    posthog?.capture("cta_click", { location: "cta_section_secondary", cta_text: dict.cta.seeItLive, variant, action: "scroll_to_demo" })
    scrollToDemo()
  }, [dict.cta.seeItLive, posthog, variant])

  return (
    <main>
      <Navbar dict={dict.nav} onOpenContact={() => openContactFrom("navbar", dict.nav.bookDemo)} />
      <HeroSection
        dict={dict.hero}
        onOpenContact={() => openContactFrom("hero", dict.hero.bookDemo)}
        onPrimaryAction={heroPrimaryAction}
        onSecondaryAction={isVariant ? heroSecondaryAction : undefined}
        secondaryIsButton={isVariant}
        trustBadgeClassName={isVariant ? "text-[#8B949E]" : undefined}
      />
      <MarqueeStrip items={dict.marquee} />

      {/* Optimized section order for conversion */}
      <SocialProofStrip dict={dict.socialProof} />
      <SectionDivider />
      <FeaturesSection dict={dict.features} />
      <SectionDividerReverse />
      <DemoSection dict={dict.demo} lang={lang} />
      <SectionDivider />
      <HowItWorksSection dict={dict.howItWorks} />
      <SectionDividerReverse />
      <TestimonialsSection dict={dict.testimonials} />
      <SectionDivider />
      <UseCasesSection dict={dict.useCases} />
      <SectionDivider />
      <PackagesSection dict={dict.packages} onOpenContact={openContactFrom} />
      <SectionDividerReverse />
      <FAQSection dict={dict.faq} />
      <SectionDivider />
      <CTASection
        dict={dict.cta}
        onOpenContact={() => openContactFrom("cta_section", dict.cta.bookDemo)}
        onSecondaryAction={isVariant ? ctaSecondaryAction : undefined}
        secondaryIsButton={isVariant}
      />
      <SiteFooter dict={dict.footer} navDict={dict.nav} />
      <StickyCTABar dict={dict.stickyCta} onOpenContact={() => openContactFrom("sticky_bar", dict.stickyCta.bookDemo)} />
      <ContactModal
        dict={dict.contactForm}
        open={contactOpen}
        onClose={closeContact}
        variant={variant}
        triggerLocation={contactTrigger}
      />
    </main>
  )
}
