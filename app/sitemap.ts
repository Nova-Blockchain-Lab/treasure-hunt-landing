import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'
import { locales, localeTags, type Locale } from '@/i18n/config'

const BASE = 'https://www.treasurehunt.pt'

// `localePrefix` is 'as-needed': EN is unprefixed, every other locale is /<loc>.
const at = (locale: Locale, path = '') => (locale === 'en' ? `${BASE}${path}` : `${BASE}/${locale}${path}`)

export default function sitemap(): MetadataRoute.Sitemap {
  // ---- The home page is the only fully localised page -----------------------
  // dictionaries/<locale>.json is a complete translation of the home copy for
  // all six locales, so every locale home is a real page and belongs in one
  // reciprocal hreflang cluster. Everything below is EN-only or EN+PT.
  const homeLanguages = {
    ...Object.fromEntries(locales.map((l) => [localeTags[l], at(l)])),
    'x-default': BASE,
  }
  const homeEntries = locales.map((locale) => ({
    url: at(locale),
    lastModified: '2026-09-07',
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: { languages: homeLanguages },
  }))

  // ---- Reports and the blog -------------------------------------------------
  // `bilingual` marks a page with a real PT translation (the two dictionary-
  // driven reports). The other reports and the blog are EN-only, so they must
  // NOT advertise a pt (or es/it/de/fr) alternate — that would serve English
  // under a non-English hreflang. Their /<locale>/ variants canonical to the EN
  // URL, which is why they are absent from this sitemap entirely.
  // Keep this in sync with each page's generateMetadata.
  const staticPages: {
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly'
    lastModified: string
    bilingual: boolean
  }[] = [
    { path: '/ethdenver-report', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-03-06', bilingual: true },
    { path: '/futuremaker-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-03-19', bilingual: true },
    { path: '/smartcities-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-16', bilingual: false },
    { path: '/cadaval-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-25', bilingual: false },
    { path: '/springbootcamp-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-07', bilingual: false },
    { path: '/datasummit-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-25', bilingual: false },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly', lastModified: '2026-09-07', bilingual: false },
  ]

  const staticEntries = staticPages.flatMap((page) => {
    const languages = page.bilingual
      ? { en: `${BASE}${page.path}`, 'pt-PT': at('pt', page.path), 'x-default': `${BASE}${page.path}` }
      : { en: `${BASE}${page.path}`, 'x-default': `${BASE}${page.path}` }
    const urls = page.bilingual ? [`${BASE}${page.path}`, at('pt', page.path)] : [`${BASE}${page.path}`]
    return urls.map((url) => ({
      url,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }))
  })

  // ---- SEO landing pages (data/landing/*) -----------------------------------
  // Single-language by design: EN pages live at /<slug>, PT pages at /pt/<slug>.
  // Each self-references its own locale + x-default — no cross-language
  // alternate, because only one language version of each page exists.
  const landingPages: { slug: string; locale: Locale }[] = [
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
    { slug: 'caza-del-tesoro-digital-empresas', locale: 'es' },
    { slug: 'caccia-al-tesoro-aziendale', locale: 'it' },
    { slug: 'digitale-schnitzeljagd-firmenevent', locale: 'de' },
    { slug: 'chasse-au-tresor-entreprise', locale: 'fr' },
  ]

  const landingEntries = landingPages.map((p) => {
    const url = at(p.locale, `/${p.slug}`)
    return {
      url,
      lastModified: '2026-06-27',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { [localeTags[p.locale]]: url, 'x-default': url } },
    }
  })

  // Blog posts are EN-only.
  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: { en: `${BASE}/blog/${post.slug}`, 'x-default': `${BASE}/blog/${post.slug}` },
    },
  }))

  return [...homeEntries, ...staticEntries, ...landingEntries, ...blogEntries]
}
