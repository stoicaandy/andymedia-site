"use client";

import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { useMemo, useState } from "react";

type PartnerCategory =
  | "Trupe exclusive"
  | "Trupe colaborări"
  | "DJ"
  | "Foto-Video"
  | "Artiști"
  | "Servicii"
  | "Booking";

type PartnerLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  spotify?: string;
  tiktok?: string;
  contact?: string;
};

type Partner = {
  id: string;
  name: string;
  city?: string;
  category: PartnerCategory;
  exclusive?: boolean;
  since?: string;
  collaborated?: boolean;
  description: string;
  image: string;
  tags?: string[];
  links?: PartnerLinks;
  youtubeEmbed?: string;
  /** 1..10 = sus (featured), 999 = jos */
  priority?: number;
};

const PAGE_TITLE = "Parteneri • Booking • Trupe • DJ • Foto-Video | ANDYmedia";
const PAGE_DESC =
  "Trupe exclusive, colaborări, DJ, foto-video și artiști cu care lucrăm. Booking în dezvoltare: adăugăm constant noi parteneri.";

const PARTNERS: Partner[] = [
  {
    id: "trupa-de-weekend-iasi",
    name: "Trupa de Weekend",
    city: "Iași",
    category: "Trupe exclusive",
    exclusive: true,
    since: "2021",
    priority: 1,
    description:
      "Trupă live cu repertoriu versatil (folclor → pop/evergreen). Show disciplinat, energie de scenă și flow bun pentru public mixt. Contact: +40 743 341 797 / trupadeweekend@gmail.com.",
    image: "/parteneri/trupa-de-weekend-iasi.jpg",
    tags: ["party", "live", "evenimente", "cover", "corporate", "nuntă"],
    links: {
      website: "https://trupadeweekend.ro/",
      facebook: "https://www.facebook.com/trupaweekend",
      instagram: "https://www.instagram.com/trupadeweekend/",
      youtube: "https://www.youtube.com/channel/UC-rVV4JUokF9Sstoha35BkA",
      contact: "https://trupadeweekend.ro/contact/",
    },
    youtubeEmbed: "rC35YDt2nDI",
  },

  {
    id: "soundcheck-band-iasi",
    name: "SoundCheck Band",
    city: "Iași",
    category: "Trupe exclusive",
    exclusive: true,
    since: "2022",
    priority: 2,
    description:
      "Grup de muzicieni licențiați din Iași, pentru publicul care vrea să vadă și să audă «altceva». De la jazz la disco, de la rock la reggae, din anii ’30 până azi — show-ul surprinde de fiecare dată, vizual și auditiv. Booking: 0742 137 647 • trupasoundcheck@gmail.com.",
    image: "/parteneri/soundcheck-band-iasi.jpg",
    tags: ["live", "corporate", "nuntă", "cover band", "jazz", "rock", "disco", "reggae"],
    links: {
      website: "https://www.soundcheckband.ro/",
      youtube: "https://www.youtube.com/c/soundcheckiasi/videos",
      tiktok: "https://www.tiktok.com/@soundcheckband.ro",
    },
    youtubeEmbed: "4H0ZJeZGSJg",
  },

  {
    id: "dj-jonny-black-iasi",
    name: "DJ Jonny Black",
    city: "Iași",
    category: "DJ",
    priority: 3,
    description:
      "DJ adaptat publicului și momentului: warm-up corect, peak-time controlat, flow coerent. Focus pe experiență, nu pe “random playlist”.",
    // pune aici EXACT extensia din public/parteneri (jpg/jpeg)
    image: "/parteneri/dj-jonny-black-iasi.jpg",
    tags: ["nuntă", "corporate", "party", "open format"],
    links: {
      facebook: "https://facebook.com/eventiasi",
      tiktok: "https://www.tiktok.com/@johnny.events?_r=1&_t=ZN-93mcjtQZu9W",
      contact:
        "https://wa.me/40757666811?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
    },
  },

  {
    id: "smart-music-iasi",
    name: "Smart Music",
    city: "Iași",
    category: "Trupe colaborări",
    collaborated: true,
    priority: 55,
    description:
      "Formație de evenimente (colaborare periodică). Repertoriu pentru petreceri / momente dedicate, livrat curat și adaptat publicului.",
    image: "/parteneri/smart-music-iasi.jpg",
    tags: ["formație", "evenimente", "colaborare", "Iași"],
    links: {
      instagram: "https://www.instagram.com/iasi.smartmusic/",
      facebook: "https://www.facebook.com/iasi.smartmusic/",
      youtube: "https://www.youtube.com/@smartmusiciasi",
      tiktok: "https://www.tiktok.com/@smartmusic.iasi",
      contact:
        "https://wa.me/40742453047?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
    },
    youtubeEmbed: "bRcEc5TpZ5c",
  },

  {
    id: "booking-in-dezvoltare",
    name: "Booking (în dezvoltare)",
    category: "Booking",
    priority: 999,
    description:
      "Adăugăm constant artiști și formații imediat ce avem contactul lor. Dacă vrei recomandări rapide, trimite-ne detaliile evenimentului.",
    image: "/parteneri/booking-andymedia.jpg",
    tags: ["booking", "artiști", "formații", "DJ"],
    links: {
      contact: "/cere-oferta",
    },
  },
];

