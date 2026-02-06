"use client";

import Image from "next/image";
import Link from "next/link";
import { offers } from "../data/offers";

type OffersSectionProps = {
  standalone?: boolean;
};

export default function OffersSection({ standalone }: OffersSectionProps) {
  return (
    <section
      id={standalone ? undefined : "oferte"}
      className={standalone ? "border-b border-white/5" : "scroll-mt-28 border-t border-white/5"}
    >
      <div className="mx-auto max-w-6xl px-8 md:px-10 py-12 md:py-14">
        <h2 className="text-xl md:text-2xl font-medium tracking-wide">
          Oferte <span className="text-amber-300">.</span>
        </h2>

        <p className="mt-2 text-gray-300 max-w-2xl">
          Pachete orientative pentru tipuri de evenimente (customizăm la proiect).
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              {/* imagine: fără crop agresiv, păstrează 16:9 și object-contain */}
              <div className="relative aspect-[16/9] w-full bg-black/30">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={offer.id === "oferta1"}
                />
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-medium text-white/95">
                    {offer.title}
                  </h3>

                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/60">
                    {offer.id.toUpperCase()}
                  </div>
                </div>

                <p className="mt-2 text-sm text-zinc-300/85 leading-snug">
                  {offer.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {offer.bullets.map((b: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-sm text-zinc-200/85 leading-snug">
                      <span className="mt-[7px] h-[7px] w-[7px] rounded-full bg-amber-300/80 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/cere-oferta?oferta=${encodeURIComponent(offer.id)}`}
                    className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                  >
                    Verifică disponibilitatea
                  </Link>

                  <Link
                    href={`/cere-oferta?oferta=${encodeURIComponent(offer.id)}`}
                    className="text-sm text-zinc-200/80 hover:text-white transition"
                  >
                    Cere ofertă →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!standalone && (
          <div className="mt-10">
            <Link
              href="/oferte"
              className="inline-flex rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
            >
              Vezi toate ofertele →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
