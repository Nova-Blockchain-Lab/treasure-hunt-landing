# Treasure Hunt — Landing

Marketing site for **Treasure Hunt**, an interactive event-engagement game (QR & NFC scavenger hunt) built by NOVA Blockchain Lab. Deployed at https://www.treasurehunt.pt.

## Marketing Skills

When marketing-related tasks are requested (CRO, copywriting, SEO, A/B testing, analytics, etc.), load and follow the relevant skill instructions. On the original author's machine these live at `c:\Users\Franc\Marketing\marketingskills\skills\` (a local path — adjust to wherever the skills are checked out on your machine).

Available skills: ab-test-setup, ad-creative, ai-seo, analytics-tracking, churn-prevention, cold-email, competitor-alternatives, content-strategy, copy-editing, copywriting, email-sequence, form-cro, free-tool-strategy, launch-strategy, marketing-ideas, marketing-psychology, onboarding-cro, page-cro, paid-ads, paywall-upgrade-cro, popup-cro, pricing-strategy, product-marketing-context, programmatic-seo, referral-program, revops, sales-enablement, schema-markup, seo-audit, signup-flow-cro, site-architecture, social-content.

## Tech stack

- **Next.js 16** (App Router, Turbopack) on **Vercel**
- **React 19**, **TypeScript 5.7**
- **Tailwind v4** (`@tailwindcss/postcss`)
- **next-intl** for i18n (`localePrefix: 'as-needed'`, `localeDetection: false`)
- **framer-motion** for animations, **recharts** for the report charts
- **@vercel/analytics**, **PostHog** (product analytics + A/B), **GA4** (gated on cookie consent)
- Package manager: **pnpm 10**

## Commands

```bash
pnpm install
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start (after build)
pnpm lint         # eslint .
```

## Project structure

```
app/
├── layout.tsx              # Root: metadataBase + fonts (Bebas Neue, Tomorrow, Roboto Mono)
├── page.tsx                # Root home (en): metadata + JsonLd, renders <PageClient> (middleware routes / → /[lang])
├── opengraph-image.tsx     # Edge-rendered OG image (1200×630)
├── manifest.ts             # PWA manifest
├── robots.ts               # robots.txt
├── sitemap.ts              # sitemap.xml — static pages + blog posts, with hreflang alternates (en/pt/x-default)
├── feed.xml/route.ts       # RSS feed for blog
├── api/contact/route.ts    # Contact form submission endpoint
└── [lang]/                 # i18n segment, locales = ['en', 'pt'], default = 'en'
    ├── layout.tsx          # Generates per-locale Metadata (title, description, hreflang, OG, twitter); renders JsonLd
    ├── page.tsx            # Reads AB cookie + dictionary, applies variant overrides, renders <PageClient>
    ├── blog/
    │   ├── page.tsx        # Blog listing
    │   └── [slug]/page.tsx # Blog post (BlogPosting + BreadcrumbList JSON-LD @graph inline)
    ├── ethdenver-report/   # Static report page with charts (generateMetadata, locale-aware)
    ├── futuremaker-report/ # Static report page with charts
    ├── springbootcamp-report/ # Static team-based report (Spring Bootcamp 2026); self-contained, no dict keys
    ├── smartcities-report/  # Ported PSCS 2026 report (force-static); reads data/pscs2026/report-snapshot.json via lib/smartcities-report.ts; self-contained _components/ + _report.css
    └── cadaval-report/      # Ported Festival da Juventude 2026 report; reads data/cadaval2026/report-snapshot.json via lib/cadaval-report.ts; self-contained _components/ + _report.css
    # All 5 report routes use locale-aware generateMetadata (self-canonical per locale + en/pt/x-default hreflang) and are linked from the demo section cards. Each Event is in the json-ld graph.

components/                 # Section components, composed by components/page-client.tsx
├── page-client.tsx         # Client wrapper: composes all home sections + analytics tracking
├── navbar.tsx              # Sticky navbar with section-active highlight
├── hero-section.tsx        # Logo image + sr-only H1 + tagline + CTAs
├── marquee-strip.tsx
├── demo-section.tsx        # Phone screenshots + 5 per-event stat cards (ETHDenver featured + 4 auto-fit grid), each linking to its report
├── media-section.tsx       # Interview video + pull-quote + photo/clip gallery (assets in public/media/); id="media"
├── social-proof-strip.tsx  # ETHDenver / Future Maker / Confluence logos
├── features-section.tsx
├── how-it-works-section.tsx
├── use-cases-section.tsx
├── testimonials-section.tsx
├── faq-section.tsx
├── packages-section.tsx
├── cta-section.tsx
├── contact-modal.tsx       # Contact form modal (posts to /api/contact)
├── site-footer.tsx         # 4-column: logos + Navigation + Resources + Contact (takes lang prop)
├── sticky-cta-bar.tsx
├── cookie-consent-banner.tsx # Consent gate for analytics
├── ga4-script.tsx          # GA4 loader (consent-gated)
├── posthog-provider.tsx    # PostHog provider + pageview capture
├── json-ld.tsx             # Site-wide JSON-LD graph (Org, SoftwareApplication, WebPage, Events, Reviews)
└── (helpers: spotlight-card, glass-card, reveal-on-scroll, text-shimmer, number-ticker)

data/                       # Static content (TS) — features, packages, blog posts, report data, etc.
dictionaries/               # en.json, pt.json + index.ts (getDictionary loader)
docs/                       # cro-roadmap.md and other working docs
i18n/                       # next-intl routing + locale config
hooks/                      # use-scroll-position, use-active-section, use-analytics-tracking
lib/                        # shared utilities — ab-test.ts, analytics.ts, consent-context.tsx; cadaval-report.ts + smartcities-report.ts (snapshot types + readSnapshot for the two ported reports)
public/                     # logos, screenshots, favicon; public/media/ (interview.mp4 + clips + event photos + posters)
proxy.ts                    # next-intl proxy (renamed from middleware.ts per Next 16 convention) + A/B variant cookie
next.config.mjs             # AVIF/WebP, security headers, immutable image cache
.env.example                # Required env vars (analytics keys, etc.)
```

