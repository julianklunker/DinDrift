// Bilingual FAQ content. Drives both the /faq page and its FAQPage JSON-LD,
// so the visible Q&A and the structured data can never drift apart.
// The add-faq skill appends new items here.

export interface FaqItem {
  da: { q: string; a: string }
  en: { q: string; a: string }
}

export const faqs: FaqItem[] = [
  {
    da: {
      q: "Hvad er en AI-agent?",
      a: "En AI-agent er en digital medarbejder, der selvstændigt udfører opgaver for din virksomhed — fx svarer på kundehenvendelser, booker møder, følger op på e-mails eller bogfører. I modsætning til en simpel chatbot handler den i din tone og på tværs af dine systemer.",
    },
    en: {
      q: "What is an AI agent?",
      a: "An AI agent is a digital employee that independently performs tasks for your business — answering customer inquiries, booking meetings, following up on emails, or doing bookkeeping. Unlike a simple chatbot, it acts in your tone and across your systems.",
    },
  },
  {
    da: {
      q: "Hvilke opgaver kan DinDrifts AI-agenter løse?",
      a: "Vi tilbyder blandt andet en sekretær-agent (aftaler og påmindelser), en økonomi-agent (bogføring og rapporter), en hjemmeside-chatbot (svar 24/7), en e-mail assistent, no-show opfølgning, en mødebooker og en Google-anmeldelser-agent. Har du en anden opgave, bygger vi en skræddersyet agent.",
    },
    en: {
      q: "What tasks can DinDrift's AI agents handle?",
      a: "We offer a secretary agent (scheduling and reminders), a finance agent (bookkeeping and reports), a website chatbot (24/7 replies), an email assistant, no-show follow-up, a meeting booker, and a Google reviews agent. Have a different task? We build a custom agent for it.",
    },
  },
  {
    da: {
      q: "Hvad koster det?",
      a: "Der er 0 kr. i opstart. Prisen afhænger af, hvilke agenter du har brug for, og hvad de skal kunne. Du får et konkret tilbud efter en gratis og uforpligtende snak — ingen skjulte gebyrer og intet bureau-overhead.",
    },
    en: {
      q: "What does it cost?",
      a: "There is no setup fee. Pricing depends on which agents you need and what they should do. You get a concrete quote after a free, no-obligation chat — no hidden fees and no agency overhead.",
    },
  },
  {
    da: {
      q: "Hvor hurtigt kan I komme i gang?",
      a: "De fleste agenter kan være klar på få dage. Vi starter med at finde dine største tidsrøvere og bygger den agent, der fjerner dem først.",
    },
    en: {
      q: "How fast can you get started?",
      a: "Most agents can be ready in a few days. We start by finding your biggest time-wasters and build the agent that removes them first.",
    },
  },
  {
    da: {
      q: "Skal jeg kunne kode?",
      a: "Nej. Vi bygger, opsætter og vedligeholder agenterne for dig. Du skal bare fortælle os, hvad de skal hjælpe med.",
    },
    en: {
      q: "Do I need to know how to code?",
      a: "No. We build, set up, and maintain the agents for you. You just tell us what they should help with.",
    },
  },
  {
    da: {
      q: "Hvordan håndterer I mine data og GDPR?",
      a: "Vi behandler kun de data, der er nødvendige for at løse opgaven, og i overensstemmelse med GDPR (forordning 2016/679). Dine oplysninger opbevares sikkert og videregives ikke til tredjepart uden grundlag. Du kan til enhver tid bede om indsigt eller sletning.",
    },
    en: {
      q: "How do you handle my data and GDPR?",
      a: "We only process the data needed to perform the task, in accordance with GDPR (Regulation 2016/679). Your information is stored securely and not shared with third parties without a legal basis. You can request access or deletion at any time.",
    },
  },
  {
    da: {
      q: "Virker det med mine nuværende systemer?",
      a: "Ja, i de fleste tilfælde. Agenterne kan integreres med almindelige værktøjer til kalender, e-mail, booking og økonomi. Vi afklarer dine systemer i den indledende snak.",
    },
    en: {
      q: "Does it work with my current systems?",
      a: "Yes, in most cases. The agents can integrate with common calendar, email, booking, and accounting tools. We map your systems during the initial chat.",
    },
  },
  {
    da: {
      q: "Binder jeg mig til en lang kontrakt?",
      a: "Nej. Vi tror på, at løsningen skal bevise sit værd. Du kan prøve en agent uden lang binding — kontakt os for de aktuelle vilkår.",
    },
    en: {
      q: "Am I locked into a long contract?",
      a: "No. We believe the solution should prove its worth. You can try an agent without a long commitment — contact us for current terms.",
    },
  },
  {
    da: {
      q: "Hvordan kommer jeg i gang?",
      a: "Udfyld kontaktformularen eller skriv til dindriftai@gmail.com. Vi vender tilbage inden for 24 timer med en gratis og uforpligtende snak om, hvad AI-automatisering kan gøre for netop din virksomhed.",
    },
    en: {
      q: "How do I get started?",
      a: "Fill out the contact form or email dindriftai@gmail.com. We reply within 24 hours with a free, no-obligation chat about what AI automation can do for your business.",
    },
  },
]
