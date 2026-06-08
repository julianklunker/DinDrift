# DinDrift — LinkedIn Lead-Gen Drafter

Turn a list of prospects into **personalized, on-brand LinkedIn outreach drafts**
with Claude — then **send them manually** from LinkedIn. This is the DinDrift
*Leads Generator* approach applied in-house.

```
npm run leadgen:draft     # generate + preview only (writes nothing)
npm run leadgen:run       # generate + write drafts/<date>.md + sent-log.csv
```

Reuses `ANTHROPIC_API_KEY` from `.env.local` (same key as the social toolkit).
Nothing here calls LinkedIn — see the safety note below.

---

## ⚠️ Read this first — why there is no auto-send

Automating LinkedIn connections/messages (auto-connect, auto-DM, scraping)
**violates LinkedIn's User Agreement** and risks restricting or permanently
banning your account. It also undermines GDPR/Danish-law compliance, which
requires outreach to be *relevant, non-spammy, and personalised*.

So this tool **only drafts**. You review every message and send it yourself,
at a human pace (**~10–15 per day**, per the lead-gen strategy). The AI removes
the work; you keep the account safe and the messages genuinely personal.

---

## Setup

1. Copy the example file and fill it in:
   ```
   cp scripts/leadgen/prospects.example.csv scripts/leadgen/prospects.csv
   ```
2. `prospects.csv`, `drafts/`, and `sent-log.csv` are **gitignored** — they hold
   personal data and are never committed.

---

## CSV schema — `scripts/leadgen/prospects.csv`

| column | required | purpose |
|---|---|---|
| `name` | ✓ | first name for the greeting |
| `role` | ✓ | e.g. "Ejer", "Daglig leder", "Freelance konsulent" |
| `company` | ✓ | their business |
| `city` | – | Copenhagen / Aarhus / etc. |
| `observation` | ✓ | **the personalization hook** — something specific you noticed (a recent post, their booking page, hiring a receptionist). Rows without this are **skipped** — it is what keeps messages non-spammy and GDPR-defensible. |
| `lang` | – | `da` (default) or `en` |
| `angle` | – | optional service to lean on (e.g. "no-show follow-up", "email assistant") |
| `segment` | – | `solo` (one-person company) or `smb`; auto-inferred from `role` when blank |

**Single-person companies** (freelancers, independent consultants) are a
supported segment: mark them `solo` (or leave blank — roles like "freelancer",
"selvstændig", "konsulent", "indehaver" auto-infer `solo`). Their drafts
emphasize time saved and affordable entry, and suggest lightweight wins.

---

## What you get per prospect

1. **Connection note** — ≤ 280 chars, references your observation, **no pitch, no link** (just a genuine reason to connect).
2. **Follow-up DM** — value-first, sent ~4 days after they accept; offers a free 30-min automation audit (≈1 in 4 instead offers a free pilot build for a testimonial) with your Calendly link `https://calendly.com/dindriftai`; transparent, easy opt-out.
3. **Nudge** — a short friendly follow-up if there's no reply.

Output is written to `scripts/leadgen/drafts/YYYY-MM-DD.md` (copy-paste ready),
and a tracker row is appended to `scripts/leadgen/sent-log.csv`
(`date,name,company,lang,segment,offer,status`) — update `status` by hand as you
work the pipeline.

---

## Flags

```
npm run leadgen:draft                       # dry-run preview from prospects.csv
npm run leadgen:run                         # write the drafts + tracker
node scripts/leadgen/draft.mjs --limit=5    # only the first 5 rows
node scripts/leadgen/draft.mjs --lang=en    # force English for this run
node scripts/leadgen/draft.mjs --prospect="Mette|Ejer|Smile Tandklinik|Slog op om receptionist|København|booking|smb"
```
`--prospect` format: `name|role|company|observation[|city|angle|segment]`.

---

## Suggested workflow

1. Browse LinkedIn for ICP decision-makers (Danish service SMBs + solopreneurs).
2. For each, note one specific `observation` and add a row to `prospects.csv`.
3. `npm run leadgen:draft` → review the drafts for tone/accuracy.
4. `npm run leadgen:run` → write them out.
5. Send the connection note manually. After they accept, wait ~4 days, send the DM. Nudge ~5 days later if needed. Keep to ~10–15/day.

> The generator is instructed never to fabricate clients, testimonials, or
> results, and never to claim an agent was "already built" for the prospect.
> You own everything you send — review before sending.
