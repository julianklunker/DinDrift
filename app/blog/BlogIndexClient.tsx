"use client"

import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/lib/LanguageContext"
import { getAllPosts } from "@/lib/posts"

const copy = {
  da: { eyebrow: "Blog", title: "Indsigter om AI-automatisering", subtitle: "Guides til, hvordan danske virksomheder sparer tid og vinder kunder med AI-agenter.", read: "Læs mere" },
  en: { eyebrow: "Blog", title: "Insights on AI automation", subtitle: "Guides on how Danish businesses save time and win customers with AI agents.", read: "Read more" },
}

export default function BlogIndexClient() {
  const { language } = useLanguage()
  const c = copy[language]
  const posts = getAllPosts()

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#0015ff] uppercase tracking-widest mb-3">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">{c.title}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {posts.map((post) => {
            const content = post[language]
            const dateStr = new Date(post.date).toLocaleDateString(language === "da" ? "da-DK" : "en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            // No entrance animation: the first card is above the fold and
            // must paint with the first server-rendered frame (LCP).
            return (
              <article
                key={post.slug}
                className="border border-border rounded-2xl bg-background p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{dateStr}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#0015ff] transition-colors">
                    {content.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{content.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#0015ff] hover:underline">
                  {c.read} →
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
