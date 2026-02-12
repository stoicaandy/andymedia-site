export type NewsProvider = "youtube" | "tiktok";
export type NewsType = "image" | "video" | "embed";
export type MediaFormat = "landscape" | "portrait";

export type NewsAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type NewsItemBase = {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  type: NewsType;
  provider?: NewsProvider;

  // media (din public -> începe cu "/")
  src?: string;
  href?: string;
  alt?: string;

  // layout
  format?: MediaFormat;

  // share
  slug?: string;
  ogImage?: string;

  actions?: NewsAction[];
};

export type NewsItem = {
  id: string;
  slug: string;
  ogImage: string;

  title: string;
  description: string;
  date: string;

  type: NewsType;
  provider?: NewsProvider;

  src?: string;
  href?: string;
  alt?: string;

  format: MediaFormat;
  actions: NewsAction[];
};

// =========================
// AICI editezi tu noutățile
// =========================
export const NEWS_BASE: NewsItemBase[] = [
  {
    id: "Video prezentare",
    title: "Din 2016 in piata de evenimente",
    description: "Un clip scurt de prezentare a unui montaj scenotehnic din 2018",
    date: "2018-07-10",
    type: "video",
    format: "landscape",

    // IMPORTANT: fisierul e in public/noutati/
    src: "/noutati/video-2017.mp4",

    // OG image in public/noutati/
    ogImage: "/noutati/din2017.jpg",

    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Oferte", href: "/oferte", variant: "secondary" },
    ],
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
    .replace(/ș|ş/g, "s")
    .replace(/ț|ţ/g, "t")
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
  const ogImage = x.ogImage?.trim() ? x.ogImage.trim() : `/og/news/${slug}.jpg`;
  const actions = x.actions?.length ? x.actions : DEFAULT_ACTIONS;

  return {
    id: x.id,
    slug,
    ogImage,
    title: x.title,
    description: x.description,
    date: x.date,
    type: x.type,
    provider: x.provider,
    src: x.src,
    href: x.href,
    alt: x.alt,
    format: x.format ?? "landscape",
    actions,
  };
});

export function getNewsBySlug(slug: string) {
  return NEWS.find((x) => x.slug === slug);
}
