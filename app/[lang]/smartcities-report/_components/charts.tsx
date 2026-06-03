"use client"

import { useState } from "react"
import type {
  ReportHistogramBin,
  ReportLorenz,
  ReportRankScatterPoint,
  ReportSku,
  ReportSkuCurvePoint,
  ReportTimelineBucket,
} from "@/lib/smartcities-report"
import { fmtInt, fmtMinutes } from "@/lib/smartcities-report"

// Fixed-assignment chart palette (matches globals.css --chart-N).
export const CHART = {
  c1: "var(--chart-1)",
  c2: "var(--chart-2)",
  c3: "var(--chart-3)",
  c4: "var(--chart-4)",
  c5: "var(--chart-5)",
  grid: "rgba(255,255,255,0.04)",
  gridStrong: "rgba(255,255,255,0.08)",
  axis: "var(--text-muted)",
  text: "var(--text-secondary)",
}

// Raw hex for SVG attributes that don't accept CSS vars (Safari + some SVG props).
const HEX = {
  c1: "#F0605D",
  c2: "#58A6FF",
  c3: "#FF9A76",
  c4: "#56D364",
  c5: "#BC8CFF",
  axis: "#484F58",
  text: "#8B949E",
}

// ---------------- horizontal bar row ----------------
export function BarRow({
  label,
  value,
  max,
  color = HEX.c1,
  formatter = fmtInt,
  width = 320,
}: {
  label: string
  value: number
  max: number
  color?: string
  formatter?: (n: number) => string
  width?: number
}) {
  const pct = max ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 12,
        paddingBlock: 6,
      }}
    >
      <div>
        <div style={{ fontSize: 12.5, marginBottom: 6, color: "var(--text-primary)" }}>{label}</div>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 3,
            overflow: "hidden",
            maxWidth: width,
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: color,
              transition: "width 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          />
        </div>
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 12.5,
          color: "var(--text-primary)",
          minWidth: 60,
          textAlign: "right",
        }}
      >
        {formatter(value)}
      </div>
    </div>
  )
}

// ---------------- ranked find-curve with reference markers ----------------
// Each exhibitor's find count, sorted descending, drawn as a single decay
// curve with horizontal reference lines at median, p75, and p90.
// Easier to read than a binned histogram because every exhibitor is its
// own point and the spread reads as a slope.
export function FindRankCurve({
  values,
  height = 220,
}: {
  values: number[]
  height?: number
}) {
  const w = 600
  const padL = 44
  const padR = 24
  const padT = 16
  const padB = 38
  const sorted = [...values].sort((a, b) => b - a)
  const n = sorted.length
  const innerW = w - padL - padR
  const innerH = height - padT - padB
  const maxV = Math.max(1, ...sorted)
  const xs = (i: number) =>
    padL + (n <= 1 ? 0 : (i / (n - 1)) * innerW)
  const ys = (v: number) => padT + (1 - v / maxV) * innerH

  // Percentile helpers (sorted is desc; "median" = item at index floor(n/2)).
  const pAt = (q: number) => {
    if (!n) return 0
    const asc = [...sorted].reverse()
    const idx = Math.min(asc.length - 1, Math.floor(q * (asc.length - 1)))
    return asc[idx]
  }
  const median = pAt(0.5)
  const p75 = pAt(0.75)
  const p90 = pAt(0.9)

  let path = `M ${xs(0)} ${ys(sorted[0] ?? 0)}`
  for (let i = 1; i < n; i++) path += ` L ${xs(i)} ${ys(sorted[i])}`
  const fillPath = `${path} L ${xs(Math.max(0, n - 1))} ${ys(0)} L ${xs(0)} ${ys(0)} Z`

  const refs: Array<{ v: number; label: string; color: string; dash: string }> = [
    { v: p90, label: "Top 10% threshold", color: HEX.c5, dash: "5 5" },
    { v: p75, label: "Top 25%", color: HEX.c3, dash: "4 4" },
    { v: median, label: "Median", color: HEX.c2, dash: "3 5" },
  ]

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label={`Ranked find-count curve over ${n} exhibitor tags. Median ${median}, top quartile ${p75}, top decile ${p90}, peak ${sorted[0] ?? 0}.`}
    >
      {/* y-axis baseline */}
      <line
        x1={padL}
        x2={w - padR}
        y1={ys(0)}
        y2={ys(0)}
        stroke={HEX.axis}
        strokeOpacity={0.4}
      />
      {/* y-axis ticks at 0, ½ max, max */}
      {[0, maxV / 2, maxV].map((t) => (
        <g key={t}>
          <line
            x1={padL}
            x2={w - padR}
            y1={ys(t)}
            y2={ys(t)}
            stroke={HEX.axis}
            strokeOpacity={t === 0 ? 0.4 : 0.08}
          />
          <text
            x={padL - 6}
            y={ys(t) + 4}
            fontSize="10"
            textAnchor="end"
            fontFamily="Roboto Mono"
            fill={HEX.text}
          >
            {Math.round(t)}
          </text>
        </g>
      ))}
      {/* the decay curve */}
      <path d={fillPath} fill={HEX.c1} fillOpacity={0.1} />
      <path d={path} fill="none" stroke={HEX.c1} strokeWidth="2" />
      {/* dot on rank-1 + label */}
      {n > 0 && (
        <g>
          <circle cx={xs(0)} cy={ys(sorted[0])} r="4" fill={HEX.c1} />
          <text
            x={xs(0) + 8}
            y={ys(sorted[0]) - 6}
            fontSize="11"
            fontFamily="Roboto Mono"
            fill="var(--text-primary)"
          >
            #1 · {sorted[0]} finds
          </text>
        </g>
      )}
      {/* reference lines */}
      {refs.map((r) => (
        <g key={r.label}>
          <line
            x1={padL}
            x2={w - padR}
            y1={ys(r.v)}
            y2={ys(r.v)}
            stroke={r.color}
            strokeWidth="1.5"
            strokeDasharray={r.dash}
            opacity={0.7}
          />
          <text
            x={w - padR - 4}
            y={ys(r.v) - 4}
            fontSize="10.5"
            textAnchor="end"
            fontFamily="Roboto Mono"
            fill={r.color}
          >
            {r.label} · {Math.round(r.v)}
          </text>
        </g>
      ))}
      {/* x-axis labels */}
      <text
        x={padL}
        y={height - 18}
        fontSize="10"
        fontFamily="Roboto Mono"
        fill={HEX.text}
      >
        rank #1
      </text>
      <text
        x={w - padR}
        y={height - 18}
        fontSize="10"
        fontFamily="Roboto Mono"
        textAnchor="end"
        fill={HEX.text}
      >
        rank #{n}
      </text>
      <text
        x={padL + innerW / 2}
        y={height - 4}
        fontSize="10"
        fontFamily="Roboto Mono"
        textAnchor="middle"
        fill={HEX.axis}
      >
        every exhibitor tag, sorted by find count →
      </text>
    </svg>
  )
}

