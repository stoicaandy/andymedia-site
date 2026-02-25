export const SITE = {
  brand: "ANDYmedia",

  // Domeniul final (production) — canonic
  url: "https://www.andymedia.ro",

  // Domeniul de preview (Vercel)
  urlDev: "https://andymedia-site.vercel.app",

  phoneE164: "+40741659564",
  phoneNational: "0741 659 564",

  email: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  youtube: "",

  areaServed: "RO",
  priceRange: "$$",
  city: "",
} as const;

// Baza corectă în funcție de mediu (override cu NEXT_PUBLIC_SITE_URL dacă există)
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_ENV === "production" ? SITE.url : SITE.urlDev || SITE.url)
  ).replace(/\/$/, "");

export function whatsappUrl(phoneE164: string) {
  const digits = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}