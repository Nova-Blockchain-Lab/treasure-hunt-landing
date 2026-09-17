"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useConsent } from "@/lib/consent-context"
import { capture, loadPostHog } from "@/lib/posthog"

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const query = searchParams.toString()
    capture("$pageview", { $current_url: window.origin + pathname + (query ? `?${query}` : "") })
  }, [pathname, searchParams])

  return null
}

/**
 * posthog-js used to be initialised at module scope, so it downloaded and began
 * capturing on every page for every visitor — before consent, unlike GA4
 * (components/ga4-script.tsx), on a site whose audience is in the EU.
 *
 * It is now loaded only once analytics consent is granted. Nothing here imports
 * posthog-js statically (see lib/posthog.ts), which is what keeps it out of the
 * first-load bundle rather than merely deferring its init.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { consent } = useConsent()

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (consent !== "granted" || !key) return
    loadPostHog(key, process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest").catch(() => {})
  }, [consent])

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
    </>
  )
}
