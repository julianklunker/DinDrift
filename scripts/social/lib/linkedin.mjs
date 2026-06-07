// LinkedIn Company Page posting via the Posts API (Community Management).
import { requireEnv, updateEnv } from "./env.mjs"

const LINKEDIN_VERSION = "202506" // bump occasionally; format YYYYMM

/** Exchange a refresh token for a fresh access token and persist it. */
export async function refreshAccessToken() {
  const clientId = requireEnv("LINKEDIN_CLIENT_ID")
  const clientSecret = requireEnv("LINKEDIN_CLIENT_SECRET")
  const refreshToken = requireEnv("LINKEDIN_REFRESH_TOKEN")

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`LinkedIn token refresh failed: ${JSON.stringify(data)}`)
  }
  updateEnv({ LINKEDIN_ACCESS_TOKEN: data.access_token })
  if (data.refresh_token) {
    updateEnv({ LINKEDIN_REFRESH_TOKEN: data.refresh_token })
  }
  return data.access_token
}

async function doPost(accessToken, orgId, text) {
  return fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": LINKEDIN_VERSION,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: `urn:li:organization:${orgId}`,
      commentary: text,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    }),
  })
}

/**
 * Publish text to the configured LinkedIn organization page.
 * Auto-refreshes the access token once on 401.
 * @returns {Promise<{id: string}>}
 */
export async function postToLinkedIn(text) {
  const orgId = requireEnv("LINKEDIN_ORG_ID")
  let accessToken = requireEnv("LINKEDIN_ACCESS_TOKEN")

  let res = await doPost(accessToken, orgId, text)

  if (res.status === 401) {
    accessToken = await refreshAccessToken()
    res = await doPost(accessToken, orgId, text)
  }

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`LinkedIn post failed (${res.status}): ${body}`)
  }
  // Post URN is returned in the x-restli-id / x-linkedin-id header.
  const id =
    res.headers.get("x-restli-id") || res.headers.get("x-linkedin-id") || ""
  return { id }
}
