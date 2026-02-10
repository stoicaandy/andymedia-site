import { SITE, whatsappUrl } from "@/app/data/site";

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function SmallLink({ href, label }: { href: string; label: string }) {
  const isHttp = href.startsWith("http");
  return (
    <a
      href={href}
      className={cx(
        "text-xs text-zinc-400/85 hover:text-white transition",
        "underline underline-offset-4 decoration-white/10 hover:decoration-amber-300/50"
      )}
      rel={isHttp ? "noopener noreferrer" : undefined}
      target={isHttp ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}

export default function SiteFooter() {
  const wa = whatsappUrl(SITE.phoneE164);

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-8 md:px-10 py-10">
        <div className="text-sm text-gray-400">
          <div className="text-white font-medium">{SITE.brand}</div>
          <div className="mt-1">Event production • Technical rentals</div>

          {/* Contact discret */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <SmallLink href={`tel:${SITE.phoneE164}`} label={`Tel: ${SITE.phoneNational}`} />
            <SmallLink href={wa} label="WhatsApp" />
            {SITE.email ? <SmallLink href={`mailto:${SITE.email}`} label={SITE.email} /> : null}

            {SITE.facebook ? <SmallLink href={SITE.facebook} label="Facebook" /> : null}
            {SITE.instagram ? <SmallLink href={SITE.instagram} label="Instagram" /> : null}
            {SITE.tiktok ? <SmallLink href={SITE.tiktok} label="TikTok" /> : null}
            {SITE.youtube ? <SmallLink href={SITE.youtube} label="YouTube" /> : null}
          </div>

          <div className="mt-8 text-xs text-zinc-500/80">
            © {new Date().getFullYear()} {SITE.brand}. Toate drepturile rezervate.
          </div>
        </div>
      </div>
    </footer>
  );
}
