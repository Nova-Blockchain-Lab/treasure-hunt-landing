import type { LandingContent } from "@/lib/landing/types"

// Competitor facts checked on 24 Nov 2026 against loquiz.com (home, /pricing,
// /features, /support/tag/qr, the 2024 offline-game and how-to-start posts).
// Re-check before editing them.
export const content: LandingContent = {
  slug: "loquiz-alternative",
  locale: "en",
  title: "Loquiz Alternative for Events | Treasure Hunt",
  description:
    "Loquiz and Treasure Hunt compared for live events: app or browser, a price per device or a quote per event, GPS and QR or NFC checkpoints.",

  eyebrow: "LOQUIZ ALTERNATIVE",
  headline: "A Loquiz Alternative",
  headlineHighlight: "for Fairs and Festivals",
  subhead:
    "Loquiz is a platform for building location-based games, tours and team activities. Its games are played in the Loquiz app and billed per team, where one team is one activated device. Treasure Hunt is made for open events: each attendee plays on their own phone in the browser, taps NFC or QR checkpoints at stands, and spends points at a prize store.",
  trust: "Deployed at ETHDenver, Future Maker and the Portugal Smart Cities Summit",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "71,000+", label: "treasures found" },
    { value: "3,500+", label: "players" },
    { value: "3,700+", label: "prizes redeemed" },
    { value: "9", label: "events" },
  ],

  benefitsHeading: "How Treasure Hunt differs",
  benefitsHighlight: "from Loquiz",
  benefitsIntro:
    "Loquiz suits organised groups: a team-building day, a guided city game, a class with tablets. You build the game in its web Creator, and a team can share one phone or tablet. At a fair or festival most players are walk-ins with their own phones, and that changes what matters.",
  benefits: [
    {
      icon: "Smartphone",
      title: "Walk-ins play in the browser",
      description:
        "Loquiz games are played in the Loquiz app, downloaded from the App Store or Google Play. Treasure Hunt opens in the phone browser when someone taps a checkpoint, so a visitor passing a stand can be playing in about 30 seconds.",
    },
    {
      icon: "Users",
      title: "Priced per event, not per device",
      description:
        "Loquiz bills per team and counts each activated device as one team, so the bill follows the number of phones in play. Treasure Hunt packages are sized by expected attendance and quoted once per event.",
    },
    {
      icon: "Nfc",
      title: "NFC tags at the stands",
      description:
        "Loquiz tasks open by GPS, iBeacons, QR codes or EAN-13 barcodes. Treasure Hunt checkpoints are NFC tags that open with a tap, plus a QR code on each for phones without NFC. NFC tags come with the Pro and Enterprise packages.",
    },
    {
      icon: "Store",
      title: "Exhibitors and sponsors on the route",
      description:
        "Checkpoints go at the stands you choose, so the game sends people to parts of the hall they would skip. At the Portugal Smart Cities Summit the busiest sector was reached by 83% of players and the quietest by 46%.",
    },
    {
      icon: "Gift",
      title: "Prizes people take home",
      description:
        "Points buy merch and sponsor giveaways at the event store. At the Festival da Juventude in Cadaval, 126 players redeemed 421 prizes over two days.",
    },
    {
      icon: "BarChart3",
      title: "A live view of the floor",
      description:
        "The organiser dashboard shows which checkpoints get visits and which areas stay quiet while the event runs. Loquiz offers a results API for showing game results wherever you need them.",
    },
  ],

  comparison: {
    heading: "Treasure Hunt and Loquiz side by side",
    ourLabel: "Treasure Hunt",
    theirLabel: "Loquiz",
    rows: [
      {
        label: "How players join",
        us: "Phone browser, no install",
        them: "Loquiz app for iOS and Android, login by QR code or username",
      },
      {
        label: "Devices",
        us: "Each attendee on their own phone",
        them: "Own phones or provided tablets; a team can share one device",
      },
      {
        label: "Checkpoints",
        us: "NFC tags and QR codes",
        them: "GPS, iBeacons, QR codes and EAN-13 barcodes",
      },
      {
        label: "Without mobile data",
        us: "Needs mobile data or venue Wi-Fi",
        them: "Offline play supported if the game is started online first",
      },
      {
        label: "Who builds the game",
        us: "Our team sets up checkpoints and rewards for your event",
        them: "You build it in the web Creator, with 400+ ready-made tasks",
      },
      {
        label: "Pricing",
        us: "Starter, Pro or Enterprise package, quoted per event; free for players",
        them: "Monthly or yearly plans with a price per team (one activated device)",
      },
      {
        label: "Typical use",
        us: "Conferences, trade fairs, festivals, campus events",
        them: "Team building, city tours, education, museum guides, events",
      },
    ],
  },

  faqHeading: "Loquiz alternative FAQ",
  faq: [
    {
      q: "How is Treasure Hunt different from Loquiz?",
      a: "Loquiz is a toolkit for building your own location-based games and tours, played in the Loquiz app by teams that may share a device. Treasure Hunt is set up for one event by our team, and every attendee plays on their own phone in the browser, tapping NFC or QR checkpoints and spending points at a prize store.",
    },
    {
      q: "When is Loquiz the better fit?",
      a: "For a programme with a known group: a team-building afternoon, a city tour, a school class with tablets, or a game you want to edit yourself and run many times. Loquiz also supports offline play once a game has been started online, which helps outdoors. Treasure Hunt needs a connection and is set up with our team per event.",
    },
    {
      q: "How does Loquiz pricing work, compared with Treasure Hunt?",
      a: "Loquiz publishes monthly and yearly plans with a price per team, and its pricing page defines one team as one activated device. At an event where most attendees play on their own phone, that count grows with the crowd. Treasure Hunt has no price list: each event is quoted once, on a Starter, Pro or Enterprise package, and players never pay.",
    },
    {
      q: "Do attendees need an app?",
      a: "Not with Treasure Hunt: it runs in the phone browser and players sign in with one tap. Loquiz players use the Loquiz app from the App Store or Google Play, and can log in by scanning a QR code.",
    },
    {
      q: "Can it run at a festival or an outdoor fair?",
      a: "Yes, as long as there is mobile coverage or Wi-Fi. The Festival da Juventude in Cadaval ran 57 checkpoints over two days, with 126 players and 2,182 finds.",
    },
    {
      q: "Can sponsors see what their checkpoint did?",
      a: "Yes. The live dashboard shows visits per checkpoint during the event, and the Enterprise package adds a post-event report you can share with sponsors.",
    },
  ],

  ctaHeading: "See Treasure Hunt as your Loquiz alternative",
  ctaSubhead: "Tell us about the venue, the dates and how many people you expect. We'll reply with a plan and a quote.",
  ctaButton: "Plan Your Event",

  related: {
    heading: "Other comparisons",
    links: [
      { href: "/goosechase-alternative", label: "Goosechase alternative" },
      { href: "/scavify-alternative", label: "Scavify alternative" },
      { href: "/actionbound-alternative", label: "Actionbound alternative" },
    ],
  },
}
