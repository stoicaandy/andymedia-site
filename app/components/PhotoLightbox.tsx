"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LightboxImage = { src: string; alt?: string };

type Props = {
  open: boolean;
  onClose: () => void;

  images?: LightboxImage[];
  startIndex?: number;

  // optional legacy single image
  src?: string;
  alt?: string;

  // optional YouTube mode
  youtubeId?: string;
  youtubeTitle?: string;
};

// in-memory cache
const LOADED = new Set<string>();

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(len - 1, i));
}

function preloadUrl(url: string) {
  if (!url || LOADED.has(url)) return;
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  img.onload = () => {
    LOADED.add(url);
  };
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
  const isYouTube = !!youtubeId;

  const gallery: LightboxImage[] = useMemo(() => {
    if (images && images.length) return images;
    if (src) return [{ src, alt }];
    return [];
  }, [images, src, alt]);

  const canNav = gallery.length > 1;

  const [index, setIndex] = useState(() => clampIndex(startIndex, gallery.length));

  // keep last visible while next decodes
  const [shownSrc, setShownSrc] = useState<string>(() => gallery[clampIndex(startIndex, gallery.length)]?.src ?? "");
  const [shownAlt, setShownAlt] = useState<string>(() => gallery[clampIndex(startIndex, gallery.length)]?.alt ?? "");
  const [pendingSrc, setPendingSrc] = useState<string>("");

  // zoom/pan
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // swipe close / nav (touch)
  const swipeBase = useRef<{ x: number; y: number; t: number; pointerType: string } | null>(null);
  const swipeLock = useRef<"none" | "h" | "v">("none");

  const lastTap = useRef<number>(0);

  const boxRef = useRef<HTMLDivElement | null>(null);

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

  // lock scroll + keybinds
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
  }, [open, onClose, isYouTube, canNav, gallery.length]);

  // init on open (images mode)
  useEffect(() => {
    if (!open) return;
    if (isYouTube) return;

    const i = clampIndex(startIndex, gallery.length);
    setIndex(i);

    const first = gallery[i];
    const firstSrc = first?.src ?? "";
    setShownSrc(firstSrc);
    setShownAlt(first?.alt ?? "");
    setPendingSrc("");

    if (firstSrc) {
      preloadUrl(firstSrc);
      const prev = gallery[(i - 1 + gallery.length) % gallery.length]?.src;
      const next = gallery[(i + 1) % gallery.length]?.src;
      if (prev) preloadUrl(prev);
      if (next) preloadUrl(next);
    }

    resetView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isYouTube, startIndex, gallery.length]);

  // when index changes: prefetch & swap smoothly
  useEffect(() => {
    if (!open) return;
    if (isYouTube) return;
    if (!gallery.length) return;

    const target = gallery[index];
    const targetSrc = target?.src ?? "";
    const targetAlt = target?.alt ?? "";
    if (!targetSrc) return;

    preloadUrl(targetSrc);
    const prev = gallery[(index - 1 + gallery.length) % gallery.length]?.src;
    const next = gallery[(index + 1) % gallery.length]?.src;
    if (prev) preloadUrl(prev);
    if (next) preloadUrl(next);

    if (LOADED.has(targetSrc)) {
      setShownSrc(targetSrc);
      setShownAlt(targetAlt);
      setPendingSrc("");
    } else {
      setPendingSrc(targetSrc);
    }
  }, [open, isYouTube, index, gallery]);

  // snap to 1x when close
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
    setScale((s) => (s < 1.5 ? 2 : 1));
  };

  // ✅ Ctrl + wheel zoom (desktop)
  const onWheel = (e: React.WheelEvent) => {
    if (isYouTube) return;

    // only Ctrl+wheel (pro, doesn't break normal scrolling)
    if (!e.ctrlKey) return;

    e.preventDefault();

    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const dx = cursorX - rect.width / 2;
    const dy = cursorY - rect.height / 2;

    const direction = e.deltaY > 0 ? -1 : 1; // wheel up => zoom in
    const factor = direction > 0 ? 1.12 : 1 / 1.12;

    setScale((prevScale) => {
      const nextScale = clamp(prevScale * factor, 1, 4);

      // keep zoom around cursor: adjust translation proportionally
      const ratio = nextScale / prevScale;

      setTx((prevTx) => clamp(prevTx - dx * (ratio - 1), -2400, 2400));
      setTy((prevTy) => clamp(prevTy - dy * (ratio - 1), -2400, 2400));

      return nextScale;
    });
  };

  const onBoxPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // double-tap (touch/pen)
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
      setScale((s) => (s < 1.06 ? 1 : s));
    }
  };

  if (!open) return null;

  // ===== YouTube mode =====
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
      </div>
    );
  }

  // ===== Images mode =====
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
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/20 transition"
      >
        Închide ✕
      </button>

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

      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          ref={boxRef}
          className="relative max-h-[92vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-black/10"
          onWheel={onWheel}
          onPointerDown={onBoxPointerDown}
          onPointerMove={onBoxPointerMove}
          onPointerUp={onBoxPointerUp}
          onPointerCancel={onBoxPointerUp}
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          style={{ touchAction: "none" }}
        >
          <img
            src={shownSrc}
            alt={shownAlt}
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

          {pendingSrc ? (
            <>
              <img
                src={pendingSrc}
                alt=""
                draggable={false}
                className="absolute inset-0 opacity-0 pointer-events-none"
                onLoad={() => {
                  LOADED.add(pendingSrc);
                  const t = gallery[index];
                  setShownSrc(pendingSrc);
                  setShownAlt(t?.alt ?? "");
                  setPendingSrc("");
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80">
                  Se încarcă…
                </div>
              </div>
            </>
          ) : null}

          {/* hint: Ctrl+wheel */}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[11px] text-white/60">
            PC: Ctrl + rotiță = zoom • Dublu-click = 2× • Drag când e zoom
          </div>
        </div>
      </div>
    </div>
  );
}
