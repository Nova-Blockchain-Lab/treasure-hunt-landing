import Image from "next/image"

export function SocialProofStrip({ dict }: { dict: { deployedAt: string } }) {
  return (
    <div className="py-16 md:py-20 bg-[rgba(13,17,23,0.5)] border-y border-[rgba(240,246,252,0.04)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="font-mono text-sm tracking-[0.2em] uppercase text-[#484F58] text-center mb-10">
          {dict.deployedAt}
        </div>
        <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-20 flex-wrap">
          <a href="https://ethdenver.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/ETHDEN_logo_full_white.png"
              alt="ETHDenver"
              width={220}
              height={56}
              className="h-14 sm:h-20 md:h-24 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
            />
          </a>
          <a href="https://novaims.unl.pt/pt/here-now/eventos/nova-ims-career-fair-future-maker-2026/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/fm-logo.png"
              alt="Future Maker - NOVA IMS Career Fair"
              width={220}
              height={56}
              className="h-14 sm:h-20 md:h-24 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
            />
          </a>
          <a href="https://blockchainconfluence.pt/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/blockchain-confluence-logo.png"
              alt="Blockchain Confluence"
              width={320}
              height={96}
              className="h-14 sm:h-20 md:h-24 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
