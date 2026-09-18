import type { Locale } from './config'

// Extracted from app/[lang]/layout.tsx so components/json-ld.tsx can reuse it.
// Importing it straight from the layout would be circular: the layout renders
// <JsonLd /> from that same module.
// Per-locale home metadata. Copy is written per language, not machine-swapped
// at render time, so each locale gets a title/description aimed at how that
// market actually searches ("digitale Schnitzeljagd", "caccia al tesoro
// aziendale", "chasse au trésor entreprise").
export const homeMeta: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: 'Treasure Hunt | Event Engagement Game for Conferences',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    keywords: [
      'event engagement game',
      'interactive event platform',
      'gamified event experience',
      'conference engagement tool',
      'NFC event game',
      'QR code scavenger hunt',
      'event gamification',
      'sponsor foot traffic',
      'live leaderboard events',
      'event analytics platform',
    ],
  },
  pt: {
    title: 'Treasure Hunt | Caça ao Tesouro Digital e Gamificação de Eventos',
    description:
      'Caça ao tesouro digital (peddy paper com NFC e QR) para conferências, empresas e team building. Mais engagement, tráfego para patrocinadores e analytics.',
    keywords: [
      'caça ao tesouro digital',
      'peddy paper digital',
      'peddy paper empresas',
      'gamificação de eventos',
      'caça ao tesouro para empresas',
      'team building Lisboa',
      'atividades de team building',
      'jogos para eventos corporativos',
      'gamificação de conferências',
      'peddy paper com NFC',
    ],
  },
  es: {
    title: 'Treasure Hunt | Caza del Tesoro Digital para Eventos',
    description:
      'Caza del tesoro digital con NFC y QR para congresos, empresas y team building. Más participación, tráfico dirigido a patrocinadores y analítica en tiempo real.',
    keywords: [
      'caza del tesoro digital',
      'gimcana digital',
      'gamificación de eventos',
      'juegos para eventos de empresa',
      'team building para empresas',
      'dinámicas de equipo',
      'caza del tesoro con NFC',
      'gamificación de congresos',
      'actividades para congresos',
      'analítica de eventos',
    ],
  },
  it: {
    title: 'Treasure Hunt | Caccia al Tesoro Digitale per Eventi',
    description:
      'Caccia al tesoro digitale con NFC e QR per congressi, aziende e team building. Più coinvolgimento, flusso guidato verso gli sponsor e analytics in tempo reale.',
    keywords: [
      'caccia al tesoro digitale',
      'caccia al tesoro aziendale',
      'gamification eventi',
      'giochi per eventi aziendali',
      'team building aziendale',
      'caccia al tesoro con NFC',
      'gamification congressi',
      'attività per congressi',
      'coinvolgimento partecipanti',
      'analytics eventi',
    ],
  },
  de: {
    title: 'Treasure Hunt | Digitale Schnitzeljagd für Events',
    description:
      'Digitale Schnitzeljagd mit NFC und QR für Konferenzen, Firmenevents und Teambuilding. Mehr Engagement, gelenkte Besucherströme und Analytics in Echtzeit.',
    keywords: [
      'digitale Schnitzeljagd',
      'Schnitzeljagd Firmenevent',
      'Event Gamification',
      'Firmenevent Spiele',
      'Teambuilding Ideen',
      'Schnitzeljagd mit NFC',
      'Konferenz Gamification',
      'Messe Besucherströme',
      'Event Analytics',
      'interaktives Event',
    ],
  },
  fr: {
    title: 'Treasure Hunt | Chasse au Trésor Digitale pour Événements',
    description:
      "Chasse au trésor digitale NFC et QR pour congrès, entreprises et team building. Plus d'engagement, du passage vers les sponsors, analytique en direct.",
    keywords: [
      'chasse au trésor digitale',
      'chasse au trésor entreprise',
      'gamification événementielle',
      "jeu d'événement entreprise",
      'team building entreprise',
      'chasse au trésor NFC',
      'gamification de congrès',
      'animation de congrès',
      'trafic stand salon',
      'analytique événementielle',
    ],
  },
}
