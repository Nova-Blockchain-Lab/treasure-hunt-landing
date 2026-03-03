import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen md:min-h-screen flex items-center overflow-hidden pt-[72px]" id="hero">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(255,87,177,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(34,209,238,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(98,69,235,0.08) 0%, transparent 60%),
            var(--bg-primary)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(34,209,238,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,209,238,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Scanline */}
      <div
        className="absolute left-0 w-full h-20 pointer-events-none animate-[scanline_8s_linear_infinite]"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(34,209,238,0.025), transparent)",
        }}
      />

      {/* Blobs - fixed: clamped size and opacity on mobile to prevent overflow */}
      <div
        className="absolute rounded-full pointer-events-none w-[300px] h-[300px] md:w-[600px] md:h-[600px] -top-[10%] -right-[5%] opacity-40 md:opacity-100 animate-[float_20s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(255,87,177,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none w-[250px] h-[250px] md:w-[500px] md:h-[500px] -bottom-[5%] -left-[10%] opacity-40 md:opacity-100 animate-[float-reverse_18s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(34,209,238,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none w-[200px] h-[200px] md:w-[400px] md:h-[400px] top-[40%] left-[50%] opacity-40 md:opacity-100 animate-[float_22s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(98,69,235,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "-8s",
        }}
      />

      {/* Content */}
      <div className="relative z-2 max-w-[820px] mx-auto px-5 md:px-6 py-10 md:py-[60px]">
        <Image
          src="/Design_sem_nome.png"
          alt="Treasure Hunt - ETHDenver Edition"
          width={520}
          height={200}
          className="block max-w-[220px] sm:max-w-[340px] md:max-w-[520px] mx-auto mb-6 animate-[fade-slide-up_0.6s_ease-out_0.1s_both] h-auto"
          style={{ width: "auto", height: "auto" }}
          priority
        />

        <h1 className="font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] mb-7 animate-[fade-slide-up_0.8s_ease-out_0.4s_both] text-balance">
          Turn Your Event
          <br />
          <span className="bg-linear-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Into an Adventure Attendees Actually Talk About
          </span>
        </h1>

        <p className="text-[clamp(1rem,2vw,1.25rem)] font-normal text-white mb-6 max-w-[640px] animate-[fade-slide-up_0.8s_ease-out_0.6s_both]">
          <strong className="font-semibold">Real rewards. Real engagement. Real results</strong> {"\u2014"} a gamified
          experience built directly into your physical venue
        </p>

        <p className="text-[0.95rem] font-light text-white/90 leading-relaxed max-w-[720px] mb-10 animate-[fade-slide-up_0.8s_ease-out_0.8s_both]">
          Treasure Hunt is a gamified engagement platform that turns conferences, festivals, campuses and corporate
          environments into interactive adventures. Participants open the game on their phone and explore the venue
          searching for NFC tags or QR codes. Each discovery unlocks rewards, challenges, and leaderboard progression
          {"\u2014"} all tracked in real time with full organizer analytics.
        </p>

        {/* CTA Buttons - fixed: proper text wrapping on small mobile */}
        <div className="flex flex-col sm:flex-row gap-4 animate-[fade-slide-up_0.8s_ease-out_1s_both]">
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2.5 bg-linear-to-br from-neon-pink to-[#e04a9e] text-white font-display text-lg tracking-widest uppercase px-8 sm:px-10 py-4 rounded-lg cursor-pointer shadow-[var(--glow-pink)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_40px_rgba(255,87,177,0.7),0_0_80px_rgba(255,87,177,0.3)] active:scale-[0.97] text-center"
          >
            Deploy at Your Event
          </a>
          <a
            href="https://hunt.ethdenver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-transparent text-neon-cyan font-display text-lg tracking-widest uppercase px-8 sm:px-10 py-3.5 border-2 border-neon-cyan/40 rounded-lg cursor-pointer transition-all duration-300 hover:bg-neon-cyan/[0.08] hover:border-neon-cyan hover:shadow-[var(--glow-cyan)] hover:-translate-y-0.5 active:scale-[0.97] text-center whitespace-nowrap text-base sm:text-lg"
          >
            {"See Treasure Hunt in Action \u2192"}
          </a>
        </div>
      </div>
    </section>
  )
}
