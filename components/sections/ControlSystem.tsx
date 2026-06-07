"use client"

import { motion } from "motion/react"
import { useLanguage } from "@/lib/LanguageContext"

/**
 * Flagship "Tailored AI Control System" offer. Sits directly under the hero
 * video as a single oversized, centered card — visibly larger and more
 * prominent than the individual agent cards in the Solutions grid below.
 */
export default function ControlSystem() {
  const { t } = useLanguage()
  const cs = t.controlSystem

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="control-system"
      className="px-6 py-20 md:py-28 flex justify-center bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl
                   bg-gradient-to-br from-[#0a1230] via-[#0a1a4d] to-[#0015ff]
                   text-white text-center px-7 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20
                   shadow-2xl ring-1 ring-white/10"
      >
        {/* Soft radial glow accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-200/90 mb-4">
            {cs.eyebrow}
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-5 max-w-3xl">
            {cs.title}
          </h2>

          <p className="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {cs.description}
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mb-12 text-left">
            {cs.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm p-4 sm:p-5"
              >
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg leading-snug">{f.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mt-1">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={scrollToContact}
            className="bg-white text-[#0a1230] font-semibold px-8 py-3.5 rounded-full shadow-xl text-base md:text-lg min-h-[44px]"
            whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
          >
            {cs.cta} →
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
