import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/client/design"],
    },
    sitemap: "https://aidevdesign.com/sitemap.xml",
  };
}
