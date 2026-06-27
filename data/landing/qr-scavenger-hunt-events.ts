import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "qr-scavenger-hunt-events",
  locale: "en",
  title: "QR Code Scavenger Hunt for Events | Treasure Hunt",
  description:
    "Run a QR code scavenger hunt for events: checkpoints work on every phone, NFC tap where supported, no app, a live leaderboard and real-time analytics.",

  eyebrow: "QR + NFC EVENT GAME",
  headline: "A QR Code Scavenger Hunt",
  headlineHighlight: "Built for Events",
  subhead:
    "Hide QR checkpoints around your venue and turn your event into a game. QR works on every phone with a camera, and on phones that support it attendees can tap an NFC tag instead — all in the mobile browser, no app to download.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "10,000+", label: "treasures found" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "players" },
    { value: "7", label: "events" },
  ],

  benefitsHeading: "Why run a",
  benefitsHighlight: "QR scavenger hunt",
  benefitsIntro:
    "A QR code scavenger hunt for events works on every phone in the room. Add NFC tap where phones support it and you cover everyone, with one game and one leaderboard.",
  benefits: [
    {
      icon: "QrCode",
      title: "Works on every phone",
      description:
        "Any phone with a camera can scan a QR checkpoint. No special hardware, no compatibility list, nobody left standing on the sidelines.",
    },
    {
      icon: "Nfc",
      title: "Tap where supported",
      description:
        "On phones with NFC, the same checkpoint reads with a single tap. Players choose whatever is faster for them, and you run one hunt for both.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "The game runs in the mobile browser. Players sign in and start scanning within about 30 seconds, with nothing to install first.",
    },
    {
      icon: "Trophy",
      title: "Live leaderboard",
      description:
        "Every scan updates a real-time leaderboard that keeps attendees moving and competing across the whole venue.",
    },
    {
      icon: "Target",
      title: "Drive foot traffic",
      description:
        "Place checkpoints at sponsor booths and quiet corners to pull crowds exactly where you want them. At one trade show a back-corner booth got a checkpoint, attendees kept arriving to scan it, and the products in front of them started selling.",
    },
    {
      icon: "BarChart3",
      title: "Real-time analytics",
      description:
        "Watch scans, players and hotspots as they happen on an organizer dashboard, then take home a full post-event report.",
    },
  ],

  steps: {
    heading: "How a QR scavenger hunt runs",
    items: [
      {
        title: "Place the checkpoints",
        description:
          "We map your venue and place QR checkpoints, with NFC tags where you want a tap option, at booths, stages and the corners you want crowds to reach.",
      },
      {
        title: "Attendees scan to play",
        description:
          "Players scan a code or tap a tag, sign in on their phone and start finding checkpoints. No app, no queue at a registration desk.",
      },
      {
        title: "You watch it live",
        description:
          "Track scans and foot traffic in real time, reward the leaders on the spot, and get a full analytics report afterwards.",
      },
    ],
  },

  faqHeading: "QR scavenger hunt FAQ",
  faq: [
    {
      q: "Do players need to download an app?",
      a: "No. The whole QR code scavenger hunt runs in the mobile browser. Players sign in and start scanning checkpoints within about 30 seconds.",
    },
    {
      q: "How is this different from a plain QR hunt?",
      a: "QR checkpoints work on every phone with a camera. On phones that support NFC, the same checkpoint also reads with a single tap, so players in a busy hall don't have to line up a tiny code. You run one hunt that covers both.",
    },
    {
      q: "How many checkpoints can we run?",
      a: "From a handful to hundreds. We have run events with more than 100 checkpoints across a single venue.",
    },
    {
      q: "Can we send people to sponsor booths?",
      a: "Yes. Placing checkpoints at sponsor and partner locations is one of the most popular uses, and it reliably pulls foot traffic to specific spots. The organizer dashboard shows which booths are drawing the crowds.",
    },
    {
      q: "What kinds of events does this suit?",
      a: "Conferences, corporate team building, university open days, festivals, trade shows and expo booths, brand activations and hackathons. The format adapts to the venue and the audience.",
    },
    {
      q: "What do we get after the event?",
      a: "A full post-event report: total finds, unique players, the busiest checkpoints and time-of-day patterns.",
    },
  ],

  ctaHeading: "Bring a QR scavenger hunt to your event",
  ctaSubhead: "Tell us about your venue and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
