import { getDictionary } from "@/dictionaries"
import type { Locale } from "@/i18n/config"
import { LandingPage } from "@/components/landing/landing-page"
import { LandingJsonLd } from "@/components/landing/landing-jsonld"
import { landingMetadata } from "@/lib/landing/metadata"
import { content } from "@/data/landing/scavify-alternative"

export const metadata = landingMetadata(content)

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  return (
    <>
      <LandingPage content={content} dict={dict} lang={lang} />
      <LandingJsonLd content={content} />
    </>
  )
}
