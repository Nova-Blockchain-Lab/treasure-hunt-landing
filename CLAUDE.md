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
    ├── cadaval-report/      # Ported Festival da Juventude 2026 report; reads data/cadaval2026/report-snapshot.json via lib/cadaval-report.ts; self-contained _components/ + _report.css
    └── datasummit-report/  # Ported Data with Purpose Summit 2026 report (NOVA IMS, Taguspark, 25 Jun 2026, one day); reads data/datasummit2026/report-snapshot.json via lib/datasummit-report.ts; self-contained _components/ + _report.css. Venue map asset is public/datasummit-venue-map.png (1517×1600 portrait).
    # All 6 report routes use locale-aware generateMetadata (self-canonical per locale + en/pt/x-default hreflang) and are linked from the demo section cards. Each Event is in the json-ld graph.

components/                 # Section components, composed by components/page-client.tsx
├── page-client.tsx         # Client wrapper: composes all home sections + analytics tracking
├── navbar.tsx              # Sticky navbar with section-active highlight
├── hero-section.tsx        # Logo image + sr-only H1 + tagline + CTAs
├── marquee-strip.tsx
├── demo-section.tsx        # Phone screenshots + 6 per-event stat cards (ETHDenver featured + 5 auto-fit grid), each linking to its report
├── media-section.tsx       # Interview video + pull-quote + CSS-columns masonry gallery (6 event photos + 2 vertical clips, natural aspect; one landscape shot gets a `box` aspect to cap a column); assets in public/media/; id="media"
├── social-proof-strip.tsx  # "DEPLOYED AT" event logos — data-driven uniform 4-col grid (was a ragged flex-wrap). Mixed polarity: light/transparent marks render bare; dark-on-white wordmarks (Future Maker, Data w/ Purpose, Spring Bootcamp) get a white `chip`. Cadaval bg was flood-filled to transparent + served `unoptimized` (see AVIF gotcha below). Cultural Week bg stripped to transparent (all-blue, reads on dark). Every logo links to the external event/conference site (Spring Bootcamp + Cultural Week point to their NOVA IMS event pages, not our own report/game).
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
public/                     # logos, screenshots, favicon; public/media/ (interview.mp4 + clips + event photos + posters; flyer-claim/merch-hats/merch-hoodie from ../insta/assets + datasummit-tap (cropped from the insta media repo story), all ≤1600px)
proxy.ts                    # next-intl proxy (renamed from middleware.ts per Next 16 convention) + A/B variant cookie
next.config.mjs             # AVIF/WebP, security headers, immutable image cache
.env.example                # Required env vars (analytics keys, etc.)
```

## SEO landing pages (content-driven)

Standalone keyword-targeted landing pages live under `app/[lang]/<slug>/` and are
**content-driven** so they stay consistent by construction:

- `lib/landing/types.ts` — the `LandingContent` model (hero, stats, benefits,
  optional comparison table, optional steps, FAQ, CTA).
- `data/landing/<slug>.ts` — each page is one `export const content: LandingContent`.
  This is the ONLY thing that differs per page.
- `components/landing/landing-page.tsx` — the single renderer (`<LandingPage>`);
  reuses `SiteFooter` + `ContactModal`. `icon-map.ts` resolves `benefit.icon`
  names. `landing-jsonld.tsx` emits FAQPage + BreadcrumbList + WebPage schema.
- `lib/landing/metadata.ts#landingMetadata(content)` builds canonical + hreflang
  from `content.locale`: EN pages live at `/<slug>` (canonical EN, en+x-default);
  PT pages at `/pt/<slug>` (canonical PT). Every route file is identical except
  the `data/landing/<slug>` import.
- Route folder name MUST equal `content.slug` (else canonical ≠ actual URL).
- Pages are registered in `app/sitemap.ts` (`landingPages[]`, per-locale) and
  linked site-wide from the footer "Solutions" / "Soluções" section
  (`components/site-footer.tsx`, locale-aware).
- Current set: EN — nfc-treasure-hunt, event-gamification, qr-scavenger-hunt-events,
  goosechase-alternative, scavify-alternative, scavenger-hunt-universities,
  trade-show-booth-traffic, team-building-scavenger-hunt; PT —
  caca-ao-tesouro-digital-empresas, peddy-paper-digital, team-building-eventos.
- Copy is grounded in real product facts only (no invented stats). Authored +
  critiqued via a multi-agent loop; keep that bar when adding pages.

## Key conventions

