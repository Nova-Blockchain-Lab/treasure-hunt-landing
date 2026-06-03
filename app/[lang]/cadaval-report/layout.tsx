import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./_report.css"

const TITLE = "Festival da Juventude 2026 · Treasure Hunt Report"
const DESCRIPTION =
  "Post-event report for the Festival da Juventude 2026 Treasure Hunt in Cadaval. Aggregated from on-chain events on Nova Cidade testnet."

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const base = "https://www.treasurehunt.pt"
  const url = `${base}${lang === "pt" ? "/pt" : ""}/cadaval-report`
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/cadaval-report`,
        pt: `${base}/pt/cadaval-report`,
        "x-default": `${base}/cadaval-report`,
      },
    },
    openGraph: {
      type: "article",
      title: TITLE,
      description: DESCRIPTION,
      url,
      images: ["/cadaval-festival-logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["/cadaval-festival-logo.png"],
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
