import type { Metadata } from "next";
import OffersSection from "../components/OffersSection";

export const metadata: Metadata = {
  title: "Oferte — ANDYmedia",
  description: "Pachete orientative pentru tipuri de evenimente (customizăm la proiect).",
};

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        <OffersSection standalone />

        <footer className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-10">
            <div className="text-sm text-gray-400">
              <div className="text-white font-medium">ANDYmedia</div>
              <div className="mt-1">Event production • Technical rentals</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
