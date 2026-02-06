import Image from "next/image";

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type PortfolioItem = {
  slug: string;
  title: string;
  location?: string;
  date?: string; // ex: "2025-09"
  category?: string; // Corporate / Nuntă / Concert etc.
  summary: string;
  services: string[];
  media: Media;
  tags?: string[];
};

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* MEDIA */}
      <div className="w-full">
        {item.media.type === "image" ? (
          <Image
            src={item.media.src}
            alt={item.media.alt}
            width={1600}
            height={900}
            className="w-full h-auto object-contain"
            priority={false}
          />
        ) : (
          <video
            className="w-full h-auto"
            controls
            playsInline
            preload="metadata"
            poster={item.media.poster}
          >
            <source src={item.media.src} type="video/mp4" />
            {item.media.alt}
          </video>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
          {item.category ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {item.category}
            </span>
          ) : null}
          {item.location ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {item.location}
            </span>
          ) : null}
          {item.date ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {item.date}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-lg md:text-xl font-medium">{item.title}</h3>

        <p className="mt-2 text-zinc-300 leading-relaxed">{item.summary}</p>

        {item.services?.length ? (
          <div className="mt-4">
            <div className="text-sm font-medium text-white/90">
              Servicii livrate
            </div>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300 list-disc list-inside">
              {item.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-xs text-zinc-300 rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
