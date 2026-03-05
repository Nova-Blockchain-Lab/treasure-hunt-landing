import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#131921]",
        "transition-all duration-300",
        "hover:border-[rgba(240,96,93,0.2)] hover:bg-[#1A2233]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
