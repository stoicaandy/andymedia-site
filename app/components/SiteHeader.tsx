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
      "px-5 py-3 text-xs md:text-sm uppercase tracking-[0.22em]",
      "border border-white/10 rounded-xl",
      "bg-white/5 hover:bg-white/10 hover:border-amber-300/50 transition",
      primary
        ? "border-amber-300/60 text-amber-200 hover:bg-amber-300 hover:text-black"
        : "text-white/85 hover:text-white"
    );

  return (
    <header className={headerCls}>
      <div className="h-24 md:h-24 px-4 md:px-8 flex items-center gap-3">
        {/* LOGO AREA: can shrink, never pushes the right controls out */}
        <div className="min-w-0 flex-1">
          <Link href="/" className="h-full flex items-center">
            <img
              src="/logo/logo.svg"
              alt="ANDYmedia"
              className="
                h-[72px] md:h-[80px]
                w-auto
                max-w-[230px] sm:max-w-[280px] md:max-w-none
                object-contain
              "
            />
          </Link>
        </div>

        {/* Desktop */}
        <nav className="ml-auto hidden md:flex items-center gap-3 shrink-0">
          {NAV.map((x) => (
            <Link key={x.label} href={x.href} className={linkCls(!!x.primary)}>
              {x.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: never shrink/crop */}
        <div className="ml-auto flex md:hidden items-center gap-2 shrink-0">
          <Link
            href="/cere-oferta"
            className="px-4 py-3 text-xs uppercase tracking-[0.22em] rounded-xl border border-amber-300/50 bg-amber-300/10 hover:bg-amber-300/20 transition"
          >
            Ofertă
          </Link>

          <button
            type="button"
            aria-label="Deschide meniul"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
          >
            <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
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
