import type { Metadata } from "next";
import Link from "next/link";
import ServicesZoomClient from "../components/ServicesZoomClient";

export const metadata: Metadata = {
  title:
    "Servicii evenimente Iași | Sonorizare d&b, lumini, LED, DJ, scenă – ANDYmedia",
  description:
    "Servicii complete pentru evenimente în Iași și Moldova: sonorizare profesională (d&b audiotechnik), lumini control DMX, ecrane LED cu conținut live (Resolume), DJ, scenă, operatori, transport, montaj, consultanță și booking artiști. ANDYmedia – Andy Stoica (ANDYmusic).",
  alternates: { canonical: "/servicii" },
};

type ServiceBlock = {
  id: string;
  title: string;
  subtitle: string;
  whatClientThinks: string;
  whatUsuallyHappens: string[];
  whatWeDo: string[];
  keywordsLine: string;
  image: {
    src: string;
    alt: string;
    title?: string;
    desc?: string;
  };
};

const quickNav = [
  { href: "#sonorizare", label: "Sonorizare" },
  { href: "#mixaj", label: "Regie & Mixaj" },
  { href: "#lumini", label: "Lumini" },
  { href: "#led", label: "Ecrane LED" },
  { href: "#dj", label: "DJ" },
  { href: "#scena", label: "Scenă" },
  { href: "#booking", label: "Booking artiști" },
];

const serviceBlocks: ServiceBlock[] = [
  {
    id: "sonorizare",
    title: "Sonorizare profesională evenimente (Iași / Moldova)",
    subtitle:
      "Nu „punem boxe”. Proiectăm un sistem PA potrivit locației, îl montăm corect și îl calibrăm ca să sune curat, uniform și fără microfonii.",
    whatClientThinks:
      "„Vreau și eu niște boxe și niște microfoane… și să nu fie scumpe.”",
    whatUsuallyHappens: [
      "O „pădure de boxe” amplasate la întâmplare (tare în față, gol în spate).",
      "Sunet agresiv, distorsiuni la volum, microfonii la discursuri.",
      "Fără calibrare reală: doar „mai încet / mai tare”.",
    ],
    whatWeDo: [
      "Alegem sistemul potrivit locației (inclusiv soluții premium: d&b audiotechnik) și dimensionăm corect.",
      "Montaj corect: acoperire uniformă, aliniere și optimizare FOH & monitor.",
      "Calibrare acustică: Smaart RTA, room EQ, măsurători și reglaje pentru claritate + control pe feedback.",
    ],
    keywordsLine:
      "Căutări frecvente: sonorizare Iași, sistem PA, d&b audiotechnik, sunetist Iași.",
    image: {
      src: "/servicii/pa-db.jpg",
      alt: "Proiectare sistem PA (d&b) – simulare / optimizare acoperire",
      title: "Proiectare & dimensionare PA",
      desc: "Click pentru zoom.",
    },
  },
  {
    id: "mixaj",
    title: "Regie & Mixaj: de ce unele evenimente sună „ca pe CD”",
    subtitle:
      "Diferența majoră nu e doar echipamentul, ci controlul: mixaj în timp real + procesare serioasă, aplicată în live.",
    whatClientThinks: "„Dacă e mixer, se aude bine, nu?”",
    whatUsuallyHappens: [
      "Mixaj minimal: voce prea tare / muzică prea tare / instrumente neclare.",
      "Sunet obositor, fără definire și consistență.",
      "Procesare puțină sau haotică.",
    ],
    whatWeDo: [
      "Mixer digital + operator dedicat: ajustări în timp real, pe scenă și în sală.",
      "Procesare avansată pentru live (workflow tip studio, aplicat controlat).",
      "Stabilitate și routing profesionist (unde e nevoie).",
    ],
    keywordsLine:
      "Căutări frecvente: mixaj live Iași, regie audio, procesare VST multicanal.",
    image: {
      src: "/servicii/mixer-digital.jpg",
      alt: "Mixer digital pentru mixaj live la evenimente",
      title: "Mixer digital (mixaj live)",
      desc: "Click pentru zoom.",
    },
  },
  {
    id: "lumini",
    title: "Lumini scenice & ambientale (controlate, nu haos)",
    subtitle:
      "Lumina bună nu e despre „aparate multe”. E despre design + control: momente, tranziții, atmosferă.",
    whatClientThinks: "„Niște lumini… orice, să fie.”",
    whatUsuallyHappens: [
      "Aparate pe schelă care fac ce „vor” toată noaptea.",
      "Fără accent pe momente (intrare, toast, show).",
      "Aspect neuniform și obositor.",
    ],
    whatWeDo: [
      "Design adaptat locației + programului artistic (scenă vs ambient).",
      "Control DMX profesional (consolă + operator dedicat).",
      "La evenimente complexe: programare avansată și, la cerere, simulări 3D.",
    ],
    keywordsLine:
      "Căutări frecvente: schelă lumini, lumini ambientale, MA Lighting, Avolites.",
    image: {
      src: "/servicii/console-lights.jpg",
      alt: "Consolă lumini pentru control DMX la evenimente",
      title: "Control lumini (DMX)",
      desc: "Click pentru zoom.",
    },
  },
  {
    id: "led",
    title: "Ecrane LED & grafică vizuală (content live)",
    subtitle:
      "Un LED bun nu rulează o poză în loop. Devine parte din show: branding, intro-uri, feed live, conținut adaptat în timp real.",
    whatClientThinks: "„Un ecran LED de X/Y metri.”",
    whatUsuallyHappens: [
      "Ecran pus „unde încape” — vizibilitate slabă, proporții urâte.",
      "Rulează aceeași poză/video, fără legătură cu momentul.",
      "Fără operator: nu se adaptează nimic la ce se întâmplă.",
    ],
    whatWeDo: [
      "Montaj și dimensionare pentru aspect & vizibilitate (indoor/outdoor).",
      "Operator video + grafică în timp real (Resolume Arena).",
      "Integrare HDMI/camere/live feed, branding și scenografie vizuală coerentă.",
    ],
    keywordsLine:
      "Căutări frecvente: ecrane LED Iași, LED indoor/outdoor, Resolume Arena.",
    image: {
      src: "/servicii/led-resolume.jpg",
      alt: "Ecran LED cu control de conținut în timp real",
      title: "LED + content live",
      desc: "Click pentru zoom.",
    },
  },
];

