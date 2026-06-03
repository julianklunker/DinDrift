"use client"

import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useLanguage } from "@/lib/LanguageContext"
import { getPost } from "@/lib/posts"

const copy = {
  da: { back: "← Tilbage til blog", cta: "Book en gratis snak" },
  en: { back: "← Back to blog", cta: "Book a free chat" },
}

export default function PostClient({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const post = getPost(slug)
  if (!post) return null
  const c = copy[language]
  const content = post[language]
  const dateStr = new Date(post.date).toLocaleDateString(language === "da" ? "da-DK" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main>
      <Navbar />

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-[#0015ff] transition-colors">
            {c.back}
          </Link>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-6 mb-3">{dateStr}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
            {content.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{content.description}</p>

          <div className="flex flex-col gap-6">
            {content.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-2">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base text-foreground/80 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <Link
              href="/kontakt"
              className="inline-block bg-[#0015ff] text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              {c.cta}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
