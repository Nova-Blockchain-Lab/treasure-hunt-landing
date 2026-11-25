import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "scavenger-hunt-universities",
  locale: "en",
  title: "University Scavenger Hunt | Treasure Hunt",
  description:
    "Run a university scavenger hunt for orientation week, open days and campus events. Tap-to-play, no app download, live leaderboard. Deployed at NOVA IMS.",

  eyebrow: "FOR UNIVERSITIES",
  headline: "The University Scavenger Hunt",
  headlineHighlight: "That Maps Your Campus",
  subhead:
    "Turn orientation week, open days and campus events into a game. New students tap hidden NFC checkpoints in their phone browser, with nothing to install, and learn where everything is while chasing a live leaderboard.",
  trust: "Deployed at NOVA IMS: Future Maker, Spring Bootcamp and the Data with Purpose Summit",
  primaryCta: "Plan Your Campus Event",

  stats: [
    { value: "71,000+", label: "treasures found" },
    { value: "3,500+", label: "players" },
    { value: "3,700+", label: "prizes redeemed" },
    { value: "9", label: "events" },
  ],

  benefitsHeading: "Why it works for",
  benefitsHighlight: "campus events",
  benefitsIntro:
    "A university scavenger hunt does two jobs at once: it breaks the ice for new students and it teaches them the campus by sending them to the buildings, departments and services they will actually use.",
  benefits: [
    {
      icon: "GraduationCap",
      title: "Built for orientation",
      description:
        "Send first-years to the library, the labs, the student union and the cafeteria. They learn the campus by visiting it, not by reading a map they will forget.",
    },
    {
      icon: "Smartphone",
      title: "No app download",
      description:
        "Students sign in and start playing in the mobile browser within about 30 seconds. Nothing to install on day one, when nobody wants another app.",
    },
    {
      icon: "Users",
      title: "Breaks the ice",
      description:
        "Roaming the campus to find checkpoints gets new students talking and moving together instead of waiting in a hall for a welcome talk to start.",
    },
    {
      icon: "Building2",
      title: "Reach every department on open days",
      description:
        "On open days a scavenger hunt pulls prospective students and families to every department and facility you want them to see, not just the main entrance.",
    },
    {
      icon: "BarChart3",
      title: "See where they go",
      description:
        "A real-time dashboard shows which checkpoints get traffic and which buildings get missed, and you take home a full post-event report.",
    },
    {
      icon: "Gift",
      title: "Rewards they keep",
      description:
        "Points convert to real merch in an in-app store, so the hunt ends with branded swag in students' hands rather than a forgotten leaderboard.",
    },
  ],

  steps: {
    heading: "How a campus hunt runs",
    items: [
      {
        title: "Map the campus",
        description:
          "We place NFC checkpoints at the buildings, departments and services you want students to find: library, labs, union, faculties, registry.",
      },
      {
        title: "Students tap to play",
        description:
          "They tap a checkpoint, sign in on their phone and start the hunt. No app, no registration desk queue, no waiting for staff to hand anything out.",
      },
      {
        title: "You watch it live",
        description:
          "Track finds and foot traffic across campus in real time, reward the leaders at the closing event, and get a full report afterwards.",
      },
    ],
  },

  faqHeading: "University scavenger hunt FAQ",
  faq: [
    {
      q: "Is a university scavenger hunt good for orientation week?",
      a: "Yes, it is the most common use. New students learn the campus by visiting the buildings and services they will use, and they break the ice with each other while doing it. We run it across NOVA IMS for exactly this.",
    },
    {
      q: "Do students need to download an app?",
      a: "No. The whole game runs in the mobile browser. Students sign in and start tapping checkpoints within about 30 seconds, with nothing to install.",
    },
    {
      q: "Can we use it on open days for prospective students?",
      a: "Yes. On open days the hunt pulls visitors and families to every department and facility you want them to see, instead of letting them cluster at the entrance.",
    },
    {
      q: "Which phones work?",
      a: "Any recent iPhone or Android phone a student already carries reads the NFC tags with nothing to set up. Each checkpoint also carries a QR code, so a phone that can't tap scans it with the camera instead.",
    },
    {
      q: "How many checkpoints can a campus have?",
      a: "From a handful to hundreds. Our Future Maker event at NOVA IMS ran 115 checkpoints with more than 2,500 finds across the campus.",
    },
    {
      q: "Can it be team-based for cohorts or societies?",
      a: "Yes. We ran the NOVA IMS Spring Bootcamp as a team game, and individual play works just as well. Either way the leaderboard updates in real time.",
    },
    {
      q: "What do we get after the event?",
      a: "A full post-event report: total finds, unique players, the busiest checkpoints and time-of-day patterns across the campus.",
    },
  ],

  ctaHeading: "Bring a scavenger hunt to your campus",
  ctaSubhead:
    "Tell us about your campus and dates, whether that is orientation, an open day or something else. We'll put together a plan and a quote.",
  ctaButton: "Plan Your Campus Event",
}