// ---------------- vertical histogram ----------------
export function Histogram({
  data,
  height = 170,
  color = HEX.c1,
}: {
  data: ReportHistogramBin[]
  height?: number
  color?: string
}) {
  const w = 600
  const pad = 24
  const max = Math.max(1, ...data.map((d) => d.count))
  const bw = (w - pad * 2) / data.length
  return (
    <svg
      viewBox={`0 0 ${w} ${height + 36}`}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {data.map((d, i) => {
        const h = (d.count / max) * height
        const x = pad + i * bw + 4
        const y = height - h + 8
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={bw - 8}
              height={h}
              fill={color}
              opacity={0.85}
              rx={2}
            />
            <text
              x={x + (bw - 8) / 2}
              y={height + 24}
              textAnchor="middle"
              fontSize="10"
              fill={HEX.axis}
              fontFamily="Roboto Mono"
            >
              {d.label}
            </text>
            <text
              x={x + (bw - 8) / 2}
              y={y - 4}
              textAnchor="middle"
              fontSize="10"
              fill={HEX.text}
              fontFamily="Roboto Mono"
            >
              {d.count}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ---------------- 72-hour stacked area ----------------
// Renders the real activity rhythm of the event by stacking three high-
// volume event categories: tag finds, merch purchases, and stage QR scans.
// Stacking main/industry/forum QR scans alone would render almost nothing
// because PSCS 2026 only logged 12 QR scans in total — see talk-instr.note.
export function StackedArea72({
  data,
  height = 240,
}: {
  data: ReportTimelineBucket[]
  height?: number
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const w = 1200
  const padL = 56
  const padR = 24
  const padT = 24
  const padB = 48
  const n = data.length

  // Per-bucket derived series:
  //   qr     = main + industry + forum (all stage scans, regardless of stage)
  //   merch  = MerchPurchased events
  //   finds  = ObjectClaimed events (the bulk of activity)
  const series = data.map((d) => ({
    finds: d.finds ?? 0,
    merch: d.merch ?? 0,
    qr: (d.main ?? 0) + (d.industry ?? 0) + (d.forum ?? 0),
  }))
  const totals = series.map((s) => s.finds + s.merch + s.qr)
  const maxY = Math.max(1, ...totals)
  const xs = (i: number) => padL + (i / (n - 1)) * (w - padL - padR)
  const ys = (v: number) => padT + (1 - v / maxY) * (height - padT - padB)

  // Stack order from bottom up: finds → merch → qr.
  type Key = "finds" | "merch" | "qr"
  const order: Key[] = ["finds", "merch", "qr"]
  const colorByKey: Record<Key, string> = {
    finds: HEX.c1,
    merch: HEX.c3,
    qr: HEX.c2,
  }
  const labelByKey: Record<Key, string> = {
    finds: "Finds (tag taps)",
    merch: "Merch claims",
    qr: "Stage QR scans",
  }

  // Cumulative tops per layer
  const stackTops: number[][] = []
  let acc = series.map(() => 0)
  for (const key of order) {
    acc = acc.map((v, i) => v + series[i][key])
    stackTops.push([...acc])
  }

  const buildPath = (topVals: number[], bottomVals: number[]) => {
    let d = `M ${xs(0)} ${ys(topVals[0])}`
    for (let i = 1; i < n; i++) d += ` L ${xs(i)} ${ys(topVals[i])}`
    for (let i = n - 1; i >= 0; i--) d += ` L ${xs(i)} ${ys(bottomVals[i])}`
    d += " Z"
    return d
  }

  // Y ticks at round numbers
  const yTickStep = Math.pow(10, Math.floor(Math.log10(maxY)))
  const yStep = Math.max(1, Math.ceil(maxY / 5 / yTickStep) * yTickStep)
  const yTicks: number[] = []
  for (let v = 0; v <= maxY; v += yStep) yTicks.push(v)

  // Hover label: pick the bucket nearest the mouse along the X axis.
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width
    const xViewbox = xPct * w
    const localX = Math.max(0, Math.min(1, (xViewbox - padL) / (w - padL - padR)))
    const i = Math.round(localX * (n - 1))
    setHoverIdx(i)
  }

  const hovered = hoverIdx != null ? series[hoverIdx] : null
  const hoveredBucket = hoverIdx != null ? data[hoverIdx] : null

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${w} ${height}`}
        style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
        role="img"
        aria-label={`72-hour stacked activity timeline across May 12-14 with ${fmtInt(totals.reduce((a, b) => a + b, 0))} total events.`}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padL}
              x2={w - padR}
              y1={ys(t)}
              y2={ys(t)}
              stroke={HEX.axis}
              strokeOpacity={t === 0 ? 0.4 : 0.12}
            />
            <text
              x={padL - 10}
              y={ys(t) + 4}
              fontSize="11"
              fontFamily="Roboto Mono"
              textAnchor="end"
              fill={HEX.text}
            >
              {t.toLocaleString()}
            </text>
          </g>
        ))}

        {/* day separators */}
        {[24, 48].map((h, i) => (
          <g key={i}>
            <line
              x1={xs(h)}
              x2={xs(h)}
              y1={padT}
              y2={height - padB}
              stroke={HEX.text}
              strokeOpacity={0.18}
              strokeDasharray="3 5"
            />
            <text
              x={xs(h) + 8}
              y={padT + 14}
              fontSize="12"
              fill={HEX.text}
              fontFamily="Bebas Neue"
              letterSpacing="0.16em"
            >
              DAY {i + 2}
            </text>
          </g>
        ))}
        <text
          x={xs(0) + 8}
          y={padT + 14}
          fontSize="12"
          fill={HEX.text}
          fontFamily="Bebas Neue"
          letterSpacing="0.16em"
        >
          DAY 1
        </text>

        {/* Stacks */}
        {stackTops.map((topVals, li) => {
          const bottomVals = li === 0 ? series.map(() => 0) : stackTops[li - 1]
          const c = colorByKey[order[li]]
          return (
            <path
              key={li}
              d={buildPath(topVals, bottomVals)}
              fill={c}
              fillOpacity={li === 0 ? 0.32 : 0.22}
              stroke={c}
              strokeWidth={li === 0 ? 1.5 : 1}
              strokeOpacity={0.95}
            />
          )
        })}

        {/* hover guideline + tooltip target */}
        {hoverIdx != null && (
          <g>
            <line
              x1={xs(hoverIdx)}
              x2={xs(hoverIdx)}
              y1={padT}
              y2={height - padB}
              stroke="#fff"
              strokeOpacity={0.35}
              strokeWidth={1}
            />
            {(() => {
              const total = stackTops[stackTops.length - 1][hoverIdx]
              return (
                <circle
                  cx={xs(hoverIdx)}
                  cy={ys(total)}
                  r="4"
                  fill="#fff"
                  stroke={HEX.c1}
                  strokeWidth="2"
                />
              )
            })()}
          </g>
        )}

        {/* hour ticks every 6 hours */}
        {Array.from({ length: 13 }).map((_, i) => {
          const h = i * 6
          if (h > n - 1) return null
          const dayHr = h % 24
          return (
            <text
              key={i}
              x={xs(h)}
              y={height - padB + 18}
              fontSize="10.5"
              fontFamily="Roboto Mono"
              textAnchor="middle"
              fill={HEX.text}
            >
              {dayHr.toString().padStart(2, "0")}h
            </text>
          )
        })}
      </svg>

      {/* HTML tooltip */}
      {hovered && hoveredBucket && (
        <div
          role="status"
          style={{
            position: "absolute",
            left: `${(xs(hoverIdx!) / w) * 100}%`,
            top: 8,
            transform: hoverIdx! / n > 0.7 ? "translate(-100%, 0) translate(-16px, 0)" : "translate(16px, 0)",
            background: "rgba(6,8,15,0.94)",
            border: "1px solid var(--report-border-strong)",
            padding: "10px 14px",
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
            minWidth: 180,
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: 13,
              letterSpacing: "0.14em",
              color: "var(--neon-pink)",
              marginBottom: 4,
            }}
          >
            DAY {hoveredBucket.day + 1} ·{" "}
            {hoveredBucket.localHour.toString().padStart(2, "0")}
            :00
          </div>
          {order.map((k) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                color: "var(--text-secondary)",
              }}
            >
              <span>
                <span style={{ color: colorByKey[k] }}>■</span> {labelByKey[k]}
              </span>
              <span style={{ color: "var(--text-primary)" }}>{fmtInt(hovered[k])}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 6,
              paddingTop: 6,
              borderTop: "1px solid var(--report-border)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>total</span>
            <span style={{ color: "var(--text-primary)" }}>
              {fmtInt(hovered.finds + hovered.merch + hovered.qr)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------- Sparkline ----------------
export function Sparkline({
  values,
  height = 32,
  width = 300,
  color = HEX.c1,
  fill = true,
}: {
  values: number[]
  height?: number
  width?: number
  color?: string
  fill?: boolean
}) {
  if (!values.length) {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <line x1={0} x2={width} y1={height / 2} y2={height / 2} stroke={HEX.axis} strokeOpacity="0.3" />
      </svg>
    )
  }
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const xs = (i: number) => (i / Math.max(1, values.length - 1)) * width
  const ys = (v: number) => height - ((v - min) / range) * (height - 4) - 2
  let path = `M ${xs(0)} ${ys(values[0])}`
  values.slice(1).forEach((v, i) => {
    path += ` L ${xs(i + 1)} ${ys(v)}`
  })
  const fillPath = fill ? path + ` L ${width} ${height} L 0 ${height} Z` : null
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {fill && fillPath && <path d={fillPath} fill={color} fillOpacity={0.08} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

// ---------------- Lorenz curve ----------------
export function LorenzCurve({
  points,
  gini,
  height = 280,
}: {
  points: ReportLorenz["points"]
  gini: number
  height?: number
}) {
  const w = 420
  const pad = 40
  const innerW = w - pad * 2
  const innerH = height - pad * 2
  const xs = (p: number) => pad + p * innerW
  const ys = (v: number) => pad + (1 - v) * innerH
  let path = `M ${xs(0)} ${ys(0)}`
  points.forEach((p) => {
    path += ` L ${xs(p.p)} ${ys(p.cum)}`
  })

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <rect x={pad} y={pad} width={innerW} height={innerH} fill="none" stroke={HEX.axis} strokeOpacity="0.4" />
      {[0.25, 0.5, 0.75].map((g) => (
        <g key={g}>
          <line x1={xs(g)} x2={xs(g)} y1={pad} y2={pad + innerH} stroke={HEX.axis} strokeOpacity="0.15" />
          <line x1={pad} x2={pad + innerW} y1={ys(g)} y2={ys(g)} stroke={HEX.axis} strokeOpacity="0.15" />
        </g>
      ))}
      <line
        x1={xs(0)}
        y1={ys(0)}
        x2={xs(1)}
        y2={ys(1)}
        stroke={HEX.text}
        strokeDasharray="3 4"
        strokeOpacity="0.4"
      />
      <path d={`${path} L ${xs(1)} ${ys(0)} Z`} fill={HEX.c1} fillOpacity={0.07} />
      <path d={path} fill="none" stroke={HEX.c1} strokeWidth="2" />
      <text x={pad} y={height - 8} fontSize="9" fontFamily="Roboto Mono" fill={HEX.axis}>
        0%
      </text>
      <text
        x={pad + innerW}
        y={height - 8}
        fontSize="9"
        fontFamily="Roboto Mono"
        fill={HEX.axis}
        textAnchor="end"
      >
        100% of buyers →
      </text>
      <text
        x={pad - 6}
        y={ys(0) + 3}
        fontSize="9"
        fontFamily="Roboto Mono"
        fill={HEX.axis}
        textAnchor="end"
      >
        0%
      </text>
      <text
        x={pad - 6}
        y={ys(1) + 3}
        fontSize="9"
        fontFamily="Roboto Mono"
        fill={HEX.axis}
        textAnchor="end"
      >
        100% merch
      </text>
      <g transform={`translate(${xs(0.5)},${ys(0.18)})`}>
        <text fontSize="11" fontFamily="Bebas Neue" fill={HEX.c1} letterSpacing="0.1em">
          GINI
        </text>
        <text y="20" fontSize="28" fontFamily="Bebas Neue" fill={HEX.c1}>
          {gini.toFixed(2)}
        </text>
      </g>
    </svg>
  )
}

// ---------------- Rank × Claims scatter ----------------
export function RankScatter({
  data,
  totalPlayers,
}: {
  data: ReportRankScatterPoint[]
  totalPlayers?: number
}) {
  const [hover, setHover] = useState<{
    rank: number
    purchases: number
    x: number
    y: number
  } | null>(null)

  const w = 560
  const height = 340
  const padL = 56
  const padR = 24
  const padT = 28
  const padB = 56
  const innerW = w - padL - padR
  const innerH = height - padT - padB

  const maxRank = Math.max(1, totalPlayers ?? 0, ...data.map((d) => d.rank))
  const maxY = Math.max(1, ...data.map((d) => d.purchases))

  const xs = (r: number) =>
    padL + (Math.log10(r) / Math.log10(maxRank)) * innerW
  const ys = (v: number) => padT + (1 - v / maxY) * innerH

  // Buckets for jitter so overlapping dots don't fully obscure each other.
  // (rank, purchases) → count
  const counts = new Map<string, number>()
  for (const d of data) {
    const k = `${d.rank}-${d.purchases}`
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }

  // Linear regression in log-x space
  const n = data.length || 1
  const xLog = data.map((d) => Math.log10(Math.max(1, d.rank)))
  const meanX = xLog.reduce((a, b) => a + b, 0) / n
  const meanY = data.reduce((a, d) => a + d.purchases, 0) / n
  let num = 0
  let den = 0
  for (let i = 0; i < n; i++) {
    num += (xLog[i] - meanX) * (data[i].purchases - meanY)
    den += (xLog[i] - meanX) ** 2
  }
  const slope = den === 0 ? 0 : num / den
  const intercept = meanY - slope * meanX
  const ssTot = data.reduce((a, d) => a + (d.purchases - meanY) ** 2, 0) || 1
  const ssRes = data.reduce(
    (a, d, i) => a + (d.purchases - (slope * xLog[i] + intercept)) ** 2,
    0,
  )
  const r2 = Math.max(0, Math.min(1, 1 - ssRes / ssTot))

  // Round X ticks at decade boundaries up to maxRank
  const xTicks: number[] = [1]
  for (let v = 10; v <= maxRank; v *= 10) xTicks.push(v)
  if (xTicks[xTicks.length - 1] !== maxRank) xTicks.push(maxRank)
  // Y axis ticks at integers up to maxY, capped
  const yTicks: number[] = []
  const yStep = maxY <= 6 ? 1 : Math.ceil(maxY / 5)
  for (let v = 0; v <= maxY; v += yStep) yTicks.push(v)
  if (yTicks[yTicks.length - 1] !== maxY) yTicks.push(maxY)

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${w} ${height}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label={`Scatter of leaderboard rank versus merch claims for ${data.length} buyers. R-squared ${r2.toFixed(2)}.`}
      >
        {/* y-axis gridlines + tick labels */}
        {yTicks.map((v) => (
          <g key={`y-${v}`}>
            <line
              x1={padL}
              x2={padL + innerW}
              y1={ys(v)}
              y2={ys(v)}
              stroke={HEX.axis}
              strokeOpacity={v === 0 ? 0.4 : 0.12}
            />
            <text
              x={padL - 8}
              y={ys(v) + 4}
              textAnchor="end"
              fontSize="11"
              fontFamily="Roboto Mono"
              fill={HEX.text}
            >
              {v}
            </text>
          </g>
        ))}
        {/* x-axis tick labels (decade boundaries) */}
        {xTicks.map((r) => (
          <g key={`x-${r}`}>
            <line
              x1={xs(r)}
              x2={xs(r)}
              y1={padT}
              y2={padT + innerH}
              stroke={HEX.axis}
              strokeOpacity={0.08}
            />
            <text
              x={xs(r)}
              y={padT + innerH + 18}
              textAnchor="middle"
              fontSize="11"
              fontFamily="Roboto Mono"
              fill={HEX.text}
            >
              {r === 1 ? "#1" : `#${r}`}
            </text>
          </g>
        ))}

        {/* regression line */}
        {(() => {
          const segs: Array<{ x: number; y: number }> = []
          const N = 40
          for (let i = 0; i <= N; i++) {
            const t = i / N
            const xValLog = Math.log10(1) + t * (Math.log10(maxRank) - Math.log10(1))
            const xR = Math.pow(10, xValLog)
            const yPred = Math.max(0, slope * xValLog + intercept)
            segs.push({ x: xs(xR), y: ys(yPred) })
          }
          const d = segs
            .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
            .join(" ")
          return (
            <path
              d={d}
              fill="none"
              stroke={HEX.c2}
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity={0.85}
            />
          )
        })()}

        {/* dots — radius scales with overlap count */}
        {data.map((d, i) => {
          const k = `${d.rank}-${d.purchases}`
          const c = counts.get(k) ?? 1
          const r = 4 + Math.min(7, Math.sqrt(c - 1) * 2.5)
          const x = xs(Math.max(1, d.rank))
          const y = ys(d.purchases)
          const isHover =
            hover && hover.rank === d.rank && hover.purchases === d.purchases
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={HEX.c1}
              fillOpacity={isHover ? 1 : 0.55}
              stroke={isHover ? "#FFF" : "none"}
              strokeWidth={isHover ? 1.5 : 0}
              onMouseEnter={() =>
                setHover({
                  rank: d.rank,
                  purchases: d.purchases,
                  x: (x / w) * 100,
                  y: (y / height) * 100,
                })
              }
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "crosshair", transition: "fill-opacity 120ms" }}
            />
          )
        })}

        {/* axis labels */}
        <text
          x={padL + innerW / 2}
          y={height - 16}
          textAnchor="middle"
          fontFamily="Bebas Neue"
          fontSize="14"
          letterSpacing="0.14em"
          fill={HEX.text}
        >
          LEADERBOARD RANK (LOG) →
        </text>
        <text
          transform={`translate(16, ${padT + innerH / 2}) rotate(-90)`}
          textAnchor="middle"
          fontFamily="Bebas Neue"
          fontSize="14"
          letterSpacing="0.14em"
          fill={HEX.text}
        >
          MERCH CLAIMS →
        </text>

        {/* R² readout */}
        <g transform={`translate(${padL + innerW - 110},${padT + 14})`}>
          <rect
            x={-10}
            y={-14}
            width={120}
            height={34}
            fill="rgba(6,8,15,0.85)"
            stroke={HEX.axis}
            strokeOpacity="0.4"
            rx="4"
          />
          <text fontSize="10" fontFamily="Roboto Mono" fill={HEX.text}>
            trend · log-linear
          </text>
          <text y="14" fontSize="12" fontFamily="Roboto Mono" fill={HEX.c2}>
            R² = {r2.toFixed(2)}
          </text>
        </g>
      </svg>
      {/* HTML tooltip layer */}
      {hover && (
        <div
          role="status"
          style={{
            position: "absolute",
            left: `calc(${hover.x}% + 12px)`,
            top: `calc(${hover.y}% - 4px)`,
            transform:
              hover.x > 70 ? "translate(-100%, 0) translate(-24px, 0)" : "none",
            background: "rgba(6, 8, 15, 0.94)",
            border: "1px solid var(--report-border-strong)",
            padding: "8px 10px",
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ color: "var(--neon-cyan)" }}>
            leaderboard rank · #{hover.rank}
          </div>
          <div style={{ color: "var(--neon-pink)" }}>
            merch claims · {hover.purchases}
          </div>
          <div style={{ color: "var(--text-muted)", marginTop: 2 }}>
            {counts.get(`${hover.rank}-${hover.purchases}`)! > 1
              ? `${counts.get(`${hover.rank}-${hover.purchases}`)} players at this point`
              : "1 player"}
          </div>
        </div>
      )}
      <div
        className="font-mono"
        style={{
          marginTop: 8,
          fontSize: 10.5,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        {data.length} buyers plotted · larger dots = more players stacked at the same point
      </div>
    </div>
  )
}

