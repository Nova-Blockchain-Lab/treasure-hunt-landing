interface CTADict {
  heading: string
  bookDemo: string
  meta: string
  bringHeading: string
  bring: { label: string; note: string }[]
}

const RULE = "border-[rgba(230,237,243,0.1)]"

export function CTASection({ dict, onOpenContact }: { dict: CTADict; onOpenContact?: () => void }) {
  return (
    <section id="cta" className="bg-[#0A0E14]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-16 gap-y-10 px-5 py-20">
        <div className="sd-rise flex min-w-0 flex-[3_1_420px] flex-col gap-[18px]">
          <h2 className="m-0 font-display text-[clamp(3rem,6.4vw,5.5rem)] font-normal leading-[0.94] text-balance">
            {dict.heading}
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded bg-[#C9433F] px-6 font-semibold text-white transition hover:-translate-y-px hover:bg-[#B03935]"
            >
              {dict.bookDemo}
            </button>
            <span className="font-mono text-[13px] text-[#8B949E]">{dict.meta}</span>
          </div>
        </div>
        <div className="sd-rise min-w-0 flex-[2_1_280px]">
          <p className="m-0 mb-2 font-mono text-xs uppercase tracking-[0.08em] text-[#8B949E]">{dict.bringHeading}</p>
          <dl className={`m-0 border-b ${RULE}`}>
            {dict.bring.map((b) => (
              <div key={b.label} className={`flex justify-between gap-4 border-t ${RULE} py-3.5`}>
                <dt className="font-semibold">{b.label}</dt>
                <dd className="m-0 text-right text-[#8B949E]">{b.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
