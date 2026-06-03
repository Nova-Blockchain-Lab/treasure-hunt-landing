"use client"

import type { ReportHotspot, ReportZone } from "@/lib/smartcities-report"
import { fmtInt } from "@/lib/smartcities-report"

const VW = 1920
const VH = 2420

// Fully-warm ramp: every blob blooms in the yellow → red spectrum, with
// 11 finely-stepped stops so adjacent intensity tiers still read as
// visibly different colors. Greens are gone — the floor is yellow and the
// peak is deep crimson.
const WEATHER_STOPS: Array<[number, string]> = [
  [0.00, "#FFE066"], // pale yellow
  [0.10, "#FFD24A"], // golden yellow
  [0.22, "#FFB94A"], // amber
  [0.34, "#FFA055"], // light orange
  [0.46, "#FF8A5C"], // orange
  [0.58, "#FF6F5C"], // coral
  [0.68, "#F25A55"], // red-orange
  [0.78, "#E84247"], // red
  [0.86, "#D22F3B"], // deep red
  [0.94, "#A8202E"], // burgundy
  [1.00, "#7A1024"], // crimson peak
]

const HEX_HOT = "#F0605D"
const HEX_COLD = "#58A6FF"

function HeatLayer({ points }: { points: ReportHotspot[] }) {
  // Drop unplaced / off-canvas tags — seed rows without coords arrive as
  // (0,0), and a few stray right-edge tags sit at x≈1 outside the layout.
  const placed = points.filter(
    (p) =>
      Number.isFinite(p.x) &&
      Number.isFinite(p.y) &&
      p.x > 0.02 &&
      p.x < 0.98 &&
      p.y > 0.02 &&
      p.y < 0.98 &&
      p.w > 0,
  )
  const maxW = Math.max(1, ...placed.map((p) => p.w))
  return (
    <g aria-hidden>
      <defs>
        {/* One gradient per ramp stop. Each blob picks the gradient whose
            normalized intensity bucket matches its weight. Tighter falloff
            (75% offset instead of 55%) keeps each blob concise rather than
            washing across the venue. */}
        {WEATHER_STOPS.map(([, color], i) => (
          <radialGradient
            key={`heat-stop-${i}`}
            id={`report-heat-${i}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="40%" stopColor={color} stopOpacity="0.85" />
            <stop offset="75%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        ))}
        <filter id="report-heat-blur" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <g filter="url(#report-heat-blur)">
        {placed.map((p, i) => {
          const w01 = p.w / maxW
          // Lift the bottom of the ramp so even the quietest tags bloom
          // amber-green rather than washing out near transparent.
          const lifted = 0.18 + w01 * 0.82
          let stopIdx = WEATHER_STOPS.length - 1
          for (let k = 0; k < WEATHER_STOPS.length; k++) {
            if (lifted <= WEATHER_STOPS[k][0]) {
              stopIdx = k
              break
            }
          }
          // Tighter radius — the previous 80+200·w^0.6 covered too much
          // negative space and made the map read as "everything is warm."
          const r = 55 + Math.pow(w01, 0.55) * 140
          return (
            <circle
              key={i}
              cx={p.x * VW}
              cy={p.y * VH}
              r={r}
              fill={`url(#report-heat-${stopIdx})`}
              fillOpacity={Math.max(0.7, 0.6 + w01 * 0.4)}
            />
          )
        })}
      </g>
    </g>
  )
}

function MapCallout({
  cx,
  cy,
  label,
  value,
  side = "right",
  kind = "hot",
}: {
  cx: number
  cy: number
  label: string
  value: string
  side?: "left" | "right"
  kind?: "hot" | "cold"
}) {
  const color = kind === "hot" ? HEX_HOT : HEX_COLD
  const labelW = 480
  const labelH = 132
  const offsetX = 280
  const labelX = side === "right" ? cx + offsetX : cx - offsetX
  const boxX = side === "right" ? labelX : labelX - labelW
  const textX = boxX + 24
  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={labelX}
        y2={cy}
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.7"
      />
      <circle cx={cx} cy={cy} r="18" fill="none" stroke={color} strokeWidth="3" />
      <circle cx={cx} cy={cy} r="7" fill={color} />
      <rect
        x={boxX}
        y={cy - labelH / 2}
        width={labelW}
        height={labelH}
        fill="rgba(6,8,15,0.92)"
        stroke={color}
        strokeOpacity="0.45"
        strokeWidth="2"
        rx="10"
      />
      <text
        x={textX}
        y={cy - 12}
        fontFamily="Bebas Neue, sans-serif"
        fontSize="52"
        letterSpacing="3"
        fill={color}
      >
        {label}
      </text>
      <text
        x={textX}
        y={cy + 38}
        fontFamily="Roboto Mono"
        fontSize="26"
        fill="rgba(230,237,243,0.82)"
      >
        {value}
      </text>
    </g>
  )
}