// ---------------- Hour-of-day line chart (3 days × 24 hours) ----------------
const DAY_LABELS = ["MAY 12", "MAY 13", "MAY 14"] as const
const DAY_COLORS = [HEX.c1, HEX.c2, HEX.c4] as const

export function HourLineChart({
  absCounts,
  height = 440,
}: {
  /** 3 × 24 grid of absolute transaction counts. */
  absCounts: number[][]
  height?: number
}) {
  const [hover, setHover] = useState<{ d: number; h: number; x: number; y: number } | null>(
    null,
  )
  // Wider viewbox + larger label sizes so the chart scales up cleanly on
  // desktop without the lines compressing into a sliver.
  const w = 1100
  const padL = 78
  const padR = 32
  const padT = 32
  const padB = 76
  const cols = 24
  const innerW = w - padL - padR
  const innerH = height - padT - padB
  const maxV = Math.max(1, ...absCounts.flat())
  const xs = (h: number) => padL + (h / (cols - 1)) * innerW
  const ys = (v: number) => padT + (1 - v / maxV) * innerH

  // y-axis tick step at a clean round number
  const tickStep = (() => {
    const ideal = maxV / 4
    const mag = Math.pow(10, Math.floor(Math.log10(ideal)))
    for (const m of [1, 2, 5, 10]) {
      if (m * mag >= ideal) return m * mag
    }
    return mag
  })()
  const yTicks: number[] = []
  for (let v = 0; v <= maxV + tickStep; v += tickStep) yTicks.push(v)

  // Peak per day
  const peaks = absCounts.map((row) => {
    let bestH = 0
    let bestV = -1
    row.forEach((v, h) => {
      if (v > bestV) {
        bestV = v
        bestH = h
      }
    })
    return { h: bestH, v: bestV }
  })

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${w} ${height}`}
        style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
        role="img"
        aria-label={`Hour-of-day activity for the three event days. Peaks: ${peaks
          .map((p, i) => `${DAY_LABELS[i]} at ${p.h.toString().padStart(2, "0")}:00 with ${p.v} transactions`)
          .join("; ")}.`}
      >
        {/* event-hours band 10:00-18:00 */}
        <rect
          x={xs(10)}
          y={padT}
          width={xs(18) - xs(10)}
          height={innerH}
          fill="rgba(86,211,100,0.05)"
          stroke="rgba(86,211,100,0.25)"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <text
          x={(xs(10) + xs(18)) / 2}
          y={padT + 18}
          fontSize="15"
          textAnchor="middle"
          fontFamily="Bebas Neue"
          letterSpacing="0.16em"
          fill="rgba(86,211,100,0.78)"
        >
          OPENING HOURS · 10:00–18:00
        </text>

        {/* y-axis grid + ticks */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padL}
              x2={padL + innerW}
              y1={ys(t)}
              y2={ys(t)}
              stroke={HEX.axis}
              strokeOpacity={t === 0 ? 0.4 : 0.1}
            />
            <text
              x={padL - 12}
              y={ys(t) + 6}
              textAnchor="end"
              fontSize="15"
              fontFamily="Roboto Mono"
              fill={HEX.text}
            >
              {t.toLocaleString("en-US")}
            </text>
          </g>
        ))}

        {/* hour tick labels every 2h for readability at the larger width */}
        {Array.from({ length: cols }).map((_, h) => {
          if (h % 2 !== 0 && h !== cols - 1) return null
          return (
            <g key={`x-${h}`}>
              <line
                x1={xs(h)}
                x2={xs(h)}
                y1={padT + innerH}
                y2={padT + innerH + 6}
                stroke={HEX.axis}
                strokeOpacity={0.4}
              />
              <text
                x={xs(h)}
                y={padT + innerH + 24}
                fontSize="15"
                textAnchor="middle"
                fontFamily="Roboto Mono"
                fill={HEX.text}
              >
                {h.toString().padStart(2, "0")}h
              </text>
            </g>
          )
        })}

        {/* lines per day */}
        {absCounts.map((row, d) => {
          const color = DAY_COLORS[d % DAY_COLORS.length]
          let path = `M ${xs(0)} ${ys(row[0])}`
          for (let h = 1; h < cols; h++) path += ` L ${xs(h)} ${ys(row[h])}`
          const fillPath = `${path} L ${xs(cols - 1)} ${ys(0)} L ${xs(0)} ${ys(0)} Z`
          return (
            <g key={d}>
              <path d={fillPath} fill={color} fillOpacity={0.08} />
              <path d={path} fill="none" stroke={color} strokeWidth="3" />
              {/* peak marker */}
              <circle
                cx={xs(peaks[d].h)}
                cy={ys(peaks[d].v)}
                r="7"
                fill={color}
                stroke="#06080F"
                strokeWidth="2"
              />
            </g>
          )
        })}

        {/* hover dots (small per-data-point) */}
        {absCounts.map((row, d) =>
          row.map((v, h) => (
            <circle
              key={`hp-${d}-${h}`}
              cx={xs(h)}
              cy={ys(v)}
              r={10}
              fill="transparent"
              onMouseEnter={() =>
                setHover({ d, h, x: (xs(h) / w) * 100, y: (ys(v) / height) * 100 })
              }
              onMouseLeave={() =>
                setHover((cur) => (cur?.d === d && cur?.h === h ? null : cur))
              }
              style={{ cursor: "crosshair" }}
            />
          )),
        )}

        {/* axis label */}
        <text
          x={padL + innerW / 2}
          y={height - 24}
          fontSize="16"
          textAnchor="middle"
          fontFamily="Bebas Neue"
          letterSpacing="0.18em"
          fill={HEX.text}
        >
          HOUR OF DAY (LISBON TIME)
        </text>

        {/* legend */}
        <g transform={`translate(${padL + 14},${padT + 36})`}>
          {absCounts.map((_, d) => (
            <g key={d} transform={`translate(0, ${d * 24})`}>
              <line x1={0} y1={8} x2={28} y2={8} stroke={DAY_COLORS[d]} strokeWidth="3.5" />
              <circle cx={14} cy={8} r="5" fill={DAY_COLORS[d]} />
              <text
                x={40}
                y={12}
                fontSize="15"
                fontFamily="Bebas Neue"
                letterSpacing="0.14em"
                fill={DAY_COLORS[d]}
              >
                {DAY_LABELS[d]} · peak {peaks[d].h.toString().padStart(2, "0")}:00 · {peaks[d].v.toLocaleString("en-US")}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* hover tooltip */}
      {hover && (
        <div
          role="status"
          style={{
            position: "absolute",
            left: `calc(${hover.x}% + 12px)`,
            top: `calc(${hover.y}% - 4px)`,
            transform: hover.x > 70 ? "translate(-100%, 0) translate(-24px, 0)" : "none",
            background: "rgba(6,8,15,0.94)",
            border: "1px solid var(--report-border-strong)",
            padding: "8px 10px",
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              color: DAY_COLORS[hover.d],
              marginBottom: 2,
            }}
          >
            {DAY_LABELS[hover.d]} · {hover.h.toString().padStart(2, "0")}:00
          </div>
          <div style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--text-primary)" }}>
              {absCounts[hover.d][hover.h].toLocaleString("en-US")}
            </span>{" "}
            transactions
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------- Hour grid (3 × 24) ----------------

export function HourGrid({
  grid,
  absCounts,
}: {
  grid: number[][]
  /** Parallel 3×24 grid of absolute transaction counts (optional). */
  absCounts?: number[][]
}) {
  const [hover, setHover] = useState<{ d: number; h: number } | null>(null)
  const rows = grid.length || 3
  const cols = 24
  // CSS-grid based layout makes hover targets the full cell + lets the
  // tooltip layer over individual cells precisely.
  const total = (absCounts ?? []).reduce(
    (acc, row) => acc + row.reduce((a, b) => a + b, 0),
    0,
  )
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `64px repeat(${cols}, minmax(0, 1fr))`,
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {grid.map((row, r) => (
          <div
            key={`d-${r}`}
            style={{ display: "contents" }}
          >
            <div
              className="font-display"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--text-secondary)",
                alignSelf: "center",
                paddingRight: 8,
                textAlign: "right",
              }}
            >
              {DAY_LABELS[r] ?? `DAY ${r + 1}`}
            </div>
            {row.map((v, c) => {
              const opacity = 0.08 + Math.max(0, Math.min(1, v)) * 0.87
              const abs = absCounts?.[r]?.[c]
              const isHover = hover && hover.d === r && hover.h === c
              return (
                <div
                  key={`${r}-${c}`}
                  role="img"
                  aria-label={
                    abs != null
                      ? `${DAY_LABELS[r]} ${c.toString().padStart(2, "0")}:00 — ${abs} transactions`
                      : `${DAY_LABELS[r]} ${c.toString().padStart(2, "0")}:00`
                  }
                  onMouseEnter={() => setHover({ d: r, h: c })}
                  onMouseLeave={() =>
                    setHover((cur) => (cur?.d === r && cur?.h === c ? null : cur))
                  }
                  onFocus={() => setHover({ d: r, h: c })}
                  onBlur={() =>
                    setHover((cur) => (cur?.d === r && cur?.h === c ? null : cur))
                  }
                  tabIndex={0}
                  style={{
                    background: HEX.c1,
                    opacity,
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    outline: isHover ? `1.5px solid ${HEX.c1}` : "none",
                    outlineOffset: 1,
                    cursor: "default",
                    transition: "opacity 120ms",
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
      {/* axis row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `64px repeat(${cols}, minmax(0, 1fr))`,
          gap: 2,
          marginTop: 4,
        }}
      >
        <span />
        {Array.from({ length: cols }).map((_, c) => (
          <span
            key={c}
            className="font-mono"
            style={{
              fontSize: 9,
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            {c % 6 === 0 || c === 23 ? `${c.toString().padStart(2, "0")}h` : ""}
          </span>
        ))}
      </div>
      {/* hover read-out */}
      <div
        style={{
          minHeight: 22,
          marginTop: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-secondary)",
          letterSpacing: "0.04em",
        }}
        aria-live="polite"
      >
        {hover ? (
          <>
            <span style={{ color: "var(--neon-pink)" }}>
              {DAY_LABELS[hover.d]} · {hover.h.toString().padStart(2, "0")}:00
            </span>
            {" — "}
            <span style={{ color: "var(--text-primary)" }}>
              {(absCounts?.[hover.d]?.[hover.h] ?? 0).toLocaleString("en-US")}
            </span>{" "}
            transactions
          </>
        ) : (
          <span style={{ color: "var(--text-muted)" }}>
            hover or focus a cell · {total.toLocaleString("en-US")} transactions across the 3-day window
          </span>
        )}
      </div>
    </div>
  )
}

// ---------------- SKU bars ----------------
export type SkuSortMode = "velocity" | "sellout" | "units" | "tokens"

export function SkuBars({
  skus,
  onPick,
  activeSku,
  categoryColor,
  mode = "velocity",
}: {
  skus: ReportSku[]
  onPick: (s: ReportSku) => void
  activeSku?: string
  categoryColor: (c: string) => string
  mode?: SkuSortMode
}) {
  // The right-hand metric column changes with `mode`. The bar width is
  // proportional to the metric so the visual reads the same as the sort.
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {skus.map((s) => {
        const isActive = activeSku === s.sku
        const color = categoryColor(s.category)
        // Right-column readout depends on mode.
        const tokenSpend = s.tokensExchanged
        let metric: string
        let metricMuted = false
        if (mode === "velocity") {
          metric = s.unitsPerHour != null ? `${s.unitsPerHour.toFixed(1)}/h` : "—"
          metricMuted = s.unitsPerHour == null
        } else if (mode === "sellout") {
          metric = s.minutesToSellout != null ? fmtMinutes(s.minutesToSellout) : "in stock"
          metricMuted = s.minutesToSellout == null
        } else if (mode === "tokens") {
          metric = tokenSpend > 0 ? `${fmtInt(tokenSpend)} tok` : "—"
          metricMuted = tokenSpend === 0
        } else {
          // units
          metric = `${s.units}`
        }
        // Sub-line: units claimed + actual on-chain token spend for this
        // SKU (sum of every MerchPurchased event's price). Surfacing it
        // here keeps the spend visible regardless of sort mode, and reads
        // the same number even when prices changed mid-event.
        const stockLine = tokenSpend > 0
          ? `${s.units} units claimed · ${fmtInt(tokenSpend)} tokens`
          : `${s.units} units claimed`

        return (
          <button
            key={s.sku}
            onClick={() => onPick(s)}
            title={s.soldOut ? `${s.name} · SOLD OUT` : s.name}
            style={{
              background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
              border: 0,
              padding: "10px 12px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 96px",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              textAlign: "left",
              color: "var(--text-primary)",
              borderRadius: 6,
              borderLeft: `2px solid ${isActive ? color : (s.soldOut ? `${color}88` : "transparent")}`,
              position: "relative",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.name}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.soldOut && (
                  <span style={{ color: HEX.c1, marginRight: 6 }}>● SOLD OUT</span>
                )}
                {s.category} · {stockLine}
              </div>
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 12,
                color: metricMuted ? "var(--text-muted)" : "var(--text-secondary)",
                textAlign: "right",
              }}
            >
              {metric}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ---------------- SKU cumulative curve ----------------
export function SkuCurve({ sku }: { sku: ReportSku | null }) {
  if (!sku) return null
  // Prefer the real `curve` (cumulative claims by unix-second). Synthesize
  // a sigmoid fallback when missing or empty.
  let pts: Array<{ t: number; v: number }>
  if (sku.curve && sku.curve.length > 1) {
    const tMin = sku.curve[0].t
    const tMax = sku.curve[sku.curve.length - 1].t
    const span = Math.max(1, tMax - tMin)
    const maxN = Math.max(1, ...sku.curve.map((p) => p.n))
    pts = sku.curve.map((p) => ({
      t: (p.t - tMin) / span,
      v: p.n / maxN,
    }))
  } else {
    const buckets = 16
    pts = []
    for (let i = 0; i <= buckets; i++) {
      const t = i / buckets
      const v = 1 / (1 + Math.exp(-(t - 0.45) * 7))
      pts.push({ t, v })
    }
  }
  const w = 360
  const h = 120
  const pad = 28
  const xs = (t: number) => pad + t * (w - pad * 2)
  const ys = (v: number) => pad / 2 + (1 - v) * (h - pad)
  let path = `M ${xs(pts[0].t)} ${ys(pts[0].v)}`
  pts.slice(1).forEach((p) => {
    path += ` L ${xs(p.t)} ${ys(p.v)}`
  })
  return (
    <div
      style={{
        padding: 16,
        background: "var(--bg-elevated)",
        border: "1px solid var(--report-border, rgba(240,246,252,0.06))",
        borderRadius: "var(--radius)",
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
        {sku.category} · {sku.units} units
        {sku.soldOut ? " · sold out" : " · in stock"}
      </div>
      <div className="font-display" style={{ fontSize: 18, marginBottom: 12, letterSpacing: "0.04em" }}>
        {sku.name}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
        <path d={`${path} L ${xs(1)} ${ys(0)} Z`} fill={HEX.c1} fillOpacity={0.08} />
        <path d={path} fill="none" stroke={HEX.c1} strokeWidth="2" />
        <line
          x1={pad}
          x2={w - pad}
          y1={ys(0)}
          y2={ys(0)}
          stroke={HEX.axis}
          strokeOpacity="0.4"
        />
        <text x={pad} y={h - 4} fontSize="9" fontFamily="Roboto Mono" fill={HEX.axis}>
          launch
        </text>
        <text
          x={w - pad}
          y={h - 4}
          textAnchor="end"
          fontSize="9"
          fontFamily="Roboto Mono"
          fill={HEX.axis}
        >
          {sku.minutesToSellout != null
            ? `sellout · ${fmtMinutes(sku.minutesToSellout)}`
            : "still in stock"}
        </text>
      </svg>
    </div>
  )
}

// ---------------- Returner bar ----------------
export function ReturnerBar({
  d1,
  d2,
  d3,
}: {
  d1: number
  d2: number
  d3: number
}) {
  const total = Math.max(1, d1 + d2 + d3)
  const segs = [
    { label: "1-day", v: d1, color: HEX.c3 },
    { label: "2-day", v: d2, color: HEX.c2 },
    { label: "3-day", v: d3, color: HEX.c1 },
  ]
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: 36,
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid var(--report-border-strong, rgba(240,246,252,0.12))",
        }}
      >
        {segs.map((s, i) => {
          const w = (s.v / total) * 100
          if (w === 0) return null
          return (
            <div
              key={i}
              style={{
                width: `${w}%`,
                background: s.color,
                opacity: 0.78,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06080F",
                fontSize: 11,
                fontFamily: "Bebas Neue",
                letterSpacing: "0.14em",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              title={`${s.label} · ${s.v.toLocaleString()}`}
            >
              {w > 6 ? s.label.toUpperCase() : ""}
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontSize: 11,
          color: "var(--text-secondary)",
          fontFamily: "Roboto Mono",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {segs.map((s, i) => (
          <span key={i}>
            {s.label} · {((s.v / total) * 100).toFixed(1)}% · {s.v.toLocaleString()}
          </span>
        ))}
      </div>
    </div>
  )
}

export type { ReportSkuCurvePoint }
