import type { PortfolioItem } from "@/app/components/PortfolioCard";

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "demo-corporate-iasi",
    title: "Eveniment corporate – Iași",
    location: "Iași",
    date: "2025-10",
    category: "Corporate",
    summary:
      "Setup complet pentru prezentare și panel, cu sunet clar, lumină controlată și flux stabil pe tot parcursul evenimentului.",
    services: [
      "Sonorizare profesională (d&b audiotechnik)",
      "Operator mixaj audio / sunetist",
      "Lumini scenice & ambientale",
    ],
    media: {
      type: "image",
      src: "/Portofoliu/demo-photo-1.jpg",
      alt: "Eveniment corporate în Iași – sonorizare și lumini",
    },
    tags: ["sonorizare iași", "evenimente corporate", "lumini scenice"],
  },
  {
    slug: "demo-wedding-iasi",
    title: "Nuntă – lumini ambientale & DJ",
    location: "Iași",
    date: "2025-09",
    category: "Nuntă",
    summary:
      "Atmosferă elegantă cu lumini ambientale/arhitecturale, plus DJ și coordonare tehnică pentru un flow fără timpi morți.",
    services: [
      "DJ (program artistic cu fonograme)",
      "Lumini ambientale & arhitecturale",
      "Sonorizare pentru sală",
    ],
    media: {
      type: "image",
      src: "/Portofoliu/demo-photo-2.jpg",
      alt: "Nuntă în Iași – DJ și lumini ambientale",
    },
    tags: ["dj nuntă iași", "lumini ambientale", "sonorizare nuntă"],
  },
  {
    slug: "demo-video-landscape",
    title: "Scenă & producție video – setup demo",
    location: "Moldova",
    date: "2025-08",
    category: "Producție",
    summary:
      "Exemplu de integrare video pe eveniment: fișiere media, poster, control și randare fără blocaje.",
    services: [
      "Video / broadcast",
      "Operator grafică vizuală (Resolume Arena)",
      "Integrare surse media",
    ],
    media: {
      type: "video",
      src: "/Portofoliu/demo-video-landscape.mp4",
      poster: "/Portofoliu/demo-video-landscape-poster.jpg",
      alt: "Video demo landscape – portofoliu ANDYmedia",
    },
    tags: ["broadcast", "resolume", "ecrane led"],
  },
  {
    slug: "demo-video-portrait",
    title: "Conținut vertical – demo",
    location: "Iași",
    date: "2025-07",
    category: "Social / Reels",
    summary:
      "Video vertical ca exemplu pentru conținut promo, cu poster și încărcare ușoară.",
    services: ["Producție video", "Editare / export", "Livrare fișiere"],
    media: {
      type: "video",
      src: "/Portofoliu/demo-video-portrait.mp4",
      poster: "/Portofoliu/demo-video-portrait-poster.jpeg",
      alt: "Video demo portrait – portofoliu ANDYmedia",
    },
    tags: ["video", "reels", "promo"],
  },
];
