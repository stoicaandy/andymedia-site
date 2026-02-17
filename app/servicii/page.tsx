import type { Metadata } from "next";
import Link from "next/link";
import ServicesZoomClient from "../components/ServicesZoomClient";
import ZoomSingleCard from "../components/ZoomSingleCard";

export const metadata: Metadata = {
  title:
    "Servicii evenimente Iași | Sonorizare d&b, concerte, lumini, LED, DJ, scenă – ANDYmedia",
  description:
    "Servicii complete pentru evenimente în Iași și Moldova: sonorizare profesională (d&b audiotechnik), măsurători acustice (Smaart/REW), conferințe corporate, concerte și spectacole, lumini control DMX, ecrane LED cu conținut live (Resolume), DJ adaptat publicului, scenă, operatori, transport, montaj, consultanță și booking artiști. ANDYmedia – Andy Stoica (ANDYmusic).",
  alternates: { canonical: "/servicii" },
  openGraph: {
    title:
      "Servicii evenimente Iași | Sonorizare d&b, concerte, lumini, LED, DJ, scenă – ANDYmedia",
    description:
      "Sunet calibrat (Smaart/REW), mixaj controlat, lumini programate (DMX) și ecrane LED cu content live (Resolume). Conferințe corporate + concerte/spectacole + DJ adaptat publicului + scenă dimensionată corect.",
    url: "/servicii",
    type: "website",
  },
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
  { href: "#conferinte", label: "Conferințe" },
  { href: "#concerte", label: "Concerte / Spectacole" },
  { href: "#mixaj", label: "Regie & Mixaj" },
  { href: "#lumini", label: "Lumini" },
  { href: "#led", label: "Ecrane LED" },
  { href: "#dj", label: "DJ" },
  { href: "#scena", label: "Scenă" },
  { href: "#booking", label: "Booking artiști" },
  { href: "#logistica", label: "Logistică" },
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
      "Măsurători acustice reale cu microfon de măsură (Isemcon / UMIK-1) + Smaart / REW / Open Sound Meter: aliniere, room EQ și control pe feedback.",
    ],
    keywordsLine:
      "Căutări frecvente: sonorizare Iași, sistem PA, d&b audiotechnik, sunetist Iași, măsurători acustice.",
    image: {
      src: "/servicii/pa-db.jpg",
      alt: "Proiectare sistem PA (d&b) – simulare / optimizare acoperire",
      title: "Proiectare & dimensionare PA",
      desc: "Simulare / planificare corectă înainte de montaj.",
    },
  },

  {
    id: "conferinte",
    title: "Conferințe, corporate & evenimente business (panel / prezentări / Q&A)",
    subtitle:
      "La corporate nu ai voie să „ghicești”: speech clar, volum uniform, microfonie zero și control pe momente (intro, panel, Q&A).",
    whatClientThinks:
      "„Avem o conferință: câteva microfoane și un sistem… să se audă.”",
    whatUsuallyHappens: [
      "Voce neclară, volum inegal în sală, microfonii la întrebări.",
      "Predare microfon haotic, Q&A fără control, întârzieri și stres.",
      "Fără operator dedicat pe speech și fără proceduri pe panel.",
    ],
    whatWeDo: [
      "Setup dedicat pentru speech: tipul de microfon potrivit (handheld / lavalieră / headset), poziționare și gain-structure corecte.",
      "Operator audio pentru conferință: control în timp real pe vorbitori, panel și Q&A.",
      "Integrare cu prezentări (HDMI), LED / proiecție, muzică intro/outro și înregistrare/livestream la cerere.",
    ],
    keywordsLine:
      "Căutări frecvente: sonorizare conferință Iași, microfoane conferință, panel, evenimente corporate.",
    image: {
      src: "/servicii/conferinta-congres.jpg",
      alt: "Conferință / congres: setup audio pentru speech și prezentări",
      title: "Corporate & conferințe",
      desc: "Speech clar, control pe Q&A și momente.",
    },
  },

  {
    id: "concerte",
    title: "Concerte / spectacole / trupe live – producție tehnică completă",
    subtitle:
      "La show-uri nu e despre „tare”. E despre impact și control: PA dimensionat corect, mixaj coerent, monitoare ok și un setup care ține tot evenimentul.",
    whatClientThinks:
      "„Avem o trupă / un spectacol… puneți voi un sistem și merge.”",
    whatUsuallyHappens: [
      "PA subdimensionat sau montat greșit: goluri în sală, bubuială în față.",
      "Soundcheck scurt / improvizat, monitoare slabe, feedback și stres pe scenă.",
      "Fără plan tehnic: intrări, patch, routing, comunicare scenă–FOH.",
    ],
    whatWeDo: [
      "Planificare tehnică: input list / stage plot, patching, timpi de soundcheck, FOH & monitor.",
      "Sistem PA dimensionat și aliniat pentru public + scenă (uniform, clar, headroom).",
      "Operatori dedicați + disciplină de show: control pe momente, schimbări, guest-uri, prezentatori.",
    ],
    keywordsLine:
      "Căutări frecvente: sonorizare concert Iași, spectacole Iași, trupă live, festival, sistem PA d&b.",
    image: {
      src: "/servicii/concert2.jpg",
      alt: "Concert / spectacol: producție tehnică completă (sunet, scenă, lumini)",
      title: "Concerte & spectacole",
      desc: "Show controlat: sunet, scenă și momente.",
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
      desc: "Control în timp real pe vocale, muzică și trupă.",
    },
  },

  {
    id: "lumini",
    title: "Lumini scenice & ambientale (controlate)",
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
      desc: "Lumini programate pe momente, nu random.",
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
      desc: "Content adaptat momentului, nu loop static.",
    },
  },
];

