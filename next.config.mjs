// Vercel injects its feedback/comments toolbar from vercel.live on PREVIEW
// deployments only, never on production. Allowing those hosts unconditionally
// would widen the production policy for a tool production never loads, so the
// entries are added only when VERCEL_ENV is not 'production'.
const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
const vercelToolbar = isPreview
  ? {
      script: ' https://vercel.live',
      connect: ' https://vercel.live wss://*.pusher.com https://*.pusher.com',
      img: ' https://vercel.live https://vercel.com',
      frame: ' https://vercel.live',
      style: ' https://vercel.live',
      font: ' https://vercel.live https://assets.vercel.com',
    }
  : { script: '', connect: '', img: '', frame: '', style: '', font: '' }

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Every image is a static file under public/ that only changes on deploy,
    // so the 4h default just pays for the same transform over and over.
    minimumCacheTTL: 31536000,
  },
  // next-intl's middleware strips the /en prefix with a temporary 307; these run
  // before middleware and make it a permanent 308 instead.
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // Defense in depth, NOT a complete XSS mitigation: 'unsafe-inline'
            // is unavoidable here because Next's bootstrap, the GA4 init tag and
            // the JSON-LD blocks are inline, and the nonce alternative would
            // force every page to render per-request — undoing the static SSG
            // that CLAUDE.md records as a P0 SEO fix. What this DOES buy:
            // scripts cannot be loaded from any host but ours and GTM, a
            // <base> tag cannot hijack relative URLs, forms cannot post
            // offsite, and nothing can be framed or embedded as an object.
            // PostHog needs no entry — it is proxied same-origin via /ingest.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              `frame-src 'self'${vercelToolbar.frame}`,
              "frame-ancestors 'none'",
              "form-action 'self'",
              `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${vercelToolbar.script}`,
              `style-src 'self' 'unsafe-inline'${vercelToolbar.style}`,
              `img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com${vercelToolbar.img}`,
              `font-src 'self' data:${vercelToolbar.font}`,
              "media-src 'self'",
              `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${vercelToolbar.connect}`,
              "worker-src 'self' blob:",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'NOSNIFF' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
