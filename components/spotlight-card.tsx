"use client"

import React, { MouseEvent as ReactMouseEvent } from "react"
import { cn } from "@/lib/utils"

/**
 * Mouse-follow highlight. This used framer-motion's `useMotionTemplate`, which
 * is a 51 KB dependency to interpolate two numbers into a CSS string — the
 * browser does that itself with custom properties, and writing them directly
 * skips React entirely on mousemove.
 */
export function SpotlightCard({
  children,
  radius = 300,
  color = "rgba(240, 96, 93, 0.06)",
  className,
  ...props
}: {
  radius?: number
  color?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    currentTarget.style.setProperty("--spot-x", `${clientX - left}px`)
    currentTarget.style.setProperty("--spot-y", `${clientY - top}px`)
  }

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] transition-all duration-300 hover:border-[rgba(240,96,93,0.2)] hover:bg-[#1A2233]",
        className
      )}
      onMouseMove={handleMouseMove}
      style={{ "--spot-r": `${radius}px`, "--spot-c": color } as React.CSSProperties}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-r) circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--spot-c), transparent 80%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
