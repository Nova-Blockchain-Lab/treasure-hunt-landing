const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'NOVA Blockchain Lab',
  url: 'https://novablockchainlab.novaims.unl.pt/',
  logo: `${BASE_URL}/NOVA_Blockchain_Lab-2.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
  foundingDate: '2023',
  sameAs: [
    BASE_URL,
    'https://hunt.ethdenver.com/',
    'https://novaims.unl.pt/pt/here-now/eventos/nova-ims-career-fair-future-maker-2026/',
    'https://www.linkedin.com/company/nova-blockchain-lab',
    'https://github.com/nova-blockchain-lab',
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
  '@id': `${BASE_URL}/#software`,
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
      description: 'Launch in a day \u2014 50\u2013200 attendees',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      description: 'The full experience — 200–1,000 attendees',
      priceCurrency: 'EUR',
      price: '990',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      description: 'Built around you \u2014 1,000+ attendees',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '2',
    bestRating: '5',
    worstRating: '1',
  },
  provider: { '@id': `${BASE_URL}/#organization` },
}

const webPage = {
  '@type': 'WebPage',
  '@id': `${BASE_URL}/#webpage`,
  name: 'Treasure Hunt | Interactive Event Engagement Game for Conferences',
  url: BASE_URL,
  description:
    'Turn your event into an adventure attendees talk about. Interactive engagement game with QR & NFC checkpoints, live leaderboards, and real-time analytics.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Treasure Hunt',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#organization` },
  },
  provider: { '@id': `${BASE_URL}/#organization` },
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
  startDate: '2026-02-18',
  endDate: '2026-02-21',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventFinished',
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
  organizer: { '@id': `${BASE_URL}/#organization` },
  url: 'https://hunt.ethdenver.com/',
  image: [
    `${BASE_URL}/ethdenver-home.png`,
    `${BASE_URL}/ethdenver-leaderboard.png`,
    `${BASE_URL}/ethdenver-map.png`,
  ],
  performer: {
    '@type': 'Organization',
    name: 'NOVA Blockchain Lab',
    url: 'https://novablockchainlab.novaims.unl.pt/',
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Entry',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://hunt.ethdenver.com/',
    validFrom: '2026-01-01',
  },
}

const futureMakerEvent = {
  '@type': 'Event',
  name: 'Treasure Hunt at Future Maker 2026',
  description:
    'Interactive scavenger hunt game deployed at NOVA IMS Future Maker Career Fair 2026, with 265 hunters and 115 NFC checkpoints.',
  startDate: '2026-03-16',
  endDate: '2026-03-19',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'NOVA IMS',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisbon',
      addressCountry: 'PT',
    },
  },
  organizer: organization,
  url: `${BASE_URL}/futuremaker-report`,
  performer: {
    '@type': 'Organization',
    name: 'NOVA Blockchain Lab',
    url: 'https://novablockchainlab.novaims.unl.pt/',
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Entry',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://novaims.unl.pt/pt/here-now/eventos/nova-ims-career-fair-future-maker-2026/',
    validFrom: '2026-01-01',
  },
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
      worstRating: '1',
    },
    itemReviewed: { '@id': `${BASE_URL}/#software` },
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
      worstRating: '1',
    },
    itemReviewed: { '@id': `${BASE_URL}/#software` },
  },
]

const faqPage = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to set up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As fast as 48 hours. We handle the tech — you tell us where the checkpoints go and what rewards to offer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do attendees need to download an app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It runs entirely in the phone browser. One tap to sign in, playing in under 30 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if our venue doesn\'t have NFC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'QR codes work everywhere. You can mix NFC and QR across your venue, or go QR-only.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we customize the branding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pro and Enterprise packages include custom checkpoint design, reward names, and white-label branding.',
      },
    },
    {
      '@type': 'Question',
      name: 'What data do organizers get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A real-time dashboard with checkpoint visits, engagement heatmaps, leaderboard standings, and a full post-event analytics report to share with sponsors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a minimum event size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Starter works from 50 attendees. For 1,000+, Enterprise includes dedicated support and custom features.',
      },
    },
  ],
}

const howTo = {
  '@type': 'HowTo',
  name: 'How Treasure Hunt Works at Your Event',
  description: 'Five steps to turn your venue into an interactive game — zero friction for attendees.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open and Play Instantly',
      text: 'Attendees visit a URL on their phone and sign in with one tap. No app download, no account setup. They\'re playing in 30 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Explore the Venue',
      text: 'Checkpoints are placed where you want traffic. Attendees follow the map, discover hidden spots, and uncover rewards across your space.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Scan to Earn',
      text: 'One tap on an NFC tag or scan of a QR code. Instant reward, automatically tracked. Every interaction becomes a data point for you.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Compete and Collaborate',
      text: 'Live leaderboards fuel friendly competition. Social challenges and team missions keep energy high throughout the event.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Spend Real Rewards',
      text: 'Points unlock real merchandise — hats, socks, exclusive items. Attendees leave with something tangible from your event.',
    },
  ],
}

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, webPage, breadcrumbList, event, futureMakerEvent, ...reviews, faqPage, howTo],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
