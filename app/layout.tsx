import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import VideoBackground from "@/app/components/VideoBackground";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { SITE } from "@/app/data/site";

export const metadata: Metadata = {
  // IMPORTANT: pentru share corect + OG absolute URLs
  metadataBase: new URL(SITE.url),

  title: {
    default: "ANDYmedia",
    template: "%s | ANDYmedia",
  },
  description:
    "ANDYmedia — producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "ANDYmedia",
    title: "ANDYmedia",
    description:
      "Producție tehnică pentru evenimente: sunet, lumini, LED, scenă, broadcast. Execuție stabilă, fără stres.",
    locale: "ro_RO",
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
  // IMPORTANT: nu bloca zoom-ul global
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
