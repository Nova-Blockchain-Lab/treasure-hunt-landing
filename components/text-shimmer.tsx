"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TextShimmerProps {
  children: string
  className?: string
  duration?: number
  spread?: number
}

/**
 * A sweeping highlight across text. Was a framer-motion `animate` loop that
 * called `motion.create()` in the render body, so every render produced a new
 * component type and remounted the subtree. It is one CSS keyframe
 * (`text-shimmer` in globals.css), which the existing prefers-reduced-motion
 * block neutralises for free.
 */
export function TextShimmer({ children, className, duration = 2, spread = 2 }: TextShimmerProps) {
  return (
    <p
      className={cn(
        "text-shimmer relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#7D8590] [--base-gradient-color:#E6EDF3]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className
      )}
      style={
        {
          "--spread": `${children.length * spread}px`,
          "--shimmer-duration": `${duration}s`,
          backgroundImage: "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
        } as React.CSSProperties
      }
    >
      {children}
    </p>
  )
}
