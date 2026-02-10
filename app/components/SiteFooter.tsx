import Link from "next/link";
import { SITE, whatsappUrl } from "@/app/data/site";

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function IconLink({
  href,
  label,
  subtle,
}: {
  href: string;
  label: string;
  subtle?: boolean;
}) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm transition",
        subtle
          ? "border-white/10 bg-white/[0.03] text-zinc-200/85 hover:bg-white/[0.06] hover:border-amber-300/40"
          : "border-amber-300/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/15 hover:border-amber-300/60"
      )}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}

export default function SiteFooter() {
  const wa = whatsappUrl(SITE.phoneE164);

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-white font-medium">{SITE.brand}</div>
            <div className="mt-1 text-sm text-zinc-300/80">
              Event production • Technical rentals
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <IconLink href={`tel:${SITE.phoneE164}`} label={`Sună: ${SITE.phoneNational}`} />
              <IconLink href={wa} label="WhatsApp" subtle />
              {SITE.email ? <IconLink href={`mailto:${SITE.email}`} label="Email" subtle /> : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {SITE.facebook ? <IconLink href={SITE.facebook} label="Facebook" subtle /> : null}
              {SITE.instagram ? <IconLink href={SITE.instagram} label="Instagram" subtle /> : null}
              {SITE.tiktok ? <IconLink href={SITE.tiktok} label="TikTok" subtle /> : null}
              {SITE.youtube ? <IconLink href={SITE.youtube} label="YouTube" subtle /> : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
              Link-uri rapide
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                { href: "/servicii", label: "Servicii" },
                { href: "/portofoliu", label: "Portofoliu" },
                { href: "/echipamente", label: "Echipamente" },
                { href: "/oferte", label: "Oferte" },
                { href: "/parteneri", label: "Parteneri" },
                { href: "/cere-oferta", label: "Cere ofertă" },
              ].map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-zinc-200/85 hover:bg-white/[0.06] hover:border-amber-300/40 transition"
                >
                  {x.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-zinc-400/80">
          © {new Date().getFullYear()} {SITE.brand}. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
