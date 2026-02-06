// app/portofoliu/page.tsx

import type { Metadata } from "next";
import PortfolioGrid from "@/app/components/PortfolioGrid";
import { PORTFOLIO } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Portofoliu — ANDYmedia",
  description:
    "Proiecte livrate cap-coadă: sunet, lumini, LED, scenă, broadcast. Focus pe execuție stabilă și rezultate consistente."
};

export default function PortofoliuPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28">
      <header className="max-w-3xl">
        <p className="text-sm text-white/70">
          Da — aici vezi cum arată munca în teren.
        </p>

        <h1 className="mt-3 font-[family-name:var(--font-bebas-neue)] text-4xl tracking-wide text-white sm:text-5xl">
          Portofoliu
        </h1>

        <p className="mt-4 text-base leading-relaxed text-white/75">
          Câteva exemple demonstrative (foto + video local). Structura e gândită
          să fie ușor de multiplicat: adaugi item-uri în data și gata.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/cere-oferta"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Cere ofertă
          </a>
          <a
            href="/echipamente"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            Vezi echipamente
          </a>
        </div>
      </header>

      <PortfolioGrid items={PORTFOLIO} />

      <footer className="mt-10 max-w-3xl text-sm text-white/60">
        Tip: copiezi obiectele din{" "}
        <span className="text-white/75">app/data/portfolio.ts</span> ca să extinzi
        rapid portofoliul.
      </footer>
    </main>
  );
}
