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
    "Intelligente AI-agenter skræddersyet til din virksomhed — sekretær, bogholder, chatbot, e-mail assistent og no-show opfølgning.",
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
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aalborg",
    addressCountry: "DK",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  vatID: "DK43486489",
  founder: { "@type": "Person", name: "Julian Zachar-Fink" },
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
