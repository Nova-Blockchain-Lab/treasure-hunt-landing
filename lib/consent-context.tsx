"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

type ConsentState = "pending" | "granted" | "denied"

interface ConsentContextValue {
  consent: ConsentState
  mounted: boolean
  grantConsent: () => void
  denyConsent: () => void
}

const STORAGE_KEY = "cookie_consent"

const ConsentContext = createContext<ConsentContextValue>({
  consent: "pending",
  mounted: false,
  grantConsent: () => {},
  denyConsent: () => {},
})

export function useConsent() {
  return useContext(ConsentContext)
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("pending")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null
    if (stored === "granted" || stored === "denied") {
      setConsent(stored)
    }
    setMounted(true)
  }, [])

  // Initialize GA4 consent mode defaults
  useEffect(() => {
    if (typeof window === "undefined") return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function (...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
    })
  }, [])

  // Update consent mode when state changes
  useEffect(() => {
    if (!mounted || typeof window.gtag !== "function") return
    if (consent === "granted") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }, [consent, mounted])

  const grantConsent = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "granted")
    setConsent("granted")
  }, [])

  const denyConsent = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "denied")
    setConsent("denied")
  }, [])

  return (
    <ConsentContext.Provider value={{ consent, mounted, grantConsent, denyConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}
