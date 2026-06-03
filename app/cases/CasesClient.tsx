"use client"

import { motion } from "motion/react"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/lib/LanguageContext"

function fmt(n: number) {
  return n.toLocaleString("da-DK") + " kr"
}

// Illustrative ROI models (same assumptions as the pricing page). These are
// example calculations, NOT claimed results from named clients.
const SECRETARY_NET_GAIN = 13200 // 44h saved x 400 kr - 4.400 kr/md
const REVIEWS_NET_GAIN = 10500 // 20 ekstra kunder x 700 kr - 3.500 kr/md
const EMPLOYEE_SAVINGS = 66000 // 70.000 kr løn - 4.000 kr/md

const copy = {
  da: {
    eyebrow: "Cases & resultater",
    title: "Hvad kan en AI-agent betyde for din virksomhed?",
    subtitle:
      "Herunder er konkrete regneeksempler baseret på typiske danske SMV'er. Tallene er illustrative modeller — dine faktiske resultater afhænger af din virksomhed.",
    disclaimer:
      "Eksemplerne er beregningsmodeller til illustration og er ikke garanterede resultater eller udsagn fra navngivne kunder.",
    perMonth: "/md",
    cta: "Book en gratis snak",
    cards: [
      {
        tag: "Sekretær-agent",
        title: "Spar 44 timer om måneden",
        body:
          "En virksomhed, der sparer to timer om dagen på aftaler, påmindelser og korrespondance, frigør 44 timer om måneden. Til en timepris på 400 kr. svarer det til en nettogevinst på:",
        figure: SECRETARY_NET_GAIN,
        foot: "efter agentens pris",
      },
      {
        tag: "Google Anmeldelser-agent",
        title: "Flere kunder via Side 1 på Google",
        body:
          "Flere positive anmeldelser løfter din placering på Google. Henter du bare 20 ekstra kunder om måneden til en gennemsnitspris på 700 kr., er nettogevinsten:",
        figure: REVIEWS_NET_GAIN,
        foot: "efter agentens pris",
      },
      {
        tag: "AI vs. ansættelse",
        title: "Få arbejdet gjort — uden lønudgiften",
        body:
          "En sekretær og en bogholder koster typisk omkring 70.000 kr. om måneden i løn. En agent, der dækker de samme rutineopgaver, giver en månedlig besparelse på:",
        figure: EMPLOYEE_SAVINGS,
        foot: "i forhold til to ansatte",
      },
    ],
  },
  en: {
    eyebrow: "Cases & results",
    title: "What can an AI agent mean for your business?",
    subtitle:
      "Below are concrete example calculations based on typical Danish SMBs. The numbers are illustrative models — your actual results depend on your business.",
    disclaimer:
      "These examples are illustrative calculation models, not guaranteed results or statements from named clients.",
    perMonth: "/mo",
    cta: "Book a free chat",
    cards: [
      {
        tag: "Secretary agent",
        title: "Save 44 hours a month",
        body:
          "A business saving two hours a day on scheduling, reminders, and correspondence frees up 44 hours a month. At an hourly value of 400 kr, that's a net gain of:",
        figure: SECRETARY_NET_GAIN,
        foot: "after the agent's cost",
      },
      {
        tag: "Google Reviews agent",
        title: "More customers via page 1 of Google",
        body:
          "More positive reviews lift your Google ranking. Win just 20 extra customers a month at an average value of 700 kr, and the net gain is:",
        figure: REVIEWS_NET_GAIN,
        foot: "after the agent's cost",
      },
      {
        tag: "AI vs. hiring",
        title: "Get the work done — without the salary",
        body:
          "A secretary and a bookkeeper typically cost around 70,000 kr a month in salary. An agent covering the same routine tasks gives a monthly saving of:",
        figure: EMPLOYEE_SAVINGS,
        foot: "vs. two employees",
      },
    ],
  },
}

export default function CasesClient() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#0015ff] uppercase tracking-widest mb-3">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
            {c.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {c.cards.map((card, i) => (
            <motion.article
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="self-start text-xs font-semibold uppercase tracking-widest text-[#0015ff] bg-[#0015ff]/10 px-2.5 py-1 rounded-full">
                {card.tag}
              </span>
              <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              <div className="mt-auto pt-2">
                <span className="text-3xl font-bold text-[#0015ff]">{fmt(card.figure)}</span>
                <span className="text-sm text-muted-foreground">{c.perMonth}</span>
                <p className="text-xs text-gray-400 mt-1">{card.foot}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 text-center">
          <p className="text-xs text-gray-400 mb-6">{c.disclaimer}</p>
          <Link
            href="/kontakt"
            className="inline-block bg-[#0015ff] text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
