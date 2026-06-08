# LinkedIn Lead-Gen Drafter + Website Calendly Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local CSV→Claude LinkedIn outreach drafter (manual-send, ToS-safe) and integrate lazy-loaded Calendly booking across the website.

**Architecture:** Thread A is a standalone Node ESM CLI under `scripts/leadgen/` mirroring the existing `scripts/social/` toolkit (loadEnv + `@anthropic-ai/sdk` + dry-run). Thread B adds a tiny idempotent Calendly asset loader and two React components (popup button + lazy inline embed), wired into Navbar/Hero/Contact/`kontakt` with bilingual copy via `lib/translations.ts`.

**Tech Stack:** Node ESM (`.mjs`), `@anthropic-ai/sdk` (model `claude-sonnet-4-6`), Next.js 16 / React 19 / TypeScript, Tailwind, `motion/react`, Calendly embed (`widget.js`).

**Testing note:** This repo has no unit-test runner (only `lint`, `typecheck`, `build`). Verification is therefore by running the CLI against a sample CSV and by `npm run typecheck` / `npm run build` / Lighthouse, not by a test framework. Each task lists its concrete verification command.

---

## File Structure

**Thread A — drafter**
- Create `scripts/leadgen/lib/env.mjs` — re-export of social `loadEnv`/`requireEnv` (path-correct) — *actually re-use by importing the social one; no copy.*
- Create `scripts/leadgen/lib/prospects.mjs` — parse + validate `prospects.csv` → rows.
- Create `scripts/leadgen/lib/generate.mjs` — Claude call → `{ note, dm, nudge }` for one prospect.
- Create `scripts/leadgen/lib/output.mjs` — write `drafts/YYYY-MM-DD.md` + append `sent-log.csv`.
- Create `scripts/leadgen/draft.mjs` — CLI entry (args, loop, orchestration).
- Create `scripts/leadgen/prospects.example.csv` — committed schema sample.
- Create `scripts/leadgen/README.md` — usage + ToS/GDPR notes.
- Modify `package.json` — add `leadgen:draft` / `leadgen:run` scripts.
- Modify `.gitignore` — ignore prospects/drafts/log.

**Thread B — Calendly**
- Create `lib/site.ts` — `CALENDLY_URL` constant.
- Create `components/booking/loadCalendly.ts` — idempotent asset injector.
- Create `components/booking/CalendlyButton.tsx` — popup trigger.
- Create `components/booking/CalendlyInline.tsx` — lazy inline embed.
- Modify `lib/translations.ts` — add `booking` section (da + en).
- Modify `components/layout/Navbar.tsx` — add booking button (desktop).
- Modify `components/sections/Hero.tsx` — add booking CTA.
- Modify `components/sections/Contact.tsx` — add booking CTA.
- Modify `app/kontakt/KontaktClient.tsx` — add inline embed block.

---

## Task 1: gitignore + npm scripts (scaffold safety first)

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`

- [ ] **Step 1: Append leadgen ignores to `.gitignore`**

```
# Lead-gen drafter — personal data, never commit
scripts/leadgen/prospects.csv
scripts/leadgen/drafts/
scripts/leadgen/sent-log.csv
```

- [ ] **Step 2: Add npm aliases to `package.json` scripts block** (after the `social:draft` line)

```json
    "leadgen:draft": "node scripts/leadgen/draft.mjs --dry-run",
    "leadgen:run": "node scripts/leadgen/draft.mjs",
```

- [ ] **Step 3: Verify** — `git check-ignore scripts/leadgen/prospects.csv` prints the path; `npm run leadgen:draft` fails only because the file doesn't exist yet (expected until Task 6).

- [ ] **Step 4: Commit** — `git add .gitignore package.json && git commit -m "chore(leadgen): gitignore personal data + npm aliases"`

---

## Task 2: prospects CSV parser/validator

**Files:**
- Create: `scripts/leadgen/lib/prospects.mjs`
- Create: `scripts/leadgen/prospects.example.csv`

- [ ] **Step 1: Write `prospects.example.csv`**

```csv
name,role,company,city,observation,lang,angle,segment
Mette,Ejer,Smile Tandklinik,København,"Slog op om at de mangler en receptionist til at tage telefonen",da,no-show follow-up,smb
Anders,Freelance konsulent,Anders Holm Consulting,Aarhus,"Postede at han drukner i mails og opfølgning efter kundemøder",da,email assistant,solo
Sofia,Daglig leder,Nordic Hair Studio,Odense,"Deres bookingside kræver at man ringer i åbningstiden",da,booking,smb
```

- [ ] **Step 2: Implement parser** — minimal CSV (handles quoted fields with commas), validation, solo inference.

```js
// Parse + validate scripts/leadgen/prospects.csv into normalized rows.
import { readFileSync, existsSync } from "node:fs"

