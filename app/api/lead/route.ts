import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  offerId?: string;
  offerTitle?: string;
  page?: string;
};

function safe(s?: string) {
  return (s || "").toString().trim();
}

function isEmailLike(s: string) {
  // minim, dar suficient pentru lead-uri
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    const name = safe(body.name);
    const phone = safe(body.phone);
    const email = safe(body.email);
    const eventDate = safe(body.eventDate);
    const location = safe(body.location);
    const message = safe(body.message);
    const offerId = safe(body.offerId);
    const offerTitle = safe(body.offerTitle);
    const page = safe(body.page) || "site";

    if (!name) {
      return NextResponse.json({ ok: false, message: "Numele este obligatoriu." }, { status: 400 });
    }

    if (!phone && !email) {
      return NextResponse.json(
        { ok: false, message: "Completează telefon sau email (ideal ambele)." },
        { status: 400 }
      );
    }

    if (email && !isEmailLike(email)) {
      return NextResponse.json({ ok: false, message: "Email invalid." }, { status: 400 });
    }

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
          <tr><td style="padding: 8px 0; vertical-align: top;"><b>Mesaj</b></td><td style="padding: 8px 0;">${escapeHtml(
            message || "-"
          ).replace(/\n/g, "<br/>")}</td></tr>
          <tr><td style="padding: 8px 0;"><b>Sursă</b></td><td style="padding: 8px 0;">${escapeHtml(
            page
          )}</td></tr>
        </table>
        <p style="margin-top: 18px; font-size: 12px; color: #666;">
          Trimisa automat din ANDYmedia site.
        </p>
      </div>
    `;

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: LEADS_FROM,
        to: [LEADS_TO],
        subject,
        html,
        reply_to: email || undefined,
      }),
    });

    if (!resendResp.ok) {
      const txt = await resendResp.text();
      return NextResponse.json(
        { ok: false, message: `Eroare la trimitere email: ${txt.slice(0, 240)}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Cererea a fost trimisă. Revenim cât mai repede!" });
  } catch {
    return NextResponse.json({ ok: false, message: "Eroare server. Încearcă din nou." }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
