"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LightboxImage = { src: string; alt?: string };

type Props = {
  open: boolean;
  onClose: () => void;

  // compat: single image
  src?: string;
  alt?: string;

  // gallery mode
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

  // gesture refs
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // swipe base (for nav + close)
  const swipeBase = useRef<{ x: number; y: number; t: number; pointerType: string } | null>(null);
  const swipeLock = useRef<"none" | "h" | "v">("none");

  // double-tap (touch/pen)
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, startIndex, gallery.length]);

  // Snap back when close to 1 (prevents stuck at 1.02 etc.)
  useEffect(() => {
    if (scale < 1.06) {
      setScale(1);
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

  // close on backdrop click (PC + mobile tap)
  const onBackdropMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const stop = (e: any) => e.stopPropagation();

  // === gestures on image box only ===
  const onBoxPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // double-tap only for touch/pen
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

      // swipe tracking only when not zoomed
      if (scale <= 1.001) {
        swipeBase.current = { x: e.clientX, y: e.clientY, t: Date.now(), pointerType: e.pointerType };
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
      const dist = Math.hypot(dx, dy);

      pinch.current = {
        dist: dist || 0.0001, // avoid 0
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
    e.stopPropagation();

    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // pinch
    if (pointers.current.size === 2) {
      const p = pinch.current;
      if (!p) return;

      const pts = Array.from(pointers.current.values());
      const dx = pts[1].x - pts[0].x;
      const dy = pts[1].y - pts[0].y;
      const dist = Math.hypot(dx, dy) || 0.0001;

      const factor = dist / (p.dist || dist);
      const nextScale = clamp(p.scale * factor, 1, 4);

      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;

      setScale(nextScale);

      // IMPORTANT: use captured p.midX/p.midY, NOT pinch.current inside setState
      if (nextScale > 1.001) {
        const dmx = midX - p.midX;
        const dmy = midY - p.midY;
        setTx((prev) => clamp(prev + dmx, -2400, 2400));
        setTy((prev) => clamp(prev + dmy, -2400, 2400));
      } else {
        setTx(0);
        setTy(0);
      }

      // update pinch baseline smoothly
      p.dist = dist;
      p.scale = nextScale;
      p.midX = midX;
      p.midY = midY;

      return;
    }

    // swipe lock detection (only when not zoomed)
    if (pointers.current.size === 1 && scale <= 1.001 && swipeBase.current) {
      const dx = e.clientX - swipeBase.current.x;
      const dy = e.clientY - swipeBase.current.y;

      if (swipeLock.current === "none") {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          swipeLock.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        }
      }
      return;
    }

    // pan when zoomed
    if (pointers.current.size === 1 && panBase.current && scale > 1.001) {
      const dx = e.clientX - panBase.current.x;
      const dy = e.clientY - panBase.current.y;
      setTx(clamp(panBase.current.tx + dx, -2400, 2400));
      setTy(clamp(panBase.current.ty + dy, -2400, 2400));
    }
  };

  const onBoxPointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();

    // swipe finish (only when not zoomed)
    if (scale <= 1.001 && swipeBase.current && pointers.current.size === 1) {
      const dx = e.clientX - swipeBase.current.x;
      const dy = e.clientY - swipeBase.current.y;
      const dt = Date.now() - swipeBase.current.t;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      const isTouchLike = swipeBase.current.pointerType !== "mouse";

      const fast = dt < 320;
      const farH = absDx > 80;
      const farV = absDy > 90;

      // vertical close (touch/pen only)
      if (isTouchLike && swipeLock.current === "v" && (farV || (fast && absDy > 60))) {
        onClose();
      }
      // horizontal nav
      else if (canNav && swipeLock.current === "h" && (farH || (fast && absDx > 50))) {
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

      // ✅ snap to 1 when gesture ends close to 1
      setScale((s) => (s < 1.06 ? 1 : s));
      if (scale < 1.06) {
        setTx(0);
        setTy(0);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/20"
      role="dialog"
      aria-modal="true"
      onMouseDown={onBackdropMouseDown}
    >
      {/* Close */}
      <button
        type="button"
        onMouseDown={stop}
        onPointerDown={stop}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="pointer-events-auto z-20 absolute right-4 top-4 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/20 transition"
      >
        Închide ✕
      </button>

      {/* Nav buttons */}
      {canNav && (
        <>
          <button
            type="button"
            onMouseDown={stop}
            onPointerDown={stop}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="pointer-events-auto z-20 hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white/90 hover:bg-white/20 transition"
            aria-label="Imaginea anterioară"
          >
            ←
          </button>

          <button
            type="button"
            onMouseDown={stop}
            onPointerDown={stop}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="pointer-events-auto z-20 hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white/90 hover:bg-white/20 transition"
            aria-label="Imaginea următoare"
          >
            →
          </button>
        </>
      )}

      {/* Counter */}
      {canNav && (
        <div className="pointer-events-none z-20 absolute left-4 top-4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/85">
          {index + 1} / {gallery.length}
        </div>
      )}

      {/* Wrapper must NOT capture pointer events (backdrop close must work) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          className="pointer-events-auto relative max-h-[92vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-black/10"
          onMouseDown={stop}
          onClick={stop}
          onPointerDown={onBoxPointerDown}
          onPointerMove={onBoxPointerMove}
          onPointerUp={onBoxPointerUp}
          onPointerCancel={onBoxPointerUp}
          style={{ touchAction: "none" }}
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
            Swipe stânga/dreapta = next/prev • Swipe sus/jos = închide • Pinch zoom • Dublu-tap pentru 2× • Tap pe fundal pentru închidere
          </>
        ) : (
          <>
            Swipe sus/jos = închide • Pinch zoom • Dublu-tap pentru 2× • Tap pe fundal pentru închidere
          </>
        )}
      </div>
    </div>
  );
}
