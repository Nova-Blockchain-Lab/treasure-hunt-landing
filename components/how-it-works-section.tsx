import { RevealOnScroll } from "./reveal-on-scroll"

interface HowItWorksDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  steps: { title: string; description: string }[]
}

export function HowItWorksSection({ dict }: { dict: HowItWorksDict }) {
  const stepNumbers = ["01", "02", "03"]

  return (
    <section className="py-16 md:py-32 relative bg-[#0A0E14]" id="how">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#F0605D] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#F0605D]" />
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
            className="absolute left-[23px] md:left-[28px] top-[48px] bottom-[48px] md:top-[61px] md:bottom-[61px] w-0.5"
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
      </div>
    </section>
  )
}
