import Image from "next/image";
import Link from "next/link";
import { NEWS } from "@/app/data/news";

export default function NewsSection() {
  const items = [...NEWS].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 4);

  return (
    <section id="noutati" className="scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10 py-16 md:py-18">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-medium tracking-wide">
            Noutăți <span className="text-amber-300">.</span>
          </h2>

          <Link href="/noutati" className="text-sm text-zinc-300/85 hover:text-white transition">
            Vezi toate →
          </Link>
        </div>

        <p className="mt-2 text-zinc-300/85 max-w-2xl">
          Update-uri, proiecte și materiale media. Fiecare are pagină proprie cu OG pentru Facebook.
        </p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-zinc-300/85">
            Nu există noutăți încă. Adaugă în <code>app/data/news.ts</code>.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((x) => (
              <Link
                key={x.slug}
                href={`/noutati/${x.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-300/40 transition"
              >
                {/* Thumbnail din ogImage */}
                <div className="relative aspect-[16/9] bg-black/30">
                  <Image
                    src={x.ogImage}
                    alt={x.title}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition"
                    sizes="(max-width: 1024px) 100vw, 520px"
                    priority
                  />
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
        )}
      </div>
    </section>
  );
}
