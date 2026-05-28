"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

type ConsentStatus = "accepted" | "declined" | null

const COOKIE_KEY = "dindrift_cookie_consent"

export default function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check stored consent
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentStatus | null
    if (!stored) {
      // Small delay so banner doesn't flash on initial paint
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
    setStatus(stored)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setStatus("accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined")
    setStatus("declined")
    setVisible(false)
  }

  // Don't render anything once a choice has been made
  if (status !== null) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-samtykke"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] bg-background border border-border rounded-2xl shadow-xl p-5 flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0015ff]/10 flex items-center justify-center shrink-0">
              <svg className="w-4.5 h-4.5 text-[#0015ff]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-8 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12c-3.31 0-6-2.69-6-6 0-.34.03-.67.08-1h11.84c.05.33.08.66.08 1 0 3.31-2.69 6-6 6z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Vi bruger cookies</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                DinDrift anvender tekniske cookies for at sikre, at hjemmesiden fungerer korrekt.
                Vi bruger ingen reklame- eller sporings-cookies uden dit samtykke.
              </p>
            </div>
          </div>

          {/* Details */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ved at klikke <strong className="text-foreground">&ldquo;Acceptér&rdquo;</strong> giver du samtykke til brugen af funktionelle cookies
            og eventuel anonym trafikanalyse. Du kan til enhver tid trække dit samtykke tilbage.
            Læs mere i vores{" "}
            <Link href="/privatlivspolitik" className="underline hover:text-foreground transition-colors">
              privatlivspolitik
            </Link>
            .
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 bg-[#0015ff] text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Acceptér alle
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-muted border border-border text-foreground text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-muted/80 active:opacity-80 transition-colors"
            >
              Kun nødvendige
            </button>
          </div>

          {/* GDPR note */}
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            I overensstemmelse med EU&apos;s cookielov (direktiv 2009/136/EF) og GDPR (forordning 2016/679).
            Dataansvarlig: DinDrift, CVR 43486489 — dindriftai@gmail.com
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
