import Image from "next/image";
import Link from "next/link";
import { offers } from "../data/offers";

export const metadata = {
  title: "Oferte — ANDYmedia",
  description: "Pachete orientative pentru evenimente. Verifică disponibilitatea și cere ofertă.",
};

export default function OfertePage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        {/* HEADER SECTION */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-14 md:py-16">
            <p className="text-[12px] md:text-sm uppercase tracking-[0.26em] text-zinc-200/85">
              Pachete orientative
            </p>

            <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white/95">
              Oferte <span className="text-amber-300">.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm md:text-base text-zinc-300/85 tracking-wide">
              Urcă imaginile în <span className="text-white/90">/public/oferte/</span> (ex:
              <span className="text-white/90"> oferta1.jpg</span>) și completează textul descriptiv în{" "}
              <span className="text-white/90">app/data/offers.ts</span>. Fiecare ofertă are buton către
              formularul “Cere ofertă”, precompletat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#noutati"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
              >
                Vezi noutăți
              </Link>

              <Link
                href="/cere-oferta"
                className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-7 py-4 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
              >
                Cere ofertă
              </Link>
            </div>
          </div>
        </section>

        {/* OFFERS GRID */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-14 md:py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <article
                  key={offer.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                >
                  {/* IMAGE (fixed ratio for identical responsive behavior) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={offer.imageSrc}
                      alt={offer.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transition"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {offer.badge ? (
                      <div className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-amber-200">
                        {offer.badge}
                      </div>
                    ) : null}
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-lg md:text-xl font-medium text-white/95">
                        {offer.title}
                      </h2>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                        {offer.id}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-zinc-300/85">{offer.description}</p>

                    {/* BULLETS (like echipamente) */}
                    <ul className="mt-4 space-y-2 text-sm text-zinc-200/85">
                      {offer.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
