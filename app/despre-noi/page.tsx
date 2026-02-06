import Link from "next/link";

export const metadata = {
  title: "Despre noi — ANDYmedia",
  description:
    "Producție tehnică pentru evenimente: sunet, lumini, LED, scenă și broadcast. Control, claritate, execuție impecabilă.",
};

export default function DespreNoiPage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24 pb-12">
        {/* HERO */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 pt-10 pb-10 md:pt-12 md:pb-12">
            <p className="text-[12px] md:text-sm uppercase tracking-[0.26em] text-zinc-200/85">
              Despre ANDYmedia
            </p>

            <h1 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white/95 max-w-4xl">
              Producție tehnică pentru evenimente, construită pe control, claritate și execuție impecabilă.
            </h1>

            <p className="mt-4 max-w-3xl text-sm md:text-base text-zinc-300/85 leading-snug">
              ANDYmedia oferă soluții complete de sunet, lumini, LED, scenă și broadcast pentru evenimente
              unde lucrurile trebuie să funcționeze perfect, de la primul minut până la ultimul aplauz.
              Lucrăm organizat, previzibil și adaptat fiecărui proiect — indiferent de complexitate.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/cere-oferta"
                className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
              >
                Cere ofertă
              </Link>

              <Link
                href="/echipamente"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
              >
                Vezi echipamente
              </Link>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-12 md:py-14">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Cine suntem */}
              <div>
                <h2 className="text-lg md:text-xl font-medium text-white/95">
                  Cine suntem <span className="text-amber-300">.</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-zinc-300/85 leading-snug">
                  Suntem o echipă specializată în producție tehnică pentru evenimente live, corporate și
                  producții speciale. Ne concentrăm pe partea care contează cel mai mult într-un eveniment:
                  siguranța tehnică, calitatea execuției și lipsa surprizelor.
                </p>
                <p className="mt-3 text-sm md:text-base text-zinc-300/85 leading-snug">
                  Nu lucrăm pe “pachete standard”. Fiecare proiect este analizat în funcție de spațiu,
                  public și obiective.
                </p>
              </div>

              {/* Ce facem */}
              <div>
                <h2 className="text-lg md:text-xl font-medium text-white/95">
                  Ce facem <span className="text-amber-300">.</span>
                </h2>

                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "Sunet profesional (PA, monitorizare, control)",
                    "Lumini ambientale și de efect",
                    "Ecrane LED & video",
                    "Scenă și structură",
                    "Broadcast, livestream și producții live / studio",
                    "Setup, operare și suport tehnic pe toată durata evenimentului",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cum lucrăm */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <h2 className="text-lg md:text-xl font-medium text-white/95">
                Cum lucrăm <span className="text-amber-300">.</span>
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {[
                  "Analizăm cerințele reale ale evenimentului.",
                  "Alegem configurația potrivită spațiului și tipului de public.",
                  "Pregătim echipamentele și testăm înainte de eveniment.",
                  "Asigurăm operare atentă, cu redundanță unde este necesar.",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="text-sm text-zinc-200/90 leading-snug">{x}</div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm text-zinc-300/85 italic">
                Preferăm să prevenim problemele, nu să le rezolvăm în timpul evenimentului.
              </p>
            </div>

            {/* De ce noi + Tipuri evenimente */}
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-lg md:text-xl font-medium text-white/95">
                  De ce ANDYmedia <span className="text-amber-300">.</span>
                </h2>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "Echipamente profesionale, verificate constant",
                    "Setup curat, organizat și eficient",
                    "Comunicare clară înainte și în timpul evenimentului",
                    "Flexibilitate în situații neprevăzute",
                    "Execuție discretă, orientată pe rezultat",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg md:text-xl font-medium text-white/95">
                  Tipuri de evenimente <span className="text-amber-300">.</span>
                </h2>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-zinc-200/85">
                  {[
                    "Evenimente corporate",
                    "Conferințe & congrese",
                    "Lansări de produs",
                    "Spectacole & show-uri live",
                    "Nunți & petreceri private",
                    "Producții live / studio / broadcast",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-amber-300/70 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA final */}
            <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-6 md:p-7">
              <h3 className="text-lg md:text-xl font-medium text-white/95">
                Ai un eveniment în plan?
              </h3>
              <p className="mt-2 text-sm md:text-base text-zinc-200/85 max-w-3xl leading-snug">
                Spune-ne câteva detalii despre proiectul tău și revenim cu o soluție tehnică adaptată, fără
                obligații.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/cere-oferta"
                  className="rounded-xl border border-amber-300/40 bg-black/25 px-6 py-3 text-sm hover:bg-black/35 transition"
                >
                  Cere ofertă
                </Link>
                <Link
                  href="/echipamente"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                >
                  Vezi echipamente
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
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
