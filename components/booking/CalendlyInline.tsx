"use client"

import { useEffect, useRef, useState } from "react"
import { CALENDLY_URL } from "@/lib/site"
import { loadCalendly } from "./loadCalendly"

export default function CalendlyInline() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active || !ref.current) return
    let cancelled = false
    loadCalendly().then(() => {
      if (cancelled || !ref.current) return
      // @ts-expect-error Calendly is attached to window by widget.js
      window.Calendly?.initInlineWidget({ url: CALENDLY_URL, parentElement: ref.current })
    })
    return () => {
      cancelled = true
    }
  }, [active])

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-border bg-background"
      style={{ minWidth: "320px", height: "700px" }}
      aria-label="Calendly booking calendar"
    />
  )
}
