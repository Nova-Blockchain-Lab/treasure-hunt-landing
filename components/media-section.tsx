"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Play, Pause } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { TextShimmer } from "./text-shimmer"

interface MediaDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  subheading: string
  watchInterview: string
  interviewTeaser: string
  fullCaption: string
  teaserCaption: string
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
  teamFlyersAlt: string
  clip1Alt: string
  clip2Alt: string
}

// Interview: branded poster + coral play button at rest; native controls appear
// only after first play, so the raw <video> chrome isn't the section's resting state.
function InterviewVideo({ src, poster, badge, caption }: { src: string; poster: string; badge: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const start = () => {
    setStarted(true)
    ref.current?.play()
  }
  return (
    <figure className="group rounded-xl overflow-hidden border border-[rgba(240,246,252,0.08)] bg-black">
      <div className="relative">
        <span className="absolute top-4 left-4 z-10 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#E6EDF3] bg-[rgba(6,8,15,0.65)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(240,246,252,0.1)] pointer-events-none">
          {badge}
        </span>
        <video
          ref={ref}
          preload="none"
          playsInline
          poster={poster}
          controls={started}
          onPlay={() => setStarted(true)}
          className="block w-full aspect-video object-cover bg-black"
        >
          <source src={src} type="video/mp4" />
        </video>
        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`${badge} — play`}
            className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/10 cursor-pointer"
          >
            <span className="grid place-items-center w-16 h-16 rounded-full bg-[#F0605D] text-white shadow-lg transition-transform group-hover:scale-105">
              <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-4 py-3 text-xs text-[#8B949E] bg-[#0B0F16] border-t border-[rgba(240,246,252,0.06)]">
        {caption}
      </figcaption>
    </figure>
  )
}

// Gallery clip: autoplay-muted-loop for ambient life (poster only under reduced-motion),
// with an always-visible pause/play toggle (WCAG 2.2.2) that also signals "this is video".
function ClipTile({ src, poster, label, allowAutoplay }: { src: string; poster: string; label: string; allowAutoplay: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(!allowAutoplay)
  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }
  return (
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] bg-black">
      <video
        ref={ref}
        autoPlay={allowAutoplay}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!paused}
        aria-label={paused ? `${label} — play` : `${label} — pause`}
        className="absolute bottom-2 right-2 z-10 grid place-items-center w-8 h-8 rounded-full bg-black/55 text-white backdrop-blur-sm border border-white/15"
      >
        {paused ? <Play className="w-3.5 h-3.5 translate-x-px" fill="currentColor" /> : <Pause className="w-3.5 h-3.5" fill="currentColor" />}
      </button>
    </div>
  )
}

export function MediaSection({ dict }: { dict: MediaDict }) {
  // Respect prefers-reduced-motion: don't autoplay the gallery clips, show their posters instead.
  const [allowAutoplay, setAllowAutoplay] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setAllowAutoplay(!mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Curated event gallery. Uniform 4/5 cells (object-cover) so a single portrait shot
  // can't run a whole phone screen tall — the fix for the section's mobile length.
  // Strongest / most on-message tiles first.
  const gallery: Array<
    | { kind: "photo"; src: string; alt: string }
    | { kind: "clip"; src: string; poster: string; label: string }
  > = [
    { kind: "photo", src: "/media/team-flyers.jpg", alt: dict.teamFlyersAlt },
    { kind: "photo", src: "/media/booth-demo.jpg", alt: dict.photo2Alt },
    { kind: "clip", src: "/media/gameplay-tap.mp4", poster: "/media/gameplay-tap-poster.jpg", label: dict.clip2Alt },
    { kind: "photo", src: "/media/datasummit-tap.jpg", alt: dict.photo4Alt },
    { kind: "photo", src: "/media/flyer-claim.jpg", alt: dict.photo1Alt },
    { kind: "clip", src: "/media/winner-reaction.mp4", poster: "/media/winner-reaction-poster.jpg", label: dict.clip1Alt },
    { kind: "photo", src: "/media/merch-hats.jpg", alt: dict.photo5Alt },
    { kind: "photo", src: "/media/team-celebration.jpg", alt: dict.photo3Alt },
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

        {/* Two interviews: full cut + short highlights, side by side */}
        <RevealOnScroll delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
            <InterviewVideo src="/media/interview.mp4" poster="/media/interview-poster.jpg" badge={dict.watchInterview} caption={dict.fullCaption} />
            <InterviewVideo src="/media/interview-teaser.mp4" poster="/media/interview-teaser-poster.jpg" badge={dict.interviewTeaser} caption={dict.teaserCaption} />
          </div>
        </RevealOnScroll>

        {/* Pull quote */}
        <RevealOnScroll delay={200}>
          <figure className="max-w-[75ch] mx-auto text-center rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] p-7 md:p-10 mb-12 md:mb-16">
            <span className="text-[#F0605D] font-display text-4xl leading-none block mb-2" aria-hidden="true">&ldquo;</span>
            <blockquote className="text-[1.15rem] md:text-[1.3rem] leading-snug text-[#E6EDF3]">
              {dict.quote}
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-[rgba(240,246,252,0.06)]">
              <div className="text-white font-semibold">{dict.quoteName}</div>
              <div className="text-sm text-[#FF9A76]">{dict.quoteRole}</div>
              <div className="text-xs text-[#7D8590] mt-2">{dict.quoteContext}</div>
            </figcaption>
          </figure>
        </RevealOnScroll>

        {/* Gallery: uniform-cell grid of event photos + vertical clips */}
        <RevealOnScroll delay={250}>
          <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#7D8590] mb-4">{dict.galleryHeading}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((tile) =>
              tile.kind === "photo" ? (
                <figure
                  key={tile.src}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[rgba(240,246,252,0.06)] group"
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ) : (
                <ClipTile key={tile.src} src={tile.src} poster={tile.poster} label={tile.label} allowAutoplay={allowAutoplay} />
              )
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
