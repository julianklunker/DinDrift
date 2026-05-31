# DinDrift — Project Memory

This file grows as the project evolves. Each session appends a new entry.
Read `HANDOFF.md` first for the full technical overview.

---

## Session Log

### Session 1 — Initial Setup & Full Website Build
**Date:** ~2026-05-28

**What happened:**
- Fixed Node.js/npm version incompatibility (upgraded to Node 20.20.2)
- Integrated `text-rotate.tsx`, `parallax-floating.tsx`, `use-mouse-position-ref.ts` from demo
- Built entire website from scratch combining DinDrift demo hero + Invenio old website content
- Restructured project from nested `DinDrift/DinDrift/` to flat `DinDrift/`
- Forced light mode (`next-themes` defaultTheme="light", enableSystem=false)
- Set rotating hero text to brand blue `#0015ff`
- Added Mødebooker as 6th service card
- Added "Custom / imagination is the limit" section (Custom.tsx)

**Key decisions:**
- All motion animations use `motion/react` (v12 package), never `framer-motion`
- Language default: Danish (`'da'`)
- Tailwind v4 CSS-based config (no tailwind.config.ts)

---

### Session 2 — Chatbot, Aurora Effect & Google Reviews Agent
**Date:** ~2026-05-28

**What happened:**
- Installed `@paper-design/shaders-react` and `@anthropic-ai/sdk`
- Created `GlassButton` component (`components/ui/apple-tahoe-liquid-glass-button.tsx`) with SVG displacement map liquid glass effect
- Created `/api/chat/route.ts` — Claude Haiku server-side API route with full DinDrift knowledge base system prompt
- Created `components/Chatbot.tsx` — floating fixed bottom-right widget using GlassButton toggle, blue header, animated typing indicator, language-aware greeting
- Updated `Custom.tsx` — replaced harsh solid blue `bg-[#0015ff]` with MeshGradient aurora (dark navy palette, `bg-black/40` overlay)
- Added 7th service: **Google Reviews Agent** (DA: Omdømme / EN: Reputation)
- Added `<Chatbot />` to `app/page.tsx`
- Zero TypeScript errors confirmed

**Chatbot details:**
- Toggle button: GlassButton with `glassColor="rgba(0, 21, 255, 0.18)"`, shows "24/7 Chatbot" + MessageCircle icon
- Model: `claude-haiku-4-5-20251001`
- Falls back gracefully with email redirect if no API key

**Aurora details:**
- Colors: `["#0a1628", "#1a3a5e", "#162d52", "#0f2040", "#1e3868", "#0d1838"]`
- Settings: `distortion=0.6`, `swirl=0.8`, `speed=0.3`

**Pending from Julian:**
- EmailJS template setup (emailjs.com)
- Add `ANTHROPIC_API_KEY` to production environment
- Answer knowledge base questions for chatbot:
  1. Pricing model (flat fee / monthly / per project)?
  2. Typical implementation timeline per service?
  3. Which integrations (Google Calendar, Outlook, E-conomic, Billy, Podio, etc.)?
  4. Free discovery call / demo available?
  5. International clients or Denmark only?
  6. Post-delivery support/maintenance model?
  7. Industries worked with so far?
  8. Minimum project size / budget?

---

### Session 3 — GitHub Repo & Documentation
**Date:** ~2026-05-28

**What happened:**
- Created GitHub repo `DinDrift` under account `julianklunker`
- Initialised git, committed all project files
- Created `HANDOFF.md` — technical reference for future sessions
- Created `MEMORY.md` (this file) — growing session log
- Created `BUSINESS_PLAN.md` — Julian's AI agent business model documentation

---

### Session 4 — Chatbot Completion, Aurora, Google Reviews, Docs & GitHub Push
**Date:** 2026-05-31

**Context:** Resumed from context-compressed summary. All work from Sessions 1–3 had been completed in prior context windows; this session picked up at the last pending todo items.

**What happened:**

