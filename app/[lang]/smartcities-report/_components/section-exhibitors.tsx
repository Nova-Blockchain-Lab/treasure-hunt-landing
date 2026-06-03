"use client"

import { useMemo, useState } from "react"
import type { Snapshot, ReportExhibitor } from "@/lib/smartcities-report"
import { fmtInt, fmtSeconds } from "@/lib/smartcities-report"
import { Anchor, ChartFrame, Username } from "./atoms"
import { FindRankCurve } from "./charts"

type SortKey = "rank" | "name" | "owner" | "finds" | "pct" | "ttf" | "spill"
type SortDir = "asc" | "desc"

function Podium({ exhibitors }: { exhibitors: ReportExhibitor[] }) {
  const top3 = exhibitors.slice(0, 3)
  if (top3.length < 3) return null
  const order = [top3[1], top3[0], top3[2]]
  const heights = [120, 160, 96]
  const colors = ["#58A6FF", "#F0605D", "#FF9A76"]
  const labels = ["02", "01", "03"]
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 18,
        alignItems: "end",
      }}
    >
      {order.map((ex, i) => (
        <div key={ex.name + i} style={{ textAlign: "center", minWidth: 0 }}>
          <div style={{ marginBottom: 12 }}>
            <div
              className="font-display"
              style={{
                fontSize: 14,
                color: colors[i],
                letterSpacing: "0.18em",
              }}
            >
              {labels[i]}
            </div>
            <div
              style={{
                fontSize: 13,
                margin: "6px 0 4px",
                lineHeight: 1.25,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={ex.name}
            >
              {ex.name}
            </div>
            <div
              className="font-mono"
              style={{ fontSize: 10.5, color: "var(--text-muted)" }}
            >
              {ex.booth || "—"} · <Username name={ex.owner} address={ex.ownerAddress} />
            </div>
          </div>
          <div
            style={{
              height: heights[i],
              background: colors[i],
              opacity: 0.18,
              border: `1px solid ${colors[i]}`,
              borderRadius: 6,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: i === 1 ? `0 0 32px ${colors[i]}30` : "none",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: i === 1 ? 56 : 40,
                color: colors[i],
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              {ex.finds}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Tags that were either operator test pins or player-named — they show up
// in the raw exhibitorList because they accumulated finds, but they aren't
// company booths and don't belong in a public exhibitor leaderboard.
// Match is case-insensitive against the full tag name.
const NON_EXHIBITOR_NAMES: ReadonlySet<string> = new Set(
  [
    "Joana Welcome!",
    "Tag André",
    "Tag em movimento 1000 points",
    "Meet the Dev",
    "Tag #113",
    "Outside",
    "Out of bound",
    "Upside down",
    "Door tag!",
    "Find me",
    "Hello!",
    "Hello bros",
    "oi",
    "Esgotado",
    "Sei lá tag",
    "O mais complicado",
    "7.margarida :)",
    "6 7",
    "67",
    "Main Stage",
    "Tens bué aura chavalo",
    "Uau Semsimbra",
    "Smart",
    "Bus",
    "Wireless logi",
    "Fia",
    "Rico",
    "CylinderMargin",
    "Seat and relax!",
  ].map((s) => s.toLowerCase()),
)

// Exhibitor self-tags hidden from a player wallet — they have a non-NULL
// ownerAddress but ARE real company booths and should stay in the list.
const EXHIBITOR_SELF_TAGS: ReadonlySet<string> = new Set(
  ["Municípia", "Floema", "Sinal Safe", "Emergência", "PJM", "Painel Solar Bling"].map(
    (s) => s.toLowerCase(),
  ),
)

function isRealExhibitor(e: ReportExhibitor): boolean {
  const nameLc = (e.name ?? "").trim().toLowerCase()
  if (NON_EXHIBITOR_NAMES.has(nameLc)) return false
  const playerHidden = !!e.ownerAddress
  if (playerHidden) return EXHIBITOR_SELF_TAGS.has(nameLc)
  return true
}

export function SectionExhibitors({ snapshot }: { snapshot: Snapshot }) {
  const { exhibitorList: rawExhibitors, boostsActiveDuringEvent, chain } = snapshot
  // Re-rank within the verified-exhibitor subset so the table reads 1..N
  // without skipped numbers.
  const exhibitorList = useMemo(() => {
    return rawExhibitors
      .filter(isRealExhibitor)
      .sort((a, b) => b.finds - a.finds)
      .map((e, i) => ({ ...e, rank: i + 1 }))
  }, [rawExhibitors])
  const [q, setQ] = useState("")
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "finds",
    dir: "desc",
  })

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    let arr = exhibitorList.filter(
      (e) =>
        !s ||
        e.name.toLowerCase().includes(s) ||
        e.booth.toLowerCase().includes(s) ||
        (e.owner ?? "").toLowerCase().includes(s),
    )
    arr = [...arr].sort((a, b) => {
      const k = sort.key
      const va = (a as Record<string, unknown>)[k]
      const vb = (b as Record<string, unknown>)[k]
      let cmp: number
      if (typeof va === "number" && typeof vb === "number") cmp = va - vb
      else if (va == null && vb == null) cmp = 0
      else if (va == null) cmp = -1
      else if (vb == null) cmp = 1
      else cmp = String(va).localeCompare(String(vb))
      return sort.dir === "asc" ? cmp : -cmp
    })
    return arr
  }, [exhibitorList, q, sort])

  const setSortKey = (k: SortKey) =>
    setSort((s) => ({
      key: k,
      dir: s.key === k && s.dir === "desc" ? "asc" : "desc",
    }))

  const SortTh = ({
    k,
    children,
    num,
  }: {
    k: SortKey
    children: React.ReactNode
    num?: boolean
  }) => (
    <th
      role="button"
      tabIndex={0}
      onClick={() => setSortKey(k)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setSortKey(k)
        }
      }}
      className={`sortable ${sort.key === k ? "active" : ""}`}
      style={{ textAlign: num ? "right" : "left" }}
      aria-sort={
        sort.key === k ? (sort.dir === "desc" ? "descending" : "ascending") : "none"
      }
    >
      {children}
      <span aria-hidden style={{ marginLeft: 4, opacity: sort.key === k ? 1 : 0.3 }}>
        {sort.key === k ? (sort.dir === "desc" ? "↓" : "↑") : "↕"}
      </span>
    </th>
  )

  // ---- median / top-10% blurb ----
  const finds = exhibitorList.map((e) => e.finds).sort((a, b) => a - b)
  const median = finds.length
    ? finds[Math.floor(finds.length / 2)]
    : 0
  const totalFinds = exhibitorList.reduce((a, e) => a + e.finds, 0)
  const top10pctCount = Math.max(1, Math.floor(exhibitorList.length * 0.1))
  const top10pctFinds = [...exhibitorList]
    .sort((a, b) => b.finds - a.finds)
    .slice(0, top10pctCount)
    .reduce((a, e) => a + e.finds, 0)
  const top10pctShare = totalFinds ? (top10pctFinds / totalFinds) * 100 : 0
  const findValues = exhibitorList.map((e) => e.finds)

  return (
    <section className="report-section" id="exhibitors">
      <div className="report-container">
        <Anchor
          num="03"
          title="EXHIBITORS"
          lede={`One row per verified exhibitor tag, ${exhibitorList.length} company booths. Operator test pins and player-named tags are excluded — those carry no booth identity. Sortable and searchable, with a top-10 podium and ranked find-distribution curve framing the spread.`}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
            marginBottom: 28,
          }}
        >
          {/* Top 10 */}
          <div className="report-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 18,
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 18,
                  margin: 0,
                  letterSpacing: "0.12em",
                }}
              >
                TOP 10 BY FINDS
              </h3>
              <span
                className="font-mono"
                style={{ fontSize: 10, color: "var(--text-muted)" }}
              >
                positions 1–3 · 4–10
              </span>
            </div>
            <Podium exhibitors={exhibitorList} />
            <div style={{ marginTop: 24, display: "grid", gap: 6 }}>
              {exhibitorList.slice(3, 10).map((ex, i) => (
                <div
                  key={ex.name + (i + 3)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr auto",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 4px",
                    borderBottom: "1px solid var(--report-border)",
                    fontSize: 13,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ color: "var(--text-muted)", fontSize: 12 }}
                  >
                    0{i + 4}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ex.name}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {ex.booth && (
                        <span
                          className="font-mono"
                          style={{ fontSize: 10.5, color: "var(--text-muted)" }}
                        >
                          {ex.booth}
                        </span>
                      )}
                      <Username name={ex.owner} address={ex.ownerAddress} />
                    </div>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: 13, color: "var(--text-primary)" }}
                  >
                    {ex.finds}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Histogram + organic badge */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="report-card" style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 18,
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: 18,
                    margin: 0,
                    letterSpacing: "0.12em",
                  }}
                >
                  FIND DISTRIBUTION
                </h3>
                <span
                  className="font-mono"
                  style={{ fontSize: 10, color: "var(--text-muted)" }}
                >
                  {exhibitorList.length} exhibitor tags
                </span>
              </div>
              <ChartFrame
                title="Find distribution ranked curve"
                summary={`Sorted find counts across ${findValues.length} exhibitor tags. Median ${median}, top decile accumulated ${top10pctShare.toFixed(0)}% of all finds.`}
              >
                <FindRankCurve values={findValues} height={220} />
              </ChartFrame>
              <p
                style={{
                  fontSize: 12.5,
                  color: "var(--text-secondary)",
                  marginTop: 8,
                  lineHeight: 1.55,
                }}
              >
                Each point on the curve is one exhibitor, sorted by finds.
                The dashed reference lines call out the{" "}
                <span style={{ color: "var(--text-primary)" }}>median ({median})</span>,{" "}
                <span style={{ color: "var(--text-primary)" }}>top-quartile</span>, and{" "}
                <span style={{ color: "var(--text-primary)" }}>top-decile</span> thresholds.
                The top 10% of tags accumulated{" "}
                <span style={{ color: "var(--text-primary)" }}>
                  {top10pctShare.toFixed(0)}%
                </span>{" "}
                of all finds — long-tail but not winner-take-all.
              </p>
            </div>
            <div className="report-organic">
              <span className="report-organic__dot" />
              <span>
                <strong style={{ fontWeight: 500 }}>
                  {boostsActiveDuringEvent === 0
                    ? "No reward boosts were active during PSCS 2026 — every find here is organic."
                    : `${boostsActiveDuringEvent} reward boost(s) were active during PSCS 2026.`}
                </strong>
                <br />
                <span style={{ color: "rgba(86,211,100,0.7)", fontSize: 12 }}>
                  verified at block #{chain.blockHeight.toLocaleString("en-US")} · multiplier flag = 1.0× across all tags
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Searchable table */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h3
            className="font-display"
            style={{ fontSize: 18, margin: 0, letterSpacing: "0.12em" }}
          >
            ALL EXHIBITORS
          </h3>
          <div className="report-input-wrap">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="report-input"
              placeholder="search exhibitor, booth, owner…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div
          className="report-card report-card--flush"
          style={{ maxHeight: 540, overflow: "auto" }}
        >
          <table className="report-table">
            <thead>
              <tr>
                <SortTh k="rank">#</SortTh>
                <SortTh k="name">Exhibitor</SortTh>
                <SortTh k="owner">Owner</SortTh>
                <SortTh k="finds" num>
                  Finds
                </SortTh>
                <SortTh k="pct" num>
                  % players
                </SortTh>
                <SortTh k="ttf" num>
                  TTF
                </SortTh>
                <SortTh k="spill" num>
                  Spillover
                </SortTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ex) => (
                <tr key={`${ex.rank}-${ex.name}`}>
                  <td
                    className="num"
                    style={{ textAlign: "left", color: "var(--text-muted)" }}
                  >
                    {ex.rank.toString().padStart(2, "0")}
                  </td>
                  <td>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 280,
                      }}
                      title={ex.name}
                    >
                      {ex.name}
                    </div>
                    {ex.booth && (
                      <div
                        className="font-mono"
                        style={{ fontSize: 10.5, color: "var(--text-muted)" }}
                      >
                        {ex.booth}
                      </div>
                    )}
                  </td>
                  <td>
                    <Username name={ex.owner} address={ex.ownerAddress} />
                  </td>
                  <td className="num">{fmtInt(ex.finds)}</td>
                  <td className="num">{ex.pct.toFixed(1)}%</td>
                  <td className="num">{fmtSeconds(ex.ttf)}</td>
                  <td className="num">{ex.spill}%</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: 40,
                      color: "var(--text-muted)",
                    }}
                  >
                    No exhibitors match &quot;{q}&quot;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p
          className="font-mono"
          style={{
            fontSize: 10.5,
            color: "var(--text-muted)",
            marginTop: 12,
            textAlign: "right",
          }}
        >
          Replay-protected on-chain — each player counts once per tag, so Finds = Unique finders.{" "}
          TTF · time to first find from gate-open · Spillover · % of finders who hit a neighbor tag within 5 min.
        </p>
      </div>
    </section>
  )
}
