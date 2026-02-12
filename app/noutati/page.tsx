import Link from "next/link";
import { NEWS } from "@/app/data/news";

export const metadata = {
  title: "Noutăți",
  description: "Noutăți ANDYmedia: proiecte, echipamente noi, materiale media și update-uri.",
};

export default function NoutatiPage() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 pt-24 md:pt-28">
        <section className="mx-auto max-w-6xl px-8 md:px-10 py-12">
          <h1 className="text-2xl md:text-3xl font-medium tracking-wide">
            Noutăți <span className="text-amber-300">.</span>
          </h1>

          <p className="mt-2 text-zinc-300/85 max-w-2xl">
            Fiecare noutate are pagină proprie cu OG pentru Facebook.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((x) => (
              <Link
                key={x.id}
                href={`/noutati/${x.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-amber-300/40 transition"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
                  {x.date}
                </div>
                <div className="mt-2 text-lg font-medium text-white/95">{x.title}</div>
                <div className="mt-2 text-sm text-zinc-300/85">{x.description}</div>
                <div className="mt-4 text-sm text-zinc-200/80">Deschide →</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
