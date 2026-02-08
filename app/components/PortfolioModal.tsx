"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  title: string;
  summary?: string;
  meta?: { location?: string; date?: string; category?: string };
  services?: string[];
  tags?: string[];

  // auto media
  folder: string;
  photosCount: number;
  hasVideo?: boolean;
  hasPoster?: boolean;
};

function pauseAllOtherVideos(current: HTMLVideoElement) {
  document.querySelectorAll("video").forEach((v) => {
    if (v !== current && !v.paused) {
      try {
        v.pause();
      } catch {}
    }
  });
}

export default function PortfolioModal({
  open,
  onClose,
  title,
  summary,
  meta,
  services = [],
  tags = [],
  folder,
  photosCount,
  hasVideo,
  hasPoster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      try {
        videoRef.current?.pause();
      } catch {}
    };
  }, [open, onClose]);

  const base = `/portofoliu/${folder}`;
  const images = useMemo(() => {
    const arr: string[] = [];
    for (let i = 1; i <= Math.max(1, photosCount); i++) {
      arr.push(`${base}/${i}.jpg`);
    }
    return arr;
  }, [base, photosCount]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
            <div className="min-w-0">
              <h2 className="truncate text-xl md:text-2xl font-medium text-white">
                {title}
              </h2>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/70">
                {meta?.category ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {meta.category}
                  </span>
                ) : null}
                {meta?.location ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {meta.location}
                  </span>
                ) : null}
                {meta?.date ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {meta.date}
                  </span>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              Închide ✕
            </button>
          </div>

          {/* scroll area */}
          <div className="max-h-[calc(100vh-7.5rem)] overflow-y-auto">
            <div className="px-5 py-6 space-y-8">
              {summary ? (
                <p className="text-zinc-200/90 leading-relaxed md:text-lg">
                  {summary}
                </p>
              ) : null}

              {services.length > 0 ? (
                <div>
                  <h3 className="text-sm uppercase tracking-[0.22em] text-white/70">
                    Servicii livrate
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {services.map((s) => (
                      <li
                        key={s}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {hasVideo ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="relative w-full pt-[56.25%]">
                    <div className="absolute inset-0">
                      <video
                        ref={videoRef}
                        src={`${base}/video.mp4`}
                        poster={hasPoster ? `${base}/poster.jpg` : undefined}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-contain bg-black"
                        onPlay={(e) => pauseAllOtherVideos(e.currentTarget)}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full rounded-2xl border border-white/10 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>

              {tags.length > 0 ? (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
