import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries"
import type { Locale } from "@/i18n/config"
import { LandingPage } from "@/components/landing/landing-page"
import { LandingJsonLd } from "@/components/landing/landing-jsonld"
import { landingMetadata } from "@/lib/landing/metadata"
import { content } from "@/data/landing/caccia-al-tesoro-aziendale"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return landingMetadata(content, lang)
}

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
