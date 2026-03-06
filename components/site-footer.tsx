import Image from "next/image"
import { navLinks } from "@/data/nav-links"

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(240,246,252,0.04)] bg-[#06080F]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-12">
        {/* Row 1: Nav + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Image
              src="/treasure-hunt-logo.png"
              alt="Treasure Hunt"
              width={240}
              height={36}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-[#484F58] leading-relaxed max-w-[280px]">
              Interactive event engagement platform that drives foot traffic, rewards participation, and gives organizers
              real-time analytics.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.15em] uppercase text-[#8B949E] mb-4">Navigation</div>
            <ul className="flex flex-col gap-2.5">
              {[...navLinks, { href: "#cta", label: "Contact" }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#484F58] transition-colors duration-300 hover:text-[#E6EDF3]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.15em] uppercase text-[#8B949E] mb-4">Contact</div>
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="text-sm text-[#58A6FF] border-b border-[rgba(88,166,255,0.2)] hover:border-[#58A6FF] transition-colors duration-300"
            >
              nova.blockchain.lab@novaims.unl.pt
            </a>
          </div>
        </div>
      </div>

      {/* Row 3: Copyright bar */}
      <div className="border-t border-[rgba(240,246,252,0.04)] py-6">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
          <span className="text-[0.75rem] text-[#484F58]">
            {"\u00A9"} {new Date().getFullYear()} Confluence. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
