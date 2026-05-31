export type Language = "da" | "en"

export const translations = {
  da: {
    nav: {
      solutions: "Løsninger",
      about: "Om os",
      pricing: "Priser",
      contact: "Kontakt",
    },
    hero: {
      prefix: "Dine nye AI",
      rotatingTexts: [
        "Assistent",
        "Sekretær",
        "Bogholder",
        "Chatbot",
        "Integration",
      ],
      subtext:
        "Intelligente AI-agenter skræddersyet til din virksomhed — automatisér de kedelige opgaver og fokusér på det, der virkelig betyder noget.",
      btnSolutions: "Se løsninger",
      btnContact: "Kontakt os",
    },
    solutions: {
      eyebrow: "Hvad vi tilbyder",
      heading: "AI-løsninger til din virksomhed",
      subtext:
        "Vælg den løsning der passer til dine behov — eller kombiner flere for fuld automatisering.",
      cards: [
        {
          key: "secretary",
          category: "Administration",
          title: "Sekretær Agent",
          description:
            "Håndterer aftaleplanlægning, påmindelser og korrespondance automatisk. Aldrig gå glip af en aftale igen.",
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
          capabilities: [
            "Automatisk anmodning om anmeldelser",
            "Personaliserede opfølgnings-SMS/e-mail",
            "AI-genererede svar på anmeldelser",
            "Overvågning af nyt feedback",
            "Rapport over anmeldelsestrends",
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
      contact: "Contact",
    },
    hero: {
      prefix: "Your new AI",
      rotatingTexts: [
        "Assistant",
        "Secretary",
        "Bookkeeper",
        "Chatbot",
        "Integration",
      ],
      subtext:
        "Intelligent AI agents tailored to your business — automate the tedious tasks and focus on what truly matters.",
      btnSolutions: "See solutions",
      btnContact: "Contact us",
    },
    solutions: {
      eyebrow: "What we offer",
      heading: "AI Solutions for your business",
      subtext:
        "Choose the solution that fits your needs — or combine several for full automation.",
      cards: [
        {
          key: "secretary",
          category: "Administration",
          title: "Secretary Agent",
          description:
            "Handles appointment scheduling, reminders, and correspondence automatically. Never miss an appointment again.",
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
          capabilities: [
            "Automatic review request outreach",
            "Personalised follow-up SMS/email",
            "AI-generated review responses",
            "New feedback monitoring",
            "Review trend reporting",
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
