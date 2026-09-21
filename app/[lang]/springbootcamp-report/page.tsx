import type { Metadata } from 'next'
import { ReportContent } from './report-content'

const TITLE = 'Spring Bootcamp Teams 2026 Report | Treasure Hunt'
const SUMMARY = '7 teams, 20 hunters, 45,650 SB minted, 220 treasures found.'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const base = 'https://www.treasurehunt.pt'
  // EN-only page: og:url must match the canonical, not the /pt variant.
  const url = `${base}/springbootcamp-report`
  // Off-locale variants serve this EN content under a wrong <html lang> and
  // already canonicalise here. Keep them followable but out of the index —
  // the same rule lib/landing/metadata.ts applies to the landing pages.
  const offLocale = lang !== 'en'
  return {
    ...(offLocale ? { robots: { index: false, follow: true } } : {}),
    title: TITLE,
    description:
      '7 teams, 20 hunters, 45,650 SB minted, 220 treasures found. Full analytics from the Spring Bootcamp Teams Treasure Hunt at NOVA IMS, April 7, 2026.',
    alternates: {
      // EN-only content: canonicalize the /pt variant to EN; no pt alternate.
      canonical: `${base}/springbootcamp-report`,
      languages: {
        en: `${base}/springbootcamp-report`,
        'x-default': `${base}/springbootcamp-report`,
      },
    },
    openGraph: { type: 'article', title: TITLE, description: SUMMARY, url, images: [`${base}/opengraph-image`] },
    twitter: { card: 'summary_large_image', title: TITLE, description: SUMMARY },
  }
}

export default function SpringBootcampReportPage() {
  return <ReportContent />
}
