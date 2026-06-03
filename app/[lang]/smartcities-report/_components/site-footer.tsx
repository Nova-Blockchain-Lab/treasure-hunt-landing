import Image from "next/image"
import type { Snapshot } from "@/lib/smartcities-report"

export function SiteFooter({ snapshot }: { snapshot: Snapshot }) {
  const { chain, kpis } = snapshot
  const ts = new Date(chain.snapshotISO).toUTCString()
  const explorerUrl = `${chain.explorer.replace(/\/$/, "")}/address/${chain.contract}`

  return (
    <footer className="report-footer">
      <div className="report-container">
        {/* On-chain + about */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              className="font-display"
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--text-secondary)",
                marginBottom: 12,
              }}
            >
              VERIFIABLE ON-CHAIN
            </div>
            <div
              style={{
                padding: 16,
                background: "var(--bg-card)",
                border: "1px solid var(--report-border)",
                borderRadius: "0.5rem",
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginBottom: 6,
                }}
              >
                {chain.network}
              </div>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono"
                style={{
                  fontSize: 13,
                  color: "var(--neon-cyan)",
                  textDecoration: "none",
                  wordBreak: "break-all",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {explorerUrl}
              </a>
              <div
                className="font-mono"
                style={{
                  fontSize: 10.5,
                  color: "var(--text-muted)",
                }}
              >
                snapshot · {ts} · block #{chain.blockHeight.toLocaleString("en-US")}
                {" · "}
                {kpis.tokenHolders.toLocaleString("en-US")} holders on the {kpis.tokenSymbol} token
              </div>
            </div>
          </div>
          <div>
            <div
              className="font-display"
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--text-secondary)",
                marginBottom: 12,
              }}
            >
              ABOUT THIS REPORT
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              All figures are aggregated from on-chain events on Nova Cidade
              testnet and cached for 24 hours after snapshot. Individual
              reporter identities, anomaly flags, and internal IDs are
              stripped from this public view.
            </p>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 16,
                fontSize: 12,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.14em",
              }}
            >
              <a href="#" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>
                METHODOLOGY →
              </a>
              <a
                href="/api/report/snapshot"
                style={{ color: "var(--neon-cyan)", textDecoration: "none" }}
              >
                DATA SNAPSHOT JSON →
              </a>
            </div>
          </div>
        </div>

        {/* Partner colophon */}
        <div className="report-colophon">
          <div className="report-colophon__rail" aria-hidden />
          <div className="report-colophon__label">
            <span className="font-display">PARTNERS</span>
            <span className="font-mono">colophon</span>
          </div>
          <div className="report-colophon__row">
            <div className="report-colophon__item">
              <Image
                src="/pscs-logo.png"
                alt="Portugal Smart Cities Summit 2026"
                width={140}
                height={44}
                style={{ height: 44, width: "auto", objectFit: "contain" }}
              />
              <span className="report-colophon__tag">summit organiser</span>
            </div>
            <div className="report-colophon__item">
              <Image
                src="/NOVA_Blockchain_Lab-2.png"
                alt="Nova Blockchain Lab"
                width={180}
                height={44}
                style={{ height: 44, width: "auto", objectFit: "contain" }}
              />
              <span className="report-colophon__tag">on-chain &amp; report</span>
            </div>
            <div className="report-colophon__item">
              <Image
                src="/nova-ims-logo.png"
                alt="NOVA IMS · Information Management School"
                width={254}
                height={68}
                // Horizontal wordmark from novaims.unl.pt/assets/Default/images/logo.png
                // (black on transparent). Invert so it reads white on the
                // dark footer.
                style={{ height: 44, width: "auto", objectFit: "contain", filter: "invert(1)" }}
              />
              <span className="report-colophon__tag">information management school</span>
            </div>
            <div className="report-colophon__item report-colophon__item--text">
              <div className="font-display report-colophon__wordmark">AIP · FIL</div>
              <span className="report-colophon__tag">pavilhão 3 venue partner</span>
            </div>
          </div>
          <div className="report-colophon__rail" aria-hidden />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 24,
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          <span className="font-mono">© 2026 Nova IMS · Nova Blockchain Lab</span>
          <span className="font-mono">/report · public · v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
