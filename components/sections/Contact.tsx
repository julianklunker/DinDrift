"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "motion/react"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/lib/LanguageContext"

type FormState = "idle" | "sending" | "success" | "error"

const infoIcons = [
  // Envelope
  <svg key="email" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>,
  // Phone
  <svg key="phone" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>,
  // Location pin
  <svg key="location" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>,
  // Clock
  <svg key="clock" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
]

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
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
    "w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-muted/30">
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
            {c.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {c.heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            {c.subtext}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: info */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {c.infoItems.map((item, i) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                  {infoIcons[i]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {formState === "success" ? (
              <div className="bg-background border border-border rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-foreground font-medium">{c.form.successMsg}</p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-background border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="user_name"
                  placeholder={c.form.namePlaceholder}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder={c.form.emailPlaceholder}
                  required
                  className={inputClass}
                />
                <textarea
                  name="message"
                  placeholder={c.form.messagePlaceholder}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />

                {/* Data consent notice */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ved at sende denne formular accepterer du, at DinDrift (CVR: 43486489) behandler dine
                  oplysninger for at besvare din henvendelse — i overensstemmelse med GDPR. Dine data
                  videregives ikke til tredjepart.{" "}
                  <a href="/privatlivspolitik" className="underline hover:text-foreground transition-colors">
                    Læs vores privatlivspolitik
                  </a>
                  .
                </p>

                {formState === "error" && (
                  <p className="text-sm text-red-500">{c.form.errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-foreground text-background font-semibold py-3 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "sending" ? c.form.sendingBtn : c.form.sendBtn}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
