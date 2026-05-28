"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "motion/react"
import emailjs from "@emailjs/browser"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Link from "next/link"

type FormState = "idle" | "sending" | "success" | "error"

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "E-mail",
    value: "dindriftai@gmail.com",
    href: "mailto:dindriftai@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Telefon",
    value: "+45 29 72 26 04",
    href: "tel:+4529722604",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Lokation",
    value: "Aalborg, Danmark",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Svartid",
    value: "Inden for 24 timer",
    href: null,
  },
]

const inputClass =
  "w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0015ff]/40 transition-all"

export default function KontaktClient() {
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

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-sm font-medium text-[#0015ff] uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Gratis &amp; uforpligtende
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            Lad os tage en snak
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Har du spørgsmål til, hvad AI-automatisering kan gøre for din virksomhed? Udfyld formularen eller skriv direkte til os — det er{" "}
            <strong className="text-foreground font-semibold">helt gratis og uforpligtende</strong>.
            Vi vender tilbage inden for 24 timer.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: contact info + trust signals */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground hover:text-[#0015ff] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust block */}
            <div className="bg-muted/50 border border-border rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-sm font-semibold text-foreground">
                Hvad sker der, når du kontakter os?
              </p>
              {[
                "Vi svarer inden for 24 timer på hverdage",
                "Vi lytter til din situation — ingen salgs-pitch",
                "Du får konkrete forslag uden forpligtelse",
                "Gratis opdagelsescall på 30 minutter",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0015ff]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#0015ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>

            {/* Back to home */}
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Tilbage til forsiden
            </Link>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {formState === "success" ? (
              <div className="bg-background border border-border rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Tak for din besked!</h3>
                <p className="text-sm text-muted-foreground">
                  Vi har modtaget din henvendelse og vender tilbage inden for 24 timer.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 text-sm text-[#0015ff] hover:underline"
                >
                  Send en ny besked
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-background border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4"
                aria-label="Kontaktformular"
              >
                <div>
                  <label htmlFor="user_name" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Navn <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    placeholder="Dit fulde navn"
                    required
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    E-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    placeholder="din@email.dk"
                    required
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="user_phone" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Telefon <span className="text-muted-foreground font-normal normal-case">(valgfrit)</span>
                  </label>
                  <input
                    id="user_phone"
                    type="tel"
                    name="user_phone"
                    placeholder="+45 00 00 00 00"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Virksomhed <span className="text-muted-foreground font-normal normal-case">(valgfrit)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Navn på din virksomhed"
                    className={inputClass}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Besked <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Fortæl os kort om din virksomhed og hvad du ønsker hjælp til..."
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Data consent notice */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ved at sende denne formular accepterer du, at DinDrift (CVR: 43486489) behandler de
                  oplysninger, du har indtastet — herunder navn, e-mailadresse og eventuel
                  telefonummer — med det formål at besvare din henvendelse. Dine oplysninger
                  opbevares sikkert og videregives ikke til tredjepart. Du kan til enhver tid
                  anmode om indsigt i eller sletning af dine data ved at kontakte{" "}
                  <a href="mailto:dindriftai@gmail.com" className="underline hover:text-foreground transition-colors">
                    dindriftai@gmail.com
                  </a>
                  . Behandlingen sker i overensstemmelse med GDPR (forordning 2016/679).
                </p>

                {formState === "error" && (
                  <p className="text-sm text-red-500">
                    Noget gik galt. Prøv venligst igen eller skriv direkte til{" "}
                    <a href="mailto:dindriftai@gmail.com" className="underline">
                      dindriftai@gmail.com
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-[#0015ff] text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {formState === "sending" ? "Sender..." : "Send besked — gratis & uforpligtende"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
