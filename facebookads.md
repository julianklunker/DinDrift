# DinDrift — Meta Ads Campaign (resume doc)

_Last updated: 2026-06-02. Purpose: resume the paused Meta lead-gen campaign build after the ad-account/billing issue is resolved._

## TL;DR — where we are
A full Danish lead-gen Meta campaign was designed and built up to the ad layer. **Everything is done except the final 20 ads.** Original block was the portfolio's Vienna/Austria country (user has since set portfolio `1617812619316128` country = Denmark). Current block: Meta **new-business limit of 1 owned ad account**. The old account `2876991242697116` is PENDING_CLOSURE but still counts against the limit until it fully closes (~3 days), so the new account can't be added to the portfolio yet.

### Target end-state
New DKK ad account **`1025361876692484`** (already ACTIVE, currently standalone/no portfolio) added into portfolio `1617812619316128`, with Page `1073703132504126` + Pixel `1327683732481417` assigned and a Danish card attached. Then rebuild campaign there.

### Unblock (do both in parallel)
1. Wait ~3 days for `2876991242697116` to finish closing → frees the portfolio's 1-account slot → add `1025361876692484` to the portfolio.
2. Meanwhile run **Business Verification** (Meta Security Center, CVR 43486489) to raise the ad-account limit — may allow adding the account sooner.
Then: assign Page + Pixel to `1025361876692484`, add Danish payment method, tell Claude to rebuild.

### Account status (2026-06-02)
| Account | Cur | Status | In portfolio | Use |
|---|---|---|---|---|
| 484256445464256 | USD | PENDING_CLOSURE | no | the $50 refund account, closing |
| 2876991242697116 | DKK | PENDING_CLOSURE | 1617812619316128 | old build account, closing (still holds the slot) |
| **1025361876692484** | DKK | **ACTIVE** | **none yet** | **future production account — add to portfolio** |

