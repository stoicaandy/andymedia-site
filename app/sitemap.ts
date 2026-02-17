import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.andymedia.ro";
  const now = new Date();

  const routes = [
    "/",
    "/servicii",
    "/portofoliu",
    "/parteneri",
    "/echipamente",
    "/noutati",
    "/noutati/din-2017",
    "/oferte",
    "/cere-oferta",
    "/despre-noi",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
