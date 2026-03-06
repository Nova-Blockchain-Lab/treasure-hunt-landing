import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import type { Locale } from '@/i18n/config'
import { ReportContent } from './report-content'

export const metadata: Metadata = {
  title: 'ETHDenver 2026 Report | Treasure Hunt Results & Analytics',
  description:
    '207 players, 992 treasures found, 462,255 BUFFI minted. Full analytics from Treasure Hunt at ETHDenver 2026.',
  alternates: {
    canonical: 'https://www.treasurehunt.pt/ethdenver-report',
    languages: {
      en: 'https://www.treasurehunt.pt/ethdenver-report',
      pt: 'https://www.treasurehunt.pt/pt/ethdenver-report',
    },
  },
}

export default async function ETHDenverReportPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return <ReportContent dict={dict.report} />
}
