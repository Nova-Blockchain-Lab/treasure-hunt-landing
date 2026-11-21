"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

// The comic film, click to play. Was a 300vh scroll-scrubbed sticky stage
// driving video.currentTime from a per-frame scroll listener. Now a plain
// figure; the home places it inside the "What you control" section.
const SRC = "/media/comic-quest.mp4"
const POSTER = "/media/comic-quest-poster.jpg" // 1280x720, same 16:9 as the clip

export function ComicQuestVideo({ caption, playLabel }: { caption: string; playLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  return (
    <figure className="m-0 flex flex-col gap-3">
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
            <span className="grid place-items-center w-16 h-16 rounded-full bg-[#C9433F] text-white shadow-lg transition-transform group-hover:scale-105">
              <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="text-sm text-[#7D8590]">
        {caption}
      </figcaption>
    </figure>
  )
}
