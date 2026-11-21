import Image from "next/image"
import { ComicQuestVideo } from "@/components/comic-quest-video"

interface FeaturesDict {
  eyebrow: string
  heading: string
  items: { title: string; description: string }[]
}

interface MediaDict {
  storyCaption: string
  storyPlay: string
  tapAlt: string
  boothAlt: string
}

const RULE = "border-[rgba(230,237,243,0.1)]"

// "What you control": the organizer's four levers, beside the film, two photos
// from real deployments and the ETHDenver organizer's quote.
export function FeaturesSection({
  dict,
  media,
  quote,
}: {
  dict: FeaturesDict
  media: MediaDict
  quote: { quote: string; author: string; role: string }
}) {
  return (
    <section id="organizer" className="bg-[#06080F]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-12 px-5 py-16 sm:py-20">
        <div className="min-w-0 flex-[3_1_440px]">
          <div className="sd-rise mb-6 flex flex-col gap-2.5">
            <p className="m-0 font-mono text-[13px] uppercase tracking-[0.08em] text-[#F0605D]">{dict.eyebrow}</p>
            <h2 className="m-0 font-display text-[clamp(2.4rem,4.6vw,3.75rem)] font-normal leading-none">{dict.heading}</h2>
          </div>
          <div className={`border-b ${RULE}`}>
            {dict.items.map((item) => (
              <div key={item.title} className={`sd-rise grid gap-x-5 gap-y-1 border-t ${RULE} py-[18px] sm:grid-cols-[11rem_1fr]`}>
                <h3 className="m-0 text-[17px] font-semibold">{item.title}</h3>
                <p className="m-0 text-[#8B949E]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 flex-[2_1_320px] grid-cols-2 gap-3">
          <div className="sd-rise col-span-2">
            <ComicQuestVideo caption={media.storyCaption} playLabel={media.storyPlay} />
          </div>
          <Image
            src="/media/datasummit-tap.jpg"
            alt={media.tapAlt}
            width={1080}
            height={1040}
            sizes="(min-width: 1024px) 230px, 45vw"
            className="sd-rise aspect-square w-full rounded-md object-cover"
          />
          <Image
            src="/media/booth-demo.jpg"
            alt={media.boothAlt}
            width={3464}
            height={4618}
            sizes="(min-width: 1024px) 230px, 45vw"
            className="sd-rise aspect-square w-full rounded-md object-cover"
          />
          <blockquote className="sd-rise col-span-2 m-0 mt-2">
            <p className="m-0 text-[17px]">{quote.quote}</p>
            <footer className="mt-2 font-mono text-[13px] text-[#8B949E]">
              {quote.author}, {quote.role}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
