// Types for the public post-event report snapshot.
// The runtime payload is checked into `data/pscs2026/report-snapshot.json`
// and served by `app/api/report/snapshot/route.ts`.

export type ReportKpis = {
  totalPlayers: number
  pctClaimedReward: number          // 0–100
  totalFinds: number
  tokensDistributed: number
  merchPurchases: number
  threeDayReturner: number          // 0–100
  totalQrClaims: number
  totalSocialClaims: number
  totalPollVotes: number
  tokenHolders: number
  tokenSymbol: string
  tokenName: string
  returnerCounts: { "1": number; "2": number; "3": number }
}

export type ReportZone = {
  id: string
  name: string
  color: string                     // hex
  tags: number
  finds: number
  uniqueFinders: number
  top: string
  topFinds: number
}

export type ReportExhibitor = {
  rank: number
  name: string
  booth: string
  owner: string | null
  ownerAddress: string | null
  finds: number
  uniqueFinders: number
  pct: number                       // 0..100, % of all players
  ttf: number | null                // seconds, null/0 if no first-find
  spill: number                     // 0..100
  zone: string
  x: number                         // pct of map width (0..100)
  y: number                         // pct of map height
}

export type ReportHistogramBin = { label: string; count: number }

export type ReportTalk = {
  title: string
  speaker: string
  day: string                       // 'YYYY-MM-DD'
  start: number                     // decimal hour
  primary: number
  grace: number
  unique: number
  qrCodeId?: string
}

export type ReportStage = {
  id: string
  name: string
  talks: ReportTalk[]
  capacity?: number | null
  cancelled?: boolean
  cancelledReason?: string | null
}

export type ReportTimelineBucket = {
  h: number                         // 0..71
  day: number                       // 0..2
  localHour: number                 // 0..23
  main: number
  industry: number
  forum: number
  finds: number
  merch: number
  total: number
}

export type ReportSkuCurvePoint = { t: number; n: number }

export type ReportSku = {
  sku: string
  name: string
  category: string
  minutesToSellout: number | null
  units: number
  stock: number | null
  /** units / stock when stock is known (0..1) */
  stockEfficiency: number | null
  /** purchases per hour over the active window */
  unitsPerHour: number | null
  /**
   * Current/last-known unit price (whole tokens). Prices changed across
   * the event, so this is just the latest snapshot — use `tokensExchanged`
   * for the actual on-chain spend across all purchases of this SKU.
   */
  price: number | null
  /**
   * Total tokens (whole, not wei) exchanged across every on-chain
   * `MerchPurchased` event for this SKU. Computed by summing the
   * per-purchase `price` field, so it stays correct when prices changed
   * mid-event.
   */
  tokensExchanged: number
  soldOut: boolean
  curve: ReportSkuCurvePoint[]
}

export type ReportLorenz = {
  points: Array<{ p: number; cum: number }>
  gini: number
}

export type ReportRankScatterPoint = { rank: number; purchases: number }

export type ReportTopMerchBuyer = { user: string; buys: number }

export type ReportPoll = {
  id: string
  votes: number
  opts: Array<{ label: string; count: number }>
  deletedFromDb?: boolean
}

export type ReportSocial = { platform: string; claims: number }

export type ReportHotspot = { x: number; y: number; w: number }

export type ReportTalkInstrumentation = {
  totalTalks: number
  talksWithAnyScan: number
  note: string
}

export type ReportChain = {
  network: string
  contract: string
  explorer: string
  snapshotISO: string
  blockHeight: number
}

export type Snapshot = {
  kpis: ReportKpis
  zones: ReportZone[]
  exhibitorList: ReportExhibitor[]
  findsHistogram: ReportHistogramBin[]
  stages: ReportStage[]
  timeline: ReportTimelineBucket[]
  skus: ReportSku[]
  lorenz: ReportLorenz
  rankScatter: ReportRankScatterPoint[]
  topMerchBuyers: ReportTopMerchBuyer[]
  polls: ReportPoll[]
  socials: ReportSocial[]
  hourGrid: number[][]              // 3 × 24, 0..1 intensity
  hourGridAbs: number[][]           // 3 × 24, raw tx counts
  returners: { d1: number; d2: number; d3: number }
  hotspots: {
    points: ReportHotspot[]
    centers?: Record<string, [number, number, number, string]>
  }
  boostsActiveDuringEvent: number
  reportsFiled: number
  talkInstrumentation: ReportTalkInstrumentation
  chain: ReportChain
}

// ---- formatters shared across the report subtree ----

export const fmtInt = (n: number): string => n.toLocaleString("en-US")

export const fmtPct = (n: number, d = 0): string => `${n.toFixed(d)}%`

/** Format a duration in seconds: <60 -> "47s", <3600 -> "2m 14s", else "1h 23m". */
export function fmtSeconds(s: number | null | undefined): string {
  if (s == null || !Number.isFinite(s)) return "—"
  if (s < 60) return `${Math.round(s)}s`
  if (s < 3600) {
    const m = Math.floor(s / 60)
    const r = Math.round(s % 60)
    return `${m}m ${r.toString().padStart(2, "0")}s`
  }
  const h = Math.floor(s / 3600)
  const m = Math.round((s % 3600) / 60)
  return `${h}h ${m.toString().padStart(2, "0")}m`
}

export function fmtHour(decimalHour: number): string {
  const hh = Math.floor(decimalHour)
  const mm = Math.round((decimalHour - hh) * 60)
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`
}

export function fmtShortAddress(addr: string): string {
  if (addr.length < 10) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

/** Format minutes for the SKU bar right-column label. */
export function fmtMinutes(min: number | null | undefined): string {
  if (min == null || !Number.isFinite(min)) return "—"
  if (min < 60) return `${Math.round(min)}m`
  const h = Math.floor(min / 60)
  const m = Math.round(min % 60)
  return `${h}h ${m}m`
}

/**
 * Read the snapshot JSON server-side. Cached by Next.js because the only
 * caller is the API route — which sets `Cache-Control: s-maxage=86400`.
 */
export async function readSnapshot(): Promise<Snapshot> {
  const fs = await import("node:fs/promises")
  const path = await import("node:path")
  const file = path.join(process.cwd(), "data", "pscs2026", "report-snapshot.json")
  const raw = await fs.readFile(file, "utf-8")
  return JSON.parse(raw) as Snapshot
}

/**
 * Estimate the share captured by the top X-fraction of buyers from the
 * Lorenz polyline (linear interp between sample points). Returns 0..1.
 *
 * The Lorenz curve gives the cumulative share of merch claimed by the
 * bottom `p` fraction of buyers. The top 20% share = 1 - L(0.8).
 */
export function lorenzTopShare(points: Array<{ p: number; cum: number }>, top = 0.2): number {
  if (!points.length) return 0
  const target = Math.max(0, Math.min(1, 1 - top))
  // binary-search the segment that brackets `target`
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    if (b.p >= target) {
      const t = b.p === a.p ? 0 : (target - a.p) / (b.p - a.p)
      const lerp = a.cum + (b.cum - a.cum) * t
      return Math.max(0, Math.min(1, 1 - lerp))
    }
  }
  return 0
}
