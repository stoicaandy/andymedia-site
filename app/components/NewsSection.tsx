import Image from "next/image";
import Link from "next/link";
import { NEWS, type NewsItem } from "@/app/data/news";

function badgeLabel(item: NewsItem) {
  if (item.type === "image") return "IMAGE";
  if (item.type === "video") return "VIDEO";
  if (item.type === "embed" && item.provider === "youtube") return "YOUTUBE";
  if (item.type === "embed" && item.provider === "tiktok") return "TIKTOK";
  return "MEDIA";
}

export default function NewsSection() {
  // AICI alegi 4 sau 6
  const COUNT = 4;

  const items = [...NEWS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, COUNT);

  return (
    <section id="noutati" className="scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10">
        <div className="pt-10 pb-12 md:pt-12 md:pb-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-medium tracking-wide">
                Noutăți <span className="text-amber-300">.</span>
              </h2>
              <p className="mt-2 text-gray-300 max-w-2xl">
                Casete optimizate pentru share: fiecare are pagină proprie + OG pentru Facebook.
              </p>
            </div>

            <Link
              href="/noutati"
              className="hidden md:inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
            >
              Vezi toate →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative">
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-100 backdrop-blur">
                    {badgeLabel(item)}
                  </div>

                  <Link href={`/noutati/${item.slug}`} className="block">
                    {/* Previzualizare media (fără embed direct în listă pentru performanță) */}
                    {item.type === "image" && item.src ? (
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={item.src}
                          alt={item.alt || item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] bg-black/30">
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-200/80">
                          Deschide noutatea →
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                <div className="p-4 md:p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                    {item.date}
                  </div>

                  <h3 className="mt-2 text-base md:text-lg font-medium text-white/95 leading-snug">
                    <Link href={`/noutati/${item.slug}`} className="hover:text-white">
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm text-zinc-300/85 leading-snug">
                    {item.description}
                  </p>

                  <div className="mt-4">
                    <Link
                      href={`/noutati/${item.slug}`}
                      className="inline-flex rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                    >
                      Deschide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/noutati"
              className="inline-flex rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
            >
              Vezi toate →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
