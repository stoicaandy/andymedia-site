import type { Metadata } from "next";
import EchipamenteClient from "./EchipamenteClient";

export const metadata: Metadata = {
  title: "Echipamente — ANDYmedia",
  description: "Inventar echipamente ANDYmedia (fără prețuri).",
  alternates: { canonical: "/echipamente" },
  openGraph: {
    title: "Echipamente — ANDYmedia",
    description: "Inventar echipamente ANDYmedia (fără prețuri).",
    url: "/echipamente",
    type: "website",
    locale: "ro_RO",
  },
};

export default function Page() {
  return <EchipamenteClient />;
}