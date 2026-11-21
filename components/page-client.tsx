"use client"

import { useState, useCallback, useEffect } from "react"
import { capture } from "@/lib/posthog"
import { trackEvent } from "@/lib/analytics"
import { useAnalyticsTracking } from "@/hooks/use-analytics-tracking"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ResultsSection } from "@/components/results-section"
import { FeaturesSection } from "@/components/features-section"
import { PackagesSection } from "@/components/packages-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { PlanEventModal } from "@/components/plan-event-modal"
import { getSlots } from "@/lib/slots"

export function PageClient({ dict, lang }: { dict: any; lang: string }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactTrigger, setContactTrigger] = useState("unknown")
  const [selectedTier, setSelectedTier] = useState<string | undefined>()

  useAnalyticsTracking()

  // Warm the slot feed as soon as the page is up. /api/slots is CDN-cached, so
  // this costs a few KB and means the picker is already populated by the time
  // anyone clicks a CTA — no spinner between the click and the times.
  useEffect(() => {
    getSlots().catch(() => {})
  }, [])

  const closeContact = useCallback(() => setContactOpen(false), [])

  const openContactFrom = useCallback((location: string, buttonText: string, packageTier?: string) => {
    trackEvent({ name: "cta_clicked", params: { button_text: buttonText, location, package_tier: packageTier } })
    trackEvent({ name: "form_opened", params: { source: location } })
    capture("cta_click", { location, cta_text: buttonText, package_tier: packageTier })
    setContactTrigger(location)
    setSelectedTier(packageTier) // the callback arg, not the state
    setContactOpen(true)
  }, [])

  // Order: try it (hero) -> proof (results) -> what you control -> size it
  // (packages) -> objections (FAQ) -> book. Section backgrounds alternate
  // #06080F / #0A0E14, so no dividers are needed between them.
  return (
    <>
      <Navbar dict={dict.nav} onOpenContact={() => openContactFrom("navbar", dict.nav.bookDemo)} />
      {/* Navbar and SiteFooter are siblings of <main>, not children: a <header>
          or <footer> descended from <main> is not exposed as banner/contentinfo. */}
      <main id="main">
        <HeroSection dict={dict.hero} onOpenContact={() => openContactFrom("hero", dict.hero.bookDemo)} />
        <ResultsSection dict={dict.results} quote={dict.testimonials.items[1]} lang={lang} />
        <FeaturesSection dict={dict.features} media={dict.media} quote={dict.testimonials.items[0]} />
        <PackagesSection dict={dict.packages} lang={lang} onOpenContact={openContactFrom} />
        <FAQSection dict={dict.faq} />
        <CTASection dict={dict.cta} onOpenContact={() => openContactFrom("cta_section", dict.cta.bookDemo)} />
      </main>
      <SiteFooter dict={dict.footer} navDict={dict.nav} lang={lang} />
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
