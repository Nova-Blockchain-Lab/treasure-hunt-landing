import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neon-pink/15",
        "bg-linear-to-br from-[rgba(37,26,106,0.6)] to-[rgba(21,14,65,0.8)]",
        "backdrop-blur-[12px]",
        "[@media(hover:none)_and_(pointer:coarse)]:backdrop-blur-none",
        "[@media(hover:none)_and_(pointer:coarse)]:from-[rgba(37,26,106,0.85)]",
        "[@media(hover:none)_and_(pointer:coarse)]:to-[rgba(21,14,65,0.95)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
