interface FAQDict {
  heading: string
  items: { question: string; answer: string }[]
}

const RULE = "border-[rgba(230,237,243,0.1)]"

// Native <details>: keyboard, focus and open state come from the platform, and
// the answers stay in the HTML for crawlers whether open or not.
export function FAQSection({ dict }: { dict: FAQDict }) {
  return (
    <section id="faq" className="bg-[#06080F]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-12 gap-y-6 px-5 py-16 sm:py-20">
        <h2 className="sd-rise m-0 flex-[1_1_260px] font-display text-[clamp(2.4rem,4.6vw,3.75rem)] font-normal leading-none">
          {dict.heading}
        </h2>
        <div className={`sd-rise min-w-0 flex-[2_1_480px] border-b ${RULE}`}>
          {dict.items.map((item, i) => (
            <details key={item.question} open={i === 0} className={`group border-t ${RULE}`}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium hover:text-[#F0605D] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden className="font-mono text-[22px] text-[#F0605D] group-open:hidden">+</span>
                <span aria-hidden className="hidden font-mono text-[22px] text-[#F0605D] group-open:inline">−</span>
              </summary>
              <p className="m-0 mb-[18px] max-w-[640px] text-[#8B949E]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
