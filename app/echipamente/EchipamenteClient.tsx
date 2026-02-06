"use client";

import { useEffect, useMemo, useState } from "react";

import { GEAR_TABLE } from "../data/gear-table";
import {
  GEAR_IMAGE_DIR,
  GEAR_IMAGE_EXTS,
  GEAR_IMAGE_MAX,
  GEAR_IMAGE_STOP_AFTER_MISSES,
} from "../data/gear-images";

type ImgItem = { nr: number; src: string };

function buildSrc(nr: number, ext: string) {
  return `${GEAR_IMAGE_DIR}/${nr}.${ext}`;
}

export default function EchipamenteClient() {
  const [images, setImages] = useState<ImgItem[]>([]);

  // Scanează automat pozele existente: 1.jpg, 2.jpg...
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const found: ImgItem[] = [];
      let missesInRow = 0;

      for (let nr = 1; nr <= GEAR_IMAGE_MAX; nr++) {
        if (missesInRow >= GEAR_IMAGE_STOP_AFTER_MISSES) break;

        let okSrc: string | null = null;

        for (const ext of GEAR_IMAGE_EXTS) {
          const src = buildSrc(nr, ext);
          const ok = await new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          });
          if (ok) {
            okSrc = src;
            break;
          }
        }

        if (okSrc) {
          found.push({ nr, src: okSrc });
          missesInRow = 0;
        } else {
          missesInRow++;
        }
      }

      if (!cancelled) setImages(found);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const rowByNr = useMemo(() => {
    const m = new Map<number, (typeof GEAR_TABLE)[number]>();
    for (const r of GEAR_TABLE) m.set(r.nr, r);
    return m;
  }, []);

  const imageSet = useMemo(() => new Set(images.map((i) => i.nr)), [images]);

  return (
    <main className="relative min-h-screen text-white">
      <div id="top" />

      <div className="relative z-10 isolate pt-20 md:pt-24">
        {/* HERO */}
        <section className="bg-black/35 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-medium tracking-wide">
              Echipamente <span className="text-amber-300">PRO</span>
            </h1>
            <p className="mt-4 max-w-3xl text-zinc-200/90 leading-relaxed">
              Inventar (fără prețuri). Pentru ofertare configurăm exact pe proiect.
              <span className="block mt-2 text-zinc-300/70 text-sm">
                Iași • România • +4 0741659564 • office@andymedia.ro
              </span>
            </p>
          </div>
        </section>

        {/* TABEL */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-12">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-zinc-200">
                  <tr>
                    <th className="text-left px-5 py-4 uppercase tracking-[0.18em] text-xs">#</th>
                    <th className="text-left px-5 py-4 uppercase tracking-[0.18em] text-xs">Denumire</th>
                    <th className="text-left px-5 py-4 uppercase tracking-[0.18em] text-xs hidden md:table-cell">
                      Descriere
                    </th>
                    <th className="text-left px-5 py-4 uppercase tracking-[0.18em] text-xs">Stoc</th>
                    <th className="text-left px-5 py-4 uppercase tracking-[0.18em] text-xs hidden md:table-cell">
                      Mențiuni
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {GEAR_TABLE.map((it) => {
                    const hasImage = imageSet.has(it.nr);
                    const href = hasImage ? `#img-${it.nr}` : undefined;

                    return (
                      <tr
                        key={it.nr}
                        className={[
                          "border-t border-white/10",
                          href ? "hover:bg-white/5 cursor-pointer" : "",
                        ].join(" ")}
                        onClick={() => {
                          if (!href) return;
                          const el = document.getElementById(`img-${it.nr}`);
                          if (!el) return;
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                          history.replaceState(null, "", href);
                        }}
                        title={href ? "Click → vezi imaginea" : "Imaginea nu este încă încărcată"}
                      >
                        <td className="px-5 py-4 text-zinc-200 font-medium">#{it.nr}</td>

                        <td className="px-5 py-4 text-white/95 font-medium">
                          <div className="flex items-center gap-2">
                            <span>{it.name}</span>
                            {href && (
                              <span className="text-[10px] uppercase tracking-[0.22em] text-amber-200/80">
                                view
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-zinc-400 md:hidden">{it.notes}</div>
                        </td>

                        <td className="px-5 py-4 text-zinc-300 hidden md:table-cell">
                          {it.description}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">{it.stock}</td>
                        <td className="px-5 py-4 text-zinc-300 hidden md:table-cell">
                          {it.notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* GALERIE */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-medium tracking-wide">
                Galerie echipamente <span className="text-amber-300">#</span>
              </h2>
              <p className="mt-3 text-zinc-300/90">
                Încarci poze în <span className="text-white">public/gear/</span> ca{" "}
                <span className="text-white">1.jpg</span>,{" "}
                <span className="text-white">2.jpg</span>…
                Apar automat.
              </p>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {images.map((img) => {
                  const row = rowByNr.get(img.nr);

                  return (
                    <article
                      key={img.nr}
                      id={`img-${img.nr}`}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur scroll-mt-24 md:scroll-mt-28"
                    >
                      <div className="relative">
                        <img
                          src={img.src}
                          alt={row ? `${row.name} (#${img.nr})` : `Echipament #${img.nr}`}
                          className="w-full h-auto block"
                          loading="lazy"
                        />

                        <div className="absolute top-4 left-4 rounded-xl border border-white/15 bg-black/45 px-3 py-2 text-xs tracking-[0.22em] uppercase text-zinc-200">
                          #{img.nr}
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="text-lg font-medium text-white">
                          {row?.name ?? `Echipament #${img.nr}`}
                        </div>
                        {row ? (
                          <div className="mt-1 text-sm text-zinc-300">
                            {row.description} • {row.stock}
                            {row.notes ? ` • ${row.notes}` : ""}
                          </div>
                        ) : (
                          <div className="mt-1 text-sm text-zinc-300">Detalii în curând</div>
                        )}

                        <div className="mt-4 flex gap-3">
                          <a
                            href="#top"
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] hover:border-amber-300/50 hover:bg-white/10 transition"
                          >
                            Sus
                          </a>

                          {row && (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                document
                                  .querySelector("table")
                                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.22em] hover:bg-amber-300/20 transition"
                            >
                              Tabel
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}

                {images.length === 0 && (
                  <div className="rounded-3xl border border-white/10 bg-black/35 p-8 text-zinc-300">
                    Nu am găsit încă poze în{" "}
                    <span className="text-white">public/gear/</span>.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-8 md:px-10 py-10 text-sm text-zinc-400">
            ANDYmedia • Event Production • Technical Rentals
          </div>
        </footer>
      </div>
    </main>
  );
}
