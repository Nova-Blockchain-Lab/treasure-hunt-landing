import Image from "next/image"

const footerLinks = [
  { href: "#demo", label: "Demo" },
  { href: "#what", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#where", label: "Use Cases" },
  { href: "#packages", label: "Packages" },
  { href: "#cta", label: "Contact" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-neon-pink/10 py-12 md:py-8 bg-[rgba(3,1,24,0.8)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <Image
            src="/NOVA_Blockchain_Lab-2.png"
            alt="NOVA Blockchain Lab"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-[0.8rem] text-text-muted">{"\u2014"} Treasure Hunt</span>
        </div>

        {/* Fixed: footer links wrap properly on mobile */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8rem] text-text-muted transition-colors duration-300 hover:text-neon-pink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
