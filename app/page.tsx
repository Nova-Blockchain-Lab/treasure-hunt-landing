import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getDictionary } from '@/dictionaries'
import { JsonLd } from '@/components/json-ld'
import { PageClient } from '@/components/page-client'
import { AB_TEST_COOKIE, applyVariantOverrides, type Variant } from '@/lib/ab-test'

export const metadata: Metadata = {
  title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
  description:
    'Turn your event into an adventure. Gamified QR & NFC scavenger hunt deployed at ETHDenver and Future Maker. Drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
  alternates: {
    canonical: 'https://www.treasurehunt.pt',
    languages: {
      en: 'https://www.treasurehunt.pt',
      pt: 'https://www.treasurehunt.pt/pt',
      'x-default': 'https://www.treasurehunt.pt',
    },
  },
}

export default async function Page() {
  const cookieStore = await cookies()
  const variant = (cookieStore.get(AB_TEST_COOKIE)?.value || 'control') as Variant

  const baseDict = await getDictionary('en')
  const dict = applyVariantOverrides(baseDict, variant, 'en')

  return (
    <>
      <PageClient dict={dict} lang="en" variant={variant} />
      <JsonLd />
    </>
  )
}
