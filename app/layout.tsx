import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import VideoBackground from "@/app/components/VideoBackground";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { SITE, SITE_URL } from "@/app/data/site";

export const metadata: Metadata = {
  // OG + canonical absolute corect (prod / preview)
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE.brand,
    template: `%s | ${SITE.brand}`,
  },

  description:
    "ANDYmedia — producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/", // se rezolvă absolut din metadataBase
    siteName: SITE.brand,
    title: SITE.brand,
    description:
      "Producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",
    locale: "ro_RO",
    images: [
      {
        url: "/og/schela-lumini-iasi.jpg",
        width: 1200,
        height: 630,
        alt: "ANDYmedia — schelă lumini și producție tehnică evenimente (Iași)",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.brand,
    description:
      "ANDYmedia — producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",
    images: ["/og/schela-lumini-iasi.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-black text-white">
        <JsonLd />
        <VideoBackground />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
