import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Treasure Hunt - Interactive Event Engagement Game',
    short_name: 'Treasure Hunt',
    description:
      'Turn your event into an adventure. Gamified QR & NFC scavenger hunt that drives sponsor foot traffic, boosts engagement, and delivers real-time analytics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06080F',
    theme_color: '#06080F',
    icons: [
      {
        src: '/treasure-hunt-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
