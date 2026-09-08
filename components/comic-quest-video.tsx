"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

// The comic film, in the normal page flow. Was a 300vh scroll-scrubbed sticky
// stage driving video.currentTime from a per-frame scroll listener: three
// viewport heights of scroll for one 60s clip. Click-to-play costs one screen
// and matches how the media section already presents video.
const SRC = "/media/comic-quest.mp4"
const POSTER = "/media/comic-quest-poster.jpg" // 1280x720, same 16:9 as the clip

export function ComicQuestVideo({ caption, playLabel }: { caption: string; playLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  return (
    <section id="story" className="bg-[#06080F] py-16 sm:py-24">
      <div className="max-w-[900px] mx-auto px-5">
        <figure className="flex flex-col gap-3">
          <div className="group relative rounded-xl overflow-hidden border border-[rgba(240,246,252,0.08)] bg-black">
            <video
              ref={videoRef}
              src={SRC}
              poster={POSTER}
              controls={started}
              muted
              playsInline
              preload="none"
              onPlay={() => setStarted(true)}
              className="block w-full aspect-video"
            />
            {!started && (
              <button
                type="button"
                onClick={() => {
                  setStarted(true)
                  videoRef.current?.play()
                }}
                aria-label={playLabel}
                className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/10 cursor-pointer"
              >
                <span className="grid place-items-center w-16 h-16 rounded-full bg-[#F0605D] text-white shadow-lg transition-transform group-hover:scale-105">
                  <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
          <figcaption className="text-sm text-[#7D8590]">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
