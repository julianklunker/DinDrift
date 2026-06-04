// Dependency-free blog content store. Posts are typed data (no MDX/build deps).
// The seo-blog-research skill appends new posts here and they appear automatically
// on /blog, /blog/[slug], and in the sitemap.

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPostContent {
  title: string
  description: string
  sections: BlogSection[]
}

export interface BlogPost {
  slug: string
  /** ISO date, e.g. "2026-06-03" */
  date: string
  /** optional hero image path under /public */
  image?: string
  da: BlogPostContent
  en: BlogPostContent
}

export const posts: BlogPost[] = [
  {
    slug: "ai-agenter-spar-tid-vind-kunder",
    date: "2026-06-03",
    da: {
      title: "5 AI-agenter danske SMV'er bruger til at spare tid og vinde kunder",
      description:
        "Konkrete eksempler på, hvordan små og mellemstore virksomheder i Danmark bruger AI-agenter til at automatisere rutinearbejde, svare kunder døgnet rundt og vokse — uden at ansætte.",
      sections: [
        {
          paragraphs: [
            "AI-agenter er ikke længere forbeholdt techgiganter. Danske SMV'er bruger dem allerede til at fjerne timevis af rutinearbejde hver uge og til at fange kunder, der ellers ville gå tabt. Her er fem af de mest effektive — og hvordan de virker i praksis.",
          ],
        },
        {
          heading: "1. Få timerne tilbage med en sekretær-agent",
          paragraphs: [
            "En sekretær-agent håndterer aftaleplanlægning, påmindelser og korrespondance automatisk. For en typisk virksomhed, der sparer to timer om dagen, svarer det til 44 timer om måneden — tid du kan bruge på det, der faktisk skaber omsætning.",
          ],
        },
        {
          heading: "2. En AI-medarbejder — ikke endnu en chatbot",
          paragraphs: [
            "Forskellen på en chatbot og en AI-agent er enkel: agenten svarer, booker og følger op i din tone, i stedet for blot at vise et menupunkt. Den fungerer som en digital kollega, der aldrig holder pause.",
          ],
        },
        {
          heading: "3. Mist aldrig en kunde med svar døgnet rundt",
          paragraphs: [
            "De fleste kunder skriver uden for åbningstid. En hjemmeside-chatbot besvarer henvendelser 24/7 og sikrer, at ingen forespørgsel falder mellem to stole. Kombineret med automatisk no-show-opfølgning henter du kunder tilbage, der ellers var gået tabt.",
          ],
        },
        {
          heading: "4. Automatisér bogføringen",
          paragraphs: [
            "En økonomi-agent bogfører, sporer udgifter og laver rapporter automatisk. Det fjerner en af de mest tidskrævende opgaver for ejerledede virksomheder — og reducerer fejl.",
          ],
        },
        {
          heading: "5. Voks uden at ansætte",
          paragraphs: [
            "Når agenterne håndterer det daglige, kan din omsætning vokse uden flere lønninger. Det er forskellen på at arbejde i virksomheden og at arbejde på den.",
          ],
        },
        {
          heading: "Sådan kommer du i gang",
          paragraphs: [
            "Hos DinDrift bygger vi den præcise AI-agent, der løser dit problem — ingen standardpakke, ingen bureau-overhead. Book en gratis og uforpligtende snak, så finder vi dine tidsrøvere sammen.",
          ],
        },
      ],
    },
    en: {
      title: "5 AI agents Danish SMBs use to save time and win customers",
      description:
        "Concrete examples of how small and medium businesses in Denmark use AI agents to automate routine work, answer customers around the clock, and grow — without hiring.",
      sections: [
        {
          paragraphs: [
            "AI agents are no longer reserved for tech giants. Danish SMBs already use them to remove hours of routine work every week and to capture customers that would otherwise be lost. Here are five of the most effective — and how they work in practice.",
          ],
        },
        {
          heading: "1. Get your hours back with a secretary agent",
          paragraphs: [
            "A secretary agent handles scheduling, reminders, and correspondence automatically. For a typical business saving two hours a day, that's 44 hours a month — time you can spend on what actually drives revenue.",
          ],
        },
        {
          heading: "2. An AI coworker — not just another chatbot",
          paragraphs: [
            "The difference between a chatbot and an AI agent is simple: the agent answers, books, and follows up in your tone, instead of just showing a menu. It works like a digital colleague that never takes a break.",
          ],
        },
        {
          heading: "3. Never lose a customer with 24/7 replies",
          paragraphs: [
            "Most customers write outside business hours. A website chatbot answers inquiries 24/7 so no request slips through the cracks. Combined with automatic no-show follow-up, you win back customers who would otherwise be gone.",
          ],
        },
        {
          heading: "4. Automate the bookkeeping",
          paragraphs: [
            "A finance agent does the bookkeeping, tracks expenses, and produces reports automatically. It removes one of the most time-consuming tasks for owner-led businesses — and reduces errors.",
          ],
        },
        {
          heading: "5. Grow without hiring",
          paragraphs: [
            "When agents handle the day-to-day, your revenue can grow without more salaries. That's the difference between working in your business and working on it.",
          ],
        },
        {
          heading: "How to get started",
          paragraphs: [
            "At DinDrift we build the exact AI agent that solves your problem — no standard package, no agency overhead. Book a free, no-obligation chat and we'll find your time-wasters together.",
          ],
        },
      ],
    },
  },
  {
    slug: "hvad-koster-ai-sekretaer-danmark",
    date: "2026-06-03",
    da: {
      title: "Hvad koster en AI-sekretær i Danmark? Guide 2026",
      description:
        "Overblik over, hvad en AI-sekretær koster i Danmark — prismodel, hvad der påvirker prisen, og hvordan den sammenlignes med at ansætte.",
      sections: [
        {
          paragraphs: [
            "En AI-sekretær i Danmark koster typisk en engangspris for opsætning plus et fast månedligt beløb til drift og vedligehold — markant mindre end at ansætte en medarbejder, og uden lønstigninger, ferie eller sygedage. Den præcise pris afhænger af, hvor meget du vil automatisere. Her er, hvad der ligger bag tallet, og hvordan du regner på, om det kan betale sig for netop din virksomhed.",
          ],
        },
        {
          heading: "Hvad koster en AI-sekretær typisk?",
          paragraphs: [
            "Prisen falder næsten altid i to dele: en engangspris for at bygge og sætte systemet op, og et månedligt abonnement, der dækker drift, overvågning og løbende justeringer. Engangsprisen afspejler kompleksiteten af det, der bygges; abonnementet afspejler, hvor meget der skal holdes kørende bagefter.",
            "Hos DinDrift sætter vi prisen efter dit faktiske behov i stedet for at sælge en standardpakke. En simpel agent, der besvarer henvendelser og booker tider, ligger i den lave ende; en løsning med flere integrationer og workflows koster mere. Du får et konkret tilbud, før du beslutter dig — ingen skjulte gebyrer.",
          ],
        },
        {
          heading: "Hvorfor engangspris plus månedligt abonnement?",
          paragraphs: [
            "Engangsprisen dækker selve byggearbejdet: at koble systemet sammen med din kalender, mail og øvrige værktøjer, træne det i din tone og teste det grundigt, før det går live. Det er den del, der gør agenten til din — ikke en generisk skabelon.",
            "Det månedlige abonnement dækker, at agenten bliver ved med at virke: overvågning, opdateringer når dine værktøjer ændrer sig, og finjustering, efterhånden som du opdager nye opgaver, den kan overtage. Det er forskellen på et stykke software, du selv skal passe, og en kollega, der bare kører.",
          ],
        },
        {
          heading: "Hvad påvirker prisen?",
          paragraphs: [
            "Tre ting flytter prisen mest: antallet af opgaver, agenten skal håndtere, antallet af systemer den skal tale med, og hvor meget menneskelig vurdering der skal bygges ind. En agent, der kun besvarer e-mails, er billigere end én, der både tager telefonen på dansk, booker i kalenderen og følger op på no-shows.",
            "Integrationer er ofte den største faktor. Skal agenten arbejde sammen med dit bogføringssystem, dit CRM og din kalender på én gang, kræver det mere opsætning end en enkelt, afgrænset opgave. Derfor starter de fleste virksomheder med ét tydeligt tidsrøver-problem og udvider derfra.",
          ],
        },
        {
          heading: "AI-sekretær vs. at ansætte: hvad kan bedst betale sig?",
          paragraphs: [
            "En fuldtidssekretær i Danmark koster typisk 30.000–40.000 kr. om måneden i samlet lønudgift, før feriepenge, pension og oplæring. En AI-sekretær koster en brøkdel af det — og arbejder samtidig døgnet rundt, også uden for åbningstid.",
            "Et illustrativt regnestykke (ikke en garanti): sparer en agent dig to timers administrativt arbejde om dagen, svarer det til cirka 44 timer om måneden, du kan bruge på fakturerbart arbejde i stedet. For mange ejerledede virksomheder er det den reelle gevinst — ikke kun den lavere udgift, men de timer, der frigøres.",
          ],
        },
        {
          heading: "Er det dyrt at komme i gang?",
          paragraphs: [
            "Selve samtalen koster ingenting. Vi starter altid med en gratis og uforpligtende snak, hvor vi finder dine største tidsrøvere og vurderer, hvad der reelt kan automatiseres — og hvad der ikke kan betale sig. Først derefter får du en pris.",
            "En standard AI-sekretær er typisk live og testet inden for én til to uger. Du skal ikke have teknisk viden: vi bygger, hoster og vedligeholder det hele, mens du fortsætter med at bruge din mail og kalender, præcis som du plejer.",
          ],
        },
        {
          heading: "Næste skridt",
          paragraphs: [
            "Vil du vide, hvad en AI-sekretær konkret ville koste for din virksomhed? Book en gratis og uforpligtende snak nedenfor, så regner vi på det sammen — uden bureau-overhead og uden account managers.",
          ],
        },
      ],
    },
    en: {
      title: "What does an AI secretary cost in Denmark? 2026 guide",
      description:
        "A clear look at what an AI secretary costs in Denmark — the pricing model, what drives the price, and how it compares to hiring.",
      sections: [
        {
          paragraphs: [
            "An AI secretary in Denmark typically costs a one-time setup fee plus a fixed monthly amount for running and maintenance — far less than hiring an employee, and with no raises, holidays, or sick days. The exact price depends on how much you want to automate. Here's what sits behind the number, and how to work out whether it pays off for your business.",
          ],
        },
        {
          heading: "What does an AI secretary typically cost?",
          paragraphs: [
            "The price almost always splits into two parts: a one-time fee to build and configure the system, and a monthly subscription covering operation, monitoring, and ongoing adjustments. The setup fee reflects the complexity of what's built; the subscription reflects how much it takes to keep it running afterwards.",
            "At DinDrift we set the price to your actual need instead of selling a standard package. A simple agent that answers inquiries and books appointments sits at the low end; a solution with several integrations and workflows costs more. You get a concrete quote before you decide — no hidden fees.",
          ],
        },
        {
          heading: "Why a setup fee plus a monthly subscription?",
          paragraphs: [
            "The setup fee covers the actual build: connecting the system to your calendar, email, and other tools, training it in your tone, and testing it thoroughly before it goes live. That's the part that makes the agent yours — not a generic template.",
            "The monthly subscription covers keeping the agent working: monitoring, updates when your tools change, and fine-tuning as you discover new tasks it can take over. That's the difference between a piece of software you have to maintain yourself and a coworker that just runs.",
          ],
        },
        {
          heading: "What affects the price?",
          paragraphs: [
            "Three things move the price most: the number of tasks the agent handles, the number of systems it talks to, and how much human judgement has to be built in. An agent that only answers emails is cheaper than one that also takes phone calls in Danish, books in your calendar, and follows up on no-shows.",
            "Integrations are often the biggest factor. If the agent needs to work with your bookkeeping system, your CRM, and your calendar at once, that takes more setup than a single, contained task. That's why most businesses start with one clear time-waster and expand from there.",
          ],
        },
        {
          heading: "AI secretary vs. hiring: which pays off?",
          paragraphs: [
            "A full-time secretary in Denmark typically costs 30,000–40,000 DKK a month in total salary cost, before holiday pay, pension, and onboarding. An AI secretary costs a fraction of that — and works around the clock, including outside business hours.",
            "An illustrative calculation (not a guarantee): if an agent saves you two hours of admin a day, that's roughly 44 hours a month you can spend on billable work instead. For many owner-led businesses that's the real win — not just the lower cost, but the hours freed up.",
          ],
        },
        {
          heading: "Is it expensive to get started?",
          paragraphs: [
            "The conversation itself costs nothing. We always start with a free, no-obligation chat where we find your biggest time-wasters and assess what can realistically be automated — and what isn't worth it. Only then do you get a price.",
            "A standard AI secretary is typically live and tested within one to two weeks. You don't need technical knowledge: we build, host, and maintain everything while you keep using your email and calendar exactly as before.",
          ],
        },
        {
          heading: "Next step",
          paragraphs: [
            "Want to know what an AI secretary would actually cost for your business? Book a free, no-obligation chat below and we'll work it out together — no agency overhead, no account managers.",
          ],
        },
      ],
    },
  },
  {
    slug: "llm-seo-bliv-fundet-i-chatgpt-og-gemini",
    date: "2026-06-04",
    da: {
      title: "LLM SEO: Sådan bliver din virksomhed fundet i ChatGPT og Gemini",
      description:
        "Dine kunder googler ikke længere — de spørger ChatGPT, Gemini og Perplexity. Sådan optimerer du dit indhold, så AI-søgemaskinerne anbefaler netop din virksomhed.",
      sections: [
        {
          paragraphs: [
            "Flere og flere danskere starter ikke deres søgning på Google, men i ChatGPT, Gemini, Perplexity eller Google AI Overviews. De skriver ikke længere blot \"tandlæge Aalborg\" — de spørger \"hvilken tandlæge i Aalborg er bedst til angste patienter?\" og får ét samlet svar med konkrete anbefalinger. Spørgsmålet er, om din virksomhed er den, der bliver nævnt.",
            "Det er præcis, hvad LLM SEO — også kaldet GEO, Generative Engine Optimization — handler om: at gøre dit indhold synligt og citerbart for de store sprogmodeller, så de anbefaler dig, når en potentiel kunde spørger.",
          ],
        },
        {
          heading: "Hvorfor klassisk SEO ikke er nok længere",
          paragraphs: [
            "Klassisk SEO handler om at rangere højt på en liste af links. Men når en AI svarer, ser brugeren sjældent listen — den ser ét svar. Hvis din virksomhed ikke indgår i det svar, eksisterer du reelt ikke for den kunde, uanset hvor god din hjemmeside er.",
            "AI-modeller udvælger deres svar ud fra indhold, de kan forstå, stole på og citere. Det belønner tydelig struktur, konkrete fakta og sprog, der direkte besvarer rigtige spørgsmål — ikke keyword-proppet marketingtekst.",
          ],
        },
        {
          heading: "Hvad der gør indhold AI-venligt",
          paragraphs: [
            "Tre ting flytter mest: struktur, klarhed og tillid. Struktureret data (schema) og et tydeligt FAQ-format gør det nemt for modellen at udtrække svar. Klart sprog, der besvarer ét spørgsmål ad gangen, gør dit indhold nemt at citere. Og tillidssignaler — som CVR, lokation, anmeldelser og konsistente oplysninger på tværs af nettet — gør, at modellen tør anbefale dig.",
            "I praksis betyder det FAQ-sektioner, der besvarer de spørgsmål kunderne faktisk stiller, korte og præcise afsnit, og teknisk markup, der fortæller AI'en, hvem du er, hvad du tilbyder, og hvor du opererer.",
          ],
        },
        {
          heading: "Sådan arbejder DinDrifts LLM SEO Optimizer",
          paragraphs: [
            "Vi optimerer dit indhold til ChatGPT, Gemini og Perplexity, tilføjer struktureret data og FAQ-schema, og omskriver dine vigtigste sider, så de er citerbare for AI. Derefter overvåger vi løbende, hvordan og hvornår din virksomhed bliver nævnt i AI-svar — så du kan se effekten, ikke bare tro på den.",
            "Det er den samme logik som almindelig SEO, men målrettet den måde, dine kunder rent faktisk søger på i 2026.",
          ],
        },
        {
          heading: "Kom i gang",
          paragraphs: [
            "Vil du vide, om din virksomhed allerede bliver nævnt — eller overset — af ChatGPT og Gemini? Book en gratis og uforpligtende snak, så tjekker vi det sammen og finder de hurtigste gevinster for dig.",
          ],
        },
      ],
    },
    en: {
      title: "LLM SEO: How to get your business found in ChatGPT and Gemini",
      description:
        "Your customers no longer just google — they ask ChatGPT, Gemini, and Perplexity. Here's how to optimise your content so AI search engines recommend your business.",
      sections: [
        {
          paragraphs: [
            "More and more people no longer start their search on Google, but in ChatGPT, Gemini, Perplexity, or Google AI Overviews. They no longer just type \"dentist Aalborg\" — they ask \"which dentist in Aalborg is best for anxious patients?\" and get a single answer with concrete recommendations. The question is whether your business is the one that gets named.",
            "That's exactly what LLM SEO — also called GEO, Generative Engine Optimization — is about: making your content visible and citable to the large language models so they recommend you when a potential customer asks.",
          ],
        },
        {
          heading: "Why classic SEO is no longer enough",
          paragraphs: [
            "Classic SEO is about ranking high in a list of links. But when an AI answers, the user rarely sees the list — they see one answer. If your business isn't part of that answer, you effectively don't exist for that customer, no matter how good your website is.",
            "AI models choose their answers from content they can understand, trust, and cite. That rewards clear structure, concrete facts, and language that directly answers real questions — not keyword-stuffed marketing copy.",
          ],
        },
        {
          heading: "What makes content AI-friendly",
          paragraphs: [
            "Three things move the needle most: structure, clarity, and trust. Structured data (schema) and a clear FAQ format make it easy for the model to extract answers. Clear language that answers one question at a time makes your content easy to cite. And trust signals — like a company registration, location, reviews, and consistent details across the web — make the model confident enough to recommend you.",
            "In practice that means FAQ sections answering the questions customers actually ask, short and precise paragraphs, and technical markup that tells the AI who you are, what you offer, and where you operate.",
          ],
        },
        {
          heading: "How DinDrift's LLM SEO Optimizer works",
          paragraphs: [
            "We optimise your content for ChatGPT, Gemini, and Perplexity, add structured data and FAQ schema, and rewrite your most important pages so they're citable by AI. Then we continuously monitor how and when your business is mentioned in AI answers — so you can see the impact, not just hope for it.",
            "It's the same logic as ordinary SEO, but aimed at the way your customers actually search in 2026.",
          ],
        },
        {
          heading: "Get started",
          paragraphs: [
            "Want to know whether your business is already being mentioned — or overlooked — by ChatGPT and Gemini? Book a free, no-obligation chat and we'll check it together and find the quickest wins for you.",
          ],
        },
      ],
    },
  },
  {
    slug: "ai-leadgenerering-pipeline-der-aldrig-loeber-toer",
    date: "2026-06-04",
    da: {
      title: "AI-leadgenerering: En pipeline der aldrig løber tør",
      description:
        "Hold op med at jage kunder manuelt. Sådan finder, kvalificerer og kontakter en AI-leadgenerator nye kunder automatisk — og holder din salgspipeline fuld.",
      sections: [
        {
          paragraphs: [
            "For de fleste små virksomheder er leadgenerering det første, der ryger, når der er travlt — og det første, man savner, når der er stille. Resultatet er en pipeline, der svinger mellem overfyldt og helt tom. En AI-leadgenerator løser præcis det problem ved at gøre kundeopsøgning til en automatisk, kontinuerlig proces.",
          ],
        },
        {
          heading: "Hvad en AI-leadgenerator faktisk gør",
          paragraphs: [
            "En leadgenerator er ikke bare en kontaktliste. Det er en AI-agent, der finder potentielle kunder ud fra dine kriterier, kvalificerer dem, så du ikke spilder tid på dårlige match, og kontakter dem med en personlig besked i din tone — ikke en generisk skabelon.",
            "Derefter følger den op, indtil der kommer et svar, og lægger de varme leads direkte i dit CRM, klar til at du tager over. Du bruger din tid på samtaler med folk, der allerede har vist interesse — ikke på koldt benarbejde.",
          ],
        },
        {
          heading: "Hvorfor automatisk slår manuelt",
          paragraphs: [
            "Manuel leadgenerering er dyr, ujævn og afhængig af, at nogen har tid. En agent arbejder hver dag, uden at blive træt, distraheret eller demotiveret af afvisninger. Den tester systematisk, hvilke beskeder der virker, og bliver bedre over tid.",
            "Vigtigst af alt giver det forudsigelighed: i stedet for at vente på, at kunder selv finder dig, fylder du toppen af tragten konstant — så omsætningen ikke afhænger af held eller af, hvor travlt du har.",
          ],
        },
        {
          heading: "Bygget til din virksomhed",
          paragraphs: [
            "DinDrifts Leadgenerator skræddersys til din branche, dine ideelle kunder og dine systemer. Vi definerer sammen, hvem et godt lead er for dig, bygger outreach i din tone, og kobler agenten sammen med dit CRM, så intet falder mellem to stole.",
            "Som med alle vores agenter er der ingen standardpakke — kun en løsning bygget til den måde, du sælger på.",
          ],
        },
        {
          heading: "Kom i gang",
          paragraphs: [
            "Vil du have en pipeline, der fylder sig selv? Book en gratis og uforpligtende snak, så finder vi ud af, hvor mange kvalificerede leads din virksomhed realistisk kan nå hver måned.",
          ],
        },
      ],
    },
    en: {
      title: "AI lead generation: a pipeline that never runs dry",
      description:
        "Stop chasing customers manually. Here's how an AI leads generator finds, qualifies, and contacts new customers automatically — and keeps your sales pipeline full.",
      sections: [
        {
          paragraphs: [
            "For most small businesses, lead generation is the first thing to go when things get busy — and the first thing you miss when things go quiet. The result is a pipeline that swings between overflowing and completely empty. An AI leads generator solves exactly that by turning prospecting into an automatic, continuous process.",
          ],
        },
        {
          heading: "What an AI leads generator actually does",
          paragraphs: [
            "A leads generator isn't just a contact list. It's an AI agent that finds potential customers based on your criteria, qualifies them so you don't waste time on poor matches, and contacts them with a personal message in your tone — not a generic template.",
            "It then follows up until there's a reply, and drops the warm leads straight into your CRM, ready for you to take over. You spend your time talking to people who've already shown interest — not on cold legwork.",
          ],
        },
        {
          heading: "Why automatic beats manual",
          paragraphs: [
            "Manual lead generation is expensive, uneven, and dependent on someone having the time. An agent works every day, without getting tired, distracted, or demotivated by rejection. It systematically tests which messages work and improves over time.",
            "Most importantly, it brings predictability: instead of waiting for customers to find you, you fill the top of the funnel constantly — so revenue doesn't depend on luck or on how busy you are.",
          ],
        },
        {
          heading: "Built for your business",
          paragraphs: [
            "DinDrift's Leads Generator is tailored to your industry, your ideal customers, and your systems. Together we define what a good lead looks like for you, build outreach in your tone, and connect the agent to your CRM so nothing falls through the cracks.",
            "As with all our agents, there's no standard package — only a solution built for the way you sell.",
          ],
        },
        {
          heading: "Get started",
          paragraphs: [
            "Want a pipeline that fills itself? Book a free, no-obligation chat and we'll work out how many qualified leads your business can realistically reach each month.",
          ],
        },
      ],
    },
  },
]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
