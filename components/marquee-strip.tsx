function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-3 px-6 md:px-10 font-display text-xs md:text-sm tracking-[0.15em] uppercase text-[#484F58]">
      <span className="w-1 h-1 bg-[#484F58] rounded-full shrink-0" />
      {text}
    </span>
  )
}

export function MarqueeStrip({ items }: { items: string[] }) {
  return (
    <div
      className="group overflow-hidden whitespace-nowrap border-y border-[rgba(240,246,252,0.04)] py-3.5 bg-[rgba(13,17,23,0.3)]"
      aria-hidden="true"
    >
      <div className="inline-flex animate-[marquee_30s_linear_infinite] motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <MarqueeItem key={`a-${i}`} text={item} />
        ))}
        {items.map((item, i) => (
          <MarqueeItem key={`b-${i}`} text={item} />
        ))}
      </div>
    </div>
  )
}