// Minimal CSV line splitter that respects double-quoted fields.
function splitCsvLine(line) {
  const out = []
  let cur = ""
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (ch === '"') inQ = false
      else cur += ch
    } else if (ch === '"') inQ = true
    else if (ch === ",") { out.push(cur); cur = "" }
    else cur += ch
  }
  out.push(cur)
  return out.map((s) => s.trim())
}

const SOLO_ROLES = ["selvstændig", "freelancer", "freelance", "indehaver", "solo", "konsulent", "consultant", "iværksætter", "founder"]

function inferSegment(row) {
  if (row.segment === "solo" || row.segment === "smb") return row.segment
  const role = (row.role || "").toLowerCase()
  if (SOLO_ROLES.some((r) => role.includes(r))) return "solo"
  return "smb"
}

/** @returns {{rows: object[], skipped: {line:number,name:string,reason:string}[]}} */
export function readProspects(path) {
  if (!existsSync(path)) {
    console.error(`\n✖ No prospect file at ${path}`)
    console.error(`  Copy scripts/leadgen/prospects.example.csv to prospects.csv and fill it in.\n`)
    process.exit(1)
  }
  const lines = readFileSync(path, "utf8").split(/\r?\n/).filter((l) => l.trim())
  if (!lines.length) return { rows: [], skipped: [] }
  const headers = splitCsvLine(lines[0])
  const rows = []
  const skipped = []
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i])
    const row = {}
    headers.forEach((h, idx) => { row[h] = cells[idx] ?? "" })
    if (!row.name || !row.role || !row.company || !row.observation) {
      skipped.push({ line: i + 1, name: row.name || "(no name)", reason: "missing required field (name/role/company/observation)" })
      continue
    }
    row.lang = row.lang === "en" ? "en" : "da"
    row.segment = inferSegment(row)
    rows.push(row)
  }
  return { rows, skipped }
}
```

- [ ] **Step 3: Verify** — temporary check: `node -e "import('./scripts/leadgen/lib/prospects.mjs').then(m=>console.log(m.readProspects('scripts/leadgen/prospects.example.csv')))"` prints 3 rows, 0 skipped, with `segment` set (`solo` for Anders).

- [ ] **Step 4: Commit** — `git add scripts/leadgen/lib/prospects.mjs scripts/leadgen/prospects.example.csv && git commit -m "feat(leadgen): prospect CSV parser + example"`

---

## Task 3: Claude drafting module

**Files:**
- Create: `scripts/leadgen/lib/generate.mjs`

- [ ] **Step 1: Implement** — one Claude call per prospect, returns `{ note, dm, nudge }`. Reuses `requireEnv` from the social toolkit. Offer rotation deterministic by row index (no `Math.random`).

```js
// Drafts personalized LinkedIn outreach for one prospect, grounded in marketing.md.
import Anthropic from "@anthropic-ai/sdk"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { requireEnv } from "../../social/lib/env.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../../..")
const CALENDLY_URL = "https://calendly.com/dindriftai"

function readIfExists(rel) {
  const p = resolve(ROOT, rel)
  return existsSync(p) ? readFileSync(p, "utf8") : ""
}

