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

**Website (all complete):**
- ✅ Full website live and functional (`npm run dev` → localhost:3000)
- ✅ DA/EN language toggle
- ✅ Hero: TextRotate (5 terms) + parallax floating images + 2 CTA buttons
- ✅ Solutions: 7 service cards (Secretary, Economy, Chatbot, Email, No-show, Meeting Booker, Google Reviews)
- ✅ Custom: Aurora MeshGradient "imagination is the limit" section
- ✅ About, Contact (EmailJS), Footer
- ✅ Floating AI chatbot widget (GlassButton toggle, Claude Haiku backend)
- ✅ GitHub repo live: [github.com/julianklunker/DinDrift](https://github.com/julianklunker/DinDrift)

**Julian still needs to do:**
- ⬜ Set up EmailJS template at emailjs.com → add `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` to `.env.local`
- ⬜ Add `ANTHROPIC_API_KEY=sk-ant-...` to Vercel production environment (Settings → Environment Variables)
- ⬜ Connect GitHub repo to Vercel for auto-deploy: vercel.com → New Project → import `julianklunker/DinDrift`
- ⬜ Answer chatbot knowledge base questions (see MEMORY.md Session 2)

---

## Recent Session History

See `MEMORY.md` for session-by-session log. Last updated: **Session 4 (2026-05-31)**.

---

## Build Error Log

### 2026-05-30 — Navbar.tsx truncation (Vercel build failure)
**Error:** `Expected '</', got '<eof>'` at `Navbar.tsx:95`
**Cause:** Previous Edit tool call on Windows-mounted path silently truncated `Navbar.tsx` at line 94, cutting off the closing `>EN</button></div></nav></header>)}`
**Fix:** Cloned repo fresh to `/tmp`, copied correct 102-line file from workspace, committed and pushed (`72c8959`).
**Root cause note:** The `.git/index.lock` file on the Windows-mounted path could not be deleted from the Linux sandbox — always clone to `/tmp` when the workspace git repo has a lock file.
**Prevention:** After every Edit on a `.tsx`/`.ts` file, run `tail -5 <file>` and `wc -l <file>` to verify completeness before committing.

### 2026-05-30 — layout.tsx truncation (same root cause)
**Error:** `Expected '</', got '<eof>'` at `layout.tsx:46`
**Cause:** Edit tool on Windows-mounted path truncated `layout.tsx` mid-file again.
**Fix:** Wrote complete file directly with `cat >` in `/tmp/DinDrift_fix`, pushed (`24e875e`).

---

## CRITICAL: Editing Workflow for Future Claude Sessions

**Never use the Edit tool on `.tsx`/`.ts` files and commit directly from the Windows-mounted workspace path.**

The Edit tool on the Windows-mounted workspace path (`c:\Users\Humbik\...`) silently truncates files. The recommended safe workflow:

1. Make the change by writing the **complete file** using the Write tool (not Edit) on the workspace path
2. Verify immediately: run `tail -5 <file>` and `wc -l <file>` to confirm the file is complete
3. Only then `git add` + `git commit` + `git push`

Alternatively, clone to `/tmp` for a session's edits:
```bash
git clone https://<GITHUB_TOKEN>@github.com/julianklunker/DinDrift.git /tmp/DinDrift_fix
```
Then work from `/tmp/DinDrift_fix/` where the Edit tool behaves safely.
