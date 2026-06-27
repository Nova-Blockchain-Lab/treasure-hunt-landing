import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Pure next-intl locale routing. The A/B variant cookie is intentionally NOT
// set here: setting any cookie on the response adds a Set-Cookie header and
// forces Vercel to serve the HTML as `private, no-store`, killing CDN caching
// and TTFB on the home + locale pages (the most important URLs). The variant is
// assigned client-side in components/page-client.tsx instead, so these routes
// stay statically edge-cacheable.
export default createIntlMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
