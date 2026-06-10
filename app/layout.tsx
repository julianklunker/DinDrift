import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import CookieBanner from "@/components/CookieBanner"
import ConsentScripts from "@/components/ConsentScripts"
import { JsonLd, organizationSchema, localBusinessSchema } from "@/components/StructuredData"

// display "optional": if the webfont isn't ready within ~100ms the
// metric-adjusted fallback stays for that view — avoids the late font-swap
// repaint that otherwise becomes the page's LCP on throttled mobile.
const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "optional" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "optional",
  // Not part of first-paint typography — don't let it compete for pre-FCP bandwidth.
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dindrift.com"),
  title: {
    default: "AI-sekretær & AI-automatisering | DinDrift",
    template: "%s | DinDrift",
  },
  description:
    "DinDrift bygger AI-agenter til danske virksomheder: AI-sekretær der besvarer opkald og mails, booker tider og følger op — fast månedspris, 0 kr i opstart.",
  keywords: [
    "ai sekretær",
    "ai receptionist",
    "ai telefonpasning",
    "virtuel receptionist dansk",
    "automatisk telefonsvarer der booker tider",
    "telefonpasning lille virksomhed",
    "ai automatisering danmark",
    "ai agenter til virksomheder",
    "automatisering af opgaver virksomhed",
    "ai til smv",
  ],
  authors: [{ name: "Julian Zachar-Fink" }],
  creator: "DinDrift",
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/dindriftlogosmall.png",
    shortcut: "/dindriftlogosmall.png",
    apple: "/dindriftlogosmall.png",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    alternateLocale: "en_US",
    url: "https://dindrift.com",
    siteName: "DinDrift",
    title: "AI-sekretær & AI-automatisering | DinDrift",
    description:
      "Intelligente AI-agenter skræddersyet til din virksomhed — automatiser de trivielle opgaver og fokuser på det, der betyder noget.",
    images: [{ url: "/dindriftlogo.png", alt: "DinDrift — AI-automatisering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-sekretær & AI-automatisering | DinDrift",
    description:
      "Intelligente AI-agenter skræddersyet til din virksomhed. Automatiser rutinerne, vind din tid tilbage.",
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
        <JsonLd data={[organizationSchema, localBusinessSchema]} />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
        <ConsentScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
