"use client"

import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import Image from "next/image"
import { useActiveSection } from "@/hooks/use-active-section"
import { LanguageSwitcher } from "@/components/language-switcher"

const NAV_HREFS = ["#results", "#organizer", "#packages", "#faq"] as const

interface NavDict {
  results: string
  organizer: string
  packages: string
  faq: string
  bookDemo: string
}

export function Navbar({ dict, onOpenContact }: { dict: NavDict; onOpenContact?: () => void }) {
  // The progress bar is written straight to the DOM inside the listener: routing
  // it through React state re-rendered the navbar on every scroll event and
  // animated a layout-triggering `width` each frame.
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
        if (progressRef.current) progressRef.current.style.width = `${pct}%`
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  const [menuOpen, setMenuOpen] = useState(false)

  const links = useMemo(
    () => [
      { href: "#results", label: dict.results },
      { href: "#organizer", label: dict.organizer },
      { href: "#packages", label: dict.packages },
      { href: "#faq", label: dict.faq },
    ],
    [dict]
  )

  const sectionIds = useMemo(() => NAV_HREFS.map((h) => h.replace("#", "")), [])
  const activeId = useActiveSection(sectionIds)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ""
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? "hidden" : ""
      return next
    })
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen, closeMenu])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    closeMenu()
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 px-5 md:px-6 transition-all duration-400 ${
          scrolled
            ? "bg-[rgba(6,8,15,0.85)] backdrop-blur-xl border-b border-[rgba(240,246,252,0.06)]"
            : ""
        }`}
      >
        {/* Scroll progress bar */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#F0605D] to-[#FF9A76]"
        />

        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[56px] sm:h-[72px]">
          <a href="#" className="flex items-center gap-2.5 h-full pr-2" onClick={(e) => scrollToSection(e, "#hero")}>
            <Image
              src="/treasure-hunt-mark.png"
              alt=""
              width={128}
              height={122}
              unoptimized
              priority
              className="w-8 sm:w-10 h-auto"
            />
            <span className="font-display text-[24px] sm:text-[28px] leading-none tracking-[0.02em] text-[#F0605D]">
              Treasure Hunt
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-6 list-none">
            {links.map((link) => {
              const isActive = activeId === link.href.replace("#", "")
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`font-sans text-[0.85rem] font-medium tracking-wide relative transition-colors duration-300 hover:text-[#E6EDF3] ${
                      isActive ? "text-[#E6EDF3]" : "text-[#8B949E]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-[-4px] left-0 h-px bg-[#F0605D] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              )
            })}
            <li>
              <button
                onClick={onOpenContact}
                className="inline-flex min-h-11 items-center rounded bg-[#C9433F] px-4 text-sm font-semibold text-white cursor-pointer transition hover:bg-[#B03935]"
              >
                {dict.bookDemo}
              </button>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          {/* Mobile: the booking CTA stays in the bar (there is no sticky bottom
              bar any more), the section links go in the menu. */}
          <div className="flex md:hidden items-center gap-1">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex min-h-11 items-center rounded bg-[#C9433F] px-3 text-[13px] font-semibold text-white cursor-pointer"
          >
            {dict.bookDemo}
          </button>
          <button
            className="flex flex-col gap-[5px] p-2 z-110 cursor-pointer bg-transparent border-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""
              }`}
            />
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 bg-[rgba(6,8,15,0.98)] backdrop-blur-xl z-105 flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="font-display text-3xl tracking-widest text-[#8B949E] py-2 px-4 transition-colors duration-300 hover:text-[#E6EDF3]"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => { closeMenu(); onOpenContact?.() }}
          className="font-display text-3xl tracking-widest text-[#F0605D] py-2 px-4 transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
          {dict.bookDemo}
        </button>
        <LanguageSwitcher className="text-base" />
      </div>
    </>
  )
}
