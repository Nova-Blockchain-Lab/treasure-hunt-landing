import { MapPin, Sparkles, Smartphone, TrendingUp } from "lucide-react"
import { GlassCard } from "./glass-card"
import { RevealOnScroll } from "./reveal-on-scroll"

const features = [
  {
    icon: MapPin,
    color: "cyan" as const,
    title: "Guide Foot Traffic",
    description:
      "You decide where checkpoints go. Every checkpoint is a reason to walk across the venue \u2014 driving traffic to sponsors, booths, and underexplored areas.",
  },
  {
    icon: Sparkles,
    color: "pink" as const,
    title: "Reward Real Participation",
    description:
      "Attendees earn rewards for engaging \u2014 not just showing up. Points they can spend in the built-in merch store on hats, socks, and exclusive items.",
  },
  {
    icon: Smartphone,
    color: "purple" as const,
    title: "Plug Into Any Venue",
    description:
      "Drop NFC tags or QR codes anywhere. Works on any phone browser with a simple sign-in \u2014 attendees are playing in under 30 seconds, no app download required.",
  },
  {
    icon: TrendingUp,
    color: "yellow" as const,
    title: "Track Everything in Real Time",
    description:
      "See which checkpoints are visited, which areas are underexplored, and who your most engaged attendees are. Live analytics for organizers.",
  },
]

const iconColorMap = {
  cyan: "bg-neon-cyan/12 text-neon-cyan",
  pink: "bg-neon-pink/12 text-neon-pink",
  purple: "bg-neon-purple/12 text-neon-purple",
  yellow: "bg-neon-yellow/12 text-neon-yellow",
}

export function FeaturesSection() {
  return (
    <section
      className="py-20 md:py-[120px] relative"
      id="what"
      style={{
        background: `
          radial-gradient(ellipse at 10% 50%, rgba(98,69,235,0.06) 0%, transparent 50%),
          var(--bg-primary)
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-neon-cyan" />
              01 / Features
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] mb-6 text-balance">
              What Treasure Hunt
              <br />
              <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Does for Your Event
              </span>
            </h2>
            <p className="text-[1.05rem] text-text-secondary max-w-[680px] leading-relaxed">
              Treasure Hunt turns any venue into an interactive game. Attendees explore your space, scan checkpoints,
              earn rewards, and compete on live leaderboards {"\u2014"} all from their phone browser, no app download
              required.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <RevealOnScroll key={i} delay={100 * (i + 1)}>
              <GlassCard className="p-9 transition-all duration-400 hover:border-neon-pink/35 hover:-translate-y-1">
                <div
                  className={`w-12 h-12 flex items-center justify-center mb-5 rounded-xl ${iconColorMap[feature.color]}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl mb-3">{feature.title}</h3>
                <p className="text-text-secondary text-[0.9rem] leading-relaxed">{feature.description}</p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
