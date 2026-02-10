export type NewsProvider = "youtube" | "tiktok";

export type NewsType = "image" | "video" | "embed";

export type NewsAction = {
  label: string;
  href: string; // intern sau extern
  variant?: "primary" | "secondary";
};

export type NewsItemBase = {
  // CE AI TU DE COMPLETAT (simplu)
  id: string;
  type: NewsType;
  provider?: NewsProvider;

  src?: string; // pt image/video local (ex: "/noutati/retro.jpg" sau "/video/clip.mp4")
  href?: string; // pt embed (YouTube/TikTok link)
  alt?: string;

  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"

  // OPTIONAL (dacă nu pui, se generează automat)
  slug?: string; // URL: /noutati/<slug> (dacă lipsește => din id)
  ogImage?: string; // imagine pt Facebook share (dacă lipsește => "/og/news/<id>.jpg")
  actions?: NewsAction[]; // butoane în pagină (dacă lipsește => default)
};

export type NewsItem = {
  // CE FOLOSEȘTE SITE-UL (auto)
  id: string;
  slug: string;
  ogImage: string;

  type: NewsType;
  provider?: NewsProvider;

  src?: string;
  href?: string;
  alt?: string;

  title: string;
  description: string;
  date: string;

  actions: NewsAction[];
};

// 1) AICI pui noutățile (exact ca înainte)
// IMPORTANT: în exemplu am păstrat primul item din ce ai trimis.
// Completezi restul item-urilor tale aici.
export const NEWS_BASE: NewsItemBase[] = [
  {
    id: "retro-lights",
    type: "image",
    src: "/noutati/retro.jpg",
    alt: "Lumini retro pentru impact vizual",
    title: "Upgrade flota lumini",
    description:
      "Ne îmbunătățim în mod constant flota de echipament pentru a obține impact vizual maxim și un sunet cât mai pur. În curând mai multe lumini retro în stock.",
    date: "2026-02-06",
    // OPTIONAL:
    // slug: "upgrade-flota-lumini",
    // ogImage: "/og/news/retro-lights.jpg",
    // actions: [...]
  },

  {
    id: "miclauseni",
    type: "image",
    src: "/noutati/miclauseni.jpg",
    alt: "Eveniment Miclăușeni",
    title: "Proiect Miclăușeni",
    description: "Descrierea ta aici (cum era înainte).",
    date: "2026-02-02",
  },
];

// ===== Helpers (nu umbli aici) =====
function toSlug(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DEFAULT_ACTIONS: NewsAction[] = [
  { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
  { label: "Servicii", href: "/servicii", variant: "secondary" },
  { label: "Portofoliu", href: "/portofoliu", variant: "secondary" },
];

export const NEWS: NewsItem[] = NEWS_BASE.map((x) => {
  const slug = x.slug?.trim() ? x.slug.trim() : toSlug(x.id);
  const ogImage = x.ogImage?.trim() ? x.ogImage.trim() : `/og/news/${x.id}.jpg`;
  const actions = x.actions?.length ? x.actions : DEFAULT_ACTIONS;

  return {
    id: x.id,
    slug,
    ogImage,
    type: x.type,
    provider: x.provider,
    src: x.src,
    href: x.href,
    alt: x.alt,
    title: x.title,
    description: x.description,
    date: x.date,
    actions,
  };
});

export function getNewsBySlug(slug: string) {
  return NEWS.find((x) => x.slug === slug);
}
