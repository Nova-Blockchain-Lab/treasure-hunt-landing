"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * EN / PT locale toggle. `localePrefix` is 'as-needed', so EN lives at the
 * unprefixed path and PT under /pt. Renders real crawlable <Link> anchors so
 * /pt is reachable by users and search engines (previously an orphan locale —
 * no internal link pointed into it). Self-contained: derives the current
 * locale from the pathname.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/"
  const isPt = pathname === "/pt" || pathname.startsWith("/pt/")
  const base = pathname.replace(/^\/pt(?=\/|$)/, "") || "/"
  const enHref = base
  const ptHref = base === "/" ? "/pt" : `/pt${base}`

  const linkCls = (active: boolean) =>
    `transition-colors duration-300 ${active ? "text-[#E6EDF3]" : "text-[#8B949E] hover:text-[#E6EDF3]"}`

  return (
    <div className={`flex items-center gap-1.5 font-mono text-xs tracking-wide ${className}`} aria-label="Language">
      <Link href={enHref} hrefLang="en" aria-current={!isPt ? "true" : undefined} className={linkCls(!isPt)}>
        EN
      </Link>
      <span className="text-[#7D8590]">/</span>
      <Link href={ptHref} hrefLang="pt" aria-current={isPt ? "true" : undefined} className={linkCls(isPt)}>
        PT
      </Link>
    </div>
  )
}
