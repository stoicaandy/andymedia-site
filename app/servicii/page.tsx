import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Servicii evenimente Iași | Sonorizare d&b, lumini, LED, DJ, scenă – ANDYmedia",
  description:
    "Servicii complete pentru evenimente în Iași și Moldova: sonorizare profesională (d&b audiotechnik), lumini control DMX (MA/Avolites), ecrane LED cu conținut live (Resolume), DJ, scenă, operatori, transport, montaj, consultanță și booking artiști. ANDYmedia – Andy Stoica (ANDYmusic).",
  alternates: {
    canonical: "/servicii",
  },
  openGraph: {
    title:
      "Servicii evenimente Iași | Sonorizare d&b, lumini, LED, DJ, scenă – ANDYmedia",
    description:
      "Sunet calibrat (Smaart), mixaj ca în studio (VST multicanal), lumini programate (MA/Avolites), ecrane LED cu content live (Resolume). ANDYmedia – Iași & Moldova.",
    url: "/servicii",
    type: "website",
  },
};

type Feature = {
  title: string;
  bullets: string[];
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
    label: string;
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
      "Fără calibrare reală: doar „mai încet / mai tare” și atât.",
    ],
    whatWeDo: [
      "Alegem sistemul potrivit locației (inclusiv soluții premium: d&b audiotechnik) și dimensionăm corect puterea/numărul de puncte.",
      "Montaj corect: acoperire uniformă, aliniere și optimizare FOH & monitor.",
      "Calibrare acustică: Smaart RTA, room EQ, măsurători și reglaje pentru claritate + control pe feedback.",
    ],
    keywordsLine:
      "Căutări frecvente: sonorizare Iași, sistem PA, d&b audiotechnik, sunetist Iași.",
    image: {
      src: "/servicii/pa-db.jpg",
      alt: "Sistem PA pentru evenimente (ex. d&b audiotechnik) montat profesional",
      label: "Imagine impact: sistem PA montat corect",
    },
  },
  {
    id: "mixaj",
    title: "Regie & Mixaj: de ce unele evenimente sună „ca pe CD”",
    subtitle:
      "Diferența majoră nu e doar echipamentul, ci controlul: mixaj în timp real + procesare serioasă, ca în studio, aplicată în live.",
    whatClientThinks: "„Dacă e mixer, se aude bine, nu?”",
    whatUsuallyHappens: [
      "Mixaj minimal: voce prea tare / muzică prea tare / instrumente neclare.",
      "Sunet „obosit”, fără dinamică, fără definire, fără consistență.",
      "Procesare puțină sau haotică: totul pare că „țipă” sau e „înfundat”.",
    ],
    whatWeDo: [
      "Mixer digital + operator dedicat: ajustări în timp real, pe scenă și în sală.",
      "Procesare avansată multicanal (VST3) pentru live — concept apropiat de workflow-ul de studio (dinamică/EQ/efecte controlate).",
      "Routing și integrare profesionistă (ex. Dante) pentru stabilitate și control.",
    ],
    keywordsLine:
      "Căutări frecvente: mixaj live Iași, regie audio, procesare VST multicanal, Dante.",
    image: {
      src: "/servicii/mixer-digital.jpg",
      alt: "Mixer digital pentru mixaj live la evenimente",
      label: "Imagine impact: mixer digital (close-up)",
    },
  },
  {
    id: "lumini",
    title: "Lumini scenice & lumini ambientale (DMX controlat, nu haos)",
    subtitle:
      "Lumina bună nu e despre „aparate multe”. E despre design + programare: momente, tranziții, atmosferă, accent pe scenă și pe emoție.",
    whatClientThinks: "„Niște lumini… orice, să fie.”",
    whatUsuallyHappens: [
      "Aparate pe schelă care fac ce „vor” toată noaptea, fără logică.",
      "Fără accent pe momente (intrare, dans, toast, show live).",
      "Aspect neuniform: zone arse, zone întunecate, culori neplăcute.",
    ],
    whatWeDo: [
      "Design adaptat locației + programului artistic (scenă vs ambient).",
      "Control DMX profesional: Avolites sau MA Lighting (în funcție de setup).",
      "Pentru evenimente complexe: programare avansată + simulări 3D (Capture) la cerere.",
    ],
    keywordsLine:
      "Căutări frecvente: schelă lumini, lumini ambientale, MA Lighting, Avolites, fum greu.",
    image: {
      src: "/servicii/console-lights.jpg",
      alt: "Consolă de lumini (MA Lighting / Avolites) pentru control DMX",
      label: "Imagine impact: consolă lumini (UI/foarte clar)",
    },
  },
  {
    id: "led",
    title: "Ecrane LED & grafică vizuală (content live, sincronizat cu momentul)",
    subtitle:
      "Un LED bun nu rulează o poză în loop. Devine parte din show: branding, intro-uri, feed live, conținut adaptat în timp real.",
    whatClientThinks: "„Un ecran LED de X/Y metri.”",
    whatUsuallyHappens: [
      "Un ecran pus „unde încape” — vizibilitate slabă, proporții urâte.",
      "Rulează aceeași poză / același video, fără legătură cu evenimentul.",
      "Fără operator: nu se adaptează nimic la momentele din sală.",
    ],
    whatWeDo: [
      "Montaj și dimensionare pentru aspect & vizibilitate (indoor/outdoor).",
      "Operator video + grafică în Resolume Arena: content în timp real, adaptat momentului.",
      "Integrare HDMI/camere/live feed, branding și scenografie vizuală coerentă.",
    ],
    keywordsLine:
      "Căutări frecvente: ecrane LED Iași, LED indoor/outdoor, Resolume Arena, operator video.",
    image: {
      src: "/servicii/led-resolume.jpg",
      alt: "Ecran LED cu control de conținut în Resolume Arena",
      label: "Imagine impact: LED + screenshot Resolume",
    },
  },
];

