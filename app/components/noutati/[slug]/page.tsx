import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/app/data/news";
import { SITE } from "@/app/data/site";

function normalizeYoutubeSrc(href: string) {
  try {
    const u = new URL(href);

    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) return href;

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }

    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1`;
  } catch {}
  return href;
}

function normalizeTikTokSrc(href: string) {
  try {
    const u = new URL(href);
    const parts = u.pathname.split("/").filter(Boolean);
    const videoIndex = parts.findIndex((p) => p === "video");
    if (videoIndex >= 0 && parts[videoIndex + 1]) {
      const id = parts[videoIndex + 1];
      return `https://www.tiktok.com/embed/v2/${id}`;
    }
  } catch {}
  return href;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getNewsBySlug(params.slug);
  if (!item) return {};

  const url = `${SITE.url}/noutati/${item.slug}`;

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE.brand,
      title: item.title,
      description: item.description,
      locale: "ro_RO",
      images: [
        { url: item.ogImage, width: 1200, height: 630, alt: item.title },
      ],
    },
  };
}

function Button({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const isHttp = href.startsWith("http");
  const cls = primary
    ? "rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
    : "rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition";

  if (isHttp) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export default function NoutatePage({ params }: { params: { slug: string } }) {
  const item = getNewsBySlug(params.slug);
  if (!item) notFound();

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
            {item.date}
          </div>

          <h1 className="mt-2 text-2xl md:text-3xl font-medium leading-tight text-white/95">
            {item.title}
          </h1>

          <p className="mt-3 text-sm md:text-base text-zinc-300/85 max-w-3xl">
            {item.description}
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {item.type === "image" && item.src ? (
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.src}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            ) : null}

            {item.type === "video" && item.src ? (
              <div className="relative aspect-[16/9] bg-black/30">
                <video className="absolute inset-0 h-full w-full object-cover" controls playsInline>
                  <source src={item.src} />
                </video>
              </div>
            ) : null}

            {item.type === "embed" && item.provider === "youtube" && item.href ? (
              <div className="relative aspect-[16/9] w-full bg-black/30">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={normalizeYoutubeSrc(item.href)}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : null}

            {item.type === "embed" && item.provider === "tiktok" && item.href ? (
              <div className="relative aspect-[9/16] w-full bg-black/30">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={normalizeTikTokSrc(item.href)}
                  title={item.title}
                  allow="encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : null}

            <div className="p-5 md:p-6">
              <div className="flex flex-wrap gap-3">
                {item.actions.map((a, idx) => (
                  <Button
                    key={`${a.href}-${idx}`}
                    href={a.href}
                    label={a.label}
                    primary={a.variant === "primary"}
                  />
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/noutati"
                  className="text-sm text-zinc-300/85 hover:text-white transition"
                >
                  ← Înapoi la noutăți
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
