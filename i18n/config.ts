// Locale order matters: `locales[0]` is the default and `en` must stay first.
// Every locale here needs a matching dictionaries/<locale>.json with the exact
// same key shape as en.json — scripts/check-dictionaries.mjs enforces that.
export const locales = ['en', 'pt', 'es', 'it', 'de', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

// BCP-47 tags for <html lang>, og:locale and hreflang. Portuguese is pinned to
// pt-PT (the copy is PT-PT, not pt-BR).
export const localeTags: Record<Locale, string> = {
  en: 'en',
  pt: 'pt-PT',
  es: 'es',
  it: 'it',
  de: 'de',
  fr: 'fr',
}

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_PT',
  es: 'es_ES',
  it: 'it_IT',
  de: 'de_DE',
  fr: 'fr_FR',
}
