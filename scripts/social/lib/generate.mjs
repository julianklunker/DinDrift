// Drafts an on-brand social post with Claude, grounded in marketing.md.
import Anthropic from "@anthropic-ai/sdk"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { requireEnv } from "./env.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../../..")

function readIfExists(rel) {
  const p = resolve(ROOT, rel)
  return existsSync(p) ? readFileSync(p, "utf8") : ""
}

const BRAND = `
You write social media posts for DinDrift — bespoke AI automation agents for
Danish & European SMBs. Owner: Julian Zachar-Fink (solo full-stack developer,
Aalborg/Copenhagen, Denmark). Contact: dindriftai@gmail.com | dindrift.dk.
Tagline: "The limit is your imagination." Brand colour #0015ff.

Voice: confident, concrete, helpful — never hypey or salesy. Lead with a real
business pain, then the outcome an AI agent delivers. Short sentences.
NEVER fabricate clients, testimonials, numbers, or case-study results.
`.trim()

const RULES = {
  linkedin: `Platform: LinkedIn Company Page (B2B audience).
- 120–200 words. Professional but human.
- Open with a hook line, then 2–4 short paragraphs or a tight list.
- End with a soft CTA (book a 30-min discovery call / reply / visit dindrift.dk).
- 3–5 relevant hashtags on the final line (e.g. #AIautomation #SMB #Denmark).
- Plain text only — no markdown headings, no asterisks.`,
  facebook: `Platform: Facebook Page (broad SMB owner audience).
- 60–120 words. Warmer, more conversational than LinkedIn.
- One clear idea, one clear CTA. A couple of emojis are fine, don't overdo it.
- 2–3 hashtags max on the final line.
- Plain text only — no markdown.`,
}

/**
 * @param {object} opts
 * @param {"linkedin"|"facebook"} opts.platform
 * @param {string} [opts.topic]   Optional steer, e.g. a service or angle.
 * @param {"da"|"en"} [opts.lang] Default "en".
 * @returns {Promise<string>} The post text.
 */
export async function generatePost({ platform, topic = "", lang = "en" }) {
  const apiKey = requireEnv("ANTHROPIC_API_KEY")
  const client = new Anthropic({ apiKey })

  const marketing = readIfExists("marketing.md").slice(0, 6000)
  const language =
    lang === "da" ? "Write the post in Danish." : "Write the post in English."

  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 700,
    system: BRAND,
    messages: [
      {
        role: "user",
        content: `${RULES[platform]}

${language}

${topic ? `Topic / angle to focus on: ${topic}` : "Pick the single most compelling angle from the reference below."}

Reference (DinDrift marketing notes — for grounding only, do not quote verbatim):
"""
${marketing}
"""

Return ONLY the finished post text. No preamble, no explanation, no quotes around it.`,
      },
    ],
  })

  return msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim()
}
