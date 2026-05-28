"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useLanguage } from "@/lib/LanguageContext"

export default function Custom() {
  const { t } = useLanguage()
  const c = t.custom
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 })
  const [mounted, setMounted] = useState(false)

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
    <section className="py-24 md:py-32 px-6 text-white overflow-hidden relative">
      {/* Aurora background */}
      <div className="absolute inset-0 w-full h-full">
        {mounted && (
          <MeshGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={["#0a1628", "#1a3a5e", "#162d52", "#0f2040", "#1e3868", "#0d1838"]}
            distortion={0.6}
            swirl={0.8}
            speed={0.3}
            grainMixer={0}
            grainOverlay={0}
          />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-widest mb-4 text-white/60">
            {c.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-6">
            {c.heading}
          </h2>
          <p className="text-white/75 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            {c.subtext}
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {c.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mb-4 text-sm font-bold">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="bg-white text-[#0f2040] font-semibold px-8 py-3.5 rounded-full shadow-xl text-base md:text-lg"
            whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
          >
            {c.cta} →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
