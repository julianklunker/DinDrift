"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  Administration: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Økonomi: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Finance: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Kundeservice: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Customer Service": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Kommunikation: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Communication: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Opfølgning: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Follow-up": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  SEO: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Vækst": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Growth: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
}

export default function Solutions() {
  const { t } = useLanguage()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const expandHint = t.solutions.expandHint

  return (
    <section id="solutions" className="py-24 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            {t.solutions.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t.solutions.heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            {t.solutions.subtext}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {t.solutions.cards.map((card, i) => {
            const isOpen = openKey === card.key
            const panelId = `solution-panel-${card.key}`
            const toggle = () => setOpenKey((k) => (k === card.key ? null : card.key))

            return (
              <motion.article
                key={card.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={cn(
                  "bg-background border rounded-2xl p-6 flex flex-col gap-4 transition-shadow",
                  isOpen ? "border-primary/60 shadow-lg" : "border-border hover:shadow-lg"
                )}
              >
                {/* Clickable header — toggles the in-depth explanation */}
                <button
                  type="button"
                  onClick={toggle}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="text-left flex flex-col gap-4 cursor-pointer rounded-xl -m-1 p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {/* Category tag */}
                  <span
                    className={cn(
                      "self-start text-xs font-semibold px-2.5 py-1 rounded-full",
                      categoryColors[card.category] ?? "bg-muted text-muted-foreground"
                    )}
                  >
                    {card.category}
                  </span>

                  {/* Title + chevron */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-5 h-5 mt-1 shrink-0 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Expand hint */}
                  <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                    {expandHint}
                  </span>
                </button>

                {/* In-depth explanation (expands on click) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1 space-y-3 border-t border-border/60">
                        {card.deepDescription?.split("\n\n").map((para, p) => (
                          <p
                            key={p}
                            className="text-sm text-foreground/80 leading-relaxed first:pt-3"
                          >
                            {para}
                          </p>
                        ))}

                        {/* Placeholder for the future explainer video (wiring comes later) */}
                        <div className="mt-2 rounded-xl border border-dashed border-border bg-muted/40 aspect-video flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-medium">{t.solutions.videoSoon}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Capabilities */}
                <ul className="space-y-1.5 mt-auto">
                  {card.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-foreground/80">
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
