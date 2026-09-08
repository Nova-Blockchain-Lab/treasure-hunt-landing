import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "scavify-alternative",
  locale: "en",
  title: "Scavify Alternative for Events | Treasure Hunt",
  description:
    "Looking for a Scavify alternative? Treasure Hunt runs an NFC scavenger hunt in the browser, with no app download and live analytics.",

  eyebrow: "SCAVIFY ALTERNATIVE",
  headline: "A Scavify Alternative",
  headlineHighlight: "Built for Live Events",
  subhead:
    "Treasure Hunt is an interactive NFC and QR scavenger hunt for conferences, festivals and team building. Attendees tap to play in their phone browser, with no app to download, while you watch the leaderboard and foot traffic in real time.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "Why teams choose",
  benefitsHighlight: "Treasure Hunt",
  benefitsIntro:
    "Scavify is a capable scavenger-hunt platform. Where Treasure Hunt differs is the bits that matter at a live event: a tap instead of a scan, nothing to install, and analytics you can act on while the doors are still open.",
  benefits: [
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "The whole game runs in the mobile browser. Players sign in and start scanning within about 30 seconds, with nothing to install before the first checkpoint.",
    },
    {
      icon: "Nfc",
      title: "NFC tap, not just QR",
      description:
        "Hidden NFC tags open a challenge with a single tap — no camera, no lining up a tiny code in a crowded hall. The same checkpoint also works as a QR code where a phone can't tap.",
    },
    {
      icon: "BarChart3",
      title: "Real-time organizer analytics",
      description:
        "Watch finds, players and hotspots as they happen on a live dashboard, then take home a full post-event report. You see where the crowd went, not just that the game ran.",
    },
    {
      icon: "Target",
      title: "Drive sponsor foot traffic",
      description:
        "Place checkpoints at sponsor booths and quiet corners to pull crowds exactly where you want them. At one trade show a back-corner booth got a hidden checkpoint, attendees kept arriving to scan it, saw the products and bought — it turned the weekend around.",
    },
    {
      icon: "Gift",
      title: "Real rewards for players",
      description:
        "Points convert to real merch in an in-app store, and the game is free for players to join. The reward is something attendees keep, not a digital badge.",
    },
    {
      icon: "Award",
      title: "Proven at real conferences",
      description:
        "Run end to end at ETHDenver 2026 in Denver, the Portugal Smart Cities Summit at FIL Lisbon, several NOVA IMS events and a city festival in Cadaval. More than 10,000 finds across 7 events, not a demo reel.",
    },
  ],

  comparison: {
    heading: "Treasure Hunt vs Scavify",
    ourLabel: "Treasure Hunt",
    theirLabel: "Scavify",
    rows: [
      {
        label: "App download",
        us: "None. Runs in the mobile browser, playing in ~30 seconds",
        them: "Players install a dedicated mobile app",
      },
      {
        label: "Checkpoint technology",
        us: "NFC tap and QR; tap a hidden tag, no camera needed",
        them: "QR codes, GPS and photo tasks (no NFC)",
      },
      {
        label: "Organizer analytics",
        us: "Real-time dashboard plus a full post-event report",
        them: "Reporting and dashboards on the admin side",
      },
      {
        label: "Sponsor / foot-traffic focus",
        us: "Checkpoints placed to pull crowds to booths and corners",
        them: "General team-building and engagement focus",
      },
      {
        label: "Cost to players",
        us: "Free for players to join and play",
        them: "Players join through the paid platform",
      },
      {
        label: "Pricing",
        us: "Starter, Pro and Enterprise packages, quote on request",
        them: "Quote-gated; pricing shared on request",
      },
      {
        label: "Track record at events",
        us: "ETHDenver, Portugal Smart Cities Summit, NOVA IMS events",
        them: "Used broadly for corporate and community programs",
      },
    ],
  },

  faqHeading: "Scavify alternative FAQ",
  faq: [
    {
      q: "Is Treasure Hunt a good Scavify alternative?",
      a: "If your event is in a physical venue and you want attendees playing in seconds, yes. Treasure Hunt runs in the browser with no app download, adds NFC tap on top of QR, and gives you real-time foot-traffic analytics, which is where it differs most from Scavify.",
    },
    {
      q: "Do players need to download an app?",
      a: "No. The whole game runs in the mobile browser. Players sign in and start scanning checkpoints within about 30 seconds. Scavify, by contrast, runs through a dedicated mobile app.",
    },
    {
      q: "What does Scavify cost compared to Treasure Hunt?",
      a: "Scavify's pricing is quote-gated, so you request it rather than seeing public numbers. Treasure Hunt is the same in spirit: Starter, Pro and Enterprise packages with a quote on request, so we can match the plan to your venue and dates. The clearest difference is that Treasure Hunt is free for players to join.",
    },
    {
      q: "Does Treasure Hunt support NFC, or only QR codes?",
      a: "Both. NFC tags let players tap a hidden checkpoint instead of aiming a camera, and every checkpoint also works as a QR code so no phone is left out. Scavify uses QR codes, GPS and photo tasks rather than NFC.",
    },
    {
      q: "Can we send attendees to specific sponsor booths?",
      a: "Yes. Placing checkpoints at sponsor and partner locations is one of the most popular uses. It reliably pulls foot traffic to specific spots, and the live dashboard shows you it working.",
    },
    {
      q: "What kinds of events is this for?",
      a: "Conferences, corporate team building, universities and open days, festivals, trade shows and expo booths, brand activations and hackathons. It has run at all of these.",
    },
    {
      q: "What do we get after the event?",
      a: "A full post-event report: total finds, unique players, the busiest checkpoints and time-of-day patterns, on top of the live dashboard you watch during the event.",
    },
  ],

  ctaHeading: "See Treasure Hunt as your Scavify alternative",
  ctaSubhead: "Tell us about your venue and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
