"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/lib/LanguageContext"
import { faqs } from "@/lib/faqData"

const copy = {
  da: {
    eyebrow: "FAQ",
    title: "Ofte stillede spørgsmål",
    subtitle:
      "Det, folk oftest spørger om, inden de kommer i gang med AI-agenter. Mangler du svar? Så skriv til os.",
    cta: "Kontakt os",
    ctaText: "Har du et spørgsmål, der ikke er besvaret her?",
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    subtitle:
      "The things people most often ask before getting started with AI agents. Missing an answer? Just reach out.",
    cta: "Contact us",
    ctaText: "Have a question that isn't answered here?",
  },
}

export default function FaqClient() {
  const { language } = useLanguage()
  const c = copy[language]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#0015ff] uppercase tracking-widest mb-3">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
            {c.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((item, i) => {
            const { q, a } = item[language]
            const isOpen = open === i
            return (
              <div key={i} className="border border-border rounded-2xl bg-background overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-foreground">{q}</span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-[#0015ff] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-muted-foreground mb-4">{c.ctaText}</p>
          <Link
            href="/kontakt"
            className="inline-block bg-[#0015ff] text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
