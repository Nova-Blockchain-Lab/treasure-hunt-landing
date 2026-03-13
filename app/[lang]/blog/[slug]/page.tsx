import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { slug, lang } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  const prefix = lang === 'en' ? '' : `/${lang}`

  return {
    title: `${post.title} | Treasure Hunt Blog`,
    description: post.description,
    alternates: {
      canonical: `https://www.treasurehunt.pt/blog/${slug}`,
      languages: {
        en: `https://www.treasurehunt.pt/blog/${slug}`,
        pt: `https://www.treasurehunt.pt/pt/blog/${slug}`,
        'x-default': `https://www.treasurehunt.pt/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://www.treasurehunt.pt${prefix}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { slug, lang } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const prefix = lang === 'en' ? '' : `/${lang}`
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen bg-[#06080F] text-white">
      <article className="max-w-[720px] mx-auto px-5 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <header className="mb-10">
          <time className="text-xs font-mono text-[#484F58] tracking-wide">{post.date}</time>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight mt-3 mb-4">
            {post.title}
          </h1>
          <p className="text-[#8B949E] text-lg">{post.description}</p>
        </header>

        <div className="prose-custom">
          <BlogContent content={post.content} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="mt-16 pt-10 border-t border-[#21262D]">
            <h2 className="font-display text-xl text-[#E6EDF3] mb-6">Related Posts</h2>
            <div className="space-y-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`${prefix}/blog/${related.slug}`}
                  className="block group"
                >
                  <time className="text-xs font-mono text-[#484F58] tracking-wide">
                    {related.date}
                  </time>
                  <h3 className="font-display text-lg text-[#E6EDF3] group-hover:text-[#F0605D] transition-colors mt-1">
                    {related.title}
                  </h3>
                  <p className="text-sm text-[#8B949E] mt-1 line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* JSON-LD: BlogPosting + BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'BlogPosting',
                  headline: post.title,
                  description: post.description,
                  datePublished: post.date,
                  author: {
                    '@type': 'Organization',
                    name: 'NOVA Blockchain Lab',
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: 'NOVA Blockchain Lab',
                    url: 'https://www.treasurehunt.pt',
                  },
                  mainEntityOfPage: `https://www.treasurehunt.pt/blog/${slug}`,
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.treasurehunt.pt',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Blog',
                      item: 'https://www.treasurehunt.pt/blog',
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: post.title,
                      item: `https://www.treasurehunt.pt/blog/${slug}`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </article>
    </div>
  )
}

function BlogContent({ content }: { content: string }) {
  // Simple markdown-to-JSX for headings, bold, lists, paragraphs
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let key = 0

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1.5 text-[#8B949E] text-[0.925rem] leading-relaxed mb-6 pl-2">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      )
      listItems = []
    }
  }

  function formatInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#E6EDF3] font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="font-display text-xl md:text-2xl text-[#E6EDF3] mt-10 mb-4">
          {trimmed.replace('## ', '')}
        </h2>
      )
    } else if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.replace('- ', ''))
    } else if (trimmed === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p
          key={key++}
          className="text-[#8B949E] text-[0.925rem] leading-relaxed mb-5"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      )
    }
  }
  flushList()

  return <>{elements}</>
}
