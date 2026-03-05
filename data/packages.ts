export interface Tier {
  name: string
  subtitle: string
  bestFor: string
  featured: boolean
  badge?: string
  cta: string
  mailto: string
}

export const tiers: Tier[] = [
  {
    name: "Starter",
    subtitle: "Launch in a day",
    bestFor: "50\u2013200 attendees",
    featured: false,
    cta: "Get Started",
    mailto: "mailto:nova.blockchain.lab@novaims.unl.pt?subject=Starter%20Package%20Inquiry",
  },
  {
    name: "Pro",
    subtitle: "The full experience",
    bestFor: "200\u20131,000 attendees",
    featured: true,
    badge: "Most Popular",
    cta: "Get Started",
    mailto: "mailto:nova.blockchain.lab@novaims.unl.pt?subject=Pro%20Package%20Inquiry",
  },
  {
    name: "Enterprise",
    subtitle: "Built around you",
    bestFor: "1,000+ attendees",
    featured: false,
    cta: "Talk to Us",
    mailto: "mailto:nova.blockchain.lab@novaims.unl.pt?subject=Enterprise%20Package%20Inquiry",
  },
]

export interface FeatureItem {
  label: string
  values: [string | boolean, string | boolean, string | boolean]
}

export interface Category {
  title: string
  features: FeatureItem[]
}

export const categories: Category[] = [
  {
    title: "Checkpoints",
    features: [
      { label: "QR code checkpoints", values: [true, true, true] },
      { label: "NFC tag checkpoints", values: [false, true, true] },
      { label: "Custom checkpoint design", values: [false, true, true] },
      { label: "Custom reward names", values: [false, true, true] },
    ],
  },
  {
    title: "Engagement",
    features: [
      { label: "Voting polls", values: [true, true, true] },
      { label: "Hidden NFC challenges", values: [false, true, true] },
      { label: "Social follow rewards", values: [false, true, true] },
      { label: "Dynamic difficulty scaling", values: [false, true, true] },
      { label: "Strategic sponsor placement", values: [false, true, true] },
      { label: "Merch store", values: [true, true, true] },
      { label: "Live leaderboard", values: [true, true, true] },
    ],
  },
  {
    title: "Support",
    features: [
      { label: "On-site support staff", values: [false, true, true] },
      { label: "Custom feature development", values: [false, false, true] },
      { label: "Post-event analytics report", values: [false, true, true] },
    ],
  },
]
