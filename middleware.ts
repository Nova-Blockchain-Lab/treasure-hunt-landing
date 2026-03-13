import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { AB_TEST_COOKIE, assignVariant } from './lib/ab-test'

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  // Assign A/B variant cookie if not present
  if (!request.cookies.get(AB_TEST_COOKIE)) {
    const variant = assignVariant()
    response.cookies.set(AB_TEST_COOKIE, variant, {
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