- **Home section order** (`page-client.tsx`): Hero → Marquee → SocialProof → **Demo → Features** → Media → HowItWorks → Testimonials → Packages → FAQ → CTA → Footer (proof-first: Demo precedes Features). Section eyebrow ordinals ("01 / Demo", "02 / Features", …) are hand-numbered in the dictionaries to match this DOM order — renumber them if you reorder sections. `SectionDivider`/`Reverse` gradients track the bg bands; Features and Media are both `#06080F` so they sit adjacent with no divider.
- **Accent system:** coral (`#F0605D`→`#FF9A76`) is the brand accent — logo, headings, CTAs, section eyebrows + dashes, demo stat numbers, the how-it-works callout. Blue (`#58A6FF`) is reserved for *functional* tints only (feature/infra icons, packages category labels/notes). Don't use blue for navigational/brand emphasis.
- **Dark-theme text colors:** body `#E6EDF3`, secondary `#8B949E`, muted `#7D8590` (the `--text-muted` token — was `#484F58`, which failed WCAG AA at ~2.4:1 on the near-black bg). Don't reintroduce `#484F58` for readable text. Keyboard focus uses one global `:focus-visible` coral outline in `globals.css` — don't add bare `focus:outline-none` without a replacement.
- **next/image + transparent PNG + AVIF gotcha:** Next's AVIF encoder can flatten a transparent PNG's alpha to opaque black at *some* widths (hit on `cadaval-festival-logo.png` at w=256, fine at 384/640). If a transparent logo renders with a black box, set `unoptimized` on that `<Image>` (it serves the PNG as-is). Clearing `.next/cache/images` alone is not enough — the dev server caches optimized variants in memory.
- **Metadata is generated per-locale** in `app/[lang]/layout.tsx`. Each page-level `Metadata` adds its own `alternates` (canonical + en/pt/x-default hreflang) and OG/Twitter card images. Report pages use `generateMetadata` for locale-aware copy.
- **Home page composition lives in `components/page-client.tsx`.** Both `app/page.tsx` (en root) and `app/[lang]/page.tsx` resolve the dictionary, apply A/B variant overrides, and render `<PageClient dict lang variant>`. Pass `lang` through to `SiteFooter` so its locale prefix is correct.
- **A/B testing:** `lib/ab-test.ts` defines the variant cookie (`AB_TEST_COOKIE`) and `applyVariantOverrides(dict, variant, lang)`. The variant is resolved **client-side** in `PageClient` (reads/sets the cookie via `document.cookie`, applies overrides with `useMemo`). It is deliberately NOT read server-side: `cookies()` would opt the home + locale routes into dynamic rendering and force `private, no-store`. Server + first client render show `control` (the canonical copy); the variant swaps in after hydration.
- **Analytics:** PostHog (provider in `components/posthog-provider.tsx`) and GA4 (`components/ga4-script.tsx`) are gated behind cookie consent (`lib/consent-context.tsx`, `components/cookie-consent-banner.tsx`). Event tracking via `hooks/use-analytics-tracking.ts`.
- **Internal links must use `next/link`** (not `<a>` for non-anchor navigation) so the locale prefix logic can stay simple.
- **PT copy uses proper PT-PT diacritics** (`dictionaries/pt.json` and the PT metadata in `app/[lang]/layout.tsx`). Don't add new PT strings without accents.
- **Locale prefix:** `en` is at `/`, `pt` is at `/pt/...`. The footer & demo section build hrefs with `prefix = lang === "en" ? "" : "/" + lang`.
- **Sections on the home page link to each other via `#anchor`** (`#hero`, `#demo`, `#what`, `#how`, `#where`, `#packages`, `#cta`).
- **JSON-LD:** site-wide graph lives in `components/json-ld.tsx` (rendered via `[lang]/layout.tsx` and the root `app/page.tsx`). Blog posts add their own `BlogPosting` + `BreadcrumbList` `@graph` script inline. Every `Event` node must include an `offers` object (Search Console flags missing `offers` as a non-critical Events issue) — copy the "Free Entry" offer pattern when adding new events.
- **Static SSG** for all routes except `/feed.xml`, `/opengraph-image` (edge runtime), and `/api/contact` (dynamic). The home routes are server-rendered on demand (cookie reads for A/B + consent).

## SEO notes

- H1 in the hero is **`sr-only`** (the brand is rendered as the `treasure-hunt-logo.png` image). The visible H2s are per section.
- Canonical for the home is `https://www.treasurehunt.pt` (English at root, no `/en` prefix).
- Sitemap (`app/sitemap.ts`) emits hreflang alternates per entry, but only for **bilingual** pages (home + ethdenver-report + futuremaker-report, flagged `bilingual: true`). The other 4 reports + the blog are **EN-only**: they emit `en` + `x-default` only and their `/pt` variants canonical to the EN URL (they have no real PT translation — advertising a `pt` hreflang for English content is a quality-signal problem). Keep `sitemap.ts` `bilingual` flags in sync with each page's `generateMetadata`.
- **Language switcher** (`components/language-switcher.tsx`) is in the navbar (desktop + mobile) and `SiteFooter`, making `/pt` reachable (it was previously an orphan locale — no internal link pointed into it). `localeDetection` stays off.
- **Caching is fixed (was a P0 SEO drag):** the home + locale routes are static/SSG again (verify with `next build` → `/` shows `○`). The old `private, no-store` came from the server-side A/B cookie read + the middleware cookie-set; both are gone (A/B is client-side now, `proxy.ts` only does locale routing). Do not reintroduce `cookies()` into the home/locale page render path.
- **First-party `Review` JSON-LD was removed** from `components/json-ld.tsx` (self-serving reviews are against Google's review-snippet guidelines). Testimonials remain as on-page content only. Don't re-add Review/AggregateRating without independent, attributable reviews.
- **Contact form** (`app/api/contact/route.ts`) sends via Resend's HTTP API. Requires the operator to set `RESEND_API_KEY` (and verify the `treasurehunt.pt` sending domain in Resend); optionally `CONTACT_EMAIL`. Without the key it returns an explicit 503 (no silent lead drop).

## Deployment

Vercel project (see `.vercel/`). Build = `pnpm build`, framework = Next.js. `vercel.json` only pins the install/build commands. See `.env.example` for required environment variables.
