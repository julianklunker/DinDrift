"use client"

import { useLanguage } from "@/lib/LanguageContext"
import { CALENDLY_URL } from "@/lib/site"
import { loadCalendly } from "./loadCalendly"
import { trackLead } from "@/lib/fbpixel"

export default function CalendlyButton({
  className,
  label,
}: {
  className?: string
  label?: string
}) {
  const { t } = useLanguage()
  const text = label ?? t.booking.cta

  const open = async () => {
    trackLead({ content_name: "Calendly popup" })
    await loadCalendly()
    // @ts-expect-error Calendly is attached to window by widget.js
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
  }

  return (
    <button
      type="button"
      onClick={open}
      className={
        className ??
        "text-sm font-semibold text-white bg-[#0015ff] px-5 py-2.5 rounded-full hover:opacity-90 active:opacity-80 transition-opacity min-h-[44px]"
      }
    >
      {text}
    </button>
  )
}
