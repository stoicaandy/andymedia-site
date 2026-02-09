"use client";

import { useState } from "react";
import Link from "next/link";

type ApiResponse = { ok: true; message: string } | { ok: false; message: string };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-black/20 text-white/90 placeholder:text-white/35 " +
  "outline-none focus:border-amber-300/40 transition";

export default function ApplyForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Trupă / DJ / Artist / Foto-Video");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!name.trim()) return setResult({ ok: false, message: "Te rog completează numele." });
    if (!phone.trim() && !email.trim())
      return setResult({ ok: false, message: "Completează telefon sau email (ideal ambele)." });

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          location: city,
          message: [
            `Categorie: ${category}`,
            website ? `Website: ${website}` : "",
            instagram ? `Instagram: ${instagram}` : "",
            facebook ? `Facebook: ${facebook}` : "",
            youtube ? `YouTube: ${youtube}` : "",
            tiktok ? `TikTok: ${tiktok}` : "",
            message ? `Detalii: ${message}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
          page: "booking-apply",
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) setResult({ ok: false, message: data?.message || "Eroare la trimitere." });
      else {
        setResult({ ok: true, message: data?.message || "Cererea a fost trimisă." });
        setName("");
        setCity("");
        setPhone("");
        setEmail("");
        setWebsite("");
        setInstagram("");
        setFacebook("");
        setYoutube("");
        setTiktok("");
        setMessage("");
      }
    } catch {
      setResult({ ok: false, message: "Eroare de rețea. Încearcă din nou." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="sr-only">Nume</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Nume trupă / DJ / Artist / Studio *"
          />
        </label>

        <label className="block">
          <span className="sr-only">Categorie</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
          >
            <option>Trupă / DJ / Artist / Foto-Video</option>
            <option>Trupă</option>
            <option>DJ</option>
            <option>Artist</option>
            <option>Foto-Video</option>
            <option>Servicii</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Oraș</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Oraș (Iași / Bacău / ...)"
          />
        </label>

        <label className="block">
          <span className="sr-only">Telefon</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Telefon (+40...)"
          />
        </label>

        <label className="block">
          <span className="sr-only">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Email"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="sr-only">Website</span>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Website (opțional)"
          />
        </label>

        <label className="block">
          <span className="sr-only">Instagram</span>
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Instagram (link)"
          />
        </label>

        <label className="block">
          <span className="sr-only">Facebook</span>
          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Facebook (link)"
          />
        </label>

        <label className="block">
          <span className="sr-only">YouTube</span>
          <input
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="YouTube (link)"
          />
        </label>

        <label className="block">
          <span className="sr-only">TikTok</span>
          <input
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="TikTok (link)"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="sr-only">Detalii</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={cx(inputBase, "px-4 py-2 text-sm leading-snug")}
            placeholder="Detalii (setup, stil, cerințe, rider, ce vrei să știm)..."
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

      <div className="mt-3 flex flex-wrap items-center gap-3">
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
          Înapoi la Parteneri
        </Link>

        <p className="text-xs text-zinc-400/70">
          Trimite linkuri oficiale + o poză 1600×1000 (ideal), JPG 70–85%, sub ~600KB.
        </p>
      </div>
    </form>
  );
}
