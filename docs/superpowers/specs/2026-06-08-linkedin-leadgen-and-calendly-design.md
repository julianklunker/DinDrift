# Design — LinkedIn Lead-Gen Drafter + Website Calendly Integration

**Date:** 2026-06-08
**Owner:** Julian Zachar-Fink (DinDrift)
**Source strategy:** `marketing/DinDrift_Lead_Generation_Strategy.md` + `marketing.md`

This spec covers two related lead-generation deliverables agreed during brainstorming:

- **Thread A — LinkedIn Lead-Gen Drafter:** a local CLI that turns a prospect list into personalized, ToS-safe LinkedIn outreach drafts for manual sending.
- **Thread B — Website Calendly Integration:** a lazy-loaded booking experience across the site, anchored on `/kontakt`.

---

## Context & key decision: no full automation

The original ask was "automate finding connections and contacting them, offering a free first month." That path (auto-connect / auto-DM bots, scraping) **violates LinkedIn's User Agreement** and risks restriction or permanent ban of Julian's personal profile — which is the #1 asset in the lead-gen strategy. It also contradicts the strategy's own GDPR/Danish-law requirement that outreach be "relevant, non-spammy, personalised."

**Decision:** Build a **human-in-the-loop drafter**. The AI does the heavy lifting (drafting personalized messages); Julian reviews and **sends manually** from LinkedIn at a safe human cadence (the doc's 10–15/day). Zero scraping, zero auto-send. Bonus: this is effectively the DinDrift "Leads Generator" product applied in-house, so it doubles as a working case study/demo.

**Offer decision:** Drop "free first month" (mismatched to a build business, reads as spam). Use the real, compliant offer — **free 30-min automation audit** — as primary, and **vary** it occasionally with a "free pilot build in exchange for a testimonial" angle ("do some of each").

---

## Thread A — LinkedIn Lead-Gen Drafter

### Summary
A standalone local CLI under `scripts/leadgen/` that reads `prospects.csv` and, per row, uses Claude to draft a **connection note + value-first follow-up DM + one gentle nudge**, written to a dated, copy-ready Markdown file. Mirrors the existing `scripts/social/` toolkit conventions (`.mjs`, `loadEnv()`, `@anthropic-ai/sdk`, npm aliases, dry-run-safe, never-fabricate guardrail).

### Architecture
```
scripts/leadgen/
  draft.mjs            # CLI entry: parse args, read CSV, loop, write output
  lib/
    env.mjs            # reuse pattern from scripts/social/lib/env.mjs (loadEnv)
    prospects.mjs      # parse + validate prospects.csv -> rows[]
    generate.mjs       # Claude call -> { note, dm, nudge } for one prospect
    output.mjs         # write drafts/YYYY-MM-DD.md + append sent-log.csv
  prospects.csv        # user-maintained input (GITIGNORED)
  drafts/              # generated output (GITIGNORED)
  sent-log.csv         # lightweight tracker (GITIGNORED)
  README.md            # usage, CSV schema, cadence + ToS/GDPR notes
```
Reuse `scripts/social/lib/env.mjs` if practical (import across folders) rather than duplicating; otherwise copy the minimal `loadEnv()`.

### Input — `scripts/leadgen/prospects.csv`
| column | required | purpose |
|---|---|---|
| `name` | yes | first name for greeting |
| `role` | yes | e.g. "Ejer", "Daglig leder" |
| `company` | yes | their business |
| `city` | no | Copenhagen / Aarhus / etc. |
| `observation` | yes | **personalization hook** — something specific Julian noticed (recent post, booking page, hiring a receptionist). Rows missing this are **skipped with a warning** — it is what keeps messages non-spammy and GDPR-defensible. |
| `lang` | no | `da` (default) or `en` |
| `angle` | no | optional service to lean on (e.g. "no-show follow-up", "Google Reviews") |

A `prospects.example.csv` (committed) documents the schema with sample rows.

### Output
- `scripts/leadgen/drafts/YYYY-MM-DD.md` — one clean block per prospect: header (name · role · company), **Connection note**, **Follow-up DM**, **Nudge**. Copy-paste ready. Multiple runs same day append.
- `scripts/leadgen/sent-log.csv` — appends one row per drafted prospect: `date,name,company,lang,offer,status` (status starts `drafted`; Julian updates manually). Supports the doc's lead-scoring/follow-up pipeline.

### Claude drafting rules (baked into the prompt)
- **Connection note:** ≤ 280 chars (LinkedIn ~300 cap), warm, references `observation`, **no pitch, no offer** — just a genuine reason to connect.
- **Follow-up DM:** value-first, references their business specifically; soft offer = **free 30-min automation audit** (primary) OR the pilot-build-for-testimonial angle (varied per the rotation rule below); includes Calendly link `https://calendly.com/dindriftai`; transparent identity (Julian / DinDrift, CVR 43486489); easy opt-out line (GDPR legitimate-interest compliant).
- **Nudge:** short, friendly, no guilt, easy out.
- **Offer rotation:** default to the free audit; mix in the pilot-build angle for roughly 1 in 4 prospects (deterministic by row index so output is reproducible, not random — `Math.random` is avoided). `angle` column, when present, steers which service the message emphasizes.
- **Hard guardrails (reuse social toolkit's):** never fabricate clients / testimonials / results; never claim an agent was "already built" for them; match DinDrift voice — brand `#0015ff`, "The limit is your imagination", direct-line-to-Julian, 1–2 week delivery, SMB pricing from DKK 5,000.
- **Language:** Danish by default; per-row `lang=en` override; global `--lang` override.

### CLI flags
- `--dry-run` — generate + print only (default-safe; matches social toolkit).
- `--limit=N` — only first N rows.
- `--lang=da|en` — override all rows.
- `--prospect="name|role|company|observation[|city|angle|lang]"` — single ad-hoc inline prospect (no CSV needed).
- One Claude call per prospect.

### npm aliases (package.json)
- `leadgen:draft` → `node scripts/leadgen/draft.mjs --dry-run`
- `leadgen:run` → `node scripts/leadgen/draft.mjs`

### Config / secrets
Reuses `.env.local` (`ANTHROPIC_API_KEY` already present). No new secrets. Calendly URL is public; stored as a constant in the script (and shared with Thread B's constant where practical).

### Privacy / gitignore
`prospects.csv`, `drafts/`, and `sent-log.csv` contain personal data and **must be gitignored**. Only code + `prospects.example.csv` + README are committed.

---

## Thread B — Website Calendly Integration

### Summary
A lazy-loaded Calendly booking experience that fills the gap where `/kontakt` promises a "Gratis opdagelsescall på 30 minutter" but offers no way to book one. Performance-careful to preserve the **Lighthouse ≥ 90** requirement.

### Method — lazy popup + lazy inline embed
Calendly's `widget.js`/CSS is **never loaded on initial render**. It is injected only on demand:
- **Popup buttons:** script + CSS injected on **first click**, then `Calendly.initPopupWidget` opens the overlay.
- **Inline embed:** script injected via `IntersectionObserver` only when the embed scrolls near the viewport, then `Calendly.initInlineWidget` renders into a container.

A small loader util ensures the asset is injected at most once (idempotent, shared by both popup and inline).

### Components / files
```
lib/site.ts                      # export CALENDLY_URL = "https://calendly.com/dindriftai"
components/booking/
  loadCalendly.ts                # idempotent injector for widget.js + widget.css
  CalendlyButton.tsx             # popup trigger; brand-styled; bilingual label
  CalendlyInline.tsx             # lazy inline embed (IntersectionObserver)
```
Bilingual labels added to `lib/translations.ts` (e.g. `booking.cta` = "Book et gratis møde" / "Book a free call").

### Placement (Full)
1. **`/kontakt`** — `CalendlyInline` as a true alternative to the form ("…eller book direkte i kalenderen"), primary booking surface.
2. **Navbar** — `CalendlyButton` as the desktop CTA (popup).
3. **Hero** — booking CTA alongside existing actions.
4. **Contact section** (`components/sections/Contact.tsx`) — booking CTA alongside the form.

### Analytics
Reuse the existing pixel helper (`trackLead` from `lib/fbpixel`) on booking-button click / popup open, mirroring how the kontakt form already calls `trackLead`.

### Performance guardrails
- No Calendly asset in the critical path; injected on interaction/scroll only.
- Inline embed container has a fixed min-height to avoid layout shift (CLS).
- Verify Lighthouse ≥ 90 (performance + a11y) before pushing, per CLAUDE.md.

---

## Out of scope (YAGNI)
- No LinkedIn API / auto-send / scraping (deliberate — ToS/ban risk).
- No CRM build — `sent-log.csv` is the interim tracker (doc says HubSpot free tier later).
- No Calendly webhook → backend sync (manual for now).
- No changes to the existing EmailJS contact flow beyond adding booking CTAs.

## Success criteria
- Thread A: `npm run leadgen:draft` reads the example CSV and prints valid, on-brand, personalized DA drafts; rows without `observation` are skipped with a clear warning; personal data files are gitignored.
- Thread B: a visitor can book a call from `/kontakt` (inline) and from a button in Navbar/Hero/Contact; Calendly assets do not load until needed; Lighthouse stays ≥ 90.
