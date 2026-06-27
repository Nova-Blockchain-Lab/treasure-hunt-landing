import type { Metadata } from "next"
import type { LandingContent } from "./types"

const BASE = "https://www.treasurehunt.pt"

// Builds the Next Metadata for a landing page from its content. EN pages live at
// /<slug> (canonical EN, en + x-default); PT pages live at /pt/<slug> (canonical
// PT, pt + x-default → the PT URL since there is no other-language version).
export function landingMetadata(content: LandingContent): Metadata {
  const path = content.locale === "en" ? `/${content.slug}` : `/${content.locale}/${content.slug}`
  const url = `${BASE}${path}`
  const languages =
    content.locale === "en"
      ? { en: url, "x-default": url }
      : { [content.locale]: url, "x-default": url }

  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      title: content.title,
      description: content.description,
      url,
      siteName: "Treasure Hunt",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    },
  }
}
