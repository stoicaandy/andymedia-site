import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";
import { SITE, SITE_URL } from "@/app/data/site";

export const metadata: Metadata = {
  title: `Parteneri & Booking — ${SITE.brand}`,
  description:
    "Parteneri ANDYmedia: trupe exclusive, DJ, foto-video și colaborări. Booking în dezvoltare — adăugăm constant noi artiști.",
  alternates: { canonical: "/parteneri" },
  openGraph: {
    title: `Parteneri & Booking — ${SITE.brand}`,
    description:
      "Trupe exclusive, DJ, foto-video și colaborări. Booking în dezvoltare — adăugăm constant noi artiști.",
    url: "/parteneri", // absolut prin metadataBase din layout
    siteName: SITE.brand,
    type: "website",
  },
};

export default function ParteneriPage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <PartnersClient baseUrl={SITE_URL} />
      </div>
    </main>
  );
}
