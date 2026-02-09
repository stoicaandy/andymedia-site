"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

type Props = {
  src: string;
  alt: string;
  label: string;
  hint?: string;
};

export default function ZoomSingleCard({ src, alt, label, hint }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PhotoLightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
        aria-label="Click pentru zoom"
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="p-5">
          <p className="text-zinc-200 font-medium">{label}</p>
          {hint ? <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{hint}</p> : null}
          <p className="mt-2 text-xs text-zinc-500">Click pentru zoom</p>
        </div>
      </button>
    </>
  );
}
