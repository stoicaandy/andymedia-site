"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import type { PortfolioItem } from "@/app/data/portfolio";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  // Tune these without touching UI
  const INITIAL = 4; // first screen + a bit
  const STEP = 4;    // load more per batch

  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL, items.length)
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL, items.length));
  }, [items.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;

        // when near bottom, load next batch
        if (e.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + STEP, items.length));
        }
      },
      {
        root: null,
        // start loading before user reaches end => smooth
        rootMargin: "900px 0px",
        threshold: 0.01,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [items.length]);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  return (
    <>
      <div className="grid gap-6 md:gap-7 md:grid-cols-2">
        {visibleItems.map((it, idx) => (
          <PortfolioCard
            key={it.slug}
            item={it}
            // prioritize first cards (above the fold)
            priority={idx < 2}
          />
        ))}
      </div>

      {/* sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {/* optional: tiny status (no layout changes) */}
      {visibleCount < items.length ? (
        <div className="mt-6 text-xs text-white/50">
          Se încarcă… ({visibleCount}/{items.length})
        </div>
      ) : null}
    </>
  );
}
