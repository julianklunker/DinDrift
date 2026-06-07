// Generate an on-brand post and publish it to LinkedIn + Facebook.
//
//   node scripts/social/post.mjs                 # both platforms, English, interactive confirm
//   node scripts/social/post.mjs --platform=linkedin
//   node scripts/social/post.mjs --topic="Google Reviews Agent" --lang=da
//   node scripts/social/post.mjs --yes           # skip confirmation (for cron)
//   node scripts/social/post.mjs --link=https://dindrift.dk
//   node scripts/social/post.mjs --dry-run       # generate + print only, never publish
import { createInterface } from "node:readline/promises"
import { stdin, stdout } from "node:process"
import { loadEnv } from "./lib/env.mjs"
import { generatePost } from "./lib/generate.mjs"
import { postToLinkedIn } from "./lib/linkedin.mjs"
import { postToFacebook } from "./lib/facebook.mjs"

loadEnv()

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  if (hit) return hit.split("=").slice(1).join("=")
  if (process.argv.includes(`--${name}`)) return true
  return fallback
}

const platform = arg("platform", "both") // linkedin | facebook | both
const topic = arg("topic", "")
const lang = arg("lang", "en")
const link = arg("link", "")
const autoYes = !!arg("yes", false)
const dryRun = !!arg("dry-run", false)

const targets =
  platform === "both" ? ["linkedin", "facebook"] : [platform]

async function confirm(question) {
  if (autoYes) return true
  const rl = createInterface({ input: stdin, output: stdout })
  const a = (await rl.question(`${question} [y/N] `)).trim().toLowerCase()
  rl.close()
  return a === "y" || a === "yes"
}

async function main() {
  // Generate one draft per platform (each tuned to that platform's rules).
  const drafts = {}
  for (const p of targets) {
    process.stdout.write(`\nGenerating ${p} draft... `)
    drafts[p] = await generatePost({ platform: p, topic, lang })
    process.stdout.write("done\n")
  }

  for (const p of targets) {
    console.log(`\n${"─".repeat(60)}\n${p.toUpperCase()}\n${"─".repeat(60)}\n${drafts[p]}\n`)
  }

  if (dryRun) {
    console.log("\n(dry run — nothing published)\n")
    return
  }

  const ok = await confirm(`Publish to ${targets.join(" + ")}?`)
  if (!ok) {
    console.log("Aborted. Nothing published.")
    return
  }

  for (const p of targets) {
    try {
      if (p === "linkedin") {
        const { id } = await postToLinkedIn(drafts.linkedin)
        console.log(`✓ LinkedIn published${id ? ` (${id})` : ""}`)
      } else if (p === "facebook") {
        const { id } = await postToFacebook(drafts.facebook, link || undefined)
        console.log(`✓ Facebook published (${id})`)
      }
    } catch (e) {
      console.error(`✖ ${p} failed: ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
