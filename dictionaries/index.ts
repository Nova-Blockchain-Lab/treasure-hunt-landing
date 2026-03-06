import type { Locale } from '@/i18n/config'

const dictionaries = {
  en: () => import('./en.json').then((m) => m.default),
  pt: () => import('./pt.json').then((m) => m.default),
}

export const getDictionary = (locale: Locale) => dictionaries[locale]()
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
