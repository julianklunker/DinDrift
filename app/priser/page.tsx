import type { Metadata } from "next"
import { JsonLd, pricingServicesSchema } from "@/components/StructuredData"
import PricingClient from "./PricingClient"

export const metadata: Metadata = {
  title: "Priser på AI-agenter — hvad koster en AI-sekretær?",
  description:
    "Se hvad AI-automatisering koster — og hvad du sparer. AI-agenter fra 3.500 kr/md, 0 kr i opstart, opsig når som helst. Beregn din ROI.",
  alternates: { canonical: "/priser" },
}

export default function PricerPage() {
  return (
    <>
      <JsonLd data={pricingServicesSchema} />
      <PricingClient />
    </>
  )
}
