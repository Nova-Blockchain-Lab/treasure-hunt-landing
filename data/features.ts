export const features = [
  {
    iconName: "MapPin" as const,
    title: "Guide Foot Traffic",
    description:
      "You decide where checkpoints go. Every checkpoint is a reason to walk across the venue \u2014 driving traffic to sponsors, booths, and underexplored areas.",
  },
  {
    iconName: "Sparkles" as const,
    title: "Reward Real Participation",
    description:
      "Attendees earn rewards for engaging \u2014 not just showing up. Points they can spend in the built-in merch store on hats, socks, and exclusive items.",
  },
  {
    iconName: "Smartphone" as const,
    title: "Plug Into Any Venue",
    description:
      "Drop NFC tags or QR codes anywhere. Works on any phone browser with a simple sign-in \u2014 attendees are playing in under 30 seconds, no app download required.",
  },
  {
    iconName: "TrendingUp" as const,
    title: "Track Everything in Real Time",
    description:
      "See which checkpoints are visited, which areas are underexplored, and who your most engaged attendees are. Live analytics for organizers.",
  },
]

export type FeatureIconName = (typeof features)[number]["iconName"]
