// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://www.andymedia.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pune aici rutele reale ale site-ului tău (cele importante)
  const routes = [
    "/",
    "/despre",
    "/servicii",
    "/portofoliu",
    "/noutati",
    "/contact",
    "/parteneri",
    "/echipamente",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
