import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import CookieBanner from "@/components/CookieBanner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "DinDrift — AI Automatisering",
  description:
    "Intelligente AI-agenter skræddersyet til din virksomhed. Sekretær, bogholder, chatbot, e-mail assistent og no-show opfølgning.",
  icons: {
    icon: "/dindriftlogosmall.png",
    shortcut: "/dindriftlogosmall.png",
    apple: "/dindriftlogosmall.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="da"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site information" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18195313302"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18195313302');
          `}
        </Script>
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
