import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dindrift.com/sitemap.xml",
    host: "https://dindrift.com",
  }
}
