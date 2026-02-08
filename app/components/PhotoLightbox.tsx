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

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(len - 1, i));
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

  const [index, setIndex] = useState(() => clampIndex(startIndex, gallery.length));

  // zoom/pan
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // pointer maps for pinch/pan on IMAGE BOX only
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // swipe for gallery (only when NOT zoomed)
  const swipeBase = useRef<{ x: number; y: number; t: number } | null>(null);
  const swipeLock = useRef<"none" | "h" | "v">("none");

  // double-tap (touch/pen only)
  const lastTap = useRef<number>(0);

  const current = gallery[index];
  const canNav = gallery.length > 1;

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

  const prevImage = () => {
    if (!canNav) return;
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
    resetView();
  };

  const nextImage = () => {
    if (!canNav) return;
    setIndex((i) => (i + 1) % gallery.length);
    resetView();
  };

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);

    setIndex(clampIndex(startIndex, gallery.length));
    resetView();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      pointers.current.clear();
      pinch.current = null;
      panBase.current = null;
      swipeBase.current = null;
      swipeLock.current = "none";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, startIndex, gallery.length]);

  // recenter when returning to 1x
  useEffect(() => {
    if (scale <= 1.001) {
      setTx(0);
      setTy(0);
    }
  }, [scale]);

  const transform = useMemo(() => `translate(${tx}px, ${ty}px) scale(${scale})`, [tx, ty, scale]);

  if (!open || !current) return null;

  const toggleZoom = () => {
    if (scale < 1.5) setScale(2);
    else setScale(1);
  };

  // ✅ Close ONLY when clicking the backdrop itself
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // === Pointer handlers attached ONLY to the image box ===
  const onBoxPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

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

  const onBoxPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // pinch
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

      pinch.current.dist = dist;
      pinch.current.scale = nextScale;
      pinch.current.midX = midX;
      pinch.current.midY = midY;
      return;
    }

    // swipe (only when not zoomed)
    if (pointers.current.size === 1 && scale <= 1.001 && swipeBase.current && canNav) {
      const dx = e.clientX - swipeBase.current.x;
      const dy = e.clientY - swipeBase.current.y;

      if (swipeLock.current === "none") {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          swipeLock.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        }
      }

      // no visual drag; decide on release
      if (swipeLock.current === "h") return;
    }

    // pan (only when zoomed)
    if (pointers.current.size === 1 && panBase.current && scale > 1.001) {
      const dx = e.clientX - panBase.current.x;
      const dy = e.clientY - panBase.current.y;
      setTx(clamp(panBase.current.tx + dx, -2400, 2400));
      setTy(clamp(panBase.current.ty + dy, -2400, 2400));
    }
  };

  const onBoxPointerUp = (e: React.PointerEvent) => {
    // swipe finish
    if (scale <= 1.001 && swipeBase.current && canNav && pointers.current.size === 1) {
      const dx = e.clientX - swipeBase.current.x;
      const dt = Date.now() - swipeBase.current.t;

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
      // IMPORTANT: do NOT put pointer handlers here
      style={{ touchAction: "auto" }}
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

      {/* Nav buttons */}
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

      {/* Centered image box */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          ref={boxRef}
          className="relative max-h-[92vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-black/10"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onBoxPointerDown}
          onPointerMove={onBoxPointerMove}
          onPointerUp={onBoxPointerUp}
          onPointerCancel={onBoxPointerUp}
          style={{
            // gestures ONLY inside the box
            touchAction: "none",
          }}
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
