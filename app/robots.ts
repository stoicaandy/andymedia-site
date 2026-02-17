// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/app/data/site";

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim()) ||
  SITE.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    host: siteUrl.replace(/\/$/, ""),
  };
}
