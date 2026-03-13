"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"

interface FAQDict {
  eyebrow: string
  heading: string
  headingHighlight: string
  items: { question: string; answer: string }[]
}

function FAQItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[rgba(240,246,252,0.06)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
      >
        <span className="font-display text-lg sm:text-xl text-[#E6EDF3] tracking-wide">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#484F58] shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-[#F0605D]" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[0.925rem] text-[#8B949E] leading-relaxed pb-5 max-w-[680px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection({ dict }: { dict: FAQDict }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-32 relative bg-[#0A0E14]" id="faq">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-12 md:mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              {dict.eyebrow}
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              {dict.heading}
              <br />
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                {dict.headingHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="max-w-[800px]">
            {dict.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
