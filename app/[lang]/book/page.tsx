import type { Metadata } from "next"
import { getDictionary } from "@/dictionaries"
import type { Locale } from "@/i18n/config"
import { BookingWidget } from "@/components/booking-widget"
import { SiteFooter } from "@/components/site-footer"

// EN-only page (the booking flow itself is English), so every locale variant
// canonicalises here — same rule as the blog and the EN landing pages.
export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Pick a 30-minute slot with the NOVA Blockchain Lab team to talk through your event. Live availability, confirmed instantly.",
  alternates: {
    canonical: "https://www.treasurehunt.pt/book",
    languages: { en: "https://www.treasurehunt.pt/book", "x-default": "https://www.treasurehunt.pt/book" },
  },
  openGraph: {
    title: "Book a call — Treasure Hunt",
    description: "Pick a 30-minute slot with the team behind Treasure Hunt.",
    images: ["https://www.treasurehunt.pt/opengraph-image"],
  },
  robots: { index: false, follow: true },
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <main className="min-h-screen bg-[#06080F]">
      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 py-16 sm:py-24">
        <BookingWidget />
      </div>
      <SiteFooter dict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
