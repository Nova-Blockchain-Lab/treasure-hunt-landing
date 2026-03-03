"use client"

import { Check, X } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"

/* -------- data -------- */

interface Tier {
  name: string
  bestFor: string
  anchorPrice?: string
  price: string
  priceNote: string
  featured: boolean
  badge?: string
}

const tiers: Tier[] = [
  {
    name: "One-Day Event",
    bestFor: "Best for 50\u2013200 attendees",
    anchorPrice: "\u20AC5,000",
    price: "\u20AC3,000",
    priceNote: "Standard layout",
    featured: false,
  },
  {
    name: "Conference Adventure",
    bestFor: "Best for 200\u20131,000 attendees",
    anchorPrice: "\u20AC25,000",
    price: "\u20AC17,000*",
    priceNote: 'Customised layout (e.g. "TH X Edition")',
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Legendary Experience",
    bestFor: "Best for 1,000+ attendees",
    price: "On Consultation",
    priceNote: "Fully customised layout",
    featured: false,
  },
]

interface FeatureItem {
  label: string
  values: [string | boolean, string | boolean, string | boolean]
}

interface Category {
  title: string
  features: FeatureItem[]
}

const categories: Category[] = [
  {
    title: "Checkpoints",
    features: [
      { label: "QR Codes", values: [true, true, true] },
      { label: "NFC Tags", values: [false, "Standard", "Customised"] },
      { label: "Checkpoint design", values: ["Standard", "Customised", "Fully customised"] },
      { label: "Reward name", values: ["Standard", "Customised", "Customised"] },
    ],
  },
  {
    title: "Functionalities",
    features: [
      { label: "QR-based quizzes", values: [true, true, true] },
      { label: "QR-based voting polls", values: [true, true, true] },
      { label: "NFC tag hidden challenges", values: [false, true, true] },
      { label: "Follow social for rewards", values: [false, true, true] },
      { label: "Increasing engagement responsiveness", values: [false, true, true] },
      { label: "Place NFC tags strategically on stands", values: [false, true, true] },
      { label: "Merch store integration", values: [true, true, true] },
      { label: "Leaderboard", values: ["Simple", "Simple", "Simple"] },
    ],
  },
  {
    title: "Backoffice & Support",
    features: [
      { label: "Backoffice", values: ["Self-service", "Support + self-service", "Full support + self-service"] },
      { label: "On-site support staff", values: [false, "2 included", "Scalable team"] },
      { label: "Functionalities customisation", values: [false, true, "Fully bespoke"] },
      { label: "Post-event analytics", values: [false, true, "Advanced impact report"] },
    ],
  },
]

/* Build a flat ordered list of "rows" so every card renders
   the same number of blocks in the same order, keeping them aligned. */

type Row =
  | { type: "category"; title: string }
  | { type: "feature"; label: string; catIndex: number; featIndex: number }

const rows: Row[] = categories.flatMap((cat, ci) => [
  { type: "category" as const, title: cat.title },
  ...cat.features.map((f, fi) => ({
    type: "feature" as const,
    label: f.label,
    catIndex: ci,
    featIndex: fi,
  })),
])

/* -------- Feature value cell -------- */

function FeatureValue({ val }: { val: boolean | string }) {
  if (val === true) {
    return (
      <span className="inline-flex w-4 h-4 items-center justify-center rounded-sm bg-neon-cyan/12 text-neon-cyan">
        <Check className="w-2.5 h-2.5" strokeWidth={3} />
      </span>
    )
  }
  if (val === false) {
    return (
      <span className="inline-flex w-4 h-4 items-center justify-center rounded-sm bg-[rgba(255,80,80,0.12)] text-[#ff5050] opacity-50">
        <X className="w-2.5 h-2.5" strokeWidth={3} />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex w-4 h-4 items-center justify-center rounded-sm bg-neon-cyan/12 text-neon-cyan shrink-0">
        <Check className="w-2.5 h-2.5" strokeWidth={3} />
      </span>
      <span className="text-neon-cyan/70 text-[0.72rem]">{val}</span>
    </span>
  )
}

/* -------- Single Package Card -------- */

function PackageCard({ tierIndex }: { tierIndex: number }) {
  const t = tiers[tierIndex]

  return (
    <div
      className={`relative rounded-2xl border p-7 transition-all duration-400 hover:-translate-y-1 ${
        t.featured
          ? "border-neon-cyan/40 shadow-[0_0_30px_rgba(34,209,238,0.1),0_0_60px_rgba(34,209,238,0.05)] hover:border-neon-cyan/50"
          : "border-white/8 hover:border-neon-pink/35"
      }`}
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
    >
      {/* Badge */}
      {t.badge && (
        <div className="absolute top-4 right-4 bg-linear-to-br from-neon-cyan to-neon-purple text-white font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 rounded-full">
          {t.badge}
        </div>
      )}

      {/* ---- HEADER: fixed height so price blocks align ---- */}
      <div className="h-[180px] flex flex-col">
        <div className="font-display text-[1.6rem] tracking-[0.06em] mb-2">{t.name}</div>
        <div className="text-[0.82rem] text-text-muted mb-5">{t.bestFor}</div>

        {t.anchorPrice ? (
          <div className="text-[0.85rem] text-text-muted line-through mb-1">{t.anchorPrice}</div>
        ) : (
          <div className="text-[0.85rem] invisible mb-1">&nbsp;</div>
        )}

        <div
          className={`font-display tracking-[0.02em] mb-1 ${
            t.price === "On Consultation" ? "text-[1.6rem]" : "text-[2.4rem]"
          }`}
        >
          {t.price}
        </div>
        <div className="text-[0.72rem] text-text-muted">{t.priceNote}</div>
      </div>

      {/* ---- DIVIDER ---- */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent my-4" />

      {/* ---- FEATURE ROWS: fixed height per row for alignment ---- */}
      {rows.map((row, i) => {
        if (row.type === "category") {
          return (
            <div key={i} className="h-[36px] flex items-end">
              <span className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-neon-cyan pb-1">
                {row.title}
              </span>
            </div>
          )
        }

        const val = categories[row.catIndex].features[row.featIndex].values[tierIndex]
        const excluded = val === false

        return (
          <div
            key={i}
            className={`h-[32px] flex items-center gap-2.5 text-[0.8rem] ${
              excluded ? "opacity-40 text-text-muted" : "text-text-secondary"
            }`}
          >
            <FeatureValue val={val} />
            <span className="leading-tight">{row.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* -------- Section -------- */

export function PackagesSection() {
  return (
    <section
      className="py-20 md:py-[120px] relative"
      id="packages"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(255,87,177,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(98,69,235,0.05) 0%, transparent 50%),
          var(--bg-primary)
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-neon-cyan" />
              04 / Packages
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] mb-6 text-balance">
              Choose Your
              <br />
              <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Adventure Package
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Cards grid -- scrollable on mobile, 3-col on desktop */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((_, i) => (
              <PackageCard key={i} tierIndex={i} />
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="text-center mt-10 text-[0.78rem] text-text-muted italic max-w-[700px] mx-auto leading-relaxed">
            *Dislocation costs for on-site support are calculated depending on event location and include flights,
            accommodation, and per diems.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
