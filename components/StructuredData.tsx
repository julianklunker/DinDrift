// JSON-LD structured data helpers. Render <JsonLd data={...} /> anywhere (head or body).
// Base Organization + LocalBusiness schemas are mounted site-wide in app/layout.tsx;
// page-specific schemas (FAQPage, Article) are rendered on their respective pages.

const SITE = "https://dindrift.com"

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DinDrift",
  url: SITE,
  logo: `${SITE}/dindriftlogosmall.png`,
  email: "dindriftai@gmail.com",
  telephone: "+4529722604",
  description:
    "Intelligente AI-agenter skræddersyet til din virksomhed — sekretær, bogholder, chatbot, e-mail assistent, no-show opfølgning, LLM SEO optimering og leadgenerering.",
  founder: { "@type": "Person", name: "Julian Zachar-Fink" },
  sameAs: ["https://www.linkedin.com/in/julian-zachar-fink-5574672b9/"],
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DinDrift",
  image: `${SITE}/dindriftlogosmall.png`,
  url: SITE,
  telephone: "+4529722604",
  email: "dindriftai@gmail.com",
  priceRange: "Fra 3.500 kr/md, 0 kr i opstart",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aalborg",
    addressCountry: "DK",
  },
  areaServed: [
    { "@type": "Country", name: "Danmark" },
    { "@type": "AdministrativeArea", name: "Sjælland" },
  ],
  vatID: "DK43486489",
  founder: { "@type": "Person", name: "Julian Zachar-Fink" },
}

// Services with publicly displayed pricing (must match what /priser shows).
const serviceOffer = (name: string, description: string, pricePerMonth: number) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@type": "Organization", name: "DinDrift", url: SITE },
  areaServed: { "@type": "Country", name: "Danmark" },
  inLanguage: "da-DK",
  offers: {
    "@type": "Offer",
    priceCurrency: "DKK",
    price: pricePerMonth,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: pricePerMonth,
      priceCurrency: "DKK",
      unitText: "måned",
    },
    description: "0 kr i opstart. Fast månedspris, opsiges når som helst.",
    availability: "https://schema.org/InStock",
    url: `${SITE}/priser`,
  },
})

export const pricingServicesSchema = [
  serviceOffer(
    "AI Sekretær Agent",
    "AI-sekretær der besvarer henvendelser, skriver mails, sender fakturaer og booker tider for din virksomhed — 24/7.",
    4400,
  ),
  serviceOffer(
    "Google Reviews Agent",
    "Automatisk opfølgning der skaffer flere 5-stjernede Google-anmeldelser og flere kunder — uden manuel indsats.",
    3500,
  ),
  serviceOffer(
    "Sekretær + Bogholder AI-agent",
    "Én samlet AI-løsning der erstatter manuel sekretær- og bogholderarbejde til en fast månedspris.",
    4000,
  ),
]

export const aiControlSystemServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Control System",
  description:
    "Skræddersyet kontrolcenter-dashboard til at se, styre og skalere alle de AI-agenter, din virksomhed kører.",
  provider: { "@type": "Organization", name: "DinDrift", url: SITE },
  areaServed: { "@type": "Country", name: "Danmark" },
  inLanguage: "da-DK",
  url: `${SITE}/ai-control-system`,
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
