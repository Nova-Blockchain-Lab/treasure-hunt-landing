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

  const photos = [
    { src: "/media/event-posters.jpg", alt: dict.photo1Alt },
    { src: "/media/booth-demo.jpg", alt: dict.photo2Alt },
    { src: "/media/team-celebration.jpg", alt: dict.photo3Alt },
  ]
  const clips = [
    { src: "/media/winner-reaction.mp4", poster: "/media/winner-reaction-poster.jpg", label: dict.clip1Alt },
    { src: "/media/gameplay-tap.mp4", poster: "/media/gameplay-tap-poster.jpg", label: dict.clip2Alt },
  ]

  return (
    <section id="media" className="py-24 md:py-32 relative bg-[#06080F]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              <TextShimmer duration={3} spread={1.5} className="font-mono text-xs tracking-[0.2em] uppercase [--base-color:#58A6FF] [--base-gradient-color:#E6EDF3]">
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
                <div className="text-xs text-[#484F58] mt-2">{dict.quoteContext}</div>
              </figcaption>
            </figure>
          </div>
        </RevealOnScroll>

        {/* Gallery: event photos + vertical clips */}
        <RevealOnScroll delay={250}>
          <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#484F58] mb-4">{dict.galleryHeading}</div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            {/* Photos */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {photos.map((p) => (
                <div key={p.src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] group">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Vertical gameplay clips */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 md:gap-5">
              {clips.map((c) => (
                <div key={c.src} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] bg-black">
                  <video
                    autoPlay={allowAutoplay}
                    muted
                    loop
                    playsInline
                    controls={!allowAutoplay}
                    preload="metadata"
                    poster={c.poster}
                    aria-label={c.label}
                    className="w-full h-full object-cover"
                  >
                    <source src={c.src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
