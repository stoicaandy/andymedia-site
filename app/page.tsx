import RotatingHeadline from "./components/RotatingHeadline";
import NewsSection from "./components/NewsSection";
import OffersSection from "./components/OffersSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      <div id="top" />

      {/* ridicat pe mobil: pt-14 (in loc de pt-20) */}
      <div className="relative z-10 pt-14 sm:pt-16 md:pt-20">
        {/* HERO */}
        {/* pe mobil mai mic: min-h-[84vh] (in loc de 92vh) */}
        <section className="relative min-h-[84vh] sm:min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden">
          <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-10">
            <p className="text-[12px] md:text-sm uppercase tracking-[0.26em] text-zinc-200/85">
              Da! Ai ajuns unde trebuie.
            </p>

            <h1 className="mt-3 max-w-3xl text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white/95">
              Soluții tehnice complete pentru evenimentul tău.
            </h1>

            <div className="mt-6 md:mt-8">
              <RotatingHeadline />
            </div>

            <p className="mt-5 md:mt-6 max-w-3xl text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white/90">
              Oricât de complexe și grandioase îndrăznești tu să visezi.
            </p>

            <p className="mt-3 text-sm md:text-base text-zinc-300/85 tracking-wide">
              Sunet • Lumini • LED • Scenă • Broadcast • Live / Studio Records • Booking
            </p>

            {/* CTA BUTTONS (mobile: 2 coloane) */}
            <div className="mt-7 md:mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href="#noutati"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
              >
                Noutăți
              </a>

              <a
                href="#oferte"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
              >
                Oferte
              </a>

              <a
                href="#despre-noi"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
              >
                Despre noi
              </a>

              <Link
                href="/parteneri"
                className="inline-flex items-center justify-center rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
              >
                Artiști
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-28 bg-gradient-to-t from-black to-transparent" />
        </section>

        {/* NOUTĂȚI */}
        <NewsSection />

        {/* OFERTE */}
        <OffersSection />

        {/* DESPRE NOI (teaser + CTA către pagina dedicată) */}
        <section id="despre-noi" className="scroll-mt-28 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-16 md:py-18">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-xl md:text-2xl font-medium tracking-wide">
                  Despre noi <span className="text-amber-300">.</span>
                </h2>

                <p className="mt-3 text-sm md:text-base text-zinc-300/85 leading-snug max-w-xl">
                  Producție tehnică pentru evenimente, construită pe control, claritate și execuție
                  impecabilă. Lucrăm organizat, previzibil și adaptat fiecărui proiect.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/despre-noi"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                  >
                    Citește varianta completă
                  </Link>

                  <Link
                    href="/cere-oferta"
                    className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                  >
                    Cere ofertă
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                  Ce primești când lucrezi cu noi
                </div>

                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "Echipamente profesionale, verificate constant",
                    "Setup curat, organizat și eficient",
                    "Comunicare clară înainte și în timpul evenimentului",
                    "Operare atentă pe toată durata evenimentului",
                    "Flexibilitate în situații neprevăzute",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href="/echipamente"
                    className="text-sm text-zinc-300/85 hover:text-white transition"
                  >
                    Vezi echipamentele →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
