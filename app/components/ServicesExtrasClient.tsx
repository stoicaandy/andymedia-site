"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

type CardItem = {
  src: string;
  alt: string;
  label: string;
  hint?: string;
};

function VisualCard(props: { item: CardItem; onZoom: (src: string, alt: string) => void }) {
  const { item } = props;

  return (
    <button
      type="button"
      onClick={() => props.onZoom(item.src, item.alt)}
      className="group block w-full text-left rounded-2xl border border-white/10 bg-black/20 overflow-hidden hover:bg-black/30 transition"
      aria-label="Deschide imaginea"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-5">
        <p className="text-zinc-200 font-medium">{item.label}</p>
        {item.hint && <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{item.hint}</p>}
        <p className="mt-2 text-xs text-zinc-500">Click pentru zoom</p>
      </div>
    </button>
  );
}

export default function ServicesExtrasClient(props: {
  djImage?: CardItem;
  scenaImage?: CardItem;
}) {
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState("");
  const [activeAlt, setActiveAlt] = useState("");

  const openSingle = (src: string, alt: string) => {
    setActiveSrc(src);
    setActiveAlt(alt);
    setOpen(true);
  };

  return (
    <>
      <PhotoLightbox open={open} onClose={() => setOpen(false)} src={activeSrc} alt={activeAlt} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          {/* Slot DJ sau scenă este folosit în page.tsx (textul e acolo).
              Aici componenta oferă DOAR cardul cu zoom. */}
        </div>

        <div className="lg:col-span-5 space-y-6">
          {props.djImage && <VisualCard item={props.djImage} onZoom={openSingle} />}
          {props.scenaImage && <VisualCard item={props.scenaImage} onZoom={openSingle} />}
        </div>
      </div>
    </>
  );
}
