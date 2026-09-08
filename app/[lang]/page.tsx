import { getDictionary } from '@/dictionaries'
import type { Locale } from '@/i18n/config'
import { PageClient } from '@/components/page-client'
import { HomeJsonLd } from '@/components/json-ld'

// Static (SSG): no cookies() read, so locale pages stay edge-cacheable. The
// A/B variant is applied client-side in PageClient.
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <PageClient dict={dict} lang={lang} />
      <HomeJsonLd lang={lang} />
    </>
  )
}
