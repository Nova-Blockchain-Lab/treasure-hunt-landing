const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  name: 'NOVA Blockchain Lab',
  url: BASE_URL,
  logo: `${BASE_URL}/NOVA_Blockchain_Lab-2.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
  foundingDate: '2023',
  sameAs: [
    'https://hunt.ethdenver.com/',
    'https://novaims.unl.pt/pt/here-now/eventos/nova-ims-career-fair-future-maker-2026/',
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
      description: 'Launch in a day \u2014 50\u2013200 attendees',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      description: 'The full experience \u2014 200\u20131,000 attendees',
      priceCurrency: 'USD',
      price: '0',
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
  provider: organization,
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
  image: [
    `${BASE_URL}/ethdenver-home.png`,
    `${BASE_URL}/ethdenver-leaderboard.png`,
    `${BASE_URL}/ethdenver-map.png`,
  ],
  performer: {
    '@type': 'Organization',
    name: 'NOVA Blockchain Lab',
    url: BASE_URL,
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
    url: BASE_URL,
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
  '@graph': [organization, softwareApplication, webPage, breadcrumbList, event, futureMakerEvent, ...reviews],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
