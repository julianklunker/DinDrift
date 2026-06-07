// Facebook Page posting via the Graph API.
import { requireEnv } from "./env.mjs"

const GRAPH_VERSION = "v21.0"

/**
 * Publish text (and optional link) to the configured Facebook Page feed.
 * Uses a long-lived Page access token (see README for how to obtain one).
 * @param {string} text
 * @param {string} [link] Optional URL to attach.
 * @returns {Promise<{id: string}>}
 */
export async function postToFacebook(text, link) {
  const pageId = requireEnv("FB_PAGE_ID")
  const token = requireEnv("FB_PAGE_ACCESS_TOKEN")

  const params = new URLSearchParams({ message: text, access_token: token })
  if (link) params.set("link", link)

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/feed`,
    { method: "POST", body: params }
  )
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Facebook post failed: ${JSON.stringify(data)}`)
  }
  return { id: data.id }
}
