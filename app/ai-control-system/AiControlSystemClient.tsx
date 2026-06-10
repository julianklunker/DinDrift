"use client"

import Link from "next/link"
import { motion } from "motion/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/lib/LanguageContext"

// TODO: replace PLACEHOLDER_VIDEO_ID with the real YouTube video ID
const YOUTUBE_VIDEO_ID = "PLACEHOLDER_VIDEO_ID"

const copy = {
  da: {
    eyebrow: "Vores flagskib",
    videoHeading: "Sådan virker AI-kontrolsystemet",
    videoSubtext:
      "Se mig forklare, hvordan kontrolsystemet fungerer — og hvordan du får dit helt eget.",
    featuresHeading: "Hvad du får",
    cta: "Book en gennemgang",
    back: "Tilbage til forsiden",
  },
  en: {
    eyebrow: "Our flagship",
    videoHeading: "How the AI Control System works",
    videoSubtext:
      "Watch me explain how the control system works — and how you get your very own.",
    featuresHeading: "What you get",
    cta: "Book a walkthrough",
    back: "Back to home",
  },
}

export default function AiControlSystemClient() {
  const { t, language } = useLanguage()
  const cs = t.controlSystem
  const c = copy[language]

  return (
    <main>
      <Navbar />

      {/* Explainer video — first thing on the page, plays in-page */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-300 mb-4">
            {c.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
            {c.videoHeading}
          </h1>
          <p className="text-foreground/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            {c.videoSubtext}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10 bg-black"
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title={c.videoHeading}
            allow="accelerated-encoding; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </section>

      {/* Flagship summary — reuses the homepage control-system copy */}
      <section className="px-6 py-16 md:py-20 flex justify-center bg-background">
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1230] via-[#0a1a4d] to-[#0015ff] text-white text-center px-7 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 shadow-2xl ring-1 ring-white/10">
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-5 max-w-3xl">
              {cs.title}
            </h2>

            <p className="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              {cs.description}
            </p>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-200/90 mb-6">
              {c.featuresHeading}
            </h3>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mb-12 text-left">
              {cs.features.map((f) => (
                <div
                  key={f.title}
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
                    <h4 className="font-semibold text-base sm:text-lg leading-snug">{f.title}</h4>
                    <p className="text-white/65 text-sm leading-relaxed mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/#contact" className="w-full sm:w-auto">
                <motion.span
                  className="block bg-white text-[#0a1230] font-semibold px-8 py-3.5 rounded-full shadow-xl text-base md:text-lg min-h-[44px] text-center"
                  whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
                >
                  {c.cta} →
                </motion.span>
              </Link>

              <Link href="/" className="w-full sm:w-auto">
                <span className="block w-full bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded-full ring-1 ring-white/25 backdrop-blur-sm text-base md:text-lg min-h-[44px] text-center">
                  {c.back}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
