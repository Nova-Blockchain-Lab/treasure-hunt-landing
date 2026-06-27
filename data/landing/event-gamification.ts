import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "event-gamification",
  locale: "en",
  title: "Event Gamification Platform | Treasure Hunt",
  description:
    "Treasure Hunt is an event gamification platform for conferences and corporate events: NFC + QR checkpoints, no app, live analytics. Used at ETHDenver.",

  eyebrow: "EVENT GAMIFICATION",
  headline: "The Event Gamification Platform",
  headlineHighlight: "Built for Conferences",
  subhead:
    "Turn a conference, expo or corporate offsite into a game. Attendees scan NFC tags and QR checkpoints across the venue in their phone browser — no app to download — chasing a live leaderboard and real rewards while you watch the data come in.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "What an event gamification",
  benefitsHighlight: "platform should do",
  benefitsIntro:
    "Gamification only works if attendees actually play and you can see what happened. Treasure Hunt covers both: instant participation in the browser, and a live view of where everyone goes.",
  benefits: [
    {
      icon: "Users",
      title: "Engagement that lasts all day",
      description:
        "A live leaderboard and a venue full of hidden checkpoints keep attendees moving and exploring instead of clustering near the entrance. Engagement spreads across every session, not just the keynote.",
    },
    {
      icon: "Target",
      title: "Drive sponsor foot traffic",
      description:
        "Place checkpoints at sponsor booths and quiet corners to pull crowds exactly where you want them. At one expo a back-corner vendor put a checkpoint at their stand — attendees kept arriving to scan it, saw the products and bought. It turned their weekend around.",
    },
    {
      icon: "BarChart3",
      title: "Real-time analytics",
      description:
        "An organizer dashboard shows finds, players and hotspots as they happen, so you can see which areas pull crowds and which need a nudge. Afterwards you get a full post-event report.",
    },
    {
      icon: "Gift",
      title: "Rewards attendees keep",
      description:
        "Points and token rewards convert to real merch in an in-app store, so the game pays off in something tangible. Hidden NFC challenges and bonus finds keep the chase interesting.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "The whole platform runs in the mobile browser. Players sign in and start scanning within about 30 seconds — nothing to install, no friction at the registration desk.",
    },
    {
      icon: "Nfc",
      title: "NFC tap and QR scan",
      description:
        "Checkpoints work as an NFC tap or a QR scan, so every phone can play. NFC turns a checkpoint into a single tap; QR covers anything that can't.",
    },
  ],

  steps: {
    heading: "How the platform runs your event",
    items: [
      {
        title: "Map the venue and place checkpoints",
        description:
          "We map your space and hide NFC tags and QR checkpoints at booths, stages and the high-value corners you want crowds to reach.",
      },
      {
        title: "Attendees scan to play",
        description:
          "Players tap a tag or scan a QR code, sign in on their phone and start collecting points — no app, no queue, no friction.",
      },
      {
        title: "Watch the data, reward the leaders",
        description:
          "Track finds and foot traffic live on the organizer dashboard, reward leaders on the spot, and take home a full analytics report afterwards.",
      },
    ],
  },

  faqHeading: "Event gamification FAQ",
  faq: [
    {
      q: "What kind of events is this gamification platform for?",
      a: "Conferences, corporate team building, university open days, festivals, trade shows and expo booths, brand activations and hackathons. Anywhere you want attendees moving around a venue and engaging with it.",
    },
    {
      q: "Do attendees need to download an app?",
      a: "No. The whole platform runs in the mobile browser. Players sign in and start scanning checkpoints within about 30 seconds.",
    },
    {
      q: "How does it help sponsors?",
      a: "Place checkpoints at sponsor booths to pull foot traffic to specific spots. It is one of the most popular uses, and the organizer dashboard shows exactly how many people each location drew.",
    },
    {
      q: "What data do we get?",
      a: "A real-time dashboard during the event (finds, players, hotspots) and a full post-event report afterwards: total finds, unique players, the busiest checkpoints and time-of-day patterns.",
    },
    {
      q: "NFC or QR?",
      a: "Both. Every checkpoint works as an NFC tap and as a QR code, so modern phones tap and everything else scans. Nobody is left out.",
    },
    {
      q: "How big can it scale?",
      a: "From a handful of checkpoints to hundreds. We have run events with more than 100 checkpoints across a single venue and thousands of finds in a weekend.",
    },
  ],

  ctaHeading: "Gamify your next event",
  ctaSubhead: "Tell us about your venue, dates and goals. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
