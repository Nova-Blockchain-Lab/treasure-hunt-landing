"use client"

import { useState, useEffect } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { X } from "lucide-react"

const DISMISS_KEY = "sticky-cta-dismissed"
const DISMISS_DURATION = 24 * 60 * 60 * 1000 // 24h

interface StickyCTADict {
  text: string
  bookDemo: string
}

export function StickyCTABar({ dict }: { dict: StickyCTADict }) {
  const { scrollY } = useScrollPosition()
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    const stored = localStorage.getItem(DISMISS_KEY)
    if (stored && Date.now() - parseInt(stored, 10) < DISMISS_DURATION) {
      setDismissed(true)
    } else {
      setDismissed(false)
    }
  }, [])

  const heroOutOfView = scrollY > 600
  const visible = heroOutOfView && !dismissed

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-90 h-[60px] bg-[rgba(6,8,15,0.95)] backdrop-blur-xl border-t border-[rgba(240,246,252,0.06)] transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 h-full flex items-center justify-between">
        {/* Desktop: text + button */}
        <span className="hidden md:block text-sm text-[#8B949E]">
          {dict.text}
        </span>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href="mailto:nova.blockchain.lab@novaims.unl.pt"
            className="flex-1 md:flex-none inline-flex items-center justify-center bg-[#F0605D] text-white font-display text-sm tracking-widest uppercase px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(240,96,93,0.3)]"
          >
            {dict.bookDemo}
          </a>
          <button
            onClick={dismiss}
            className="p-2 text-[#484F58] hover:text-[#8B949E] transition-colors duration-200"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
