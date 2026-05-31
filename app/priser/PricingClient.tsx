"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "motion/react"
import emailjs from "@emailjs/browser"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

type FormState = "idle" | "sending" | "success" | "error"

/* ─── helpers ─── */
function fmt(n: number) {
  return n.toLocaleString("da-DK") + " kr"
}

/* ─── ROI numbers ─── */
const HOURLY_RATE = 400
const HOURS_SAVED_PER_DAY = 2
const WORKING_DAYS = 22
const MONTHLY_HOURS_SAVED = HOURS_SAVED_PER_DAY * WORKING_DAYS // 44
const MONTHLY_VALUE_SAVED = MONTHLY_HOURS_SAVED * HOURLY_RATE // 17.600
const SECRETARY_BOT_PRICE = Math.round(MONTHLY_VALUE_SAVED * 0.25) // 4.400
const SECRETARY_NET_GAIN = MONTHLY_VALUE_SAVED - SECRETARY_BOT_PRICE // 13.200

/* ─── Google / reviews numbers ─── */
const EXTRA_PATIENTS_PER_MONTH = 20
const AVG_TREATMENT_PRICE = 700
const EXTRA_MONTHLY_REVENUE = EXTRA_PATIENTS_PER_MONTH * AVG_TREATMENT_PRICE // 14.000
const REVIEWS_BOT_PRICE = Math.round(EXTRA_MONTHLY_REVENUE * 0.25) // 3.500
const REVIEWS_NET_GAIN = EXTRA_MONTHLY_REVENUE - REVIEWS_BOT_PRICE // 10.500

/* ─── Employee vs bot ─── */
const SECRETARY_SALARY = 32000
const BOOKKEEPER_SALARY = 38000
const EMPLOYEE_TOTAL = SECRETARY_SALARY + BOOKKEEPER_SALARY // 70.000
const BOT_PRICE = 4000
const BOT_SAVINGS = EMPLOYEE_TOTAL - BOT_PRICE // 66.000

/* ─── Reusable card ─── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/* ─── Stat pill ─── */
function StatPill({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl px-5 py-4 flex flex-col gap-1 ${accent ? "bg-[#0015ff] text-white" : "bg-gray-50 border border-gray-200"}`}>
      <span className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-blue-200" : "text-gray-400"}`}>{label}</span>
      <span className={`text-2xl font-bold ${accent ? "text-white" : "text-gray-900"}`}>{value}</span>
    </div>
  )
}

