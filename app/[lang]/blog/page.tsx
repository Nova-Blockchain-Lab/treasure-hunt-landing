import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'
import { PageJsonLd } from '@/components/page-jsonld'

export const metadata: Metadata = {
  title: 'Event Gamification Blog | Treasure Hunt',
  description: 'Insights on event gamification, conference engagement, and interactive event technology from the Treasure Hunt team.',
  alternates: {
    canonical: 'https://www.treasurehunt.pt/blog',
    languages: {
      en: 'https://www.treasurehunt.pt/blog',
      'x-default': 'https://www.treasurehunt.pt/blog',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Event Gamification Blog | Treasure Hunt',
    description: 'Insights on event gamification, conference engagement, and interactive event technology.',
    url: 'https://www.treasurehunt.pt/blog',
    images: ['https://www.treasurehunt.pt/opengraph-image'],
  },
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  await params

  return (
    <div className="min-h-screen bg-[#06080F] text-white">
      <PageJsonLd
        type="Blog"
        name="Event Gamification Blog"
        path="/blog"
        description="Case studies and practical guides on running QR and NFC scavenger hunts at conferences, trade shows and campuses, using measured data from real deployments."
      />
      <div className="max-w-[800px] mx-auto px-5 py-16">
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-4">Event Gamification Blog</h1>
        <p className="text-[#8B949E] text-lg mb-8">
          Insights on event gamification, conference engagement, and interactive event technology.
        </p>

        {/* Substantive intro. This hub was 250 words of card links and Google
            returned "Crawled, currently not indexed" for it. A listing page
            needs its own reason to exist, not just outbound links. */}
        <div className="flex flex-col gap-4 text-[#8B949E] leading-relaxed mb-12 border-b border-[rgba(240,246,252,0.06)] pb-12">
          <p>
            We build and run Treasure Hunt, a QR and NFC scavenger hunt that organisers drop into a
            venue to move attendees around it. Everything here comes out of running that game at
            real events, so the posts split into two kinds: case studies with the actual numbers from
            one deployment, and practical guides on how to set a hunt up.
          </p>
          <p>
            The case studies use the same data as our public event reports. When a post says 8,123
            checkpoint scans at the Portugal Smart Cities Summit or 992 treasures found at ETHDenver,
            that figure is on-chain and the matching report page shows the breakdown behind it. We
            don&apos;t publish benchmark numbers we haven&apos;t measured ourselves, which is also
            why you won&apos;t find industry-average engagement statistics here.
          </p>
          <p>The questions these posts keep coming back to:</p>
          <ul className="flex flex-col gap-2 pl-5 list-disc">
            <li>Where do you place checkpoints so people actually walk to the sponsors who paid for traffic?</li>
            <li>How many checkpoints does a venue need before the map feels worth exploring?</li>
            <li>What changes when the event is one day instead of four?</li>
            <li>Do teams behave differently from individual players?</li>
            <li>What does a leaderboard do to attendee behaviour, and when does it stop working?</li>
          </ul>
          <p>
            If you want the raw data rather than the write-ups, the{' '}
            <Link href="/smartcities-report" className="text-[#F0605D] hover:underline">
              event reports
            </Link>{' '}
            are public: player counts, checkpoint popularity, hourly activity and merch redemptions
            for each deployment.
          </p>
        </div>

        <h2 className="font-display text-2xl mb-8 text-[#E6EDF3]">All posts</h2>

        <div className="flex flex-col gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-[rgba(240,246,252,0.06)] bg-[#0D1117] p-6 md:p-8 transition-all duration-300 hover:border-[rgba(240,96,93,0.2)] hover:bg-[#131921]"
            >
              <time className="text-xs font-mono text-[#7D8590] tracking-wide">{post.date}</time>
              <h3 className="font-display text-xl md:text-2xl mt-2 mb-3 text-[#E6EDF3]">
                {post.title}
              </h3>
              <p className="text-[#8B949E] text-sm leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
