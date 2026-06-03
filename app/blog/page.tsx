import type { Metadata } from "next"
import BlogIndexClient from "./BlogIndexClient"

export const metadata: Metadata = {
  title: "Blog — AI-automatisering for danske virksomheder",
  description:
    "Guides og indsigter om AI-agenter, automatisering og hvordan danske SMV'er sparer tid og vinder kunder med DinDrift.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return <BlogIndexClient />
}
