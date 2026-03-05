import Image from "next/image"

export function SocialProofStrip() {
  return (
    <div className="py-12 bg-[rgba(13,17,23,0.5)] border-y border-[rgba(240,246,252,0.04)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#484F58] text-center mb-8">
          Deployed At
        </div>
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          <Image
            src="/ETHDEN_logo_full_white.png"
            alt="ETHDenver"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
          />
          <Image
            src="/NOVA_Blockchain_Lab-2.png"
            alt="NOVA Blockchain Lab"
            width={160}
            height={40}
            className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
          />
        </div>
      </div>
    </div>
  )
}
