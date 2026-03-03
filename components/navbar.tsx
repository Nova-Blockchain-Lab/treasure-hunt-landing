"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

const navLinks = [
  { href: "#demo", label: "Demo" },
  { href: "#what", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#where", label: "Use Cases" },
  { href: "#packages", label: "Packages" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

  // Close on Escape key - focus trap improvement
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
            ? "bg-[rgba(3,1,24,0.92)] backdrop-blur-[20px] border-b border-neon-pink/10"
            : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-3" onClick={(e) => scrollToSection(e, "#hero")}>
            <Image
              src="/treasure-hunt-logo.png"
              alt="Treasure Hunt"
              width={140}
              height={32}
              className="h-8 w-auto"
              style={{ width: "auto", height: "32px" }}
              priority
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="font-sans text-[0.85rem] font-medium text-text-secondary tracking-wide relative transition-colors duration-300 hover:text-text-primary after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-neon-pink after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cta"
                onClick={(e) => scrollToSection(e, "#cta")}
                className="font-display text-[0.95rem] tracking-widest text-neon-pink border border-neon-pink/40 px-5 py-2 rounded-md transition-all duration-300 hover:bg-neon-pink/10 hover:border-neon-pink hover:shadow-[var(--glow-pink)]"
              >
                Get Started
              </a>
            </li>
          </ul>

          {/* Burger */}
          <button
            className="flex md:hidden flex-col gap-[5px] p-2 z-110 cursor-pointer bg-transparent border-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with focus trap fix */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[rgba(3,1,24,0.98)] backdrop-blur-[30px] z-105 flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-display text-3xl tracking-widest text-text-secondary transition-colors duration-300 hover:text-neon-pink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => scrollToSection(e, "#cta")}
            className="font-display text-3xl tracking-widest text-neon-pink transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      )}
    </>
  )
}
