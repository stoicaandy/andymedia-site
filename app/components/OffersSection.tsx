import Image from "next/image";
import Link from "next/link";
import { offers } from "../data/offers";

export default function OffersSection() {
  return (
    <section id="oferte" className="scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10 pt-8 pb-14 md:pt-10 md:pb-16">
        <h2 className="text-xl md:text-2xl font-medium tracking-wide">
          Oferte <span className="text-amber-300">.</span>
        </h2>

        <p className="mt-2 text-gray-300 max-w-2xl">
          Pachete orientative pentru tipuri de evenimente (customizăm la proiect).
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
            >
              {/* IMAGINE — raport real JPG (2048x921) */}
              <div className="relative aspect-[2048/921] w-full bg-black/30">
                <Image
                  src={offer.imageSrc}
                  alt={offer.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {offer.badge && (
                  <div className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-amber-200">
                    {offer.badge}
                  </div>
                )}
              </div>

              {/* TEXT — comprimat (scop: să se apropie ca înălțime de poză) */}
              <div className="pt-2 px-4 pb-3 md:px-5 md:pt-2 md:pb-4">
                {/* TITLU: fără spațiu irosit */}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg md:text-[19px] font-medium text-white/95 leading-tight">
                    {offer.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                    {offer.id}
                  </span>
                </div>

                {/* DESCRIERE: leading strâns + margine mică */}
                <p className="mt-1 text-sm md:text-[14.5px] text-zinc-300/85 leading-tight">
                  {offer.description}
                </p>

                {/* BULLETS: spațiu vertical minim */}
                <ul className="mt-2 space-y-0.5 text-sm md:text-[14.5px] text-zinc-200/85">
                  {offer.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span className="leading-tight">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* BUTOANE: spațiu deasupra/sub mic + buton mai “low profile” */}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/cere-oferta?oferta=${encodeURIComponent(offer.id)}`}
                    className="inline-flex items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10 px-5 py-1.5 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                  >
                    Verifică disponibilitatea
                  </Link>

                  <Link
                    href={`/cere-oferta?oferta=${encodeURIComponent(offer.id)}`}
                    className="text-sm text-zinc-300/85 hover:text-white transition"
                  >
                    Cere ofertă →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-zinc-300/85">
            Notă: pachetele sunt orientative. Adaptăm configurația în funcție de spațiu, public, scenă și
            complexitatea evenimentului.
          </p>
        </div>
      </div>
    </section>
  );
}
