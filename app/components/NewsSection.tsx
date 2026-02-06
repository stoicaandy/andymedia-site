import Image from "next/image";
import { NEWS } from "../data/news";

type NewsItem = {
  id: string;
  type: "image" | "video" | "embed";
  provider?: "youtube";
  src?: string;
  href?: string;
  alt?: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
};

function badgeLabel(item: NewsItem) {
  if (item.type === "image") return "IMAGE";
  if (item.type === "video") return "VIDEO";
  if (item.type === "embed" && item.provider === "youtube") return "YOUTUBE";
  return "MEDIA";
}

function normalizeYoutubeSrc(href: string) {
  // acceptăm fie link de embed, fie watch?v=..., fie youtu.be/...
  try {
    const u = new URL(href);

    // deja embed
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
      return href;
    }

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }

    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1`;
  } catch {
    // dacă e un string deja în format embed fără URL valid, îl lăsăm
  }

  return href;
}

export default function NewsSection() {
  const items = [...(NEWS as NewsItem[])].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section id="noutati" className="scroll-mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10">
        {/* HEADER (compact) */}
        <div className="pt-10 pb-12 md:pt-12 md:pb-14">
          <h2 className="text-xl md:text-2xl font-medium tracking-wide">
            Noutăți <span className="text-amber-300">.</span>
          </h2>

          <p className="mt-2 text-gray-300 max-w-2xl">
            Actualizări, echipamente noi, proiecte și materiale media.
          </p>

          {/* FEED */}
          <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative">
                  {/* Badge */}
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-100 backdrop-blur">
                    {badgeLabel(item)}
                  </div>

                  {/* IMAGE */}
                  {item.type === "image" && item.src ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={item.src}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : null}

                  {/* LOCAL VIDEO (încadrat ca 16:9, ca să nu sară înălțimea) */}
                  {item.type === "video" && item.src ? (
                    <div className="relative aspect-[16/9] bg-black/30">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                      >
                        <source src={item.src} />
                      </video>
                    </div>
                  ) : null}

                  {/* YOUTUBE */}
                  {item.type === "embed" &&
                  item.provider === "youtube" &&
                  item.href ? (
                    <div className="relative aspect-[16/9] w-full bg-black/30">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={normalizeYoutubeSrc(item.href)}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>

                {/* TEXT (compact) */}
                <div className="p-4 md:p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                    {item.date}
                  </div>

                  <h3 className="mt-2 text-base md:text-lg font-medium text-white/95 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-300/85 leading-snug">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
