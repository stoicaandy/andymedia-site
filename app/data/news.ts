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
  {
    id: "site-launch",
    title: "Ne-am dezvoltat site-ul ca să fim mai aproape de parteneri și clienți",
    description:
      "Am construit andymedia.ro ca un hub clar: servicii, portofoliu, oferte și contact. Ne ajută să lucrăm mai rapid și mai organizat.",
    date: "2026-02-10",
    type: "image",
    format: "landscape",
    src: "/noutati/site-launch.jpg",
    alt: "Preview andymedia.ro",
    ogImage: "/og/news/site-launch.jpg",
    actions: [
      { label: "Vezi servicii", href: "/servicii", variant: "secondary" },
      { label: "Vezi portofoliu", href: "/portofoliu", variant: "secondary" },
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
    ],
  },

  // 2) VIDEO LOCAL LANDSCAPE (site tour)
  {
    id: "site-tour-video",
    title: "Tur rapid: Hero → Servicii → Parteneri (video)",
    description:
      "Un clip scurt care arată structura site-ului: ce facem, cu cine lucrăm și cum ceri ofertă.",
    date: "2026-02-10",
    type: "video",
    format: "landscape",
    src: "/video/site-tour.mp4",
    ogImage: "/og/news/site-tour-video.jpg",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Oferte", href: "/oferte", variant: "secondary" },
    ],
  },

  // 3) VIDEO LOCAL PORTRAIT (ex: 9:16)
  {
    id: "moment-vertical",
    title: "Moment din eveniment (vertical)",
    description:
      "Clip vertical (9:16) — lumini, energie, detalii. Ideal pentru mobil.",
    date: "2026-02-06",
    type: "video",
    format: "portrait",
    src: "/video/moment-vertical.mp4",
    ogImage: "/og/news/moment-vertical.jpg",
    actions: [
      { label: "Servicii", href: "/servicii", variant: "secondary" },
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
    ],
  },

  // 4) YOUTUBE EXTERN (embed în pagină)
  {
    id: "showreel-youtube",
    title: "Showreel (YouTube)",
    description:
      "Material scurt cu secvențe din proiecte — pentru o privire rapidă asupra stilului nostru.",
    date: "2026-02-01",
    type: "embed",
    provider: "youtube",
    format: "landscape",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ogImage: "/og/news/showreel-youtube.jpg",
    actions: [
      { label: "Portofoliu", href: "/portofoliu", variant: "secondary" },
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
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
