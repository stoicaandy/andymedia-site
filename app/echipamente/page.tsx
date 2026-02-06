import type { Metadata } from "next";
import EchipamenteClient from "./EchipamenteClient";

export const metadata: Metadata = {
  title: "Echipamente",
  description: "Inventar echipamente ANDYmedia (fără prețuri).",
};

export default function Page() {
  return <EchipamenteClient />;
}
