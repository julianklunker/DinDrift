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
const langArg = arg("lang", "")
const langOverride = langArg === "da" || langArg === "en" ? langArg : ""
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
  let rows
  let skipped = []
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
