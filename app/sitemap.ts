import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

const BASE = 'https://www.treasurehunt.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  // `bilingual` marks pages with a real PT translation. Home + the two
  // dictionary-driven reports are bilingual; the other reports and the blog are
  // EN-only, so they must NOT advertise a pt alternate (it would serve English
  // under a PT hreflang). Keep this in sync with each page's generateMetadata.
  const staticPages: {
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly'
    lastModified: string
    bilingual: boolean
  }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly', lastModified: '2026-06-03', bilingual: true },
    { path: '/ethdenver-report', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-03-06', bilingual: true },
    { path: '/futuremaker-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-03-19', bilingual: true },
    { path: '/smartcities-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-16', bilingual: false },
    { path: '/cadaval-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-25', bilingual: false },
    { path: '/springbootcamp-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-07', bilingual: false },
    { path: '/datasummit-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-25', bilingual: false },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly', lastModified: '2026-03-06', bilingual: false },
  ]

  // SEO landing pages (data/landing/*). Single-language: EN pages live at /<slug>
  // (canonical EN), PT pages at /pt/<slug> (canonical PT). Each self-references
  // its locale + x-default — no cross-language alternate, since there is only
  // one language version of each.
  const landingPages: { slug: string; locale: 'en' | 'pt' }[] = [
    { slug: 'nfc-treasure-hunt', locale: 'en' },
    { slug: 'event-gamification', locale: 'en' },
    { slug: 'qr-scavenger-hunt-events', locale: 'en' },
    { slug: 'goosechase-alternative', locale: 'en' },
    { slug: 'scavify-alternative', locale: 'en' },
    { slug: 'scavenger-hunt-universities', locale: 'en' },
    { slug: 'trade-show-booth-traffic', locale: 'en' },
    { slug: 'team-building-scavenger-hunt', locale: 'en' },
    { slug: 'caca-ao-tesouro-digital-empresas', locale: 'pt' },
    { slug: 'peddy-paper-digital', locale: 'pt' },
    { slug: 'team-building-eventos', locale: 'pt' },
  ]

  const langs = (path: string, bilingual: boolean) =>
    bilingual
      ? { en: `${BASE}${path}`, pt: `${BASE}/pt${path}`, 'x-default': `${BASE}${path}` }
      : { en: `${BASE}${path}`, 'x-default': `${BASE}${path}` }

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: { languages: langs(page.path, page.bilingual) },
  }))

  const landingEntries = landingPages.map((p) => {
    const url = p.locale === 'en' ? `${BASE}/${p.slug}` : `${BASE}/${p.locale}/${p.slug}`
    return {
      url,
      lastModified: '2026-06-27',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { [p.locale]: url, 'x-default': url } },
    }
  })

  // Blog posts are EN-only.
  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: langs(`/blog/${post.slug}`, false) },
  }))

  return [...staticEntries, ...landingEntries, ...blogEntries]
}
