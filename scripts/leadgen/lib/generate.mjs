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
DKK 5,000, delivered in 1-2 weeks, direct line to Julian (no ticket queues).

Voice: warm, specific, peer-to-peer - never hypey, never a mass-mail template.
You are writing to ONE real person about THEIR business.
HARD RULES - never break:
- NEVER fabricate clients, testimonials, numbers, or results.
- NEVER claim you have "already built" them an agent.
- The connection note must NOT pitch or sell - it is only a genuine reason to connect.
- Be transparent about who you are. Keep an easy, low-pressure out.
`.trim()

/**
 * @param {object} prospect  Row from prospects.csv (name, role, company, city, observation, lang, angle, segment)
 * @param {number} index     Row index, used for deterministic offer rotation.
 * @param {string} [langOverride]  "da" | "en" to override the row.
 * @returns {Promise<{note:string, dm:string, nudge:string, offer:string}>}
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
    ? `This is a SOLO / one-person business (freelancer/independent consultant). They wear every hat and are price-sensitive. Emphasize TIME reclaimed and AFFORDABLE entry ("enterprise-level automation, SMB pricing"). Suggest lightweight wins (email assistant, booking, follow-up) - NOT heavy multi-agent systems. Do not use team/staff language.`
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
- What I noticed about them (use this to personalize - this is the hook): ${prospect.observation}
- Service angle to lean toward (optional): ${prospect.angle || "(pick the most relevant DinDrift service)"}

${segmentGuide}

${offer}

Write THREE messages for a LinkedIn outreach sequence:
1. "note" - the connection request note. MAX 280 characters. Warm, references what I noticed. NO pitch, NO offer, NO link. Just a real reason to connect.
2. "dm" - a value-first follow-up message to send ~4 days after they accept. Reference their specific situation, give one concrete useful idea, then the soft offer above with the booking link. Transparent (I'm Julian from DinDrift). End with an easy out (e.g. "no worries if not relevant"). 80-130 words.
3. "nudge" - a short, friendly nudge if they don't reply (~5 days later). 1-2 sentences, no guilt, easy out.

Reference (DinDrift notes - for grounding only, do not quote verbatim):
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
