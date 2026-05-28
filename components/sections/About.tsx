"use client"

import { motion } from "motion/react"
import { useLanguage } from "@/lib/LanguageContext"

const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Supabase",
  "AI APIs",
]

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {a.eyebrow}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: text content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              {a.heading}
              <br />
              <span className="text-muted-foreground">{a.subheading}</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {a.p1}
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {a.p2}
            </p>

            {/* Tech stack */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                {a.techLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 bg-muted rounded-full text-foreground/80 border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* LinkedIn button */}
            <a
              href="https://www.linkedin.com/in/julian-zachar-fink-5574672b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start mt-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-border hover:bg-muted transition-colors"
            >
              {a.linkedinBtn} →
            </a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border mt-2">
              {a.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: image + floating card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1470&auto=format&fit=crop"
                alt="Workspace with code on monitor"
                className="w-full h-80 md:h-96 object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating info card */}
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  {a.availableLabel}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">Julian Zachar-Fink</p>
              <p className="text-xs text-muted-foreground">{a.locationLabel}</p>
              <p className="text-xs text-muted-foreground">{a.cvrLabel}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
