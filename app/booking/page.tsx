import type { Metadata } from "next";
import { Suspense } from "react";
import ApplyForm from "./ApplyForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking — Aplică să apari pe ANDYmedia",
  description:
    "Ești trupă, DJ, artist sau foto-video? Aplică să apari în zona noastră de booking. Cerințe clare, listare premium și promovare.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Booking — Aplică să apari pe ANDYmedia",
    description:
      "Aplică să apari în zona noastră de booking. Cerințe clare, listare premium și promovare.",
    url: "/booking",
    type: "website",
    locale: "ro_RO",
  },
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl px-8 md:px-10 pt-6 pb-10 md:pt-7 md:pb-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-zinc-200/70">
                  ANDYmedia • Booking
                </p>

                <h1 className="mt-2 text-xl md:text-2xl font-medium leading-tight text-white/95">
                  Vrei să apari în zona noastră de booking{" "}
                  <span className="text-amber-300">?</span>
                </h1>

                <p className="mt-2 text-sm md:text-base text-zinc-300/85 leading-snug max-w-3xl">
                  Căutăm trupe, DJ, artiști și echipe foto-video care lucrează
                  organizat și livreză calitate. Listarea e “premium”: card cu poză,
                  descriere + linkuri oficiale (site/FB/IG/YouTube) și posibil
                  demo video.
                </p>
              </div>

              <div className="hidden md:flex gap-3">
                <Link
                  href="/parteneri"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                >
                  Vezi partenerii
                </Link>
                <Link
                  href="/cere-oferta"
                  className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                >
                  Cere ofertă
                </Link>
              </div>
            </div>

            {/* BENEFICII + CERINȚE */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                  Ce primești
                </div>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "Profil premium pe ANDYmedia (card + linkuri oficiale + opțional demo YouTube).",
                    "Vizibilitate: clienții care caută booking ajung și la tine (și invers).",
                    "Asociere cu producție tehnică pro (sunet/lumini/LED) — contează mult la corporate.",
                    "Recomandări mai potrivite: public/oraș/buget → matching mai bun, mai puțin timp pierdut.",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                  Ce avem nevoie de la tine
                </div>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "1 poză principală (JPG) 2000px lățime (min 1600px), 70–85% calitate, sub ~600KB.",
                    "Nume + oraș + categorie (Trupă/DJ/Artist/Foto-Video).",
                    "Descriere scurtă (max 300 caractere) + 3–6 taguri (ex: corporate, nuntă, party).",
                    "Linkuri oficiale: site / Facebook / Instagram / YouTube (unde există).",
                    "Opțional: ID video YouTube pentru preview (un demo bun face diferența).",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
        </section>

        {/* FORM */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-xl md:text-2xl font-medium tracking-wide">
                  Aplică acum <span className="text-amber-300">.</span>
                </h2>

                <p className="mt-3 text-sm md:text-base text-zinc-300/85 leading-snug">
                  Completezi formularul → verificăm informațiile → îți cerem (dacă e nevoie)
                  ajustări la poză/descriere → apoi te listăm.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/parteneri"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                  >
                    Înapoi la parteneri
                  </Link>
                  <Link
                    href="/cere-oferta"
                    className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                  >
                    Cere ofertă (client)
                  </Link>
                </div>
              </div>

              <div>
                <Suspense fallback={<div className="text-sm text-zinc-300/85">Se încarcă...</div>}>
                  <ApplyForm />
                </Suspense>

                <p className="mt-3 text-xs text-zinc-400/70">
                  Notă: nu publicăm date sensibile. Linkurile afișate sunt cele oficiale pe care ni le trimiți.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER simplu */}
        <footer className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-10">
            <div className="text-sm text-gray-400">
              <div className="text-white font-medium">ANDYmedia</div>
              <div className="mt-1">Booking • Event production • Technical</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
