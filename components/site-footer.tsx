import Image from "next/image"
import Link from "next/link"

interface FooterDict {
  description: string
  navigation: string
  contact: string
  contactLabel: string
  resources: string
  blog: string
  ethdenverReport: string
  futuremakerReport: string
  smartCitiesReport: string
  cadavalReport: string
  springBootcampReport: string
  copyright: string
}

interface NavDict {
  demo: string
  features: string
  howItWorks: string
  packages: string
}

export function SiteFooter({
  dict,
  navDict,
  lang = "en",
}: {
  dict: FooterDict
  navDict: NavDict
  lang?: string
}) {
  const prefix = lang === "en" ? "" : `/${lang}`

  const navLinks = [
    { href: "#what", label: navDict.features },
    { href: "#demo", label: navDict.demo },
    { href: "#how", label: navDict.howItWorks },
    { href: "#packages", label: navDict.packages },
    { href: "#cta", label: dict.contactLabel },
  ]

  const resourceLinks = [
    { href: `${prefix}/blog`, label: dict.blog },
    { href: `${prefix}/ethdenver-report`, label: dict.ethdenverReport },
    { href: `${prefix}/futuremaker-report`, label: dict.futuremakerReport },
    { href: `${prefix}/smartcities-report`, label: dict.smartCitiesReport },
    { href: `${prefix}/cadaval-report`, label: dict.cadavalReport },
    { href: `${prefix}/springbootcamp-report`, label: dict.springBootcampReport },
  ]

  return (
    <footer className="border-t border-[rgba(240,246,252,0.04)] bg-[#06080F]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-12">
        {/* Row 1: Nav + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Image
                src="/treasure-hunt-logo.png"
                alt="Treasure Hunt - Event Engagement Platform"
                width={500}
                height={75}
                className="h-12 sm:h-20 w-auto -ml-2 sm:-ml-10"
                sizes="500px"
              />
              <a href="https://novablockchainlab.novaims.unl.pt/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/NOVA_Blockchain_Lab-2.png"
                  alt="NOVA Blockchain Lab"
                  width={500}
                  height={75}
                  className="h-12 sm:h-20 w-auto opacity-60 transition-opacity duration-300 hover:opacity-90"
                  sizes="500px"
                />
              </a>
            </div>
            <p className="text-sm text-[#484F58] leading-relaxed max-w-[280px]">
              {dict.description}
            </p>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.15em] uppercase text-[#8B949E] mb-4">{dict.navigation}</div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
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
            <div className="font-mono text-xs tracking-[0.15em] uppercase text-[#8B949E] mb-4">{dict.resources}</div>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#484F58] transition-colors duration-300 hover:text-[#E6EDF3]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.15em] uppercase text-[#8B949E] mb-4">{dict.contact}</div>
            <a
              href="mailto:nova.blockchain.lab@novaims.unl.pt"
              className="text-sm text-[#58A6FF] border-b border-[rgba(88,166,255,0.2)] hover:border-[#58A6FF] transition-colors duration-300"
            >
              nova.blockchain.lab@novaims.unl.pt
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[rgba(240,246,252,0.04)] py-8">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex justify-center">
          <span className="text-[0.75rem] text-[#484F58]">
            {"\u00A9"} {new Date().getFullYear()} {dict.copyright}
          </span>
        </div>
      </div>
    </footer>
  )
}
