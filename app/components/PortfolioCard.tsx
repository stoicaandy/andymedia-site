// app/components/PortfolioCard.tsx

import Image from "next/image";
import type { PortfolioItem } from "@/app/data/portfolio";

function categoryLabel(cat: PortfolioItem["category"]) {
  switch (cat) {
    case "corporate":
      return "Corporate";
    case "concert":
      return "Spectacol";
    case "conference":
      return "Conferință";
    case "wedding":
      return "Nuntă";
    default:
      return "Proiect";
  }
}

/**
 * Aspect wrappers fără plugin Tailwind aspect-ratio (safe).
 * - landscape: 16:9 => pt-[56.25%]
 * - square: 1:1 => pt-[100%]
 * - portrait: 9:16 => pt-[177.78%]
 */
function MediaFrame({
  children,
  ratioClass
}: {
  children: React.ReactNode;
  ratioClass: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${ratioClass}`}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function ServiceChips({ services }: { services: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {services.map((s) => (
        <span
          key={s}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function ImageMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <MediaFrame ratioClass="pt-[100%]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
        className="object-cover"
        priority={false}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
    </MediaFrame>
  );
}

function LandscapeVideoMedia({
  src,
  poster,
  alt
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  return (
    <MediaFrame ratioClass="pt-[56.25%]">
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={alt}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
    </MediaFrame>
  );
}

function PortraitVideoMedia({
  src,
  poster,
  alt
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  return (
    <MediaFrame ratioClass="pt-[177.78%]">
      {/* fundal discret: poster blur */}
      {poster ? (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover blur-2xl scale-110 opacity-50"
          priority={false}
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" />
      )}

      {/* video centrat, fără stretch */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="h-full w-full rounded-xl bg-black/30 p-2">
          <video
            className="h-full w-full rounded-lg object-contain"
            src={src}
            poster={poster}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            aria-label={alt}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
    </MediaFrame>
  );
}

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const label = categoryLabel(item.category);

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition hover:bg-white/[0.05]">
      {/* Media */}
      <div>
        {item.media.type === "image" ? (
          <ImageMedia src={item.media.src} alt={item.media.alt ?? item.title} />
        ) : item.media.orientation === "portrait" ? (
          <PortraitVideoMedia
            src={item.media.src}
            poster={item.media.poster}
            alt={item.media.alt ?? item.title}
          />
        ) : (
          <LandscapeVideoMedia
            src={item.media.src}
            poster={item.media.poster}
            alt={item.media.alt ?? item.title}
          />
        )}
      </div>

      {/* Text */}
      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-white">
            {item.title}
          </h3>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/70">
            {label}
          </span>
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">
          {item.description}
        </p>

        <ServiceChips services={item.services} />
      </div>

      {/* micro-cta */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-white/50">
          Livrat cap-coadă • focus pe stabilitate
        </span>
        <span className="text-xs text-white/60 transition group-hover:text-white/85">
          Proiect similar? →
        </span>
      </div>
    </article>
  );
}