const CATEGORIES: Array<{ key: PartnerCategory | "Toate"; label: string }> = [
  { key: "Toate", label: "Toate" },
  { key: "Trupe exclusive", label: "Trupe exclusive" },
  { key: "Trupe colaborări", label: "Colaborări" },
  { key: "DJ", label: "DJ" },
  { key: "Foto-Video", label: "Foto-Video" },
  { key: "Artiști", label: "Artiști" },
  { key: "Servicii", label: "Servicii" },
  { key: "Booking", label: "Booking" },
];

function normalize(s: string) {
  return s.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function IconLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="h-2 w-2 rounded-full bg-white/50" />
      {label}
    </a>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
      {children}
    </span>
  );
}

function StatPill({ k, v }: { k: string; v: string | number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
      <span className="text-white font-semibold">{v}</span>
      <span className="text-white/60">{k}</span>
    </span>
  );
}

function categoryRank(c: PartnerCategory) {
  const order: Record<PartnerCategory, number> = {
    "Trupe exclusive": 10,
    DJ: 20,
    "Trupe colaborări": 30,
    "Artiști": 40,
    "Foto-Video": 50,
    "Servicii": 60,
    Booking: 99,
  };
  return order[c] ?? 999;
}

export default function PartnersClient({ baseUrl }: { baseUrl: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PartnerCategory | "Toate">("Toate");
  const [onlyExclusive, setOnlyExclusive] = useState(false);
  const [yt, setYt] = useState<{ open: boolean; title?: string; id?: string }>({ open: false });

  const filtered = useMemo(() => {
    const nq = normalize(q);

    const arr = PARTNERS.filter((p) => {
      const inCat = cat === "Toate" ? true : p.category === cat;
      const exOk = onlyExclusive ? !!p.exclusive : true;
      const hay = [p.name, p.city ?? "", p.category, p.description, ...(p.tags ?? [])].join(" ");
      const inQuery = nq.length === 0 ? true : normalize(hay).includes(nq);
      return inCat && exOk && inQuery;
    });

    arr.sort((a, b) => {
      const pa = a.priority ?? 100;
      const pb = b.priority ?? 100;
      if (pa !== pb) return pa - pb;

      const ca = categoryRank(a.category);
      const cb = categoryRank(b.category);
      if (ca !== cb) return ca - cb;

      return a.name.localeCompare(b.name, "ro");
    });

    return arr;
  }, [q, cat, onlyExclusive]);

  const stats = useMemo(() => {
    const exclusiveCount = PARTNERS.filter((p) => p.exclusive).length;
    const total = PARTNERS.length;
    const cities = new Set(PARTNERS.map((p) => p.city).filter(Boolean) as string[]);
    return { exclusiveCount, total, citiesCount: cities.size };
  }, []);

  const jsonLd = useMemo(() => {
    const items = PARTNERS.filter((p) => p.name && p.image).map((p) => ({
      "@type": "Organization",
      name: p.name,
      url: p.links?.website || p.links?.facebook || p.links?.instagram || undefined,
      image: `${baseUrl}${p.image}`,
      areaServed: p.city ? { "@type": "City", name: p.city } : undefined,
      description: p.description,
      sameAs: [
        p.links?.website,
        p.links?.facebook,
        p.links?.instagram,
        p.links?.youtube,
        p.links?.tiktok,
        p.links?.spotify,
      ].filter(Boolean),
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESC,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((it, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: it,
        })),
      },
    };
  }, [baseUrl]);

  return (
    <>
      <Script
        id="parteneri-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative min-h-screen text-white">
        <div className="relative z-10 pt-20 md:pt-24">
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute -top-24 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-8 md:px-10 pt-6 pb-8 md:pt-7 md:pb-9">
              <p className="text-[11px] uppercase tracking-[0.26em] text-zinc-200/70">
                ANDYmedia • Parteneri & Booking
              </p>

              <h1 className="mt-2 text-xl md:text-2xl font-medium leading-tight text-white/95">
                Parteneri selectați pentru evenimente care trebuie să iasă perfect{" "}
                <span className="text-amber-300">.</span>
              </h1>

              <p className="mt-2 text-sm md:text-base text-zinc-300/85 leading-snug max-w-3xl">
                Partenerii noștri (exclusive + colaborări), DJ, foto-video și artiști. Carduri premium cu poză,
                descriere și linkuri oficiale — exact ce trebuie pentru decizie rapidă.
              </p>

              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/cere-oferta"
                  className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
                >
                  Cere recomandare (client)
                </Link>

                <Link
                  href="/booking"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                >
                  Aplică pentru Booking (artist)
                </Link>

                <Link
                  href="/#top"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
                >
                  Înapoi la Home
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <StatPill v={stats.total} k="profiluri" />
                <StatPill v={stats.exclusiveCount} k="exclusive" />
                <StatPill v={stats.citiesCount} k="orașe" />
                <span className="ml-1 text-xs text-white/40 hidden sm:inline">• actualizăm constant lista</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/65 to-transparent" />
          </section>

          <section className="mx-auto max-w-6xl px-8 md:px-10 pt-6 pb-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-5 backdrop-blur-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-3">
                  <label className="text-sm font-semibold text-white/85">Caută partener (nume, oraș, tag)</label>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder='Ex: "band iasi", "dj", "foto", "corporate"...'
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:w-[360px]">
                  <label className="text-sm font-semibold text-white/85">Filtre</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => {
                      const active = cat === c.key;
                      return (
                        <button
                          key={c.key}
                          onClick={() => setCat(c.key)}
                          className={[
                            "rounded-full px-3 py-2 text-sm font-semibold transition",
                            active
                              ? "bg-white text-neutral-950"
                              : "border border-white/10 bg-white/5 text-white/90 hover:bg-white/10",
                          ].join(" ")}
                          type="button"
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-white/85">
                    <input
                      type="checkbox"
                      checked={onlyExclusive}
                      onChange={(e) => setOnlyExclusive(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/10"
                    />
                    Doar trupe exclusive
                  </label>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                <div>
                  Afișate: <span className="font-semibold text-white">{filtered.length}</span> / {PARTNERS.length}
                </div>
                <div className="hidden sm:block">Ordine: featured → categorie → nume</div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-8 md:px-10 pb-14">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/30 p-10 text-center backdrop-blur-md">
                <div className="text-xl font-bold">Niciun rezultat</div>
                <p className="mt-2 text-white/75">Încearcă alt cuvânt-cheie sau schimbă filtrul.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <article
                    key={p.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 transition hover:border-white/20 hover:bg-black/35 backdrop-blur-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={`${p.name}${p.city ? ` - ${p.city}` : ""} - ANDYmedia partener`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {p.priority && p.priority <= 10 ? <Chip>ANDYmedia Preferred</Chip> : null}
                        {p.exclusive ? <Chip>Exclusiv</Chip> : null}
                        {!p.exclusive && p.collaborated ? <Chip>Colaborat</Chip> : null}
                        <Chip>{p.category}</Chip>
                        {p.since ? <Chip>din {p.since}</Chip> : null}
                      </div>

                      <h2 className="text-xl font-extrabold tracking-tight">{p.name}</h2>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/70">
                        {p.city ? <span>{p.city}</span> : null}
                        {p.tags?.length ? (
                          <>
                            <span className="text-white/30">•</span>
                            <span className="line-clamp-1">{p.tags.join(" · ")}</span>
                          </>
                        ) : null}
                      </div>

                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/80">
                        {p.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.links?.website ? <IconLink href={p.links.website} label="Website" /> : null}
                        {p.links?.facebook ? <IconLink href={p.links.facebook} label="Facebook" /> : null}
                        {p.links?.instagram ? <IconLink href={p.links.instagram} label="Instagram" /> : null}
                        {p.links?.youtube ? <IconLink href={p.links.youtube} label="YouTube" /> : null}
                        {p.links?.tiktok ? <IconLink href={p.links.tiktok} label="TikTok" /> : null}
                        {p.links?.spotify ? <IconLink href={p.links.spotify} label="Spotify" /> : null}

                        {p.links?.contact ? (
                          /^\/|^#/.test(p.links.contact) ? (
                            <Link
                              href={p.links.contact}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                              aria-label="Contact"
                              title="Contact"
                            >
                              <span className="h-2 w-2 rounded-full bg-white/50" />
                              Contact
                            </Link>
                          ) : (
                            <IconLink href={p.links.contact} label="Contact" />
                          )
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="text-xs text-white/55">Linkuri oficiale & demo</div>

                        {p.youtubeEmbed ? (
                          <button
                            onClick={() => setYt({ open: true, title: p.name, id: p.youtubeEmbed })}
                            className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                            type="button"
                          >
                            Vezi video
                          </button>
                        ) : (
                          <span className="text-xs text-white/40">—</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mx-auto max-w-6xl px-8 md:px-10 pb-16">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 md:p-7 backdrop-blur-md">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                    Ești trupă / DJ / artist / foto-video?
                  </div>
                  <h2 className="mt-2 text-xl md:text-2xl font-medium tracking-wide">
                    Vrei să apari pe ANDYmedia <span className="text-amber-300">?</span>
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-zinc-300/85 leading-snug">
                    Profil premium cu poză + descriere + linkuri oficiale. Aplici o singură dată — revenim rapid cu pașii
                    pentru listare.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/booking"
                    className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition text-center"
                  >
                    Aplică pentru listare (Booking)
                  </Link>

                  <div className="rounded-xl border border-white/10 bg-black/25 px-5 py-3 text-xs text-zinc-300/80">
                    Poză: 1600×1000 (ideal), JPG 70–85%, sub ~600KB • Linkuri oficiale • Descriere scurtă
                  </div>
                </div>
              </div>
            </div>
          </section>

          {yt.open && yt.id ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="YouTube preview"
              onClick={() => setYt({ open: false })}
            >
              <div
                className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="text-sm font-semibold text-white/90">
                    {yt.title ? `Preview: ${yt.title}` : "Preview"}
                  </div>
                  <button
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                    onClick={() => setYt({ open: false })}
                    type="button"
                  >
                    Închide
                  </button>
                </div>
                <div className="relative aspect-video w-full">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${yt.id}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
