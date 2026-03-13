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

  const isPortuguese = lang === 'pt'

  const title = isPortuguese
    ? 'Treasure Hunt | Jogo de Engagement para Eventos'
    : 'Treasure Hunt | Event Engagement Game for Conferences'
  const description = isPortuguese
    ? 'Transforme o seu evento numa aventura. Scavenger hunt gamificado com QR e NFC que direciona trafego para sponsors, aumenta o engagement e oferece analytics em tempo real.'
    : 'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.'
  const keywords = isPortuguese
    ? [
        'jogo de engagement para eventos',
        'plataforma interativa de eventos',
        'gamificacao de eventos',
        'ferramenta de engagement para conferencias',
        'jogo NFC para eventos',
        'scavenger hunt com QR code',
        'gamificacao de conferencias',
        'trafego para sponsors',
        'leaderboard ao vivo',
        'plataforma de analytics para eventos',
      ]
    : [
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
      ]

  return {
    metadataBase: new URL('https://www.treasurehunt.pt'),
    title,
    description,
    keywords,
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
      canonical: `https://www.treasurehunt.pt${isPortuguese ? '/pt' : ''}`,
      languages: {
        en: 'https://www.treasurehunt.pt',
        pt: 'https://www.treasurehunt.pt/pt',
        'x-default': 'https://www.treasurehunt.pt',
      },
    },
    openGraph: {
      type: 'website',
      locale: isPortuguese ? 'pt_PT' : 'en_US',
      url: isPortuguese ? '/pt' : '/',
      siteName: 'Treasure Hunt',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
