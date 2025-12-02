import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://labcast.com.au";
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
    },
    {
      url: `${base}/rendervault`,
      lastModified,
    },
    {
      url: `${base}/services`,
      lastModified,
    },
    {
      url: `${base}/pricing`,
      lastModified,
    },
  ];
}
