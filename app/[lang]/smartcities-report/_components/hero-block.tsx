import type { Snapshot } from "@/lib/smartcities-report"
import { fmtInt } from "@/lib/smartcities-report"

export function HeroBlock({ snapshot }: { snapshot: Snapshot }) {
  const { chain, kpis } = snapshot
  const tsDate = new Date(chain.snapshotISO)
  const ts = tsDate.toUTCString()
  return (
    <div
      className="report-container report-hero"
      style={{ paddingTop: 88, paddingBottom: 8, position: "relative" }}
    >
      {/* editorial colophon — masthead strip */}
      <div className="report-hero__colophon" aria-hidden>
        <span className="report-hero__colophon-mark">
          {/* small geometric compass-pin mark */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>PSCS · 26</span>
        </span>
        <span className="report-hero__colophon-sep" />
        <span className="report-hero__colophon-coords">
          FIL Pavilhão 3
        </span>
        <span className="report-hero__colophon-sep" />
        <span className="report-hero__colophon-edition">
          edition · I / I
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <span
          className="report-chip"
          style={{
            borderColor: "rgba(240,96,93,0.4)",
            color: "var(--neon-pink)",
            boxShadow: "0 0 24px rgba(240,96,93,0.18)",
          }}
        >
          POST-EVENT REPORT · v1
        </span>
        <span className="report-chip">PUBLIC SHARE</span>
        <span className="report-chip" style={{ borderColor: "rgba(86,211,100,0.35)", color: "var(--neon-yellow)" }}>
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--neon-yellow)",
              boxShadow: "0 0 8px rgba(86,211,100,0.6)",
            }}
          />
          VERIFIED ON-CHAIN
        </span>
      </div>

      <h1 className="report-hero__title">
        <span className="report-hero__line">Three days.</span>
        <span className="report-hero__line report-hero__line--accent">
          {fmtInt(kpis.totalFinds)} finds.
        </span>
        <span className="report-hero__line">One pavilion.</span>
      </h1>

      {/* hairline + dateline */}
      <div className="report-hero__rule" aria-hidden />
      <p
        className="font-display"
        style={{
          fontSize: 13.5,
          color: "var(--text-secondary)",
          margin: 0,
          letterSpacing: "0.22em",
        }}
      >
        PORTUGAL SMART CITIES SUMMIT · 12–14 MAY 2026 · FIL PAVILHÃO 3
      </p>
      <p
        className="font-mono report-hero__stamp"
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          marginTop: 10,
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>snapshot</span>
        {" · "}
        {ts}
        {" · "}
        <span style={{ color: "var(--text-secondary)" }}>block</span>
        {" #"}
        {chain.blockHeight.toLocaleString("en-US")}
      </p>
    </div>
  )
}
