"use client"

import { motion } from "motion/react"
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
}

export default function Solutions() {
  const { t } = useLanguage()

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.solutions.cards.map((card, i) => (
            <motion.article
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow"
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

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {card.description}
              </p>

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
          ))}
        </div>
      </div>
    </section>
  )
}
