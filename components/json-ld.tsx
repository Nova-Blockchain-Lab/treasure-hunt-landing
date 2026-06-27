const BASE_URL = 'https://www.treasurehunt.pt'

const organization = {
  '@type': 'Organization',
  name: 'NOVA Blockchain Lab',
  url: 'https://novablockchainlab.novaims.unl.pt/',
  logo: `${BASE_URL}/NOVA_Blockchain_Lab-2.png`,
  email: 'nova.blockchain.lab@novaims.unl.pt',
  foundingDate: '2023',
  sameAs: [
    BASE_URL,
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
  startDate: '2026-02-18',
  endDate: '2026-02-21',
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

const smartCitiesEvent = {
  '@type': 'Event',
  name: 'Treasure Hunt at Portugal Smart Cities Summit 2026',
  description:
    'Interactive scavenger hunt deployed at the Portugal Smart Cities Summit, with 351 players, 8,123 treasure finds, and 103 NFC checkpoints across FIL Pavilhão 3.',
  startDate: '2026-05-12',
  endDate: '2026-05-14',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'FIL Pavilhão 3, Parque das Nações',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lisbon',
      addressCountry: 'PT',
    },
  },
  organizer: organization,
  url: `${BASE_URL}/smartcities-report`,
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
    url: `${BASE_URL}/smartcities-report`,
    validFrom: '2026-04-01',
  },
}

const cadavalEvent = {
  '@type': 'Event',
  name: 'Treasure Hunt at Festival da Juventude 2026',
  description:
    'Interactive NFC scavenger hunt at the Festival da Juventude in Cadaval, with 126 players, 2,182 treasure finds, and 57 tags across the festival grounds.',
  startDate: '2026-05-22',
  endDate: '2026-05-23',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Festival da Juventude',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cadaval',
      addressCountry: 'PT',
    },
  },
  organizer: organization,
  url: `${BASE_URL}/cadaval-report`,
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
    url: `${BASE_URL}/cadaval-report`,
    validFrom: '2026-04-15',
  },
}

const springBootcampEvent = {
  '@type': 'Event',
  name: 'Treasure Hunt at Spring Bootcamp 2026',
  description:
    'Team-based NFC scavenger hunt at NOVA IMS Spring Bootcamp, with 7 teams, 20 hunters, and 42 tags across the campus.',
  startDate: '2026-04-07',
  endDate: '2026-04-07',
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
  url: `${BASE_URL}/springbootcamp-report`,
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
    url: `${BASE_URL}/springbootcamp-report`,
    validFrom: '2026-03-01',
  },
}

const dataSummitEvent = {
  '@type': 'Event',
  name: 'Treasure Hunt at Data with Purpose Summit 2026',
  description:
    'Interactive NFC scavenger hunt at the Data with Purpose Summit, organised by NOVA IMS, with 58 players, 777 tag finds, and 25 tags across the Centro de Congressos do Taguspark.',
  startDate: '2026-06-25',
  endDate: '2026-06-25',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Centro de Congressos do Taguspark',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oeiras',
      addressCountry: 'PT',
    },
  },
  organizer: organization,
  url: `${BASE_URL}/datasummit-report`,
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
    url: `${BASE_URL}/datasummit-report`,
    validFrom: '2026-06-01',
  },
}

// NOTE: First-party Review nodes were intentionally removed. Google's
// review-snippet guidelines disallow self-serving reviews the site writes about
// its own product (no star snippets, possible spam signal). The testimonials
// still render as on-page content via components/testimonials-section.tsx — they
// just aren't emitted as structured data. Do NOT re-add Review/AggregateRating
// here without genuinely independent, attributable reviews.
const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [organization, softwareApplication, webPage, breadcrumbList, event, futureMakerEvent, smartCitiesEvent, cadavalEvent, springBootcampEvent, dataSummitEvent],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
