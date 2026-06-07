# DinDrift — Social auto-posting

Generate an on-brand post with Claude and publish it to your **LinkedIn Company
Page** and **Facebook Page** from one command.

```
npm run social:draft     # generate + preview only (never publishes)
npm run social:post      # generate, preview, confirm, publish to both
npm run social:auth      # one-time LinkedIn OAuth
```

All secrets live in `.env.local` (gitignored). Nothing here is ever committed.

---

## ⚠️ First: rotate your LinkedIn secret

You pasted your client secret into a chat. Treat it as compromised:

1. LinkedIn Developer portal → your app → **Auth** tab → **Generate a new client secret**.
2. Paste the new value into `.env.local` as `LINKEDIN_CLIENT_SECRET`.

---

## Setup — LinkedIn (Company Page)

Posting to a Company Page requires LinkedIn's **Community Management API**, which
needs app approval. Plan for this — it's the one step with a wait.

1. **Be an admin** of the Company Page (Super/Content admin).
2. LinkedIn app → **Products** → request **Community Management API**. Approval
   can take a few days. (The "Share on LinkedIn" product alone only allows
   *personal* posts, not Company Page posts.)
3. LinkedIn app → **Auth** tab → add this Authorized redirect URL **exactly**:
   ```
   http://localhost:5599/callback
   ```
4. Confirm `LINKEDIN_CLIENT_ID` and the regenerated `LINKEDIN_CLIENT_SECRET` are
   in `.env.local`.
5. Run:
   ```
   npm run social:auth
   ```
   Your browser opens, you approve, and the script saves
   `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_REFRESH_TOKEN`, and (if it can detect it)
   `LINKEDIN_ORG_ID` back to `.env.local`.
   - If `LINKEDIN_ORG_ID` isn't auto-filled, it's the number in your page's admin
     URL: `linkedin.com/company/<id>/admin/` → set it manually.

Access tokens last ~60 days and **auto-refresh** on the next post via the stored
refresh token (valid ~1 year). Re-run `social:auth` once a year.

---

## Setup — Facebook (Page)

1. You need a Meta app with **`pages_manage_posts`** and
   **`pages_read_engagement`** permissions, and admin rights on the Page.
2. Get a **long-lived Page access token**. Quickest path:
   - [Graph API Explorer](https://developers.facebook.com/tools/explorer/) →
     select your app → add the two permissions above → **Generate Access Token**.
   - Exchange the short-lived user token for a long-lived one, then read the Page
     token from `/me/accounts`. (Page tokens derived from a long-lived user token
     don't expire.) Meta's
     [Access Token Tool](https://developers.facebook.com/tools/debug/accesstoken/)
     shows expiry — confirm it says *Never*.
3. Put the values in `.env.local`:
   ```
   FB_PAGE_ID=<your page id>
   FB_PAGE_ACCESS_TOKEN=<long-lived page token>
   ```

---

## Usage

```
# Preview only — safe, costs one Claude call, publishes nothing
npm run social:draft

# Full run: generate → preview → y/N confirm → publish to both
npm run social:post

# Target one platform
node scripts/social/post.mjs --platform=linkedin
node scripts/social/post.mjs --platform=facebook

# Steer the topic / language / attach a link
node scripts/social/post.mjs --topic="Google Reviews Agent" --lang=da
node scripts/social/post.mjs --link=https://dindrift.dk

# Unattended (skips confirmation) — for cron / Task Scheduler
node scripts/social/post.mjs --yes
```

Flags: `--platform=linkedin|facebook|both` · `--topic="..."` · `--lang=da|en`
· `--link=URL` · `--yes` (no prompt) · `--dry-run` (never publish).

---

## Scheduling (optional)

Because this is a local script, schedule it with **Windows Task Scheduler**:

- Program: `node`
- Arguments: `scripts/social/post.mjs --yes --lang=da`
- Start in: the project folder

Recommend `--dry-run` in a log for a week before going unattended, so you can
review the drafts the model produces.

> The generator is instructed never to fabricate clients, testimonials, or
> results. Still review unattended output periodically — you own what the Page
> publishes.
