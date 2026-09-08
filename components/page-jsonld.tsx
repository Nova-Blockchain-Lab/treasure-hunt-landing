const BASE = 'https://www.treasurehunt.pt'

/**
 * Page-level WebPage (or Blog / CollectionPage) + BreadcrumbList for simple
 * pages that don't have richer schema of their own.
 *
 * Needed because the site-wide graph in components/json-ld.tsx carries only
 * Organization + WebSite. It used to inject a WebPage and a BreadcrumbList on
 * every page, both describing the home page, which collided with the real
 * per-page nodes on the landing pages and blog posts. Pages that want page-level
 * schema now declare it themselves: landing pages via landing-jsonld.tsx, blog
 * posts and three of the reports inline as Article/BlogPosting, and everything
 * else through this component.
 */
export function PageJsonLd({
  name,
  path,
  description,
  type = 'WebPage',
  inLanguage = 'en',
}: {
  name: string
  path: string // leading slash, e.g. "/cadaval-report"
  description: string
  type?: 'WebPage' | 'Blog' | 'CollectionPage'
  inLanguage?: string
}) {
  const url = `${BASE}${path}`
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        name,
        url,
        description,
        inLanguage,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
