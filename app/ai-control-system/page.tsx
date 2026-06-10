import type { Metadata } from "next"
import { JsonLd, aiControlSystemServiceSchema } from "@/components/StructuredData"
import AiControlSystemClient from "./AiControlSystemClient"

export const metadata: Metadata = {
  title: "AI Control System — ét dashboard til dine AI-agenter",
  description:
    "Se hvordan DinDrifts skræddersyede AI Control System virker — ét kontrolcenter til at se, styre og skalere alle de AI-agenter, du kører.",
  alternates: { canonical: "/ai-control-system" },
}

export default function AiControlSystemPage() {
  return (
    <>
      <JsonLd data={aiControlSystemServiceSchema} />
      <AiControlSystemClient />
    </>
  )
}
