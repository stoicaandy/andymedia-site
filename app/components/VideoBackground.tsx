"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/video/hero.mp4";
const POSTER_SRC = "/video/hero-poster.jpg"; // FRAME din video

function canPlayBackgroundVideo() {
  if (typeof window === "undefined") return false;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  // Respect save-data (mobile, low-end)
  const navAny = navigator as any;
  if (navAny?.connection?.saveData) {
    return false;
  }

  return true;
}

export default function VideoBackground() {
  const ref = useRef<HTMLVideoElement | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Decide if video SHOULD be used
  useEffect(() => {
    const apply = () => {
      setEnabled(canPlayBackgroundVideo());
    };

    apply();
    window.addEventListener("resize", apply, { passive: true });
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Playback rate logic (your original intent, preserved)
  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return;

    const setRate = () => {
      try {
        v.playbackRate = 0.65;
      } catch {}
    };

    setRate();
    const t1 = setTimeout(setRate, 150);
    const t2 = setTimeout(setRate, 700);

    const onEnded = () => {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
        setRate();
      } catch {}
    };

    v.addEventListener("loadedmetadata", setRate);
    v.addEventListener("play", setRate);
    v.addEventListener("ended", onEnded);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      v.removeEventListener("loadedmetadata", setRate);
      v.removeEventListener("play", setRate);
      v.removeEventListener("ended", onEnded);
    };
  }, [enabled]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
      {/* FALLBACK IMAGE — ALWAYS VISIBLE */}
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* VIDEO LAYER */}
      {enabled && !failed && (
        <video
          ref={ref}
          className={[
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-700",
            visible ? "opacity-100" : "opacity-0"
          ].join(" ")}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          onCanPlay={() => setVisible(true)}
          onPlay={() => setVisible(true)}
          onError={() => {
            setFailed(true);
            setVisible(false);
            try {
              ref.current?.pause();
            } catch {}
          }}
        />
      )}

      {/* OVERLAYS (unchanged, intentional) */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black" />
    </div>
  );
}
