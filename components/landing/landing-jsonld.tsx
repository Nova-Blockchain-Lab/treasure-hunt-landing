import type { LandingContent } from "@/lib/landing/types"
import { localeTags } from "@/i18n/config"

const BASE = "https://www.treasurehunt.pt"

// Emits WebPage + BreadcrumbList + FAQPage structured data for a landing page.
// FAQPage is eligible for FAQ rich results; keep the on-page FAQ copy identical
// to content.faq (it is — both render from the same object).
export function LandingJsonLd({ content }: { content: LandingContent }) {
  const url = `${BASE}${content.locale === "en" ? "" : "/" + content.locale}/${content.slug}`
  const inLanguage = localeTags[content.locale]

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      name: content.title,
      url,
      description: content.description,
      inLanguage,
      isPartOf: { "@id": `${BASE}/#website` },
      publisher: {
        "@type": "Organization",
        name: "NOVA Blockchain Lab",
        url: "https://novablockchainlab.novaims.unl.pt/",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        // The crumb is what renders in the SERP, so it is the page name — not the
        // whole <title>, which carries the " | Treasure Hunt" brand suffix.
        { "@type": "ListItem", position: 2, name: content.title.split(" | ")[0], item: url },
      ],
    },
  ]

  if (content.faq && content.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    })
  }

  const data = { "@context": "https://schema.org", "@graph": graph }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
