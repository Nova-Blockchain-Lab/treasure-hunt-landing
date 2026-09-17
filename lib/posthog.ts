"use client"

import type { PostHog } from "posthog-js"

/**
 * PostHog access that does NOT drag posthog-js into the bundle.
 *
 * `usePostHog` from posthog-js/react is a static import of the whole 57 KB gz
 * library, so importing it in components put PostHog in the first-load JS of
 * every page — before consent, and for visitors who never grant it. Components
 * call `capture()` from here instead; the library is only ever loaded by
 * `loadPostHog`, which components/posthog-provider.tsx calls once analytics
 * consent has been granted.
 *
 * `import type` is erased at build time, so this module costs nothing.
 */
let client: PostHog | null = null

export async function loadPostHog(key: string, apiHost: string) {
  if (client) return client
  const { default: posthog } = await import("posthog-js")
  posthog.init(key, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    capture_pageview: false, // captured manually for the App Router
    capture_pageleave: true,
  })
  client = posthog
  return posthog
}

/**
 * No-op until consent is granted and the library has loaded. Events fired
 * before that are dropped rather than queued: replaying pre-consent activity
 * once someone accepts would defeat the point of asking.
 */
export function capture(event: string, properties?: Record<string, unknown>) {
  client?.capture(event, properties)
}
