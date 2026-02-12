export type OfferItem = {
  id: string; // oferta1, oferta2...
  title: string;
  description: string;
  bullets: string[];
  image: string; // path din /public (ex: "/oferte/oferta1.jpg")
};

export const offers: OfferItem[] = [
  {
    id: "oferta1",
    title: "Lumini Arhitecturale",
    description:
      "Pachet Lumini Arhitecturale de la 250EUR ",
    bullets: [
      "#33 Par LED",
      "Flat PAR RGBWA+UV",
      "18X18W",
      "20 buc",
    ],
    image: "/oferte/oferta1.jpg",
  },
  {
    id: "oferta2",
    title: "Oferta 2",
    description:
      "Pachet pentru conferințe/paneluri cu cerințe mai mari, management audio mai complex și posibilitate de extindere. Ideal când ai mai multe momente și vorbitori.",
    bullets: [
      "Sistem PA + headroom suplimentar",
      "Microfoane wireless (extensibil)",
      "Monitorizare scenă (opțional)",
      "Înregistrare / livestream (opțional)",
    ],
    image: "/oferte/oferta2.jpg",
  },
  {
    id: "oferta3",
    title: "Oferta 3",
    description:
      "Pachet orientativ pentru petreceri/nunți: sunet cu impact, plus atmosferă. Se poate adapta ușor pe ring, scenă, momente și program.",
    bullets: [
      "PA + subwoofer (în funcție de spațiu)",
      "Lumini ambient / efect (opțional)",
      "Setup ring + cablaj",
      "Operator (opțional)",
    ],
    image: "/oferte/oferta3.jpg",
  },
];
