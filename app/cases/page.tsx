import type { Metadata } from "next"
import CasesClient from "./CasesClient"

export const metadata: Metadata = {
  title: "Cases & resultater — hvad AI-agenter kan spare dig",
  description:
    "Regneeksempler på, hvad DinDrifts AI-agenter kan betyde for en dansk SMV: sparet tid, flere kunder via Google-anmeldelser og besparelse i forhold til at ansætte.",
  alternates: { canonical: "/cases" },
}

export default function CasesPage() {
  return <CasesClient />
}
