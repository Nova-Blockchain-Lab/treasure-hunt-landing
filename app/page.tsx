import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { DemoSection } from "@/components/demo-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { PackagesSection } from "@/components/packages-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <DemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PackagesSection />
      <CTASection />
      <SiteFooter />
    </main>
  )
}
