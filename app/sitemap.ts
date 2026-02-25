import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicii",
    "/portofoliu",
    "/parteneri",
    "/echipamente",
    "/cere-oferta",
    "/despre-noi",
    "/noutati",
    "/oferte",
    "/booking",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}