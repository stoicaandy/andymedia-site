"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function PhotoLightbox({ open, onClose, src, alt }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null);
  const panBase = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // double-tap support (mobile)
  const lastTap = useRef<number>(0);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // reset on open
    setScale(1);
    setTx(0);
    setTy(0);
    pointers.current.clear();
    pinch.current = null;
    panBase.current = null;
    lastTap.current = 0;

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      pointers.current.clear();
      pinch.current = null;
      panBase.current = null;
    };
  }, [open, onClose, src]);

  // if user returns to 1x, recenter
  useEffect(() => {
    if (scale <= 1.001) {
      setTx(0);
      setTy(0);
    }
  }, [scale]);

  const transform = useMemo(() => `translate(${tx}px, ${ty}px) scale(${scale})`, [tx, ty, scale]);

  if (!open) return null;

  const toggleZoom = () => {
    if (scale < 1.5) {
      setScale(2);
    } else {
      setScale(1);
    }
  };

  const onBackdropClick = (e: React.MouseEvent) => {
    // close if click is outside image box
    const box = boxRef.current;
    if (!box) return onClose();
    if (!box.contains(e.target as Node)) onClose();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // allow gestures on the whole overlay; image box will be the main target anyway
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // double-tap detector (works on touch too)
    const now = Date.now();
    if (now - lastTap.current < 280) {
      toggleZoom();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }

    if (pointers.current.size === 1) {
      panBase.current = { x: e.clientX, y: e.clientY, tx, ty };
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

      // small pan follows midpoint movement
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;

      setScale(nextScale);

      if (nextScale > 1.001) {
        setTx(clamp(tx + (midX - pinch.current.midX), -2400, 2400));
        setTy(clamp(ty + (midY - pinch.current.midY), -2400, 2400));
      }

      return;
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
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) {
      pinch.current = null;
    }
    if (pointers.current.size === 0) {
      panBase.current = null;
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
      style={{
        // important for pinch/pan without browser scroll hijacking
        touchAction: "none",
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
        <div
          ref={boxRef}
          className="relative max-h-[92vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-black/10"
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          <img
            src={src}
            alt={alt ?? ""}
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
        Pinch zoom • Dublu-tap / dublu-click pentru 2× • Tap în afara pozei pentru închidere
      </div>
    </div>
  );
}
