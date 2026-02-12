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
    title: "Lumini Arhitecturale de la 300EUR",
    description:
      "Pachet Lumini Arhitecturale ",
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
    title: "Oferta Congres Corporate de la 1150EUR",
    description:
      "Instalatie de sonorizare completa , Ecran LED 3/2m , Lumini Teatru ",
    bullets: [
      "Sistem PA d&b Audiotechnik format din Y10P-2Buc , B6 Subwoofer-2Buc , D20Amp",
      "Microfoane wireless Audix 4-buc , Un head set DPA",
      "Monitorizare scenă d&b M4-2Buc",
      "Operator Sunet cu mixer digital Midas m32",
    ],
    image: "/oferte/oferta2.jpg",
  },
  {
    id: "oferta3",
    title: "WEDDING / PARTY de la 800EUR",
    description:
      "Pachet orientativ pentru petreceri/nunți: sunet cu impact, plus schela lumini. Se poate adapta ușor pe ring, scenă, momente și program.",
    bullets: [
      "PA d&b Audiotechnik : V10P-2buc , V-Sub-2buc , D80Amp",
      "Schela Lumini 4-6m, Sharpy Beam230-4buc, ZoomWash-4buc, FlashRGB 4-6buc",
      "DMX Control Avolites T1 cu laptop",
      "La cerere se poate modifica/adapta ",
    ],
    image: "/oferte/oferta3.jpg",
  },
];