*Chatbot (completed pending work):*
- Created `app/api/chat/route.ts` — POST endpoint using `@anthropic-ai/sdk`. Model: `claude-haiku-4-5-20251001`. System prompt covers all 7 services, Julian's bio, contact info, and tone guidelines (Danish/English aware). Graceful fallback if `ANTHROPIC_API_KEY` is absent.
- Created `components/Chatbot.tsx` — floating widget fixed `bottom-6 right-6`, z-index 100. Toggle button is `GlassButton` with `glassColor="rgba(0, 21, 255, 0.18)"`, shows "24/7 Chatbot" + MessageCircle icon with AnimatePresence rotation transition. Chat window: white bg, blue `#0015ff` header, user messages blue right-aligned, assistant messages gray left-aligned, 3-dot animated typing indicator, auto-focus on open, Enter to send. Language-aware greeting and error messages.
- Added `<Chatbot />` to `app/page.tsx` (fixed position, DOM placement irrelevant)

*Aurora effect (completed pending work):*
- Replaced `Custom.tsx` solid `bg-[#0015ff]` with `MeshGradient` from `@paper-design/shaders-react`
- Colors: `["#0a1628", "#1a3a5e", "#162d52", "#0f2040", "#1e3868", "#0d1838"]`
- Settings: `distortion=0.6`, `swirl=0.8`, `speed=0.3`, `grainMixer=0`, `grainOverlay=0`
- `bg-black/40` overlay for text readability. Window dimensions tracked via `useState`/`useEffect`, gated behind `mounted` to prevent SSR mismatch.

*Google Reviews Agent (new service — 7th):*
- Added to `lib/translations.ts` in both DA and EN
- DA: key `googlereviews`, category "Omdømme", title "Google Anmeldelser Agent"
- EN: category "Reputation", title "Google Reviews Agent"
- 5 capabilities: automatic review request outreach, personalised follow-up SMS/email, AI-generated review responses, new feedback monitoring, review trend reporting
- Chatbot system prompt updated to include the new service

*Documentation & GitHub:*
- Created `HANDOFF.md`, `MEMORY.md`, `BUSINESS_PLAN.md`
- `git init`, committed all files, created GitHub repo `julianklunker/DinDrift` (public), pushed master

**TypeScript check result:** Clean — 0 errors.

---

### Session 5 — Vercel Build Fixes, Favicon, Chatbot Diagnosis, Google Ads Sitelinks, Hero Image Swap
**Date:** 2026-05-31

**Context:** Resumed from context-compressed summary. Vercel build was failing; chatbot not working; user requested Google Ads sitelink help and hero image changes.

**What happened:**

*Vercel build fix (commit `4dac336`):*
- **Root cause:** Force-push in Session 4 overwrote the remote's previous bug-fix commits, reintroducing known truncation bugs
- `Navbar.tsx` — committed version was 94 lines (truncated), local was correct 113 lines. Recommitted clean version.
- `Hero.tsx` — committed version had **65 null bytes** appended at end (confirmed with `git show HEAD:file | python3 -c "d=sys.stdin.buffer.read(); print(d.count(b'\x00'))"`). Recommitted clean version.
- `translations.ts` — `t.nav.pricing` referenced in Navbar but already present in the file (added in a prior session)
- Added previously untracked files to git: `public/dindriftlogosmall.png`, `public/dindriftlogo.png`, `app/priser/`, `marketing.md`, `public/llms.txt`, `ad_scenes/`

*Favicon fix:*
- `app/layout.tsx` already had correct metadata: `icons: { icon: "/dindriftlogosmall.png", shortcut: "/dindriftlogosmall.png", apple: "/dindriftlogosmall.png" }`
- Problem was `public/dindriftlogosmall.png` was untracked — not in GitHub → not deployed to Vercel
- Fixed by committing the PNG files

