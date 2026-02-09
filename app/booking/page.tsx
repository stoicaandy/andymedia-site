import type { Metadata } from "next";
import { Suspense } from "react";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Booking — Aplică să apari pe ANDYmedia",
  description:
    "Ești trupă, DJ, artist sau foto-video? Aplică pentru listare în zona de booking ANDYmedia.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        <section>
          <div className="mx-auto max-w-6xl px-6 md:px-10 pt-6 pb-10 md:pt-7 md:pb-12">
            <p className="text-[11px] uppercase tracking-[0.26em] text-zinc-200/70">
              ANDYmedia • Booking
            </p>

            <h1 className="mt-2 text-xl md:text-2xl font-medium leading-tight text-white/95">
              Aplică pentru listare <span className="text-amber-300">.</span>
            </h1>

            <p className="mt-2 text-sm md:text-base text-zinc-300/85 leading-snug max-w-3xl">
              Trimite datele de bază + linkuri oficiale. Revenim rapid cu pașii pentru publicare.
            </p>

            <div className="mt-6">
              <Suspense fallback={<div className="text-sm text-zinc-300/85">Se încarcă...</div>}>
                <ApplyForm />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
