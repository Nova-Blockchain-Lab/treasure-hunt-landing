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
  weight: ['400', '500', '600', '700'],
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

import { homeMeta } from '@/i18n/home-meta'

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
  const known = locales.includes(lang as Locale)
  const locale = (known ? lang : defaultLocale) as Locale
  const { title, description, keywords } = homeMeta[locale]

  // An unknown segment is a 404 (proxy.ts lets any dotted path through to this
  // route, so /foo.txt lands here). generateMetadata still runs before the
  // layout's notFound() lands, and without this guard every garbage URL
  // advertised itself as the home page's canonical and shipped the whole
  // six-locale hreflang cluster.
  if (!known) {
    return { metadataBase: new URL(BASE), title, description, robots: { index: false, follow: false } }
  }

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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-lg focus:bg-[#0D1117] focus:px-4 focus:py-3 focus:text-[#E6EDF3] focus:outline focus:outline-2 focus:outline-[#FF9A76]"
        >
          Skip to content
        </a>
        {/* ConsentProvider is OUTSIDE PostHogProvider: PostHog now reads consent
            before it loads posthog-js at all. */}
        <ConsentProvider>
          <PostHogProvider>
            {children}
            <GA4Script />
            <CookieConsentBanner />
          </PostHogProvider>
          <Analytics />
        </ConsentProvider>
        <JsonLd />
      </body>
    </html>
  )
}
