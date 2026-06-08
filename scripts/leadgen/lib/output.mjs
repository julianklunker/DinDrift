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
