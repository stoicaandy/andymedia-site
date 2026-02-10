import type { Metadata } from "next";
import { headers } from "next/headers";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Parteneri & Booking — ANDYmedia",
  description:
    "Parteneri ANDYmedia: trupe exclusive, DJ, foto-video și colaborări. Booking în dezvoltare — adăugăm constant noi artiști.",
  alternates: { canonical: "/parteneri" },
  openGraph: {
    title: "Parteneri & Booking — ANDYmedia",
    description:
      "Trupe exclusive, DJ, foto-video și colaborări. Booking în dezvoltare — adăugăm constant noi artiști.",
    url: "/parteneri",
    siteName: "ANDYmedia",
    type: "website",
  },
};

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

async function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    "";

  if (env) {
    if (env.startsWith("http://") || env.startsWith("https://")) return normalizeBaseUrl(env);
    return normalizeBaseUrl(`https://${env}`);
  }

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return normalizeBaseUrl(`${proto}://${host}`);
}

export default async function ParteneriPage() {
  const baseUrl = await getBaseUrl();

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <PartnersClient baseUrl={baseUrl} />
      </div>
    </main>
  );
}
