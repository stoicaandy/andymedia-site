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
    title: "Oferta 1",
    description:
      "Pachet orientativ, gândit pentru evenimente corporate și prezentări, cu setup curat și eficient. Configurația se adaptează în funcție de spațiu și numărul de participanți.",
    bullets: [
      "Sistem PA complet (sală mică/medie)",
      "2 microfoane wireless",
      "Mixer + procesare audio",
      "Cablaj & accesorii necesare",
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