const citiesLine =
  "Serviciile sunt disponibile în Iași și la nivel regional/national: Bacău, Vaslui, Neamț, Suceava, Botoșani, Roman, Huși, București, Constanța și alte orașe.";

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        {/* INTRO */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-14 md:py-16">
          <h1 className="text-3xl md:text-5xl font-medium leading-tight">
            Servicii tehnice complete pentru evenimente în Iași și Moldova
            <span className="text-amber-300">.</span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-4xl leading-relaxed">
            ANDYmedia oferă servicii profesionale pentru evenimente:{" "}
            <strong>sonorizare</strong>, <strong>conferințe</strong>,{" "}
            <strong>concerte / spectacole</strong>, <strong>lumini</strong>,{" "}
            <strong>ecrane LED</strong>, <strong>scenă</strong>, <strong>DJ</strong>,
            operatori tehnici, transport, montaj, consultanță și{" "}
            <strong>booking artistic</strong>.
          </p>

          <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
            Proiect coordonat de <strong>Andy Stoica (Andi Stoica)</strong>, cunoscut și
            ca <strong>ANDYmusic</strong>. Diferența e simplă: la noi nu „închiriezi
            niște aparate”. Primești un rezultat controlat: <strong>sunet calibrat</strong>,
            <strong> lumini programate</strong> și <strong>vizualuri sincronizate</strong>.
          </p>

          {/* QUICK NAV */}
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

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/cere-oferta"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
            >
              Cere ofertă
            </Link>

            <Link
              href="/echipamente"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
            >
              Vezi echipamentele
            </Link>

            <Link
              href="/parteneri"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
            >
              Parteneri (DJ & artiști)
            </Link>

            <Link
              href="/portofoliu"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
            >
              Vezi portofoliu
            </Link>
          </div>
        </section>

        {/* BLOCURI (cu imagini + zoom) */}
        <ServicesZoomClient serviceBlocks={serviceBlocks} />

        {/* DJ / SCENA / BOOKING */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-16 space-y-10">
          {/* DJ */}
          <div id="dj" className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl md:text-3xl font-medium">
                  DJ evenimente – adaptat cerințelor reale și publicului țintă
                </h2>

                <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
                  Un DJ bun nu înseamnă “muzică tare” sau “playlist la întâmplare”.
                  Înseamnă <strong>muzică adaptată publicului majoritar</strong> de la
                  eveniment și momentelor reale (intrare, dinner, party, after).
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-zinc-400">De ce e important:</p>
                    <ul className="mt-3 space-y-2 text-zinc-200 list-disc list-inside">
                      <li>Public diferit = atmosferă diferită (vârstă, stil, energie)</li>
                      <li>Flow pe momente (nu “piese bune”, ci piese potrivite)</li>
                      <li>Intervenție în timp real: citirea sălii și ajustare</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-5">
                    <p className="text-sm text-amber-200">Ce facem noi:</p>
                    <ul className="mt-3 space-y-2 text-zinc-100 list-disc list-inside">
                      <li>Recomandăm DJ-ul potrivit, în funcție de publicul real</li>
                      <li>Aliniem cerințele muzicale cu atmosfera dorită</li>
                      <li>Integrare tehnică completă: sunet, lumini și LED</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/parteneri"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
                  >
                    Vezi parteneri DJ
                  </Link>

                  <Link
                    href="/cere-oferta"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
                  >
                    Cere recomandare DJ
                  </Link>

                  <Link
                    href="/echipamente"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
                  >
                    Vezi echipamentele
                  </Link>
                </div>

                <p className="mt-4 text-sm text-zinc-400">
                  Căutări frecvente: DJ nuntă Iași, DJ evenimente corporate, DJ petrecere Iași.
                </p>
              </div>

              <div className="lg:col-span-5">
                <ZoomSingleCard
                  src="/servicii/dj-pioneer.jpg"
                  alt="Pupitru DJ Pioneer – setup DJ pentru evenimente"
                  label="Setup DJ (Pioneer)"
                  hint="Detalii setup + control pe tranziții și energie."
                />
              </div>
            </div>
          </div>

          {/* SCENA */}
          <div id="scena" className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl md:text-3xl font-medium">
                  Scenă, podium, rigging & schelă lumini – dimensionate corect
                </h2>

                <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
                  Scena nu e “o bucată de podium”. E o decizie tehnică: trebuie să fie
                  <strong> adaptată locației</strong>, <strong>numărului de persoane</strong>,
                  tipului de eveniment și cerințelor artistice (trupă, DJ, conferință).
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-zinc-400">De ce contează:</p>
                    <ul className="mt-3 space-y-2 text-zinc-200 list-disc list-inside">
                      <li>Vizibilitate pentru public (sală / outdoor)</li>
                      <li>Siguranță (structură, încărcare, cablare, acces)</li>
                      <li>Dimensiune corectă pentru artiști & echipamente</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-5">
                    <p className="text-sm text-amber-200">Ce facem noi:</p>
                    <ul className="mt-3 space-y-2 text-zinc-100 list-disc list-inside">
                      <li>Recomandăm dimensiunea scenei în funcție de locație și setup</li>
                      <li>Montaj/demontaj + plan de cablare și organizare backstage</li>
                      <li>Integrare cu lumini/LED/sunet pentru un aspect “pro”</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/echipamente"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
                  >
                    Vezi echipamentele
                  </Link>

                  <Link
                    href="/cere-oferta"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
                  >
                    Cere ofertă scenă
                  </Link>
                </div>

                <p className="mt-4 text-sm text-zinc-400">
                  Căutări frecvente: scenă Iași, podium scenă, schelă lumini.
                </p>
              </div>

              <div className="lg:col-span-5">
                <ZoomSingleCard
                  src="/servicii/scena-1.jpg"
                  alt="Scenă / podium scenă pentru evenimente"
                  label="Scenă modulară (exemplu real)"
                  hint="Dimensiune și poziționare adaptate locației și publicului."
                />
              </div>
            </div>
          </div>

          {/* BOOKING */}
          <div id="booking" className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium">
              Booking artiști & impresariat – recomandări prin parteneri
            </h2>

            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              La booking contează două lucruri: <strong>artistul potrivit</strong> și
              <strong> coordonarea tehnică</strong> (input list, backline, soundcheck, logistică).
              Aici lucrăm în zona de <strong>parteneri</strong>, iar pagina va fi extinsă
              pe măsură ce publicăm lineup-uri și colaborări.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-zinc-400">Ce primești:</p>
                <ul className="mt-3 space-y-2 text-zinc-200 list-disc list-inside">
                  <li>Recomandare artist / trupă potrivită evenimentului și bugetului</li>
                  <li>Coordonare tehnică pentru un show fără improvizații</li>
                  <li>Planificare: timpi, soundcheck, necesar tehnic</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-5">
                <p className="text-sm text-amber-200">Dezvoltare în “Parteneri”:</p>
                <ul className="mt-3 space-y-2 text-zinc-100 list-disc list-inside">
                  <li>DJ recomandați (pe stiluri / tip eveniment)</li>
                  <li>Artiști & trupe live (nunți / corporate / show-uri)</li>
                  <li>Recomandări + exemple reale (cu portofoliu)</li>
                </ul>
              </div>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/parteneri"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
              >
                Vezi parteneri (DJ & artiști)
              </Link>

              <Link
                href="/cere-oferta"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
              >
                Cere recomandare booking
              </Link>

              <Link
                href="/echipamente"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
              >
                Vezi echipamentele
              </Link>
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              Căutări frecvente: formații nuntă Iași, trupe live nuntă, booking artiști.
            </p>
          </div>

          {/* LOGISTICA */}
          <div id="logistica" className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium">Logistică & echipă tehnică</h2>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Transport echipamente (auto 3.5T), montaj și demontaj</li>
              <li>Personal tehnic specializat (audio, lumini, LED, scenă)</li>
              <li>Planificare, cablare, siguranță, coordonare pe eveniment</li>
              <li>Consultanță pentru alegerea soluției potrivite</li>
            </ul>
            <p className="mt-4 text-zinc-400 text-sm max-w-4xl">{citiesLine}</p>
          </div>

          {/* CTA final */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium">
              Ai o conferință / eveniment corporate sau un spectacol?
            </h2>
            <p className="mt-4 text-zinc-300 max-w-3xl leading-relaxed">
              Îți propunem un setup dedicat (speech / show) cu operatori și integrare completă:
              sunet, lumini, LED și scenă — dimensionate corect.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/cere-oferta"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
              >
                Cere ofertă
              </Link>
              <Link
                href="/echipamente"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
              >
                Vezi echipamentele
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
