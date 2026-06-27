import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "goosechase-alternative",
  locale: "en",
  title: "Goosechase Alternative for Events | Treasure Hunt",
  description:
    "A Goosechase alternative for live events: NFC + QR checkpoints, no app download, free for players, real-time analytics. Proven at conferences.",

  eyebrow: "GOOSECHASE ALTERNATIVE",
  headline: "The Goosechase Alternative",
  headlineHighlight: "Built for Live Events",
  subhead:
    "Goosechase is a solid scavenger-hunt app. If you run conferences, festivals or expo booths and want players in the game without downloading anything, Treasure Hunt takes a different route: NFC tags and QR checkpoints that open in the phone browser.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "Why teams pick",
  benefitsHighlight: "this Goosechase alternative",
  benefitsIntro:
    "Both products run a game across your venue. The difference is how players get in, how they reach a checkpoint, and what you take home afterwards.",
  benefits: [
    {
      icon: "Smartphone",
      title: "No app to download",
      description:
        "The game runs in the mobile browser. Players sign in and start scanning within about 30 seconds — no install, no app-store detour at the door.",
    },
    {
      icon: "Nfc",
      title: "NFC tap, not just QR",
      description:
        "Hide NFC tags around the venue and players tap to open a challenge. QR checkpoints work too, so phones without NFC are never left out.",
    },
    {
      icon: "Target",
      title: "Drive sponsor foot traffic",
      description:
        "Put checkpoints at sponsor booths and quiet corners to pull crowds where you want them. At one trade show a back-corner booth got a checkpoint, attendees kept arriving to scan it, saw the products and bought.",
    },
    {
      icon: "BarChart3",
      title: "Real-time analytics",
      description:
        "Watch finds, players and hotspots on a live organizer dashboard during the event, then take home a full post-event report.",
    },
    {
      icon: "Heart",
      title: "Free for players",
      description:
        "Players never pay and never install. The cost sits with you as the organizer, so nothing stands between an attendee and their first tap.",
    },
    {
      icon: "Award",
      title: "Proven at conferences",
      description:
        "Run at ETHDenver, the Portugal Smart Cities Summit, NOVA IMS events and a city festival — real venues with hundreds of players, not just demos.",
    },
  ],

  comparison: {
    heading: "Treasure Hunt vs Goosechase",
    ourLabel: "Treasure Hunt",
    theirLabel: "Goosechase",
    rows: [
      {
        label: "How players join",
        us: "Mobile browser — no app, playing in ~30 seconds",
        them: "Dedicated Goosechase app, downloaded from the app store",
      },
      {
        label: "Checkpoint technology",
        us: "NFC tap + QR checkpoints",
        them: "QR codes, GPS locations and photo/text missions",
      },
      {
        label: "Sponsor foot traffic + analytics",
        us: "Sponsor checkpoints with live foot-traffic analytics and a post-event report",
        them: "Mission-based engagement; broad activity tracking",
      },
      {
        label: "Cost to players",
        us: "Free for players, always",
        them: "Free for players; organizer pays for the plan",
      },
      {
        label: "Proven at conferences",
        us: "ETHDenver, Portugal Smart Cities Summit, NOVA IMS events",
        them: "Widely used for education, team building and community events",
      },
      {
        label: "Pricing model",
        us: "Starter / Pro / Enterprise packages, quote on request",
        them: "Paid annual plans by team or participant size",
      },
    ],
  },

  faqHeading: "Goosechase alternative FAQ",
  faq: [
    {
      q: "How is Treasure Hunt different from Goosechase?",
      a: "Goosechase is an app players download to run photo, text, GPS and QR missions. Treasure Hunt runs in the mobile browser with no download, adds NFC tap checkpoints alongside QR, and is built around driving foot traffic at conferences and festivals with real-time organizer analytics.",
    },
    {
      q: "Do players have to download an app?",
      a: "Not with Treasure Hunt. The whole game runs in the phone browser, so players sign in and start scanning within about 30 seconds. Goosechase uses its own app from the app store.",
    },
    {
      q: "Is it really free for players?",
      a: "Yes. Players never pay and never install anything. As with most platforms, the organizer covers the cost — for Treasure Hunt that is a Starter, Pro or Enterprise package, quoted per event.",
    },
    {
      q: "Can we send attendees to sponsor booths?",
      a: "Yes, and it is one of the most common reasons teams choose this Goosechase alternative. You place checkpoints at sponsor and partner locations, and the live dashboard shows the foot traffic each one pulls.",
    },
    {
      q: "What does it cost?",
      a: "Treasure Hunt comes in Starter, Pro and Enterprise packages, priced per event with a quote on request. Goosechase publishes paid annual plans that scale with team or participant size. Tell us your venue and dates and we'll put together a quote.",
    },
    {
      q: "Has Treasure Hunt run at real conferences?",
      a: "Yes. It has run end to end at ETHDenver, the Portugal Smart Cities Summit, several NOVA IMS events and a city festival — together totalling 10,000+ finds across 500+ checkpoints.",
    },
  ],

  ctaHeading: "See Treasure Hunt as your Goosechase alternative",
  ctaSubhead: "Tell us about your venue and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
