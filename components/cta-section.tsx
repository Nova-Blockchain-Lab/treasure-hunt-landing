import { RevealOnScroll } from "./reveal-on-scroll"

export function CTASection() {
  return (
    <section className="py-24 md:py-[100px] relative overflow-hidden" id="cta">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(255,87,177,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 80%, rgba(98,69,235,0.08) 0%, transparent 50%),
            var(--bg-primary)
          `,
        }}
      />

      <RevealOnScroll>
        <div className="relative z-2 max-w-[720px] mx-auto text-center px-5 md:px-6">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] mb-6 leading-none text-balance">
            Ready to Make Your Next Event
            <br />
            <span className="bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Unforgettable?
            </span>
          </h2>

          <p className="text-xl text-text-secondary mb-3">Treasure Hunt deploys in days. Tell us about your event.</p>

          <p className="font-mono text-[0.82rem] text-neon-cyan tracking-wide mb-12">
            You bring the venue. We bring the game.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="inline-flex items-center justify-center gap-2.5 bg-linear-to-br from-neon-pink to-[#e04a9e] text-white font-display text-lg tracking-widest uppercase px-10 py-4 rounded-lg shadow-[var(--glow-pink)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_40px_rgba(255,87,177,0.7),0_0_80px_rgba(255,87,177,0.3)] active:scale-[0.97]"
            >
              Book a Demo
            </a>
            <a
              href="https://hunt.ethdenver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent text-neon-cyan font-display text-lg tracking-widest uppercase px-10 py-3.5 border-2 border-neon-cyan/40 rounded-lg transition-all duration-300 hover:bg-neon-cyan/[0.08] hover:border-neon-cyan hover:shadow-[var(--glow-cyan)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              {"See Treasure Hunt in Action \u2192"}
            </a>
          </div>

          <p className="font-mono text-[0.85rem] text-text-muted tracking-wide mt-6">
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="text-neon-cyan border-b border-neon-cyan/30 transition-colors duration-300 hover:border-neon-cyan"
            >
              nova.blockchain.lab@novaims.unl.pt
            </a>
          </p>
        </div>
      </RevealOnScroll>
    </section>
  )
}
