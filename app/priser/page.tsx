import type { Metadata } from "next"
import PricingClient from "./PricingClient"

export const metadata: Metadata = {
  title: "Priser — DinDrift",
  description:
    "Se hvad AI-automatisering koster — og hvad du sparer. Beregn din ROI og kom i gang fra 0 kr i opstart.",
}

export default function PricerPage() {
  return <PricingClient />
}
