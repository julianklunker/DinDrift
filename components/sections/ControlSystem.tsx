"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { MeshGradient } from "@paper-design/shaders-react"
import { useLanguage } from "@/lib/LanguageContext"

/**
 * Flagship "Tailored AI Control System" offer. Sits directly under the hero
 * video as a single oversized, centered card — visibly larger and more
 * prominent than the individual agent cards in the Solutions grid below.
 */
export default function ControlSystem() {
  const { t } = useLanguage()
  const cs = t.controlSystem

  // Client-only mesh-gradient (aurora) inside the card. Runs 50% faster than
  // the "limit is your imagination" section (speed 0.3 → 0.45).
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 })
  const [mounted, setMounted] = useState(false)
  // The WebGL shader only mounts once the card approaches the viewport —
  // compiling it during initial load blocks the main thread for no visible gain.
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: "300px" })

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="control-system"
      className="px-6 py-10 md:py-14 flex justify-center bg-background"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl
                   bg-gradient-to-br from-[#0a1230] via-[#0a1a4d] to-[#0015ff]
                   text-white text-center px-7 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20
                   shadow-2xl ring-1 ring-white/10"
      >
        {/* Aurora mesh-gradient — box's own blue palette, 50% faster than Custom */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {mounted && inView && (
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={["#0a1230", "#0a1a4d", "#0015ff", "#0d1838", "#1a3a5e", "#162d52"]}
              distortion={0.6}
              swirl={0.8}
              speed={0.45}
              grainMixer={0}
              grainOverlay={0}
            />
          )}
          {/* Light overlay keeps text legible over the moving gradient */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/ai-control-system" className="w-full sm:w-auto">
              <motion.span
                className="block bg-white text-[#0a1230] font-semibold px-8 py-3.5 rounded-full shadow-xl text-base md:text-lg min-h-[44px] text-center"
                whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
              >
                {cs.seeDetails} →
              </motion.span>
            </Link>

            <motion.button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded-full ring-1 ring-white/25 backdrop-blur-sm text-base md:text-lg min-h-[44px]"
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
            >
              {cs.cta} →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
