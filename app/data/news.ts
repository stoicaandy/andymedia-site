export type NewsItem = {
  id: string;
  type: "image" | "video" | "embed";
  provider?: "youtube";
  src?: string; // pt image/video
  href?: string; // pt embed (YouTube)
  alt?: string;
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
};

export const NEWS: NewsItem[] = [
  {
    id: "retro-lights",
    type: "image",
    src: "/noutati/retro.jpg",
    alt: "Lumini retro pentru impact vizual",
    title: "Upgrade flota lumini",
    description:
      "Ne îmbunătățim în mod constant flota de echipament pentru a obține impact vizual maxim și un sunet cât mai pur. În curând mai multe lumini retro în stock.",
    date: "2026-02-06",
  },

  {
    id: "miclauseni",
    type: "image",
    src: "/noutati/miclauseni.jpg",
    alt: "Iluminat arhitectural Castel Miclăușeni",
    title: "Iluminat arhitectural",
    description:
      "Castelul Sturza din Miclăușeni e gazda multor evenimente deosebite. Iluminatul nostru arhitectural a avut un impact vizual major.",
    date: "2026-02-05",
  },

  {
    id: "clip-setup",
    type: "video",
    src: "/noutati/clip1.mp4",
    title: "Setup rapid (teaser)",
    description:
      "Un scurt video dintr-un setup recent — în colaborare cu Privilege (Bogdan Ivan).",
    date: "2026-02-04",
  },

  {
    id: "yt-1",
    type: "embed",
    provider: "youtube",
    href: "https://youtu.be/0D29cI0z_0g?si=xIPRgq_Ohrjqm60W",
    title: "Trupa de Weekend (YouTube)",
    description: "Un demo cu partenerii noștri în colaborarea cu noi.",
    date: "2026-02-02",
  },
];
