import Image from "next/image"

const NAV = [
  { href: "#headline", label: "01 · Headline" },
  { href: "#venue", label: "02 · Venue" },
  { href: "#exhibitors", label: "03 · Exhibitors" },
  { href: "#stages", label: "04 · Stages" },
  { href: "#merch", label: "05 · Merch" },
  { href: "#engagement", label: "06 · Engagement" },
]

export function SiteHeader() {
  return (
    <header className="report-header">
      <div className="report-container report-header__inner">
        <a href="#headline" className="report-brand">
          <div className="report-brand__mark">
            <Image
              src="/treasure-hunt-only-logo.webp"
              alt=""
              width={36}
              height={36}
              priority
            />
          </div>
          <div>
            <div className="report-brand__name">TREASURE HUNT · REPORT</div>
            <div className="report-brand__sub">PSCS 2026 · v1.0</div>
          </div>
        </a>
        <nav className="report-nav" aria-label="Section navigation">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
