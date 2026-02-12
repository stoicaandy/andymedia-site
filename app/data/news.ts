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

  // media (din public)
  src?: string;  // "/noutati/...."
  href?: string; // youtube/tiktok
  alt?: string;

  format?: MediaFormat;

  // IMPORTANT:
  // slug = URL-ul paginii (trebuie să existe ca rută în /app/noutati/<slug>/page.tsx)
  slug?: string;

  // imaginea de share (OG)
  ogImage?: string; // "/noutati/...."

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
    id: "Din 2017",
    slug: "din-2017", // 🔥 obligatoriu ca să meargă cu folderul tău /app/noutati/din-2017/page.tsx

    title: "Din 2016 în piața de evenimente",
    description: "Un clip scurt de prezentare a unui montaj scenotehnic din 2018.",
    date: "2018-07-10",

    // pe pagina noutății rulăm video
    type: "video",
    format: "landscape",
    src: "/noutati/video-2017.mp4",

    // în casetă + la share pe Facebook folosim poza asta
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

function ensureLeadingSlash(p?: string) {
  if (!p) return p;
  const t = p.trim();
  if (!t) return undefined;
  return t.startsWith("/") ? t : `/${t}`;
}

const DEFAULT_ACTIONS: NewsAction[] = [
  { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
  { label: "Servicii", href: "/servicii", variant: "secondary" },
  { label: "Portofoliu", href: "/portofoliu", variant: "secondary" },
];

export const NEWS: NewsItem[] = NEWS_BASE.map((x) => {
  const slug = x.slug?.trim() ? x.slug.trim() : toSlug(x.id);
  const actions = x.actions?.length ? x.actions : DEFAULT_ACTIONS;

  const src = ensureLeadingSlash(x.src);
  const ogImage = ensureLeadingSlash(x.ogImage) ?? `/og/news/${slug}.jpg`;

  return {
    id: x.id,
    slug,
    ogImage,
    title: x.title,
    description: x.description,
    date: x.date,
    type: x.type,
    provider: x.provider,
    src,
    href: x.href,
    alt: x.alt,
    format: x.format ?? "landscape",
    actions,
  };
});

export function getNewsBySlug(slug: string) {
  return NEWS.find((x) => x.slug === slug);
}
