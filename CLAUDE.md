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

# Cal.com preflight: confirms the event type resolves, is publicly bookable
# without an API key, and actually returns slots. Read-only, never books.
CALCOM_USERNAME=... CALCOM_EVENT_SLUG=... node scripts/check-booking.mjs
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
- Posts live in `data/blog-posts.ts` (slug/title/description/date/content). 9 posts as of September 2026. The three July posts are event case studies (PSCS trade-fair, Data Summit one-day, Spring Bootcamp teams); the three September posts are the checkpoint-ratio analysis across all six deployments, the Cadaval festival case study and the Future Maker career-fair case study. **Every number must trace to `data/*/report-snapshot.json` or the report TS files, no invented stats** — and check the attribution too, not just the value (the most-found "player-hidden" tag at Future Maker was hidden by `0xchefmike`, i.e. us, not by a student).
- The array is stored oldest-first; the `/blog` hub sorts a copy newest-first at render time. Don't rely on array order for recency anywhere else.
- Posts and the hub carry `robots: { index: false, follow: true }` on off-locale variants (`generateMetadata` reads `lang`), because those serve EN content under a wrong `<html lang>` and already canonical to the EN URL.
- The renderer (`BlogContent` in `app/[lang]/blog/[slug]/page.tsx`) supports `##`, `**bold**`, `*em*`, `- lists`, and `[text](/internal-path)` links (internal only, href must start with `/`). Use those links to point posts at their report + landing pages.
- New posts are picked up by the sitemap automatically, but bump the `/blog` listing `lastModified` in `app/sitemap.ts` when publishing.
- If a stale `.next` incremental cache makes new post routes 404 locally under `next start`, `rm -rf .next && pnpm build` (hit July 2026).

## Report charts

Six reports, two rendering paths, **no chart dependency anywhere**.

- `app/[lang]/{cadaval,datasummit,smartcities}-report/_components/charts.tsx`
  are three near-duplicate copies of the same hand-written SVG module.
  `cadaval` and `datasummit` are byte-identical apart from their `@/lib/*-report`
  import and one comment; **`smartcities` has genuinely diverged** (it adds
  `StackedArea72`, `LorenzCurve`, `HourGrid` and `ReturnerBar`, and its
  `HourLineChart` hardcodes three `MAY 12-14` day labels plus an opening-hours
  band instead of taking `eventDays`). Do not try to merge the three into one
  shared module without rewriting `smartcities`'s report first. The duplication
  is cheaper than that reconciliation.
- `ethdenver`, `futuremaker` and `springbootcamp` are TS-data-driven and import
  **`BarRow` + `Histogram` from the `cadaval` copy** (`../cadaval-report/_components/charts`).
  That is the canonical copy for cross-report reuse: it is the parameterised one
  and `lib/cadaval-report.ts` has no imports of its own, so nothing else rides
  along. Unused exports tree-shake out.
- Rules when adding a chart: a horizontal `BarRow` list beats a pie or donut
  (it reads on mobile and its labels and values are real DOM text, so no
  colour-only encoding); `Histogram` covers every vertical bar chart. Both take
  a `color`, and **`BarRow`'s `color` is a CSS `background`**, so a
  `linear-gradient(...)` string reproduces a gradient bar exactly. `Histogram`'s
  is an SVG `fill`, so gradients there flatten to one colour.
- `Histogram` geometry is load-bearing: bar width is capped at 110 units so a
  1-bin chart is not a full-bleed slab, bars are scaled to `height - 14` so the
  value label never overlaps the tallest bar, and past ~8 bins only every
  `ceil(n/8)`-th bar is labelled (plus always the peak). The `aria-label` always
  enumerates every label/value pair, so nothing is lost to a screen reader.
  Pass `ariaLabel` to prepend the chart's name.
- Never use `HEX.axis` (`#484F58`) for readable text in these charts. Axis and
  value text is `HEX.text` (`#8B949E`).

## Key conventions

- **Home section order** (`page-client.tsx`): Hero → Marquee → SocialProof → **Demo → Features** → Media → HowItWorks → Testimonials → Packages → FAQ → CTA → Footer (proof-first: Demo precedes Features). Section eyebrow ordinals ("01 / Demo", "02 / Features", …) are hand-numbered in the dictionaries to match this DOM order — renumber them if you reorder sections. `SectionDivider`/`Reverse` gradients track the bg bands; Features and Media are both `#06080F` so they sit adjacent with no divider.
- **Two corals, and the split is a contrast rule, not taste.** `#C9433F` is the
  **button** coral: white on it is 4.82:1 (AA); white on `#F0605D` is only
  3.21:1, which failed AA on every primary CTA. So any surface carrying white
  text or a white icon uses `bg-[#C9433F]`, and `#F0605D` stays for decoration
  that carries no text — section dashes, the navbar underline, the carousel
  pill, gradients and glows. The rule in code is literal: if a className has
  both `bg-[#F0605D]` and `text-white`, it is a bug.
