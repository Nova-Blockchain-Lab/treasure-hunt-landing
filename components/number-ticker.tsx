"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const DURATION_MS = 1600
/** Ease-out: fast start, settles gently — the read the framer spring gave. */
const ease = (t: number) => 1 - Math.pow(1 - t, 4)

/**
 * Counts up to `value` when scrolled into view. Was framer-motion's
 * useSpring + useInView (51 KB); an IntersectionObserver and a rAF loop do the
 * same thing. Like the original it writes textContent directly rather than
 * setting state, so a 60 fps count costs no React renders.
 */
export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number
  direction?: "up" | "down"
  className?: string
  delay?: number
  decimalPlaces?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const format = (n: number) =>
      Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(n.toFixed(decimalPlaces)))

    const from = direction === "down" ? value : 0
    const to = direction === "down" ? 0 : value
    el.textContent = format(from)

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let timer: ReturnType<typeof setTimeout>

    const run = () => {
      if (reduce) {
        el.textContent = format(to)
        return
      }
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1)
        el.textContent = format(from + (to - from) * ease(t))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(run, delay * 1000)
        } else {
          clearTimeout(timer)
          if (frame) cancelAnimationFrame(frame)
          el.textContent = format(from)
        }
      },
      { threshold: 0 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [value, direction, delay, decimalPlaces])

  return <span className={cn("inline-block tabular-nums tracking-wider", className)} ref={ref} />
}
