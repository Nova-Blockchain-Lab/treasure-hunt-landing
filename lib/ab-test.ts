import type { Locale } from "@/i18n/config"

export const AB_TEST_COOKIE = "th_ab_variant"
export const AB_TEST_NAME = "hero-cta-v1"

export type Variant = "control" | "variant"

export function assignVariant(): Variant {
  return Math.random() < 0.5 ? "control" : "variant"
}

// Copy overrides for Variant B — low-commitment CTA reframe
const variantOverrides: Record<string, Record<string, unknown>> = {
  en: {
    hero: {
      bookDemo: "See How It Works",
      seeItLive: "Get a Free Quote",
    },
    nav: {
      bookDemo: "Get a Free Quote",
    },
    cta: {
      bookDemo: "Get a Free Quote",
      seeItLive: "See How It Works",
    },
    stickyCta: {
      bookDemo: "Get a Free Quote",
    },
    contactForm: {
      title: "Get Your Free Quote",
      subtitle: "Tell us about your event. We'll send a custom quote within 24 hours.",
    },
  },
  pt: {
    hero: {
      bookDemo: "Veja Como Funciona",
      seeItLive: "Pedir Orçamento Grátis",
    },
    nav: {
      bookDemo: "Pedir Orçamento Grátis",
    },
    cta: {
      bookDemo: "Pedir Orçamento Grátis",
      seeItLive: "Veja Como Funciona",
    },
    stickyCta: {
      bookDemo: "Pedir Orçamento Grátis",
    },
    contactForm: {
      title: "Pedir Orçamento Grátis",
      subtitle: "Fale-nos sobre o seu evento. Enviamos um orçamento personalizado em 24 horas.",
    },
  },
}

/**
 * Deep-merge variant overrides into the base dictionary.
 * Only merges top-level sections that have overrides.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyVariantOverrides(dict: any, variant: Variant, lang: Locale): any {
  if (variant === "control") return dict

  const overrides = variantOverrides[lang] || variantOverrides.en
  const merged = { ...dict }

  for (const [section, sectionOverrides] of Object.entries(overrides)) {
    if (merged[section] && typeof merged[section] === "object" && !Array.isArray(merged[section])) {
      merged[section] = { ...merged[section], ...(sectionOverrides as Record<string, unknown>) }
    }
  }

  return merged
}