const BRAND = `
You write LinkedIn outreach for Julian Zachar-Fink, founder of DinDrift —
bespoke AI automation agents for Danish & European SMBs (CVR 43486489,
Aalborg/Copenhagen). Contact: dindriftai@gmail.com | dindrift.dk.
Tagline: "The limit is your imagination." Brand colour #0015ff. Services from
DKK 5,000, delivered in 1–2 weeks, direct line to Julian (no ticket queues).

Voice: warm, specific, peer-to-peer — never hypey, never a mass-mail template.
You are writing to ONE real person about THEIR business.
HARD RULES — never break:
- NEVER fabricate clients, testimonials, numbers, or results.
- NEVER claim you have "already built" them an agent.
- The connection note must NOT pitch or sell — it is only a genuine reason to connect.
- Be transparent about who you are. Keep an easy, low-pressure out.
`.trim()

/**
 * @param {object} prospect  Row from prospects.csv (name, role, company, city, observation, lang, angle, segment)
 * @param {number} index     Row index, used for deterministic offer rotation.
 * @param {string} [langOverride]  "da" | "en" to override the row.
 * @returns {Promise<{note:string, dm:string, nudge:string}>}
 */
export async function generateOutreach(prospect, index, langOverride) {
  const apiKey = requireEnv("ANTHROPIC_API_KEY")
  const client = new Anthropic({ apiKey })
  const lang = langOverride || prospect.lang || "da"
  const language = lang === "en" ? "Write all three messages in English." : "Write all three messages in Danish."
  const marketing = readIfExists("marketing.md").slice(0, 5000)

  // Deterministic offer rotation: ~1 in 4 gets the pilot-build angle, rest get the free audit.
  const usePilot = index % 4 === 3
  const offer = usePilot
    ? `Offer angle: a free pilot build of one small automation in exchange for honest feedback / a testimonial (only if it works for them). Still mention they can book a free 30-min call: ${CALENDLY_URL}`
    : `Offer angle: a free, no-obligation 30-minute automation audit. Include the booking link: ${CALENDLY_URL}`

  const segmentGuide = prospect.segment === "solo"
    ? `This is a SOLO / one-person business (freelancer/independent consultant). They wear every hat and are price-sensitive. Emphasize TIME reclaimed and AFFORDABLE entry ("enterprise-level automation, SMB pricing"). Suggest lightweight wins (email assistant, booking, follow-up) — NOT heavy multi-agent systems. Do not use team/staff language.`
    : `This is a small business with a few staff. You may reference freeing up the team / reducing admin load.`

  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 900,
    system: BRAND,
    messages: [{
      role: "user",
      content: `${language}

Prospect:
- Name: ${prospect.name}
- Role: ${prospect.role}
- Company: ${prospect.company}
- City: ${prospect.city || "(unknown)"}
- What I noticed about them (use this to personalize — this is the hook): ${prospect.observation}
- Service angle to lean toward (optional): ${prospect.angle || "(pick the most relevant DinDrift service)"}

${segmentGuide}

${offer}

Write THREE messages for a LinkedIn outreach sequence:
1. "note" — the connection request note. MAX 280 characters. Warm, references what I noticed. NO pitch, NO offer, NO link. Just a real reason to connect.
2. "dm" — a value-first follow-up message to send ~4 days after they accept. Reference their specific situation, give one concrete useful idea, then the soft offer above with the booking link. Transparent (I'm Julian from DinDrift). End with an easy out (e.g. "no worries if not relevant"). 80–130 words.
3. "nudge" — a short, friendly nudge if they don't reply (~5 days later). 1–2 sentences, no guilt, easy out.

Reference (DinDrift notes — for grounding only, do not quote verbatim):
"""
${marketing}
"""

Return ONLY valid JSON, no markdown fences, exactly: {"note": "...", "dm": "...", "nudge": "..."}`,
    }],
  })

  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim()
  const jsonStart = text.indexOf("{")
  const jsonEnd = text.lastIndexOf("}")
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1))
  return { note: parsed.note.trim(), dm: parsed.dm.trim(), nudge: parsed.nudge.trim(), offer: usePilot ? "pilot" : "audit" }
}
```

- [ ] **Step 2: Verify** — covered end-to-end in Task 6 (needs CLI + key). No standalone run here.

- [ ] **Step 3: Commit** — `git add scripts/leadgen/lib/generate.mjs && git commit -m "feat(leadgen): Claude drafting module with solo + offer rotation"`

---

## Task 4: output writer

**Files:**
- Create: `scripts/leadgen/lib/output.mjs`

- [ ] **Step 1: Implement** — append a copy-ready block to `drafts/YYYY-MM-DD.md` and a row to `sent-log.csv`. Date is passed in (callers stamp it) to avoid surprises.

```js
import { mkdirSync, appendFileSync, existsSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(__dirname, "..")
const DRAFTS = resolve(DIR, "drafts")
const LOG = resolve(DIR, "sent-log.csv")

export function blockFor(p, out) {
  return [
    `## ${p.name} — ${p.role} @ ${p.company}${p.city ? ` (${p.city})` : ""}  ·  [${p.lang}/${p.segment}/${out.offer}]`,
    ``,
    `**Connection note** (${out.note.length} chars):`,
    `> ${out.note.replace(/\n/g, "\n> ")}`,
    ``,
    `**Follow-up DM** (send ~4 days after they accept):`,
    `> ${out.dm.replace(/\n/g, "\n> ")}`,
    ``,
    `**Nudge** (if no reply, ~5 days later):`,
    `> ${out.nudge.replace(/\n/g, "\n> ")}`,
    ``,
    `---`,
    ``,
  ].join("\n")
}

/** Write all blocks for a run to drafts/<date>.md and append tracker rows. */
export function writeDrafts(date, items) {
  mkdirSync(DRAFTS, { recursive: true })
  const file = resolve(DRAFTS, `${date}.md`)
  if (!existsSync(file)) writeFileSync(file, `# DinDrift LinkedIn outreach drafts — ${date}\n\n`, "utf8")
  for (const { prospect, out } of items) appendFileSync(file, blockFor(prospect, out), "utf8")

  if (!existsSync(LOG)) writeFileSync(LOG, "date,name,company,lang,segment,offer,status\n", "utf8")
  for (const { prospect, out } of items) {
    const esc = (s) => `"${String(s).replace(/"/g, '""')}"`
    appendFileSync(LOG, [date, esc(prospect.name), esc(prospect.company), prospect.lang, prospect.segment, out.offer, "drafted"].join(",") + "\n", "utf8")
  }
  return file
}
```

- [ ] **Step 2: Verify** — exercised in Task 6.

- [ ] **Step 3: Commit** — `git add scripts/leadgen/lib/output.mjs && git commit -m "feat(leadgen): output writer (drafts md + sent-log)"`

---

## Task 5: CLI entry

**Files:**
- Create: `scripts/leadgen/draft.mjs`

- [ ] **Step 1: Implement**

```js
// Generate personalized, ToS-safe LinkedIn outreach drafts for manual sending.
//   npm run leadgen:draft          # dry-run preview from prospects.csv
//   npm run leadgen:run            # write drafts/<date>.md + sent-log.csv
//   node scripts/leadgen/draft.mjs --limit=5 --lang=da
//   node scripts/leadgen/draft.mjs --prospect="Mette|Ejer|Smile Tandklinik|Slog op om receptionist|København|booking|smb"
import { loadEnv } from "../social/lib/env.mjs"
import { readProspects } from "./lib/prospects.mjs"
import { generateOutreach } from "./lib/generate.mjs"
import { writeDrafts, blockFor } from "./lib/output.mjs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

loadEnv()
const __dirname = dirname(fileURLToPath(import.meta.url))

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  if (hit) return hit.split("=").slice(1).join("=")
  if (process.argv.includes(`--${name}`)) return true
  return fallback
}

