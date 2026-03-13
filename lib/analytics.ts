/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

type AnalyticsEvent =
  | { name: "cta_clicked"; params: { button_text: string; location: string; package_tier?: string } }
  | { name: "form_opened"; params: { source: string } }
  | { name: "form_submitted"; params: { event_size: string } }
  | { name: "form_error"; params: { error_type: string } }
  | { name: "scroll_depth"; params: { percentage: number } }
  | { name: "section_viewed"; params: { section_id: string } }
  | { name: "external_link_clicked"; params: { url: string; link_text: string; location: string } }
  | { name: "sticky_bar_shown"; params: Record<string, never> }
  | { name: "sticky_bar_dismissed"; params: Record<string, never> }
  | { name: "package_viewed"; params: { tier_name: string; price: string } }

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", event.name, event.params)
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const

export function captureUtmParams(): void {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const val = params.get(key)
    if (val) utms[key] = val
  }
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utms))
    if (typeof window.gtag === "function") {
      window.gtag("set", "user_properties", utms)
    }
  }
}

export function getStoredUtms(): Record<string, string> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(sessionStorage.getItem("utm_params") || "{}")
  } catch {
    return {}
  }
}
