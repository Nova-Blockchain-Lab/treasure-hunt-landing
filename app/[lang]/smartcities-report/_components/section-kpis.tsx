"use client"

import type { Snapshot } from "@/lib/smartcities-report"
import { Anchor, KPI, Rise } from "./atoms"

export function SectionKPIs({ snapshot }: { snapshot: Snapshot }) {
  const { kpis, zones } = snapshot
  // Tags hidden across the venue — sum of every in-play tag in the zone
  // breakdown. Authoritative because the same source feeds the venue map.
  const tagsHidden = zones.reduce((a, z) => a + z.tags, 0)
  const items: Array<{
    value: number
    suffix?: string
    label: string
    hint: string
    decimals?: number
  }> = [
    {
      value: kpis.totalPlayers,
      label: "Total players",
      hint: "Distinct wallets that opted in to the hunt and tapped at least one tag.",
    },
    {
      value: tagsHidden,
      label: "Tags hidden",
      hint: "NFC tags concealed across the venue — exhibitor booths, lounges, and stages.",
    },
    {
      value: kpis.totalFinds,
      label: "Exhibitor finds",
      hint: "Successful NFC taps at exhibitor tags. Repeat taps not counted.",
    },
    {
      value: kpis.tokensDistributed,
      label: `Tokens distributed`,
      hint: `${kpis.tokenSymbol} minted to players across all reward types. Settled on Nova Cidade testnet.`,
    },
    {
      value: kpis.merchPurchases,
      label: "Merch purchases",
      hint: "On-chain claims of physical merch from the pavilion store.",
    },
  ]
  return (
    <section className="report-section" id="headline">
      <div className="report-container">
        <Anchor
          num="01"
          title="HEADLINE"
          lede="Five numbers, snapshot at end of day three. Every figure is verifiable on-chain — the contract address is in the footer."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 32,
            rowGap: 48,
          }}
        >
          {items.map((k, i) => (
            <Rise key={k.label} delay={i * 60}>
              <KPI
                value={k.value}
                suffix={k.suffix}
                label={k.label}
                hint={k.hint}
                decimals={k.decimals}
              />
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}
