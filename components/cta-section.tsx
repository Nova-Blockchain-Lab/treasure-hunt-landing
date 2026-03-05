import { RevealOnScroll } from "./reveal-on-scroll"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#06080F]" id="cta">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(240,96,93,0.06) 0%, transparent 60%),
            #06080F
          `,
        }}
      />

      <RevealOnScroll>
        <div className="relative z-2 max-w-[720px] mx-auto text-center px-5 md:px-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] mb-6 text-balance">
            Ready to Make Your Next Event
            <br />
            <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
              Unforgettable?
            </span>
          </h2>

          <p className="text-xl text-[#8B949E] mb-4">Treasure Hunt deploys in days. Tell us about your event.</p>

          {/* Trust signal */}
          <p className="font-mono text-sm text-[#484F58] tracking-wide mb-12">
            Deployed at ETHDenver 2026 {"\u2014"} 207 players, 59 checkpoints, 4 days
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="inline-flex items-center justify-center gap-2.5 bg-[#F0605D] text-white font-display text-lg tracking-widest uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97]"
            >
              Book a Demo
            </a>
            <a
              href="https://hunt.ethdenver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent text-[#58A6FF] font-display text-lg tracking-widest uppercase px-10 py-3.5 border-2 border-[rgba(88,166,255,0.3)] rounded-lg transition-all duration-300 hover:bg-[rgba(88,166,255,0.08)] hover:border-[#58A6FF] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              {"See It Live \u2192"}
            </a>
          </div>

          <p className="font-mono text-[0.85rem] text-[#484F58] tracking-wide mt-6">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="text-[#58A6FF] border-b border-[rgba(88,166,255,0.3)] transition-colors duration-300 hover:border-[#58A6FF]"
            >
              nova.blockchain.lab@novaims.unl.pt
            </a>
          </p>
        </div>
      </RevealOnScroll>
    </section>
  )
}
