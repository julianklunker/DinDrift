import { NextRequest, NextResponse } from "next/server"

const WAVESPEED_API_KEY = process.env.WAVESPEED_API_KEY
const WAVESPEED_BASE = "https://api.wavespeed.ai/api/v2"

export async function POST(request: NextRequest) {
  if (!WAVESPEED_API_KEY) {
    return NextResponse.json({ error: "Image generation not configured." }, { status: 503 })
  }

  try {
    const { prompt, model = "wavespeed-ai/flux-dev", width = 1024, height = 1024 } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 })
    }

    // Submit generation job
    const submitRes = await fetch(`${WAVESPEED_BASE}/${model}/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WAVESPEED_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, width, height, num_inference_steps: 28, guidance_scale: 3.5 }),
    })

    if (!submitRes.ok) {
      const err = await submitRes.text()
      return NextResponse.json({ error: `Wavespeed error: ${err}` }, { status: submitRes.status })
    }

    const job = await submitRes.json()
    const requestId = job?.data?.id

    if (!requestId) {
      return NextResponse.json({ error: "No request ID returned from Wavespeed." }, { status: 500 })
    }

    // Poll for result (up to 60s)
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000))

      const pollRes = await fetch(`${WAVESPEED_BASE}/predictions/${requestId}/`, {
        headers: { "Authorization": `Bearer ${WAVESPEED_API_KEY}` },
      })

      if (!pollRes.ok) continue

      const result = await pollRes.json()
      const status = result?.data?.status

      if (status === "completed") {
        const urls: string[] = result?.data?.outputs ?? []
        return NextResponse.json({ url: urls[0], urls })
      }

      if (status === "failed") {
        return NextResponse.json({ error: "Generation failed." }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Generation timed out after 60s." }, { status: 504 })
  } catch (err) {
    console.error("Wavespeed route error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
