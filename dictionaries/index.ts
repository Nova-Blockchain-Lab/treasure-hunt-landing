import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

const dictionaries = {
  en: () => import('./en.json').then((m) => m.default),
  pt: () => import('./pt.json').then((m) => m.default),
  es: () => import('./es.json').then((m) => m.default),
  it: () => import('./it.json').then((m) => m.default),
  de: () => import('./de.json').then((m) => m.default),
  fr: () => import('./fr.json').then((m) => m.default),
}

// Unknown locales must not throw. `proxy.ts` deliberately excludes any path
// containing a dot from the locale middleware (so real static files are served
// as-is), which means a URL like /foo.txt reaches app/[lang]/page.tsx with
// lang="foo.txt". Layouts and pages render concurrently, so the page's
// getDictionary call runs before the layout's notFound() lands — an unguarded
// `dictionaries[lang]()` threw a TypeError and Vercel served HTTP 500 instead
// of 404 for every dotted URL. Falling back lets notFound() win and return 404.
// Repeated 5xx responses make Google throttle crawling of the whole site.
export const getDictionary = (locale: Locale) =>
  (dictionaries[locale] ?? dictionaries[defaultLocale])()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
