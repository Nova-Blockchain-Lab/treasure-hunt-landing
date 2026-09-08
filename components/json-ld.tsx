const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'NOVA Blockchain Lab',
  url: 'https://novablockchainlab.novaims.unl.pt/',
  logo: `${BASE_URL}/NOVA_Blockchain_Lab-2.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
  foundingDate: '2023',
  sameAs: [BASE_URL, 'https://novaims.unl.pt/'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'nova.blockchain.lab@novaims.unl.pt',
    contactType: 'sales',
    availableLanguage: ['English', 'Portuguese'],
  },
}

const website = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Treasure Hunt',
  url: BASE_URL,
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['en', 'pt-PT'],
}

// Site-wide nodes only. Anything page-specific (WebPage, BreadcrumbList,
// FAQPage, BlogPosting) is emitted by the page itself — see
// components/landing/landing-jsonld.tsx and the blog post route.
//
// Do NOT add WebPage or BreadcrumbList here. This component renders in
// app/[lang]/layout.tsx, i.e. on every page, so a WebPage node here described
// the home page while the real page emitted its own — two conflicting WebPage
// nodes and two BreadcrumbLists on all 11 landing pages and all 6 blog posts.
//
// Do NOT add Event nodes here either. Six past events (Feb–Jun 2026) used to be
// injected site-wide with eventStatus EventScheduled and bookable "Free Entry"
// offers. They described neither the page they appeared on nor anything
// upcoming, and they made the site surface for other organisers' event-name
// queries (/ethdenver-report: 406 impressions, 0 clicks over 90 days).
const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organization, website],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
    />
  )
}

// Home-page-specific nodes. Rendered only by app/[lang]/page.tsx.
//
// SoftwareApplication carries no `offers`: the three packages (data/packages.ts)
// are quote-only via mailto, with no published price. The previous markup
// declared price "0" USD for Starter, Pro AND Enterprise, which is pricing the
// product does not have.
export function HomeJsonLd({ lang = 'en' }: { lang?: string }) {
  const isPt = lang === 'pt'
  const url = isPt ? `${BASE_URL}/pt` : BASE_URL

  const softwareApplication = {
    '@type': 'SoftwareApplication',
    name: 'Treasure Hunt',
    applicationCategory: 'EventApplication',
    operatingSystem: 'Web',
    url: BASE_URL,
    description:
      'Interactive event engagement game that drives foot traffic to sponsors, rewards participation with points and prizes, and gives organizers real-time analytics.',
    screenshot: `${BASE_URL}/ethdenver-home.png`,
    featureList: [
      'QR code & NFC checkpoints',
      'Live leaderboard',
      'Voting polls',
      'Merch store',
      'Real-time analytics',
      'Strategic sponsor placement',
      'Hidden NFC challenges',
      'Dynamic difficulty scaling',
    ],
    provider: { '@id': `${BASE_URL}/#organization` },
  }

  const webPage = {
    '@type': 'WebPage',
    url,
    name: isPt
      ? 'Treasure Hunt | Caça ao Tesouro Digital e Gamificação de Eventos'
      : 'Treasure Hunt | Event Engagement Game for Conferences',
    description: isPt
      ? 'Caça ao tesouro digital com NFC e QR para conferências, empresas e team building, com leaderboard ao vivo e analytics em tempo real.'
      : 'Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    inLanguage: isPt ? 'pt-PT' : 'en',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    primaryImageOfPage: `${BASE_URL}/ethdenver-home.png`,
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': [webPage, softwareApplication],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
