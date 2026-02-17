// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/app/data/site";

function normalizeBase(url: string) {
  return url.replace(/\/+$/, "");
}

function pickBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    "";

  if (env) {
    const withProto =
      env.startsWith("http://") || env.startsWith("https://")
        ? env
        : `https://${env}`;
    return normalizeBase(withProto.trim());
  }

  return normalizeBase(SITE.url);
}

const BASE = pickBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", // /
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
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
