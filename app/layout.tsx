import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Tomorrow, Roboto_Mono } from 'next/font/google'
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
  title: 'Treasure Hunt -- Turn Your Event Into an Adventure Attendees Talk About',
  description:
    'Interactive event engagement game that drives foot traffic, rewards participation, and gives organizers real-time analytics. Deployed at ETHDenver 2026.',
}

export const viewport: Viewport = {
  themeColor: '#030118',
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
      </body>
    </html>
  )
}
