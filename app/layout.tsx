import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Tomorrow, Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.treasurehunt.pt'),
  title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
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
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Treasure Hunt',
    title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Treasure Hunt — Interactive Event Engagement Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/treasure-hunt-logo.png',
    apple: '/treasure-hunt-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#06080F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${tomorrow.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
        <JsonLd />
      </body>
    </html>
  )
}
