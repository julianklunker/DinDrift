import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

const BASE = "https://dindrift.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ai-control-system`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/priser`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/cases`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/privatlivspolitik`, changeFrequency: "yearly", priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
