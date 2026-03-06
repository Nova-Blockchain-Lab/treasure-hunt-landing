import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'

const BASE = 'https://www.treasurehunt.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages = [
    { path: '', priority: 1 },
    { path: '/ethdenver-report', priority: 0.9 },
    { path: '/blog', priority: 0.6 },
  ]

  const blogPages = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
  }))

  const allPages = [...staticPages, ...blogPages]

  return allPages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: page.priority,
    alternates: {
      languages: {
        en: `${BASE}${page.path}`,
        pt: `${BASE}/pt${page.path}`,
      },
    },
  }))
}
