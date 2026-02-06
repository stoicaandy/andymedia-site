"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const setRate = () => {
      try { v.playbackRate = 0.65; } catch {}
    };

    setRate();
    const t1 = setTimeout(setRate, 150);
    const t2 = setTimeout(setRate, 700);

    const onEnded = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
      setRate();
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
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black" />
    </div>
  );
}
