"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { text: string; tone?: "gold" | "silver" };

export default function RotatingHeadline() {
  const items: Item[] = useMemo(
    () => [
      { text: "CORPORATE EVENTS", tone: "gold" },
      { text: "SPECTACOLE", tone: "silver" },
      { text: "CONFERINȚE", tone: "gold" },
      { text: "CONGRESE", tone: "silver" },
      { text: "NUNȚI", tone: "gold" },
      { text: "PETRECERI", tone: "silver" },
      { text: "CONFERINTE", tone: "gold" },
      { text: "BOOKING", tone: "silver" },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showMs = 3200; // mai rar
    const fadeMs = 520;  // mai smooth

    const t1 = setTimeout(() => setVisible(false), showMs);
    const t2 = setTimeout(() => {
      setIdx((i) => (i + 1) % items.length);
      setVisible(true);
    }, showMs + fadeMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [idx, items.length]);

  const item = items[idx];
  const accent = item.tone === "gold" ? "text-amber-300" : "text-zinc-100";

  return (
    <div className="relative w-full">
      {/* container fix (dar corect dimensionat) */}
      <div className="h-[64px] md:h-[76px] lg:h-[88px] overflow-hidden">
        <span
          className={[
            "block uppercase leading-none",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            // tracking mai rafinat (nu reclama)
            "tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.26em]",
            "transition-all ease-out",
            visible
              ? "opacity-100 translate-y-0 blur-0 duration-[520ms]"
              : "opacity-0 -translate-y-2 blur-[2px] duration-[520ms]",
            accent,
          ].join(" ")}
          style={{
            fontFamily: "var(--font-bebas), system-ui",
            // impact, dar nu “cât ecranul”
            fontSize: "clamp(1.9rem, 4.8vw, 3.6rem)",
          }}
        >
          {item.text}
        </span>
      </div>

      {/* underline lipit de text */}
      <div className="mt-2 h-px w-64 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
    </div>
  );
}
