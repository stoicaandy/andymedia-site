export type PortfolioMediaAuto = {
  folder: string;        // ex: "portf1"
  photosCount: number;   // ex: 4 => 1.jpg..4.jpg
  hasVideo?: boolean;    // dacă există video.mp4 în folder (rulat direct în card)
  poster?: boolean;      // dacă există poster.jpg în folder (pentru video)
  youtubeId?: string;    // ✅ dacă vrei YouTube DOAR în lightbox (ex: "dQw4w9WgXcQ")
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
    title: "Concert De Craciun – Pepe , Mioara Velicu , Mirela Vaida",
    location: "Ion Neculce",
    date: "2025-08",
    category: "Producție",
    summary:
      "O colaborare impecabila cu partenerii nostri Prestige. Multumim Bogdan Ivan!",
    services: ["Instalatie PA", "Lumini& Ecrane LED", "Scena - Regie"],
    tags: ["broadcast", "led", "workflow"],
    media: {
      folder: "portf2",
      photosCount: 5,
      hasVideo: true,
      poster: false,
    },
  },
  {
    slug: "portf3-eveniment-x",
    title: "Zilele Tomesti – Voltaj , Ionut Gallani",
    location: "Iași",
    date: "2025-07",
    category: "Coproductii",
    summary:
      "O colaborare impecabila cu partenerii nostri Prestige. Multumim Bogdan Ivan!",
    services: ["Regie Sunet"],
    tags: ["nuntă", "lumini", "sunet"],
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
    category: "Nuntă",
    summary: "O colaborare impecabila cu partenerii nostri Sincroline.",
    services: ["Regie Sunet"],
    tags: ["Instalatie PA", "Lumini & Ecrane LED", "Scena - Regie"],
    media: {
      folder: "portf4",
      photosCount: 5,
      hasVideo: false,

      // ✅ EXEMPLU: dacă vrei YouTube DOAR în lightbox
      // youtubeId: "dQw4w9WgXcQ",

      poster: false,
    },
  },
];
