"use client"

import { useState } from "react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { SpotlightCard } from "./spotlight-card"

const faqs = [
  {
    question: "Do attendees need to download an app to play Treasure Hunt?",
    answer:
      "No. Treasure Hunt is a fully web-based platform. Attendees simply scan a QR code or tap an NFC tag with their phone to start playing — no app download required.",
  },
  {
    question: "How does Treasure Hunt work at events?",
    answer:
      "Organizers place QR code or NFC checkpoints around the venue at sponsor booths, stages, and key areas. Attendees scan checkpoints to earn points, climb a live leaderboard, and redeem rewards at a built-in merch store.",
  },
  {
    question: "What types of events can use Treasure Hunt?",
    answer:
      "Treasure Hunt works for conferences, hackathons, trade shows, festivals, corporate events, and campus orientations — any event where you want to drive foot traffic and increase engagement.",
  },
  {
    question: "Has Treasure Hunt been deployed at real events?",
    answer:
      "Yes. Treasure Hunt was deployed at ETHDenver 2026, one of the largest blockchain conferences in the world, where it successfully drove attendee engagement and sponsor foot traffic.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 relative bg-[#06080F]" id="faq">
      <div className="max-w-[800px] mx-auto px-5 md:px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#58A6FF] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#58A6FF]" />
              05 / FAQ
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] mb-6 text-balance">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <RevealOnScroll key={i} delay={80 * (i + 1)}>
                <SpotlightCard className="p-0" color="rgba(88, 166, 255, 0.04)">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base md:text-lg text-[#E6EDF3] tracking-wide">
                      {faq.question}
                    </span>
                    <span
                      className={`text-[#58A6FF] text-xl shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-[0.925rem] text-[#8B949E] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
