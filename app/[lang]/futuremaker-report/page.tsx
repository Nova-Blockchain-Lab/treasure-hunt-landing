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
  const url = `https://www.treasurehunt.pt${isPortuguese ? '/pt' : ''}/futuremaker-report`

  return {
    title: isPortuguese
      ? 'Relatório Future Maker 2026 | Resultados e Analytics do Treasure Hunt'
      : 'Future Maker 2026 Report | Treasure Hunt Results & Analytics',
    description: isPortuguese
      ? '265 caçadores, 2.591 tesouros encontrados, 1.024.700 FM cunhados. Analytics completo do Treasure Hunt no Future Maker, NOVA IMS.'
      : '265 hunters, 2,591 treasures found, 1,024,700 FM minted. Full analytics from the Treasure Hunt at Future Maker, NOVA IMS.',
    alternates: {
      canonical: url,
      languages: {
        en: 'https://www.treasurehunt.pt/futuremaker-report',
        pt: 'https://www.treasurehunt.pt/pt/futuremaker-report',
        'x-default': 'https://www.treasurehunt.pt/futuremaker-report',
      },
    },
    openGraph: {
      type: 'article',
      title: isPortuguese
        ? 'Relatório Future Maker 2026 | Resultados do Treasure Hunt'
        : 'Future Maker 2026 Report | Treasure Hunt Results & Analytics',
      description: isPortuguese
        ? '265 caçadores, 2.591 tesouros encontrados, 1.024.700 FM cunhados no Future Maker, NOVA IMS.'
        : '265 hunters, 2,591 treasures found, 1,024,700 FM minted.',
      url,
      images: ['https://www.treasurehunt.pt/fm-logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isPortuguese
        ? 'Relatório Future Maker 2026 | Resultados do Treasure Hunt'
        : 'Future Maker 2026 Report | Treasure Hunt Results & Analytics',
      description: isPortuguese
        ? '265 caçadores, 2.591 tesouros encontrados, 1.024.700 FM cunhados no Future Maker.'
        : '265 hunters, 2,591 treasures found, 1,024,700 FM minted.',
      images: ['https://www.treasurehunt.pt/fm-logo.png'],
    },
  }
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
