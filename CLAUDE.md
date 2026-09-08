# Treasure Hunt — Landing

Marketing site for **Treasure Hunt**, an interactive event-engagement game (QR & NFC scavenger hunt) built by NOVA Blockchain Lab. Deployed at https://www.treasurehunt.pt.

## Marketing Skills

When marketing-related tasks are requested (CRO, copywriting, SEO, A/B testing, analytics, etc.), load and follow the relevant skill instructions. On the original author's machine these live at `c:\Users\Franc\Marketing\marketingskills\skills\` (a local path — adjust to wherever the skills are checked out on your machine).

Available skills: ab-test-setup, ad-creative, ai-seo, analytics-tracking, churn-prevention, cold-email, competitor-alternatives, content-strategy, copy-editing, copywriting, email-sequence, form-cro, free-tool-strategy, launch-strategy, marketing-ideas, marketing-psychology, onboarding-cro, page-cro, paid-ads, paywall-upgrade-cro, popup-cro, pricing-strategy, product-marketing-context, programmatic-seo, referral-program, revops, sales-enablement, schema-markup, seo-audit, signup-flow-cro, site-architecture, social-content.

## Commands

```bash
pnpm install
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start (after build)
pnpm lint         # eslint .
pnpm check:dict   # assert every dictionaries/<locale>.json matches en.json's key shape
```

`pnpm lint` works now (ESLint 9 flat config in `eslint.config.mjs`; it used to
fail outright, because the script existed but neither eslint nor a config was
installed). It currently reports ~32 pre-existing `react-hooks/static-components`
and `react-hooks/set-state-in-effect` errors in `page-client.tsx`,
`sticky-cta-bar.tsx`, `text-shimmer.tsx`, `consent-context.tsx` and the report
`_components`. Left alone deliberately: they touch the A/B variant and consent
paths. `next build` does not run eslint, so they don't block a deploy. Pinned to
eslint 9 because `eslint-plugin-react` 7.x breaks on eslint 10.

## Locales / i18n

Six locales: `en` (default, unprefixed) plus `pt`, `es`, `it`, `de`, `fr` under
`/<locale>`. `localePrefix: 'as-needed'`, `localeDetection: false`.

- `i18n/config.ts` is the single source of truth: `locales`, `defaultLocale`,
  `localeTags` (BCP-47 for `<html lang>`/hreflang — note `pt` → **`pt-PT`**) and
  `ogLocales`. Adding a locale means adding it here **and** adding
  `dictionaries/<locale>.json`; `pnpm check:dict` fails if the key shapes drift
  (350 leaves). Run it after touching any dictionary.
- **Only the home page is fully localised.** Every locale's home is a complete
  translation of `dictionaries/en.json`, so all six sit in one reciprocal
  hreflang cluster (self-referencing + `x-default` → EN), built from
  `homeLanguages` in `app/[lang]/layout.tsx` and mirrored in `app/sitemap.ts`.
- Everything else is EN-only or EN+PT and **cross-locale canonicals to its EN
  original**: the EN landing pages, the blog, and the four non-dictionary
  reports all canonical to `/<path>` from `/<locale>/<path>`. Only
  `ethdenver-report` and `futuremaker-report` are genuinely bilingual and
  self-canonical under `/pt`. Do not add `es/it/de/fr` hreflang to those pages
  without writing real translated copy first — chrome-only locale pages are the
  scaled-content failure mode.
- Per-locale home `title`/`description`/`keywords` live in the `homeMeta` map in
  `app/[lang]/layout.tsx`, written per market (e.g. "digitale Schnitzeljagd",
  "caccia al tesoro aziendale"), not machine-swapped.
- Each non-EN locale also has **one hand-written landing page** (see below):
  `pt` has three, and `es`/`it`/`de`/`fr` have one each. The footer's Solutions
  list is per locale (`LOCALE_SOLUTIONS` in `site-footer.tsx`) so a German page
  never links a list of English landing pages.
