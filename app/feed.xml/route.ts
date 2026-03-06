import { blogPosts } from '@/data/blog-posts'

const BASE_URL = 'https://www.treasurehunt.pt'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const items = [
    // ETHDenver report
    {
      title: 'ETHDenver 2026 Report | Treasure Hunt Results & Analytics',
      description:
        '207 players, 992 treasures found, 462,255 BUFFI minted. Full analytics from Treasure Hunt at ETHDenver 2026.',
      link: `${BASE_URL}/ethdenver-report`,
      pubDate: new Date('2026-03-06').toUTCString(),
    },
    // Blog posts
    ...blogPosts.map((post) => ({
      title: post.title,
      description: post.description,
      link: `${BASE_URL}/blog/${post.slug}`,
      pubDate: new Date(post.date).toUTCString(),
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Treasure Hunt Blog</title>
    <description>Insights on event gamification, conference engagement, and interactive event technology from the Treasure Hunt team.</description>
    <link>${BASE_URL}</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
