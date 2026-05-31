# DinDrift — Project Handoff

> Read this file at the start of every new session to get up to speed instantly.

---

## What This Is

DinDrift is Julian Zachar-Fink's personal AI automation agency website. It is a **Next.js 16 single-page site** (Danish-first, English toggle) showcasing his AI agent services, about section, contact form, a floating AI chatbot, and an aurora-effect "imagination is the limit" section.

**Live dev URL:** `http://localhost:3000` (run `npm run dev` from the project root)
**GitHub:** [github.com/julianklunker/DinDrift](https://github.com/julianklunker/DinDrift)
**Last commit:** `7d60e39` (hero image swap)

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
  layout.tsx          — LanguageProvider + ThemeProvider, fonts, metadata, GTM
  page.tsx            — Composes all sections + Chatbot
  globals.css         — Tailwind v4 config, CSS variables
  api/chat/route.ts   — Claude API endpoint (POST /api/chat)
  kontakt/            — Standalone contact page
  priser/             — Pricing page

components/
  layout/
    Navbar.tsx        — Fixed top nav, language toggle, scroll links + /priser link
    Footer.tsx        — Copyright, CVR, LinkedIn
  sections/
    Hero.tsx          — TextRotate + 5 Floating images + 2 CTA buttons
    Solutions.tsx     — 7 service cards grid
    Custom.tsx        — Aurora MeshGradient "imagination is the limit" section
    About.tsx         — Bio, tech stack, stats, LinkedIn
    Contact.tsx       — EmailJS contact form
  ui/
    text-rotate.tsx                    — Animated rotating text component
    parallax-floating.tsx              — Mouse-parallax floating image layer
    apple-tahoe-liquid-glass-button.tsx — GlassButton with SVG displacement map
  Chatbot.tsx         — Floating chatbot widget (fixed bottom-right)
  CookieBanner.tsx    — GDPR cookie consent banner

lib/
  translations.ts     — All DA/EN strings (nav incl. pricing, hero, solutions, custom, about, contact, footer)
  LanguageContext.tsx — LanguageProvider + useLanguage() hook

hooks/
  use-mouse-position-ref.ts — Mouse position ref for parallax

public/
  dindriftlogosmall.png    — Favicon (referenced in layout.tsx metadata)
  dindriftlogo.png         — Full logo
  logo-full.svg            — SVG logo
  calendar-ui.svg          — Hero floating image (top-right after swap)
  Emailtocalandexcel.png   — Hero floating image (upper-left, replaced spreadsheet)
  ai-email-agent.svg       — Hero floating image (bottom-right)
  llms.txt                 — LLM-readable site description

ad_scenes/
  Sitelinks_DinDrift.csv  — Google Ads sitelinks ready to import
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

## Hero Floating Images (current layout)

| Position | Image | Source |
|---|---|---|
| Top-left small | Blue waves | Unsplash (photo-1562016600) |
| Upper-left large | Email→Calendar→Excel | `/public/Emailtocalandexcel.png` |
| Bottom-left | Crowd | Unsplash (photo-1726083085) |
| Top-right | Calendar UI | `/public/calendar-ui.svg` |
| Bottom-right | AI email agent | cloudfront CDN |

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
**For Vercel:** Settings → Environment Variables → add each key with scope Production + Preview.

---

## Important Technical Notes

- **All motion imports** must come from `motion/react` — the project has the `motion` package (v12), not `framer-motion`
- **Tailwind v4** uses CSS-based config — no `tailwind.config.ts` file
- **Brand colour:** `#0015ff`
- **Language default:** Danish (`'da'`)
- **Chatbot fallback:** If `ANTHROPIC_API_KEY` is missing, the bot returns a polite "contact via email" message — this is expected
- **MeshGradient** needs explicit pixel dimensions — track with `useState`/`useEffect` on `window.innerWidth/Height`
- **Navbar** has 4 nav items: Løsninger, Om os, Priser (/priser), Kontakt (/kontakt)

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
- ✅ Full website live and functional
- ✅ DA/EN language toggle
- ✅ Hero: TextRotate (5 terms) + 5 parallax floating images + 2 CTA buttons
- ✅ Solutions: 7 service cards
- ✅ Custom: Aurora MeshGradient "imagination is the limit" section
- ✅ About, Contact (EmailJS), Footer, Cookie banner
- ✅ Floating AI chatbot widget (GlassButton, Claude Haiku backend)
- ✅ Pricing page (`/priser`)
- ✅ Contact page (`/kontakt`)
- ✅ Favicon set to DinDrift logo (`/dindriftlogosmall.png`)
- ✅ Google Tag Manager installed (ID: AW-18195313302)
- ✅ GitHub repo live and Vercel auto-deploys on push

**Julian still needs to do:**
- ⬜ Add `ANTHROPIC_API_KEY` to Vercel → Settings → Environment Variables (enables live chatbot)
- ⬜ Set up EmailJS template at emailjs.com → add the 3 `NEXT_PUBLIC_EMAILJS_*` vars to Vercel
- ⬜ Import `ad_scenes/Sitelinks_DinDrift.csv` into Google Ads Editor
- ⬜ Answer chatbot knowledge base questions (see MEMORY.md Session 2)

---

## Recent Session History

See `MEMORY.md` for session-by-session log. Last updated: **Session 5 (2026-05-31)**.

---

## Build Error Log

### 2026-05-30 — Navbar.tsx truncation (Vercel build failure)
**Error:** `Expected '</', got '<eof>'` at `Navbar.tsx:95`
**Cause:** Edit tool on Windows-mounted path silently truncated `Navbar.tsx` at line 94.
**Fix:** Recommitted correct 113-line local version.

### 2026-05-30 — layout.tsx truncation (same root cause)
**Error:** `Expected '</', got '<eof>'` at `layout.tsx:46`
**Fix:** Wrote complete file with Write tool, committed.

### 2026-05-31 — Hero.tsx null bytes + Navbar.tsx re-truncated (Session 5 build failure)
**Error:** `Parsing ecmascript source code failed` on both Navbar.tsx (line 95) and Hero.tsx (line 177)
**Cause:** Force-push in Session 4 overwrote the remote's previous fixes. Hero.tsx had 65 null bytes appended in the committed version.
**Detection:** `git show HEAD:components/sections/Hero.tsx | python3 -c "import sys; d=sys.stdin.buffer.read(); print(d.count(b'\x00'), 'null bytes')"`
**Fix:** Staged correct local versions (verified 0 null bytes), recommitted both files (`4dac336`).

---

## CRITICAL: Editing Workflow for Future Claude Sessions

**NEVER use the Edit tool on `.tsx`/`.ts` files. Always use the Write tool with the complete file.**

The Edit tool on the Windows-mounted workspace path (`c:\Users\Humbik\...`) silently truncates files or appends null bytes. This has caused 3 separate Vercel build failures.

**Safe workflow:**
1. Use the **Write tool** with the complete file content
2. Verify immediately before committing:
   ```bash
   python3 -c "d=open('path/to/file.tsx','rb').read(); print(len(d),'bytes,',d.count(b'\x00'),'nulls,',d.count(b'\n'),'lines'); print('tail:',repr(d[-30:]))"
   ```
3. Then `git add` + `git commit` + `git push`
4. After pushing, double-check the committed version:
   ```bash
   git show HEAD:path/to/file.tsx | python3 -c "import sys; d=sys.stdin.buffer.read(); print(d.count(b'\x00'), 'null bytes in committed version')"
   ```
