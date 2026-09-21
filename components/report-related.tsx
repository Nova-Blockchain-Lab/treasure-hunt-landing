import Link from "next/link"

/**
 * The reports hold the only first-party data on the site and collect more
 * inbound internal links than any page except the home. They used to emit
 * exactly one outbound link ("back to home"), so all of that stopped here.
 * This passes it on to the blog post that cites the report and to the landing
 * page for the intent the report demonstrates.
 */
export function ReportRelated({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string }[]
}) {
  return (
    <nav aria-label={heading} className="max-w-[960px] mx-auto px-5 sm:px-8 pb-12">
      <h2 className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#8B949E] mb-4">
        {heading}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[#FF9A76] border-b border-[rgba(255,154,118,0.25)] transition-colors duration-300 hover:border-[#FF9A76]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
