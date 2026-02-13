import { NextResponse } from "next/server";

type LeadPayload = {
  // honeypot
  hp?: string;

  // cere-oferta
  name?: string;
  phone?: string;
  email?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  offerId?: string;
  offerTitle?: string;

  // booking-apply
  partnerName?: string;
  category?: string; // Trupă/DJ/Artist/Foto-Video/Servicii
  city?: string;
  since?: string;
  description?: string; // descriere scurtă
  tags?: string; // "tag1, tag2"
  photoLink?: string; // Drive/WeTransfer link
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  youtubeEmbed?: string;
  contactEmail?: string;
  contactPhone?: string;

  // meta
  page?: string; // "cere-oferta" | "booking-apply" | ...
};

function safe(s?: string) {
  return (s || "").toString().trim();
}

function isEmailLike(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nl2br(s: string) {
  return escapeHtml(s || "-").replace(/\n/g, "<br/>");
}

async function sendResendEmail(args: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { apiKey, from, to, subject, html, replyTo } = args;

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      reply_to: replyTo || undefined,
    }),
  });

  if (!resendResp.ok) {
    const txt = await resendResp.text();
    return { ok: false as const, error: txt.slice(0, 240) };
  }

  return { ok: true as const };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    // Honeypot (anti-spam): dacă e completat, ignorăm cererea (nu trimitem email).
    const hp = safe(body.hp);
    if (hp) {
      // silent drop: returnăm OK ca să nu învețe bot-ul că a fost prins
      return NextResponse.json({ ok: true, message: "OK" });
    }

    const page = safe(body.page) || "site";

    // ENV
    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const LEADS_TO = process.env.LEADS_TO || "";
    const LEADS_FROM = process.env.LEADS_FROM || "";

    if (!RESEND_API_KEY || !LEADS_TO || !LEADS_FROM) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Trimiterea emailului nu este configurată încă pe server (lipsesc RESEND_API_KEY / LEADS_TO / LEADS_FROM).",
        },
        { status: 500 }
      );
    }

    // ----------------------------
    // 1) Booking Apply
    // ----------------------------
    if (page === "booking-apply") {
      const partnerName = safe(body.partnerName);
      const category = safe(body.category) || "—";
      const city = safe(body.city);
      const since = safe(body.since);
      const description = safe(body.description);
      const tags = safe(body.tags);

      const photoLink = safe(body.photoLink);
      const website = safe(body.website);
      const facebook = safe(body.facebook);
      const instagram = safe(body.instagram);
      const youtube = safe(body.youtube);
      const youtubeEmbed = safe(body.youtubeEmbed);

      const contactEmail = safe(body.contactEmail);
      const contactPhone = safe(body.contactPhone);

      if (!partnerName) {
        return NextResponse.json(
          { ok: false, message: "Numele (artist/trupă/firmă) este obligatoriu." },
          { status: 400 }
        );
      }

      if (!contactEmail && !contactPhone) {
        return NextResponse.json(
          { ok: false, message: "Completează email sau telefon (ideal ambele)." },
          { status: 400 }
        );
      }

      if (contactEmail && !isEmailLike(contactEmail)) {
        return NextResponse.json(
          { ok: false, message: "Email invalid." },
          { status: 400 }
        );
      }

      if (!description) {
        return NextResponse.json(
          { ok: false, message: "Descrierea scurtă este obligatorie." },
          { status: 400 }
        );
      }

      if (!photoLink) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Link-ul către poză este obligatoriu (Drive/WeTransfer etc.).",
          },
          { status: 400 }
        );
      }

      const subjectParts = [
        "Aplicare Booking",
        category ? `Categorie: ${category}` : "",
        city ? `Oraș: ${city}` : "",
        `Nume: ${partnerName}`,
      ].filter(Boolean);

      const subject = subjectParts.join(" — ");

      const html = `
        <div style="font-family: Inter, Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin: 0 0 12px;">Aplicare Booking (site)</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
            <tr><td style="padding: 8px 0; width: 180px;"><b>Nume</b></td><td style="padding: 8px 0;">${escapeHtml(
              partnerName
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Categorie</b></td><td style="padding: 8px 0;">${escapeHtml(
              category || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Oraș</b></td><td style="padding: 8px 0;">${escapeHtml(
              city || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Din</b></td><td style="padding: 8px 0;">${escapeHtml(
              since || "-"
            )}</td></tr>

            <tr><td style="padding: 8px 0; vertical-align: top;"><b>Descriere</b></td><td style="padding: 8px 0;">${nl2br(
              description
            )}</td></tr>

            <tr><td style="padding: 8px 0;"><b>Taguri</b></td><td style="padding: 8px 0;">${escapeHtml(
              tags || "-"
            )}</td></tr>

            <tr><td style="padding: 8px 0; vertical-align: top;"><b>Link poză</b></td><td style="padding: 8px 0;"><a href="${escapeHtml(
              photoLink
            )}" target="_blank" rel="noreferrer noopener">${escapeHtml(
        photoLink
      )}</a></td></tr>

            <tr><td style="padding: 8px 0;"><b>Website</b></td><td style="padding: 8px 0;">${escapeHtml(
              website || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Facebook</b></td><td style="padding: 8px 0;">${escapeHtml(
              facebook || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Instagram</b></td><td style="padding: 8px 0;">${escapeHtml(
              instagram || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>YouTube</b></td><td style="padding: 8px 0;">${escapeHtml(
              youtube || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>YouTube Embed ID</b></td><td style="padding: 8px 0;">${escapeHtml(
              youtubeEmbed || "-"
            )}</td></tr>

            <tr><td style="padding: 8px 0;"><b>Email contact</b></td><td style="padding: 8px 0;">${escapeHtml(
              contactEmail || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Telefon contact</b></td><td style="padding: 8px 0;">${escapeHtml(
              contactPhone || "-"
            )}</td></tr>

            <tr><td style="padding: 8px 0;"><b>Sursă</b></td><td style="padding: 8px 0;">${escapeHtml(
              page
            )}</td></tr>
          </table>
          <p style="margin-top: 18px; font-size: 12px; color: #666;">
            Trimis automat din ANDYmedia site.
          </p>
        </div>
      `;

      const sent = await sendResendEmail({
        apiKey: RESEND_API_KEY,
        from: LEADS_FROM,
        to: LEADS_TO,
        subject,
        html,
        replyTo: contactEmail || undefined,
      });

      if (!sent.ok) {
        return NextResponse.json(
          { ok: false, message: `Eroare la trimitere email: ${sent.error}` },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Aplicația a fost trimisă. Revenim rapid cu pașii următori!",
      });
    }

    // ----------------------------
    // 2) Cere ofertă
    // ----------------------------
    {
      const name = safe(body.name);
      const phone = safe(body.phone);
      const email = safe(body.email);
      const eventDate = safe(body.eventDate);
      const location = safe(body.location);
      const message = safe(body.message);
      const offerId = safe(body.offerId);
      const offerTitle = safe(body.offerTitle);

      if (!name) {
        return NextResponse.json(
          { ok: false, message: "Numele este obligatoriu." },
          { status: 400 }
        );
      }

      if (!phone && !email) {
        return NextResponse.json(
          { ok: false, message: "Completează telefon sau email (ideal ambele)." },
          { status: 400 }
        );
      }

      if (email && !isEmailLike(email)) {
        return NextResponse.json(
          { ok: false, message: "Email invalid." },
          { status: 400 }
        );
      }

      const subjectParts = [
        "Cerere ofertă",
        offerTitle ? offerTitle : offerId ? `Oferta: ${offerId}` : "Custom",
        eventDate ? `Data: ${eventDate}` : "",
        name ? `Nume: ${name}` : "",
      ].filter(Boolean);

      const subject = subjectParts.join(" — ");

      const html = `
        <div style="font-family: Inter, Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin: 0 0 12px;">Cerere ofertă (site)</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
            <tr><td style="padding: 8px 0; width: 180px;"><b>Nume</b></td><td style="padding: 8px 0;">${escapeHtml(
              name
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Telefon</b></td><td style="padding: 8px 0;">${escapeHtml(
              phone || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Email</b></td><td style="padding: 8px 0;">${escapeHtml(
              email || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Data</b></td><td style="padding: 8px 0;">${escapeHtml(
              eventDate || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Locație</b></td><td style="padding: 8px 0;">${escapeHtml(
              location || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Ofertă</b></td><td style="padding: 8px 0;">${escapeHtml(
              offerTitle || offerId || "Custom"
            )}</td></tr>
            <tr><td style="padding: 8px 0; vertical-align: top;"><b>Mesaj</b></td><td style="padding: 8px 0;">${nl2br(
              message || "-"
            )}</td></tr>
            <tr><td style="padding: 8px 0;"><b>Sursă</b></td><td style="padding: 8px 0;">${escapeHtml(
              page
            )}</td></tr>
          </table>
          <p style="margin-top: 18px; font-size: 12px; color: #666;">
            Trimis automat din ANDYmedia site.
          </p>
        </div>
      `;

      const sent = await sendResendEmail({
        apiKey: RESEND_API_KEY,
        from: LEADS_FROM,
        to: LEADS_TO,
        subject,
        html,
        replyTo: email || undefined,
      });

      if (!sent.ok) {
        return NextResponse.json(
          { ok: false, message: `Eroare la trimitere email: ${sent.error}` },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Cererea a fost trimisă. Revenim cât mai repede!",
      });
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Eroare server. Încearcă din nou." },
      { status: 500 }
    );
  }
}
