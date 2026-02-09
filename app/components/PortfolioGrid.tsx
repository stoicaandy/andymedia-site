"use client";

import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import PhotoLightbox from "./PhotoLightbox";
import type { PortfolioItem } from "@/app/data/portfolio";

type LightboxImage = { src: string; alt?: string };

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<LightboxImage[]>([]);
  const [lbStart, setLbStart] = useState(0);

  const openGallery = (images: LightboxImage[], startIndex: number) => {
    setLbImages(images);
    setLbStart(startIndex);
    setLbOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 md:gap-7 md:grid-cols-2">
        {items.map((it, idx) => (
          <PortfolioCard
            key={it.slug}
            item={it}
            priority={idx < 2}
            onOpenGallery={openGallery}
          />
        ))}
      </div>

      {/* ✅ ONE lightbox for the whole page (fast, stable, no lag) */}
      <PhotoLightbox
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        images={lbImages}
        startIndex={lbStart}
      />
    </>
  );
}
