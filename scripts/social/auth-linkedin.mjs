// One-time LinkedIn OAuth helper.
// Opens your browser, captures the auth code on localhost, exchanges it for an
// access + refresh token, lists the orgs you administer, and saves everything
// to .env.local.
//
//   node scripts/social/auth-linkedin.mjs
//
// Prereq: in your LinkedIn app (Auth tab) add this exact redirect URL:
//   http://localhost:5599/callback
import { createServer } from "node:http"
import { exec } from "node:child_process"
import { loadEnv, requireEnv, updateEnv } from "./lib/env.mjs"

loadEnv()

const PORT = 5599
const REDIRECT_URI = `http://localhost:${PORT}/callback`
// Community Management API scopes (needed to post to a Company Page).
const SCOPES = ["w_organization_social", "r_organization_social", "rw_organization_admin"]

const clientId = requireEnv("LINKEDIN_CLIENT_ID")
const clientSecret = requireEnv("LINKEDIN_CLIENT_SECRET")
const state = "dindrift_" + Math.random().toString(36).slice(2, 10)

function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`
  exec(cmd, (e) => {
    if (e) console.log(`\nOpen this URL manually:\n${url}\n`)
  })
}

async function exchangeCode(code) {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data
}

async function listAdminOrgs(accessToken) {
  const res = await fetch(
    "https://api.linkedin.com/rest/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "LinkedIn-Version": "202506",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data.elements || []).map((e) =>
    (e.organization || "").replace("urn:li:organization:", "")
  )
}

const authUrl =
  "https://www.linkedin.com/oauth/v2/authorization?" +
  new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    state,
    scope: SCOPES.join(" "),
  })

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  if (url.pathname !== "/callback") {
    res.writeHead(404).end()
    return
  }
  const code = url.searchParams.get("code")
  const err = url.searchParams.get("error_description")

  if (err || !code) {
    res.writeHead(400, { "Content-Type": "text/html" })
    res.end(`<h2>Authorization failed</h2><p>${err || "no code returned"}</p>`)
    console.error(`\n✖ ${err || "No code returned"}\n`)
    server.close()
    return
  }

  try {
    const token = await exchangeCode(code)
    updateEnv({
      LINKEDIN_ACCESS_TOKEN: token.access_token,
      ...(token.refresh_token
        ? { LINKEDIN_REFRESH_TOKEN: token.refresh_token }
        : {}),
    })

    const orgs = await listAdminOrgs(token.access_token)
    const orgLine =
      orgs.length === 1
        ? `Saved LINKEDIN_ORG_ID=${orgs[0]}`
        : orgs.length > 1
          ? `You administer multiple orgs: ${orgs.join(", ")} — set LINKEDIN_ORG_ID manually.`
          : `No admin orgs found via API — set LINKEDIN_ORG_ID manually (the number in your page's admin URL).`
    if (orgs.length === 1) updateEnv({ LINKEDIN_ORG_ID: orgs[0] })

    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(
      `<h2>✓ LinkedIn connected</h2><p>Tokens saved to .env.local. You can close this tab.</p><p>${orgLine}</p>`
    )
    console.log(`\n✓ Access token saved to .env.local`)
    console.log(`  Token expires in ~${Math.round((token.expires_in || 0) / 86400)} days (auto-refreshes).`)
    console.log(`  ${orgLine}\n`)
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/html" })
    res.end(`<h2>Token exchange failed</h2><pre>${e.message}</pre>`)
    console.error(`\n✖ Token exchange failed: ${e.message}\n`)
  } finally {
    setTimeout(() => server.close(), 500)
  }
})

server.listen(PORT, () => {
  console.log(`\nListening on ${REDIRECT_URI}`)
  console.log(`Opening LinkedIn authorization in your browser...`)
  console.log(`(If the page says "redirect_uri does not match", add`)
  console.log(`  ${REDIRECT_URI}`)
  console.log(`as an Authorized redirect URL in your LinkedIn app's Auth tab.)\n`)
  openBrowser(authUrl)
})
