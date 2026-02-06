import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Servicii evenimente Iași | Sonorizare, lumini, DJ, LED, scenă – ANDYmedia",
  description:
    "Servicii complete pentru evenimente în Iași și Moldova: sonorizare profesională d&b audiotechnik, lumini, DJ, ecrane LED, scenă, operatori, transport, montaj, booking artiști. ANDYmedia – Andy Stoica.",
};

export default function Page() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-20 md:pt-24">
        {/* INTRO SEO */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-16">
          <h1 className="text-3xl md:text-4xl font-medium leading-tight">
            Servicii tehnice complete pentru evenimente
            <span className="text-amber-300">.</span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-4xl leading-relaxed">
            ANDYmedia oferă <strong>servicii profesionale pentru evenimente</strong>{" "}
            în <strong>Iași</strong>, <strong>Moldova</strong> și la nivel național:
            sonorizare, lumini, ecrane LED, scenă, DJ, operatori tehnici,
            transport, montaj, consultanță și booking artistic.
          </p>

          <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
            Proiect coordonat de <strong>Andy Stoica (Andi Stoica)</strong>,
            cunoscut și sub numele <strong>ANDYmusic</strong>, cu experiență
            practică în evenimente corporate, nunți, spectacole, conferințe
            și producții live.
          </p>
        </section>

        {/* SERVICII PRINCIPALE */}
        <section className="mx-auto max-w-6xl px-8 md:px-10 pb-20 space-y-20">
          {/* SONORIZARE */}
          <div>
            <h2 className="text-2xl font-medium">
              Sonorizare profesională evenimente
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Servicii de <strong>sonorizare profesională în Iași</strong> și
              în toată Moldova, folosind sisteme performante{" "}
              <strong>d&amp;b audiotechnik</strong>, precum și soluții de buget
              cu echipamente <strong>RCF</strong> și <strong>Dynacord</strong>.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Sonorizare nunți, botezuri, petreceri private</li>
              <li>Sonorizare evenimente corporate și conferințe</li>
              <li>Sonorizare spectacole, concerte și trupe live</li>
              <li>Operator mixaj audio / sunetist profesionist</li>
              <li>Calibrare și optimizare sunet (FOH & monitor)</li>
            </ul>
          </div>

          {/* LUMINI */}
          <div>
            <h2 className="text-2xl font-medium">
              Lumini scenice și lumini ambientale
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Oferim <strong>lumini profesionale pentru evenimente</strong>,
              de la spectacole și scene mari, până la
              <strong> lumini ambientale și arhitecturale pentru nunți</strong>.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Moving heads, wash, beam, spot</li>
              <li>Lumini ambientale pentru săli și locații</li>
              <li>Operator lumini dedicat</li>
              <li>Control DMX (fără sau cu timecode, la cerere)</li>
            </ul>
          </div>

          {/* LED */}
          <div>
            <h2 className="text-2xl font-medium">
              Ecrane LED și grafică vizuală
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Închiriere <strong>ecrane LED indoor și outdoor</strong>,
              împreună cu <strong>operator grafică vizuală</strong>
              (Resolume Arena), pentru prezentări, video live sau branding.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Ecrane LED modulare</li>
              <li>Operator grafică video</li>
              <li>Integrare camere video și surse HDMI</li>
            </ul>
          </div>

          {/* DJ */}
          <div>
            <h2 className="text-2xl font-medium">
              DJ evenimente & program artistic
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              <strong>DJ pentru nunți în Iași</strong>, petreceri private și
              evenimente corporate. Program artistic cu fonograme,
              adaptat publicului și tipului de eveniment.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>DJ nuntă Iași</li>
              <li>DJ evenimente corporate</li>
              <li>Program muzical personalizat</li>
            </ul>
          </div>

          {/* BOOKING */}
          <div>
            <h2 className="text-2xl font-medium">
              Booking artiști & impresariat artistic
            </h2>
            <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed">
              Oferim servicii de <strong>booking artiști, trupe live și muzicieni</strong>,
              inclusiv <strong>formații pentru nunți</strong> și evenimente private.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Formații nuntă Iași</li>
              <li>Trupe live și artiști muzicali</li>
              <li>Consultanță artistică și selecție lineup</li>
            </ul>
          </div>

          {/* SERVICII AUXILIARE */}
          <div>
            <h3 className="text-xl font-medium">
              Servicii auxiliare evenimente
            </h3>
            <ul className="mt-6 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Transport echipamente cu auto Mercedes Sprinter 3.5T</li>
              <li>Montaj și demontaj echipamente</li>
              <li>Personal tehnic specializat</li>
              <li>Consultanță organizare evenimente</li>
            </ul>
            <p className="mt-4 text-zinc-400 text-sm max-w-4xl">
              Serviciile sunt disponibile în Iași, București, Constanța,
              Bacău, Vaslui, Neamț, Suceava, Botoșani, Roman, Huși și alte orașe.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-10 border-t border-white/10">
            <h3 className="text-xl font-medium">
              Cauți servicii profesionale pentru evenimentul tău?
            </h3>
            <p className="mt-4 text-zinc-300 max-w-3xl">
              Contactează ANDYmedia și îți propunem o soluție tehnică adaptată
              exact nevoilor tale.
            </p>
            <div className="mt-6">
              <Link
                href="/cere-oferta"
                className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-black font-medium hover:bg-amber-300 transition"
              >
                Cere ofertă
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
