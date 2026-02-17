import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.andymedia.ro";

  const routes = [
    "/",                 // home
    "/servicii",
    "/portofoliu",
    "/parteneri",
    "/echipamente",
    "/noutati",
    "/noutati/din-2017", // articol existent acum
    "/oferte",
    "/cere-oferta",
    "/despre-noi",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
