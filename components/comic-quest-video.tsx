"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

// The comic film, click to play. Was a 300vh scroll-scrubbed sticky stage
// driving video.currentTime from a per-frame scroll listener. Now a plain
// figure; the home places it inside the "What you control" section.
const SRC = "/media/comic-quest.mp4"
// 1280x720, same 16:9 as the clip. Rendered as a lazy next/image over the
// video, not as `poster=`: a poster is fetched eagerly at full size (122 KB for
// a 370 px slot far below the fold on a phone). The overlay stays until the
// first frame plays, so there is no black flash between click and playback.
const POSTER = "/media/comic-quest-poster.jpg"

export function ComicQuestVideo({ caption, playLabel }: { caption: string; playLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="group relative rounded-xl overflow-hidden border border-[rgba(240,246,252,0.08)] bg-black">
        <video
          ref={videoRef}
          src={SRC}
          controls={started}
          muted
          playsInline
          preload="none"
          onPlay={() => setStarted(true)}
          onPlaying={() => setPlaying(true)}
          className="block w-full aspect-video"
        />
        {!playing && (
          <Image
            src={POSTER}
            alt=""
            fill
            sizes="(min-width: 900px) 460px, calc(100vw - 40px)"
            className="object-cover pointer-events-none"
          />
        )}
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
