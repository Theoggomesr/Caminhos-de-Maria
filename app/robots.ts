
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    .replace(/\/$/, "");

  const baseUrl = siteUrl
    ? new URL(siteUrl).origin
    : "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin", "/api/"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,

    host: baseUrl,
  };
}