- `components/language-switcher.tsx` renders crawlable `<Link>`s for all six and
  always points at the **locale home**, not the current path, since only the
  home is translated.
- `getDictionary` **must not throw on an unknown locale.** `proxy.ts` excludes
  any path with a dot from the locale middleware, so `/foo.txt` reaches
  `app/[lang]/page.tsx` with `lang="foo.txt"`; layouts and pages render
  concurrently, so an unguarded `dictionaries[lang]()` threw before the layout's
  `notFound()` landed and Vercel served **HTTP 500 instead of 404 for every
  dotted URL**. It falls back to the default locale — keep that guard.

## Root layout

`app/[lang]/layout.tsx` **is** the root layout: it owns `<html>`/`<body>`, the
fonts and the providers. There is deliberately no `app/layout.tsx` and no
`app/page.tsx` — that is what lets `<html lang>` be correct per locale (with a
parent root layout there was no access to the `[lang]` segment and the site
shipped no `lang` attribute at all). The old `app/page.tsx` was also dead code:
the proxy rewrites `/` → `/en`, so `app/[lang]` serves the homepage, and the
stale file declared a different title and description than what shipped. Don't
reintroduce either file.

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
  caca-ao-tesouro-digital-empresas, peddy-paper-digital, team-building-eventos;
  ES — caza-del-tesoro-digital-empresas; IT — caccia-al-tesoro-aziendale;
  DE — digitale-schnitzeljagd-firmenevent; FR — chasse-au-tresor-entreprise.
- `content.locale` is a full `Locale`, and the page is **single-language**: the
  canonical points at that locale's URL and the hreflang set is that locale plus
  `x-default`. Never add a cross-language alternate to a landing page without
  writing real copy in that language.
- Copy is grounded in real product facts only (no invented stats). Authored +
  critiqued via a multi-agent loop; keep that bar when adding pages.

## Blog

- The `/blog` hub carries its own intro copy (what the posts cover, where the
  numbers come from, the recurring questions). It was 250 words of card links and
  Search Console returned "Crawled, currently not indexed" for it. A listing page
  needs its own reason to exist. Post cards are `h3` under an "All posts" `h2`,
  and they link `/blog/<slug>` unprefixed because posts are EN-only.
- Posts live in `data/blog-posts.ts` (slug/title/description/date/content). 6 posts as of July 2026; the three July posts are event case studies grounded in the report snapshot data (PSCS trade-fair, Data Summit one-day, Spring Bootcamp teams) — every number must trace to `data/*/report-snapshot.json` or the report TS files, no invented stats.
- The renderer (`BlogContent` in `app/[lang]/blog/[slug]/page.tsx`) supports `##`, `**bold**`, `*em*`, `- lists`, and `[text](/internal-path)` links (internal only, href must start with `/`). Use those links to point posts at their report + landing pages.
- New posts are picked up by the sitemap automatically, but bump the `/blog` listing `lastModified` in `app/sitemap.ts` when publishing.
- If a stale `.next` incremental cache makes new post routes 404 locally under `next start`, `rm -rf .next && pnpm build` (hit July 2026).

## Key conventions

