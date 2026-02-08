"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GEAR_TABLE } from "../data/gear-table";
import { GEAR_IMAGE_DIR, GEAR_IMAGE_EXTS } from "../data/gear-images";
import PhotoLightbox from "../components/PhotoLightbox";

type ImgItem = { nr: number; src: string };

function buildSrc(nr: number, ext: string) {
  return `${GEAR_IMAGE_DIR}/${nr}.${ext}`;
}

/**
 * HEAD check with caching.
 * - avoid "no-store" because it slows scanning a lot and prevents caching
 * - use "force-cache" so browser can reuse results
 */
async function headExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "force-cache" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Limit concurrency so we don't spam the browser/network (important when you have many rows).
 */
async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length) as any;
  let nextIndex = 0;

  const runners = new Array(Math.max(1, concurrency)).fill(0).map(async () => {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) break;
      results[i] = await worker(items[i], i);
    }
  });

  await Promise.all(runners);
  return results;
}

export default function EchipamenteClient() {
  const [images, setImages] = useState<ImgItem[]>([]);
  const [scanning, setScanning] = useState(true);

  // Lightbox (reuse same as portfolio)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openPhoto = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  // prevent duplicates + allow progressive append
  const seen = useRef<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setScanning(true);
      setImages([]);
      seen.current.clear();

      // Worker for each row: find first existing image ext
      const worker = async (row: (typeof GEAR_TABLE)[number]) => {
        let okSrc: string | null = null;

        for (const ext of GEAR_IMAGE_EXTS) {
          const src = buildSrc(row.nr, ext);
          if (await headExists(src)) {
            okSrc = src;
            break;
          }
        }

        // Progressive update: as soon as we find one, we append it
        if (okSrc && !cancelled) {
          if (!seen.current.has(row.nr)) {
            seen.current.add(row.nr);
            setImages((prev) => {
              const next = [...prev, { nr: row.nr, src: okSrc! }];
              next.sort((a, b) => a.nr - b.nr);
              return next;
            });
          }
        }

        return okSrc;
      };

      // Concurrency tuned for speed + stability
      // 6 is a good balance on Vercel + mobile.
      await runWithConcurrency(GEAR_TABLE, 6, worker);

      if (!cancelled) setScanning(false);
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
                        title={href ? "Click → vezi imaginea" : "Imaginea nu este încă disponibilă"}
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

                        <td className="px-5 py-4 text-zinc-300 hidden md:table-cell">{it.description}</td>
                        <td className="px-5 py-4 text-zinc-300">{it.stock}</td>
                        <td className="px-5 py-4 text-zinc-300 hidden md:table-cell">{it.notes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* GALERIE */}
            <div className="mt-12">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-wide">
                    Galerie echipamente <span className="text-amber-300">#</span>
                  </h2>
                  <p className="mt-3 text-zinc-300/90">
                    Încarci poze în <span className="text-white">public/gear/</span> ca{" "}
                    <span className="text-white">1.jpg</span>, <span className="text-white">2.jpg</span>… Apar automat.
                  </p>
                </div>

                <div className="text-xs text-zinc-400">
                  {scanning ? (
                    <span>Se caută poze… ({images.length} găsite)</span>
                  ) : (
                    <span>Gata. ({images.length} găsite)</span>
                  )}
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {images.map((img, idx) => {
                  const row = rowByNr.get(img.nr);
                  const alt = row ? `${row.name} (#${img.nr})` : `Echipament #${img.nr}`;

                  // Make first few images eager for "premium" feel, rest lazy
                  const loadingMode: "eager" | "lazy" = idx < 4 ? "eager" : "lazy";

                  return (
                    <article
                      key={img.nr}
                      id={`img-${img.nr}`}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur scroll-mt-24 md:scroll-mt-28"
                    >
                      <div className="relative">
                        <button
                          type="button"
                          className="block w-full text-left"
                          onClick={() => openPhoto(img.src, alt)}
                          aria-label={`Deschide imaginea ${alt}`}
                          title="Click → zoom"
                        >
                          <img
                            src={img.src}
                            alt={alt}
                            className="w-full h-auto block cursor-zoom-in"
                            loading={loadingMode}
                          />
                        </button>

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
                      </div>
                    </article>
                  );
                })}

                {!scanning && images.length === 0 && (
                  <div className="rounded-3xl border border-white/10 bg-black/35 p-8 text-zinc-300">
                    Nu am găsit încă poze în <span className="text-white">public/gear/</span>.
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

      {/* Lightbox (same behavior as portfolio) */}
      <PhotoLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={lightboxSrc}
        alt={lightboxAlt}
      />
    </main>
  );
}
