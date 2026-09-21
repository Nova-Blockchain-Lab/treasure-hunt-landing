import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./_report.css"

const TITLE = "Data with Purpose Summit 2026 · Treasure Hunt Report"
const DESCRIPTION =
  "Post-event report for the Data with Purpose Summit 2026 Treasure Hunt at Taguspark, Oeiras. Aggregated from on-chain events on Nova Cidade testnet."

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const base = "https://www.treasurehunt.pt"
  // EN-only page: og:url must match the canonical, not the /pt variant.
  const url = `${base}/datasummit-report`
  // Off-locale variants serve this EN content under a wrong <html lang> and
  // already canonicalise here. Keep them followable but out of the index —
  // the same rule lib/landing/metadata.ts applies to the landing pages.
  const offLocale = lang !== "en"

  return {
    ...(offLocale ? { robots: { index: false, follow: true } } : {}),
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      // EN-only content: canonicalize the /pt variant to EN and don't advertise
      // a pt alternate (it would serve English under a PT hreflang).
      canonical: `${base}/datasummit-report`,
      languages: {
        en: `${base}/datasummit-report`,
        "x-default": `${base}/datasummit-report`,
      },
    },
    openGraph: {
      type: "article",
      title: TITLE,
      description: DESCRIPTION,
      url,
      images: ["https://www.treasurehunt.pt/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["https://www.treasurehunt.pt/opengraph-image"],
    },
  }
}

// Hide the global site footer + bottom-nav on the report route: the report
// has its own header / footer and we don't want the in-app chrome leaking
// into a public share. The host-level chrome is rendered as siblings of
// {children} in the root layout, so route CSS reaches it via the body.
const HIDE_GLOBAL_CHROME_CSS = `
  body:has(.report-root) > div > div:first-child { padding-bottom: 0 !important; }
  body:has(.report-root) > div > .hidden.md\\:block { display: none !important; }
  body:has(.report-root) nav[aria-label="Bottom navigation"],
  body:has(.report-root) nav[role="navigation"][class*="bottom"],
  body:has(.report-root) [data-bottom-nav],
  body:has(.report-root) .bottom-nav-glass { display: none !important; }
`

export default function ReportLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{HIDE_GLOBAL_CHROME_CSS}</style>
      <div className="report-root">{children}</div>
    </>
  )
}
