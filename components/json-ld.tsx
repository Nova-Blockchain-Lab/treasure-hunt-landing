const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  name: 'NOVA Blockchain Lab',
  url: BASE_URL,
  logo: `${BASE_URL}/nova-blockchain-lab-logo.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
}

const softwareApplication = {
  '@type': 'SoftwareApplication',
  name: 'Treasure Hunt',
  applicationCategory: 'EventApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  description:
    'Interactive event engagement game that drives foot traffic to sponsors, rewards participation with points and prizes, and gives organizers real-time analytics.',
  screenshot: `${BASE_URL}/ethdenver-home.png`,
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      description: 'Launch in a day — 50–200 attendees',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      description: 'The full experience — 200–1,000 attendees',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      description: 'Built around you — 1,000+ attendees',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
  ],
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
  provider: organization,
}

const faqPage = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do attendees need to download an app to play Treasure Hunt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Treasure Hunt is a fully web-based platform. Attendees simply scan a QR code or tap an NFC tag with their phone to start playing — no app download required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Treasure Hunt work at events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Organizers place QR code or NFC checkpoints around the venue at sponsor booths, stages, and key areas. Attendees scan checkpoints to earn points, climb a live leaderboard, and redeem rewards at a built-in merch store.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of events can use Treasure Hunt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Treasure Hunt works for conferences, hackathons, trade shows, festivals, corporate events, and campus orientations — any event where you want to drive foot traffic and increase engagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Has Treasure Hunt been deployed at real events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Treasure Hunt was deployed at ETHDenver 2026, one of the largest blockchain conferences in the world, where it successfully drove attendee engagement and sponsor foot traffic.',
      },
    },
  ],
}

const webPage = {
  '@type': 'WebPage',
  name: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
  url: BASE_URL,
  description:
    'Turn your event into an adventure attendees talk about. Interactive engagement game with QR & NFC checkpoints, live leaderboards, and real-time analytics.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Treasure Hunt',
    url: BASE_URL,
  },
  provider: organization,
}

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, faqPage, webPage],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
