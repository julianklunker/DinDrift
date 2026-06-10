"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Language, translations } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (typeof translations)[Language]
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = "dindrift-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("da")

  // Restore the visitor's saved choice on mount (client-side only).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "da" || saved === "en") {
      setLanguageState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  // Persist the choice and keep <html lang> in sync.
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
