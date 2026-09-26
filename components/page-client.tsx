"use client"

import { useState, useCallback, useEffect } from "react"
import { capture } from "@/lib/posthog"
import { trackEvent } from "@/lib/analytics"
import { useAnalyticsTracking } from "@/hooks/use-analytics-tracking"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ComicQuestVideo } from "@/components/comic-quest-video"
import { SocialProofStrip } from "@/components/social-proof-strip"
import { FeaturesSection } from "@/components/features-section"
import { DemoSection } from "@/components/demo-section"
import { MediaSection } from "@/components/media-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PackagesSection } from "@/components/packages-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { StickyCTABar } from "@/components/sticky-cta-bar"
import { PlanEventModal } from "@/components/plan-event-modal"
import { getSlots } from "@/lib/slots"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PageClient({ dict: baseDict, lang }: { dict: any; lang: string }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactTrigger, setContactTrigger] = useState("unknown")
  const [selectedTier, setSelectedTier] = useState<string | undefined>()

  const dict = baseDict

  useAnalyticsTracking()

  // Warm the slot feed as soon as the page is up. /api/slots is CDN-cached, so
  // this costs a few KB and means the picker is already populated by the time
  // anyone clicks a CTA — no spinner between the click and the times.
  useEffect(() => {
    getSlots().catch(() => {})
  }, [])

  const closeContact = useCallback(() => setContactOpen(false), [])

  const openContactFrom = useCallback((location: string, buttonText: string, packageTier?: string) => {
    // GA4 tracking (existing)
    trackEvent({ name: "cta_clicked", params: { button_text: buttonText, location, package_tier: packageTier } })
    trackEvent({ name: "form_opened", params: { source: location } })
    // PostHog tracking
    capture("cta_click", { location, cta_text: buttonText, package_tier: packageTier })
    setContactTrigger(location)
    setSelectedTier(packageTier) // the callback arg, not the state
    setContactOpen(true)
  }, [])

  return (
    <>
      <Navbar dict={dict.nav} onOpenContact={() => openContactFrom("navbar", dict.nav.bookDemo)} />
      {/* Navbar and SiteFooter are siblings of <main>, not children: a <header>
          or <footer> descended from <main> is not exposed as banner/contentinfo. */}
      <main id="main">
      <HeroSection
        dict={dict.hero}
        onOpenContact={() => openContactFrom("hero", dict.hero.bookDemo)}
      />
      <ComicQuestVideo caption={dict.media.storyCaption} playLabel={dict.media.storyPlay} />

      {/* Section order: lead with proof (logos → live demo + per-event results) before the feature pitch.
          Dividers track the bg bands: Demo (#0A0E14) → Features (#06080F); Features and Media share #06080F (no divider). */}
      <SocialProofStrip dict={dict.socialProof} />
      <SectionDividerReverse />
      <DemoSection
        dict={dict.demo}
        lang={lang}
        onOpenContact={() => openContactFrom("demo_section", dict.nav.bookDemo)}
        ctaLabel={dict.nav.bookDemo}
      />
      <SectionDivider />
      <FeaturesSection dict={dict.features} />
      <MediaSection dict={dict.media} />
      <SectionDividerReverse />
      <HowItWorksSection dict={dict.howItWorks} />
      <SectionDividerReverse />
      <TestimonialsSection dict={dict.testimonials} />
      <SectionDivider />
      <PackagesSection dict={dict.packages} onOpenContact={openContactFrom} />
      <SectionDividerReverse />
      <FAQSection dict={dict.faq} />
      <SectionDivider />
      <CTASection
        dict={dict.cta}
        onOpenContact={() => openContactFrom("cta_section", dict.cta.bookDemo)}
      />
      </main>
      <SiteFooter dict={dict.footer} navDict={dict.nav} lang={lang} />
      <StickyCTABar dict={dict.stickyCta} onOpenContact={() => openContactFrom("sticky_bar", dict.stickyCta.bookDemo)} />
      <PlanEventModal
        dict={dict.contactForm}
        bookingDict={dict.booking}
        lang={lang}
        packageTier={selectedTier}
        open={contactOpen}
        onClose={closeContact}
        triggerLocation={contactTrigger}
      />
    </>
  )
}
