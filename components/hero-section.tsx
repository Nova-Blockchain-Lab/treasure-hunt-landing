"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]" id="hero">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 40%, rgba(240,96,93,0.08), transparent 55%), radial-gradient(ellipse at 50% 60%, rgba(88,166,255,0.05), transparent 55%), #06080F",
            "radial-gradient(ellipse at 45% 35%, rgba(240,96,93,0.1), transparent 55%), radial-gradient(ellipse at 55% 65%, rgba(88,166,255,0.06), transparent 55%), #06080F",
            "radial-gradient(ellipse at 55% 45%, rgba(240,96,93,0.08), transparent 55%), radial-gradient(ellipse at 45% 55%, rgba(88,166,255,0.05), transparent 55%), #06080F",
            "radial-gradient(ellipse at 50% 40%, rgba(240,96,93,0.08), transparent 55%), radial-gradient(ellipse at 50% 60%, rgba(88,166,255,0.05), transparent 55%), #06080F",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #E6EDF3 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-2 max-w-[820px] mx-auto px-5 md:px-6 py-10 md:py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src="/treasure-hunt-logo.png"
            alt="Treasure Hunt"
            width={520}
            height={200}
            className="block max-w-[220px] sm:max-w-[340px] md:max-w-[520px] mx-auto mb-12 h-auto"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </motion.div>

        <motion.h1
          className="font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.92] mb-7 text-balance"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Turn Your Event
          <br />
          <span className="bg-gradient-to-r from-[#F0605D] to-[#FF9A76] bg-clip-text text-transparent">
            Into an Adventure Attendees Actually Talk About
          </span>
        </motion.h1>

        <motion.p
          className="text-[clamp(1rem,2vw,1.25rem)] font-normal text-[#E6EDF3] mb-10 max-w-[640px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <strong className="font-semibold">Real rewards. Real engagement. Real results</strong> {"\u2014"} a gamified
          experience built directly into your physical venue.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="mailto:nova.blockchain.lab@novaims.unl.pt"
            className="inline-flex items-center justify-center gap-2.5 bg-[#F0605D] text-white font-display text-lg tracking-widest uppercase px-8 sm:px-10 py-4 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(240,96,93,0.4)] active:scale-[0.97] text-center"
          >
            Book a Demo
          </a>
          <a
            href="https://hunt.ethdenver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-transparent text-[#58A6FF] font-display text-lg tracking-widest uppercase px-8 sm:px-10 py-3.5 border-2 border-[rgba(88,166,255,0.3)] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[rgba(88,166,255,0.08)] hover:border-[#58A6FF] hover:shadow-[var(--glow-secondary)] hover:-translate-y-0.5 active:scale-[0.97] text-center whitespace-nowrap text-base sm:text-lg"
          >
            {"See It Live at ETHDenver \u2192"}
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #06080F)" }}
      />
    </section>
  )
}
