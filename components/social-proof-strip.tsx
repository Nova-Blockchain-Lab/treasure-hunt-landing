import Image from "next/image"

// Mixed-polarity logo wall: light/transparent marks render bare on the dark strip;
// dark-on-white wordmarks (DwP, Spring Bootcamp) keep a white chip so they don't
// vanish. Every logo lives in a fixed-height cell + object-contain so optical
// weight is even and the two rows align on a 4-up grid (was a ragged flex-wrap).
const logos: {
  href: string
  src: string
  alt: string
  w: number
  h: number
  chip?: boolean
  svg?: boolean
  internal?: boolean
  unoptimized?: boolean
}[] = [
  { href: "https://ethdenver.com/", src: "/ETHDEN_logo_full_white.png", alt: "ETHDenver", w: 220, h: 56 },
  { href: "https://novaims.unl.pt/pt/here-now/eventos/nova-ims-career-fair-future-maker-2026/", src: "/fm-logo.png", alt: "Future Maker - NOVA IMS Career Fair", w: 220, h: 56, chip: true },
  { href: "https://portugalsmartcities.fil.pt/", src: "/pscs-logo.png", alt: "Portugal Smart Cities Summit", w: 220, h: 51 },
  // unoptimized: Next's AVIF encoder flattens this transparent PNG's alpha to opaque black at some widths; serve the PNG as-is.
  { href: "https://www.cm-cadaval.pt/2303/cadavalapresentaediopicadofestivaldajuventude2026", src: "/cadaval-festival-logo.png", alt: "Festival da Juventude · Cadaval", w: 500, h: 500, unoptimized: true },
  { href: "https://www.datawithpurpose.pt/", src: "/datasummit-logo.svg", alt: "Data with Purpose Summit 2026 · NOVA IMS", w: 180, h: 64, chip: true, svg: true },
  { href: "https://blockchainconfluence.pt/", src: "/blockchain-confluence-logo.png", alt: "Blockchain Confluence", w: 320, h: 96 },
  { href: "/springbootcamp-report", src: "/spring-bootcamp-logo.png", alt: "Spring Bootcamp · NOVA IMS", w: 246, h: 68, chip: true, internal: true },
  { href: "https://culturalweek.treasurehunt.pt", src: "/cultural-week-logo.png", alt: "Cultural Week · NOVA IMS", w: 227, h: 113 },
]

export function SocialProofStrip({ dict }: { dict: { deployedAt: string } }) {
  return (
    <div className="py-16 md:py-20 bg-[rgba(13,17,23,0.5)] border-y border-[rgba(240,246,252,0.04)]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#7D8590] text-center mb-10 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#F0605D]" />
          {dict.deployedAt}
          <span className="w-8 h-px bg-[#F0605D]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-12 items-center justify-items-center">
          {logos.map((logo) => {
            const img = logo.chip ? (
              <span className="inline-flex items-center bg-white rounded-md px-2.5 py-1.5">
                {logo.svg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.src} alt={logo.alt} className="h-9 md:h-11 w-auto object-contain" />
                ) : (
                  <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} className="max-h-9 md:max-h-11 w-auto h-auto object-contain" />
                )}
              </span>
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                unoptimized={logo.unoptimized}
                className="max-h-12 md:max-h-16 max-w-full w-auto h-auto object-contain"
              />
            )
            const className = "flex items-center justify-center h-16 md:h-20 w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
            return logo.internal ? (
              <a key={logo.src} href={logo.href} className={className}>
                {img}
              </a>
            ) : (
              <a key={logo.src} href={logo.href} target="_blank" rel="noopener noreferrer" className={className}>
                {img}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
