import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

const BASE = 'https://www.treasurehunt.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: {
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly'
    lastModified: string
  }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly', lastModified: '2026-06-03' },
    { path: '/ethdenver-report', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-03-06' },
    { path: '/futuremaker-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-03-19' },
    { path: '/smartcities-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-16' },
    { path: '/cadaval-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-05-25' },
    { path: '/springbootcamp-report', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-04-07' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly', lastModified: '2026-03-06' },
  ]

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        en: `${BASE}${page.path}`,
        pt: `${BASE}/pt${page.path}`,
        'x-default': `${BASE}${page.path}`,
      },
    },
  }))

  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${BASE}/blog/${post.slug}`,
        pt: `${BASE}/pt/blog/${post.slug}`,
        'x-default': `${BASE}/blog/${post.slug}`,
      },
    },
  }))

  return [...staticEntries, ...blogEntries]
}
