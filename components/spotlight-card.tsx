"use client"

import { useMotionValue, motion, useMotionTemplate } from "framer-motion"
import React, { MouseEvent as ReactMouseEvent } from "react"
import { cn } from "@/lib/utils"

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
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921] transition-all duration-300 hover:border-[rgba(240,96,93,0.2)] hover:bg-[#1A2233]",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