export function VenueMap({
  hotspots,
  zones,
}: {
  hotspots: ReportHotspot[]
  zones: ReportZone[]
}) {
  // Stage tags never had real coordinates (all (0,0) in the seed), so
  // showing a "STAGES" callout pinned to a guessed location misleads
  // readers — drop the zone from map callouts. It still appears in the
  // zone-breakdown table below the map.
  const callable = zones.filter((z) => z.id !== "stages")
  const sorted = [...callable].sort((a, b) => b.finds - a.finds)
  const hotIds = new Set(sorted.slice(0, 2).map((z) => z.id))
  const hot = sorted.slice(0, 2)
  const cold = [...sorted].reverse().filter((z) => !hotIds.has(z.id)).slice(0, 1)

  // Hand-tuned callout anchor per zone, matched to the actual FIL Pavilhão 3
  // floor plan (1920×2420 portrait, /public/fil_map.jpeg).
  //   - 3A is the left column (3A01 → 3A22)
  //   - 3B is the middle-left column (3B01 → 3B17)
  //   - 3C is the middle-right column (3C00 → 3C20)
  //   - 3D is the right column (3D01 → 3D21)
  //   - Stages: Partnership Forum (top-left red block),
  //     Industry Stage (center red block ~y=0.46),
  //     Main Stage (bottom-right red block ~y=0.92).
  //     Callout points at the centered Industry Stage so the leader line
  //     doesn't cross the pavilion edge.
  const ZONE_POS: Record<string, { x: number; y: number; side?: "left" | "right" }> = {
    stages:   { x: 0.46, y: 0.46, side: "right" },
    sector3a: { x: 0.18, y: 0.30, side: "left" },
    sector3b: { x: 0.40, y: 0.20, side: "right" },
    sector3c: { x: 0.58, y: 0.40, side: "right" },
    // 3D is the rightmost column; pulling its callout to the left keeps the
    // label inside the 1920-wide viewbox (right-side callouts at x=0.74
    // would overflow off-canvas).
    sector3d: { x: 0.74, y: 0.30, side: "left" },
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        background: "var(--bg-secondary)",
        aspectRatio: `${VW} / ${VH}`,
      }}
      role="img"
      aria-label="FIL Pavilhão 3 floor plan with a weather-map style kernel-density heatmap of treasure-hunt finds. Sector 3B is the hottest zone."
    >
      <image
        href="/fil_map.jpeg"
        x={0}
        y={0}
        width={VW}
        height={VH}
        preserveAspectRatio="xMidYMid slice"
        opacity={0.55}
      />
      {/* desaturating wash so the heatmap colors bloom against a dimmed map */}
      <rect x={0} y={0} width={VW} height={VH} fill="#06080F" opacity={0.22} />
      <HeatLayer points={hotspots} />
      {hot.map((z, i) => {
        const pos = ZONE_POS[z.id] ?? { x: 0.5, y: 0.5, side: "right" as const }
        return (
          <MapCallout
            key={`hot-${z.id}`}
            cx={pos.x * VW}
            cy={pos.y * VH}
            side={pos.side ?? "right"}
            kind="hot"
            label={z.name}
            value={`${fmtInt(z.finds)} finds · #${i + 1} hottest`}
          />
        )
      })}
      {cold.map((z) => {
        const pos = ZONE_POS[z.id] ?? { x: 0.5, y: 0.5, side: "right" as const }
        return (
          <MapCallout
            key={`cold-${z.id}`}
            cx={pos.x * VW}
            cy={pos.y * VH}
            side={pos.side ?? "right"}
            kind="cold"
            label={z.name}
            value={`${fmtInt(z.finds)} finds · coolest zone`}
          />
        )
      })}
    </svg>
  )
}
