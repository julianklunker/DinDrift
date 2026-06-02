// Typed, SSR-safe helpers for firing Meta Pixel events from client components.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Fire a standard Meta Pixel event (no-op if the pixel hasn't loaded). */
export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params)
  }
}

/** Fire the standard `Lead` conversion event. */
export function trackLead(params?: Record<string, unknown>) {
  trackPixel("Lead", params)
}
