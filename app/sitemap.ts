import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

const BASE = 'https://www.treasurehunt.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1, lastModified: '2026-03-13' },
    { path: '/ethdenver-report', priority: 0.9, lastModified: '2026-03-06' },
    { path: '/blog', priority: 0.6, lastModified: '2026-03-06' },
  ]

  const blogPages = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    lastModified: post.date,
  }))

  const allPages = [...staticPages, ...blogPages]

  return allPages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: 'weekly' as const,
    priority: page.priority,
    alternates: {
      languages: {
        en: `${BASE}${page.path}`,
        pt: `${BASE}/pt${page.path}`,
        'x-default': `${BASE}${page.path}`,
      },
    },
  }))
}