*Chatbot diagnosis:*
- Code is correct. Chatbot not working because `ANTHROPIC_API_KEY` is not set in Vercel
- **To fix:** Vercel dashboard → project → Settings → Environment Variables → add `ANTHROPIC_API_KEY=sk-ant-...` (scope: Production + Preview) → redeploy
- Without the key, chatbot shows fallback message: "Beklager, chatbotten er ikke tilgængelig..." — this is expected behaviour

*Google Ads sitelinks (new file `ad_scenes/Sitelinks_DinDrift.csv`):*
- Created importable CSV for Google Ads Editor
- 6 sitelinks for campaign "AI-agent til din virksomhed":
  1. "Gratis 30-min Opkald" → dindrift.dk/kontakt
  2. "Se vores AI-løsninger" → dindrift.dk/#solutions
  3. "Sekretær Agent" → dindrift.dk/#solutions
  4. "Hjemmeside Chatbot" → dindrift.dk/#solutions
  5. "Google Anmeldelser Agent" → dindrift.dk/#solutions
  6. "Om DinDrift" → dindrift.dk/#about
- All within Google's character limits (link text ≤ 25, descriptions ≤ 35 chars)
- To import: Google Ads Editor → File → Import → Import CSV

*Hero image changes (commit `7d60e39`):*
- Swapped positions of `calendar-ui.svg` (top-left) and blue waves Unsplash image (top-right)
- Replaced cloudfront spreadsheet image with `/Emailtocalandexcel.png` (local public asset)
- Added `public/Emailtocalandexcel.png` to git
- Used **Write tool** (not Edit) to avoid null byte truncation — verified clean with python3 null byte check before commit

*Null byte verification protocol established:*
```bash
# Run after every file write before committing:
git show HEAD:<file> | python3 -c "import sys; d=sys.stdin.buffer.read(); print(d.count(b'\x00'), 'null bytes')"
```

**Final commit state:** `7d60e39` on master — Vercel auto-deployed.

**Pending from Julian (unchanged):**
- Add `ANTHROPIC_API_KEY` to Vercel environment variables (chatbot fix)
- EmailJS template setup + env vars (contact form fix)
- Import `ad_scenes/Sitelinks_DinDrift.csv` into Google Ads Editor

---

## Design Decisions (Permanent)

| Decision | Reason |
|---|---|
| `motion/react` only | Project uses `motion` package v12, `framer-motion` is not installed |
| Light mode forced | User preferred light mode over dark |
| Brand blue `#0015ff` | Core brand colour, used in nav logo, rotating text, buttons, chatbot header |
| Danish default | Target market is Danish businesses |
| No `tailwind.config.ts` | Tailwind v4 uses CSS-based configuration |
| shadcn components in `/components/ui` | Standard shadcn project structure |
| Write tool over Edit tool | Edit tool on Windows paths silently truncates/corrupts `.tsx` files |

---

## Known Issues / Watch Points

- `MeshGradient` requires explicit px dimensions — always gate with `mounted` state to avoid SSR mismatch
- `GlassButton` SVG filter uses `useId()` — each button instance gets a unique filter ID to avoid conflicts
- EmailJS env vars are `NEXT_PUBLIC_*` (client-side) — safe to expose, but require correct EmailJS setup
- `ANTHROPIC_API_KEY` is server-only — never prefix with `NEXT_PUBLIC_`
- Chatbot shows fallback message until `ANTHROPIC_API_KEY` is added to Vercel env vars

---

## Recurring Build Issues

### Null bytes / truncated files after edits
**Symptom:** Vercel/Turbopack build fails with `Unexpected character '\0'` or `Expected '</', got '<eof>'` pointing to a `.tsx` file.
**Cause:** Edit tool on Windows-mounted paths silently truncates or appends null bytes to files.
**Verified detection method:**
```bash
git show HEAD:<file> | python3 -c "import sys; d=sys.stdin.buffer.read(); print(len(d), 'bytes,', d.count(b'\x00'), 'null bytes,', d.count(b'\n'), 'lines')"
```
**Fix:** Use the Write tool with the complete file content, then verify before committing.
**Never use the Edit tool on `.tsx`/`.ts` files — use Write with full file content.**
