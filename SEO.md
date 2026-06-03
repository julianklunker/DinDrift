# SEO Playbook — DinDrift

Role: senior SEO manager. Goal: grow DinDrift's organic + AI-answer visibility (Danish-first, EN secondary). This file is the single source for SEO conventions, the skill index, and an error log. Keep it terse.

## What exists (don't rebuild)
- **Technical:** `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`. Base JSON-LD (Organization + LocalBusiness) in `app/layout.tsx` via `components/StructuredData.tsx`. Rich metadata (OG/Twitter/keywords) in `app/layout.tsx`.
- **Structured data:** `JsonLd` + `organizationSchema`/`localBusinessSchema` in `components/StructuredData.tsx`. FAQPage schema on `/faq`; Article schema on each `/blog/[slug]`.
- **Content surfaces:** `/faq` (data: `lib/faqData.ts`), `/blog` + `/blog/[slug]` (data: `lib/posts.ts`), `/cases`. All bilingual via `lib/translations.ts` + `lib/LanguageContext`.
- Nav/Footer link to faq/blog/cases (`components/layout/Navbar.tsx`, `Footer.tsx`).

## Skills (run these)
- **`/seo-blog-research`** — research AI-automation competitors → write one bilingual, conversion-optimized post into `lib/posts.ts` (auto-added to `/blog` + sitemap) → log learnings here.
- **`/add-faq`** — generate GPT-optimized bilingual Q&A into `lib/faqData.ts` (auto-updates `/faq` + FAQPage schema).

## Conventions
- **Truthful only.** No fabricated testimonials, stats, prices, or guarantees (FTC + Meta + trust). Model numbers must be labelled illustrative (see `/cases`).
- **Bilingual:** every content item has `da` (primary) + `en`. Schemas use the `da` text.
- **AI-answer optimization:** phrase headings as the question a user asks; make the first sentence a complete standalone answer.
- **One post = one search intent.** Keyword-bearing `slug`, title ≤ ~60 chars, description ≤ ~155 chars.
- **Canonical + metadata** on every new page (`alternates.canonical`, title via the layout `%s — DinDrift` template).
- After any change: `npx tsc --noEmit`, then check `/sitemap.xml` + view-source JSON-LD. Keep Lighthouse ≥ 90.

## Ideas backlog (next moves)
- Per-product landing pages (sekretær, bogholder, chatbot, no-show) with own metadata + FAQ schema — strong long-tail intent.
- Internal linking: posts → relevant product/case pages.
- hreflang once EN gets its own routes (currently language is client-toggle, not route-based).
- Real, permissioned customer case studies (replace illustrative models when available).
- Blog cadence: 1 post/2 weeks via `/seo-blog-research`.

## Run log (what's been covered + competitor notes)
- 2026-06-03: Post #2 → `hvad-koster-ai-sekretaer-danmark` ("Hvad koster en AI-sekretær i Danmark?"). High-commercial cost intent. **Competitors on this query:** ai-ag.dk, finditconsultants.dk, dinero.dk, version2.dk all cover "hvad koster AI-agenter" generically; EN market (arsum, digitalagencynetwork, monetizebot) publishes detailed setup-fee + retainer pricing guides. **Gap owned:** founder-led, anti-agency, hiring-comparison framing in Danish; kept DinDrift's own prices unstated (truthful) — used setup-fee+retainer model + clearly-illustrative hiring comparison (full-time secretary ~30–40k kr/md is a public market fact, not a DinDrift claim). **Write next:** (a) "AI-sekretær vs. at ansætte en sekretær" as its own decision-intent post; (b) "Er AI automatisering GDPR-compliant i Danmark?" (trust/objection intent, uncontested in DK); (c) per-product landing pages per backlog.

## Error log (append mistakes so they're not repeated)
- 2026-06-03: Blog `paragraphs` render as plain text (no markdown) and the post page already has a `/kontakt` CTA button — don't put literal `/kontakt` paths in copy; write a natural "below" CTA instead.
- 2026-06-03: `lib/translations.ts` must be Read before Edit (harness rule). Nav keys live in BOTH `da` and `en` blocks — update both.
- 2026-06-03: Next 16 dynamic routes — `params` is a Promise; `await params` in `generateMetadata` and the page. JSON-LD/metadata/`generateStaticParams` must stay in the server `page.tsx`; language-toggle rendering goes in a `"use client"` child.
