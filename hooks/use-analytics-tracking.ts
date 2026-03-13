"use client"

import { useEffect, useRef } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { trackEvent, captureUtmParams } from "@/lib/analytics"

const SCROLL_MILESTONES = [25, 50, 75, 100]
const SECTION_IDS = ["hero", "demo", "what", "how", "where", "packages", "faq", "cta"]

export function useAnalyticsTracking() {
  const { scrollProgress } = useScrollPosition()
  const firedMilestones = useRef(new Set<number>())
  const firedSections = useRef(new Set<string>())

  // Capture UTM params on mount
  useEffect(() => {
    captureUtmParams()
  }, [])

  // Scroll depth tracking
  useEffect(() => {
    const pct = Math.round(scrollProgress * 100)
    for (const milestone of SCROLL_MILESTONES) {
      if (pct >= milestone && !firedMilestones.current.has(milestone)) {
        firedMilestones.current.add(milestone)
        trackEvent({ name: "scroll_depth", params: { percentage: milestone } })
      }
    }
  }, [scrollProgress])

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
