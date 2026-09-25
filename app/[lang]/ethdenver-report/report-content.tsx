'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BarRow, Histogram } from '../cadaval-report/_components/charts'
import {
  ACTIVITY, MINTING, BREAKDOWN, TOTAL_CLAIMS, TOP10, HOURLY,
  TREASURE_POPULARITY, MERCH_ITEMS, FUN_FACTS, HERO_STATS,
} from '@/data/ethdenver-report'
import { ReportRelated } from "@/components/report-related"

const DONUT_COLORS = ['#22D1EE', '#6245EB', '#FF57B1', '#FFE739', '#ff6b35']
const DONUT_DATA = [
  { name: 'Found', value: BREAKDOWN.found },
  { name: 'Hidden', value: BREAKDOWN.hidden },
  { name: 'Social', value: BREAKDOWN.social },
  { name: 'QR', value: BREAKDOWN.qr },
  { name: 'Merch', value: BREAKDOWN.merch },
]
const DONUT_MAX = Math.max(...DONUT_DATA.map((d) => d.value))
const MINTING_BINS = MINTING.map((m) => ({ label: m.label, count: m.amount }))

interface ReportDict {
  [key: string]: string
}

export function ReportContent({ dict }: { dict: ReportDict }) {
  return (
    <div className="min-h-screen bg-[#06080F] text-white">
      {/* Back nav */}
      <div className="max-w-[900px] mx-auto px-5 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="max-w-[900px] mx-auto px-5 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] tracking-wide bg-gradient-to-r from-[#FF57B1] via-[#6245EB] to-[#22D1EE] bg-clip-text text-transparent mb-2">
            {dict.title}
          </h1>
          <p className="text-[#8B949E] text-lg">{dict.subtitle}</p>
        </section>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[rgba(26,18,82,0.3)] p-5 text-center overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
              <div className="font-display text-[1.75rem] md:text-[2rem] text-white">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs text-[#7a75a0] mt-1">{dict[stat.label]}</div>
            </div>
          ))}
        </div>

        {/* Charts row: Daily Activity + Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ChartCard title={dict.dailyActivity}>
            <Histogram
              data={ACTIVITY}
              height={190}
              color="#22D1EE"
              ariaLabel={`${dict.dailyActivity} — ${dict.transactions}`}
            />
          </ChartCard>

          <ChartCard title={dict.activityBreakdown}>
            <div className="text-center mb-4">
              <div className="font-display text-2xl">{TOTAL_CLAIMS.toLocaleString()}</div>
              <div className="text-xs text-[#7a75a0]">{dict.totalActions}</div>
            </div>
            {[dict.found, dict.hidden, dict.social, dict.qr, dict.merch].map((label, i) => (
              <BarRow
                key={i}
                label={label}
                value={DONUT_DATA[i].value}
                max={DONUT_MAX}
                color={DONUT_COLORS[i]}
              />
            ))}
          </ChartCard>
        </div>

        {/* Token Distribution */}
        <ChartCard title={dict.tokenDistribution} subtitle={dict.top10Holders} className="mb-6">
          {TOP10.map((h) => (
            <BarRow
              key={h.label}
              label={h.label}
              value={h.balance}
              max={TOP10[0].balance}
              width={700}
              color="linear-gradient(90deg, rgba(255,87,177,0.8), rgba(98,69,235,0.9))"
            />
          ))}
        </ChartCard>

        {/* Hourly Activity */}
        <ChartCard title={dict.hourlyActivity} subtitle={dict.hourlyDescription} className="mb-6">
          <Histogram
            data={HOURLY}
            height={220}
            color="#6245EB"
            ariaLabel={`${dict.hourlyActivity} — ${dict.transactions}`}
          />
        </ChartCard>

        {/* Minting Timeline */}
        <ChartCard title={dict.mintingTimeline} className="mb-6">
          <Histogram
            data={MINTING_BINS}
            height={190}
            color="#FFE739"
            ariaLabel={`${dict.mintingTimeline} — ${dict.buffiMintedLabel}`}
          />
        </ChartCard>

        {/* Treasure Popularity Table */}
        <TableCard title={dict.treasurePopularity} subtitle={dict.treasurePopularityDesc} className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#7a75a0] uppercase tracking-wide">
                <th className="p-3 text-left w-9">#</th>
                <th className="p-3 text-left">{dict.treasure}</th>
                <th className="p-3 text-center">{dict.finds}</th>
                <th className="p-3 text-right">{dict.hiddenBy}</th>
              </tr>
            </thead>
            <tbody>
              {TREASURE_POPULARITY.map((t) => (
                <tr key={t.rank} className="border-t border-[rgba(37,26,106,0.5)] hover:bg-[rgba(26,18,82,0.5)] transition-colors">
                  <td className="p-3 font-bold text-[#7a75a0]">{t.rank}</td>
                  <td className="p-3 text-[#b8b4d4]">{t.name}</td>
                  <td className="p-3 text-center font-bold text-[#FFE739]">{t.finds}</td>
                  <td className="p-3 text-right text-xs text-[#6245EB]">{t.hiddenBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        {/* Merch Store Table */}
        <TableCard title={dict.merchStore} subtitle={dict.merchStoreDesc} className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#7a75a0] uppercase tracking-wide">
                <th className="p-3 text-left w-9">#</th>
                <th className="p-3 text-left">{dict.item}</th>
                <th className="p-3 text-center">{dict.price}</th>
                <th className="p-3 text-center">{dict.sold}</th>
                <th className="p-3 text-right">{dict.buffiBurned}</th>
              </tr>
            </thead>
            <tbody>
              {MERCH_ITEMS.map((m) => (
                <tr key={m.rank} className="border-t border-[rgba(37,26,106,0.5)] hover:bg-[rgba(26,18,82,0.5)] transition-colors">
                  <td className="p-3 font-bold text-[#7a75a0]">{m.rank}</td>
                  <td className="p-3 text-[#b8b4d4]">{m.name}</td>
                  <td className="p-3 text-center text-[#FFE739]">{m.price.toLocaleString()}</td>
                  <td className="p-3 text-center font-bold">{m.sold}</td>
                  <td className="p-3 text-right text-[#FF57B1]">{m.burned.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        {/* Top Hunters */}
        <ChartCard title={dict.topHunters} className="mb-6">
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 mb-8 px-4">
            {/* 2nd */}
            <div className="flex flex-col items-center w-24">
              <div className="w-10 h-10 rounded-full bg-[rgba(192,192,192,0.2)] border-2 border-[#9ca3af] flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-[#d1d5db]">2</span>
              </div>
              <div className="w-full h-20 rounded-t-lg flex items-end justify-center pb-2" style={{ background: 'linear-gradient(180deg, rgba(156,163,175,0.3) 0%, rgba(156,163,175,0.1) 100%)' }}>
                <span className="font-bold text-white">2nd</span>
              </div>
              <p className="text-xs text-[#7a75a0] mt-2 font-mono truncate w-full text-center">kingdabtech</p>
              <p className="text-sm font-bold text-[#FFE739]">9,500</p>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center w-28">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,215,0,0.2)] border-2 border-[#facc15] flex items-center justify-center mb-2">
                <span className="text-sm font-bold text-[#facc15]">1</span>
              </div>
              <div className="w-full h-28 rounded-t-lg flex items-end justify-center pb-2" style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.3) 0%, rgba(250,204,21,0.1) 100%)' }}>
                <span className="font-bold text-[#facc15]">1st</span>
              </div>
              <p className="text-xs text-[#7a75a0] mt-2 font-mono truncate w-full text-center">zkprof</p>
              <p className="text-sm font-bold text-[#FFE739]">10,100</p>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center w-24">
              <div className="w-10 h-10 rounded-full bg-[rgba(205,127,50,0.2)] border-2 border-[#fb923c] flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-[#fb923c]">3</span>
              </div>
              <div className="w-full h-16 rounded-t-lg flex items-end justify-center pb-2" style={{ background: 'linear-gradient(180deg, rgba(251,146,60,0.3) 0%, rgba(251,146,60,0.1) 100%)' }}>
                <span className="font-bold text-[#fb923c]">3rd</span>
              </div>
              <p className="text-xs text-[#7a75a0] mt-2 font-mono truncate w-full text-center">samanthatseng</p>
              <p className="text-sm font-bold text-[#FFE739]">7,900</p>
            </div>
          </div>

          {/* Leaderboard table (4-10) */}
          <div className="rounded-lg border border-[rgba(37,26,106,0.5)] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#7a75a0] uppercase tracking-wide bg-[rgba(37,26,106,0.5)]">
                  <th className="p-3 text-left w-12">#</th>
                  <th className="p-3 text-left">{dict.hunter}</th>
                  <th className="p-3 text-right w-24">{dict.buffiLabel}</th>
                </tr>
              </thead>
              <tbody>
                {TOP10.slice(3).map((h, i) => (
                  <tr key={i} className="border-t border-[rgba(37,26,106,0.5)] hover:bg-[rgba(26,18,82,0.5)] transition-colors">
                    <td className="p-3 font-bold text-[#7a75a0]">{i + 4}</td>
                    <td className="p-3 font-mono text-[#b8b4d4]">{h.label}</td>
                    <td className="p-3 text-right font-bold text-[#FFE739]">{h.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Fun Facts */}
        <section className="mb-6">
          <h2 className="font-display text-xl font-bold mb-4">{dict.funFacts}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FUN_FACTS.map((fact, i) => (
              <div key={i} className="relative rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[rgba(26,18,82,0.3)] p-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${fact.color}, transparent)` }} />
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: fact.color }} />
                  <span className="text-[0.7rem] text-[#7a75a0] uppercase tracking-wide">{dict[fact.label]}</span>
                </div>
                <div className="text-sm font-bold text-white truncate">{fact.value}</div>
                {fact.sub && <div className="text-xs text-[#7a75a0] mt-0.5">{fact.sub}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
      <ReportRelated heading={dict.related} links={[{ href: "/blog/how-treasure-hunt-drove-engagement-ethdenver-2026", label: "The ETHDenver 2026 case study" }, { href: "/nfc-treasure-hunt", label: "NFC treasure hunt for events" }]} />
        <footer className="text-center py-8 border-t border-[rgba(255,87,177,0.1)]">
          <a
            href="https://testnet.explorer.novaims.unl.pt/address/0x9732D2360085A6A36E51B9904A7000BFA461B85c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(34,209,238,0.3)] text-[#22D1EE] text-sm hover:border-[#22D1EE] transition-colors mb-4"
          >
            {dict.viewContract}
          </a>
          <p className="text-xs text-[#7a75a0]">{dict.builtOn}</p>
        </footer>

        {/* JSON-LD for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'ETHDenver 2026 Treasure Hunt Report',
              description: '207 players, 992 treasures found, 462,255 BUFFI minted. Full analytics from Treasure Hunt at ETHDenver 2026.',
              datePublished: '2026-03-06',
              url: 'https://www.treasurehunt.pt/ethdenver-report',
              mainEntityOfPage: 'https://www.treasurehunt.pt/ethdenver-report',
              image: ['https://www.treasurehunt.pt/ethdenver-home.png'],
              author: { '@type': 'Organization', name: 'NOVA Blockchain Lab' },
              publisher: { '@type': 'Organization', name: 'NOVA Blockchain Lab', url: 'https://www.treasurehunt.pt' },
            }),
          }}
        />
      </div>
    </div>
  )
}

// Shared components
function ChartCard({ title, subtitle, children, className = '' }: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[rgba(26,18,82,0.3)] p-5 md:p-6 ${className}`}>
      <h2 className="font-display text-lg md:text-xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-[#7a75a0] mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  )
}

function TableCard({ title, subtitle, children, className = '' }: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-[rgba(240,246,252,0.06)] bg-[rgba(26,18,82,0.3)] p-5 md:p-6 ${className}`}>
      <h2 className="font-display text-lg md:text-xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-[#7a75a0] mb-4">{subtitle}</p>}
      <div className="rounded-lg border border-[rgba(37,26,106,0.5)] overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
