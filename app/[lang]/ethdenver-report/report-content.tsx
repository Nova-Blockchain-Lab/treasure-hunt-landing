'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  ACTIVITY, MINTING, BREAKDOWN, TOTAL_CLAIMS, TOP10, HOURLY,
  TREASURE_POPULARITY, MERCH_ITEMS, FUN_FACTS, HERO_STATS,
} from '@/data/ethdenver-report'

const DONUT_COLORS = ['#22D1EE', '#6245EB', '#FF57B1', '#FFE739', '#ff6b35']
const DONUT_DATA = [
  { name: 'Found', value: BREAKDOWN.found },
  { name: 'Hidden', value: BREAKDOWN.hidden },
  { name: 'Social', value: BREAKDOWN.social },
  { name: 'QR', value: BREAKDOWN.qr },
  { name: 'Merch', value: BREAKDOWN.merch },
]

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
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ACTIVITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" tick={{ fill: '#7a75a0', fontSize: 12 }} />
                <YAxis tick={{ fill: '#7a75a0', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="count" stroke="#22D1EE" strokeWidth={2} dot={{ fill: '#22D1EE', r: 3 }} name={dict.transactions} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title={dict.activityBreakdown}>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                    {DONUT_DATA.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-4 mb-2">
                <div className="font-display text-2xl">{TOTAL_CLAIMS.toLocaleString()}</div>
                <div className="text-xs text-[#7a75a0]">{dict.totalActions}</div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-[#b8b4d4]">
                {[dict.found, dict.hidden, dict.social, dict.qr, dict.merch].map((label, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm inline-block" style={{ background: DONUT_COLORS[i] }} />
                    {label} ({DONUT_DATA[i].value})
                  </span>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Token Distribution */}
        <ChartCard title={dict.tokenDistribution} subtitle={dict.top10Holders} className="mb-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={TOP10} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: '#7a75a0', fontSize: 12 }} />
              <YAxis dataKey="label" type="category" tick={{ fill: '#b8b4d4', fontSize: 11 }} width={120} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="balance" name={dict.buffiLabel} fill="url(#pinkPurple)" radius={[0, 6, 6, 0]} />
              <defs>
                <linearGradient id="pinkPurple" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,87,177,0.8)" />
                  <stop offset="100%" stopColor="rgba(98,69,235,0.9)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hourly Activity */}
        <ChartCard title={dict.hourlyActivity} subtitle={dict.hourlyDescription} className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={HOURLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: '#7a75a0', fontSize: 10 }} angle={-45} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#7a75a0', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" name={dict.transactions} fill="url(#purpleCyan)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="purpleCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(98,69,235,0.8)" />
                  <stop offset="100%" stopColor="rgba(34,209,238,0.4)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Minting Timeline */}
        <ChartCard title={dict.mintingTimeline} className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={MINTING}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: '#7a75a0', fontSize: 12 }} />
              <YAxis tick={{ fill: '#7a75a0', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="amount" name={dict.buffiMintedLabel} fill="#FFE739" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
const tooltipStyle = {
  backgroundColor: 'rgba(21,14,65,0.95)',
  border: '1px solid rgba(255,87,177,0.3)',
  borderRadius: '8px',
  color: '#fff',
}

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
