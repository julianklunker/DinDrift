"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import MetaPixel from "@/components/MetaPixel"

const COOKIE_KEY = "dindrift_cookie_consent"
export const CONSENT_EVENT = "dindrift-consent"

// Marketing/analytics scripts (Google tag + Meta Pixel) load only after the
// visitor accepts cookies. The cookie banner explicitly promises "no ad or
// tracking cookies without consent", so loading these unconditionally was a
// GDPR violation — and they were the largest main-thread cost on mobile.
export default function ConsentScripts() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(COOKIE_KEY) === "accepted") setConsented(true)
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "accepted") setConsented(true)
    }
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18195313302"
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18195313302');
        `}
      </Script>
      <MetaPixel />
    </>
  )
}
