"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false })

// Mount the chat widget after the browser is idle so its bundle and hydration
// stay off the critical path — the floating button is not first-paint content.
export default function ChatbotLazy() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShow(true), { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return show ? <Chatbot /> : null
}
