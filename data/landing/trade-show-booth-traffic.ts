import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "trade-show-booth-traffic",
  locale: "en",
  title: "Drive Trade Show Booth Traffic | Treasure Hunt",
  description:
    "Drive trade show booth traffic with hidden NFC checkpoints at exhibitor booths. No app download, live leaderboard, real-time foot-traffic analytics.",

  eyebrow: "TRADE SHOWS & EXPO BOOTHS",
  headline: "Drive Trade Show",
  headlineHighlight: "Booth Traffic",
  subhead:
    "Hide a checkpoint at each booth and the floor turns into a game. Attendees tap to play in their phone browser — no app to download — and chase finds straight to the booths you want them to visit.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "Pull crowds to",
  benefitsHighlight: "every booth on the floor",
  benefitsIntro:
    "Trade show foot traffic clusters near the entrance and the big sponsors. A checkpoint at each booth gives attendees a reason to walk the whole floor.",
  benefits: [
    {
      icon: "Target",
      title: "Drive trade show booth traffic",
      description:
        "Put a checkpoint at each booth and attendees come to scan it. At one event a vendor stuck in a back corner had a checkpoint hidden there. People kept arriving to scan, saw the products and bought. It turned their weekend around.",
    },
    {
      icon: "Nfc",
      title: "Tap, don't scan",
      description:
        "A single tap on an NFC tag at the booth opens the challenge instantly. No camera to launch, no tiny QR code to line up in a crowded aisle.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "Attendees sign in and start playing in the mobile browser within about 30 seconds. Nothing to install between them and the first booth.",
    },
    {
      icon: "BarChart3",
      title: "Foot-traffic analytics",
      description:
        "See which booths pull crowds and which stay quiet as it happens, then hand sponsors a full post-event report on the traffic their booth earned.",
    },
    {
      icon: "Trophy",
      title: "Live leaderboard",
      description:
        "Every scan updates a real-time leaderboard that keeps attendees moving across the floor instead of leaving after the keynote.",
    },
    {
      icon: "Gift",
      title: "Real rewards",
      description:
        "Points convert to real merch in an in-app store, so working the floor pays off in something attendees keep.",
    },
  ],

  steps: {
    heading: "How a booth hunt runs",
    items: [
      {
        title: "Place a checkpoint per booth",
        description:
          "We map the floor and place an NFC tag or QR checkpoint at each exhibitor booth — including the back corners that normally get skipped.",
      },
      {
        title: "Attendees tap to play",
        description:
          "Players tap a checkpoint, sign in on their phone and start collecting booths. No app, no queue at a registration desk, no friction.",
      },
      {
        title: "You watch the floor live",
        description:
          "Track scans and booth foot traffic in real time, reward the leaders, and give every exhibitor a report on the visits their booth earned.",
      },
    ],
  },

  faqHeading: "Trade show booth traffic FAQ",
  faq: [
    {
      q: "How does this drive trade show booth traffic?",
      a: "Each booth becomes a checkpoint worth points, so attendees have a reason to visit every booth, not just the ones near the door. Even the back corners get foot traffic they would otherwise miss.",
    },
    {
      q: "Do attendees need to download an app?",
      a: "No. The whole game runs in the mobile browser. Attendees sign in and start tapping booth checkpoints within about 30 seconds.",
    },
    {
      q: "How many booths can we cover?",
      a: "From a handful to the whole floor. We have run events with more than 100 checkpoints across a single venue.",
    },
    {
      q: "What do exhibitors and sponsors get out of it?",
      a: "Foot traffic and proof of it. Each booth earns scans, and sponsors can take home a report showing exactly how many attendees their checkpoint pulled in.",
    },
    {
      q: "What if a phone can't read NFC?",
      a: "Every checkpoint also works as a QR code, so nobody on the floor is left out. Modern iPhones and Android phones read NFC tags out of the box.",
    },
    {
      q: "What do we get after the show?",
      a: "A full post-event report: total finds, unique players, the busiest booths and time-of-day patterns across the floor.",
    },
  ],

  ctaHeading: "Drive booth traffic at your next trade show",
  ctaSubhead: "Tell us about your floor plan and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