- **Accent system:** coral (`#F0605D`→`#FF9A76`) is the brand accent — logo, headings, CTAs, section eyebrows + dashes, demo stat numbers, the how-it-works callout. Blue (`#58A6FF`) is reserved for *functional* tints only (feature/infra icons, packages category labels/notes). Don't use blue for navigational/brand emphasis.
- **Dark-theme text colors:** body `#E6EDF3`, secondary `#8B949E`, muted `#7D8590` (the `--text-muted` token — was `#484F58`, which failed WCAG AA at ~2.4:1 on the near-black bg). Don't reintroduce `#484F58` for readable text. Keyboard focus uses one global `:focus-visible` coral outline in `globals.css` — don't add bare `focus:outline-none` without a replacement.
- **next/image + transparent PNG + AVIF gotcha:** Next's AVIF encoder can flatten a transparent PNG's alpha to opaque black at *some* widths (hit on `cadaval-festival-logo.png` at w=256, fine at 384/640). If a transparent logo renders with a black box, set `unoptimized` on that `<Image>` (it serves the PNG as-is). Clearing `.next/cache/images` alone is not enough — the dev server caches optimized variants in memory.
- **Metadata is generated per-locale** in `app/[lang]/layout.tsx` from the `homeMeta` map. Each page-level `Metadata` adds its own `alternates` (canonical + hreflang) and OG/Twitter card images. Report pages use `generateMetadata` for locale-aware copy. Keep meta descriptions ≤ ~158 chars and `<title>` ≤ ~60 — the June 2026 audit found blog titles at 85–98 chars because `generateMetadata` appended `" | Treasure Hunt Blog"`; that suffix is gone, don't re-add it.
- **og:image gotchas (two, both hit in the June 2026 SEO audit):** (1) the `proxy.ts` matcher must exclude `opengraph-image` — the path has no file extension, so without the exclusion next-intl rewrites it to `/[lang]/opengraph-image` → 404. (2) A child segment's `openGraph` object replaces the parent's **wholesale**, so any `openGraph` block without `images` silently drops the OG image — always include `images` (default: `https://www.treasurehunt.pt/opengraph-image`) when defining `openGraph` in a new page's metadata.
- **Home page composition lives in `components/page-client.tsx`.** `app/[lang]/page.tsx` is the only entry point (see **Root layout**): it resolves the dictionary, renders `<PageClient dict lang>` and `<HomeJsonLd lang>`. Pass `lang` through to `SiteFooter` so its link prefixes are correct.
- **Booking is the primary CTA.** Every "Plan Your Event" button opens
  `components/plan-event-modal.tsx` (renamed from `contact-modal.tsx`) on its
  **booking** tab: the slot picker, with the first open day preselected. The
  message form is the secondary tab behind `contactForm.messageHint/messageLink`.
  The modal is a native `<dialog>` + `showModal()` — that is where the focus
  trap, Escape, inert background and focus restore come from; do not hand-roll
  them again.
- **Booking backend: Cal.com, with Microsoft Bookings as a fallback.** Setting
  `CALCOM_USERNAME` + `CALCOM_EVENT_SLUG` switches both booking routes to
  Cal.com (`lib/calcom.ts`); without them they use the old Microsoft path.
  **Neither Cal.com call needs an API key while the event type is public** —
  verified by a bare unauthenticated POST, which returned field-level validation
  rather than 401. `CALCOM_API_KEY` is sent only if set.
  Verified live 2026-09-16:
  `GET /v2/slots?eventTypeSlug=&username=&start=&end=&timeZone=` with header
  `cal-api-version: 2024-09-04` → `{ data: { "YYYY-MM-DD": [{ start: ISO }] } }`,
  **0.21–0.56 s** for a 60-day window; `POST /v2/bookings` with header
  `cal-api-version: 2026-02-25`. Note the two endpoints take **different**
  version headers. Asking for `timeZone=Europe/Lisbon` means `start.slice(0,16)`
  is already the Lisbon wall-clock the widget wants — no Date parsing.
  `lisbonToUtcIso()` converts back for the booking POST and resolves the offset
  from the instant (Lisbon is +00/+01), so it is correct across DST.
  Why the migration: **Microsoft forces a 6-digit emailed verification code on
  every self-service booking, server-side and unskippable**, putting an inbox
  round-trip in the middle of the funnel. Cal.com books in one POST, so the
  widget's `code` stage is simply never reached.
  Once Cal.com is live in production, delete the blocks marked
  `ponytail: Microsoft Bookings fallback` in both routes.
- **The widget's meeting location comes from `/api/slots`** (`location` field),
  not a hardcoded string — it said "Microsoft Teams" while Cal.com would create
  a Cal Video link. Override with `CALCOM_LOCATION`.
- **`/api/slots` must never be on a visitor's critical path.** Microsoft's
  `getStaffAvailability` takes ~15 s on EVERY call, warm or cold (measured 13.9 /
  15.5 / 15.4 s). The route is therefore `dynamic = "force-static"` +
  `revalidate = 300`, so it is prerendered and regenerated in the background:
  verified at 1.8 ms served vs 15.4 s upstream. Two consequences, both load-bearing:
  (1) the response body **must not depend on the time it was generated** — that is
  why past slots are filtered client-side in `booking-widget.tsx`, not in the route;
  (2) do not add a `cache:` option to the inner `fetch` — under `force-static`
  Next pins a `no-store` fetch to `force-cache` and the Data Cache entry freezes.
  `lib/slots.ts` memoises one request per page load; `PageClient` and `LandingPage`
  call `getSlots()` on mount so the picker opens already filled (~40 ms click → times).
- **An abandoned booking still produces a lead.** Microsoft forces a 6-digit
  emailed verification code and there is no way to skip it, so `app/api/book`
  mails the name/email/slot through `lib/notify.ts` at the `code_sent` branch.
  Before that, anyone who stopped at the code step was lost silently.
- **There is no A/B test.** `lib/ab-test.ts` was deleted (Sept 2026): the
  hero-CTA experiment could not reach significance at this traffic level, so it
  was pure complexity in `page-client.tsx`. The surviving behaviour is the old
  `control` arm — the hero primary CTA opens the booking modal directly, which
  is the right call now that it paints in ~40 ms. The dead `secondaryIsButton` /
  `onSecondaryAction` / `trustBadgeClassName` props went with it, and the
  secondary CTA is now unconditionally the link. If an experiment is ever
  reinstated, keep the variant resolution **client-side**: `cookies()` on the
  server would opt the home + locale routes into dynamic rendering and force
  `private, no-store`, which is the P0 caching regression this file records.
- **Analytics:** GA4 (`components/ga4-script.tsx`) and PostHog
  (`components/posthog-provider.tsx`) are both gated behind cookie consent
  (`lib/consent-context.tsx`). **Components must import `capture` from
  `lib/posthog.ts`, never `usePostHog` from `posthog-js/react`** — the latter is
  a static import of the whole 57 KB gz library, which put PostHog in the
  first-load JS of every page and started it before consent. `lib/posthog.ts`
  holds a module singleton loaded by a dynamic `import()` only once consent is
  granted; pre-consent events are dropped, not queued. `ConsentProvider` must
  stay OUTSIDE `PostHogProvider` in the layout.
