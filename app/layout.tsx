import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/app/components/SiteHeader";
import VideoBackground from "@/app/components/VideoBackground";

export const metadata: Metadata = {
  title: "ANDYmedia",
  description:
    "ANDYmedia — evenimente corporate, trupe live, conferințe. Sunet profesional, execuție stabilă, fără stres.",
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
        <VideoBackground />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
