// Shared content model for SEO landing pages. Every landing page is a plain
// data object of this shape, rendered through <LandingPage> so all pages stay
// visually and structurally consistent. Authors only write content — never JSX.

export interface LandingStat {
  value: string // e.g. "10,000+"
  label: string // e.g. "treasures found"
}

export interface LandingBenefit {
  // icon is a lucide-react icon NAME resolved by components/landing/icon-map.ts.
  // Allowed names live in that map — pick the closest fit.
  icon: string
  title: string
  description: string
}

export interface LandingStep {
  title: string
  description: string
}

export interface LandingComparisonRow {
  label: string // the dimension being compared
  us: string // Treasure Hunt's answer
  them: string // the competitor / alternative's answer
}

export interface LandingFaqItem {
  q: string
  a: string
}

export interface LandingContent {
  // ---- SEO + routing ----
  slug: string // folder name under app/[lang]/, e.g. "nfc-treasure-hunt"
  locale: "en" | "pt" // language the copy is written in; canonical points here
  title: string // <title> (≤ 60 chars ideal)
  description: string // meta description (≤ 155 chars ideal)

  // ---- Hero ----
  eyebrow: string // small mono label above the H1
  headline: string // first line of the H1
  headlineHighlight: string // gradient-highlighted second line of the H1
  subhead: string // supporting paragraph under the H1
  trust: string // small trust line (e.g. "Deployed at ETHDenver, Future Maker…")
  primaryCta: string // primary button label (opens the contact modal)

  // ---- Stats strip (optional) ----
  stats?: LandingStat[]

  // ---- Benefits grid (required) ----
  benefitsHeading: string
  benefitsHighlight: string
  benefitsIntro?: string
  benefits: LandingBenefit[] // 3–6 items

  // ---- Comparison table (optional — for "X alternative" pages) ----
  comparison?: {
    heading: string
    ourLabel: string // e.g. "Treasure Hunt"
    theirLabel: string // e.g. "Goosechase"
    rows: LandingComparisonRow[]
  }

  // ---- How-it-works steps (optional) ----
  steps?: {
    heading: string
    items: LandingStep[]
  }

  // ---- FAQ (required — also emitted as FAQPage JSON-LD) ----
  faqHeading: string
  faq: LandingFaqItem[] // 4–7 items

  // ---- Final CTA (required) ----
  ctaHeading: string
  ctaSubhead: string
  ctaButton: string
}
