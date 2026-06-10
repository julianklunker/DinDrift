export type Language = "da" | "en"

export const translations = {
  da: {
    nav: {
      solutions: "Løsninger",
      about: "Om os",
      pricing: "Priser",
      cases: "Cases",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
    },
    booking: {
      cta: "Book et gratis møde",
      kontaktHeading: "Eller book direkte i kalenderen",
      kontaktSub: "Vælg et tidspunkt der passer dig — 30 min, gratis og uforpligtende.",
    },
    hero: {
      prefix: "Din nye AI",
      rotatingTexts: [
        "Medarbejder",
        "Sekretær",
        "Bogholder",
        "Chatbot",
        "Leadgenerator",
      ],
      subtext:
        "Skræddersyede AI-agenter, der overtager rutinearbejdet — mails, booking, bogføring og kundeservice — samlet i ét dashboard, du selv styrer. Spar timevis hver uge.",
      guarantee: "Første måned gratis · Ingen binding · Tilfreds — ellers betaler du ikke",
      btnSolutions: "Se løsninger",
      btnContact: "Kontakt os",
    },
    solutions: {
      eyebrow: "Hvad vi tilbyder",
      heading: "AI-løsninger til din virksomhed",
      subtext:
        "Vælg den løsning der passer til dine behov — eller kombiner flere for fuld automatisering.",
      expandHint: "Læs mere",
      videoSoon: "Forklarende video kommer snart",
      cards: [
        {
          key: "secretary",
          category: "Administration",
          title: "Sekretær Agent",
          description:
            "Håndterer aftaleplanlægning, påmindelser og korrespondance automatisk. Aldrig gå glip af en aftale igen.",
          deepDescription:
            "Sekretær Agenten fungerer som din digitale administrative medarbejder, der arbejder 24/7. Den modtager henvendelser, finder ledige tider i din kalender og booker aftaler — helt uden din indblanding.\n\nUnder motorhjelmen synkroniserer den med dit eksisterende kalendersystem og sender automatiske påmindelser til både dig og dine kunder, så ingen aftaler glipper. Den følger op på ubekræftede bookinger og omrokerer ved aflysninger.\n\nResultatet: færre dobbeltbookinger, færre udeblivelser og timevis af administrativt arbejde fjernet fra din hverdag hver uge.",
          capabilities: [
            "Automatisk aftalebooking",
            "Påmindelser til kunder & dig",
            "Kalendersynkronisering",
            "Svar på henvendelser",
            "Opfølgning på aftaler",
          ],
        },
        {
          key: "economy",
          category: "Økonomi",
          title: "Økonomiansvarlig Agent",
          description:
            "Automatisk bogføring, udgiftssporing og finansielle rapporter. Hold styr på din økonomi uden manuel indsats.",
          deepDescription:
            "Økonomiansvarlig Agenten holder styr på din virksomheds tal, så du slipper for at samle bilag og taste manuelt. Den registrerer indtægter og udgifter løbende og kategoriserer hver postering korrekt.\n\nDen integrerer med dit regnskabssystem og genererer overskuelige månedsrapporter, så du altid ved præcis, hvor du står. Uregelmæssigheder bliver flaget, før de bliver til problemer.\n\nResultatet: et altid opdateret økonomisk overblik, mindre revisorregning og fuld ro i maven ved kvartalsafslutning.",
          capabilities: [
            "Automatisk kategorisering",
            "Månedlige økonomirapporter",
            "Udgiftssporing i realtid",
            "Faktureringsoversigt",
            "Integration med regnskabssystemer",
          ],
        },
        {
          key: "chatbot",
          category: "Kundeservice",
          title: "Hjemmeside Chatbot",
          description:
            "En AI-chatbot integreret direkte på din hjemmeside, der svarer på kundehenvendelser 24/7 — uden ventetid.",
          deepDescription:
            "Chatbotten bor direkte på din hjemmeside og besvarer kundernes spørgsmål med det samme — uanset om klokken er 14 eller 3 om natten. Den trænes på dit indhold, dine priser og dine processer, så svarene altid er korrekte.\n\nNår en henvendelse er for kompleks, viderestiller den problemfrit til dig med fuld kontekst, så kunden ikke skal gentage sig selv. Den taler flere sprog og matcher din brandtone.\n\nResultatet: kortere svartider, flere konverterede besøgende og et supportteam, der aldrig sover.",
          capabilities: [
            "24/7 kundesupport",
            "Besvarer FAQ automatisk",
            "Viderestiller komplekse sager",
            "Tilpasset din brandtone",
            "Flersproget support",
          ],
        },
        {
          key: "email",
          category: "Kommunikation",
          title: "E-mail Assistent",
          description:
            "Læser og besvarer indgående e-mails automatisk i dit brands tone og stil. Du modtager kun dem, der kræver din opmærksomhed.",
          deepDescription:
            "E-mail Assistenten læser hver indkommende mail, forstår intentionen og udarbejder et svar i din tone — klar til afsendelse eller sendt helt automatisk for rutinehenvendelser.\n\nDen sorterer og prioriterer din indbakke, så de vigtige mails ligger øverst, og det støjende filtreres fra. Den integrerer direkte med Gmail eller Outlook uden at ændre din arbejdsgang.\n\nResultatet: en indbakke der passer sig selv, hurtigere svar til dine kunder og timer tilbage til det arbejde, kun du kan udføre.",
          capabilities: [
            "Automatisk e-mail-sortering",
            "Intelligente svarskabeloner",
            "Prioritering af vigtige mails",
            "Brandtilpasset kommunikation",
            "Integration med din indbakke",
          ],
        },
        {
          key: "noshow",
          category: "Opfølgning",
          title: "No-show Opfølgning",
          description:
            "Automatisk opfølgning på udeblevne kunder med venlige påmindelser og nemme genbestillingsmuligheder. Reducer tabte aftaler.",
          deepDescription:
            "No-show Agenten opdager automatisk, når en kunde ikke møder op, og sætter straks en venlig opfølgning i gang via SMS eller e-mail — uden at det føles påtrængende.\n\nHver besked indeholder et direkte link til at booke en ny tid, så kunden nemt kommer tilbage i kalenderen. Du får samtidig statistik over udeblivelser og mønstre over tid.\n\nResultatet: færre tomme tider, genvundet omsætning fra ellers tabte aftaler og kunder, der føler sig set frem for glemt.",
          capabilities: [
            "Automatisk no-show detektion",
            "Venlige SMS/e-mail påmindelser",
            "Nem genbestillings-link",
            "Statistik over udeblivelser",
            "Personaliserede beskeder",
          ],
        },
        {
          key: "meetingbooker",
          category: "Planlægning",
          title: "Mødebooker Agent",
          description:
            "Booker møder automatisk baseret på deltagernes tilgængelighed. Fra første henvendelse til bekræftet kalenderinvitation — helt uden manuel indsats.",
          deepDescription:
            "Mødebooker Agenten overtager hele frem-og-tilbage-dialogen om at finde et tidspunkt, der passer alle. Den læser deltagernes tilgængelighed, foreslår tider og sender en bekræftet kalenderinvitation.\n\nDen håndterer tidszoner, sender påmindelser inden mødet og omrokerer automatisk ved aflysninger — uden at du rører en finger. Alt synkroniseres med din eksisterende kalender.\n\nResultatet: ingen mailtråde om mødetidspunkter, færre aflyste møder og en booking-oplevelse, der får dig til at fremstå professionel.",
          capabilities: [
            "Automatisk mødeplanlægning",
            "Kalenderintegration",
            "Bekræftelse og påmindelser",
            "Håndtering af aflysninger",
            "Tidszoneopmærksomhed",
          ],
        },
        {
          key: "googlereviews",
          category: "Omdømme",
          title: "Google Anmeldelser Agent",
          description:
            "Automatisér din virksomheds Google-anmeldelser — send opfølgninger til tilfredse kunder, svar på anmeldelser og hold dit omdømme opdateret uden løftefingerén.",
          deepDescription:
            "Google Anmeldelser Agenten beder automatisk dine tilfredse kunder om en anmeldelse på det helt rigtige tidspunkt — lige efter en god oplevelse — via personaliseret SMS eller e-mail.\n\nNår nye anmeldelser kommer ind, udarbejder den gennemtænkte svar i din tone, både på ros og kritik, så din profil altid fremstår aktiv og professionel. Den overvåger løbende for nyt feedback.\n\nResultatet: flere og bedre anmeldelser, højere placering i lokale søgninger og et stærkere omdømme, der vinder nye kunder for dig.",
          capabilities: [
            "Automatisk anmodning om anmeldelser",
            "Personaliserede opfølgnings-SMS/e-mail",
            "AI-genererede svar på anmeldelser",
            "Overvågning af nyt feedback",
            "Rapport over anmeldelsestrends",
          ],
        },
        {
          key: "llmseo",
          category: "SEO",
          title: "LLM SEO Optimering",
          description:
            "Gør din virksomhed synlig i ChatGPT, Gemini og Google AI. Vi optimerer dit indhold, så AI-søgemaskiner anbefaler dig, når kunderne spørger.",
          deepDescription:
            "Flere og flere kunder spørger ChatGPT, Gemini og Perplexity om anbefalinger frem for at google. LLM SEO Optimering sikrer, at det er din virksomhed, AI'en nævner, når den bliver spurgt.\n\nVi strukturerer dit indhold med schema-data, citerbare svar og FAQ-formater, som sprogmodellerne foretrækker at trække på. Derefter overvåger vi løbende, hvordan din virksomhed omtales i AI-svar.\n\nResultatet: synlighed i den nye generation af søgning (GEO), kvalificeret trafik fra AI-værktøjer og et forspring, før dine konkurrenter opdager kanalen.",
          capabilities: [
            "Optimering til ChatGPT, Gemini & Perplexity",
            "Struktureret data & FAQ-schema",
            "AI-venligt, citerbart indhold",
            "Synlighed i AI-svar (GEO)",
            "Løbende overvågning af AI-omtaler",
          ],
        },
        {
          key: "leadsgen",
          category: "Vækst",
          title: "Leadgenerator",
          description:
            "En AI-agent der finder, kvalificerer og kontakter potentielle kunder automatisk — så din pipeline aldrig løber tør.",
          deepDescription:
            "Leadgeneratoren arbejder som en utrættelig sælger: den finder potentielle kunder, der matcher din ideelle profil, og kvalificerer dem, før de når dit bord.\n\nDen sender personaliseret outreach, følger op automatisk indtil der kommer svar, og lægger varme leads direkte i dit CRM. Du bruger kun tid på de samtaler, der reelt kan lukkes.\n\nResultatet: en pipeline der fylder sig selv, lavere kundeanskaffelsesomkostning og forudsigelig vækst måned efter måned.",
          capabilities: [
            "Automatisk leadindsamling",
            "Kvalificering af leads",
            "Personaliseret outreach",
            "CRM-integration",
            "Opfølgning indtil svar",
          ],
        },
      ],
    },
    custom: {
      eyebrow: "Skræddersyede løsninger",
      heading: "Fantasien er grænsen.",
      subtext:
        "Enhver virksomhed har unikke behov — og vi bygger præcis den AI-agent, der løser dem. Ingen standardpakke. Ingen kompromiser. Bare en bot bygget specifikt til dig.",
      pillars: [
        {
          title: "Enhver branche",
          description: "Fra tandlæger til tømrere — vi bygger til alle sektorer.",
        },
        {
          title: "Enhver opgave",
          description: "Hvis du kan beskrive det, kan vi automatisere det.",
        },
        {
          title: "Fuldt skræddersyet",
          description: "Din tone, dine regler, dine systemer — integreret fra dag ét.",
        },
      ],
      cta: "Fortæl os om din idé",
    },
    controlSystem: {
      eyebrow: "Vores flagskib",
      title: "Skræddersyet AI-kontrolsystem",
      description:
        "Dine AI-agenter arbejder døgnet rundt — dit dashboard viser dig hvad de laver, hvad de sparer dig, og hvor du kan skrue op. Ét kommandocenter, bygget om din virksomhed, ikke en skabelon. Det får du ikke hos andre.",
      features: [
        { title: "Alle agenter, ét dashboard", description: "Sekretær, bogholder, chatbot og resten — samlet ét sted." },
        { title: "Overblik i realtid", description: "Følg hver agents aktivitet og resultater, mens det sker." },
        { title: "Bygget om din arbejdsgang", description: "Tilpasset dine systemer, regler og processer fra dag ét." },
        { title: "Skalér efter behov", description: "Tilføj nye agenter og kapacitet, når din virksomhed vokser." },
      ],
      cta: "Book en gennemgang",
      seeDetails: "Se detaljer",
    },
    about: {
      eyebrow: "Om mig",
      heading: "Hej, jeg er Julian.",
      subheading: "Zachar-Fink.",
      p1: "Jeg er en selvstændig full-stack udvikler baseret i Aalborg, med passion for at omsætte idéer til præcisionskonstruerede digitale produkter. Jeg designer og bygger skræddersyede AI-automatiseringsagenter og AI-drevne løsninger — alt sammen skabt til at give reel værdi for din virksomhed.",
      p2: "Jeg arbejder direkte med dig — ingen account managers, intet bureau-overhead, ingen videregivelse. Hvert projekt holdes lean, fokuseret og personligt. Fra første samtale til endelig levering behandler jeg dine mål som mine egne.",
      techLabel: "Tech stack",
      linkedinBtn: "Forbind på LinkedIn",
      availableLabel: "Tilgængelig for nye projekter",
      locationLabel: "Aalborg, Danmark",
      cvrLabel: "CVR: 43486489",
      stats: [
        { label: "Lokation", value: "Aalborg, DK" },
        { label: "Rolle", value: "Full-Stack Dev" },
        { label: "Tilgang", value: "Direkte linje" },
      ],
    },
    contact: {
      eyebrow: "Kom i kontakt",
      heading: "Lad os bygge noget fantastisk.",
      subtext:
        "Har du et projekt i tankerne? Send en besked, og jeg vender tilbage inden for 24 timer.",
      infoItems: [
        { label: "E-mail", value: "dindriftai@gmail.com" },
        { label: "Telefon", value: "+45 29 72 26 04" },
        { label: "Lokation", value: "Aalborg, Danmark" },
        { label: "Svartid", value: "Inden for 24 timer" },
      ],
      form: {
        namePlaceholder: "Dit navn",
        emailPlaceholder: "Din e-mail",
        messagePlaceholder: "Fortæl mig om dit projekt...",
        sendBtn: "Send besked",
        sendingBtn: "Sender...",
        successMsg: "Tak! Din besked er sendt. Jeg vender tilbage snarest.",
        errorMsg: "Noget gik galt. Prøv venligst igen eller skriv direkte til dindriftai@gmail.com.",
      },
    },
    footer: {
      copyright: "© 2025 Julian Zachar-Fink",
      cvr: "CVR: 43486489",
      linkedin: "LinkedIn",
    },
  },

  en: {
    nav: {
      solutions: "Solutions",
      about: "About",
      pricing: "Pricing",
      cases: "Cases",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
    },
    booking: {
      cta: "Book a free call",
      kontaktHeading: "Or book directly in the calendar",
      kontaktSub: "Pick a time that suits you — 30 min, free and no obligation.",
    },
    hero: {
      prefix: "Your new AI",
      rotatingTexts: [
        "Employee",
        "Secretary",
        "Bookkeeper",
        "Chatbot",
        "Lead Engine",
      ],
      subtext:
        "Tailored AI agents that take over the routine work — email, bookings, bookkeeping and customer service — unified in one dashboard you control. Save hours every week.",
      guarantee: "First month free · No commitment · Happy — or you don't pay",
      btnSolutions: "See solutions",
      btnContact: "Contact us",
    },
    solutions: {
      eyebrow: "What we offer",
      heading: "AI Solutions for your business",
      subtext:
        "Choose the solution that fits your needs — or combine several for full automation.",
      expandHint: "Learn more",
      videoSoon: "Explainer video coming soon",
      cards: [
        {
          key: "secretary",
          category: "Administration",
          title: "Secretary Agent",
          description:
            "Handles appointment scheduling, reminders, and correspondence automatically. Never miss an appointment again.",
          deepDescription:
            "The Secretary Agent acts as your digital administrative assistant, working around the clock. It receives enquiries, finds open slots in your calendar, and books appointments — without you lifting a finger.\n\nUnder the hood it syncs with your existing calendar and sends automatic reminders to both you and your clients, so nothing slips through. It follows up on unconfirmed bookings and reshuffles when cancellations happen.\n\nThe result: fewer double-bookings, fewer no-shows, and hours of admin work removed from your week.",
          capabilities: [
            "Automatic appointment booking",
            "Reminders for clients & you",
            "Calendar synchronisation",
            "Responding to enquiries",
            "Appointment follow-ups",
          ],
        },
        {
          key: "economy",
          category: "Finance",
          title: "Economy Manager Agent",
          description:
            "Automatic bookkeeping, expense tracking, and financial reports. Keep your finances in order without manual effort.",
          deepDescription:
            "The Economy Manager Agent keeps your business numbers in order, so you no longer gather receipts and key in entries by hand. It records income and expenses on the fly and categorises every transaction correctly.\n\nIt integrates with your accounting system and generates clear monthly reports, so you always know exactly where you stand. Irregularities are flagged before they become problems.\n\nThe result: an always up-to-date financial overview, a smaller accountant bill, and real peace of mind at quarter-end.",
          capabilities: [
            "Automatic categorisation",
            "Monthly financial reports",
            "Real-time expense tracking",
            "Invoice overview",
            "Accounting system integration",
          ],
        },
        {
          key: "chatbot",
          category: "Customer Service",
          title: "Website Chatbot",
          description:
            "An AI chatbot integrated directly on your website, answering customer enquiries 24/7 — with no waiting time.",
          deepDescription:
            "The chatbot lives right on your website and answers customer questions instantly — whether it's 2pm or 3am. It's trained on your content, your prices, and your processes, so the answers are always accurate.\n\nWhen an enquiry is too complex, it hands off seamlessly to you with full context, so the customer never has to repeat themselves. It speaks multiple languages and matches your brand tone.\n\nThe result: shorter response times, more converted visitors, and a support team that never sleeps.",
          capabilities: [
            "24/7 customer support",
            "Automatic FAQ responses",
            "Escalates complex cases",
            "Customised to your brand tone",
            "Multilingual support",
          ],
        },
        {
          key: "email",
          category: "Communication",
          title: "Email Assistant",
          description:
            "Reads and responds to incoming emails automatically in your brand's tone and style. You only receive the ones that need your attention.",
          deepDescription:
            "The Email Assistant reads every incoming message, understands the intent, and drafts a reply in your tone — ready to send, or sent fully automatically for routine enquiries.\n\nIt sorts and prioritises your inbox, so the important emails sit on top and the noise is filtered out. It integrates directly with Gmail or Outlook without changing how you work.\n\nThe result: an inbox that looks after itself, faster replies for your customers, and hours handed back for the work only you can do.",
          capabilities: [
            "Automatic email sorting",
            "Intelligent reply templates",
            "Important email prioritisation",
            "Brand-aligned communication",
            "Inbox integration",
          ],
        },
        {
          key: "noshow",
          category: "Follow-up",
          title: "No-show Follow-up",
          description:
            "Automatic follow-up on absent clients with friendly reminders and easy rebooking options. Reduce lost appointments.",
          deepDescription:
            "The No-show Agent automatically detects when a client doesn't turn up and immediately kicks off a friendly follow-up via SMS or email — without it feeling pushy.\n\nEvery message includes a direct link to book a new time, so the client easily lands back in your calendar. You also get statistics on no-shows and patterns over time.\n\nThe result: fewer empty slots, recovered revenue from otherwise lost appointments, and clients who feel seen rather than forgotten.",
          capabilities: [
            "Automatic no-show detection",
            "Friendly SMS/email reminders",
            "Easy rebooking link",
            "No-show statistics",
            "Personalised messages",
          ],
        },
        {
          key: "meetingbooker",
          category: "Scheduling",
          title: "Meeting Booker Agent",
          description:
            "Automatically books meetings based on participants' availability. From first enquiry to confirmed calendar invite — with zero manual effort.",
          deepDescription:
            "The Meeting Booker Agent takes over the entire back-and-forth of finding a time that works for everyone. It reads participants' availability, proposes slots, and sends a confirmed calendar invite.\n\nIt handles time zones, sends reminders before the meeting, and reschedules automatically on cancellations — without you touching a thing. Everything syncs with your existing calendar.\n\nThe result: no email threads about meeting times, fewer cancelled meetings, and a booking experience that makes you look polished.",
          capabilities: [
            "Automatic meeting scheduling",
            "Calendar integration",
            "Confirmations and reminders",
            "Cancellation handling",
            "Timezone awareness",
          ],
        },
        {
          key: "googlereviews",
          category: "Reputation",
          title: "Google Reviews Agent",
          description:
            "Automate your business's Google reviews — send follow-ups to satisfied customers, respond to reviews, and keep your reputation sharp without lifting a finger.",
          deepDescription:
            "The Google Reviews Agent automatically asks your happy customers for a review at exactly the right moment — right after a great experience — via personalised SMS or email.\n\nWhen new reviews arrive, it drafts thoughtful replies in your tone, to both praise and criticism, so your profile always looks active and professional. It continuously monitors for new feedback.\n\nThe result: more and better reviews, a higher ranking in local search, and a stronger reputation that wins new customers for you.",
          capabilities: [
            "Automatic review request outreach",
            "Personalised follow-up SMS/email",
            "AI-generated review responses",
            "New feedback monitoring",
            "Review trend reporting",
          ],
        },
        {
          key: "llmseo",
          category: "SEO",
          title: "LLM SEO Optimizer",
          description:
            "Make your business visible in ChatGPT, Gemini, and Google AI. We optimise your content so AI search engines recommend you when customers ask.",
          deepDescription:
            "More and more customers ask ChatGPT, Gemini, and Perplexity for recommendations instead of googling. LLM SEO Optimization makes sure it's your business the AI names when it's asked.\n\nWe structure your content with schema data, citable answers, and FAQ formats that language models prefer to draw on. Then we continuously monitor how your business is mentioned in AI answers.\n\nThe result: visibility in the new generation of search (GEO), qualified traffic from AI tools, and a head start before your competitors discover the channel.",
          capabilities: [
            "Optimised for ChatGPT, Gemini & Perplexity",
            "Structured data & FAQ schema",
            "AI-friendly, citable content",
            "Visibility in AI answers (GEO)",
            "Ongoing AI-mention monitoring",
          ],
        },
        {
          key: "leadsgen",
          category: "Growth",
          title: "Leads Generator",
          description:
            "An AI agent that finds, qualifies, and contacts potential customers automatically — so your pipeline never runs dry.",
          deepDescription:
            "The Leads Generator works like a tireless salesperson: it finds prospects that match your ideal profile and qualifies them before they reach your desk.\n\nIt sends personalised outreach, follows up automatically until there's a reply, and drops warm leads straight into your CRM. You only spend time on the conversations that can actually close.\n\nThe result: a pipeline that fills itself, lower customer acquisition cost, and predictable growth month after month.",
          capabilities: [
            "Automatic lead sourcing",
            "Lead qualification",
            "Personalised outreach",
            "CRM integration",
            "Follow-up until reply",
          ],
        },
      ],
    },
    custom: {
      eyebrow: "Tailored solutions",
      heading: "The limit is your imagination.",
      subtext:
        "Every business has unique needs — and we build exactly the AI agent that solves them. No standard package. No compromises. Just a bot built specifically for you.",
      pillars: [
        {
          title: "Any industry",
          description: "From dentists to carpenters — we build for every sector.",
        },
        {
          title: "Any task",
          description: "If you can describe it, we can automate it.",
        },
        {
          title: "Fully tailored",
          description: "Your tone, your rules, your systems — integrated from day one.",
        },
      ],
      cta: "Tell us your idea",
    },
    controlSystem: {
      eyebrow: "Our flagship",
      title: "Tailored AI Control System",
      description:
        "Your AI agents work around the clock — your dashboard shows you what they're doing, what they're saving you, and where to scale up. One command center, built around your business, not a template. No one else gives you this.",
      features: [
        { title: "All agents, one dashboard", description: "Secretary, bookkeeper, chatbot and the rest — unified in one place." },
        { title: "Real-time oversight", description: "Track every agent's activity and results as it happens." },
        { title: "Built around your workflow", description: "Shaped to your systems, rules and processes from day one." },
        { title: "Scale on demand", description: "Add new agents and capacity as your business grows." },
      ],
      cta: "Book a walkthrough",
      seeDetails: "See details",
    },
    about: {
      eyebrow: "About me",
      heading: "Hi, I'm Julian.",
      subheading: "Zachar-Fink.",
      p1: "I'm a solo full-stack developer based in Aalborg, with a passion for turning ideas into precision-engineered digital products. I design and build bespoke AI automation agents and AI-powered solutions — all crafted to genuinely perform for your business.",
      p2: "I work directly with you — no account managers, no agency overhead, no handoffs. Every project is kept lean, focused, and personal. From first conversation to final delivery, I treat your goals as my own.",
      techLabel: "Tech stack",
      linkedinBtn: "Connect on LinkedIn",
      availableLabel: "Available for new projects",
      locationLabel: "Aalborg, Denmark",
      cvrLabel: "CVR: 43486489",
      stats: [
        { label: "Location", value: "Aalborg, DK" },
        { label: "Role", value: "Full-Stack Dev" },
        { label: "Approach", value: "Direct Line" },
      ],
    },
    contact: {
      eyebrow: "Get in touch",
      heading: "Let's build something extraordinary.",
      subtext:
        "Have a project in mind? Send a message and I'll get back to you within 24 hours.",
      infoItems: [
        { label: "Email", value: "dindriftai@gmail.com" },
        { label: "Phone", value: "+45 29 72 26 04" },
        { label: "Location", value: "Aalborg, Denmark" },
        { label: "Response time", value: "Within 24 hours" },
      ],
      form: {
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        messagePlaceholder: "Tell me about your project...",
        sendBtn: "Send message",
        sendingBtn: "Sending...",
        successMsg: "Thank you! Your message has been sent. I'll get back to you shortly.",
        errorMsg: "Something went wrong. Please try again or write directly to dindriftai@gmail.com.",
      },
    },
    footer: {
      copyright: "© 2025 Julian Zachar-Fink",
      cvr: "CVR: 43486489",
      linkedin: "LinkedIn",
    },
  },
} as const
