import { getDictionary } from '@/dictionaries'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { MarqueeStrip } from '@/components/marquee-strip'
import { DemoSection } from '@/components/demo-section'
import { SocialProofStrip } from '@/components/social-proof-strip'
import { FeaturesSection } from '@/components/features-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { UseCasesSection } from '@/components/use-cases-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { PackagesSection } from '@/components/packages-section'
import { CTASection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'
import { StickyCTABar } from '@/components/sticky-cta-bar'

function SectionDivider() {
  return (
    <div
      className="h-16"
      style={{
        background: 'linear-gradient(to bottom, rgba(10,14,20,1), rgba(6,8,15,1))',
      }}
    />
  )
}

function SectionDividerReverse() {
  return (
    <div
      className="h-16"
      style={{
        background: 'linear-gradient(to bottom, rgba(6,8,15,1), rgba(10,14,20,1))',
      }}
    />
  )
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main>
      <Navbar dict={dict.nav} />
      <HeroSection dict={dict.hero} />
      <MarqueeStrip items={dict.marquee} />
      <SectionDividerReverse />
      <DemoSection dict={dict.demo} lang="en" />
      <SocialProofStrip dict={dict.socialProof} />
      <SectionDivider />
      <FeaturesSection dict={dict.features} />
      <SectionDividerReverse />
      <HowItWorksSection dict={dict.howItWorks} />
      <SectionDivider />
      <UseCasesSection dict={dict.useCases} />
      <SectionDivider />
      <TestimonialsSection dict={dict.testimonials} />
      <PackagesSection dict={dict.packages} />
      <CTASection dict={dict.cta} />
      <SiteFooter dict={dict.footer} navDict={dict.nav} />
      <StickyCTABar dict={dict.stickyCta} />
    </main>
  )
}
