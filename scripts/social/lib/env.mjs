// Minimal .env.local reader/writer — no dependency on dotenv.
// Loads keys into process.env and lets the auth scripts persist tokens back.
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
// scripts/social/lib -> project root
export const ENV_PATH = resolve(__dirname, "../../../.env.local")

function parse(content) {
  const out = {}
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue
    const eq = line.indexOf("=")
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

/** Load .env.local into process.env (without overwriting already-set vars). */
export function loadEnv() {
  if (!existsSync(ENV_PATH)) return {}
  const parsed = parse(readFileSync(ENV_PATH, "utf8"))
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined) process.env[k] = v
  }
  return parsed
}

/** Read a required var or exit with a clear message. */
export function requireEnv(key) {
  const v = process.env[key]
  if (!v) {
    console.error(`\n✖ Missing ${key} in .env.local`)
    console.error(`  See scripts/social/README.md for setup.\n`)
    process.exit(1)
  }
  return v
}

/** Insert or update keys in .env.local, preserving the rest of the file. */
export function updateEnv(updates) {
  let content = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8") : ""
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}=.*$`, "m")
    const line = `${key}=${value}`
    if (re.test(content)) {
      content = content.replace(re, line)
    } else {
      if (content.length && !content.endsWith("\n")) content += "\n"
      content += line + "\n"
    }
    process.env[key] = value
  }
  writeFileSync(ENV_PATH, content, "utf8")
}