const dryRun = !!arg("dry-run", false)
const limit = Number(arg("limit", 0)) || 0
const langOverride = arg("lang", "") === "da" || arg("lang", "") === "en" ? arg("lang", "") : ""
const single = arg("prospect", "")

function todayISO() {
  // Local date YYYY-MM-DD without pulling timezone surprises.
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function parseSingle(str) {
  const [name, role, company, observation, city = "", angle = "", segment = ""] = str.split("|").map((s) => s.trim())
  return { name, role, company, observation, city, angle, segment: segment || "", lang: langOverride || "da" }
}

async function main() {
  let rows, skipped = []
  if (single) {
    const r = parseSingle(single)
    if (!r.name || !r.role || !r.company || !r.observation) {
      console.error('✖ --prospect needs at least "name|role|company|observation"'); process.exit(1)
    }
    r.segment = r.segment || (/(selvstændig|freelance|indehaver|konsulent|consultant|founder)/i.test(r.role) ? "solo" : "smb")
    rows = [r]
  } else {
    const path = resolve(__dirname, "prospects.csv")
    ;({ rows, skipped } = readProspects(path))
  }

  if (skipped.length) {
    console.log(`\n⚠ Skipped ${skipped.length} row(s) — fill in the missing 'observation'/required fields:`)
    for (const s of skipped) console.log(`   line ${s.line}: ${s.name} — ${s.reason}`)
  }
  if (limit > 0) rows = rows.slice(0, limit)
  if (!rows.length) { console.log("\nNo prospects to draft.\n"); return }

  console.log(`\nDrafting ${rows.length} prospect(s)${dryRun ? " (dry run)" : ""}...\n`)
  const items = []
  for (let i = 0; i < rows.length; i++) {
    process.stdout.write(`  ${i + 1}/${rows.length} ${rows[i].name} (${rows[i].company})... `)
    const out = await generateOutreach(rows[i], i, langOverride)
    items.push({ prospect: rows[i], out })
    process.stdout.write("done\n")
  }

  console.log("\n" + "═".repeat(64) + "\n")
  for (const { prospect, out } of items) console.log(blockFor(prospect, out))

  if (dryRun) { console.log("(dry run — nothing written)\n"); return }
  const file = writeDrafts(todayISO(), items)
  console.log(`✔ Wrote ${items.length} draft(s) to ${file}`)
  console.log(`✔ Tracker updated: scripts/leadgen/sent-log.csv\n`)
  console.log("Reminder: send manually from LinkedIn, ~10–15/day. Never auto-send.\n")
}

main().catch((e) => { console.error(e); process.exit(1) })
```

- [ ] **Step 2: Commit** — `git add scripts/leadgen/draft.mjs && git commit -m "feat(leadgen): CLI entry (dry-run, limit, lang, single prospect)"`

---

## Task 6: End-to-end run + README

**Files:**
- Create: `scripts/leadgen/README.md`

- [ ] **Step 1: Copy example to real file for a live test** — `cp scripts/leadgen/prospects.example.csv scripts/leadgen/prospects.csv`

- [ ] **Step 2: Dry-run** — `npm run leadgen:draft`
Expected: 3 prospects drafted; each block shows a connection note ≤ ~280 chars with no link, a DM containing `calendly.com/dindriftai`, and a nudge; Anders flagged `solo`; one of the three may show `[.../pilot]` only if its index hits the rotation (with 3 rows none will — index 3 is the 4th; that's fine). No files written.

- [ ] **Step 3: Real run of 1** — `node scripts/leadgen/draft.mjs --limit=1`
Expected: writes `scripts/leadgen/drafts/<today>.md` and appends a row to `scripts/leadgen/sent-log.csv`.

- [ ] **Step 4: Confirm ignored** — `git status --porcelain scripts/leadgen/` shows only README/example/lib/draft (NOT prospects.csv, drafts/, sent-log.csv).

- [ ] **Step 5: Write `README.md`** (usage, CSV schema table, cadence, the ToS/GDPR warning: manual send only, ≤10–15/day, observation required, never fabricate).

- [ ] **Step 6: Commit** — `git add scripts/leadgen/README.md && git commit -m "docs(leadgen): usage + ToS/GDPR README"`

---

## Task 7: Calendly constant + asset loader

**Files:**
- Create: `lib/site.ts`
- Create: `components/booking/loadCalendly.ts`

- [ ] **Step 1: `lib/site.ts`**

```ts
/** Public Calendly scheduling link for DinDrift discovery calls. */
export const CALENDLY_URL = "https://calendly.com/dindriftai"
```

- [ ] **Step 2: `components/booking/loadCalendly.ts`** — idempotent injector (loads widget.js + widget.css once, resolves when ready).

```ts
let loading: Promise<void> | null = null

/** Inject Calendly's widget assets exactly once. Safe to call repeatedly. */
export function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  // @ts-expect-error Calendly is attached to window by widget.js
  if (window.Calendly) return Promise.resolve()
  if (loading) return loading

  loading = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      link.setAttribute("data-calendly", "true")
      document.head.appendChild(link)
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-calendly]')
    if (existing) { existing.addEventListener("load", () => resolve()); return }
    const s = document.createElement("script")
    s.src = "https://assets.calendly.com/assets/external/widget.js"
    s.async = true
    s.setAttribute("data-calendly", "true")
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("Failed to load Calendly"))
    document.body.appendChild(s)
  })
  return loading
}
```

- [ ] **Step 3: Verify** — `npm run typecheck` passes.

- [ ] **Step 4: Commit** — `git add lib/site.ts components/booking/loadCalendly.ts && git commit -m "feat(booking): Calendly url constant + lazy asset loader"`

---

## Task 8: CalendlyButton (popup)

**Files:**
- Create: `components/booking/CalendlyButton.tsx`
- Modify: `lib/translations.ts`

- [ ] **Step 1: Add `booking` to `lib/translations.ts`** — inside the `da` object (after `nav`/near top) and the matching `en` object, identical keys:

da:
```ts
    booking: {
      cta: "Book et gratis møde",
      kontaktHeading: "Eller book direkte i kalenderen",
      kontaktSub: "Vælg et tidspunkt der passer dig — 30 min, gratis og uforpligtende.",
    },
