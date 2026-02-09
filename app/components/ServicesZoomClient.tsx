"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

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

function ZoomCard(props: {
  src: string;
  alt: string;
  title?: string;
  desc?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
      aria-label="Deschide imaginea"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {(props.title || props.desc) && (
        <div className="p-4">
          {props.title && <p className="text-zinc-200 font-medium">{props.title}</p>}
          {props.desc && (
            <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{props.desc}</p>
          )}
          <p className="mt-2 text-xs text-zinc-500">Click pentru zoom</p>
        </div>
      )}
    </button>
  );
}

export default function ServicesZoomClient(props: { serviceBlocks: ServiceBlock[] }) {
  // Lightbox SINGLE image (fără next/prev)
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string>("");
  const [activeAlt, setActiveAlt] = useState<string>("");

  const openSingle = (src: string, alt: string) => {
    setActiveSrc(src);
    setActiveAlt(alt);
    setOpen(true);
  };

  // Galerie: acum o facem "full" cu pozele pe care le ai în public/servicii
  const galleryItems = useMemo(
    () => [
      {
        src: "/servicii/smaart-rta.jpg",
        alt: "Smaart RTA – calibrare acustică (RTA/TF) pentru evenimente",
        title: "Calibrare (Smaart RTA)",
        desc: "Măsurători + room EQ ca să obții claritate și control pe feedback.",
      },
      {
        src: "/servicii/vst-server.jpg",
        alt: "Procesare audio avansată (server/rack) pentru live",
        title: "Procesare audio (live)",
        desc: "Procesare în timp real pentru un sunet “curat” și consistent.",
      },
      {
        src: "/servicii/digital-console.jpg",
        alt: "Mixer digital / consolă de mixaj pentru evenimente",
        title: "Mixer digital (control în timp real)",
        desc: "Ajustăm vocea, muzica și trupa în timp real, pe moment.",
      },
      {
        src: "/servicii/rig-lights.jpg",
        alt: "Schelă lumini / rig cu moving heads pentru evenimente",
        title: "Rig / schelă lumini (real)",
        desc: "Setup coerent + focus pe scenă, nu lumini “care fac ce vor”.",
      },
      {
        src: "/servicii/console-lights.jpg",
        alt: "Consolă lumini (DMX) pentru control profesionist",
        title: "Control lumini (DMX)",
        desc: "Lumini programate pe momente, cu operator dedicat.",
      },
      {
        src: "/servicii/capture-3d.jpg",
        alt: "Simulare lumini în Capture 3D pentru evenimente",
        title: "Simulare (Capture 3D) – la cerere",
        desc: "Previzualizare pentru evenimente complexe / show-uri.",
      },
      {
        src: "/servicii/led-wall.jpg",
        alt: "Ecran LED montat la eveniment (indoor/outdoor)",
        title: "Ecran LED montat corect",
        desc: "Poziționare + proporții pentru vizibilitate și impact.",
      },
      {
        src: "/servicii/led-resolume.jpg",
        alt: "Ecran LED + content live pentru evenimente",
        title: "LED + content live",
        desc: "Nu poză în loop: content adaptat momentului.",
      },
    ],
    []
  );

  return (
    <>
      <PhotoLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={activeSrc}
        alt={activeAlt}
      />

      {/* MAIN SERVICE BLOCKS */}
      <section className="mx-auto max-w-6xl px-8 md:px-10 pb-14 space-y-10">
        {props.serviceBlocks.map((s) => (
          <div
            key={s.id}
            id={s.id}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-medium">{s.title}</h2>
                <p className="mt-4 text-zinc-300 leading-relaxed max-w-3xl">
                  {s.subtitle}
                </p>

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
                    Cere ofertă
                  </Link>

                  <a
                    href="#vizual"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 transition"
                  >
                    Vezi exemple vizuale
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/30 p-6 md:p-8">
                <ZoomCard
                  src={s.image.src}
                  alt={s.image.alt}
                  title={s.image.title ?? "Click pentru zoom"}
                  desc={s.image.desc}
                  onClick={() => openSingle(s.image.src, s.image.alt)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section id="vizual" className="mx-auto max-w-6xl px-8 md:px-10 pb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium">
              Exemple vizuale (click pentru zoom)
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Ca să înțeleagă oricine diferența: proiectare, calibrare, control DMX și content live.
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
          {galleryItems.map((item) => (
            <ZoomCard
              key={item.src}
              src={item.src}
              alt={item.alt}
              title={item.title}
              desc={item.desc}
              onClick={() => openSingle(item.src, item.alt)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
