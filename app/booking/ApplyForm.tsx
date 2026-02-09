"use client";

import Link from "next/link";
import { useState } from "react";

type ApiResponse =
  | { ok: true; message: string }
  | { ok: false; message: string };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-black/20 text-white/90 placeholder:text-white/35 " +
  "outline-none focus:border-amber-300/40 transition";

export default function ApplyForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Trupă");
  const [city, setCity] = useState("");
  const [since, setSince] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [tags, setTags] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [youtubeEmbed, setYoutubeEmbed] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!name.trim()) return setResult({ ok: false, message: "Te rog completează numele." });
    if (!contactEmail.trim() && !contactPhone.trim())
      return setResult({ ok: false, message: "Te rog completează email sau telefon (ideal ambele)." });
    if (!shortDesc.trim())
      return setResult({ ok: false, message: "Te rog completează o descriere scurtă." });
    if (!photoLink.trim())
      return setResult({ ok: false, message: "Te rog adaugă un link către poză (Drive/WeTransfer etc.)." });

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "booking-apply",
          partnerName: name,
          category,
          city,
          since: since || undefined,
          description: shortDesc,
          tags,
          photoLink,
          website,
          facebook,
          instagram,
          youtube,
          youtubeEmbed,
          contactEmail,
          contactPhone,
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        setResult({ ok: false, message: data?.message || "Eroare la trimitere. Încearcă din nou." });
      } else {
        setResult({ ok: true, message: data?.message || "Aplicarea a fost trimisă. Revenim rapid." });
        setName("");
        setCity("");
        setSince("");
        setShortDesc("");
        setTags("");
        setPhotoLink("");
        setWebsite("");
        setFacebook("");
        setInstagram("");
        setYoutube("");
        setYoutubeEmbed("");
        setContactEmail("");
        setContactPhone("");
      }
    } catch {
      setResult({ ok: false, message: "Eroare de rețea. Încearcă din nou." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-xs text-zinc-300/70">Nume artist / trupă / firmă *</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="Ex: Soundcheck Band"
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Categorie</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
          >
            <option>Trupă</option>
            <option>DJ</option>
            <option>Artist</option>
            <option>Foto-Video</option>
            <option>Servicii</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Oraș</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="Ex: Iași"
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Colaborăm din (an)</span>
          <input
            value={since}
            onChange={(e) => setSince(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="Ex: 2022"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs text-zinc-300/70">Descriere scurtă (max ~300 caractere) *</span>
          <textarea
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            rows={3}
            className={cx(inputBase, "mt-1 px-4 py-2 text-sm leading-snug")}
            placeholder="Ex: Trupă live pentru corporate & evenimente private..."
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs text-zinc-300/70">Taguri (separate prin virgulă)</span>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="Ex: corporate, nuntă, party, live"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs text-zinc-300/70">
            Link poză principală * (Drive / WeTransfer / Dropbox)
          </span>
          <input
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="https://drive.google.com/..."
          />
          <p className="mt-1 text-[11px] text-zinc-400/70">
            Recomandare: JPG 2000px lățime (min 1600px), 70–85% calitate, sub ~600KB.
          </p>
        </label>

        <div className="md:col-span-2 border-t border-white/10 pt-3 mt-1" />

        <label className="block">
          <span className="text-xs text-zinc-300/70">Website</span>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="https://..."
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Facebook</span>
          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="https://facebook.com/..."
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Instagram</span>
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="https://instagram.com/..."
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">YouTube (canal/profil)</span>
          <input
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="https://youtube.com/..."
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs text-zinc-300/70">ID video YouTube pentru preview (opțional)</span>
          <input
            value={youtubeEmbed}
            onChange={(e) => setYoutubeEmbed(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder='Ex: dQw4w9WgXcQ (doar ID, nu link complet)'
          />
        </label>

        <div className="md:col-span-2 border-t border-white/10 pt-3 mt-1" />

        <label className="block">
          <span className="text-xs text-zinc-300/70">Email contact *</span>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            type="email"
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="contact@..."
          />
        </label>

        <label className="block">
          <span className="text-xs text-zinc-300/70">Telefon contact *</span>
          <input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className={cx(inputBase, "mt-1 h-9 px-4 text-sm")}
            placeholder="+40..."
          />
        </label>
      </div>

      {result ? (
        <div
          className={cx(
            "mt-3 rounded-xl border px-4 py-2.5 text-sm",
            result.ok
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
              : "border-red-300/20 bg-red-300/10 text-red-100"
          )}
        >
          {result.message}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={loading}
          className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
        >
          {loading ? "Se trimite..." : "Trimite aplicația"}
        </button>

        <Link
          href="/parteneri"
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-2 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
        >
          Înapoi la parteneri
        </Link>

        <p className="text-xs text-zinc-400/70">
          Revenim cu confirmare + eventuale ajustări pentru listare.
        </p>
      </div>
    </form>
  );
}
