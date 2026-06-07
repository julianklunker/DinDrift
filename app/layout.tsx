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
    default: "DinDrift — AI Automation & AI Agents for Your Business",
    template: "%s — DinDrift",
  },
  description:
    "Intelligent AI agents tailored to your business. Secretary, bookkeeper, chatbot, email assistant and no-show follow-up.",
  keywords: [
    "AI automation",
    "AI agents",
    "AI secretary",
    "AI bookkeeper",
    "website chatbot",
    "AI email assistant",
    "no-show follow-up",
    "automation for SMBs",
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
    locale: "en_US",
    alternateLocale: "da_DK",
    url: "https://dindrift.com",
    siteName: "DinDrift",
    title: "DinDrift — AI Automation & AI Agents for Your Business",
    description:
      "Intelligent AI agents tailored to your business — automate the tedious tasks and focus on what really matters.",
    images: [{ url: "/dindriftlogo.png", alt: "DinDrift — AI Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DinDrift — AI Automation & AI Agents",
    description:
      "Intelligent AI agents tailored to your business. Automate the routine, win back your time.",
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
      lang="en"
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
