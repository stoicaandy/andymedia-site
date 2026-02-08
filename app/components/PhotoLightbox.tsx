"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LightboxImage = { src: string; alt?: string };

type Props = {
  open: boolean;
  onClose: () => void;

  // backward compatible (single image)
  src?: string;
  alt?: string;

  // new: gallery support
  images?: LightboxImage[];
  startIndex?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function PhotoLightbox({
  open,
  onClose,
  src,
  alt,
  images,
  startIndex = 0,
}: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  // gallery
  const gallery: LightboxImage[] = useMemo(() => {
    if (images && images.length) return images;
    if (src) return [{ src, alt }];
    return [];
  }, [images, src, alt]);

  const [index, setIndex] = useState(() => clamp(startIndex, 0, Math.max(0, gallery.length - 1)));

  // zoom/pan state
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // pointer handling
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // swipe (gallery) handling — only when not zoomed
  const swipeBase = useRef<{ x: number; y: number; t: number } | null>(null);
  const swipeLock = useRef<"none" | "h" | "v">("none");

  // double-tap support (mobile)
  const lastTap = useRef<number>(0);

  const current = gallery[index];

  const resetView = () => {
    setScale(1);
    setTx(0);
    setTy(0);
    pointers.current.clear();
    pinch.current = null;
    panBase.current = null;
    swipeBase.current = null;
    swipeLock.current = "none";
    lastTap.current = 0;
  };

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);

    // when opened, ensure index is valid + reset
    const safe = clamp(startIndex, 0, Math.max(0, gallery.length - 1));
    setIndex(safe);
    resetView();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      pointers.current.clear();
      pinch.current = null;
      panBase.current = null;
      swipeBase.current = null;
      swipeLock.current = "none";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, startIndex, gallery.length]);

  // if user returns to 1x, recenter
  useEffect(() => {
    if (scale <= 1.001) {
      setTx(0);
      setTy(0);
    }
  }, [scale]);

  const transform = useMemo(() => `translate(${tx}px, ${ty}px) scale(${scale})`, [tx, ty, scale]);

  if (!open) return null;
  if (!current) return null;

  const canNav = gallery.length > 1;

  const prevImage = () => {
    if (!canNav) return;
    setIndex((i) => {
      const next = (i - 1 + gallery.length) % gallery.length;
      return next;
    });
    resetView();
  };

  const nextImage = () => {
    if (!canNav) return;
    setIndex((i) => {
      const next = (i + 1) % gallery.length;
      return next;
    });
    resetView();
  };

  const toggleZoom = () => {
    if (scale < 1.5) setScale(2);
    else setScale(1);
  };

  const onBackdropClick = (e: React.MouseEvent) => {
    // close if click is outside image box
    const box = boxRef.current;
    if (!box) return onClose();
    if (!box.contains(e.target as Node)) onClose();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // double-tap ONLY for touch/pen (avoid accidental desktop rapid clicks)
    if (e.pointerType !== "mouse") {
      const now = Date.now();
      if (now - lastTap.current < 280) {
        toggleZoom();
        lastTap.current = 0;
      } else {
        lastTap.current = now;
      }
    }

    if (pointers.current.size === 1) {
      panBase.current = { x: e.clientX, y: e.clientY, tx, ty };

      // swipe tracking starts only when NOT zoomed
      if (scale <= 1.001) {
        swipeBase.current = { x: e.clientX, y: e.clientY, t: Date.now() };
        swipeLock.current = "none";
      } else {
        swipeBase.current = null;
        swipeLock.current = "none";
      }
    }

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const dx = pts[1].x - pts[0].x;
      const dy = pts[1].y - pts[0].y;
      pinch.current = {
        dist: Math.hypot(dx, dy),
        scale,
        midX: (pts[0].x + pts[1].x) / 2,
        midY: (pts[0].y + pts[1].y) / 2,
      };
      panBase.current = null;
      swipeBase.current = null;
      swipeLock.current = "none";
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // pinch zoom
    if (pointers.current.size === 2 && pinch.current) {
      const pts = Array.from(pointers.current.values());
      const dx = pts[1].x - pts[0].x;
      const dy = pts[1].y - pts[0].y;
      const dist = Math.hypot(dx, dy);

      const factor = dist / (pinch.current.dist || dist);
      const nextScale = clamp(pinch.current.scale * factor, 1, 4);

      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;

      setScale(nextScale);

      if (nextScale > 1.001) {
        setTx((prev) => clamp(prev + (midX - pinch.current!.midX), -2400, 2400));
        setTy((prev) => clamp(prev + (midY - pinch.current!.midY), -2400, 2400));
      }

      // update pinch baseline for smooth continuous gesture
      pinch.current.dist = dist;
      pinch.current.scale = nextScale;
      pinch.current.midX = midX;
      pinch.current.midY = midY;

      return;
    }

    // swipe navigation (only when NOT zoomed)
    if (pointers.current.size === 1 && scale <= 1.001 && swipeBase.current && canNav) {
      const dx = e.clientX - swipeBase.current.x;
      const dy = e.clientY - swipeBase.current.y;

      // decide lock direction
      if (swipeLock.current === "none") {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          swipeLock.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        }
      }

      // if horizontal swipe, prevent page from "feeling" weird (touchAction none already)
      if (swipeLock.current === "h") {
        // We don't visually drag the image (keeps premium calm). We only detect on release.
        return;
      }
    }

    // pan (only when zoomed)
    if (pointers.current.size === 1 && panBase.current && scale > 1.001) {
      const dx = e.clientX - panBase.current.x;
      const dy = e.clientY - panBase.current.y;
      setTx(clamp(panBase.current.tx + dx, -2400, 2400));
      setTy(clamp(panBase.current.ty + dy, -2400, 2400));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    // swipe finish (only when NOT zoomed)
    if (scale <= 1.001 && swipeBase.current && canNav && pointers.current.size === 1) {
      const dx = e.clientX - swipeBase.current.x;
      const dt = Date.now() - swipeBase.current.t;

      // threshold: calm but responsive
      const absDx = Math.abs(dx);
      const fast = dt < 280 && absDx > 40;
      const far = absDx > 80;

      if (swipeLock.current === "h" && (fast || far)) {
        if (dx < 0) nextImage();
        else prevImage();
      }
    }

    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      panBase.current = null;
      swipeBase.current = null;
      swipeLock.current = "none";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/20"
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "none" }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/20 transition"
      >
        Închide ✕
      </button>

      {/* Nav buttons (desktop friendly) */}
      {canNav && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white/90 hover:bg-white/20 transition"
            aria-label="Imaginea anterioară"
          >
            ←
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white/90 hover:bg-white/20 transition"
            aria-label="Imaginea următoare"
          >
            →
          </button>
        </>
      )}

      {/* Counter */}
      {canNav && (
        <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/85">
          {index + 1} / {gallery.length}
        </div>
      )}

      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          ref={boxRef}
          className="relative max-h-[92vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-black/10"
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          <img
            src={current.src}
            alt={current.alt ?? ""}
            draggable={false}
            className="select-none"
            style={{
              transform,
              transformOrigin: "center",
              maxWidth: "92vw",
              maxHeight: "92vh",
              objectFit: "contain",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-white/70">
        {canNav ? (
          <>
            Swipe stânga/dreapta • ←/→ pe PC • Pinch zoom • Dublu-tap / dublu-click pentru 2× • Tap în afara pozei pentru închidere
          </>
        ) : (
          <>
            Pinch zoom • Dublu-tap / dublu-click pentru 2× • Tap în afara pozei pentru închidere
          </>
        )}
      </div>
    </div>
  );
}
