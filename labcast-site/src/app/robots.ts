import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://labcast.com.au";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/rendervault"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
