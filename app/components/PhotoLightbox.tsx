"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LightboxImage = { src: string; alt?: string };

type Props = {
  open: boolean;
  onClose: () => void;

  // images mode
  images?: LightboxImage[];
  startIndex?: number;

  // legacy single image (optional)
  src?: string;
  alt?: string;

  // YouTube mode (ONLY in lightbox)
  youtubeId?: string; // only ID
  youtubeTitle?: string;
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
  images,
  startIndex = 0,
  src,
  alt,
  youtubeId,
  youtubeTitle,
}: Props) {
  // ✅ IMPORTANT: hooks must be called unconditionally (no early returns before hooks)
  const isYouTube = !!youtubeId;

  // body lock + ESC
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!isYouTube) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, isYouTube]);

  // ===== IMAGES MODE state (declared ALWAYS, even if YouTube mode) =====
  const gallery: LightboxImage[] = useMemo(() => {
    if (images && images.length) return images;
    if (src) return [{ src, alt }];
    return [];
  }, [images, src, alt]);

  const canNav = gallery.length > 1;

  const [index, setIndex] = useState(() => clampIndex(startIndex, gallery.length));
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const swipeBase = useRef<{ x: number; y: number; t: number; pointerType: string } | null>(null);
  const swipeLock = useRef<"none" | "h" | "v">("none");

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

  // reset on open / startIndex changes (images mode)
  useEffect(() => {
    if (!open) return;
    if (isYouTube) return;

    setIndex(clampIndex(startIndex, gallery.length));
    resetView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isYouTube, startIndex, gallery.length]);

  // snap back near 1x
  useEffect(() => {
    if (!open) return;
    if (isYouTube) return;

    if (scale < 1.06) {
      setScale(1);
      setTx(0);
      setTy(0);
    }
  }, [open, isYouTube, scale]);

  const transform = useMemo(
    () => `translate(${tx}px, ${ty}px) scale(${scale})`,
    [tx, ty, scale]
  );

  const toggleZoom = () => {
    if (scale < 1.5) setScale(2);
    else setScale(1);
  };

  const stop = (e: any) => e.stopPropagation();

  const onBoxPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // double-tap for touch/pen
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
      const dist = Math.hypot(dx, dy) || 0.0001;

      pinch.current = {
        dist,
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

      if (nextScale > 1.001) {
        const dmx = midX - p.midX;
        const dmy = midY - p.midY;
        setTx((prev) => clamp(prev + dmx, -2400, 2400));
        setTy((prev) => clamp(prev + dmy, -2400, 2400));
      } else {
        setTx(0);
        setTy(0);
      }

      // update baseline (smooth)
      p.dist = dist;
      p.scale = nextScale;
      p.midX = midX;
      p.midY = midY;

      return;
    }

    // swipe lock detect (only when not zoomed)
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

      if (isTouchLike && swipeLock.current === "v" && (farV || (fast && absDy > 60))) {
        onClose();
      } else if (canNav && swipeLock.current === "h" && (farH || (fast && absDx > 50))) {
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
      setScale((s) => (s < 1.06 ? 1 : s));
    }
  };

  // ✅ Only now we can early-return safely (after hooks)
  if (!open) return null;

  // ====== YOUTUBE RENDER ======
  if (isYouTube) {
    const embedSrc =
      `https://www.youtube-nocookie.com/embed/${youtubeId}` +
      `?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`;

    return (
      <div
        className="fixed inset-0 z-[200] bg-black/40"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
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

        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedSrc}
                title={youtubeTitle ?? "YouTube video"}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-white/70">
          YouTube rulează doar în lightbox • Tap pe fundal sau ESC pentru închidere
        </div>
      </div>
    );
  }

  // ====== IMAGES RENDER ======
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/20"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
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

          <div className="pointer-events-none z-20 absolute left-4 top-4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/85">
            {index + 1} / {gallery.length}
          </div>
        </>
      )}

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