const extraServices: Feature[] = [
  {
    title: "DJ evenimente & program artistic",
    bullets: [
      "DJ nuntă Iași, petreceri private și evenimente corporate",
      "Program muzical adaptat publicului (flow, momente, energie)",
      "Integrare tehnică completă cu sunet, lumini și LED",
    ],
  },
  {
    title: "Scenă, podium, rigging",
    bullets: [
      "Scenă Iași, podium scenă, schelă lumini",
      "Montaj/demontaj, siguranță, cablare și organizare backstage",
      "Soluții pentru indoor/outdoor, adaptate locației",
    ],
  },
  {
    title: "Booking artiști & impresariat artistic",
    bullets: [
      "Formații nuntă Iași, trupe live, artiști și muzicieni",
      "Consultanță lineup + potrivirea cu bugetul și tipul evenimentului",
      "Coordonare tehnică pentru show fără improvizații",
    ],
  },
];

const citiesLine =
  "Serviciile sunt disponibile în Iași și la nivel regional/national: Bacău, Vaslui, Neamț, Suceava, Botoșani, Roman, Huși, București, Constanța și alte orașe.";

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        {/* HERO / INTRO */}
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

          <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
            Proiect coordonat de <strong>Andy Stoica (Andi Stoica)</strong>,
            cunoscut și ca <strong>ANDYmusic</strong>. Diferența e simplă: la noi
            nu „închiriezi niște aparate”. Primești un rezultat controlat:{" "}
            <strong>sunet calibrat</strong>, <strong>lumini programate</strong> și{" "}
            <strong>vizualuri sincronizate</strong>.
          </p>

          {/* Quick nav */}
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
            <a
              href="#diferenta"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
            >
              Vezi diferența (pe scurt)
            </a>
          </div>
        </section>

        {/* THE HOOK SECTION */}
        <section
          id="diferenta"
          className="mx-auto max-w-6xl px-8 md:px-10 pb-10"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium leading-tight">
              Ce crezi că închiriezi
              <span className="text-amber-300">?</span>
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Mulți clienți caută pe Google „sonorizare Iași”, „scenă Iași”,
              „ecran LED”, „DJ nuntă Iași” și cer „niște boxe / niște lumini”.
              Problema e că două oferte pot arăta similar pe hârtie, dar rezultatul
              în sală poate fi complet diferit.
            </p>
            <p className="mt-3 text-zinc-300 max-w-4xl leading-relaxed">
              Mai jos vezi, foarte clar, diferența dintre „închiriere” și
              „producție tehnică” — explicată pe limba oricui.
            </p>
          </div>
        </section>

        {/* MAIN SERVICE BLOCKS */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-14 space-y-10">
          {serviceBlocks.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Text */}
                <div className="lg:col-span-7 p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-medium">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-zinc-300 leading-relaxed max-w-3xl">
                    {s.subtitle}
                  </p>

                  {/* Two columns: Myth vs Reality */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-zinc-400">Ce crede clientul:</p>
                      <p className="mt-2 text-zinc-200 leading-relaxed">
                        {s.whatClientThinks}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-zinc-400">
                        Cu ce te poți alege (de obicei):
                      </p>
                      <ul className="mt-3 space-y-2 text-zinc-200 list-disc list-inside">
                        {s.whatUsuallyHappens.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-amber-300/30 bg-amber-300/10 p-5">
                    <p className="text-sm text-amber-200">
                      Ce facem noi (ANDYmedia):
                    </p>
                    <ul className="mt-3 space-y-2 text-zinc-100 list-disc list-inside">
                      {s.whatWeDo.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-5 text-sm text-zinc-400">{s.keywordsLine}</p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/cere-oferta"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-black font-medium hover:bg-amber-300 transition"
                    >
                      Cere ofertă pentru {s.id === "mixaj" ? "mixaj" : s.id}
                    </Link>

                    <a
                      href="#vizual"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 transition"
                    >
                      Vezi exemple vizuale
                    </a>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/30 p-6 md:p-8">
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    {/* Înlocuiește cu <Image /> dacă folosești next/image și ai domenii/config */}
                    <div className="aspect-[16/10] w-full bg-black/30 flex items-center justify-center text-center p-6">
                      <div>
                        <p className="text-zinc-200 font-medium">
                          {s.image.label}
                        </p>
                        <p className="mt-2 text-sm text-zinc-400">
                          Pune aici: <code className="text-zinc-300">{s.image.src}</code>
                        </p>
                        <p className="mt-2 text-xs text-zinc-500">
                          ALT: {s.image.alt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* “Curiosity” hint text */}
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      <span className="text-amber-200">Tip:</span> imaginea de aici
                      trebuie să-l facă pe client să zică: „Ok… și asta ce e?” —
                      apoi citește și înțelege diferența.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* VISUAL PROOF / GALLERY */}
        <section id="vizual" className="mx-auto max-w-6xl px-8 md:px-10 pb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium">
                Exemple vizuale (ca să înțelegi dintr-o privire)
              </h2>
              <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
                Aici nu punem “poze frumoase” doar de decor. Fiecare imagine
                explică o piesă din diferență: calibrare, mixaj, control DMX,
                content live pe LED.
              </p>
            </div>
            <Link
              href="/cere-oferta"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
            >
              Cere ofertă
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                src: "/servicii/smaart-rta.jpg",
                title: "Calibrare Smaart RTA",
                desc: "Aici se vede cum „egalizăm sala” ca să sune curat și fără feedback.",
              },
              {
                src: "/servicii/vst-server.jpg",
                title: "Procesare VST multicanal (live)",
                desc: "„Ca în studio”, dar în timp real, pentru claritate și consistență.",
              },
              {
                src: "/servicii/digital-console.jpg",
                title: "Mixer digital / control mix",
                desc: "Regie și mixaj în timp real: voce, muzică, trupe, conferințe.",
              },
              {
                src: "/servicii/ma-avolites-ui.jpg",
                title: "Control lumini (MA / Avolites)",
                desc: "Lumini programate pe momente, nu aleatoriu.",
              },
              {
                src: "/servicii/capture-3d.jpg",
                title: "Simulare Capture 3D (la cerere)",
                desc: "Previzualizare pentru evenimente complexe și show-uri.",
              },
              {
                src: "/servicii/led-wall.jpg",
                title: "Ecran LED montat corect",
                desc: "Dimensiune + poziționare pentru vizibilitate și aspect profesional.",
              },
              {
                src: "/servicii/resolume-arena.jpg",
                title: "Resolume Arena (content live)",
                desc: "Grafică adaptată momentului: branding, intro, live, aftermovie.",
              },
              {
                src: "/servicii/rig-lights.jpg",
                title: "Schelă lumini / rig",
                desc: "Setup coerent, cablare ordonată, focus pe scenă și atmosferă.",
              },
            ].map((item) => (
              <div
                key={item.src}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="aspect-[16/10] bg-black/30 flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-zinc-200 font-medium">{item.title}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      Pune aici: <code className="text-zinc-300">{item.src}</code>
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA SERVICES */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-16 space-y-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium">
              Servicii complementare
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Pentru un eveniment complet: DJ, scenă/podium, schelă lumini,
              operatori, logistică și booking artistic — toate coordonate unitar.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraServices.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-black/20 p-6"
                >
                  <h3
                    className="text-lg font-medium"
                    id={
                      f.title.includes("DJ")
                        ? "dj"
                        : f.title.includes("Scenă")
                        ? "scena"
                        : "booking"
                    }
                  >
                    {f.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-zinc-300 list-disc list-inside">
                    {f.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="text-amber-200">SEO (natural):</span> DJ nuntă Iași,
                formații nuntă Iași, trupa live nuntă, scenă Iași, podium scenă,
                schelă lumini, lumini ambientale, fum greu, ecrane LED, sistem PA,
                d&b audiotechnik, ANDY Stoica, ANDYmusic.
              </p>
            </div>
          </div>

          {/* Logistics / Auxiliary */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-medium">
              Logistică & echipă tehnică
            </h3>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Transport echipamente (auto 3.5T), montaj și demontaj</li>
              <li>Personal tehnic specializat (audio, lumini, LED, scenă)</li>
              <li>Planificare, cablare, siguranță, coordonare pe eveniment</li>
              <li>Consultanță pentru alegerea soluției potrivite (nu „overkill”, nu „subdimensionat”)</li>
            </ul>
            <p className="mt-4 text-zinc-400 text-sm max-w-4xl">{citiesLine}</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-20">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-medium">
              Cauți servicii profesionale pentru evenimentul tău?
            </h2>
            <p className="mt-4 text-zinc-300 max-w-3xl leading-relaxed">
              Spune-ne locația, numărul de persoane și tipul evenimentului, iar noi
              îți propunem o soluție tehnică potrivită (sunet, lumini, LED, scenă)
              — dimensionată corect și gândită pentru rezultat.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/cere-oferta"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
              >
                Cere ofertă
              </Link>
              <a
                href="#diferenta"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-zinc-200 hover:bg-white/10 transition"
              >
                Înapoi la diferență
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
