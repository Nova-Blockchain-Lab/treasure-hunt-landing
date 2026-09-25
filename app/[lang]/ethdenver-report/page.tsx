import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import type { Locale } from '@/i18n/config'
import { ReportContent } from './report-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isPortuguese = lang === 'pt'
  const url = `https://www.treasurehunt.pt${isPortuguese ? '/pt' : ''}/ethdenver-report`
  // Off-locale variants serve this EN content under a wrong <html lang> and
  // already canonicalise here. Keep them followable but out of the index —
  // the same rule lib/landing/metadata.ts applies to the landing pages.
  const offLocale = lang !== 'en' && lang !== 'pt'

  return {
    ...(offLocale ? { robots: { index: false, follow: true } } : {}),
    title: isPortuguese
      ? 'Relatório ETHDenver 2026 | Resultados do Treasure Hunt'
      : 'ETHDenver 2026 Report | Treasure Hunt Results',
    description: isPortuguese
      ? '207 jogadores, 992 tesouros encontrados, 462.255 BUFFI mintados. Analytics completo do Treasure Hunt no ETHDenver 2026.'
      : '207 players, 992 treasures found, 462,255 BUFFI minted. Full analytics from Treasure Hunt at ETHDenver 2026.',
    alternates: {
      canonical: url,
      languages: {
        en: 'https://www.treasurehunt.pt/ethdenver-report',
        'pt-PT': 'https://www.treasurehunt.pt/pt/ethdenver-report',
        'x-default': 'https://www.treasurehunt.pt/ethdenver-report',
      },
    },
    openGraph: {
      type: 'article',
      title: isPortuguese
        ? 'Relatório ETHDenver 2026 | Resultados do Treasure Hunt'
        : 'ETHDenver 2026 Report | Treasure Hunt Results',
      description: isPortuguese
        ? '207 jogadores, 992 tesouros encontrados, 462.255 BUFFI mintados em 4 dias no ETHDenver 2026.'
        : '207 players, 992 treasures found, 462,255 BUFFI minted across 4 days at ETHDenver 2026.',
      url,
      images: ['https://www.treasurehunt.pt/ethdenver-home.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isPortuguese
        ? 'Relatório ETHDenver 2026 | Resultados do Treasure Hunt'
        : 'ETHDenver 2026 Report | Treasure Hunt Results',
      description: isPortuguese
        ? '207 jogadores, 992 tesouros encontrados, 462.255 BUFFI mintados no ETHDenver 2026.'
        : '207 players, 992 treasures found, 462,255 BUFFI minted at ETHDenver 2026.',
      images: ['https://www.treasurehunt.pt/ethdenver-home.png'],
    },
  }
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
