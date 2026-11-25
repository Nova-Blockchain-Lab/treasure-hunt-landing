import type { LandingContent } from "@/lib/landing/types"

// Competitor facts checked on 24 Nov 2026 against en.actionbound.com (home,
// /features, /faq, /pricing, /license/business/1). Re-check before editing them.
export const content: LandingContent = {
  slug: "actionbound-alternative",
  locale: "en",
  title: "Actionbound Alternative for Events | Treasure Hunt",
  description:
    "Actionbound and Treasure Hunt compared for live events: app or browser, QR and GPS or NFC, per-player licences or a quote per event.",

  eyebrow: "ACTIONBOUND ALTERNATIVE",
  headline: "An Actionbound Alternative",
  headlineHighlight: "for Conferences and Fairs",
  subhead:
    "Actionbound is a scavenger-hunt app used by schools, museums, tour operators and companies, and its hunts are played in the Actionbound app. Treasure Hunt is made for a single event: attendees play in the phone browser, tap NFC or QR checkpoints at stands, and spend their points at a prize store on site.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "71,000+", label: "treasures found" },
    { value: "3,500+", label: "players" },
    { value: "3,700+", label: "prizes redeemed" },
    { value: "9", label: "events" },
  ],

  benefitsHeading: "How Treasure Hunt differs",
  benefitsHighlight: "from Actionbound",
  benefitsIntro:
    "Both turn real places into a game. Actionbound is a tool for creators: you build hunts, called Bounds, in its web editor and run them as often as you like. Treasure Hunt is set up with our team for one event, around the stands, sponsors and quiet corners of your venue.",
  benefits: [
    {
      icon: "Smartphone",
      title: "Nothing to install at the door",
      description:
        "Actionbound's FAQ says Bounds can only be played in its iOS and Android app, so each player installs it first. Treasure Hunt opens in the phone browser: tap a checkpoint, sign in once, and play within about 30 seconds.",
    },
    {
      icon: "Nfc",
      title: "NFC tags as well as QR codes",
      description:
        "Actionbound's feature list covers QR codes and GPS spots. Treasure Hunt checkpoints are NFC tags that open with a tap, with no camera to aim, and each one also carries a QR code for phones without NFC. NFC tags come with the Pro and Enterprise packages.",
    },
    {
      icon: "Store",
      title: "Exhibitor stands on the route",
      description:
        "A checkpoint can sit at every stand you choose, so the game walks people past booths they would otherwise skip. At the Portugal Smart Cities Summit, 103 checkpoints covered the hall and 351 players logged 8,123 finds over three days.",
    },
    {
      icon: "Gift",
      title: "A prize store at the venue",
      description:
        "Every find earns points, and players spend them on merch and sponsor giveaways at the event store. At the Smart Cities Summit, players redeemed 717 prizes.",
    },
    {
      icon: "BarChart3",
      title: "A live view while the event runs",
      description:
        "The organiser dashboard shows which checkpoints get visits and which areas stay quiet during the event, so you can react on the day. Actionbound lets you display, compare and export results as XLSX or PDF.",
    },
    {
      icon: "Heart",
      title: "Free for players",
      description:
        "Players never pay and never install anything, and the platform covers every transaction fee. Packages are sized by expected attendance and quoted once per event.",
    },
  ],

  comparison: {
    heading: "Treasure Hunt and Actionbound side by side",
    ourLabel: "Treasure Hunt",
    theirLabel: "Actionbound",
    rows: [
      {
        label: "How players join",
        us: "Phone browser, no install",
        them: "Actionbound app for iOS and Android; no browser play",
      },
      {
        label: "Checkpoints",
        us: "NFC tags and QR codes",
        them: "QR codes and GPS spots, plus quizzes, missions and tournaments",
      },
      {
        label: "Without mobile data",
        us: "Needs mobile data or venue Wi-Fi",
        them: "Plays offline once the Bound is downloaded; results upload when back online",
      },
      {
        label: "Who builds the game",
        us: "Our team sets up checkpoints and rewards for your event",
        them: "You build Bounds yourself in a web editor",
      },
      {
        label: "Organiser data",
        us: "Live dashboard during the event",
        them: "Results displayed, compared and exported (XLSX, PDF)",
      },
      {
        label: "Pricing",
        us: "Starter, Pro or Enterprise package, quoted per event",
        them: "Free for personal use; PRO licence priced by number of players; discounted EDU licence",
      },
      {
        label: "Typical use",
        us: "Conferences, trade fairs, festivals, campus events",
        them: "Schools, museums, city tours, team building, company training",
      },
    ],
  },

  faqHeading: "Actionbound alternative FAQ",
  faq: [
    {
      q: "How is Treasure Hunt different from Actionbound?",
      a: "Actionbound is a platform for building your own interactive scavenger hunts, called Bounds, which players run in the Actionbound app. Treasure Hunt is set up by our team for a specific event: players join in the phone browser, tap NFC or QR checkpoints at stands and sponsor areas, and spend their points at a prize store on site.",
    },
    {
      q: "When is Actionbound the better choice?",
      a: "When you want to write your own tours, edit them yourself and reuse them with new groups over months: a school trip, a museum route, an onboarding walk. Actionbound is built for that kind of creator, with a web editor and an EDU licence for schools. Treasure Hunt is set up with our team for one event at a time.",
    },
    {
      q: "Do players need to install anything?",
      a: "Not for Treasure Hunt. It runs in the phone browser, and a player goes from the first tap to playing in about 30 seconds. Actionbound's own FAQ says Bounds can only be played in its iOS and Android app.",
    },
    {
      q: "How does the pricing compare?",
      a: "Actionbound is free for personal use. Its PRO licence for business use is priced by the number of Bound players, and every person who plays counts as one; schools have a discounted EDU licence. Treasure Hunt has no price list: Starter, Pro and Enterprise packages are sized by expected attendance and quoted per event, and players never pay.",
    },
    {
      q: "Does Treasure Hunt work without a phone signal?",
      a: "No. Each find is recorded as it happens, so players need mobile data or venue Wi-Fi. If your route runs through places with no coverage, an app that downloads its content in advance, as Actionbound does, is the safer option.",
    },
    {
      q: "Can checkpoints go at exhibitor stands?",
      a: "Yes, that is the main use. We place an NFC tag or QR code at each stand you pick, and the dashboard shows the visits each one gets. At the Smart Cities Summit the median stand logged 77 finds over the three days.",
    },
  ],

  ctaHeading: "See Treasure Hunt as your Actionbound alternative",
  ctaSubhead: "Tell us about the venue, the dates and the expected attendance. We'll send a plan and a quote.",
  ctaButton: "Plan Your Event",

  related: {
    heading: "Other comparisons",
    links: [
      { href: "/goosechase-alternative", label: "Goosechase alternative" },
      { href: "/scavify-alternative", label: "Scavify alternative" },
      { href: "/loquiz-alternative", label: "Loquiz alternative" },
    ],
  },
}
