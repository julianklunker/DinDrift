import type { Metadata } from "next"
import KontaktClient from "./KontaktClient"

export const metadata: Metadata = {
  title: "Kontakt — DinDrift",
  description:
    "Kontakt DinDrift for en gratis, uforpligtende samtale om AI-automatisering til din virksomhed. Vi svarer inden for 24 timer.",
}

export default function KontaktPage() {
  return <KontaktClient />
}
