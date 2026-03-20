import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import type { Locale } from '@/i18n/config'
import { ReportContent } from './report-content'

export const metadata: Metadata = {
  title: 'Future Maker 2026 Report | Treasure Hunt Results & Analytics',
  description:
    '265 hunters, 2,591 treasures found, 1,024,700 FM minted. Full analytics from the Treasure Hunt at Future Maker, NOVA IMS.',
  alternates: {
    canonical: 'https://www.treasurehunt.pt/futuremaker-report',
    languages: {
      en: 'https://www.treasurehunt.pt/futuremaker-report',
      pt: 'https://www.treasurehunt.pt/pt/futuremaker-report',
    },
  },
  openGraph: {
    type: 'article',
    title: 'Future Maker 2026 Report | Treasure Hunt Results & Analytics',
    description: '265 hunters, 2,591 treasures found, 1,024,700 FM minted.',
  },
}

export default async function FutureMakerReportPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return <ReportContent dict={dict.fmReport} />
}
