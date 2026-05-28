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

## Design Decisions (Permanent)

| Decision | Reason |
|---|---|
| `motion/react` only | Project uses `motion` package v12, `framer-motion` is not installed |
| Light mode forced | User preferred light mode over dark |
| Brand blue `#0015ff` | Core brand colour, used in nav logo, rotating text, buttons, chatbot header |
| Danish default | Target market is Danish businesses |
| No `tailwind.config.ts` | Tailwind v4 uses CSS-based configuration |
| shadcn components in `/components/ui` | Standard shadcn project structure |

---

## Known Issues / Watch Points

- `MeshGradient` requires explicit px dimensions — always gate with `mounted` state to avoid SSR mismatch
- `GlassButton` SVG filter uses `useId()` — each button instance gets a unique filter ID to avoid conflicts
- EmailJS env vars are `NEXT_PUBLIC_*` (client-side) — safe to expose, but require correct EmailJS setup
- `ANTHROPIC_API_KEY` is server-only — never prefix with `NEXT_PUBLIC_`
