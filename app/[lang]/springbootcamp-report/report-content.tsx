'use client'

import Link from 'next/link'
import { ArrowLeft, ExternalLink, Trophy } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  ACTIVITY, MINTING, BREAKDOWN, TOTAL_CLAIMS, TOP10, HOURLY,
  TREASURE_POPULARITY, FUN_FACTS, HERO_STATS,
  TEAM_LEADERBOARD, TEAM_RACE,
  TOKEN_NAME, TOKEN_SYMBOL, CONTRACT_ADDRESS, EXPLORER_URL, EVENT_DATE,
} from '@/data/springbootcamp-report'

const DONUT_COLORS = ['#F0605D', '#FF9A76']
const DONUT_DATA = [
  { name: 'Found', value: BREAKDOWN.found },
  { name: 'Social', value: BREAKDOWN.social },
]

const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'rgba(19,25,33,0.95)',
  border: '1px solid rgba(88,166,255,0.25)',
  borderRadius: '10px',
  color: '#E6EDF3',
  fontSize: '13px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
}

export function ReportContent() {
  const eventLabel = new Date(EVENT_DATE + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#06080F] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(240,96,93,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-[30%] right-[-150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(88,166,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-100px] left-[30%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,154,118,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Back nav */}
      <div className="relative max-w-[900px] mx-auto px-5 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-200 py-2 pr-3 -ml-2 pl-2 rounded-lg hover:bg-white/[0.03] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="relative max-w-[900px] mx-auto px-5 py-10">
        {/* Hero */}
        <section className="text-center mb-14">
          <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.1] tracking-wide bg-gradient-to-r from-[#F0605D] via-[#FF9A76] to-[#58A6FF] bg-clip-text text-transparent mb-3 drop-shadow-[0_0_40px_rgba(240,96,93,0.15)]">
            SPRING BOOTCAMP RECAP
          </h1>
          <p className="text-[#8B949E] text-lg tracking-wide">{eventLabel} · NOVA IMS, Lisbon</p>
          <p className="text-[#484F58] text-sm mt-2">Teams Treasure Hunt · {TOKEN_NAME} ({TOKEN_SYMBOL})</p>
        </section>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-14">
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-5 md:p-6 text-center overflow-hidden relative group"
            >
              <div
                className="absolute top-0 left-0 w-full h-[2px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
              <div
                className="font-display text-[1.75rem] md:text-[2.25rem] text-white leading-none"
                style={{ textShadow: `0 0 20px ${stat.color}33` }}
              >
                {stat.value.toLocaleString()}
              </div>
              <div className="text-[0.7rem] md:text-xs text-[#8B949E] mt-2 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Leaderboard */}
        <ChartCard title="Team Standings" subtitle={`Final rankings by total ${TOKEN_SYMBOL} earned`} className="mb-8">
          {/* Winner highlight */}
          {TEAM_LEADERBOARD[0] && (
            <div className="flex items-center justify-center gap-3 mb-6 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <Trophy className="w-6 h-6 text-[#facc15]" />
              <div>
                <span className="font-bold text-lg" style={{ color: TEAM_LEADERBOARD[0].color }}>
                  {TEAM_LEADERBOARD[0].name}
                </span>
                <span className="text-[#8B949E] text-sm ml-2">
                  wins with {TEAM_LEADERBOARD[0].mvp.toLocaleString()} {TOKEN_SYMBOL}
                </span>
              </div>
              <Trophy className="w-6 h-6 text-[#facc15]" />
            </div>
          )}

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={TEAM_LEADERBOARD} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#E6EDF3', fontSize: 11 }} width={110} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: 'rgba(88,166,255,0.06)' }}
                formatter={(value, name) => [`${Number(value).toLocaleString()} ${TOKEN_SYMBOL}`, name === 'mvp' ? 'Tokens Earned' : String(name)]}
              />
              <Bar dataKey="mvp" name="Tokens Earned" radius={[0, 6, 6, 0]} barSize={24}>
                {TEAM_LEADERBOARD.map((t, i) => (
                  <Cell key={i} fill={t.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Team details table */}
          <div className="mt-4 rounded-lg border border-white/[0.06] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[0.65rem] md:text-xs text-[#8B949E] uppercase tracking-wider bg-[rgba(10,14,20,0.6)]">
                  <th className="p-3 text-left w-10">#</th>
                  <th className="p-3 text-left">Team</th>
                  <th className="p-3 text-center">Members</th>
                  <th className="p-3 text-center">Tags Found</th>
                  <th className="p-3 text-right">{TOKEN_SYMBOL} Earned</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_LEADERBOARD.map((t) => (
                  <tr key={t.rank} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="p-3 font-bold text-[#484F58] tabular-nums">{t.rank}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: t.color }} />
                        <span className="font-medium text-[#E6EDF3]">{t.name}</span>
                      </span>
                    </td>
                    <td className="p-3 text-center text-[#8B949E] tabular-nums">{t.members}</td>
                    <td className="p-3 text-center font-bold text-[#56D364] tabular-nums">{t.found}</td>
                    <td className="p-3 text-right font-bold text-[#FF9A76] tabular-nums">{t.mvp.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Team Race — Find Progress */}
        <ChartCard title="Team Race" subtitle="Percentage of eligible tags found by each team" className="mb-8">
          <div className="space-y-3">
            {TEAM_RACE.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <div className="w-28 text-xs text-[#E6EDF3] truncate font-medium">{t.name}</div>
                <div className="flex-1 h-6 bg-white/[0.04] rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{
                      width: `${Math.max(t.progress, 4)}%`,
                      background: `linear-gradient(90deg, ${t.color}66, ${t.color})`,
                    }}
                  >
                    {t.progress >= 20 && (
                      <span className="text-[0.65rem] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {t.progress}%
                      </span>
                    )}
                  </div>
                  {t.progress < 20 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.65rem] text-[#8B949E]">
                      {t.progress}%
                    </span>
                  )}
                </div>
                <div className="w-16 text-right text-xs text-[#8B949E] tabular-nums">{t.found}/{t.eligible}</div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Charts row: Activity Breakdown + Minting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <ChartCard title="Activity Breakdown">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="rgba(6,8,15,0.5)"
                    strokeWidth={2}
                  >
                    {DONUT_DATA.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-4 mb-3">
                <div className="font-display text-2xl" style={{ textShadow: '0 0 15px rgba(88,166,255,0.2)' }}>
                  {TOTAL_CLAIMS.toLocaleString()}
                </div>
                <div className="text-[0.7rem] text-[#8B949E] uppercase tracking-wider">Total Actions</div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-[#E6EDF3]">
                {['Found', 'Social'].map((label, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-[3px] inline-block" style={{ background: DONUT_COLORS[i] }} />
                    {label} <span className="text-[#8B949E]">({DONUT_DATA[i].value})</span>
                  </span>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Minting Timeline" subtitle={`${TOKEN_SYMBOL} tokens minted per day`}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={MINTING}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(86,211,100,0.06)' }} />
                <Bar dataKey="amount" name={`${TOKEN_SYMBOL} Minted`} fill="url(#greenGlow)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#56D364" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#56D364" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Token Distribution — Top 10 */}
        <ChartCard title="Token Distribution" subtitle={`Top 10 hunters by total ${TOKEN_SYMBOL} earned`} className="mb-8">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={TOP10} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="label" type="category" tick={{ fill: '#E6EDF3', fontSize: 11 }} width={115} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(88,166,255,0.06)' }} />
              <Bar dataKey="balance" name={`${TOKEN_SYMBOL} Earned`} fill="url(#pinkOrange)" radius={[0, 6, 6, 0]} barSize={24} />
              <defs>
                <linearGradient id="pinkOrange" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F0605D" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#FF9A76" stopOpacity={0.95} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hourly Activity */}
        <ChartCard title="Hourly Activity" subtitle="Transaction distribution by hour (UTC)" className="mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={HOURLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#8B949E', fontSize: 9 }} angle={-45} textAnchor="end" height={50} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
              <YAxis tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,154,118,0.06)' }} />
              <Bar dataKey="count" name="Transactions" fill="url(#orangeCyan)" radius={[3, 3, 0, 0]} />
              <defs>
                <linearGradient id="orangeCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9A76" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#58A6FF" stopOpacity={0.35} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Treasure Popularity Table */}
        <TableCard title="Treasure Popularity" subtitle={`All ${TREASURE_POPULARITY.length} treasures ranked by find count`} className="mb-8">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="text-[0.65rem] md:text-xs text-[#8B949E] uppercase tracking-wider bg-[rgba(10,14,20,0.95)] backdrop-blur-sm">
                <th className="p-3 text-left w-9">#</th>
                <th className="p-3 text-left">Treasure</th>
                <th className="p-3 text-center">Finds</th>
                <th className="p-3 text-right">Hidden By</th>
              </tr>
            </thead>
            <tbody>
              {TREASURE_POPULARITY.map((t) => (
                <tr key={t.rank} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="p-3 font-bold text-[#484F58] tabular-nums">{t.rank}</td>
                  <td className="p-3 text-[#E6EDF3]">{t.name}</td>
                  <td className="p-3 text-center font-bold text-[#56D364] tabular-nums">{t.finds}</td>
                  <td className="p-3 text-right text-xs text-[#FF9A76]">{t.hiddenBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        {/* Top Hunters */}
        <ChartCard title="Top Hunters" className="mb-8">
          {/* Podium */}
          <div className="flex items-end justify-center gap-2 sm:gap-4 mb-8 px-2">
            {TOP10.length >= 2 && (
              <PodiumPlace
                rank={2}
                label={TOP10[1].label}
                balance={TOP10[1].balance}
                height="h-20"
                badgeSize="w-10 h-10"
                colWidth="w-[5.5rem] sm:w-28"
                badgeBg="rgba(192,192,192,0.15)"
                badgeBorder="#9ca3af"
                badgeText="#d1d5db"
                barGradient="linear-gradient(180deg, rgba(156,163,175,0.25) 0%, rgba(156,163,175,0.05) 100%)"
                rankLabel="2nd"
                rankColor="white"
              />
            )}
            {TOP10.length >= 1 && (
              <PodiumPlace
                rank={1}
                label={TOP10[0].label}
                balance={TOP10[0].balance}
                height="h-28"
                badgeSize="w-12 h-12"
                colWidth="w-[6.5rem] sm:w-32"
                badgeBg="rgba(255,215,0,0.15)"
                badgeBorder="#facc15"
                badgeText="#facc15"
                barGradient="linear-gradient(180deg, rgba(250,204,21,0.25) 0%, rgba(250,204,21,0.05) 100%)"
                rankLabel="1st"
                rankColor="#facc15"
                glow
              />
            )}
            {TOP10.length >= 3 && (
              <PodiumPlace
                rank={3}
                label={TOP10[2].label}
                balance={TOP10[2].balance}
                height="h-16"
                badgeSize="w-10 h-10"
                colWidth="w-[5.5rem] sm:w-28"
                badgeBg="rgba(205,127,50,0.15)"
                badgeBorder="#fb923c"
                badgeText="#fb923c"
                barGradient="linear-gradient(180deg, rgba(251,146,60,0.25) 0%, rgba(251,146,60,0.05) 100%)"
                rankLabel="3rd"
                rankColor="#fb923c"
              />
            )}
          </div>

          {/* Leaderboard table (4-10) */}
          {TOP10.length > 3 && (
            <div className="rounded-lg border border-white/[0.06] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[0.65rem] md:text-xs text-[#8B949E] uppercase tracking-wider bg-[rgba(10,14,20,0.6)]">
                    <th className="p-3 text-left w-12">#</th>
                    <th className="p-3 text-left">Hunter</th>
                    <th className="p-3 text-right w-28">{TOKEN_SYMBOL} Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP10.slice(3).map((h, i) => (
                    <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="p-3 font-bold text-[#484F58] tabular-nums">{i + 4}</td>
                      <td className="p-3 font-mono text-[#E6EDF3] text-[13px]">{h.label}</td>
                      <td className="p-3 text-right font-bold text-[#56D364] tabular-nums">{h.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ChartCard>

        {/* Fun Facts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-bold mb-5">Fun Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FUN_FACTS.map((fact, i) => (
              <div key={i} className="glass-card p-4 overflow-hidden relative group">
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${fact.color}, transparent)` }}
                />
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: fact.color, boxShadow: `0 0 6px ${fact.color}66` }} />
                  <span className="text-[0.65rem] text-[#8B949E] uppercase tracking-wider leading-tight">{fact.label}</span>
                </div>
                <div className="text-sm font-bold text-white truncate">{fact.value}</div>
                {fact.sub && <div className="text-[0.7rem] text-[#484F58] mt-1">{fact.sub}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-white/[0.04]">
          <a
            href={`${EXPLORER_URL}/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(88,166,255,0.25)] text-[#58A6FF] text-sm hover:border-[#58A6FF] hover:shadow-[0_0_20px_rgba(88,166,255,0.15)] transition-all duration-200 mb-5 cursor-pointer"
          >
            View Contract on Explorer
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-xs text-[#484F58]">Built on Nova Cidade Chain · NOVA Blockchain Lab</p>
        </footer>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: `${TOKEN_NAME} Teams Treasure Hunt Report — April 2026`,
              description: `7 teams, 20 hunters, ${TREASURE_POPULARITY.length} treasures. Full analytics from the ${TOKEN_NAME} Teams Hunt at NOVA IMS.`,
              datePublished: EVENT_DATE,
              author: { '@type': 'Organization', name: 'NOVA Blockchain Lab' },
              publisher: { '@type': 'Organization', name: 'NOVA Blockchain Lab', url: 'https://www.treasurehunt.pt' },
            }),
          }}
        />
      </div>
    </div>
  )
}

function PodiumPlace({ rank, label, balance, height, badgeSize, colWidth, badgeBg, badgeBorder, badgeText, barGradient, rankLabel, rankColor, glow }: {
  rank: number
  label: string
  balance: number
  height: string
  badgeSize: string
  colWidth: string
  badgeBg: string
  badgeBorder: string
  badgeText: string
  barGradient: string
  rankLabel: string
  rankColor: string
  glow?: boolean
}) {
  return (
    <div className={`flex flex-col items-center ${colWidth}`}>
      <div
        className={`${badgeSize} rounded-full flex items-center justify-center mb-2 border-2`}
        style={{ background: badgeBg, borderColor: badgeBorder, boxShadow: glow ? `0 0 16px ${badgeBorder}44` : undefined }}
      >
        <span className={`${rank === 1 ? 'text-sm' : 'text-xs'} font-bold`} style={{ color: badgeText }}>{rank}</span>
      </div>
      <div
        className={`w-full ${height} rounded-t-lg flex items-end justify-center pb-2`}
        style={{ background: barGradient }}
      >
        <span className="font-bold text-sm" style={{ color: rankColor }}>{rankLabel}</span>
      </div>
      <p className="text-[0.7rem] sm:text-xs text-[#8B949E] mt-2 font-mono truncate w-full text-center">{label}</p>
      <p className="text-sm font-bold text-[#56D364] tabular-nums">{balance.toLocaleString()}</p>
    </div>
  )
}

function ChartCard({ title, subtitle, children, className = '' }: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glass-card p-5 md:p-6 ${className}`}>
      <h2 className="font-display text-lg md:text-xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-[0.8rem] text-[#8B949E] mb-5">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
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
    <div className={`glass-card p-5 md:p-6 ${className}`}>
      <h2 className="font-display text-lg md:text-xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-[0.8rem] text-[#8B949E] mb-5">{subtitle}</p>}
      <div className="rounded-lg border border-white/[0.06] overflow-x-auto max-h-[500px] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
