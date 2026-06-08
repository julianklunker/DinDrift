let loading: Promise<void> | null = null

/** Inject Calendly's widget assets exactly once. Safe to call repeatedly. */
export function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  // @ts-expect-error Calendly is attached to window by widget.js
  if (window.Calendly) return Promise.resolve()
  if (loading) return loading

  loading = new Promise<void>((resolve, reject) => {
    if (!document.querySelector("link[data-calendly]")) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      link.setAttribute("data-calendly", "true")
      document.head.appendChild(link)
    }
    const existing = document.querySelector<HTMLScriptElement>("script[data-calendly]")
    if (existing) {
      existing.addEventListener("load", () => resolve())
      return
    }
    const s = document.createElement("script")
    s.src = "https://assets.calendly.com/assets/external/widget.js"
    s.async = true
    s.setAttribute("data-calendly", "true")
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("Failed to load Calendly"))
    document.body.appendChild(s)
  })
  return loading
}
