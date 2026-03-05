"use client"

import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "up" | "down" | "left" | "right"
  variant?: "fade-slide" | "fade-scale" | "fade-blur"
  delay?: number
  once?: boolean
}

export function RevealOnScroll({
  direction = "up",
  variant = "fade-slide",
  delay = 0,
  once = true,
  className,
  children,
  ...props
}: RevealOnScrollProps) {
  const { ref, isVisible } = useIntersectionObserver({ once })

  const hiddenStyles: Record<string, string> = {
    "fade-slide": {
      up: "translate-y-6",
      down: "-translate-y-6",
      left: "-translate-x-6",
      right: "translate-x-6",
    }[direction] ?? "translate-y-6",
    "fade-scale": "scale-95",
    "fade-blur": "blur-sm",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0"
          : `opacity-0 ${hiddenStyles[variant]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}
