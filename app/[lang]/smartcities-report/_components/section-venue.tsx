"use client"

import type { ReportZone, Snapshot } from "@/lib/smartcities-report"
import { fmtInt } from "@/lib/smartcities-report"
import { Anchor } from "./atoms"
import { VenueMap } from "./venue-map"

// The seeded "ze" zone (a strip of misc tags near the bottom of the floor
// plan) isn't an actual venue zone — the ZE booths on the FIL plan are a
// far-right row that nobody scanned. Fold its tags/finds into sector3d so
// the breakdown shows the five real exhibition zones.
function consolidateZones(zones: ReportZone[]): ReportZone[] {
  const out: ReportZone[] = []
  let zeBucket: ReportZone | null = null
  let targetIdx = -1
  for (const z of zones) {
    if (z.id === "ze") {
      zeBucket = z
      continue
    }
    if (z.id === "sector3d") targetIdx = out.length
    out.push({ ...z })
  }
  if (zeBucket && targetIdx >= 0) {
    const t = out[targetIdx]
    out[targetIdx] = {
      ...t,
      tags: t.tags + zeBucket.tags,
      finds: t.finds + zeBucket.finds,
      uniqueFinders: t.uniqueFinders + zeBucket.uniqueFinders,
      // Keep whichever top exhibitor has more finds.
      top: zeBucket.topFinds > t.topFinds ? zeBucket.top : t.top,
      topFinds: Math.max(t.topFinds, zeBucket.topFinds),
    }
  }
  return out
}

const HEAT_RAMP = [
  { color: "#FFE066", label: "low" },
  { color: "#FFD24A", label: "" },
  { color: "#FFB94A", label: "" },
  { color: "#FFA055", label: "" },
  { color: "#FF8A5C", label: "" },
  { color: "#FF6F5C", label: "" },
  { color: "#F25A55", label: "" },
  { color: "#E84247", label: "" },
  { color: "#D22F3B", label: "" },
  { color: "#A8202E", label: "" },
  { color: "#7A1024", label: "high" },
]

export function SectionVenue({ snapshot }: { snapshot: Snapshot }) {
  const { zones, hotspots, kpis } = snapshot
  const displayZones = consolidateZones(zones)
  return (
    <section className="report-section" id="venue">
      <div className="report-container">
        <Anchor
          num="02"
          title="VENUE"
          lede="Kernel-density of every NFC find, overlaid on the real FIL Pavilhão 3 floor plan."
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span
            className="report-chip"
            style={{
              borderColor: "rgba(240, 96, 93, 0.4)",
              color: "var(--neon-pink)",
              boxShadow: "var(--glow-coral)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--neon-pink)",
              }}
            />
            Tag finds · {fmtInt(kpis.totalFinds)}
          </span>
          <div
            className="font-mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              color: "var(--text-muted)",
            }}
          >
            <span>{HEAT_RAMP[0].label}</span>
            <span
              aria-hidden
              style={{
                width: 110,
                height: 8,
                borderRadius: 2,
                background: `linear-gradient(to right, ${HEAT_RAMP.map((s) => s.color).join(", ")})`,
              }}
            />
            <span>{HEAT_RAMP[HEAT_RAMP.length - 1].label}</span>
            <span style={{ marginLeft: 4 }}>find density</span>
          </div>
        </div>
      </div>

      {/* Full-bleed map */}
      <div
        className="report-bleed"
        style={{
          position: "relative",
          background: "var(--bg-secondary)",
          padding: "8px 0",
          borderBlock: "1px solid var(--report-border)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <VenueMap hotspots={hotspots.points} zones={displayZones} />
        </div>
      </div>

      <div className="report-container" style={{ marginTop: 40 }}>
        <h3
          className="font-display"
          style={{
            fontSize: 20,
            margin: "0 0 16px",
            letterSpacing: "0.12em",
          }}
        >
          ZONE BREAKDOWN
        </h3>
        <div className="report-card report-card--flush" style={{ overflowX: "auto" }}>
          <table className="report-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th className="num">Tags</th>
                <th className="num">Finds</th>
                <th className="num">Unique finders</th>
                <th className="num">% of all players</th>
                <th>Top exhibitor</th>
              </tr>
            </thead>
            <tbody>
              {displayZones.map((z) => {
                const pct = kpis.totalPlayers
                  ? (z.uniqueFinders / kpis.totalPlayers) * 100
                  : 0
                return (
                  <tr key={z.id}>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: z.color,
                          marginRight: 12,
                          verticalAlign: "middle",
                        }}
                      />
                      <span
                        className="font-display"
                        style={{ fontSize: 16, letterSpacing: "0.06em" }}
                      >
                        {z.name}
                      </span>
                    </td>
                    <td className="num">{z.tags}</td>
                    <td className="num">{fmtInt(z.finds)}</td>
                    <td className="num">{fmtInt(z.uniqueFinders)}</td>
                    <td className="num">{pct.toFixed(1)}%</td>
                    <td style={{ color: "var(--text-secondary)" }}>{z.top}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p
          className="font-mono"
          style={{
            fontSize: 10.5,
            color: "var(--text-muted)",
            marginTop: 12,
            lineHeight: 1.5,
          }}
        >
          Zone-level <span style={{ color: "var(--text-secondary)" }}>finds</span> count every tag
          tap within the zone; one player can contribute up to one find per tag. Zone-level{" "}
          <span style={{ color: "var(--text-secondary)" }}>unique finders</span> de-duplicates
          players across all tags in that zone.
        </p>
      </div>
    </section>
  )
}
