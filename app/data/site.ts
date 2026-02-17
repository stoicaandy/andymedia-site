export const SITE = {
  brand: "ANDYmedia",

  // Domeniul final (production)
  url: "https://www.andymedia.ro",

  // Domeniul de preview (Vercel) — îl folosești până e domeniul pe prod
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

/**
 * URL-ul corect în funcție de mediu:
 * - production -> SITE.url
 * - preview/development -> SITE.urlDev (dacă există) altfel SITE.url
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? SITE.url : SITE.urlDev || SITE.url);

export function whatsappUrl(phoneE164: string) {
  const digits = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
