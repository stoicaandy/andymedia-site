import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import VideoBackground from "@/app/components/VideoBackground";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { SITE, SITE_URL } from "@/app/data/site";
import { Analytics } from "@vercel/analytics/react";

const OG_IMAGE_PATH = "/og/schela-lumini-iasi.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE.brand,
    template: `%s | ${SITE.brand}`,
  },

  description:
    "ANDYmedia — producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",

  // IMPORTANT: NU pune canonical aici (altfel se moștenește greșit pe toate paginile)

  openGraph: {
    type: "website",
    siteName: SITE.brand,
    title: SITE.brand,
    description:
      "Producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",
    locale: "ro_RO",
    images: [
      {
        url: OG_IMAGE_PATH,
        secureUrl: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "ANDYmedia — schelă lumini și producție tehnică evenimente (Iași)",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.brand,
    description:
      "ANDYmedia — producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",
    images: [OG_IMAGE_PATH],
  },

  other: {
    "og:image:secure_url": new URL(OG_IMAGE_PATH, SITE_URL).toString(),
    "og:image:type": "image/jpeg",
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
        <Analytics />
      </body>
    </html>
  );
}