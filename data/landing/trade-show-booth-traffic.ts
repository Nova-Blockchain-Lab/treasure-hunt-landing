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
    "Hide a checkpoint at each booth and the floor turns into a game. Attendees tap to play in their phone browser, with nothing to install, and chase finds straight to the booths you want them to visit.",
  trust: "Numbers below are from the Portugal Smart Cities Summit, May 2026",
  primaryCta: "Plan Your Event",

  stats: [
    { value: "103", label: "booths as checkpoints" },
    { value: "8,123", label: "booth visits logged" },
    { value: "77", label: "median finds per booth" },
    { value: "77%", label: "booths past 50 finds" },
  ],

  benefitsHeading: "Pull crowds to",
  benefitsHighlight: "every booth on the floor",
  benefitsIntro:
    "Trade show foot traffic clusters near the entrance and the big sponsors. Everyone who has exhibited from a back aisle knows the feeling. At the Portugal Smart Cities Summit we turned all 103 exhibitor stands into checkpoints and watched what happened: the busiest booth logged 245 finds, the median booth logged 77, and only 9 of the 103 finished under 25. A checkpoint at each booth gives attendees a reason to walk the whole floor, and it gives you a number for how well that worked.",
  benefits: [
    {
      icon: "Target",
      title: "Traffic reaches the back aisles",
      description:
        "Put a checkpoint at each booth and attendees come to scan it. At one event a vendor stuck in a back corner had a checkpoint hidden there. People kept arriving to scan, saw the products and bought. It turned their weekend around. Across the Smart Cities floor, 79 of 103 booths passed 50 recorded visits, including the ones nobody would have walked to on their own.",
    },
    {
      icon: "Nfc",
      title: "Tap, don't scan",
      description:
        "A single tap on an NFC tag at the booth opens the challenge instantly. No camera to launch, no tiny QR code to line up in a crowded aisle, no queue forming in front of the stand while someone fights with autofocus. Every checkpoint also carries a QR code for phones that cannot tap.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "Attendees sign in and start playing in the mobile browser within about 30 seconds. Nothing stands between them and the first booth. This is usually the difference between a game people join on the way in and one that never gets past the registration desk.",
    },
    {
      icon: "BarChart3",
      title: "Foot-traffic analytics per booth",
      description:
        "Each checkpoint records how many people found it, how many of them were unique, and when. You see which booths pull crowds and which stay quiet while the show is still running, so you can move signage or push a leaderboard prize at the right moment. Afterwards every exhibitor can be handed the traffic their own booth earned.",
    },
    {
      icon: "Trophy",
      title: "A reason to stay past the keynote",
      description:
        "Every scan updates a live leaderboard. The afternoon drop-off is the part of a show floor that exhibitors complain about most, and a running scoreboard is one of the few things that keeps people circulating through it. At Smart Cities the busiest hour on the second day was 3pm, not the morning rush at the doors.",
    },
    {
      icon: "Gift",
      title: "Rewards attendees actually want",
      description:
        "Points convert to real merch in an in-app store, so working the floor pays off in something people take home. 717 items were claimed at Smart Cities and 91% of players claimed a reward at least once. Exhibitors can put their own merch in the store, which is a cheaper way to place branded items in hands than a giveaway table.",
    },
  ],

  comparison: {
    heading: "How it compares with the usual ways to pull booth traffic",
    ourLabel: "Checkpoint hunt",
    theirLabel: "Passport card or raffle drum",
    rows: [
      {
        label: "Attendee effort",
        us: "Tap a tag on the phone they are already holding.",
        them: "Carry a paper card, find someone to stamp it, keep it until the draw.",
      },
      {
        label: "Who gets traffic",
        us: "Every booth with a checkpoint, including back aisles.",
        them: "Usually only the sponsors who paid for a stamp slot.",
      },
      {
        label: "What the exhibitor learns",
        us: "Finds, unique visitors and time of day for their own booth.",
        them: "A pile of cards, if the organiser shares them at all.",
      },
      {
        label: "When you see the data",
        us: "Live during the show and in a written report after.",
        them: "After the draw, by counting.",
      },
      {
        label: "Cost to the attendee",
        us: "Nothing. No app, no account fee.",
        them: "Nothing, but the card is easy to lose.",
      },
      {
        label: "Setup on site",
        us: "One tag per booth, placed during build-up.",
        them: "Printing, distribution and staffing the collection point.",
      },
    ],
  },

  steps: {
    heading: "How a booth hunt runs",
    items: [
      {
        title: "Place a checkpoint per booth",
        description:
          "We work from the floor plan and put an NFC tag or QR checkpoint at each exhibitor stand, including the back corners that normally get skipped. Checkpoints can also go on stages, catering areas and registration, which is how you find out where people actually cluster between sessions.",
      },
      {
        title: "Attendees tap to play",
        description:
          "Players tap a checkpoint, sign in on their phone and start collecting booths. There is no app, no queue at a registration desk and no code to type in. At Smart Cities 351 people played across three days, and 42 of them came back on a second or third day.",
      },
      {
        title: "You watch the floor live",
        description:
          "Track scans and booth traffic as they happen, reward the leaders while people are still on the floor, and give every exhibitor a report on the visits their stand earned. The organiser report also breaks the venue into zones, which is what tells you whether one sector of the hall was quietly dying.",
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
      a: "From a handful to the whole floor. The Portugal Smart Cities Summit ran 103 booth checkpoints across six zones of the hall, stage areas included.",
    },
    {
      q: "What do exhibitors and sponsors get out of it?",
      a: "Foot traffic and proof of it. Each booth earns scans, and sponsors can take home a report showing exactly how many attendees their checkpoint pulled in, how many were unique, and when they came.",
    },
    {
      q: "Does it actually reach the quiet booths, or just the popular ones?",
      a: "Traffic is never perfectly even, but it spreads a lot further than it does on its own. At Smart Cities the top booth recorded 245 finds and the median booth recorded 77, with 79 of the 103 booths past 50. Nine finished under 25.",
    },
    {
      q: "What if a phone can't read NFC?",
      a: "Every checkpoint also works as a QR code, so nobody on the floor is left out. Modern iPhones and Android phones read NFC tags out of the box.",
    },
    {
      q: "What do we get after the show?",
      a: "A written report covering total finds, unique players, a ranked table of every booth, zone by zone totals and time-of-day patterns across the floor. Past reports are published on this site rather than kept as sales material, so you can read the format before you commit.",
    },
  ],

  ctaHeading: "Drive booth traffic at your next trade show",
  ctaSubhead: "Tell us about your floor plan and dates. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Event",
}