```
en:
```ts
    booking: {
      cta: "Book a free call",
      kontaktHeading: "Or book directly in the calendar",
      kontaktSub: "Pick a time that suits you — 30 min, free and no obligation.",
    },
```

- [ ] **Step 2: `components/booking/CalendlyButton.tsx`**

```tsx
"use client"

import { useLanguage } from "@/lib/LanguageContext"
import { CALENDLY_URL } from "@/lib/site"
import { loadCalendly } from "./loadCalendly"
import { trackLead } from "@/lib/fbpixel"

export default function CalendlyButton({
  className,
  label,
}: {
  className?: string
  label?: string
}) {
  const { t } = useLanguage()
  const text = label ?? t.booking.cta

  const open = async () => {
    trackLead({ content_name: "Calendly popup" })
    await loadCalendly()
    // @ts-expect-error Calendly is attached to window by widget.js
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
  }

  return (
    <button
      type="button"
      onClick={open}
      className={
        className ??
        "text-sm font-semibold text-white bg-[#0015ff] px-5 py-2.5 rounded-full hover:opacity-90 active:opacity-80 transition-opacity min-h-[44px]"
      }
    >
      {text}
    </button>
  )
}
```

- [ ] **Step 3: Verify** — `npm run typecheck` passes (confirms `t.booking.cta` resolves in both languages).

- [ ] **Step 4: Commit** — `git add components/booking/CalendlyButton.tsx lib/translations.ts && git commit -m "feat(booking): bilingual Calendly popup button"`

---

## Task 9: CalendlyInline (lazy embed)

**Files:**
- Create: `components/booking/CalendlyInline.tsx`

- [ ] **Step 1: Implement** — injects assets only when scrolled near; fixed min-height to avoid CLS.

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { CALENDLY_URL } from "@/lib/site"
import { loadCalendly } from "./loadCalendly"

export default function CalendlyInline() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active || !ref.current) return
    let cancelled = false
    loadCalendly().then(() => {
      if (cancelled || !ref.current) return
      // @ts-expect-error Calendly is attached to window by widget.js
      window.Calendly?.initInlineWidget({ url: CALENDLY_URL, parentElement: ref.current })
    })
    return () => { cancelled = true }
  }, [active])

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-border bg-background"
      style={{ minWidth: "320px", height: "700px" }}
      aria-label="Calendly booking calendar"
    />
  )
}
```

