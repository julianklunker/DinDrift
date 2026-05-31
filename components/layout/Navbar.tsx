"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/LanguageContext"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo-full.svg"
            alt="DinDrift"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: t.nav.solutions, id: "solutions", href: null },
            { label: t.nav.about, id: "about", href: null },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </li>
        </ul>

        {/* Language toggle */}
        <div className="flex items-center gap-1 text-sm">
          <button
            onClick={() => setLanguage("da")}
            className={`px-2 py-1 rounded transition-colors ${
              language === "da"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            DA
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={() => setLanguage("en")}
            className={`px-2 py-1 rounded transition-colors ${
              language === "en"
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
      