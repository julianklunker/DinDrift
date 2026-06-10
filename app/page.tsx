import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import ChatbotLazy from "@/components/ChatbotLazy"

// Below-the-fold sections load as separate chunks (still server-rendered) so
// hydration is split into smaller tasks instead of one long main-thread block.
const ControlSystem = dynamic(() => import("@/components/sections/ControlSystem"))
const Solutions = dynamic(() => import("@/components/sections/Solutions"))
const Custom = dynamic(() => import("@/components/sections/Custom"))
const About = dynamic(() => import("@/components/sections/About"))
const Contact = dynamic(() => import("@/components/sections/Contact"))

export const metadata: Metadata = {
  title: { absolute: "AI-sekretær & AI-automatisering | DinDrift" },
  description:
    "DinDrift bygger AI-agenter til danske virksomheder: AI-sekretær der besvarer opkald og mails, booker tider og følger op — fast månedspris, 0 kr i opstart.",
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ControlSystem />
      <Solutions />
      <Custom />
      <About />
      <Contact />
      <Footer />
      <ChatbotLazy />
    </main>
  )
}
