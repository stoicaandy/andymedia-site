export type PortfolioMediaAuto = {
  folder: string;        // ex: "portf1"
  photosCount: number;   // ex: 4 => 1.jpg..4.jpg

  hasVideo?: boolean;    // dacă există video (local sau extern)
  poster?: boolean;      // dacă există poster.jpg în folder (pentru video)

  videoUrl?: string;     // ✅ MP4 extern (ex: https://www.andymusic.ro/scena-iasi.mp4)
  youtubeId?: string;    // ✅ YouTube DOAR în lightbox (ex: "dQw4w9WgXcQ")
};

export type PortfolioItem = {
  slug: string;
  title: string;
  location: string;
  date: string;      // ex: "2025-10"
  category: string;  // ex: "Corporate"
  summary: string;
  services: string[];
  tags: string[];
  media: PortfolioMediaAuto;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "portf1-eveniment-x",
    title: "Balul Vietii – Andra Maruta , SoundCheck Band",
    location: "Iași",
    date: "2025-09",
    category: "Corporate",
    summary:
      "Colaborare impecabila, montaj rapid, control complet în sală. Execuție stabilă, fără improvizații.",
    services: ["Instalatie PA", "Lumini Scena", "Ecrane LED"],
    tags: ["sonorizare iași", "corporate", "lumini"],
    media: {
      folder: "portf1",
      photosCount: 3,
      hasVideo: true,
      poster: false,
    },
  },

  {
    slug: "portf2-eveniment-x",
    title: "Concert De Craciun – Pepe , Viorica Macovei , Fuego",
    location: "Ion Neculce",
    date: "2024-12",
    category: "Producție",
    summary:
      "Un concert de Craciun pe care l-am orgnizat 2 ani la rand. Multumim pentru incredere Ion Neculce!",
    services: ["Instalatie PA", "Lumini& Ecrane LED", "Scena - Regie"],
    tags: ["broadcast", "led", "workflow"],
    media: {
      folder: "portf2",
      photosCount: 5,
      hasVideo: true,
      poster: false,

      // ✅ MP4 extern (rulează direct în card)
      videoUrl: "https://www.andymusic.ro/scena-iasi.mp4",
    },
  },

  {
    slug: "portf3-eveniment-x",
    title: "Balul absolvirii UMF Iasi",
    location: "Iași",
    date: "2019-07",
    category: "Productie",
    summary: "Trupa Soundcheck",
    services: ["Instalatie PA", "Lumini&Ecrane LED"],
    tags: ["Banchet", "lumini", "sunet", "LED Screen"],
    media: {
      folder: "portf3",
      photosCount: 5,
      hasVideo: true,
      poster: false,
    },
  },

  {
    slug: "portf4-eveniment-x",
    title: "GALA K1 – Competitie Sportiva",
    location: "Iași",
    date: "2025-07",
    category: "Productie",
    summary: "O colaborare impecabila cu partenerii nostri Sincroline.",
    services: ["Regie Sunet", "Instalatie PA", "Ecrane LED", "Lumini"],
    tags: ["Instalatie PA", "Lumini & Ecrane LED", "Scena - Regie"],
    media: {
      folder: "portf4",
      photosCount: 5,
      hasVideo: false,
      poster: false,

      // ✅ exemplu YouTube DOAR în lightbox:
      // youtubeId: "dQw4w9WgXcQ",
    },
  },
];
