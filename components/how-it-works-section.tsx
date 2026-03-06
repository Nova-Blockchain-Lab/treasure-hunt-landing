import { Layers, Wallet, Users, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { GlassCard } from "./glass-card"
import { RevealOnScroll } from "./reveal-on-scroll"

const infraIcons: LucideIcon[] = [Layers, Wallet, Users, TrendingUp]

interface HowItWorksDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  callout: string
  infraEyebrow: string
  infraHeading: string
  infraHighlight: string
  infraDescription: string
  steps: { title: string; description: string }[]
  infraItems: { title: string; description: string }[]
}

export function HowItWorksSection({ dict }: { dict: HowItWorksDict }) {
  const stepNumbers = ["01", "02", "03", "04", "05"]

  return (
    <section className="py-24 md:py-32 relative bg-[#0A0E14]" id="how">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              {dict.eyebrow}
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              {dict.heading}
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative flex flex-col">
          <div
            className="absolute left-[23px] md:left-[28px] top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(240,96,93,0.3), rgba(240,96,93,0.15) 50%, transparent)",
            }}
          />

          {dict.steps.map((step, i) => (
            <RevealOnScroll key={i} delay={100 * (i + 1)} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="flex gap-5 md:gap-8 py-6 md:py-8 relative">
                <div className="shrink-0 w-12 h-12 md:w-[58px] md:h-[58px] flex items-center justify-center rounded-full font-display text-lg md:text-xl relative z-2 border-2 border-[rgba(240,96,93,0.3)] bg-[rgba(240,96,93,0.08)] text-[#F0605D]">
                  {stepNumbers[i]}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-display text-xl md:text-2xl mb-2">{step.title}</h3>
                  <p className="text-[#8B949E] text-[0.925rem] leading-relaxed max-w-[520px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={600}>
          <div className="mt-12 py-6 px-5 sm:px-8 border-l-[3px] border-[#58A6FF] bg-[rgba(88,166,255,0.04)] rounded-r-xl">
            <p className="font-mono text-[0.85rem] text-[#58A6FF] tracking-wide">
              {dict.callout}
            </p>
          </div>
        </RevealOnScroll>

        {/* Infrastructure callout */}
        <RevealOnScroll delay={700}>
          <GlassCard className="mt-16 p-5 sm:p-9">
            <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-[#58A6FF] mb-3">
              {dict.infraEyebrow}
            </div>
            <h3 className="font-display text-[clamp(1.4rem,3vw,1.8rem)] mb-2">
              {dict.infraHeading}{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.infraHighlight}
              </span>
            </h3>
            <p className="text-[0.925rem] text-[#8B949E] leading-relaxed max-w-[620px] mb-8">
              {dict.infraDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {dict.infraItems.map((item, i) => {
                const Icon = infraIcons[i]
                return (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[rgba(88,166,255,0.08)] text-[#58A6FF]">
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <h4 className="font-display text-base mb-1 tracking-wide">{item.title}</h4>
                      <p className="text-[0.82rem] text-[#484F58] leading-normal">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </section>
  )
}
