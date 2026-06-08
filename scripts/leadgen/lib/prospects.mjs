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
