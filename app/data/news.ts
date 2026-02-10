export type NewsProvider = "youtube" | "tiktok";

export type NewsType = "image" | "video" | "embed";

export type NewsAction = {
  label: string;
  href: string; // intern sau extern
  variant?: "primary" | "secondary";
};

export type NewsItem = {
  id: string;
  slug: string; // URL: /noutati/[slug]
  title: string;
  description: string;
  date: string; // YYYY-MM-DD

  // Pentru Facebook share (OG image) - obligatoriu
  ogImage: string; // ex: "/og/news/colaborare-prestige.jpg"

  // Media afișat în pagină / în card
  type: NewsType;
  provider?: NewsProvider;

  // local image/video
  src?: string; // ex: "/news/prestige.jpg" sau "/video/prestige.mp4"
  alt?: string;

  // embed URL (youtube/tiktok)
  href?: string;

  // Butoane din pagina noutății
  actions: NewsAction[];
};

export const NEWS: NewsItem[] = [
  {
    id: "news-001",
    slug: "colaborare-prestige",
    title: "Colaborare cu Prestige",
    description:
      "Proiect livrat cu focus pe control, claritate și execuție. Mulțumim pentru încredere!",
    date: "2026-02-01",
    ogImage: "/og/news/colaborare-prestige.jpg",
    type: "image",
    src: "/news/prestige.jpg",
    alt: "ANDYmedia - colaborare Prestige",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Vezi servicii", href: "/servicii", variant: "secondary" },
      { label: "Vezi portofoliu", href: "/portofoliu", variant: "secondary" },
    ],
  },
  {
    id: "news-002",
    slug: "regie-sunet-sincroline",
    title: "Regie sunet — Sincroline",
    description:
      "Operare atentă pe toată durata evenimentului, setup curat și comunicare clară.",
    date: "2026-01-25",
    ogImage: "/og/news/regie-sunet-sincroline.jpg",
    type: "video",
    src: "/video/sincroline.mp4",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Echipamente", href: "/echipamente", variant: "secondary" },
    ],
  },
  {
    id: "news-003",
    slug: "showreel-youtube",
    title: "Showreel (YouTube)",
    description:
      "Material video cu secvențe din proiecte — ideal pentru o privire rapidă asupra stilului nostru.",
    date: "2026-01-10",
    ogImage: "/og/news/showreel-youtube.jpg",
    type: "embed",
    provider: "youtube",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Portofoliu", href: "/portofoliu", variant: "secondary" },
    ],
  },
  {
    id: "news-004",
    slug: "clip-tiktok",
    title: "Moment din eveniment (TikTok)",
    description:
      "Clip scurt din teren — vibe, lumini și energie. (Embed TikTok în pagină.)",
    date: "2026-01-05",
    ogImage: "/og/news/clip-tiktok.jpg",
    type: "embed",
    provider: "tiktok",
    href: "https://www.tiktok.com/@username/video/1234567890123456789",
    actions: [
      { label: "Cere ofertă", href: "/cere-oferta?oferta=custom", variant: "primary" },
      { label: "Servicii", href: "/servicii", variant: "secondary" },
    ],
  },
];
