import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { DemoSection } from "@/components/demo-section"
import { SocialProofStrip } from "@/components/social-proof-strip"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { PackagesSection } from "@/components/packages-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { StickyCTABar } from "@/components/sticky-cta-bar"

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

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <SectionDividerReverse />
      <DemoSection />
      <SocialProofStrip />
      <SectionDivider />
      <FeaturesSection />
      <SectionDividerReverse />
      <HowItWorksSection />
      <SectionDivider />
      <UseCasesSection />
      <SectionDivider />
      <TestimonialsSection />
      <FAQSection />
      <PackagesSection />
      <CTASection />
      <SiteFooter />
      <StickyCTABar />
    </main>
  )
}
