"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"

// Scroll-scrubbed comic film: as you scroll the tall track, video.currentTime is
// driven by scroll progress and short captions explain the game beat by beat.
// Mobile + reduced-motion fall back to a click-to-play poster (scrubbing a <video>
// via currentTime is unreliable on iOS and would hurt CWV — this is a desktop enhancement).
// ponytail: captions are inlined EN/PT here (6 short strings) instead of the dictionaries —
// promote to dict + renumber the section eyebrow ordinals if this ships beyond the trial.

const SRC = "/media/comic-quest.mp4"
const POSTER = "/media/comic-quest-poster.jpg"
const TRACK_VH = 300 // scroll-track height; larger = slower scrub. Tune to taste.

const CAPTIONS: Record<"en" | "pt", string[]> = {
  en: [
    "Another crowded event. Same as the last one.",
    "Then you spot a tag.",
    "Tap it — and the whole venue turns into a game.",
    "Race up the leaderboard, checkpoint by checkpoint.",
    "Trade your points for real prizes.",
    "And everyone leaves talking about your brand.",
  ],
  pt: [
    "Mais um evento cheio. Igual ao anterior.",
    "Até que encontras uma etiqueta.",
    "Toca-lhe — e o recinto inteiro torna-se um jogo.",
    "Sobe no ranking, checkpoint a checkpoint.",
    "Troca os teus pontos por prémios reais.",
    "E toda a gente sai a falar da tua marca.",
  ],
}

export function ComicScrollStage({ lang = "en" }: { lang?: string }) {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef(0)
  const [mode, setMode] = useState<null | "scrub" | "static">(null)
  const [beat, setBeat] = useState(0)
  const [started, setStarted] = useState(false)

  const captions = CAPTIONS[lang as "en" | "pt"] ?? CAPTIONS.en

  // Decide mode after mount (avoids SSR mismatch): fine-pointer, wide, motion-ok -> scrub.
  useEffect(() => {
    const capable =
      !reduce &&
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(pointer: fine)").matches
    setMode(capable ? "scrub" : "static")
  }, [reduce])

  useEffect(() => {
    if (mode !== "scrub") return
    const video = videoRef.current
    const track = trackRef.current
    if (!video || !track) return
    video.pause()

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const total = track.offsetHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total))
        const d = video.duration
        if (d && isFinite(d)) video.currentTime = progress * d
        setBeat(Math.min(captions.length - 1, Math.floor(progress * captions.length)))
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mode, captions.length])

  // Static fallback (mobile / reduced-motion): click-to-play, matches the media section pattern.
  if (mode !== "scrub") {
    return (
      <section id="story" className="bg-[#06080F] py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto px-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#F0605D] mb-3 text-center">
            {lang === "pt" ? "O jogo em 60 segundos" : "The game in 60 seconds"}
          </p>
          <figure className="group relative rounded-xl overflow-hidden border border-[rgba(240,246,252,0.08)] bg-black">
            <video
              ref={videoRef}
              src={SRC}
              poster={POSTER}
              controls={started}
              muted
              playsInline
              preload="none"
              onPlay={() => setStarted(true)}
              className="block w-full aspect-video object-cover bg-black"
            />
            {!started && (
              <button
                type="button"
                onClick={() => {
                  setStarted(true)
                  videoRef.current?.play()
                }}
                aria-label={lang === "pt" ? "Ver o jogo" : "Watch the game"}
                className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/10 cursor-pointer"
              >
                <span className="grid place-items-center w-16 h-16 rounded-full bg-[#F0605D] text-white shadow-lg transition-transform group-hover:scale-105">
                  <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            )}
          </figure>
        </div>
      </section>
    )
  }

  // Scrub stage.
  return (
    <section id="story" ref={trackRef} className="relative bg-[#06080F]" style={{ height: `${TRACK_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={SRC}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Legibility scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,8,15,0.55) 0%, rgba(6,8,15,0.1) 30%, rgba(6,8,15,0.1) 60%, rgba(6,8,15,0.85) 100%)",
          }}
        />
        {/* Captions */}
        <div className="absolute inset-x-0 bottom-0 pb-[12vh] px-6">
          <div className="relative max-w-[900px] mx-auto min-h-[3.5em]">
            {captions.map((c, i) => (
              <p
                key={i}
                className="absolute inset-x-0 top-0 font-display text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-white text-center transition-opacity duration-500"
                style={{
                  opacity: beat === i ? 1 : 0,
                  textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                }}
              >
                {c}
              </p>
            ))}
          </div>
        </div>
        {/* Scroll hint, first beat only */}
        <div
          className="absolute inset-x-0 top-[14vh] flex justify-center transition-opacity duration-500 pointer-events-none"
          style={{ opacity: beat === 0 ? 1 : 0 }}
        >
          <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#E6EDF3]/70">
            {lang === "pt" ? "Desliza ↓" : "Scroll ↓"}
          </span>
        </div>
      </div>
    </section>
  )
}