## Key conventions

- **Metadata is generated per-locale** in `app/[lang]/layout.tsx`. Each page-level `Metadata` adds its own `alternates` (canonical + en/pt/x-default hreflang) and OG/Twitter card images. Report pages use `generateMetadata` for locale-aware copy.
- **Home page composition lives in `components/page-client.tsx`.** Both `app/page.tsx` (en root) and `app/[lang]/page.tsx` resolve the dictionary, apply A/B variant overrides, and render `<PageClient dict lang variant>`. Pass `lang` through to `SiteFooter` so its locale prefix is correct.
- **A/B testing:** `lib/ab-test.ts` defines the variant cookie (`AB_TEST_COOKIE`) and `applyVariantOverrides(dict, variant, lang)`. Variant is read server-side from cookies and threaded into `PageClient`.
- **Analytics:** PostHog (provider in `components/posthog-provider.tsx`) and GA4 (`components/ga4-script.tsx`) are gated behind cookie consent (`lib/consent-context.tsx`, `components/cookie-consent-banner.tsx`). Event tracking via `hooks/use-analytics-tracking.ts`.
- **Internal links must use `next/link`** (not `<a>` for non-anchor navigation) so the locale prefix logic can stay simple.
- **Locale prefix:** `en` is at `/`, `pt` is at `/pt/...`. The footer & demo section build hrefs with `prefix = lang === "en" ? "" : "/" + lang`.
- **Sections on the home page link to each other via `#anchor`** (`#hero`, `#demo`, `#what`, `#how`, `#where`, `#packages`, `#cta`).
- **JSON-LD:** site-wide graph lives in `components/json-ld.tsx` (rendered via `[lang]/layout.tsx` and the root `app/page.tsx`). Blog posts add their own `BlogPosting` + `BreadcrumbList` `@graph` script inline.
- **Static SSG** for all routes except `/feed.xml`, `/opengraph-image` (edge runtime), and `/api/contact` (dynamic). The home routes are server-rendered on demand (cookie reads for A/B + consent).

## SEO notes

- H1 in the hero is **`sr-only`** (the brand is rendered as the `treasure-hunt-logo.png` image). The visible H2s are per section.
- Canonical for the home is `https://www.treasurehunt.pt` (English at root, no `/en` prefix).
- Sitemap includes hreflang alternates (en/pt/x-default) for every entry; static pages use hardcoded `lastModified` dates with per-page `changeFrequency`, blog posts use their `post.date`.
- Caveat: the middleware + A/B/consent cookies set on responses make Vercel return `cache-control: private, no-cache, no-store`. This kills CDN caching and hurts TTFB. Fixing requires re-architecting the cookie strategy (e.g. only set on language switch / explicit opt-in).

## Deployment

Vercel project (see `.vercel/`). Build = `pnpm build`, framework = Next.js. `vercel.json` only pins the install/build commands. See `.env.example` for required environment variables.
