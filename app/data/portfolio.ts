// app/data/portfolio.ts

export type PortfolioCategory = "corporate" | "concert" | "conference" | "wedding";

export type PortfolioMedia =
  | {
      type: "image";
      src: string; // ex: "/portofoliu/demo-photo-1.jpg"
      alt?: string;
    }
  | {
      type: "video";
      src: string; // ex: "/portofoliu/demo-video-landscape.mp4"
      poster?: string; // ex: "/portofoliu/demo-video-landscape-poster.jpg"
      orientation?: "landscape" | "portrait";
      alt?: string;
    };

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  services: string[];
  description: string;
  media: PortfolioMedia;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "demo-photo-1",
    title: "Eveniment Corporate – Soluție Audio Completă",
    category: "corporate",
    services: ["Sunet", "Lumini"],
    description:
      "Sistem audio optimizat pentru claritate și acoperire uniformă într-un spațiu corporate.",
    media: {
      type: "image",
      src: "/portofoliu/demo-photo-1.jpg",
      alt: "Eveniment corporate – soluție audio completă"
    }
  },
  {
    id: "demo-photo-2",
    title: "Conferință – Setup Tehnic Integrat",
    category: "conference",
    services: ["Sunet", "LED", "Scenă"],
    description:
      "Configurație tehnică completă pentru conferință, cu focus pe inteligibilitate și flux tehnic stabil.",
    media: {
      type: "image",
      src: "/portofoliu/demo-photo-2.jpg",
      alt: "Conferință – setup tehnic integrat"
    }
  },
  {
    id: "demo-video-1",
    title: "Concert – Control și Presiune Sonoră",
    category: "concert",
    services: ["Sunet"],
    description:
      "Optimizare sistem și mix live, cu accent pe headroom, impact și coerență în sală.",
    media: {
      type: "video",
      src: "/portofoliu/demo-video-landscape.mp4",
      poster: "/portofoliu/demo-video-landscape-poster.jpg",
      orientation: "landscape",
      alt: "Concert – video demonstrativ"
    }
  },
  {
    id: "demo-video-2",
    title: "Behind the Scenes – Configurare Sunet",
    category: "corporate",
    services: ["Sunet"],
    description:
      "Setup și calibrare sistem audio în condiții reale de producție, pentru rezultate consistente.",
    media: {
      type: "video",
      src: "/portofoliu/demo-video-portrait.mp4",
      poster: "/portofoliu/demo-video-portrait-poster.jpg",
      orientation: "portrait",
      alt: "Configurare sunet – video demonstrativ"
    }
  }
];
