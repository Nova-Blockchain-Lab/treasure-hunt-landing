import { readSnapshot } from "@/lib/smartcities-report"
import { HeroBlock } from "./_components/hero-block"
import { SectionEngagement } from "./_components/section-engagement"
import { SectionExhibitors } from "./_components/section-exhibitors"
import { SectionKPIs } from "./_components/section-kpis"
import { SectionMerch } from "./_components/section-merch"
import { SectionVenue } from "./_components/section-venue"
import { SiteFooter } from "./_components/site-footer"
import { SiteHeader } from "./_components/site-header"
import { PageJsonLd } from '@/components/page-jsonld'

// Static-rendered. Snapshot file is checked into the repo and only
// changes when the operator runs a regen script.
export const dynamic = "force-static"
export const revalidate = 86400

export default async function ReportPage() {
  const snapshot = await readSnapshot()
  return (
    <>
      <PageJsonLd name="Portugal Smart Cities Summit 2026 Report" path="/smartcities-report" description="351 players, 8,123 treasure finds and 103 NFC checkpoints across FIL Pavilion 3 at the Portugal Smart Cities Summit 2026." />
      <SiteHeader />
      <main>
        <HeroBlock snapshot={snapshot} />
        <SectionKPIs snapshot={snapshot} />
        <SectionVenue snapshot={snapshot} />
        <SectionExhibitors snapshot={snapshot} />
        <SectionMerch snapshot={snapshot} />
        <SectionEngagement snapshot={snapshot} />
      </main>
      <SiteFooter snapshot={snapshot} />
    </>
  )
}
