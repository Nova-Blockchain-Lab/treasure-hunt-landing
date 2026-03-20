import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { locales, type Locale } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    metadataBase: new URL('https://www.treasurehunt.pt'),
    title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt deployed at ETHDenver and Future Maker. Drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    keywords: [
      'event engagement game',
      'interactive event platform',
      'gamified event experience',
      'conference engagement tool',
      'NFC event game',
      'QR code scavenger hunt',
      'event gamification',
      'sponsor foot traffic',
      'live leaderboard events',
      'event analytics platform',
      'university event gamification',
      'career fair engagement',
      'Future Maker NOVA IMS',
    ],
    authors: [{ name: 'NOVA Blockchain Lab', url: 'https://www.treasurehunt.pt' }],
    creator: 'NOVA Blockchain Lab',
    publisher: 'NOVA Blockchain Lab',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `https://www.treasurehunt.pt${lang === 'pt' ? '/pt' : ''}`,
      languages: {
        en: 'https://www.treasurehunt.pt',
        pt: 'https://www.treasurehunt.pt/pt',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_PT' : 'en_US',
      url: lang === 'pt' ? '/pt' : '/',
      siteName: 'Treasure Hunt',
      title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
      description:
        'Turn your event into an adventure. Gamified QR & NFC scavenger hunt deployed at ETHDenver and Future Maker. Drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
      description:
        'Turn your event into an adventure. Gamified QR & NFC scavenger hunt deployed at ETHDenver and Future Maker. Drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    },
    icons: {
      icon: '/treasure-hunt-logo.png',
      apple: '/treasure-hunt-logo.png',
    },
    other: {
      'link:alternate': '/feed.xml',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#06080F',
  width: 'device-width',
  initialScale: 1,
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  return (
    <>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Treasure Hunt Blog" href="/feed.xml" />
      </head>
      {children}
      <JsonLd />
    </>
  )
}
