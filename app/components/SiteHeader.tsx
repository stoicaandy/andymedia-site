"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NAV = [
  { href: "/servicii", label: "SERVICII" },
  { href: "/portofoliu", label: "PORTOFOLIU" },
  { href: "/parteneri", label: "PARTENERI" },
  { href: "/echipamente", label: "ECHIPAMENTE" },
  { href: "/cere-oferta", label: "CERE OFERTĂ", primary: true },
];

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const headerCls = useMemo(
    () =>
      cx(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        "pt-[env(safe-area-inset-top)]",
        scrolled
          ? "bg-black/75 backdrop-blur-xl border-b border-white/10"
          : "bg-black/25 backdrop-blur-sm"
      ),
    [scrolled]
  );

  const linkCls = (primary?: boolean) =>
    cx(
      "px-4 py-2 text-xs uppercase tracking-[0.22em]",
      "border border-white/10 rounded-xl",
      "bg-white/5 hover:bg-white/10 hover:border-amber-300/50 transition",
      primary
        ? "border-amber-300/60 text-amber-200 hover:bg-amber-300 hover:text-black"
        : "text-white/85 hover:text-white"
    );

  // butoanele din header pe mobil (hamburger + oferta) – aceleași dimensiuni
  const mobileBtnBase =
    "h-10 px-3 rounded-xl border transition inline-flex items-center justify-center text-xs uppercase tracking-[0.22em] shrink-0";

  return (
    <header className={headerCls}>
      <div className="h-20 lg:h-24 px-4 md:px-6 lg:px-8 flex items-center gap-3">
        {/* LOGO */}
        <div className="flex items-center min-w-0">
          <Link href="/" className="flex items-center">
            <img
              src="/logo/logo.svg"
              alt="ANDYmedia"
              className="
                h-[56px] sm:h-[64px] lg:h-[80px]
                w-auto
                max-w-[200px] sm:max-w-[220px] lg:max-w-none
                object-contain
              "
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden lg:flex items-center gap-3">
          {NAV.map((x) => (
            <Link key={x.label} href={x.href} className={linkCls(!!x.primary)}>
              {x.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE / TABLET */}
        <div className="ml-auto flex lg:hidden items-center gap-2 min-w-0">
          {/* 1) MENIU primul */}
          <button
            type="button"
            aria-label="Deschide meniul"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cx(
              mobileBtnBase,
              "w-10 px-0",
              "border-white/10 bg-white/5 hover:bg-white/10 text-white"
            )}
          >
            <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
          </button>

          {/* 2) OFERTA al doilea, dar same height/weight */}
          <Link
            href="/cere-oferta"
            className={cx(
              mobileBtnBase,
              "border-amber-300/50 bg-amber-300/10 hover:bg-amber-300/20 text-amber-100"
            )}
          >
            Ofertă
          </Link>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-2">
            {NAV.map((x) => (
              <Link
                key={x.label}
                href={x.href}
                className={cx(linkCls(!!x.primary), "text-left")}
              >
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
