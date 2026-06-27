import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import { JsonLd } from '@/components/json-ld'
import { PageClient } from '@/components/page-client'

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

// Static (SSG): no cookies() read here, so this stays edge-cacheable. The
// control dictionary is rendered server-side; PageClient applies any A/B
// variant client-side after hydration.
export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <>
      <PageClient dict={dict} lang="en" />
      <JsonLd />
    </>
  )
}
