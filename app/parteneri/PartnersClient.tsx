'use client';

import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type PartnerCategory =
  | 'Trupe exclusive'
  | 'Trupe colaborări'
  | 'DJ'
  | 'Foto-Video'
  | 'Artiști'
  | 'Servicii'
  | 'Booking';

type PartnerLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string; // canal / profil
  spotify?: string;
  tiktok?: string;
  contact?: string; // ex: whatsapp / tel / mailto / link intern
};

type Partner = {
  id: string; // unic
  name: string;
  city?: string; // ex: Iași
  category: PartnerCategory;
  exclusive?: boolean;
  since?: string; // ex: "2022", "2019"
  collaborated?: boolean; // pentru colaborări
  description: string;
  image: string; // din /public/parteneri
  tags?: string[];
  links?: PartnerLinks;
  youtubeEmbed?: string; // ID video YouTube (ex: "dQw4w9WgXcQ") pentru preview
};

const PAGE_TITLE = 'Parteneri • Booking • Trupe • DJ • Foto-Video | ANDYmedia';
const PAGE_DESC =
  'Trupe exclusive, colaborări, DJ, foto-video și artiști cu care lucrăm. Booking în dezvoltare: adăugăm constant noi parteneri.';

// 🔧 AICI completezi ușor: nume + poză + descriere + linkuri
const PARTNERS: Partner[] = [
  {
    id: 'soundcheck-band-iasi',
    name: 'Soundcheck Band',
    city: 'Iași',
    category: 'Trupe exclusive',
    exclusive: true,
    since: '2022',
    description:
      'Trupă live pentru evenimente corporate și private. Show disciplinat, repertoriu adaptabil și energie de scenă. Lucrează cu noi pe setup tehnic calibrat (FOH/monitor).',
    image: '/parteneri/soundcheck-band-iasi.jpg',
    tags: ['live', 'corporate', 'nuntă', 'cover band'],
    links: {
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      youtube: 'https://youtube.com/',
      website: 'https://example.com',
    },
    youtubeEmbed: '', // pune ID video dacă vrei preview
  },
  {
    id: 'trupa-de-weekend-iasi',
    name: 'Trupa de Weekend',
    city: 'Iași',
    category: 'Trupe exclusive',
    exclusive: true,
    since: '2021',
    description:
      'Trupă de party cu setlist modern + evergreen, potrivită pentru public mixt. Stage-ready, soundcheck eficient, vibe de festival în sală.',
    image: '/parteneri/trupa-de-weekend-iasi.jpg',
    tags: ['party', 'live', 'evenimente', 'cover'],
    links: {
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      youtube: 'https://youtube.com/',
    },
    youtubeEmbed: '',
  },

  // ✅ Exemplu colaborări (nu exclusive)
  {
    id: 'trupa-colaborare-exemplu',
    name: 'Exemplu Trupă Colaborare',
    city: 'Bacău',
    category: 'Trupe colaborări',
    collaborated: true,
    since: '2019',
    description:
      'Am colaborat la evenimente punctuale (show-uri, spectacole, apariții). Setup tehnic livrat de ANDYmedia + operator dedicat.',
    image: '/parteneri/exemplu-trupa-colaborare-bacau.jpg',
    tags: ['colaborare', 'spectacol', 'live'],
    links: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      website: 'https://example.com',
    },
  },

  // ✅ DJ
  {
    id: 'dj-exemplu-iasi',
    name: 'DJ Exemplu',
    city: 'Iași',
    category: 'DJ',
    description:
      'DJ orientat pe public & moment: warm-up corect, peak-time controlat, microfon de eveniment, setlist adaptat (nu “un playlist la întâmplare”).',
    image: '/parteneri/dj-exemplu-iasi.jpg',
    tags: ['nuntă', 'corporate', 'club', 'open format'],
    links: {
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      youtube: 'https://youtube.com/',
      contact: 'https://wa.me/', // sau "tel:+40..."
    },
    youtubeEmbed: '',
  },

  // ✅ Foto-video
  {
    id: 'foto-video-exemplu-iasi',
    name: 'Studio Foto-Video Exemplu',
    city: 'Iași',
    category: 'Foto-Video',
    description:
      'Echipă foto-video pentru evenimente: cadre curate, livrare rapidă, colaborare fluidă cu regie/LED pentru integrare live (HDMI/SDI).',
    image: '/parteneri/foto-video-exemplu-iasi.jpg',
    tags: ['foto', 'video', 'reels', 'after-movie'],
    links: {
      website: 'https://example.com',
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      youtube: 'https://youtube.com/',
    },
  },

  // ✅ Booking (în dezvoltare)
  {
    id: 'booking-in-dezvoltare',
    name: 'Booking (în dezvoltare)',
    category: 'Booking',
    description:
      'Adăugăm constant artiști și formații imediat ce avem contactul lor. Dacă vrei recomandări rapide, trimite-ne detaliile evenimentului.',
    image: '/parteneri/booking-andymedia.jpg',
    tags: ['booking', 'artiști', 'formații', 'DJ'],
    links: {
      contact: '/cere-oferta',
    },
  },
];

