export type NewsProvider = "youtube" | "tiktok";
export type NewsType = "image" | "video" | "embed";
export type MediaFormat = "landscape" | "portrait";

export type NewsAction = {
  label: string;
  href: string; // intern sau extern
  variant?: "primary" | "secondary";
};

export type NewsItemBase = {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD

  type: NewsType;
  provider?: NewsProvider;

  // media
  src?: string;  // local image/video
  href?: string; // youtube/tiktok link
  alt?: string;

  // control layout
  format?: MediaFormat; // portrait/landscape (default landscape)

  // share
  slug?: string;
  ogImage?: string; // 1200x630 recomandat

  // buttons in page
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
  // 1) IMAGINE LANDSCAPE (ex: 16:9)
  
  // 2) VIDEO LOCAL LANDSCAPE (site tour)
  {
    id: "Video prezentare",
    title: "Din 2016 in piata de evenimente",
    description:
      "Un clip scurt de prezentare a unui montaj scenotehnic din 2018",
    date: "2018-07-10",
    type: "video",
    format: "landscape",
    src: "/video/video-2017.mp4",
    ogImage: "/video/din2017.jpg",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Oferte", href: "/oferte", variant: "secondary" },
    ],
  },

  // 3) VIDEO LOCAL PORTRAIT (ex: 9:16)
  
  // 4) YOUTUBE EXTERN (embed în pagină)
 
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
  const ogImage = x.ogImage?.trim() ? x.ogImage.trim() : `/og/news/${x.id}.jpg`;
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
