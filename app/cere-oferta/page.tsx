import { Suspense } from "react";
import RequestForm from "./RequestForm";

export const metadata = {
  title: "Cere ofertă — ANDYmedia",
  description: "Trimite o cerere de ofertă. Oferta selectată se precompletează automat.",
};

export default function CereOfertaPage() {
  return (
    <main className="relative min-h-screen text-white">
      {/* doar cât să nu intre sub header */}
      <div className="relative z-10 pt-20 md:pt-24">
        <section>
          <div className="mx-auto max-w-6xl px-6 md:px-10 pt-6 pb-6 md:pt-7 md:pb-7">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-zinc-200/70">
                  Contact rapid
                </p>
                <h1 className="mt-2 text-xl md:text-2xl font-medium leading-tight text-white/95">
                  Cere ofertă <span className="text-amber-300">.</span>
                </h1>
                <p className="mt-1 text-sm text-zinc-300/85 leading-snug max-w-2xl">
                  Detalii esențiale → revenim rapid cu disponibilitate și soluție adaptată.
                </p>
              </div>

              {/* buton back (desktop) */}
              <a
                href="/#oferte"
                className="hidden md:inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                Înapoi la oferte
              </a>
            </div>

            <div className="mt-4">
              <Suspense fallback={<div className="text-sm text-zinc-300/85">Se încarcă...</div>}>
                <RequestForm />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Dacă vrei neapărat footer, îl afișăm doar pe ecrane înalte */}
        <footer className="border-t border-white/5 [@media(max-height:820px)]:hidden">
          <div className="mx-auto max-w-6xl px-6 md:px-10 py-5">
            <div className="text-xs text-gray-400">
              <span className="text-white/90 font-medium">ANDYmedia</span>
              <span className="mx-2 text-white/20">•</span>
              <span>Event production • Technical rentals</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
