import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "@/app/components/PortfolioGrid";
import { portfolioItems } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Portofoliu | ANDYmedia",
  description:
    "Portofoliu ANDYmedia: evenimente corporate, nunți, spectacole, conferințe. Sonorizare, lumini, LED, DJ, broadcast – Iași și la nivel național.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-16">
          <h1 className="text-3xl md:text-4xl font-medium">
            Portofoliu <span className="text-amber-300">.</span>
          </h1>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            Selecție de evenimente livrate de ANDYmedia. Focus pe execuție: sunet,
            lumini, LED, DJ, broadcast și echipă tehnică.
          </p>

          <div className="mt-6">
            <Link
              href="/cere-oferta"
              className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-black font-medium hover:bg-amber-300 transition"
            >
              Cere ofertă
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-20">
          <PortfolioGrid items={portfolioItems} />
        </section>
      </div>
    </main>
  );
}
