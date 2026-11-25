# Treasure Hunt brand voice

Read by the `brand-voice-enforcement` skill. Built on 25 Nov 2026 from the copy
that ships on www.treasurehunt.pt (the home dictionaries, the landing pages, the
blog) and from the owner's writing rules. Applies to every visitor-facing string:
dictionaries, `data/landing/*.ts`, `data/blog-posts.ts`, report prose, llms.txt,
social posts and sales email.

## Who is talking

A small team at NOVA Blockchain Lab (NOVA IMS, Lisbon) that builds the game and
runs it on the floor at each event. We write the way a competent consultant
writes a report: we state what happened, give the number, and say where the
number comes from. The reader is an event organiser, a sponsor manager or a
university staff member deciding whether this is worth a call.

## We are / we are not

| We are | We are not |
|---|---|
| **Plain.** Short, direct sentences. One idea each. | **Salesy.** No landing-page adjectives, no "unlock", no "elevate". |
| **Measured.** Every figure traces to a report snapshot, a report TS file or the factsheet. | **Inflated.** No rounded-up claims, no industry benchmarks we did not measure. |
| **Honest about limits.** We say what the product does not do and where a competitor fits better. | **Defensive or vague.** We do not hide a weak number; we label it ("counted per phone, not per player"). |
| **Concrete.** Name the venue, the tag, the stand, the hour. | **Abstract.** No "engagement journeys", no "experiences", no "ecosystem". |
| **First person plural.** "We place the tags." "We have not run a survey." | **Corporate third person** ("the solution enables organisations to..."). |

## Rules (hard)

- No em dashes (`—`) in visitor-facing copy. Use a period, a comma, a colon or
  parentheses. En dashes stay only inside numeric and date ranges (`50–200`).
- Banned words: robust, seamless, powerful, comprehensive, tailored,
  world-class, best-in-class, cutting-edge, game-changing, revolutionary,
  leverage, unlock, elevate, empower, sleek, streamlined, vibrant, delve,
  showcase, testament, landscape (abstract), journey (abstract). PT: robusto,
  à medida, à altura de, sem surpresas, de excelência.
- No invented numbers. If an argument needs an outside statistic we did not
  measure, say we do not have a trustworthy one, or drop the argument.
- Aggregate figures are labelled with their scope: "across nine events, counted
  per event". Per-report figures stay as the report states them.
- Section titles describe the contents ("Setting up the store"), never sell
  them ("A store your attendees will love").
- No closing flourishes. A post ends on the last useful sentence or a link.
- Prefer a sentence to a bullet list. Use a list only for real enumerations
  (store items, steps an organiser takes in order).
- Sentence-case headings in blog posts.
- PT copy is PT-PT with full diacritics ("telemóvel", "equipa", "registo"),
  never PT-BR ("celular", "time", "cadastro").
- Each locale's copy is written for that market, not machine-swapped. Numbers
  use the locale separator (`27,108` en, `27.108` pt/es/it/de, `27 108` fr).

## Terminology

| Use | Avoid |
|---|---|
| checkpoint, tag (NFC), QR code | node, beacon, touchpoint |
| find (a player finding a tag) | scan event, interaction (unless it really is all transactions) |
| player | user, participant (fine in PT/ES as "participante" when "jogador" reads oddly) |
| store, prize, redeem | marketplace, redemption experience |
| organiser (blog, reports), organizer (home dictionary keeps US spelling) | client, customer |
| leaderboard | ranking (EN) |
| post-event report | deliverable, insights deck |
| "runs in the phone browser, no app to install" | "frictionless", "seamless onboarding" |

## Tone by context

| Context | Formality | Energy | Technical depth | Note |
|---|---|---|---|---|
| Home and landing pages | Medium | Medium | Low | Lead with what the organiser controls; one fact per claim. |
| Blog posts | Medium | Medium | Medium | First person plural, opinions allowed when backed by our own data. |
| Reports | Medium-high | Low | Medium | Describe, don't sell. Labels say exactly what was counted. |
| Competitor pages | Medium | Low | Medium | Only what the competitor's own site says; say where they fit better. |
| Social posts | Low-medium | Medium | Low | Real people and real numbers; no hype. |
| Sales email | Medium | Medium | Low | Short. Dates, venue, headcount, next step. |

## Examples from the live site

Good, keep this register:

> You place checkpoints at sponsor booths and in the areas people skip.
> Attendees tap them with their phone, earn points and spend them on rewards. It
> runs in the browser, with no app to install.

> There is no price list. Every event is quoted on its own, so tell us about yours.

> We do not have a credible industry figure for how many players an app download
> costs you, and we are not going to invent one.

Rewritten because it broke the rules:

> Before: "Engagement that lasts all day ... Engagement spreads across every
> session, not just the keynote."
> After: name the event and the measured spread, or cut the claim.

> Before: "500+ checkpoints" (overstated; the six reports summed to 401).
> After: a figure that reconciles with its source, with its scope in the label.

## Open questions

- NEI counts phones, not people, yet it is inside the nine-event player total.
  Recommendation: keep the total, keep "counted per event" in the label.
