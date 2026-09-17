"use client"

import { useEffect, useRef } from "react"
import { trackEvent, captureUtmParams } from "@/lib/analytics"

const SCROLL_MILESTONES = [25, 50, 75, 100]
// "where" is gone: it was the id of use-cases-section, which nothing rendered.
const SECTION_IDS = ["hero", "demo", "what", "how", "packages", "faq", "cta"]

export function useAnalyticsTracking() {
  const firedMilestones = useRef(new Set<number>())
  const firedSections = useRef(new Set<string>())

  // Capture UTM params on mount
  useEffect(() => {
    captureUtmParams()
  }, [])

  // Scroll depth. Deliberately no React state: this hook is called from
  // PageClient, so a setState per scroll event reconciled the whole home tree.
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0
      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone)
          trackEvent({ name: "scroll_depth", params: { percentage: milestone } })
        }
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Section viewed tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedSections.current.has(entry.target.id)) {
            firedSections.current.add(entry.target.id)
            trackEvent({ name: "section_viewed", params: { section_id: entry.target.id } })
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])
}