- **Home section order** (`page-client.tsx`): Hero → Marquee → SocialProof → **Demo → Features** → Media → HowItWorks → Testimonials → Packages → FAQ → CTA → Footer (proof-first: Demo precedes Features). Section eyebrow ordinals ("01 / Demo", "02 / Features", …) are hand-numbered in the dictionaries to match this DOM order — renumber them if you reorder sections. `SectionDivider`/`Reverse` gradients track the bg bands; Features and Media are both `#06080F` so they sit adjacent with no divider.
- **Accent system:** coral (`#F0605D`→`#FF9A76`) is the brand accent — logo, headings, CTAs, section eyebrows + dashes, demo stat numbers, the how-it-works callout. Blue (`#58A6FF`) is reserved for *functional* tints only (feature/infra icons, packages category labels/notes). Don't use blue for navigational/brand emphasis.
- **Dark-theme text colors:** body `#E6EDF3`, secondary `#8B949E`, muted `#7D8590` (the `--text-muted` token — was `#484F58`, which failed WCAG AA at ~2.4:1 on the near-black bg). Don't reintroduce `#484F58` for readable text. Keyboard focus uses one global `:focus-visible` coral outline in `globals.css` — don't add bare `focus:outline-none` without a replacement.
- **next/image + transparent PNG + AVIF gotcha:** Next's AVIF encoder can flatten a transparent PNG's alpha to opaque black at *some* widths (hit on `cadaval-festival-logo.png` at w=256, fine at 384/640). If a transparent logo renders with a black box, set `unoptimized` on that `<Image>` (it serves the PNG as-is). Clearing `.next/cache/images` alone is not enough — the dev server caches optimized variants in memory.
- **Metadata is generated per-locale** in `app/[lang]/layout.tsx` from the `homeMeta` map. Each page-level `Metadata` adds its own `alternates` (canonical + hreflang) and OG/Twitter card images. Report pages use `generateMetadata` for locale-aware copy. Keep meta descriptions ≤ ~158 chars and `<title>` ≤ ~60 — the June 2026 audit found blog titles at 85–98 chars because `generateMetadata` appended `" | Treasure Hunt Blog"`; that suffix is gone, don't re-add it.
- **og:image gotchas (two, both hit in the June 2026 SEO audit):** (1) the `proxy.ts` matcher must exclude `opengraph-image` — the path has no file extension, so without the exclusion next-intl rewrites it to `/[lang]/opengraph-image` → 404. (2) A child segment's `openGraph` object replaces the parent's **wholesale**, so any `openGraph` block without `images` silently drops the OG image — always include `images` (default: `https://www.treasurehunt.pt/opengraph-image`) when defining `openGraph` in a new page's metadata.
- **Home page composition lives in `components/page-client.tsx`.** `app/[lang]/page.tsx` is the only entry point (see **Root layout**): it resolves the dictionary, renders `<PageClient dict lang>` and `<HomeJsonLd lang>`. Pass `lang` through to `SiteFooter` so its link prefixes are correct.
- **A/B testing:** `lib/ab-test.ts` defines the variant cookie (`AB_TEST_COOKIE`) and `applyVariantOverrides(dict, variant, lang)`. The variant is resolved **client-side** in `PageClient` (reads/sets the cookie via `document.cookie`, applies overrides with `useMemo`). It is deliberately NOT read server-side: `cookies()` would opt the home + locale routes into dynamic rendering and force `private, no-store`. Server + first client render show `control` (the canonical copy); the variant swaps in after hydration.
- **Analytics:** PostHog (provider in `components/posthog-provider.tsx`) and GA4 (`components/ga4-script.tsx`) are gated behind cookie consent (`lib/consent-context.tsx`, `components/cookie-consent-banner.tsx`). Event tracking via `hooks/use-analytics-tracking.ts`.
- **Footer nav links are home-ABSOLUTE** (`/#what`, `/pt#what`), never bare
  `#what`. `SiteFooter` ships on every page, so bare anchors resolved to
  nothing on `/book`, the landing pages, the blog and the reports. They are
  `next/link`, which still soft-scrolls (no reload) when already on the home.
- **Logos are sized optically, not by matching CSS height.** The footer marks
  have different aspect ratios (2.35:1 vs 2.81:1) and different amounts of
  transparent padding, so equal heights look wrong. `treasure-hunt-logo.png`
  is the full stacked lockup (icon + wordmark + tagline) and needs ~120px+ to
  be legible; compact placements (navbar, `/book` header) use
  `treasure-hunt-name.png`, the wordmark-only asset. Keep `width`/`height`
  equal to the real file dimensions (6250x2665 / 1437x511) or the reserved box
  is wrong and the image shifts on load.
