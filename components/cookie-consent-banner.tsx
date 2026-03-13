"use client"

import { useConsent } from "@/lib/consent-context"

const COPY = {
  en: {
    message: "We use cookies to analyze site usage and improve your experience.",
    accept: "Accept All",
    reject: "Essential Only",
  },
  pt: {
    message: "Usamos cookies para analisar o uso do site e melhorar a sua experiência.",
    accept: "Aceitar Todos",
    reject: "Apenas Essenciais",
  },
} as const

function detectLang(): "en" | "pt" {
  if (typeof window === "undefined") return "en"
  return window.location.pathname.startsWith("/pt") ? "pt" : "en"
}

export function CookieConsentBanner() {
  const { consent, mounted, grantConsent, denyConsent } = useConsent()
  const t = COPY[detectLang()]

  if (!mounted || consent !== "pending") return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-100 animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#0D1117] border-t border-[rgba(240,246,252,0.08)] backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm text-[#8B949E] flex-1 text-center sm:text-left">
            {t.message}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={denyConsent}
              className="px-4 py-2 text-sm text-[#8B949E] border border-[rgba(240,246,252,0.08)] rounded-lg hover:text-[#E6EDF3] hover:border-[rgba(240,246,252,0.16)] transition-colors cursor-pointer"
            >
              {t.reject}
            </button>
            <button
              onClick={grantConsent}
              className="px-4 py-2 text-sm text-white bg-[#F0605D] rounded-lg hover:shadow-[0_0_20px_rgba(240,96,93,0.3)] transition-all cursor-pointer"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
