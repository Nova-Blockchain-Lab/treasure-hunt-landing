// The eight events with a public report, in date order, for the home Results
// section. Every number traces to that event's report (data/*-report.ts or
// data/*/report-snapshot.json); the six hunts on this site sum to the 14,885 /
// 401 / 1,027 / 1,794,280 totals in CLAUDE.md. NEI counts per phone, not per
// player (families shared one), so its four figures are different measures,
// labelled as such. LGW (lgw.treasurehunt.pt/report/en, PT at /report) has no token figure, so its
// fourth stat is prizes collected; players = accounts that earned points.
export interface HomeEvent {
  key: "ethdenver" | "futureMaker" | "springBootcamp" | "smartCities" | "cadaval" | "dataSummit" | "nei" | "lgw"
  /** Report slug on this site, or an absolute URL for a report hosted elsewhere. */
  report: string
  /** Has a real /pt translation (only the two dictionary-driven reports). */
  bilingual?: boolean
  /** Portuguese version of an absolute `report` that lives at its own URL (LGW). */
  ptReport?: string
  /** finds, checkpoints, players, tokens minted. NEI: stand visits, stands, phones, giveaways.
   *  With `prizes`: finds, checkpoints, players, prizes collected. */
  stats: [number, number, number, number]
  /** Reward token symbol. Absent for NEI, which had giveaways instead. */
  token?: string
  /** Fourth stat is prizes collected (no token figure in the report). */
  prizes?: boolean
}

export const homeEvents: HomeEvent[] = [
  { key: "ethdenver", report: "ethdenver-report", bilingual: true, stats: [992, 59, 207, 462255], token: "BUFFI" },
  { key: "futureMaker", report: "futuremaker-report", bilingual: true, stats: [2591, 115, 265, 1024700], token: "FM" },
  { key: "springBootcamp", report: "springbootcamp-report", stats: [220, 42, 20, 45650], token: "SB" },
  { key: "smartCities", report: "smartcities-report", stats: [8123, 103, 351, 159000], token: "FIL" },
  { key: "cadaval", report: "cadaval-report", stats: [2182, 57, 126, 76775], token: "FCT" },
  { key: "dataSummit", report: "datasummit-report", stats: [777, 25, 58, 25900], token: "DATA" },
  { key: "nei", report: "https://nei.treasurehunt.pt/report", stats: [3746, 49, 240, 659] },
  { key: "lgw", report: "https://lgw.treasurehunt.pt/report/en", ptReport: "https://lgw.treasurehunt.pt/report", stats: [52543, 107, 2221, 1390], prizes: true },
]
