"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PhotoLightbox from "./PhotoLightbox";
import type { PortfolioItem } from "@/app/data/portfolio";

type Props = {
  item: PortfolioItem;
};

// Pause only portfolio videos
function pauseAllOtherPortfolioVideos(current: HTMLVideoElement) {
  document.querySelectorAll('video[data-portfolio-video="1"]').forEach((v) => {
    const vid = v as HTMLVideoElement;
    if (vid !== current && !vid.paused) {
      try {
        vid.pause();
      } catch {}
    }
  });
}

function usePauseOnOutOfView(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  rootRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const v = videoRef.current;
    const root = rootRef.current;
    if (!v || !root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.intersectionRatio < 0.35) {
          try {
            v.pause();
          } catch {}
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    obs.observe(root);
    return () => obs.disconnect();
  }, [videoRef, rootRef]);
}

export default function PortfolioCard({ item }: Props) {
  const base = `/portofoliu/${item.media.folder}`;
  const videoSrc = `${base}/video.mp4`;
  const posterSrc = item.media.poster ? `${base}/poster.jpg` : `${base}/1.jpg`;

  const photos = useMemo(() => {
    const n = Math.max(1, item.media.photosCount);
    const arr: string[] = [];
    for (let i = 1; i <= n; i++) arr.push(`${base}/${i}.jpg`);
    return arr;
  }, [base, item.media.photosCount]);

  const gallery = useMemo(
    () => photos.map((src) => ({ src, alt: item.title })),
    [photos, item.title]
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openPhotoAt = (idx: number) => {
    setLightboxIndex(clampIndex(idx, gallery.length));
    setLightboxOpen(true);
  };

  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  usePauseOnOutOfView(videoRef, rootRef);

  const THUMBS_MAX = 6;
  const thumbs = useMemo(() => {
    const arr = photos.slice(1);
    const shown = arr.slice(0, THUMBS_MAX);
    const remaining = arr.length - shown.length;
    return { shown, remaining };
  }, [photos]);

  return (
    <>
      <article
        ref={rootRef as any}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 backdrop-blur-sm"
      >
        {/* MAIN MEDIA */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="relative w-full pt-[56.25%]">
            <div className="absolute inset-0">
              {item.media.hasVideo ? (
                <video
                  ref={videoRef}
                  data-portfolio-video="1"
                  src={videoSrc}
                  poster={posterSrc}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  onPlay={(e) => pauseAllOtherPortfolioVideos(e.currentTarget)}
                />
              ) : (
                <img
                  src={photos[0]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-90" />

              <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/80">
                  {item.category}
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">
                  {item.media.hasVideo ? "VIDEO" : "FOTO"} • {item.media.photosCount} foto
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBS */}
        {photos.length > 1 && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {thumbs.shown.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => openPhotoAt(i + 1)}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-[3/2]"
              >
                <img src={src} className="h-full w-full object-cover" />
              </button>
            ))}

            {thumbs.remaining > 0 && (
              <button
                type="button"
                onClick={() => openPhotoAt(thumbs.shown.length + 1)}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-white/10 aspect-[3/2]"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  +{thumbs.remaining}
                </div>
              </button>
            )}
          </div>
        )}

        {/* TEXT */}
        <div className="mt-4">
          <h3 className="text-lg md:text-xl font-medium">
            {item.title} <span className="text-amber-300">.</span>
          </h3>

          <div className="mt-2 flex gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {item.location}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {item.date}
            </span>
          </div>

          <p className="mt-3 text-zinc-300">{item.summary}</p>

          {item.services?.length > 0 && (
            <ul className="mt-4 list-disc pl-5 text-sm text-white/80">
              {item.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => openPhotoAt(0)}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              Vezi poze
            </button>

            <a
              href="/cere-oferta"
              className="rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-black"
            >
              Cere ofertă
            </a>
          </div>
        </div>
      </article>

      <PhotoLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        startIndex={lightboxIndex}
      />
    </>
  );
}

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(len - 1, i));
}