const citiesLine =
  "Serviciile sunt disponibile în Iași și la nivel regional/national: Bacău, Vaslui, Neamț, Suceava, Botoșani, Roman, Huși, București, Constanța și alte orașe.";

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-14 md:py-16">
          <h1 className="text-3xl md:text-5xl font-medium leading-tight">
            Servicii tehnice complete pentru evenimente în Iași și Moldova
            <span className="text-amber-300">.</span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-4xl leading-relaxed">
            ANDYmedia oferă servicii profesionale pentru evenimente:{" "}
            <strong>sonorizare</strong>, <strong>lumini</strong>,{" "}
            <strong>ecrane LED</strong>, <strong>scenă</strong>, <strong>DJ</strong>,
            operatori tehnici, transport, montaj, consultanță și{" "}
            <strong>booking artistic</strong>.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {quickNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/cere-oferta"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
            >
              Cere ofertă
            </Link>
          </div>
        </section>

        <ServicesZoomClient serviceBlocks={serviceBlocks} />

        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-medium">
              Logistică & echipă tehnică
            </h3>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Transport echipamente (auto 3.5T), montaj și demontaj</li>
              <li>Personal tehnic specializat (audio, lumini, LED, scenă)</li>
              <li>Planificare, cablare, siguranță, coordonare pe eveniment</li>
              <li>Consultanță pentru alegerea soluției potrivite</li>
            </ul>
            <p className="mt-4 text-zinc-400 text-sm max-w-4xl">{citiesLine}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
