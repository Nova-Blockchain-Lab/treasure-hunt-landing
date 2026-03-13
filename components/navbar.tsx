"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { useActiveSection } from "@/hooks/use-active-section"

const NAV_HREFS = ["#demo", "#what", "#how", "#where", "#packages"] as const

interface NavDict {
  demo: string
  features: string
  howItWorks: string
  useCases: string
  packages: string
  bookDemo: string
}

export function Navbar({ dict, onOpenContact }: { dict: NavDict; onOpenContact?: () => void }) {
  const { scrollY, scrollProgress } = useScrollPosition()
  const scrolled = scrollY > 60
  const [menuOpen, setMenuOpen] = useState(false)

  const links = useMemo(
    () => [
      { href: "#demo", label: dict.demo },
      { href: "#what", label: dict.features },
      { href: "#how", label: dict.howItWorks },
      { href: "#where", label: dict.useCases },
      { href: "#packages", label: dict.packages },
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
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F0605D] to-[#FF9A76] transition-[width] duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[56px] sm:h-[72px]">
          <a href="#" className="flex items-center gap-3" onClick={(e) => scrollToSection(e, "#hero")}>
            <Image
              src="/treasure-hunt-name.png"
              alt="Treasure Hunt"
              width={240}
              height={32}
              className="h-8 sm:h-16 w-auto"
              style={{ width: "auto" }}
              sizes="240px"
              priority
            />
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
                className="font-display text-[0.95rem] tracking-widest text-[#F0605D] border border-[rgba(240,96,93,0.3)] px-5 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-[rgba(240,96,93,0.08)]"
              >
                {dict.bookDemo}
              </button>
            </li>
          </ul>

          <button
            className="flex md:hidden flex-col gap-[5px] p-2 z-110 cursor-pointer bg-transparent border-none"
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
            className="font-display text-3xl tracking-widest text-[#8B949E] transition-colors duration-300 hover:text-[#E6EDF3]"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => { closeMenu(); onOpenContact?.() }}
          className="font-display text-3xl tracking-widest text-[#F0605D] transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
          {dict.bookDemo}
        </button>
      </div>
    </>
  )
}
