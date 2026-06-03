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
  const url = `${base}${lang === 'pt' ? '/pt' : ''}/springbootcamp-report`
  return {
    title: TITLE,
    description:
      '7 teams, 20 hunters, 45,650 SB minted, 220 treasures found. Full analytics from the Spring Bootcamp Teams Treasure Hunt at NOVA IMS, April 7, 2026.',
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/springbootcamp-report`,
        pt: `${base}/pt/springbootcamp-report`,
        'x-default': `${base}/springbootcamp-report`,
      },
    },
    openGraph: { type: 'article', title: TITLE, description: SUMMARY, url },
    twitter: { card: 'summary_large_image', title: TITLE, description: SUMMARY },
  }
}

export default function SpringBootcampReportPage() {
  return <ReportContent />
}
