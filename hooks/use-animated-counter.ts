"use client"

import { useEffect, useRef, useState } from "react"

export function useAnimatedCounter(target: number, once = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (once ? !animated.current : true)) {
          animated.current = true
          let current = 0
          const increment = target / 60
          function updateCounter() {
            current += increment
            if (current >= target) {
              setCount(target)
              return
            }
            setCount(Math.round(current))
            requestAnimationFrame(updateCounter)
          }
          updateCounter()
        } else if (!once && !entry.isIntersecting) {
          setCount(0)
          animated.current = false
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, once])

  return { ref, count }
}