const CATEGORIES: Array<{ key: PartnerCategory | 'Toate'; label: string }> = [
  { key: 'Toate', label: 'Toate' },
  { key: 'Trupe exclusive', label: 'Trupe exclusive' },
  { key: 'Trupe colaborări', label: 'Colaborări' },
  { key: 'DJ', label: 'DJ' },
  { key: 'Foto-Video', label: 'Foto-Video' },
  { key: 'Artiști', label: 'Artiști' },
  { key: 'Servicii', label: 'Servicii' },
  { key: 'Booking', label: 'Booking' },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function IconLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="h-2 w-2 rounded-full bg-white/50" />
      {label}
    </a>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
      {children}
    </span>
  );
}

export default function PartnersClient({ baseUrl }: { baseUrl: string }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<PartnerCategory | 'Toate'>('Toate');
  const [onlyExclusive, setOnlyExclusive] = useState(false);
  const [yt, setYt] = useState<{ open: boolean; title?: string; id?: string }>({
    open: false,
  });

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return PARTNERS.filter((p) => {
      const inCat = cat === 'Toate' ? true : p.category === cat;
      const exOk = onlyExclusive ? !!p.exclusive : true;

      const hay = [
        p.name,
        p.city ?? '',
        p.category,
        p.description,
        ...(p.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();

      const inQuery = nq.length === 0 ? true : normalize(hay).includes(nq);
      return inCat && exOk && inQuery;
    });
  }, [q, cat, onlyExclusive]);

  const stats = useMemo(() => {
    const exclusiveCount = PARTNERS.filter((p) => p.exclusive).length;
    const total = PARTNERS.length;
    const cities = new Set(
      PARTNERS.map((p) => p.city).filter(Boolean) as string[]
    );
    return { exclusiveCount, total, citiesCount: cities.size };
  }, []);

  const jsonLd = useMemo(() => {
    const items = PARTNERS.filter((p) => p.name && p.image).map((p) => ({
      '@type': 'Organization',
      name: p.name,
      url:
        p.links?.website ||
        p.links?.facebook ||
        p.links?.instagram ||
        undefined,
      image: `${baseUrl}${p.image}`,
      areaServed: p.city ? { '@type': 'City', name: p.city } : undefined,
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
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: PAGE_TITLE,
      description: PAGE_DESC,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((it, idx) => ({
          '@type': 'ListItem',
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

      <main className="min-h-screen bg-neutral-950 text-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -top-24 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>ANDYmedia • Parteneri</Badge>
                <Badge>Booking în dezvoltare</Badge>
                <Badge>Linkuri oficiale</Badge>
              </div>

              <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
                Trupe, DJ, Foto-Video & artiști — selectați pentru evenimente care
                trebuie să iasă perfect.
              </h1>

              <p className="max-w-3xl text-pretty text-base text-white/70 sm:text-lg">
                Aici găsești partenerii noștri: <strong className="text-white">trupe exclusive</strong>, colaborări,
                DJ, echipe foto-video și booking (în creștere). Fiecare profil are
                card dedicat cu poză, descriere și linkuri către canalele lor.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-white/70">profiluri în listă</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-bold">{stats.exclusiveCount}</div>
                  <div className="text-sm text-white/70">trupe exclusive</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-bold">{stats.citiesCount}</div>
                  <div className="text-sm text-white/70">orașe reprezentate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cere-oferta"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                >
                  Cere recomandare / disponibilitate
                </Link>
                <Link
                  href="/servicii"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Vezi serviciile ANDYmedia
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="mx-auto max-w-6xl px-4 pb-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-col gap-3">
                <label className="text-sm font-semibold text-white/80">
                  Caută partener (nume, oraș, tag)
                </label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder='Ex: "band iasi", "dj", "foto", "corporate"...'
                  className="w-full rounded-2xl border border-white/10 bg-neutral-950/60 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                />
              </div>

              <div className="flex flex-col gap-3 sm:w-[360px]">
                <label className="text-sm font-semibold text-white/80">Filtre</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const active = cat === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setCat(c.key)}
                        className={[
                          'rounded-full px-3 py-2 text-sm font-semibold transition',
                          active
                            ? 'bg-white text-neutral-950'
                            : 'border border-white/10 bg-white/5 text-white/85 hover:bg-white/10',
                        ].join(' ')}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
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

            <div className="mt-4 flex items-center justify-between text-sm text-white/60">
              <div>
                Afișate:{' '}
                <span className="font-semibold text-white">{filtered.length}</span> /{' '}
                {PARTNERS.length}
              </div>
              <div className="hidden sm:block">
                Tip: carduri optimizate pentru linkuri oficiale + SEO
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-6xl px-4 pb-14">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="text-xl font-bold">Niciun rezultat</div>
              <p className="mt-2 text-white/70">
                Încearcă alt cuvânt-cheie sau schimbă filtrul.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.name}${p.city ? ` - ${p.city}` : ''} - ANDYmedia partener`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/10 to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {p.exclusive ? <Badge>Exclusiv</Badge> : null}
                      {!p.exclusive && p.collaborated ? <Badge>Colaborat</Badge> : null}
                      <Badge>{p.category}</Badge>
                      {p.since ? <Badge>din {p.since}</Badge> : null}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h2 className="text-xl font-extrabold tracking-tight">{p.name}</h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/65">
                      {p.city ? <span>{p.city}</span> : null}
                      {p.tags?.length ? (
                        <>
                          <span className="text-white/25">•</span>
                          <span className="line-clamp-1">{p.tags.join(' · ')}</span>
                        </>
                      ) : null}
                    </div>

                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/75">
                      {p.description}
                    </p>

                    {/* LINKS */}
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

                    {/* CTA / YT preview */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="text-xs text-white/50">
                        Tip: folosește linkurile oficiale
                      </div>

                      {p.youtubeEmbed ? (
                        <button
                          onClick={() => setYt({ open: true, title: p.name, id: p.youtubeEmbed })}
                          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                        >
                          Vezi video
                        </button>
                      ) : (
                        <span className="text-xs text-white/40">—</span>
                      )}
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* BOOKING SECTION */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Booking (în dezvoltare) — adăugăm constant artiști
                </h3>
                <p className="mt-2 text-white/70">
                  Dacă vrei recomandări rapide (trupă/DJ/foto-video) în funcție de public,
                  locație și buget, trimite-ne detaliile. Îți răspundem cu opțiuni potrivite,
                  nu “random”.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/cere-oferta"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                  >
                    Cere recomandare
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact rapid
                  </Link>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                  <div className="text-sm font-semibold text-white/85">Ce ne trimiți</div>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    <li>• Data & orașul</li>
                    <li>• Tipul evenimentului</li>
                    <li>• Număr invitați / locație</li>
                    <li>• Interval buget (opțional)</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                  <div className="text-sm font-semibold text-white/85">Ce primești</div>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    <li>• 2–5 opțiuni potrivite</li>
                    <li>• Linkuri oficiale & demo</li>
                    <li>• Recomandare tehnică ANDYmedia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YOUTUBE MODAL */}
        {yt.open && yt.id ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="YouTube preview"
            onClick={() => setYt({ open: false })}
          >
            <div
              className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="text-sm font-semibold text-white/90">
                  {yt.title ? `Preview: ${yt.title}` : 'Preview'}
                </div>
                <button
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setYt({ open: false })}
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
      </main>
    </>
  );
}
