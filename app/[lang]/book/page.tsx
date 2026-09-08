import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getDictionary } from "@/dictionaries"
import { localeTags, type Locale } from "@/i18n/config"
import { BookingWidget } from "@/components/booking-widget"
import { SiteFooter } from "@/components/site-footer"

// EN-only page (the booking flow itself is English), so every locale variant
// canonicalises here — same rule as the blog and the EN landing pages.
// Locale-aware title/description: the page is noindex (a conversion page, not
// an SEO one), so canonical stays on the EN url and only the visible strings
// follow the locale.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.booking.heading,
    description: dict.booking.intro,
    alternates: {
      canonical: "https://www.treasurehunt.pt/book",
      languages: { en: "https://www.treasurehunt.pt/book", "x-default": "https://www.treasurehunt.pt/book" },
    },
    openGraph: {
      title: dict.booking.heading,
      description: dict.booking.intro,
      images: ["https://www.treasurehunt.pt/opengraph-image"],
    },
    robots: { index: false, follow: true },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  // Locale home. The booking flow itself is English-only, but the way back
  // must land the visitor on the home they came from.
  const home = lang === "en" ? "/" : `/${lang}`

  return (
    <main className="min-h-[100dvh] bg-[#06080F]">
      {/* Deliberately not the site Navbar: its links are home-page anchors and
          it carries a second CTA, which competes with the booking flow. A
          booking page gets one way out and nothing else. */}
      <header className="border-b border-[rgba(240,246,252,0.06)]">
        <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Same wordmark and optical size as the navbar. The full lockup
              (treasure-hunt-logo.png) is a stacked icon + wordmark + tagline
              and turns to mush below ~120px tall, so compact placements use
              the wordmark asset instead. */}
          <Link href={home} aria-label="Treasure Hunt home" className="shrink-0">
            <Image
              src="/treasure-hunt-name.png"
              alt="Treasure Hunt"
              width={6250}
              height={2665}
              priority
              className="h-9 sm:h-16 w-auto"
              sizes="240px"
            />
          </Link>
          <Link
            href={home}
            className="inline-flex items-center gap-2 h-11 px-1 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {dict.nav.backToSite}
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 py-16 sm:py-24">
        <BookingWidget dict={dict.booking} locale={localeTags[lang as Locale] ?? "en"} />
      </div>
      <SiteFooter dict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
