const marqueeItems = [
  "Drive Foot Traffic",
  "Reward Attendance",
  "Sponsor Visibility",
  "Custom Merch Store",
  "Real-Time Leaderboards",
  "NFC + QR Checkpoints",
  "Unicorn.eth Sign-In",
  "ETHDenver 2026",
  "NOVA Blockchain Lab",
]

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-3 px-6 md:px-10 font-display text-xs md:text-sm tracking-[0.15em] uppercase text-text-muted">
      <span className="w-1 h-1 bg-neon-pink rounded-full shrink-0" />
      {text}
    </span>
  )
}

export function MarqueeStrip() {
  // Duplicate items for seamless loop; in reduced-motion, only show one set
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-y border-neon-pink/12 py-3.5"
      style={{ background: "rgba(21,14,65,0.3)" }}
      aria-hidden="true"
    >
      <div className="inline-flex animate-[marquee_30s_linear_infinite] motion-reduce:animate-none">
        {/* First set */}
        {marqueeItems.map((item, i) => (
          <MarqueeItem key={`a-${i}`} text={item} />
        ))}
        {/* Second set for seamless loop */}
        {marqueeItems.map((item, i) => (
          <MarqueeItem key={`b-${i}`} text={item} />
        ))}
      </div>
    </div>
  )
}