- **Internal links must use `next/link`** (not `<a>` for non-anchor navigation) so the locale prefix logic can stay simple.
- **PT copy uses proper PT-PT diacritics** (`dictionaries/pt.json` and the PT metadata in `app/[lang]/layout.tsx`). Don't add new PT strings without accents.
- **Locale prefix:** `en` is at `/`; `pt`, `es`, `it`, `de`, `fr` are at `/<locale>/...`. `/en/*` → `/*` is a permanent 308 via `redirects()` in `next.config.mjs` (config redirects run before middleware; next-intl's own strip is only a 307). **Footer links point at each resource's canonical URL, not at a `/<locale>/` variant** — only the two bilingual reports take a `/pt` prefix (`ptPrefix` in `site-footer.tsx`); the blog, the other four reports and the EN landing pages are always linked unprefixed, so no internal link targets a URL that canonicalises elsewhere.
- **Sections on the home page link to each other via `#anchor`** (`#hero`, `#demo`, `#what`, `#how`, `#where`, `#packages`, `#cta`).
- **JSON-LD:** `components/json-ld.tsx` exports two components. `<JsonLd>` (in `[lang]/layout.tsx`, so every page) carries **only** site-wide nodes: `Organization` + `WebSite`, wired by `@id`. `<HomeJsonLd lang>` (only `[lang]/page.tsx`) adds the home `WebPage` + `SoftwareApplication`. Page-specific nodes belong to the page: `landing-jsonld.tsx` emits `WebPage` + `BreadcrumbList` + `FAQPage`, blog posts emit `BlogPosting` + `BreadcrumbList` inline.
  Three things the Sept 2026 audit removed — do not put them back: (1) **`WebPage`/`BreadcrumbList` in the site-wide graph** — it described the home page on all 11 landing pages and 6 blog posts, giving each two conflicting `WebPage` nodes and two `BreadcrumbList`s; (2) **six past `Event` nodes injected site-wide** (Feb–Jun 2026, still `EventScheduled` with bookable "Free Entry" offers) — they matched neither the page they sat on nor anything upcoming, and made the site surface for other organisers' event names (`/ethdenver-report`: 406 impressions, 0 clicks in 90 days); (3) **`price: "0"` on all three `SoftwareApplication` offers** — the packages in `data/packages.ts` are quote-only via mailto, so that was pricing the product doesn't have. `SoftwareApplication` now ships no `offers` at all.
- **Static SSG** for all routes except `/feed.xml`, `/opengraph-image` (edge runtime), and `/api/contact` (dynamic). The home routes are server-rendered on demand (cookie reads for A/B + consent).

## SEO notes

- H1 in the hero is **`sr-only`** (the brand is rendered as the `treasure-hunt-logo.png` image). The visible H2s are per section.
- Canonical for the home is `https://www.treasurehunt.pt` (English at root, no `/en` prefix).
- Sitemap (`app/sitemap.ts`, 32 URLs) emits one `<url>` per locale for the home page, each carrying the full six-locale hreflang set plus `x-default`. The two bilingual reports emit an EN and a PT entry (`bilingual: true`). The other 4 reports + the blog are **EN-only**: `en` + `x-default` only, and their `/<locale>/` variants canonical to the EN URL, so those variants are absent from the sitemap entirely. Advertising a non-EN hreflang for English content is a quality-signal problem — keep the `bilingual` flags in sync with each page's `generateMetadata`.
- **Language switcher** (`components/language-switcher.tsx`) is in the navbar (desktop + mobile) and `SiteFooter`, making every locale reachable (`/pt` was once an orphan locale — no internal link pointed into it). It links locale **homes** only. `localeDetection` stays off.
- **Every landing page needs a footer link.** `/scavify-alternative` was omitted from the footer's Solutions list and Search Console reported no referring URLs for it at all. The footer is the only site-wide internal link these pages get — when adding a landing page, add it to `site-footer.tsx` and `app/sitemap.ts` together.
- **Unknown-locale URLs must 404, not 500.** See the `getDictionary` guard under **Locales / i18n**; every single-segment URL containing a dot used to return HTTP 500, and repeated 5xx makes Google throttle crawling site-wide.
- **Caching is fixed (was a P0 SEO drag):** the home + locale routes are static/SSG again (verify with `next build` → `/` shows `○`). The old `private, no-store` came from the server-side A/B cookie read + the middleware cookie-set; both are gone (A/B is client-side now, `proxy.ts` only does locale routing). Do not reintroduce `cookies()` into the home/locale page render path.
- **First-party `Review` JSON-LD was removed** from `components/json-ld.tsx` (self-serving reviews are against Google's review-snippet guidelines). Testimonials remain as on-page content only. Don't re-add Review/AggregateRating without independent, attributable reviews.
- **Contact form** (`app/api/contact/route.ts`) sends via Resend's HTTP API. Requires the operator to set `RESEND_API_KEY` (and verify the `treasurehunt.pt` sending domain in Resend); optionally `CONTACT_EMAIL`. Without the key it returns an explicit 503 (no silent lead drop).
- **Self-serve booking is first-party** (`app/[lang]/book`): our own
  Calendly-style widget (`components/booking-widget.tsx`) on the site's own
  dark theme, backed by two routes that talk to Microsoft Bookings anonymously.
  No Entra app registration, no admin consent, no credentials anywhere.
  - `app/api/slots/route.ts` — `POST <BOOKINGS_BASE>/getStaffAvailability`
    returns live free/busy for the staff id. The public booking page serves
    signed-out visitors, so its backing API is anonymous; verified with a bare
    curl. Slots are Lisbon wall-clock strings and are never parsed as `Date`.
    Query the *Lisbon* date (`lisbonNow()`), not the UTC one — they differ for
    an hour either side of midnight — and filter past slots, since upstream
    happily returns this morning's.
  - `app/api/book/route.ts` — `POST <BOOKINGS_BASE>/appointments`. Microsoft
    enforces email verification server-side, so booking is TWO calls:
    `verificationCode: ""` → `SelfServiceBookingEmailVerificationRequired`
    (which emails a 6-digit code) → same payload with the code → 200, real
    event + Teams meeting. Wrong code → `InvalidCode`. Both failures come back
    as **HTTP 500 with the reason in the body**, not a 4xx. There is no way to
    skip the code step.
  - Copy is dictionary-driven (`booking` object, 29 keys x 6 locales); month
    and weekday names come from `Intl.DateTimeFormat` with the `localeTags`
    BCP-47 tag, not hardcoded arrays. Slot keys are plain calendar strings and
    are never parsed as instants (always `Date.UTC` + `timeZone: "UTC"`).
  - The rest of the team rides along in the `customers` array
    (`BOOKING_ATTENDEES`, defaulting to jrpereira/aandrade/fribeiro) — a
    Bookings-with-me page is a 1:1 product, so that array is the only attendee
    list the API exposes.
  - Ids (`STAFF_ID`, `SERVICE_ID`) come from `GET <BOOKINGS_BASE>/services`.
    Upstream is slow on a cold hit (~14 s), hence the 60 s `revalidate`.
    Availability is the *service's* configured window intersected with the
    calendar, so a narrow meeting-type window silently caps the whole picker.
  - This is an internal Microsoft API, not a documented one. Treat a shape
    change as expected maintenance: `/api/slots` returns 503 and the widget
    falls back to a link.
  Two verified constraints, don't waste time rediscovering them:
  1. **Microsoft's own page cannot be embedded.** `outlook.office.com` and
     `bookings.cloud.microsoft` both serve `frame-ancestors 'self'
     *.office.com teams.microsoft.com …`; an iframe on our domain renders an
     empty box. That is why the widget is first-party.
  2. Creating a *shared* Bookings page (the "Multiple staff" option, which
     would show slots where all three lab members are free) is blocked by NOVA
     IMS IT: `BookingsMailboxCreationEnabled:$false` on the OWA mailbox policy.
- **Contact form** (`app/api/contact/route.ts`) sends via Resend's HTTP API. Requires the operator to set `RESEND_API_KEY` (and verify the `treasurehunt.pt` sending domain in Resend); optionally `CONTACT_EMAIL`. Without the key it returns an explicit 503 (no silent lead drop).
- **Self-serve booking** is a `/book` redirect defined in `next.config.mjs`
  `redirects()` (not a route file: config redirects run before the locale
  middleware, which would rewrite `/book` to `/en/book`). It points at Microsoft
  **Personal Bookings** ("Bookings with me") for `daraujo@novaims.unl.pt`, which
  reads live Outlook free/busy and creates the Teams meeting itself. The
  redirect is deliberately `permanent: false` — the target changes if a shared
  Bookings page replaces it, and a cached 308 would be unfixable. Keep the
  `?anonymous` param (Next serialises it as `anonymous=`, which Microsoft treats
  identically — verified). `components/contact-modal.tsx` links to `/book` under
  the submit button and on the success panel (`contactForm.bookCallHint` /
  `.bookCall`, all six locales).
  Two verified constraints, don't waste time rediscovering them:
  1. **The page cannot be embedded.** `outlook.office.com` and
     `bookings.cloud.microsoft` both serve `frame-ancestors 'self'
     *.office.com teams.microsoft.com …`; an iframe on our domain renders an
     empty box. Open in a new tab, or replace the provider.
  2. Signed-out visitors hit a "Sign in or continue as guest" interstitial
     before any slots appear, and the page is Microsoft-branded light theme.
  Personal Bookings is **1:1 only**. A *shared* Bookings page with the
  "Multiple staff" option is what shows slots where all three lab members are
  free, and creating one is blocked by NOVA IMS IT
  (`BookingsMailboxCreationEnabled:$false` on the OWA mailbox policy).
- **`app/api/slots/route.ts` reads that calendar with no credentials at all.**
  The public Bookings page serves signed-out visitors, so its backing API is
  anonymous: `POST <BOOKINGS_BASE>/getStaffAvailability` returns live free/busy
  for the staff id, verified with a bare curl. That is what makes a first-party
  slot picker possible without an Entra app registration or IT involvement. It
  is an *internal* Microsoft API, so treat a shape change as expected
  maintenance: the route returns 503 on anything unexpected and callers should
  fall back to the `/book` link. Ids (`STAFF_ID`, `SERVICE_ID`) come from
  `GET <BOOKINGS_BASE>/services`. Upstream is slow on a cold hit (~14 s), hence
  the 60 s `revalidate`.
  Availability returned is the *service's* configured window intersected with
  the calendar, so a narrow meeting-type window silently caps the whole picker.

## AI crawlers

`app/llms.txt/route.ts` serves `/llms.txt` as plain text: what the product is,
how it works, the measured per-event results with links to each report, the
technical notes, quote-based packages (no invented prices) and the locale list.
Every figure traces to a report snapshot. Update it when a new event report
ships. It also has to be a route, not a static file: `proxy.ts` skips dotted
paths, so a bare `/llms.txt` had no handler at all.

## Dead internal links

The three snapshot-driven report footers (`cadaval`, `datasummit`,
`smartcities`) linked `/api/report/snapshot`, a route that does not exist and
returns 404, plus an `href="#"` METHODOLOGY placeholder. Both rows are gone.
`lib/*-report.ts` comments no longer claim an API route serves the snapshot.
Check `pnpm lint` for `@next/next/no-html-link-for-pages` before adding an `<a>`
to an internal path.

## Deployment

Vercel project (see `.vercel/`). Build = `pnpm build`, framework = Next.js. `vercel.json` only pins the install/build commands. See `.env.example` for required environment variables.
