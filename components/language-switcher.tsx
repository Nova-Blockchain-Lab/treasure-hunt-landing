"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, defaultLocale, localeTags, type Locale } from "@/i18n/config"

const LABELS: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
  it: "IT",
  de: "DE",
  fr: "FR",
}

// Locales other than the default carry a /<locale> prefix ('as-needed').
const PREFIXED = locales.filter((l) => l !== defaultLocale)

/**
 * Locale switcher. Renders real crawlable <Link> anchors so every locale is
 * reachable by users and search engines — /pt used to be an orphan locale with
 * no internal link pointing into it, and es/it/de/fr would be the same without
 * this. Self-contained: derives the current locale from the pathname.
 *
 * Only the home page is fully translated, so the switcher always links to the
 * locale home rather than the current path. Linking /de/blog (English content
 * under a German prefix, canonicalised back to /blog) would just spend crawl
 * budget on a URL that cannot be indexed.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/"
  const match = PREFIXED.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  const current: Locale = match ?? defaultLocale

  const linkCls = (active: boolean) =>
    `transition-colors duration-300 ${active ? "text-[#E6EDF3]" : "text-[#8B949E] hover:text-[#E6EDF3]"}`

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-xs tracking-wide ${className}`}
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[#7D8590]">/</span>}
          <Link
            href={l === defaultLocale ? "/" : `/${l}`}
            hrefLang={localeTags[l]}
            aria-current={current === l ? "true" : undefined}
            className={linkCls(current === l)}
          >
            {LABELS[l]}
          </Link>
        </span>
      ))}
    </div>
  )
}