- [ ] **Step 2: Verify** — `npm run typecheck` passes.

- [ ] **Step 3: Commit** — `git add components/booking/CalendlyInline.tsx && git commit -m "feat(booking): lazy inline Calendly embed"`

---

## Task 10: Wire booking into Navbar, Hero, Contact, Kontakt

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Contact.tsx`
- Modify: `app/kontakt/KontaktClient.tsx`

- [ ] **Step 1: Navbar** — import `CalendlyButton` and add it as a list item after the contact link (desktop list, `components/layout/Navbar.tsx`):

```tsx
import CalendlyButton from "@/components/booking/CalendlyButton"
```
After the `<li>` wrapping the `/kontakt` link, add:
```tsx
          <li>
            <CalendlyButton className="text-sm font-semibold text-white bg-[#0015ff] px-4 py-2 rounded-full hover:opacity-90 transition-opacity min-h-[40px]" />
          </li>
```

- [ ] **Step 2: Hero** — import and add a third button in the CTA row (`components/sections/Hero.tsx`), after the contact button, wrapped so it matches the motion row styling:

```tsx
import CalendlyButton from "@/components/booking/CalendlyButton"
```
After the closing `</motion.button>` of the contact button, inside the same `motion.div`:
```tsx
            <CalendlyButton className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[#0015ff] bg-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl min-h-[44px]" />
```

- [ ] **Step 3: Contact section** — import and add a booking button under the header subtext (`components/sections/Contact.tsx`), after the `</motion.div>` that closes the header block:

```tsx
import CalendlyButton from "@/components/booking/CalendlyButton"
```
Right after the header `motion.div` (before the `grid` div):
```tsx
        <div className="flex justify-center mb-12">
          <CalendlyButton />
        </div>
```

- [ ] **Step 4: Kontakt page** — import inline embed + button, add a booking block. In `app/kontakt/KontaktClient.tsx` add imports:

```tsx
import CalendlyInline from "@/components/booking/CalendlyInline"
import { useLanguage } from "@/lib/LanguageContext"
```
`KontaktClient` currently has no language hook; add `const { t } = useLanguage()` at the top of the component. Then, after the main two-column `</section>` (before `<Footer />`), add:
```tsx
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
            {t.booking.kontaktHeading}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">{t.booking.kontaktSub}</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <CalendlyInline />
        </div>
      </section>
```

> Note: `KontaktClient.tsx` hard-codes Danish copy elsewhere; only the new booking block is bilingual. That is acceptable and isolated — do not refactor the rest in this task.

- [ ] **Step 5: Verify** — `npm run typecheck` passes; `npm run build` succeeds.

- [ ] **Step 6: Commit** — `git add components/layout/Navbar.tsx components/sections/Hero.tsx components/sections/Contact.tsx app/kontakt/KontaktClient.tsx && git commit -m "feat(booking): wire Calendly into navbar, hero, contact, kontakt"`

---

## Task 11: Final verification

- [ ] **Step 1: Typecheck + lint + build** — `npm run typecheck && npm run lint && npm run build` all pass.
- [ ] **Step 2: Lighthouse** — run the dev/preview server, Lighthouse on `/` and `/kontakt`; confirm Performance ≥ 90 and Accessibility ≥ 90 (per CLAUDE.md). Confirm Calendly assets do NOT appear in the initial network trace until a button is clicked / the embed is scrolled to.
- [ ] **Step 3: Manual smoke** — click the Navbar/Hero booking button → popup opens; scroll `/kontakt` → calendar renders; language toggle swaps the booking copy.
- [ ] **Step 4: Final commit if any fixes** — `git commit -am "fix(booking): lighthouse/a11y polish"` (only if changes were needed).

---

## Self-Review notes
- **Spec coverage:** Thread A (CSV schema incl. `segment`, drafting rules, solo handling, offer rotation, flags, npm aliases, gitignore, README) → Tasks 1–6. Thread B (constant, lazy loader, popup button, lazy inline, translations, Navbar/Hero/Contact/Kontakt placement, trackLead, Lighthouse) → Tasks 7–11. All spec sections mapped.
- **Type consistency:** `generateOutreach(prospect, index, langOverride)` returns `{note,dm,nudge,offer}`; `blockFor`/`writeDrafts` consume `out.offer`/`out.note`/`out.dm`/`out.nudge`. `t.booking.{cta,kontaktHeading,kontaktSub}` defined in both languages before use. `loadCalendly()` shared by button + inline.
- **No placeholders:** every code step is complete.
