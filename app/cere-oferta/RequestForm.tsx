"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { offers } from "../data/offers";

type ApiResponse =
  | { ok: true; message: string }
  | { ok: false; message: string };

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-black/20 text-white/90 placeholder:text-white/35 " +
  "outline-none focus:border-amber-300/40 transition";

export default function RequestForm() {
  const sp = useSearchParams();
  const ofertaId = sp.get("oferta") || "";

  const selectedOffer = useMemo(() => {
    if (!ofertaId) return null;
    return offers.find((o) => o.id === ofertaId) || null;
  }, [ofertaId]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (anti-spam, invizibil). Dacă e completat, serverul va ignora trimiterea.
  const [hp, setHp] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!name.trim()) {
      return setResult({ ok: false, message: "Te rog completează numele." });
    }
    if (!phone.trim() && !email.trim()) {
      return setResult({
        ok: false,
        message: "0741659564 office@andymusic.ro.",
      });
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // cere-oferta
          name,
          phone,
          email,
          eventDate,
          location,
          message,
          offerId: ofertaId || undefined,
          offerTitle: selectedOffer?.title || undefined,

          // honeypot
          hp,

          // meta
          page: "cere-oferta",
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        setResult({
          ok: false,
          message: data?.message || "Eroare la trimitere. Încearcă din nou.",
        });
      } else {
        setResult({
          ok: true,
          message: data?.message || "Cererea a fost trimisă.",
        });

        setName("");
        setPhone("");
        setEmail("");
        setEventDate("");
        setLocation("");
        setMessage("");
        setHp("");
      }
    } catch {
      setResult({ ok: false, message: "Eroare de rețea. Încearcă din nou." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:p-4"
    >
      {/* Honeypot: invizibil pentru useri, boții îl completează des */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </label>
      </div>

      {/* Oferta selectată — linie mică */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300/80">
        <span className="uppercase tracking-[0.22em] text-zinc-300/60">
          Selectat:
        </span>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
          {selectedOffer
            ? selectedOffer.title
            : ofertaId
            ? `Oferta: ${ofertaId}`
            : "Custom"}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="sr-only">Nume</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Nume și prenume *"
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
            placeholder="Email (email@exemplu.ro)"
          />
        </label>

        <label className="block">
          <span className="sr-only">Data evenimentului</span>
          <input
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            type="date"
            className={cx(inputBase, "h-9 px-4 text-sm")}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="sr-only">Locație / oraș</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={cx(inputBase, "h-9 px-4 text-sm")}
            placeholder="Locație / oraș (Iași / București / ...)"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="sr-only">Mesaj</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={cx(inputBase, "px-4 py-2 text-sm leading-snug")}
            placeholder="Mesaj (număr persoane, spațiu, cerințe, ore)..."
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
          {loading ? "Se trimite..." : "Trimite cererea"}
        </button>

        <Link
          href="/#oferte"
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-2 text-sm hover:border-amber-300/50 hover:bg-white/10 transition"
        >
          Înapoi la oferte
        </Link>

        <p className="text-xs text-zinc-400/70">
          Confirmăm rapid disponibilitatea și revenim cu ofertare adaptată.
        </p>
      </div>
    </form>
  );
}
