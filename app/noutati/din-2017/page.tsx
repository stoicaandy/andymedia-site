import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/app/data/site";

export const metadata: Metadata = {
  title: "Din 2016 în piața de evenimente",
  description: "Un clip scurt de prezentare a unui montaj scenotehnic din 2018.",
  alternates: { canonical: "/noutati/din-2017" },
  openGraph: {
    type: "article",
    url: `${SITE.url}/noutati/din-2017`,
    siteName: SITE.brand,
    title: "Din 2016 în piața de evenimente",
    description: "Un clip scurt de prezentare a unui montaj scenotehnic din 2018.",
    locale: "ro_RO",
    images: [
      {
        url: `${SITE.url}/noutati/din2017.jpg`,
        width: 1200,
        height: 630,
        alt: "Din 2017",
      },
    ],
  },
};

export default function Din2017Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">2018-07-10</div>

          <h1 className="mt-2 text-2xl md:text-3xl font-medium leading-tight text-white/95">
            Din 2016 în piața de evenimente
          </h1>

          <p className="mt-3 text-sm md:text-base text-zinc-300/85 max-w-3xl">
            Un clip scurt de prezentare a unui montaj scenotehnic din 2018.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[16/9] w-full bg-black/30">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/noutati/din2017.jpg"
              >
                <source src="/noutati/video-2017.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="p-5 md:p-6">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cere-oferta?oferta=custom"
                  className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                >
                  Cere ofertă
                </Link>

                <Link
                  href="/oferte"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                >
                  Oferte
                </Link>
              </div>

              <div className="mt-6">
                {/* FIX: duce la secțiunea #noutati din homepage */}
                <Link href="/#noutati" className="text-sm text-zinc-300/85 hover:text-white transition">
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
