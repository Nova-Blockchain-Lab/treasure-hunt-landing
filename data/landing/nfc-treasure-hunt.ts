import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "nfc-treasure-hunt",
  locale: "en",
  title: "NFC Treasure Hunt for Events | Treasure Hunt",
  description:
    "Run an NFC treasure hunt at your event: tap-to-play checkpoints, no app download, a live leaderboard and real-time analytics. Deployed at ETHDenver and NOVA IMS.",

  eyebrow: "NFC EVENT GAME",
  headline: "The NFC Treasure Hunt",
  headlineHighlight: "Built for Live Events",
  subhead:
    "Hide NFC tags around your venue and turn your event into a game. Attendees tap to play in their phone browser — no app to download — chasing a live leaderboard and real rewards.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "Why NFC beats",
  benefitsHighlight: "a plain QR hunt",
  benefitsIntro:
    "A plain QR hunt makes attendees launch a camera and line up a tiny code in a crowd. NFC turns the same checkpoint into a single tap, with the same live leaderboard and analytics behind it. Where a phone can't tap, the checkpoint still works as a QR code, so you cover everyone with one game.",
  benefits: [
    {
      icon: "Nfc",
      title: "Tap, don't scan",
      description:
        "A single tap on a hidden NFC tag opens the challenge instantly. No camera to launch, no tiny QR code to line up in a busy hall. On phones without NFC the same checkpoint reads as a QR code, so nobody is left out.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "The whole game runs in the mobile browser. Players sign in and start tapping within about 30 seconds, with nothing to install and no friction at the registration desk standing between them and the first find.",
    },
    {
      icon: "Trophy",
      title: "Live leaderboard",
      description:
        "Every find updates a real-time leaderboard that keeps attendees moving and competing across the whole venue. Hidden NFC challenges and bonus finds keep the chase interesting right to the end of the day.",
    },
    {
      icon: "Target",
      title: "Drive sponsor foot traffic",
      description:
        "Place checkpoints at sponsor booths and quiet corners to pull crowds exactly where you want them. At one expo a back-corner vendor put a checkpoint at their stand — attendees kept arriving to scan it, saw the products and bought, and it turned their weekend around.",
    },
    {
      icon: "BarChart3",
      title: "Real-time analytics",
      description:
        "An organizer dashboard shows finds, players and hotspots as they happen, so you can see which areas pull crowds and which need a nudge. Afterwards you get a full post-event report with the busiest checkpoints and time-of-day patterns.",
    },
    {
      icon: "Gift",
      title: "Rewards attendees keep",
      description:
        "Points and token rewards convert to real merch in an in-app store, so the game pays off in something tangible. The whole thing is free for players to join — they only need their phone.",
    },
  ],

  steps: {
    heading: "How an NFC hunt runs",
    items: [
      {
        title: "Hide the tags",
        description:
          "We map your venue and place NFC checkpoints at booths, stages and the high-value corners you want crowds to reach.",
      },
      {
        title: "Attendees tap to play",
        description:
          "Players tap a tag, sign in on their phone and start finding checkpoints — no app, no friction, no queue at a registration desk.",
      },
      {
        title: "You watch it live",
        description:
          "Track finds and foot traffic in real time, reward the leaders on the spot, and get a full analytics report afterwards.",
      },
    ],
  },

  faqHeading: "NFC treasure hunt FAQ",
  faq: [
    {
      q: "Do players need to download an app?",
      a: "No. The whole game runs in the mobile browser. Players sign in and start tapping checkpoints within about 30 seconds.",
    },
    {
      q: "Which phones support NFC?",
      a: "Modern iPhones and Android phones read NFC tags out of the box. Where a phone can't tap, the same checkpoint also works as a QR code, so nobody is left out.",
    },
    {
      q: "How many checkpoints can we run?",
      a: "From a handful to hundreds. We have run events with more than 100 NFC checkpoints across a single venue.",
    },
    {
      q: "Can we send people to sponsor booths?",
      a: "Yes. Placing checkpoints at sponsor and partner locations is one of the most popular uses — it reliably pulls foot traffic to specific spots.",
    },
    {
      q: "What kinds of events does an NFC hunt suit?",
      a: "Conferences, corporate team building, university open days, festivals, trade shows and expo booths, brand activations and hackathons. We have run it at events including ETHDenver, Future Maker at NOVA IMS and the Portugal Smart Cities Summit, with thousands of finds across a single weekend.",
    },
    {
      q: "What do we get after the event?",
      a: "A full post-event report: total finds, unique players, the busiest checkpoints and time-of-day patterns.",
    },
  ],

  ctaHeading: "Bring an NFC treasure hunt to your event",
  ctaSubhead: "Tell us about your venue and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
