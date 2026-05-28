"use client"

import { useLanguage } from "@/lib/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>{f.copyright}</span>
          <span className="hidden sm:inline">·</span>
          <span>{f.cvr}</span>
        </div>
        <a
          href="https://www.linkedin.com/in/julian-zachar-fink-5574672b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          {f.linkedin} ↗
        </a>
      </div>
    </footer>
  )
}