- **No unthrottled scroll listeners.** `hooks/use-scroll-position.ts` was deleted:
  it called `setState` per scroll event and one consumer lived inside
  `PageClient`, so every tick reconciled the whole home tree. The navbar writes
  its progress bar straight to the DOM via a ref inside a rAF; the sticky bar and
  the analytics hook keep a boolean / no state at all. Don't reintroduce a hook
  that puts a continuous scroll number into React state.
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
  equal to the real file dimensions or the reserved box is wrong and the image
  shifts on load. **Both marks are now 1600x682** — they were 6250 px sources
  (410 KB / 217 KB) rendered at 720 px and 240 px, and the navbar and landing
  header additionally declared `240x32` (7.5:1) for a 2.35:1 asset. If you
  re-export either PNG, update `width`/`height` at every call site together.
- **Internal links must use `next/link`** (not `<a>` for non-anchor navigation) so the locale prefix logic can stay simple.
- **PT copy uses proper PT-PT diacritics** (`dictionaries/pt.json` and the PT metadata in `app/[lang]/layout.tsx`). Don't add new PT strings without accents.
- **Locale prefix:** `en` is at `/`; `pt`, `es`, `it`, `de`, `fr` are at `/<locale>/...`. `/en/*` → `/*` is a permanent 308 via `redirects()` in `next.config.mjs` (config redirects run before middleware; next-intl's own strip is only a 307). **Footer links point at each resource's canonical URL, not at a `/<locale>/` variant** — only the two bilingual reports take a `/pt` prefix (`ptPrefix` in `site-footer.tsx`); the blog, the other four reports and the EN landing pages are always linked unprefixed, so no internal link targets a URL that canonicalises elsewhere.
- **Sections on the home page link to each other via `#anchor`** (`#hero`, `#demo`, `#what`, `#how`, `#where`, `#packages`, `#cta`).
- **JSON-LD:** `components/json-ld.tsx` exports two components. `<JsonLd>` (in `[lang]/layout.tsx`, so every page) carries **only** site-wide nodes: `Organization` + `WebSite`, wired by `@id`. `<HomeJsonLd lang>` (only `[lang]/page.tsx`) adds the home `WebPage` + `SoftwareApplication`. Page-specific nodes belong to the page: `landing-jsonld.tsx` emits `WebPage` + `BreadcrumbList` + `FAQPage`, blog posts emit `BlogPosting` + `BreadcrumbList` inline.
  Three things the Sept 2026 audit removed — do not put them back: (1) **`WebPage`/`BreadcrumbList` in the site-wide graph** — it described the home page on all 11 landing pages and 6 blog posts, giving each two conflicting `WebPage` nodes and two `BreadcrumbList`s; (2) **six past `Event` nodes injected site-wide** (Feb–Jun 2026, still `EventScheduled` with bookable "Free Entry" offers) — they matched neither the page they sat on nor anything upcoming, and made the site surface for other organisers' event names (`/ethdenver-report`: 406 impressions, 0 clicks in 90 days); (3) **`price: "0"` on all three `SoftwareApplication` offers** — the packages in `data/packages.ts` are quote-only via mailto, so that was pricing the product doesn't have. `SoftwareApplication` now ships no `offers` at all.
- **Static SSG** for everything except `/api/book` and `/api/contact`.
  `/api/slots`, `/feed.xml`, `/llms.txt` and `/opengraph-image` are all
  prerendered (`○`). **`/opengraph-image` must not declare `runtime = "edge"`:**
  on Vercel it threw `NEXT_DEPLOYMENT_ID is missing but runtimeServerDeploymentId
  is enabled` and served **HTTP 500 for three days**, killing every og:image,
  twitter:image and `BlogPosting.image` on the site, while working fine locally.
  `next/og` runs on Node; edge is the legacy target.

## SEO notes

- The hero has a **visible `<h1>`** (`hero-section.tsx`); the visible H2s are per
  section. It is deliberately **not** animated, and neither is the LCP logo: the
  hero used to be five framer `initial={{opacity:0}}` wrappers, which is inline
  `opacity:0` in the prerendered HTML, so nothing above the fold painted until
  ~260 KB of JS had hydrated. The supporting lines fade in via the `.hero-rise`
  CSS keyframe in `globals.css` (which the existing `prefers-reduced-motion`
  block neutralises for free). Don't put `motion.*` back around the logo or h1.
- Canonical for the home is `https://www.treasurehunt.pt` (English at root, no `/en` prefix).
- Sitemap (`app/sitemap.ts`, 39 URLs) emits one `<url>` per locale for the home page, each carrying the full six-locale hreflang set plus `x-default`. The two bilingual reports emit an EN and a PT entry (`bilingual: true`). The other 4 reports + the blog are **EN-only**: `en` + `x-default` only, and their `/<locale>/` variants canonical to the EN URL, so those variants are absent from the sitemap entirely. Advertising a non-EN hreflang for English content is a quality-signal problem — keep the `bilingual` flags in sync with each page's `generateMetadata`.
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
- **`/book` is a real page, not a redirect** (`app/[lang]/book`). It is
  `noindex, follow` and linked from the footer Contact column — it is the
  *shareable* booking URL (you can paste it in an email; a modal you cannot), so
  keep that link. The same `BookingWidget` powers it and the modal; on `/book`
  its heading is the page `h1`, in the modal (`compact`) it drops to `h2`.


## Sept 2026 audit — things that were wrong, don't reintroduce

- **`runtime = 'edge'` on `app/opengraph-image.tsx`** returned HTTP 500 on
  Vercel for three days while working locally. See **Static SSG** above.
- **PostHog before consent.** See **Analytics** above.
- **Hero rendered at `opacity:0`.** See the H1 note under **SEO notes**.
- **hreflang said `pt`, the sitemap said `pt-PT`.** Google discards a pair whose
  two annotations disagree. `i18n/config.ts#localeTags` is the single source —
  use it in `lib/landing/metadata.ts` and the two bilingual report pages rather
  than writing a locale code by hand.
- **Landing-page JSON-LD hardcoded `inLanguage: "en"`** for the ES/IT/DE/FR
  pages, contradicting `<html lang>`. Now `localeTags[content.locale]`.
- **Off-locale landing variants.** The 15 landing routes prerender under all six
  locales (90 URLs), so `/es/nfc-treasure-hunt` serves English inside
  `<html lang="es">`. `landingMetadata(content, lang)` now marks any
  `lang !== content.locale` variant `noindex, follow`. Each route passes `lang`
  via `generateMetadata` — keep that when adding a landing page.
- **The three snapshot reports linked nowhere.** Their `_components/site-header`
  brand mark pointed at `#headline`; it is now a `next/link` to `/`. Use
  `next/link`, not `<a>`, or `@next/next/no-html-link-for-pages` fails lint.
- **Published stats didn't reconcile. The verified sums across the six reports are:**

  | figure | sum | source |
  |---|---|---|
  | treasure finds | **14,885** | 992 + 2,591 + 8,123 + 2,182 + 220 + 777 |
  | checkpoints / tags | **401** | 59 + 115 + 103 + 57 + 42 + 25 |
  | players | **1,027** | 207 + 265 + 351 + 126 + 20 + 58 |
  | reward tokens minted | **1,794,280** | 462,255 + 1,024,700 + 159,000 + 76,775 + 45,650 + 25,900 |

  The site had claimed "10,000+ finds, 500+ checkpoints, 500+ players": two
  understated and **checkpoints overstated**. Now 14,000+ / 400+ / 1,000+ in
  `hero.trustBadge` and `demo.stats` across all six dictionaries, with the exact
  sums in `llms.txt`. **"1.7M+ Rewards Minted" is correct** (1,794,280) — an
  earlier pass wrongly flagged it as unsupported. `llms.txt` had also omitted
  Future Maker's 265 players entirely, which is why the player figure looked
  like 762. Re-run the arithmetic whenever a report ships; per-event mint
  figures live in `data/<event>-report.ts` (`HERO_STATS`) and
  `data/<event>/report-snapshot.json` (`kpis.tokensDistributed`).
  `demo.stats` still says "8 Events" while six have public reports — that is the
  deployment count, not a report count, and `llms.txt` now says so explicitly.
- **Accessibility.** The modal is a native `<dialog>`; every form field has an
  accessible name; the date picker uses `aria-current`, not `aria-pressed`;
  async outcomes carry `role="status"` / `role="alert"`; the sticky bar is
  `inert` while hidden; nav/footer sit OUTSIDE `<main>` (a `<header>` inside
  `<main>` is not exposed as `banner`) and there is a skip link in the layout.
  Framer's infinite loops read `useReducedMotion()` — the `globals.css`
  reduced-motion block only reaches CSS animations, never framer's inline styles.

### Known, deliberately not done
- **framer-motion (51 KB gz)** still ships on the home + 11 landing pages for a
  background gradient loop, `SpotlightCard`, `TextShimmer` and `NumberTicker` —
  all of which are CSS-expressible.
- `public/media/interview.mp4` is 18 MB (`preload="none"`, so only on click) and
  `public/datasummit-venue-map.png` is 2.2 MB (a link target, not rendered inline).

## Sept 2026, second pass — dependency and dead-code removal

- **framer-motion is gone** (was 51 KB gz on the home + 11 landing pages). All
  five uses were CSS or platform features:
  `spotlight-card` writes two CSS custom properties in its mousemove instead of
  `useMotionTemplate`; `text-shimmer` and the hero/landing background drifts are
  `@keyframes` in `globals.css` (`text-shimmer`, `ambient-a`, `ambient-b`);
  `number-ticker` is an IntersectionObserver plus a rAF loop that writes
  `textContent`, so a 60 fps count still costs zero React renders.
  Two bugs died with it: the backgrounds were interpolating a full
  `radial-gradient` **string** on the main thread forever, and `TextShimmer`
  called `motion.create()` in its render body, creating a new component type and
  remounting the subtree on every render. CSS animations also finally honour the
  `prefers-reduced-motion` block in `globals.css`, which never reached framer's
  inline styles.
- **Deleted as dead:** `components/use-cases-section.tsx`, `data/use-cases.ts`,
  `data/nav-links.ts`, `hooks/use-animated-counter.ts`, `hooks/use-scroll-position.ts`,
  `data/demo-stats.ts`. `nav-links.ts` was the only thing pointing at `#where`,
  an anchor whose section nothing rendered, so that broken link is gone too
  (and `"where"` is out of `SECTION_IDS` in `use-analytics-tracking.ts`).
  Deleting `use-cases-section.tsx` also removed 7 of the repo's lint errors.
- **`#484F58` is gone from every readable-text position** (blog post dates, the
  og:image footer, the scrollbar thumb, the `TextShimmer` default). It survives
  only on the marquee's 1x1 decorative dot and the report chart axes.
- **CSP** is in `next.config.mjs`. It deliberately keeps `'unsafe-inline'` for
  scripts: Next's bootstrap, the GA4 tag and the JSON-LD blocks are all inline,
  and the nonce alternative forces per-request rendering, which would undo the
  static SSG that CLAUDE.md records as a P0 SEO fix. It still blocks scripts
  from any host but ours and GTM, `<base>` hijacking, offsite form posts, object
  embeds and framing. PostHog needs no entry — it is proxied same-origin via
  `/ingest`. Treat it as defense in depth, not a complete XSS mitigation.
- **Conversion:** the demo section now takes `onOpenContact` + `ctaLabel` and
  renders a booking CTA after the event grid. The A/B variant's hero button
  scrolls there, and before this every exit from that section was outbound or
  lateral. The packages tier a visitor clicked is carried into the modal
  (`packageTier`) and seeds the booking notes, so it reaches the calendar invite
  instead of being analytics-only.
- **recharts is gone** (was 115 KB gz on `/ethdenver-report`,
  `/futuremaker-report`, `/springbootcamp-report`; that page's first-load JS went
  258.8 → 143.5 KB gz). Those three now import `BarRow` and `Histogram` from
  `app/[lang]/cadaval-report/_components/charts.tsx`, the same hand-written SVG
  module the snapshot reports use. See **Report charts** for the rules.
- **Videos** were re-encoded (`-movflags +faststart`, audio dropped from the two
  muted autoplay tiles): `gameplay-tap` 6.2 → 0.70 MB, `winner-reaction`
  2.1 → 0.61 MB, `comic-quest` 15 → 8.9 MB, `interview-teaser` 5.0 → 3.0 MB,
  `interview` 18.4 → 16.1 MB. Originals are in git history if quality regresses.

### Still not done
- **recharts** (115 KB gz on the three TS-driven reports).
- `public/datasummit-venue-map.png` is 2.2 MB, but it is a link target, not
  rendered inline, so it costs nothing until clicked.
- `hero-section.tsx` and `cta-section.tsx` both send "See it live" to
  `hunt.ethdenver.com` in a new tab. It is the only CTA competing with the
  primary one at the top AND bottom of the funnel. Pointing it at `#demo` was
  suggested; left alone because a live hunt is genuine proof and that is an
  editorial call.

## Two gotchas that bit during the Sept 2026 work

- **`demo.stats` values and labels are SEPARATE JSON fields.** A find/replace on
  `"500+ Venue Checkpoints"` silently matches nothing, because the file holds
  `{ "value": "500+", "label": "Venue Checkpoints" }`. The hero badge is one
  string and the demo stats are not, so a stat correction has to touch both, and
  the demo values need per-locale separators (`14,000+` en, `14.000+` pt/es/it/de,
  `14 000+` fr, and `1,7M+` rather than `1.7M+` everywhere but en).
  When editing the dictionaries programmatically, patch them **line by line**:
  re-serialising with `json.dumps` unescapes every `\uXXXX` and expands the
  compact `{ "value": …, "label": … }` objects, which turned a 40-line change
  into an 800-line diff across six files.
- **`PlanEventModal` renders its `<dialog>` (and therefore `BookingWidget`) even
  while closed**, so `useState(initialNotes)` had already run with `""` by the
  time a packages CTA set the tier. The widget carries
  `key={packageTier ?? "default"}` to remount on a tier change. If you add
  another prop that seeds state, it needs the same treatment.
- **`HEX.axis` (`#484F58`) in the report `charts.tsx` files is for LINES only.**
  It was also being used as a text `fill` for tick and category labels at
  2.42:1; those now use `HEX.text` (`#8B949E`). The distinction is commented in
  all three copies — don't collapse them back together.

## Booking is LIVE on Cal.com (configured 17 Sep 2026)

Set in Vercel for production, preview and development:

```
CALCOM_USERNAME=treasurehunt
CALCOM_EVENT_SLUG=30min
CALCOM_EVENT_MINUTES=30
CALCOM_LOCATION=Cal Video
BOOKING_ATTENDEES=jrpereira@novaims.unl.pt,aandrade@novaims.unl.pt,fribeiro@novaims.unl.pt
```

**`vercel env pull` reads these back as EMPTY.** They are stored sensitive, so
the pull redacts them; it is NOT a sign the value is missing. This nearly caused
a working production config to be "fixed" into a broken one. To check a value,
either read it in the Vercel dashboard (Settings -> Environment Variables) or
deploy with no local `.env.local` present and assert on behaviour: if
`CALCOM_USERNAME` were genuinely empty, `/api/slots` would fall back to
Microsoft and report `location: "Microsoft Teams"` instead of `"Cal Video"`.
Also note `vercel env add` is non-interactive by default for an agent, so a
piped stdin value is ignored silently while the command still reports success.
Use `--value`.

The Cal.com account is the `daraujo@novaims.unl.pt` one; its public profile is
already named "Treasure Hunt". Outlook Calendar is connected and **conflict
checking is enabled on the main `Calendário`**, so real busy time blocks slots.
Availability is the default "Horário de trabalho" schedule, Mon-Fri 09:00-17:00
Europe/Lisbon. Conferencing is Cal Video (hence `CALCOM_LOCATION`).

**Verified end to end on 17 Sep 2026**, not just read-only: a booking POST to
`/api/book` returned `{"status":"booked"}` in 2.2 s with **no verification
code**, created a real 16:30-17:00 WET event on the calendar for the requested
Lisbon wall-clock (so `lisbonToUtcIso` is correct against a live calendar), and
was then cancelled. The Microsoft path required a 6-digit emailed code and could
not do this in one call. That test ran with `BOOKING_ATTENDEES=""` so no
colleague was emailed — do the same for any future write test.

The `ponytail: Microsoft Bookings fallback` blocks in `app/api/slots/route.ts`
and `app/api/book/route.ts` are now dead in every deployed environment. They can
be deleted along with `BOOKINGS_BASE`, `STAFF_ID`, `SERVICE_ID`, `slotsIn` and
`toMinutes`.

### CSP is environment-aware
`next.config.mjs` adds `https://vercel.live` (plus pusher for its websocket) to
script/connect/img/frame/style/font **only when `VERCEL_ENV !== 'production'`**.
Vercel injects its feedback toolbar from that host on previews only, and the
first CSP shipped blocked it. Production stays on the tighter policy, since it
never loads that script. If a preview toolbar or comment widget stops working,
check this list before loosening anything in production.

### Analytics
`NEXT_PUBLIC_GA_ID` (`G-L1L0PXVCVX`) existed **only in the Preview
environment**, so GA4 never ran on the live site. It is now set in Production
and Development too, and verified live: zero Google requests before consent, the
gtag script loads after Accept. `NEXT_PUBLIC_POSTHOG_KEY` is still **not set
anywhere**, so PostHog does not run at all — the consent-gated dynamic import is
correct and tested, but it needs a project key to do anything.

### The team rides along as Cal.com guests
`BOOKING_ATTENDEES` is passed to Cal.com's `guests[]` array, verified end to end
on 17 Sep 2026: a booking made with a guest address showed that address under
"Quem" on the Cal.com booking page alongside the host and the attendee. The test
used a throwaway address rather than the three colleagues so nobody was emailed;
do the same for any future write test. The chain is verified in three places
(the route passes `TEAM_ATTENDEES`, Cal.com attaches the guest, the Vercel var
holds all three addresses) but a live production booking with the real three has
deliberately not been run, because it would send each of them an invite and a
cancellation.

## No personal name is exposed anywhere (17 Sep 2026)

The Cal.com display name was already "Treasure Hunt"; the full name only
appeared in the auto-generated username, i.e. the public URL. That username is
now **`treasurehunt`**, so the page is `cal.com/treasurehunt/30min` and
`curl`ing it finds zero occurrences of the personal name. Changing it means
`CALCOM_USERNAME` must change with it, or `/api/slots` 503s and the widget drops
to its fallback.

**The full name in the confirmation email was from the retired Microsoft
Bookings flow, not Cal.com.** Verified by reading the actual mailbox: the
8 Sep messages are `From: Dinis Antunes Palha de Araujo` with subject
"New booking: … - 30 minutes meeting", while every Cal.com message (17 Sep) is
`From: "Cal.com" <hello@cal.com>` with `Organizer: Treasure Hunt`, and even the
Exchange-generated cancellation reads `From: Treasure Hunt`. Nothing further to
change; older mail in the inbox still shows the old name because it predates the
migration.

`booking-widget.tsx`'s failure-state link pointed at the retired Microsoft
Bookings URL until now; it is `https://cal.com/treasurehunt/30min` and has to be
kept in step with `CALCOM_USERNAME` / `CALCOM_EVENT_SLUG` by hand.

## Email / DNS facts (checked 17 Sep 2026)

- **SPF is already correct and lives on a subdomain.** Resend uses its
  subdomain pattern here: `send.treasurehunt.pt` holds both the MX
  (`feedback-smtp.eu-west-1.amazonses.com`) and `v=spf1 include:amazonses.com
  ~all`, while `resend._domainkey.treasurehunt.pt` signs as `treasurehunt.pt`.
  Lead mail therefore passes SPF on the envelope domain and passes DMARC through
  DKIM alignment. `_dmarc.treasurehunt.pt` is `v=DMARC1; p=none;` (an earlier
  note in this file saying there was no DMARC record is out of date).
  **The apex has no SPF and does not need one yet** — nothing sends from
  `@treasurehunt.pt` directly. It will need one the moment a mailbox exists, and
  that record must include the mailbox provider, so do not add a
  Resend-only apex SPF in the meantime.
- **treasurehunt.pt has no MX at the apex, so it cannot receive mail.** Anything
  sent to `leads@treasurehunt.pt` bounces today; the address is send-only.
- **DNS is at Hostinger** (`ns1/ns2.dns-parking.com`), managed in hpanel. The
  Hostinger account has **no email plan** — the Emails section shows the sales page.

## Cal.com: the destination calendar cannot be removed

"Adicionar eventos a" offers exactly one value, the connected Outlook calendar;
there is **no None option**. The only way to drop it is to disconnect the
Outlook Calendar app, and that same connection is what powers conflict checking,
so doing it would start offering slots on top of real meetings. Do not do it.

The Outlook invite's `From` name is the Microsoft 365 mailbox display name
("Dinis Antunes Palha de Araujo"), set by Exchange when it mails the attendees;
Cal.com cannot override it. Two settings look like they would help and do not:
"Mostrar o e-mail 'Adicionar ao calendário' como organizador" (Setup tab) and
"Email personalizado para 'Responder a'" (Confirmation tab).

**The fix is a second calendar.** Point Cal.com's destination at a
`treasurehunt.pt` calendar whose display name is "Treasure Hunt", and keep the
NOVA Outlook connected for conflict checking only. Nothing is lost and the
invite carries the right name. Note the event-type tabs are now
setup / availability / bookingForm / confirmation / appearance / payment /
recurring / limits / reschedule / privacy / apps / workflows / webhooks —
`?tabName=advanced` no longer exists and renders an empty pane.

## Zoho mailbox at treasurehunt.pt (17 Sep 2026)

Free Zoho Mail (EU data centre, `mailadmin.zoho.eu`). Mailbox
**`admin@treasurehunt.pt`**, display name **"Treasure Hunt"**, Calendar service
enabled. Aliases `leads@` and `hello@` added, so **mail to
`leads@treasurehunt.pt` is now delivered instead of bouncing** — that address
was send-only before.

DNS at Hostinger, all verified live:

```
MX    treasurehunt.pt   mx.zoho.eu (10), mx2.zoho.eu (20), mx3.zoho.eu (50)
TXT   treasurehunt.pt   v=spf1 include:zohomail.eu ~all
TXT   treasurehunt.pt   zoho-verification=zb67157017.zmverify.zoho.eu
TXT   zmail._domainkey  (Zoho DKIM)
```

The apex SPF include is **`zohomail.eu`, not `zohomail.com`** — Zoho's public
docs only document the `.com` value. Both resolve, but only `spf.zohomail.eu`
expands to the EU sending ranges this account actually uses. `~all` (softfail)
is deliberate, matching `send.treasurehunt.pt`. The Vercel A/CNAME, Resend DKIM,
`send.` subdomain and DMARC were all left untouched and the site stayed up.

### Connecting the Zoho calendar to Cal.com: use CalDav, NOT the Zoho app
**Cal.com's hosted Zoho Calendar app does not work for an EU-DC account.** Its
OAuth goes to `accounts.zoho.com`; the `.eu` session does not carry there and it
demands a fresh password for an account that only exists on `.eu`. Confirmed by
attempting it. Don't retry that path.

Use Cal.com's **CalDav** app instead (`/apps/caldav-calendar/setup`), which takes
exactly three fields:

```
URL do calendário   https://calendar.zoho.eu/caldav
Nome de utilizador  admin@treasurehunt.pt
Senha               <Zoho APPLICATION-SPECIFIC password>
```

The URL is verified: a `PROPFIND` to `https://calendar.zoho.eu/caldav` returns
`401 www-authenticate: Basic realm="Zoho Calendar"` (note: no trailing slash —
with one it returns 400). The password must be an app-specific password, not the
account password, generated at `accounts.zoho.eu/home#security/device`. Zoho
treats that page as a sensitive operation and forces a password re-auth, so it
cannot be automated.

Once connected: set it as "Adicionar eventos a" and leave the NOVA Outlook
connected for **conflict checking only**. That is what makes the calendar invite
come from "Treasure Hunt" instead of the personal Microsoft display name.

## Cal.com: Portuguese holidays now block bookings
"Feriados de Portugal" is toggled ON in the conflict-check list (was off), so a
public holiday no longer shows as bookable. The four toggles render with no
usable text labels in the DOM, so target them by position after asserting the
on-screen label order: index 0 Calendário, 1 Feriados de Portugal,
2 Aniversários, 3 United States holidays.

## Inbound mail verified
A message sent from `daraujo@novaims.unl.pt` to `leads@treasurehunt.pt` arrived
in the Zoho inbox in about 8 seconds. Inbound delivery works end to end; that
address used to bounce. (Port 25 is blocked from the dev machine, so an SMTP
RCPT probe is not a usable check — send a real message instead.)

## Accounts created 17 Sep 2026 — state and blockers

**PostHog (`admin@treasurehunt.pt`, org "Treasure Hunt", EU region).** The
account exists and the password works, but it is **stuck on email
verification**: PostHog's 6-digit code never arrived at the new Zoho mailbox
after three sends over ~20 minutes, and it is in no folder (inbox, spam,
newsletter, notification, archive, trash). A brand-new domain with no sending
reputation is the likely cause. Until it is verified there is no project API
key, so `NEXT_PUBLIC_POSTHOG_KEY` is still unset and PostHog does not run.
GA4 (`G-L1L0PXVCVX`) IS live in Production and verified: zero Google requests
before consent, gtag loads after Accept.

**Zoho app-specific password — blocked.** Generating one at
`accounts.zoho.eu/home#security/device` needs an account-password re-auth that
Brave does not autofill, and resetting the password was refused by the agent's
own credential guardrail. That is the ONLY thing standing between here and the
Cal.com CalDav connection, i.e. the invite-name fix. Everything else for it is
verified and waiting (URL, username — see the CalDav section above).

**Do not "fix" the stats or SPF again.** Both were corrected against primary
sources this session; see the tables above for the arithmetic and the
subdomain-SPF explanation.

## The invite-name fix is confirmed working (17 Sep 2026)

Cal.com writes bookings to the **Zoho** calendar over CalDav, so Exchange no
longer generates an invite from the NOVA mailbox. Proof, from the attendee's
inbox before and after the switch:

```
14:14  Treasure Hunt <hello@cal.com>
14:14  Dinis Antunes Palha de Araujo <daraujo@novaims.unl.pt>   <- the Exchange invite
22:31  Treasure Hunt <hello@cal.com>                            <- after; nothing else
```

The attendee now receives ONE email instead of two, and no personal name appears.
Cal.com's primary account email is `hello@treasurehunt.pt` (verified);
`daraujo@novaims.unl.pt` remains as an unverified secondary, which is harmless.

`daraujo@novaims.unl.pt` is in `BOOKING_ATTENDEES` so bookings still reach the
NOVA calendar as a guest invite — without that, moving the destination to Zoho
would have silently stopped bookings appearing on the work calendar.

**Zoho free has NO email forwarding**, per-mailbox or org-level: both say
"available only for paid plans". Mail to `admin@`/`hello@`/`leads@` lands in
Zoho webmail only. Options if that is not acceptable: Zoho Mail Lite
(~EUR2.70/user/month, adds forwarding AND IMAP so it appears in Apple Mail), or
move MX to Cloudflare Email Routing (free forwarding, keeps Zoho for the
calendar since CalDav does not depend on MX) — but that needs the domain moved
to Cloudflare nameservers and every record re-created, which risks the live site.

Availability is genuinely checked against the real Outlook calendar: 2026-11-16
offers 13 slots (12:00-13:00 and 16:30 blocked by real meetings) while 2026-11-17
offers the full 16. A booking attempt on a busy slot returns Cal.com
`ConflictException` and the route answers 409/502 — that is correct behaviour,
not a bug. Note `/api/slots` is cached 5 min, so its list can be briefly stale.

## Why booking emails come from hello@cal.com, and what can change it

`hello@cal.com` is **not** a side effect of moving the destination calendar — it
was always Cal.com's sender. Before the switch the attendee got TWO emails:

```
Treasure Hunt <hello@cal.com>                           <- Cal.com, unchanged throughout
Dinis Antunes Palha de Araujo <daraujo@novaims.unl.pt>  <- Exchange, the one with the name
```

Moving the destination to Zoho removed the second. Zoho over CalDAV does not
generate its own invitation email, so only Cal.com's remains.
**Reverting the destination to Outlook would bring the personal name back** — do
not do it to "fix" the sender address.

On the free plan the From address cannot be changed. Cal.com's custom SMTP is an
**organization-level** feature, so sending as `@treasurehunt.pt` needs a paid
Organizations plan; the SMTP credentials could then point at Resend, which
already has `treasurehunt.pt` verified for the contact form.

What IS set, and is free: **custom Reply-To = `hello@treasurehunt.pt`**
(event type -> Confirmation -> "Email personalizado para 'Responder a'"; the
dropdown only offers the primary/secondary emails from the Cal.com profile,
which is why `hello@treasurehunt.pt` had to be added and verified there first).
So a lead sees "Treasure Hunt" as the sender name and any reply goes to the
company domain.

## The booking modal must explain itself, on every screen size

An earlier `compact` prop hid the summary rail below `lg`, which left phone
visitors looking at a bare date grid with no heading and no explanation of what
they were booking. The rail is now **always rendered**; on small screens it
collapses to a header with the duration/location/timezone on one wrapping row.
`compact` now only selects the heading level (`h1` on /book, `h2` in the modal,
where the page already owns the h1).

Two lines of copy answer the questions the picker was silently asking
(`booking.howItWorks`, `booking.afterBooking`, all six locales): what to do now
("pick a day, then a time; details come next") and what arrives afterwards
("a calendar invite with the video link; three of us join every call"). If you
restyle this rail, keep both — a date grid on its own asks for a commitment
without saying what it leads to.

## Sept 18 2026 SEO pass — what was found and fixed

Search Console (`sc-domain:treasurehunt.pt`, 90 days): 40 clicks, 2,465
impressions, 1.62% CTR, avg position 17.2. The trend is **up** — 5 clicks/150
impressions in March to 15 clicks/476 impressions in the first 18 days of
September. Average position "worsening" is a composition effect from surfacing
on far more queries, not a decline.

Fixed this pass:
- **`components/json-ld.tsx` keyed off `lang === 'pt'`**, a two-way switch on a
  six-locale site, so `/de` `/es` `/it` `/fr` each shipped a `WebPage` node
  claiming the English homepage URL with `inLanguage: "en"`, contradicting their
  own canonical, `<html lang>` and title. Now keys off the full locale using
  `homeMeta`, which moved to **`i18n/home-meta.ts`** — importing it from
  `app/[lang]/layout.tsx` would be circular, since that layout renders `JsonLd`.
- **`components/demo-section.tsx` prefixed every report link with the locale**,
  pointing 28 internal links from the locale homes at URLs that canonicalise to
  the EN version. It now mirrors the `ptPrefix` rule in `site-footer.tsx`: only
  `ethdenver-report` and `futuremaker-report` take `/pt`. Keep these two files in
  step — the footer was fixed for this exact reason and the demo section was missed.
- Landing `isPartOf` was an **inline duplicate `WebSite` node**, forking the
  entity the `@id` wiring exists to keep singular. Now `{"@id": BASE/#website}`.
- Landing breadcrumb leaf used the raw `<title>`, so the SERP crumb read
  "NFC Treasure Hunt for Events | Treasure Hunt". Now the brand suffix is stripped.
- Single-language landing pages declared themselves `x-default`, which means
  "serve this when no language matches" — a German-only page is not that.
- The ETHDenver report h1 was "TREASURE HUNT RECAP", omitting the event name it
  exists to rank for. Now names the event in all six locales.
- The three March blog posts linked to no landing page or report; the three July
  posts already did. All six now link out.

### Not fixed, and why
- **The eight live event subdomains are fully indexable** (`bootcamp`,
  `culturalweek`, `datasummit`, `patos`, `fil`, `cadaval`, `summerbc`,
  `futuremaker`): `Allow: /`, own sitemaps, no noindex, and every page shares the
  title "Treasure Hunt | Scan NFC Tags & Earn Crypto Tokens".
  `fil.treasurehunt.pt` already ranks for brand queries next to the marketing
  site, and `sc-domain:treasurehunt.pt` treats it all as one property. These are
  player-facing game screens nobody searches for. **The fix belongs in the game
  app, not this repo**: `X-Robots-Tag: noindex` or `Disallow: /`.
- `/trade-show-booth-traffic`: 482 impressions, 2 clicks, position 18 ("booth
  traffic" alone is 236 impressions at 17.9). Title and description are fine —
  this is a position problem, and 807 words is thin for that query.
- `/es` `/it` `/de` `/fr` returned **zero impressions over 90 days**. The copy is
  genuinely per-market, not scaled translation, so this is an authority problem
  rather than a quality one — but it is worth deciding whether to keep investing.
- Off-locale report and blog variants are still `index, follow` while off-locale
  landing variants are `noindex, follow`; the 8 report pages still emit exactly
  one outbound link (`/`); four landing FAQ questions are duplicated verbatim
  across pages. All real, none urgent.

## Report "Related" block

`components/report-related.tsx` renders a small `<nav>` at the foot of each of
the six reports. The reports collect more inbound internal links than anything
but the home page and used to emit one outbound link ("back"), so all of that
link equity stopped there. Each report links to the blog post that cites it and
to the landing page for the intent it demonstrates.

Gotcha: the reports do **not** all read the same dictionary slice.
`ethdenver-report` gets `dict.report`, `futuremaker-report` gets
`dict.fmReport`, and the other four are non-dictionary reports that pass the
heading as a literal `"Related"`. A `related` key added to `report` alone
renders nothing on Future Maker and fails silently, because `ReportRelated`
still draws an empty heading. Both `report.related` and `fmReport.related` exist
in all six dictionaries; `pnpm check:dict` (391 keys) enforces the shape.

## Landing page FAQ sets must be disjoint

Every landing page emits its FAQ as `FAQPage` JSON-LD, so a question and answer
repeated verbatim across pages ships duplicate structured data and reads as
scaled content. "What do we get after the event?" was on four EN pages with a
byte-identical answer on two of them. The rule when adding or editing a landing
page: no question **and** answer pair may be verbatim-identical to another page
in the same language. Differentiate with that page's own numbers rather than by
reshuffling adjectives. The PT set (three pages) needs the same check.

`/trade-show-booth-traffic` is the worked example: it carries the PSCS 2026
distribution (103 booths, median 77 finds, 79 booths past 50) in the stats
strip, the benefits intro, a `comparison` table and one FAQ answer, which is
what took it from 807 to ~1,350 words of copy nothing else on the site repeats.
