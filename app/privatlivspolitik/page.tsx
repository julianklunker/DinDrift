import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Privatlivspolitik — DinDrift",
  description: "Læs om, hvordan DinDrift behandler dine personoplysninger i overensstemmelse med GDPR.",
}

export default function PrivatlivspolitikPage() {
  return (
    <main>
      <Navbar />
      <article className="pt-32 pb-24 px-6 max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-sm sm:prose-base">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Privatlivspolitik</h1>
        <p className="text-muted-foreground text-sm mb-10">Sidst opdateret: maj 2026</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">1. Dataansvarlig</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            DinDrift<br />
            CVR: 43486489<br />
            Aalborg, Danmark<br />
            E-mail:{" "}
            <a href="mailto:dindriftai@gmail.com" className="text-[#0015ff] hover:underline">
              dindriftai@gmail.com
            </a>
            <br />
            Telefon: +45 29 72 26 04
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">2. Hvilke oplysninger indsamler vi?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Når du udfylder kontaktformularen på vores hjemmeside, indsamler vi følgende personoplysninger:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
            <li>Navn</li>
            <li>E-mailadresse</li>
            <li>Telefonnummer (hvis angivet)</li>
            <li>Virksomhedsnavn (hvis angivet)</li>
            <li>Beskedindhold</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Vi indsamler ikke følsomme personoplysninger (fx CPR-numre, helbredsoplysninger eller lignende).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">3. Formål med behandlingen</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dine oplysninger behandles udelukkende med henblik på:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
            <li>At besvare din henvendelse</li>
            <li>At tage kontakt til dig i forbindelse med en eventuel aftale om AI-automatisering</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Vi bruger ikke dine oplysninger til markedsføring eller profilering uden dit udtrykkelige samtykke.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">4. Retsgrundlag</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Behandlingen sker på grundlag af <strong>artikel 6(1)(b) i GDPR</strong> (behandling er
            nødvendig for at opfylde en kontrakt eller træffe foranstaltninger på den registreredes
            anmodning forud for indgåelse af en kontrakt) samt <strong>artikel 6(1)(f)</strong>
            (legitim interesse i at besvare henvendelser fra potentielle kunder).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">5. Videregivelse af oplysninger</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dine personoplysninger videregives ikke til tredjepart, med undtagelse af:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
            <li>
              <strong>EmailJS</strong> — en e-mailformidlingstjeneste vi anvender til at sende din
              besked til os. EmailJS behandler alene data til dette tekniske formål og opbevarer ikke
              dine oplysninger permanent.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Vi overdrager ikke dine oplysninger til lande uden for EU/EØS.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">6. Opbevaringsperiode</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dine oplysninger opbevares så længe, det er nødvendigt for at besvare din henvendelse og
            eventuelt indgå en aftale — typisk i op til 2 år. Herefter slettes de, medmindre der er
            lovkrav om længere opbevaring.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">7. Dine rettigheder</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I henhold til GDPR har du følgende rettigheder:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
            <li><strong>Indsigtsret</strong> — du kan anmode om at se, hvilke oplysninger vi har om dig</li>
            <li><strong>Berigtigelse</strong> — du kan anmode om rettelse af fejlagtige oplysninger</li>
            <li><strong>Sletning</strong> — du kan anmode om at få dine oplysninger slettet</li>
            <li><strong>Begrænsning</strong> — du kan anmode om begrænsning af behandlingen</li>
            <li><strong>Indsigelse</strong> — du kan gøre indsigelse mod behandlingen</li>
            <li><strong>Dataportabilitet</strong> — du kan anmode om at modtage dine oplysninger i et struktureret format</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            For at udøve dine rettigheder bedes du kontakte os på{" "}
            <a href="mailto:dindriftai@gmail.com" className="text-[#0015ff] hover:underline">
              dindriftai@gmail.com
            </a>
            . Vi besvarer din anmodning inden for 30 dage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">8. Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Vores hjemmeside anvender tekniske cookies, der er nødvendige for, at siden fungerer korrekt.
            Vi anvender ikke reklame- eller sporings-cookies uden dit samtykke.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Cookies-samtykket opbevares lokalt i din browser (localStorage) og kan til enhver tid
            trækkes tilbage ved at slette dine browserdata eller kontakte os.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            Cookiebekendtgørelsen (BEK nr. 1148 af 09/12/2011) samt EU&apos;s cookiedirektiv
            (2009/136/EF) overholdes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">9. Klage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hvis du er utilfreds med vores behandling af dine personoplysninger, har du ret til at
            indgive en klage til:{" "}
            <br />
            <strong>Datatilsynet</strong><br />
            Carl Jacobsens Vej 35, 2500 Valby<br />
            <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-[#0015ff] hover:underline">
              www.datatilsynet.dk
            </a>
          </p>
        </section>
      </article>
      <Footer />
    </main>
  )
}