export default function PricingClient() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<FormState>("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setFormState("sending")
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      )
      setFormState("success")
      formRef.current.reset()
    } catch {
      setFormState("error")
    }
  }

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0015ff]/40 transition-all"

  function fadeUp(delay = 0) {
    return {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.55, delay },
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── HERO: 0 kr opstart ─────────────────────────────── */}
        <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
          <motion.div {...fadeUp()}>
            <span className="inline-block bg-[#0015ff] text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Ingen bindinger · Ingen overraskelser
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Kom i gang fra{" "}
              <span className="text-[#0015ff]">0 kr</span> i opstart
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
              Du betaler ikke for at komme i gang. DinDrift installerer din første AI-agent uden opstartsomkostning — du betaler kun en fast månedlig pris, og kan opsige når som helst.
            </p>
            <a
              href="#kontakt"
              className="inline-block bg-[#0015ff] text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Beregn din besparelse gratis →
            </a>
          </motion.div>
        </section>

        {/* ── CASE 1: Sekretær ROI ───────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0015ff] uppercase tracking-widest mb-3">Regn selv efter</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Hvad er din tid egentlig værd?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Hvis du bruger bare{" "}
                <strong className="text-gray-800">2 timer om dagen</strong> på at skrive mails og sende fakturaer —
                og du fakturerer kunder{" "}
                <strong className="text-gray-800">{fmt(HOURLY_RATE)}/time</strong> — gælder dette regnestykke for dig.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div {...fadeUp(0.1)}>
                <Card>
                  <h3 className="font-semibold text-gray-900 text-lg mb-6">Regnestykket</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Timer sparet per dag</span>
                      <span className="font-semibold text-gray-900">{HOURS_SAVED_PER_DAY} timer</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Arbejdsdage per måned</span>
                      <span className="font-semibold text-gray-900">{WORKING_DAYS} dage</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Timer sparet per måned</span>
                      <span className="font-semibold text-gray-900">{MONTHLY_HOURS_SAVED} timer</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Din timepris</span>
                      <span className="font-semibold text-gray-900">{fmt(HOURLY_RATE)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Tabt fakturerbar tid per måned</span>
                      <span className="font-bold text-red-500 text-base">{fmt(MONTHLY_VALUE_SAVED)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Pris på Sekretær Agent</span>
                      <span className="font-semibold text-[#0015ff]">{fmt(SECRETARY_BOT_PRICE)}/md</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="font-bold text-gray-900 text-base">Du tjener ekstra per måned</span>
                      <span className="font-bold text-green-600 text-xl">{fmt(SECRETARY_NET_GAIN)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <StatPill label="Sparet tid/md" value={`${MONTHLY_HOURS_SAVED} timer`} />
                  <StatPill label="Bots månedspris" value={fmt(SECRETARY_BOT_PRICE)} />
                  <StatPill label="Ekstra indtægt" value={fmt(SECRETARY_NET_GAIN)} accent />
                  <StatPill label="Pr. år ekstra" value={fmt(SECRETARY_NET_GAIN * 12)} />
                </div>
                <Card className="bg-blue-50 border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0015ff] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Logikken er simpel</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        AI-agenten klarer alt det administrative. Du bruger de {MONTHLY_HOURS_SAVED} timer
                        på at fakturere kunder i stedet — og tjener {fmt(MONTHLY_VALUE_SAVED)} mere om måneden.
                        Agenten koster {fmt(SECRETARY_BOT_PRICE)}. Du beholder{" "}
                        <strong>{fmt(SECRETARY_NET_GAIN)}</strong> netto.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                  <p className="text-sm font-semibold text-green-700 mb-1">Break-even</p>
                  <p className="text-sm text-gray-600">
                    Agenten tjener sig hjem på <strong>under 7 timer</strong> fakturerbar tid i måneden.
                    Alt derudover er ren fortjeneste.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CASE 2: Google Reviews ────────────────────────── */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0015ff] uppercase tracking-widest mb-3">Case study · Google Anmeldelser</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Fra side 2 til side 1 på Google
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Studier viser at hjemmesider på <strong className="text-gray-800">side 1 af Google</strong> modtager{" "}
                <strong className="text-gray-800">91% af alle klik</strong> — hjemmesider på side 2 får kun 6%.
                Det er en forskel på op til <strong className="text-gray-800">15× mere trafik</strong>.
                Google Reviews er den hurtigste vej til side 1 for lokale virksomheder.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <motion.div {...fadeUp(0.1)}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Side 2 af Google</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">6%</p>
                  <p className="text-sm text-gray-500">af alle søgeklik lander på side 2. De fleste finder aldrig din klinik.</p>
                </Card>
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <Card className="text-center h-full border-[#0015ff] bg-blue-50">
                  <div className="w-12 h-12 rounded-2xl bg-[#0015ff] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#0015ff] uppercase tracking-wider mb-1">Side 1 af Google</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">91%</p>
                  <p className="text-sm text-gray-600">af alle søgeklik. Nye kunder finder dig — ikke konkurrenten.</p>
                </Card>
              </motion.div>
              <motion.div {...fadeUp(0.3)}>
                <Card className="text-center h-full">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Ekstra indtægt</p>
                  <p className="text-3xl font-bold text-green-600 mb-2">{fmt(EXTRA_MONTHLY_REVENUE)}</p>
                  <p className="text-sm text-gray-500">per måned for en kiropraktorklinik med 20 ekstra patienter.</p>
                </Card>
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.2)}>
              <Card>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-3">Eksempel: Kiropraktorklinik</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      En kiropraktorklinik rykker fra side 2 til side 1 på Google ved at akkumulere
                      verificerede anmeldelser. Det tiltrækker <strong>{EXTRA_PATIENTS_PER_MONTH} ekstra
                      patienter om måneden</strong> — hver behandling koster{" "}
                      <strong>{fmt(AVG_TREATMENT_PRICE)}</strong>.
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Ekstra patienter/md (side 1 vs 2)</span>
                        <span className="font-semibold">{EXTRA_PATIENTS_PER_MONTH} patienter</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Gennemsnitlig behandlingspris</span>
                        <span className="font-semibold">{fmt(AVG_TREATMENT_PRICE)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Ekstra omsætning per måned</span>
                        <span className="font-bold text-green-600">{fmt(EXTRA_MONTHLY_REVENUE)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Pris på Google Reviews Agent</span>
                        <span className="font-semibold text-[#0015ff]">{fmt(REVIEWS_BOT_PRICE)}/md</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold text-base">
                        <span className="text-gray-900">Netto gevinst per måned</span>
                        <span className="text-green-600">{fmt(REVIEWS_NET_GAIN)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl bg-[#0015ff] text-white p-5">
                      <p className="text-sm font-semibold text-blue-200 mb-1">Hvad agenten gør</p>
                      <ul className="text-sm space-y-2 mt-3">
                        {[
                          "Sender automatisk anmodning om anmeldelse efter hvert besøg",
                          "Personaliseret SMS/e-mail i klinikkens tone",
                          "Overvåger nye anmeldelser og udkaster svar",
                          "Forbedrer Google ranking løbende",
                          "Kræver nul manuel indsats fra klinikken",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-blue-300 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-green-50 border border-green-200 p-5">
                      <p className="text-sm font-semibold text-green-700">
                        Agenten koster {fmt(REVIEWS_BOT_PRICE)}/md og genererer {fmt(EXTRA_MONTHLY_REVENUE)}/md ekstra.
                        Det er <strong>{Math.round(EXTRA_MONTHLY_REVENUE / REVIEWS_BOT_PRICE)}× return</strong> på investeringen.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── CASE 3: Medarbejder vs. bot ───────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0015ff] uppercase tracking-widest mb-3">Sammenligning</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Sekretær + Bogholder vs. AI-agent
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                En menneskelig medarbejder koster din virksomhed langt mere end blot lønnen.
                Se hvad du reelt betaler — og hvad alternativet koster.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Human column */}
              <motion.div {...fadeUp(0.1)}>
                <Card className="border-red-100 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Sekretær + Bogholder</h3>
                      <p className="text-sm text-gray-500">2 fuldtidsmedarbejdere</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Sekretær løn/md (inkl. pension)</span>
                      <span className="font-semibold text-red-500">{fmt(SECRETARY_SALARY)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Bogholder løn/md (inkl. pension)</span>
                      <span className="font-semibold text-red-500">{fmt(BOOKKEEPER_SALARY)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 font-bold text-base">
                      <span className="text-gray-900">Samlet månedlig omkostning</span>
                      <span className="text-red-500">{fmt(EMPLOYEE_TOTAL)}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">Begrænsninger</p>
                    <ul className="space-y-2">
                      {[
                        "Arbejder kun 8 timer/dag, 5 dage/uge",
                        "Holder ferie og bliver syg",
                        "Kræver oplæring og onboarding",
                        "Kender ikke dine systemer fra dag 1",
                        "Kan opsige med 1–3 måneders varsel",
                        "Stiger i løn over tid",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                          <span className="mt-0.5 shrink-0">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Bot column */}
              <motion.div {...fadeUp(0.2)}>
                <Card className="border-[#0015ff] bg-gradient-to-b from-blue-50 to-white h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0015ff] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">DinDrift AI-agent</h3>
                      <p className="text-sm text-[#0015ff]">Sekretær + Bogholder i én løsning</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Fast månedspris</span>
                      <span className="font-bold text-[#0015ff] text-base">{fmt(BOT_PRICE)}/md</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Opstartsomkostning</span>
                      <span className="font-semibold text-green-600">0 kr</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 font-bold text-base">
                      <span className="text-gray-900">Du sparer per måned</span>
                      <span className="text-green-600">{fmt(BOT_SAVINGS)}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0015ff]/10 border border-[#0015ff]/20 p-4">
                    <p className="text-xs font-semibold text-[#0015ff] uppercase tracking-wider mb-3">Fordele</p>
                    <ul className="space-y-2">
                      {[
                        "Arbejder 24 timer i døgnet, 7 dage om ugen",
                        "Holder aldrig ferie og er aldrig syg",
                        "Kender alle dine filer og din kalender fra dag 1",
                        "Ingen oplæring — klar til brug med det samme",
                        "Kan opsiges med 1 måneds varsel",
                        "Fast pris — stiger aldrig",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#0015ff] mt-0.5 shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-4">
                    <p className="text-sm text-green-700 font-semibold">
                      Spar {fmt(BOT_SAVINGS)} om måneden — det svarer til {fmt(BOT_SAVINGS * 12)} om året.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ──────────────────────────────────── */}
        <section id="kontakt" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <p className="text-xs font-semibold text-[#0015ff] uppercase tracking-widest mb-3">Gratis · Uforpligtende</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Hør hvad du kan spare
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Fortæl os lidt om din virksomhed — vi regner ud hvad du kan spare med AI-automatisering,
                og vender tilbage inden for 24 timer. Ingen forpligtelse, ingen salgspres.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              {formState === "success" ? (
                <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tak for din henvendelse!</h3>
                  <p className="text-gray-500">Vi vender tilbage inden for 24 timer med en beregning til dig.</p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="bg-white border border-gray-200 rounded-2xl p-7 md:p-10 flex flex-col gap-4 shadow-sm"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Dit navn"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Virksomhed"
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Din e-mail"
                    required
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefonnummer (valgfrit)"
                    className={inputClass}
                  />
                  <textarea
                    name="message"
                    placeholder="Beskriv kort hvad du bruger mest tid på — så finder vi besparelsen for dig"
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Ved at sende denne formular accepterer du, at DinDrift (CVR: 43486489) behandler dine
                    oplysninger for at besvare din henvendelse — i overensstemmelse med GDPR. Dine data
                    videregives ikke til tredjepart.{" "}
                    <a href="/privatlivspolitik" className="underline hover:text-gray-600 transition-colors">
                      Privatlivspolitik
                    </a>
                    .
                  </p>

                  {formState === "error" && (
                    <p className="text-sm text-red-500">Noget gik galt. Prøv igen eller skriv til julianzacharfink@gmail.com</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full bg-[#0015ff] text-white font-semibold py-4 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {formState === "sending" ? "Sender…" : "Beregn min besparelse gratis →"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
