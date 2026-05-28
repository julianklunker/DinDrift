# DinDrift — Project Handoff

> Read this file at the start of every new session to get up to speed instantly.

---

## What This Is

DinDrift is Julian Zachar-Fink's personal AI automation agency website. It is a **Next.js 16 single-page site** (Danish-first, English toggle) showcasing his AI agent services, about section, contact form, a floating AI chatbot, and an aurora-effect "imagination is the limit" section.

**Live dev URL:** `http://localhost:3000` (run `npm run dev` from the project root)

---

## Owner / Contact

| Field | Value |
|---|---|
| Name | Julian Zachar-Fink |
| Email | julianzacharfink@gmail.com |
| CVR | 43486489 |
| Location | Copenhagen, Denmark |
| GitHub | julianklunker |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.1.7 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based config in `app/globals.css`) |
| UI library | shadcn/ui (`components.json`, `@/components/ui`) |
| Animations | `motion/react` v12 — **not** `framer-motion` |
| Theme | `next-themes`, forced `light` mode |
| i18n | Custom React Context (`lib/LanguageContext.tsx`) — DA/EN |
| Contact form | `@emailjs/browser` |
| AI chatbot | `@anthropic-ai/sdk`, server-side API route |
| Aurora shader | `@paper-design/shaders-react` (`MeshGradient`) |

---

## File Map

```
app/
  layout.tsx          — LanguageProvider + ThemeProvider, fonts, metadata
  page.tsx            — Composes all sections + Chatbot
  globals.css         — Tailwind v4 config, CSS variables
  api/chat/route.ts   — Claude API endpoint (POST /api/chat)

components/
  layout/
    Navbar.tsx        — Fixed top nav, language toggle, scroll links
    Footer.tsx        — Copyright, CVR, LinkedIn
  sections/
    Hero.tsx          — TextRotate + Floating images + 2 CTA buttons
    Solutions.tsx     — 7 service cards grid
    Custom.tsx        — Aurora MeshGradient "imagination is the limit" section
    About.tsx         — Bio, tech stack, stats, LinkedIn
    Contact.tsx       — EmailJS contact form
  ui/
    text-rotate.tsx           — Animated rotating text component
    parallax-floating.tsx     — Mouse-parallax floating image layer
    apple-tahoe-liquid-glass-button.tsx — GlassButton with SVG displacement map
  Chatbot.tsx         — Floating chatbot widget (fixed bottom-right)

lib/
  translations.ts     — All DA/EN strings (nav, hero, solutions, custom, about, contact, footer)
  LanguageContext.tsx — LanguageProvider + useLanguage() hook

hooks/
  use-mouse-position-ref.ts — Mouse position ref for parallax
```

---

## Services (7 total)

| Key | DA Title | EN Title | Category |
|---|---|---|---|
| secretary | Sekretær Agent | Secretary Agent | Administration |
| economy | Økonomiansvarlig Agent | Economy Manager Agent | Finance |
| chatbot | Hjemmeside Chatbot | Website Chatbot | Customer Service |
| email | E-mail Assistent | Email Assistant | Communication |
| noshow | No-show Opfølgning | No-show Follow-up | Follow-up |
| meetingbooker | Mødebooker Agent | Meeting Booker Agent | Scheduling |
| googlereviews | Google Anmeldelser Agent | Google Reviews Agent | Reputation |

---

## Key Environment Variables

```bash
# Required for chatbot AI responses (server-side, not exposed to browser)
ANTHROPIC_API_KEY=sk-ant-...

# Required for contact form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Create `.env.local` in the project root with these values.

---

## Important Technical Notes

- **All motion imports** must come from `motion/react` — the project has the `motion` package (v12), not `framer-motion`
- **Tailwind v4** uses CSS-based config — no `tailwind.config.ts` file
- **Brand colour:** `#0015ff`
- **Language default:** Danish (`'da'`)
- **Chatbot fallback:** If `ANTHROPIC_API_KEY` is missing, the bot returns a polite "contact Julian via email" message
- **MeshGradient** needs explicit pixel dimensions — track with `useState`/`useEffect` on `window.innerWidth/Height`

---

## Commands

```bash
npm run dev          # Start dev server (Turbopack) → localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
```

---

## Current Status

- ✅ Full website live and functional
- ✅ DA/EN language toggle
- ✅ Contact form (needs EmailJS env vars to send)
- ✅ Floating AI chatbot (needs ANTHROPIC_API_KEY to use Claude)
- ✅ Aurora effect on Custom section
- ✅ 7 service cards including Google Reviews Agent
- ⬜ EmailJS template not yet configured (Julian needs to set up at emailjs.com)
- ⬜ ANTHROPIC_API_KEY not yet added to production

---

## Recent Session History

See `MEMORY.md` for session-by-session log.