## The goal
Multi-stage pipeline for DinDrift (Danish AI-agent agency, https://dindrift.com):
0. Scrape brand (products, palette, font, voice) → done
1. Competitor angle research (Meta Ad Library) → done
2. Generate 20 static ad images → done
3. Write Danish ad copy (40-char headline + 125-char primary) → done
4. Build a PAUSED Meta campaign: 1 campaign → 5 ad sets (by angle) → 20 ads → **blocked at ad layer (billing)**

## Brand essentials (see brand-profile.json)
- Market: Denmark, Danish-first. Founder: Julian Zachar-Fink, Aalborg. CVR 43486489.
- Palette: primary **#0015ff** (electric blue), white, neutral grays. Fonts: Geist / Geist Mono.
- Voice: direct, warm, founder-led, anti-agency ("ingen bureau-overhead"), second person (din/dine). No hype.
- Products: Sekretær, Økonomiansvarlig, Hjemmeside Chatbot, E-mail Assistent, No-show Opfølgning, Mødebooker, Google Anmeldelser, Custom Solutions.
- Contact: dindriftai@gmail.com · +45 29 72 26 04.

## CONSTRAINT — no fake testimonials
Do NOT fabricate client testimonials for ads (FTC + Meta policy). Campaign direction is **benefit-led** brand claims. Real, permissioned client quotes are fine if provided.

## The 5 angles (= 5 ad sets, 4 ads each)
1. **A1 Tid tilbage** — hours-back / time freedom (Sekretær, E-mail)
2. **A2 AI-medarbejder, ikke en chatbot** — coworker framing (Chatbot, Custom)
3. **A3 Mist aldrig en kunde** — 24/7 + no-show (Chatbot, No-show)
4. **A4 Skræddersyet, intet bureau-overhead** — anti-agency / custom (Custom Solutions)
5. **A5 Automatisk vækst** — reviews + bookkeeping outcomes (Google Anmeldelser, Økonomi)

Top competitor angles that informed these: see COMPETITOR-INTELLIGENCE-REPORT.md (DK market nearly uncontested — only "AI Automatisering" advertising).

## Assets & IDs

### Accounts (as of 2026-06-02)
| Asset | ID | Notes |
|---|---|---|
| Standalone ad account | `484256445464256` | USD, has payment method, NOT in DinDrift portfolio. Had the $50. User deactivating for refund (3-day close). Cannot use DinDrift Page/Pixel. |
| DinDrift ad account | `2876991242697116` | DKK, in portfolio 1617812619316128, **no payment method — portfolio is Vienna/Austria, can't add Danish billing**. Campaign built here but ads blocked. |
| DinDrift business portfolio | `1617812619316128` | Registered Vienna/Austria (country locked — root cause). Owns Page + Pixel. |
| **Page** | `1073703132504126` | DinDrift FB Page. (Earlier wrong id 61590222406073 was a red herring.) Page-list API under-reports `[]` but it WORKS for creatives. |
| **Pixel / dataset** | `1327683732481417` | "DinDrift". Brand-new, zero events. Code already live on site. |

### Built in account 2876991242697116 (all PAUSED) — may be discarded if moving accounts
- Campaign `120248028521920717` — "DinDrift — AI Agenter (Leads)", OUTCOME_LEADS, CBO 5000 øre = **50 DKK/day**.
- Ad sets: A1 `120248028691200717`, A2 `120248028703020717`, A3 `120248028706540717`, A4 `120248028712240717`, A5 `120248028719670717`. All: LANDING_PAGE_VIEWS, geo DK, age_min 24, DSA beneficiary/payor "DinDrift", destination WEBSITE.
- 20 creatives created (ids in **ad-creatives/meta-ids.json**). Link https://dindrift.com/kontakt, CTA BOOK_NOW.
- Stray empty campaign in USD account: `120263991649540362` (forced PAUSED; will vanish when that account closes).

## Why optimization = Landing Page Views (not Lead)
OFFSITE_CONVERSIONS/Lead optimization was rejected (INTERNAL error) because the Pixel has **zero events**. Ad sets use **LANDING_PAGE_VIEWS** as a valid cold-start. Once the Pixel logs leads (form submits on /kontakt), switch ad sets to OFFSITE_CONVERSIONS with promoted_object `{"pixel_id":"1327683732481417","custom_event_type":"LEAD"}`.

## Pixel tracking — SHIPPED in repo (works regardless of ad account)
- `components/MetaPixel.tsx` — base code, default id `1327683732481417` (env override NEXT_PUBLIC_FB_PIXEL_ID). Fires PageView.
- `lib/fbpixel.ts` — `trackLead()` helper.
- `app/layout.tsx` — pixel loaded site-wide.
- `app/kontakt/KontaktClient.tsx` — fires standard `Lead` on contact-form success.
- Typecheck passes. NOT yet committed/deployed. (Optional: also fire Lead on app/priser/PricingClient.tsx form.)

## Creative inputs (reusable in ANY new account)
- **ad-creatives/urls.txt** — 20 public Wavespeed image URLs (a1_1..a5_4).
- **ad-creatives/copy.json** — 20 Danish headline + primary-text pairs.
- **ad-creatives/final/*.jpg** — 20 composited statics (headline + #0015ff "Book en gratis snak" CTA baked in). Local only; to use as ad images they must be hosted publicly (e.g. commit to public/ + deploy) — otherwise use the raw urls.txt visuals + Meta text fields (what the build used).
- **ad-creatives/meta-ids.json** — full account/campaign/adset/creative map + build recipe.

## RESUME STEPS (after new Danish ad account exists)
1. Confirm the **new ad account ID**, and that **Page 1073703132504126 + Pixel 1327683732481417 are added to the new portfolio** (re-share them; do NOT recreate — keeps the site pixel code valid).
2. `ads_create_campaign` — OUTCOME_LEADS, AUCTION, CBO daily budget in the new account's currency (50 DKK = 5000 øre, or convert if USD), special_ad_categories `[]`.
3. `ads_create_ad_set` ×5 (names A1–A5) — billing_event IMPRESSIONS, optimization_goal LANDING_PAGE_VIEWS, destination WEBSITE, targeting `{"geo_locations":{"countries":["DK"]},"age_min":24}`, dsa_beneficiary/payor "DinDrift".
4. `ads_create_creative` ×20 — page_id (new portfolio's page), link_url https://dindrift.com/kontakt, image_url from urls.txt, message+headline from copy.json, call_to_action_type BOOK_NOW. (Creatives are account-scoped, so must be recreated in the new account.)
5. `ads_create_ad` ×20 — map each creative to its ad set (see meta-ids.json grouping a1_*→A1 … a5_*→A5), creative `{"creative_id":"..."}`. Requires a payment method on the new account.
6. Leave everything PAUSED. Report ad IDs for review.

## Tooling notes
- Firecrawl & Wavespeed MCP NOT connected. Used built-in WebFetch + Wavespeed REST API.
- Wavespeed key was pasted live in chat (`wsk_live_...`) — **ROTATE IT**. Only appears in ad-creatives/generate.sh (consider gitignoring/scrubbing).
- Facebook Ads MCP + claude-ads plugin connected.
- No MCP tool to create an ad account or pixel, or to add billing — all user-side in Meta UI.

## BETTER IDEA than waiting 3 days
The 3-day clock is only the **closure/refund of the old account** — it does NOT block creating the new Danish portfolio + ad account. Set up the new Danish business portfolio + ad account **now, in parallel**, re-share the Page + Pixel to it, add a Danish card, and the campaign can be rebuilt and reviewed immediately. The refund processes independently in the background.
