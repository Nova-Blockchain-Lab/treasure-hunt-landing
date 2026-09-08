import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Bebas_Neue, Tomorrow, Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ConsentProvider } from '@/lib/consent-context'
import { GA4Script } from '@/components/ga4-script'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import { PostHogProvider } from '@/components/posthog-provider'
import { JsonLd } from '@/components/json-ld'
import { locales, defaultLocale, localeTags, ogLocales, type Locale } from '@/i18n/config'
import '../globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const tomorrow = Tomorrow({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

// Per-locale home metadata. Copy is written per language, not machine-swapped
// at render time, so each locale gets a title/description aimed at how that
// market actually searches ("digitale Schnitzeljagd", "caccia al tesoro
// aziendale", "chasse au trésor entreprise").
const homeMeta: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Treasure Hunt | Event Engagement Game for Conferences',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
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
    ],
  },
  pt: {
    title: 'Treasure Hunt | Caça ao Tesouro Digital e Gamificação de Eventos',
    description:
      'Caça ao tesouro digital (peddy paper com NFC e QR) para conferências, empresas e team building. Mais engagement, tráfego dirigido aos patrocinadores e analytics em tempo real.',
    keywords: [
      'caça ao tesouro digital',
      'peddy paper digital',
      'peddy paper empresas',
      'gamificação de eventos',
      'caça ao tesouro para empresas',
      'team building Lisboa',
      'atividades de team building',
      'jogos para eventos corporativos',
      'gamificação de conferências',
      'peddy paper com NFC',
    ],
  },
  es: {
    title: 'Treasure Hunt | Caza del Tesoro Digital para Eventos',
    description:
      'Caza del tesoro digital con NFC y QR para congresos, empresas y team building. Más participación, tráfico dirigido a patrocinadores y analítica en tiempo real.',
    keywords: [
      'caza del tesoro digital',
      'gimcana digital',
      'gamificación de eventos',
      'juegos para eventos de empresa',
      'team building para empresas',
      'dinámicas de equipo',
      'caza del tesoro con NFC',
      'gamificación de congresos',
      'actividades para congresos',
      'analítica de eventos',
    ],
  },
  it: {
    title: 'Treasure Hunt | Caccia al Tesoro Digitale per Eventi',
    description:
      'Caccia al tesoro digitale con NFC e QR per congressi, aziende e team building. Più coinvolgimento, flusso guidato verso gli sponsor e analytics in tempo reale.',
    keywords: [
      'caccia al tesoro digitale',
      'caccia al tesoro aziendale',
      'gamification eventi',
      'giochi per eventi aziendali',
      'team building aziendale',
      'caccia al tesoro con NFC',
      'gamification congressi',
      'attività per congressi',
      'coinvolgimento partecipanti',
      'analytics eventi',
    ],
  },
  de: {
    title: 'Treasure Hunt | Digitale Schnitzeljagd für Events',
    description:
      'Digitale Schnitzeljagd mit NFC und QR für Konferenzen, Firmenevents und Teambuilding. Mehr Engagement, gelenkte Besucherströme und Analytics in Echtzeit.',
    keywords: [
      'digitale Schnitzeljagd',
      'Schnitzeljagd Firmenevent',
      'Event Gamification',
      'Firmenevent Spiele',
      'Teambuilding Ideen',
      'Schnitzeljagd mit NFC',
      'Konferenz Gamification',
      'Messe Besucherströme',
      'Event Analytics',
      'interaktives Event',
    ],
  },
  fr: {
    title: 'Treasure Hunt | Chasse au Trésor Digitale pour Événements',
    description:
      "Chasse au trésor digitale NFC et QR pour congrès, entreprises et team building. Plus d'engagement, du passage vers les sponsors, analytique en direct.",
    keywords: [
      'chasse au trésor digitale',
      'chasse au trésor entreprise',
      'gamification événementielle',
      "jeu d'événement entreprise",
      'team building entreprise',
      'chasse au trésor NFC',
      'gamification de congrès',
      'animation de congrès',
      'trafic stand salon',
      'analytique événementielle',
    ],
  },
}

const BASE = 'https://www.treasurehunt.pt'

// Home-page URL for a locale. `localePrefix` is 'as-needed', so EN is unprefixed.
export const homeUrl = (l: Locale) => (l === 'en' ? BASE : `${BASE}/${l}`)

// hreflang set for the home page: every locale plus x-default → EN. Reciprocal
// and self-referencing by construction, which is what keeps Google from
// dropping the cluster.
export const homeLanguages = {
  ...Object.fromEntries(locales.map((l) => [localeTags[l], homeUrl(l)])),
  'x-default': BASE,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale
  const { title, description, keywords } = homeMeta[locale]

  return {
    metadataBase: new URL(BASE),
    title,
    description,
    keywords,
    authors: [{ name: 'NOVA Blockchain Lab', url: BASE }],
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
      canonical: homeUrl(locale),
      languages: homeLanguages,
      // Emits <link rel="alternate" type="application/rss+xml">.
      types: { 'application/rss+xml': `${BASE}/feed.xml` },
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      url: homeUrl(locale),
      siteName: 'Treasure Hunt',
      title,
      description,
      images: ['https://www.treasurehunt.pt/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.treasurehunt.pt/opengraph-image'],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/treasure-hunt-only-logo.png',
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

  // This is the site's root layout, so it owns <html>/<body>. Keeping it here
  // (rather than in a parent app/layout.tsx) is what makes `lang` correct per
  // locale: the previous root layout had no access to the [lang] segment and
  // shipped <html> with no lang attribute at all, on every page.
  return (
    <html
      lang={localeTags[lang as Locale] ?? lang}
      className={`${bebasNeue.variable} ${tomorrow.variable} ${robotoMono.variable}`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        <PostHogProvider>
          <ConsentProvider>
            {children}
            <GA4Script />
            <CookieConsentBanner />
          </ConsentProvider>
          <Analytics />
        </PostHogProvider>
        <JsonLd />
      </body>
    </html>
  )
}
