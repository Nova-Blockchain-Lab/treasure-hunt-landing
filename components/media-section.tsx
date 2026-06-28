"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { TextShimmer } from "./text-shimmer"

interface MediaDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  subheading: string
  watchInterview: string
  quote: string
  quoteName: string
  quoteRole: string
  quoteContext: string
  galleryHeading: string
  photo1Alt: string
  photo2Alt: string
  photo3Alt: string
  photo4Alt: string
  photo5Alt: string
  photo6Alt: string
  clip1Alt: string
  clip2Alt: string
}

export function MediaSection({ dict }: { dict: MediaDict }) {
  // Respect prefers-reduced-motion: don't autoplay the gameplay clips, show their posters instead.
  const [allowAutoplay, setAllowAutoplay] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setAllowAutoplay(!mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Real width/height keep each shot at its natural aspect ratio in the masonry
  // (most are portrait phone photos) instead of getting cropped to a fixed box.
  // `box` forces an aspect for the lone landscape shot so it caps a column cleanly
  // instead of orphaning a short wide sliver at the bottom.
  const photos = [
    { src: "/media/flyer-claim.jpg", alt: dict.photo1Alt, w: 900, h: 1600 },
    { src: "/media/datasummit-tap.jpg", alt: dict.photo4Alt, w: 1080, h: 1040 },
    { src: "/media/booth-demo.jpg", alt: dict.photo2Alt, w: 3464, h: 4618 },
    { src: "/media/merch-hats.jpg", alt: dict.photo5Alt, w: 900, h: 1600 },
    { src: "/media/merch-hoodie.jpg", alt: dict.photo6Alt, w: 1350, h: 1600 },
    { src: "/media/team-celebration.jpg", alt: dict.photo3Alt, w: 4032, h: 2268, box: "aspect-[3/2]" },
  ]
  const clips = [
    { src: "/media/winner-reaction.mp4", poster: "/media/winner-reaction-poster.jpg", label: dict.clip1Alt },
    { src: "/media/gameplay-tap.mp4", poster: "/media/gameplay-tap-poster.jpg", label: dict.clip2Alt },
  ]

  // Interleave tall (portrait photos + clips) and short (booth, hoodie, boxed team)
  // tiles so the CSS-columns masonry balances and the clips sit mid-gallery.
  const gallery: Array<
    | { kind: "photo"; item: (typeof photos)[number] }
    | { kind: "clip"; item: (typeof clips)[number] }
  > = [
    { kind: "photo", item: photos[0] }, // flyer (tall)
    { kind: "photo", item: photos[2] }, // booth (short)
    { kind: "clip", item: clips[0] },   // winner (tall)
    { kind: "photo", item: photos[1] }, // datasummit tap (square)
    { kind: "photo", item: photos[4] }, // hoodie (short)
    { kind: "clip", item: clips[1] },   // gameplay (tall)
    { kind: "photo", item: photos[3] }, // hats (tall)
    { kind: "photo", item: photos[5] }, // team (short, boxed) — caps the column
  ]

  return (
    <section id="media" className="py-16 md:py-32 relative bg-[#06080F]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#F0605D]" />
              <TextShimmer duration={3} spread={1.5} className="font-mono text-xs tracking-[0.2em] uppercase [--base-color:#F0605D] [--base-gradient-color:#E6EDF3]">
                {dict.eyebrow}
              </TextShimmer>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-5 text-balance">
              {dict.heading}{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>
            </h2>
            <p className="text-[#8B949E] text-base md:text-lg max-w-[60ch] leading-relaxed">{dict.subheading}</p>
          </div>
        </RevealOnScroll>

        {/* Featured interview + pull quote */}
        <RevealOnScroll delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 mb-5 md:mb-6">
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[rgba(240,246,252,0.08)] bg-black">
              <span className="absolute top-4 left-4 z-10 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#E6EDF3] bg-[rgba(6,8,15,0.65)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(240,246,252,0.1)] pointer-events-none">
                {dict.watchInterview}
              </span>
              <video
                controls
                preload="none"
                playsInline
                poster="/media/interview-poster.jpg"
                className="w-full aspect-video object-cover bg-black"
              >
                <source src="/media/interview.mp4" type="video/mp4" />
              </video>
            </div>

            <figure className="lg:col-span-5 flex flex-col justify-center rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-7 md:p-8">
              <span className="text-[#F0605D] font-display text-4xl leading-none mb-2" aria-hidden="true">&ldquo;</span>
              <blockquote className="text-[1.15rem] md:text-[1.3rem] leading-snug text-[#E6EDF3]">
                {dict.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[rgba(240,246,252,0.06)]">
                <div className="text-white font-semibold">{dict.quoteName}</div>
                <div className="text-sm text-[#FF9A76]">{dict.quoteRole}</div>
                <div className="text-xs text-[#7D8590] mt-2">{dict.quoteContext}</div>
              </figcaption>
            </figure>
          </div>
        </RevealOnScroll>

        {/* Gallery: event photos + vertical clips */}
        <RevealOnScroll delay={250}>
          <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#7D8590] mb-4">{dict.galleryHeading}</div>
          {/* Masonry mosaic: each shot keeps its natural aspect ratio */}
          <div className="columns-2 md:columns-3 gap-4 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
            {gallery.map(({ kind, item }) =>
              kind === "photo" ? (
                <figure
                  key={item.src}
                  className={`relative break-inside-avoid rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] group ${(item as { box?: string }).box ?? ""}`}
                >
                  <Image
                    src={item.src}
                    alt={(item as { alt: string }).alt}
                    width={(item as { w: number }).w}
                    height={(item as { h: number }).h}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${(item as { box?: string }).box ? "absolute inset-0 w-full h-full" : "w-full h-auto"}`}
                    loading="lazy"
                  />
                </figure>
              ) : (
                <div
                  key={item.src}
                  className="relative break-inside-avoid aspect-[9/16] rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] bg-black"
                >
                  <video
                    autoPlay={allowAutoplay}
                    muted
                    loop
                    playsInline
                    controls={!allowAutoplay}
                    preload="metadata"
                    poster={(item as { poster: string }).poster}
                    aria-label={(item as { label: string }).label}
                    className="w-full h-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                </div>
              )
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
