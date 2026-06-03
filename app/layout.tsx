import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import CookieBanner from "@/components/CookieBanner"
import MetaPixel from "@/components/MetaPixel"
import { JsonLd, organizationSchema, localBusinessSchema } from "@/components/StructuredData"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dindrift.com"),
  title: {
    default: "DinDrift — AI Automatisering & AI-agenter til din virksomhed",
    template: "%s — DinDrift",
  },
  description:
    "Intelligente AI-agenter skræddersyet til din virksomhed. Sekretær, bogholder, chatbot, e-mail assistent og no-show opfølgning.",
  keywords: [
    "AI automatisering Danmark",
    "AI agenter",
    "AI sekretær",
    "AI bogholder",
    "hjemmeside chatbot",
    "AI e-mail assistent",
    "no-show opfølgning",
    "automatisering for SMV",
    "AI automation Denmark",
    "AI agents for business",
  ],
  authors: [{ name: "Julian Zachar-Fink" }],
  creator: "DinDrift",
  alternates: { canonical: "/" },
  icons: {
    icon: "/dindriftlogosmall.png",
    shortcut: "/dindriftlogosmall.png",
    apple: "/dindriftlogosmall.png",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://dindrift.com",
    siteName: "DinDrift",
    title: "DinDrift — AI Automatisering & AI-agenter til din virksomhed",
    description:
      "Intelligente AI-agenter skræddersyet til din virksomhed — automatisér de kedelige opgaver og fokusér på det, der virkelig betyder noget.",
    images: [{ url: "/dindriftlogo.png", alt: "DinDrift — AI Automatisering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DinDrift — AI Automatisering & AI-agenter",
    description:
      "Intelligente AI-agenter skræddersyet til din virksomhed. Automatisér rutinen, vind tiden tilbage.",
    images: ["/dindriftlogo.png"],
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
        <MetaPixel />
        <JsonLd data={[organizationSchema, localBusinessSchema]} />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
