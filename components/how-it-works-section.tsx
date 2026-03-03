import { Layers, Wallet, Users, TrendingUp } from "lucide-react"
import { GlassCard } from "./glass-card"
import { RevealOnScroll } from "./reveal-on-scroll"

const steps = [
  {
    number: "01",
    title: "Open the Game",
    description:
      "Visit the URL on your phone. Sign in with one tap. No app download, no complex setup. You're playing in 30 seconds.",
    color: "border-neon-pink/40 bg-neon-pink/15 text-neon-pink",
  },
  {
    number: "02",
    title: "Explore the Venue",
    description:
      "Checkpoints are placed strategically across the event. Follow the map, discover hidden spots, and uncover rewards around every corner.",
    color: "border-neon-purple/40 bg-neon-purple/15 text-neon-purple",
  },
  {
    number: "03",
    title: "Scan to Collect",
    description:
      "Tap an NFC tag or scan a QR code. Instant reward. One touch, one point \u2014 collected and tracked automatically.",
    color: "border-neon-cyan/40 bg-neon-cyan/15 text-neon-cyan",
  },
  {
    number: "04",
    title: "Compete on the Leaderboard",
    description:
      "Live rankings update in real time. Social challenges and collaborative missions keep the energy high all day.",
    color: "border-neon-yellow/40 bg-neon-yellow/15 text-neon-yellow",
  },
  {
    number: "05",
    title: "Spend at the Merch Store",
    description:
      "Rewards unlock real prizes \u2014 socks, hats, exclusive items. The built-in merch store turns points into something attendees take home.",
    color: "border-neon-blue/40 bg-neon-blue/15 text-neon-blue",
  },
]

const infraItems = [
  {
    icon: Layers,
    color: "bg-neon-purple/12 text-neon-purple",
    title: "Runs on Nova Cidade L3",
    description:
      "A dedicated Layer 3 network built for speed. Every action \u2014 scans, rewards, purchases \u2014 is recorded transparently and verifiably.",
  },
  {
    icon: Wallet,
    color: "bg-neon-cyan/12 text-neon-cyan",
    title: "Zero Cost to Participants",
    description:
      "A built-in paymaster covers all transaction fees. Attendees collect rewards, spend at the merch store, and climb leaderboards without ever paying a cent.",
  },
  {
    icon: Users,
    color: "bg-neon-pink/12 text-neon-pink",
    title: "One-Tap Sign-In via unicorn.eth",
    description:
      "No seed phrases, no wallet setup, no tech knowledge needed. Attendees tap once and they're in. The unicorn.eth integration handles everything behind the scenes.",
  },
  {
    icon: TrendingUp,
    color: "bg-neon-yellow/12 text-neon-yellow",
    title: "Fully Transparent & Auditable",
    description:
      "Every reward minted, every checkpoint scanned, every merch purchase \u2014 recorded and verifiable. Give sponsors and stakeholders engagement data they can trust.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      className="py-20 md:py-[120px] relative"
      id="how"
      style={{
        background: `
          radial-gradient(ellipse at 80% 30%, rgba(255,87,177,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(34,209,238,0.04) 0%, transparent 50%),
          var(--bg-primary)
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-neon-cyan" />
              02 / How It Works
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] mb-6 text-balance">
              Five Steps.
              <br />
              <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Zero Friction.
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative flex flex-col">
          {/* Timeline line */}
          <div
            className="absolute left-[23px] md:left-[28px] top-0 bottom-0 w-0.5 opacity-30"
            style={{
              background:
                "linear-gradient(180deg, var(--neon-pink), var(--neon-purple) 25%, var(--neon-cyan) 50%, var(--neon-purple) 75%, var(--neon-pink))",
            }}
          />

          {steps.map((step, i) => (
            <RevealOnScroll key={i} delay={100 * (i + 1)}>
              <div className="flex gap-5 md:gap-8 py-6 md:py-8 relative">
                <div
                  className={`shrink-0 w-12 h-12 md:w-[58px] md:h-[58px] flex items-center justify-center rounded-full font-display text-lg md:text-xl relative z-2 border-2 ${step.color}`}
                >
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-display text-xl md:text-2xl mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-[0.92rem] leading-relaxed max-w-[520px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={600}>
          <div className="mt-12 py-6 px-8 border-l-[3px] border-neon-cyan bg-neon-cyan/[0.04] rounded-r-xl">
            <p className="font-mono text-[0.85rem] text-neon-cyan tracking-wide">
              You control the checkpoints, the rewards, and the prizes. We handle the technology.
            </p>
          </div>
        </RevealOnScroll>

        {/* Infrastructure callout */}
        <RevealOnScroll delay={700}>
          <GlassCard className="mt-16 p-9">
            <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-neon-purple mb-3">
              What Powers It All
            </div>
            <h3 className="font-display text-[clamp(1.4rem,3vw,1.8rem)] mb-2">
              Why It Feels{" "}
              <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Like Magic
              </span>
            </h3>
            <p className="text-[0.92rem] text-text-secondary leading-relaxed max-w-[620px] mb-8">
              Behind every scan, every reward, and every leaderboard update is real infrastructure built for speed,
              transparency, and zero friction. Your attendees never see the complexity {"\u2014"} they just play.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {infraItems.map((item, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div
                    className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-lg ${item.color}`}
                  >
                    <item.icon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <h4 className="font-display text-base mb-1 tracking-wide">{item.title}</h4>
                    <p className="text-[0.82rem] text-text-muted leading-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </section>
  )
}
