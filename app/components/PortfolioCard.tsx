"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PhotoLightbox from "./PhotoLightbox";
import type { PortfolioItem } from "@/app/data/portfolio";

function pauseAllOtherVideos(current: HTMLVideoElement) {
  document.querySelectorAll("video").forEach((v) => {
    if (v !== current && !v.paused) {
      try {
        v.pause();
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

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const base = `/portofoliu/${item.media.folder}`;
  const videoSrc = `${base}/video.mp4`;
  const posterSrc = item.media.poster ? `${base}/poster.jpg` : `${base}/1.jpg`;

  const photos = useMemo(() => {
    const n = Math.max(1, item.media.photosCount);
    const arr: string[] = [];
    for (let i = 1; i <= n; i++) arr.push(`${base}/${i}.jpg`);
    return arr;
  }, [base, item.media.photosCount]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");

  const openPhoto = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  usePauseOnOutOfView(videoRef, rootRef);

  const THUMBS_MAX = 6;
  const thumbs = useMemo(() => {
    const arr = photos.slice(1); // thumbs from 2..N (1 is cover)
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
                  src={videoSrc}
                  poster={posterSrc}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  onPlay={(e) => pauseAllOtherVideos(e.currentTarget)}
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

        {/* THUMBS — fără scroll */}
        {photos.length > 1 && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {thumbs.shown.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => openPhoto(src)}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-[3/2]"
                aria-label="Deschide poza"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover opacity-95"
                  loading="lazy"
                />
              </button>
            ))}

            {thumbs.remaining > 0 && (
              <button
                type="button"
                onClick={() => openPhoto(photos[thumbs.shown.length + 1] ?? photos[0])}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-white/10 aspect-[3/2] hover:bg-white/15 transition"
                aria-label={`Încă ${thumbs.remaining} poze`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white font-medium">+{thumbs.remaining}</div>
                </div>
              </button>
            )}
          </div>
        )}

        {/* TEXT */}
        <div className="mt-4">
          <h3 className="text-lg md:text-xl font-medium text-white">
            {item.title} <span className="text-amber-300">.</span>
          </h3>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {item.location}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {item.date}
            </span>
          </div>

          <p className="mt-3 text-sm md:text-base text-zinc-300 leading-relaxed">
            {item.summary}
          </p>

          {/* SERVICES – bullets simple (opționale), fără chenare */}
          {item.services?.length ? (
            <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-white/80">
              {item.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openPhoto(photos[0])}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              Vezi poze (zoom)
            </button>

            <a
              href="/cere-oferta"
              className="rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-black hover:bg-amber-300 transition"
            >
              Cere ofertă
            </a>
          </div>
        </div>
      </article>

      <PhotoLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={lightboxSrc}
        alt={item.title}
      />
    </>
  );
}
