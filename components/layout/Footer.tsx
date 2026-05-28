"use client"

import { useLanguage } from "@/lib/LanguageContext"
import Link from "next/link"

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{f.copyright}</span>
          <span className="hidden sm:inline">·</span>
          <span>{f.cvr}</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/privatlivspolitik" className="hover:text-foreground transition-colors">
            Privatlivspolitik
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/kontakt" className="hover:text-foreground transition-colors">
            Kontakt
          </Link>
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
