const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  name: 'NOVA Blockchain Lab',
  url: BASE_URL,
  logo: `${BASE_URL}/nova-blockchain-lab-logo.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
  foundingDate: '2023',
  sameAs: [
    'https://hunt.ethdenver.com/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'nova.blockchain.lab@novaims.unl.pt',
    contactType: 'sales',
    availableLanguage: 'English',
  },
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

const breadcrumbList = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
  ],
}

const event = {
  '@type': 'Event',
  name: 'Treasure Hunt at ETHDenver 2026',
  description:
    'Interactive scavenger hunt game deployed at ETHDenver 2026, driving attendee engagement with QR & NFC checkpoints, live leaderboards, and a merch store.',
  startDate: '2026-02-27',
  endDate: '2026-03-01',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'National Western Complex',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
  },
  organizer: organization,
  url: 'https://hunt.ethdenver.com/',
}

const reviews = [
  {
    '@type': 'Review',
    reviewBody:
      'Seriously!! The treasure hunt was a HUGE SUCCESS! You guys played a big role in creating the ETH Denver experience! Well done!',
    author: {
      '@type': 'Person',
      name: 'Nick',
      jobTitle: 'Head of the Makerspace, ETHDenver',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    itemReviewed: softwareApplication,
  },
  {
    '@type': 'Review',
    reviewBody:
      'My booth was tucked in a back corner, I barely had anyone stopping by. Then Treasure Hunt hid a checkpoint at my spot and suddenly people kept showing up. They\'d scan the tag, see my custom kicks, and start buying. That one checkpoint completely turned my weekend around.',
    author: {
      '@type': 'Person',
      name: 'Custom Sneaker Vendor',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    itemReviewed: softwareApplication,
  },
  {
    '@type': 'Review',
    reviewBody:
      'No app download, no complicated setup. Players were scanning checkpoints within 30 seconds of signing in. The merch store was a huge hit.',
    author: {
      '@type': 'Organization',
      name: 'NOVA Blockchain Lab',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    itemReviewed: softwareApplication,
  },
]

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, faqPage, webPage, breadcrumbList, event, ...reviews],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
