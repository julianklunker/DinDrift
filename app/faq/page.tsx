import type { Metadata } from "next"
import { faqs } from "@/lib/faqData"
import { JsonLd } from "@/components/StructuredData"
import FaqClient from "./FaqClient"

export const metadata: Metadata = {
  title: "FAQ — Ofte stillede spørgsmål om AI-agenter",
  description:
    "Svar på de mest stillede spørgsmål om DinDrifts AI-agenter: hvad de kan, hvad det koster, GDPR, integrationer og hvordan du kommer i gang.",
  alternates: { canonical: "/faq" },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.da.q,
    acceptedAnswer: { "@type": "Answer", text: f.da.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FaqClient />
    </>
  )
}
