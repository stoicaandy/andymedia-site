import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parteneri",
  description: "Trupe și parteneri ANDYmedia.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-16">
          <h1 className="text-3xl md:text-4xl font-medium">
            Parteneri <span className="text-amber-300">.</span>
          </h1>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            Aici punem logo-uri + nume, colaborări și ce facem împreună.
          </p>
        </section>
      </div>
    </main>
  );
}
