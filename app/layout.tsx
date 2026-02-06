import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import SiteHeader from "./components/SiteHeader";
import VideoBackground from "./components/VideoBackground";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andymedia.ro"),
  title: {
    default: "ANDYmedia",
    template: "%s | ANDYmedia",
  },
  description: "Producție video & foto. Evenimente, conținut brand, servicii tehnice.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://andymedia.ro",
    siteName: "ANDYmedia",
    title: "ANDYmedia",
    description: "Producție video & foto. Evenimente, conținut brand, servicii tehnice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${bebas.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased">
        {/* Global background */}
        <VideoBackground />

        {/* App shell */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>

          <footer className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/70">
              ANDYmedia • Event Production • Technical
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
