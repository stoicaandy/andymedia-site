import Image from "next/image";
import Link from "next/link";
import { NEWS } from "@/app/data/news";

export const metadata = {
  title: "Noutăți",
  description: "Noutăți ANDYmedia: proiecte, echipamente noi, materiale media și update-uri.",
};

export default function NoutatiPage() {
  const items = [...NEWS].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-12">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-medium tracking-wide">
              Noutăți <span className="text-amber-300">.</span>
            </h1>

            {/* buton rapid către secțiunea din Home */}
            <a
              href="/#noutati"
              className="text-sm text-zinc-300/85 hover:text-white transition"
            >
              Înapoi la Home →
            </a>
          </div>

          <p className="mt-2 text-zinc-300/85 max-w-2xl">
            Update-uri, proiecte și materiale media. Fiecare noutate are pagină proprie (share corect).
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((x) => (
              <Link
                key={x.slug}
                href={`/noutati/${x.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-300/40 transition"
              >
                <div className="relative aspect-[16/9] bg-black/30">
                  <Image
                    src={x.ogImage}
                    alt={x.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    priority
                  />

                  {x.type === "video" ? (
                    <div className="pointer-events-none absolute inset-0 grid place-items-center">
                      <div className="rounded-full border border-white/30 bg-black/40 px-5 py-3 text-sm text-white/90">
                        ▶ Play
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">{x.date}</div>
                  <div className="mt-2 text-lg font-medium text-white/95">{x.title}</div>
                  <div className="mt-2 text-sm text-zinc-300/85">{x.description}</div>
                  <div className="mt-4 text-sm text-zinc-200/80">Deschide →</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/#noutati"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition inline-flex"
            >
              ← Înapoi la Noutăți (Home)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
