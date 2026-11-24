import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  // Off: next-intl otherwise sends an HTTP `Link` header on every response with
  // all six locales as hreflang alternates (and `pt`, not `pt-PT`). That told
  // Google the EN-only pages had pt/es/it/de/fr versions (noindex variants that
  // canonicalise back) and contradicted the HTML <link> tags and the sitemap.
  // hreflang lives in each page's metadata and app/sitemap.ts only.
  alternateLinks: false,
  // Off: the NEXT_LOCALE cookie only feeds locale detection, which is disabled,
  // yet next-intl set it on every HTML response (a Set-Cookie on static pages).
  localeCookie: false,
})
