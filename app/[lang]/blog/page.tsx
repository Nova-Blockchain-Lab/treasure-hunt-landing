import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Blog | Treasure Hunt',
  description: 'Insights on event gamification, conference engagement, and interactive event technology from the Treasure Hunt team.',
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const prefix = lang === 'en' ? '' : `/${lang}`

  return (
    <div className="min-h-screen bg-[#06080F] text-white">
      <div className="max-w-[800px] mx-auto px-5 py-16">
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-4">Blog</h1>
        <p className="text-[#8B949E] text-lg mb-12">
          Insights on event gamification, conference engagement, and interactive event technology.
        </p>

        <div className="flex flex-col gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              className="block rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#0D1117] p-6 md:p-8 transition-all duration-300 hover:border-[rgba(240,96,93,0.2)] hover:bg-[#131921]"
            >
              <time className="text-xs font-mono text-[#484F58] tracking-wide">{post.date}</time>
              <h2 className="font-display text-xl md:text-2xl mt-2 mb-3 text-[#E6EDF3]">
                {post.title}
              </h2>
              <p className="text-[#8B949E] text-sm leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
