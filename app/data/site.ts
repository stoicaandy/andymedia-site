export const SITE = {
  brand: "ANDYmedia",
  url: "https://www.andymedia.ro",
  // temporar (până muți domeniul pe prod / Vercel)
  urlDev: "https://andymedia-site.vercel.app",

  phoneE164: "+40741659564",
  phoneNational: "0741 659 564",

  // Pune aici când le ai (dacă rămân goale, nu apar pe site)
  email: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  youtube: "",

  // Folosim în JSON-LD (poți completa mai târziu)
  areaServed: "RO",
  priceRange: "$$",
  // Dacă vrei: "București" / "Ilfov" etc. – momentan lăsăm gol ca să nu inventăm
  city: "",
} as const;

export function whatsappUrl(phoneE164: string) {
  // +4074... -> 4074...
  const digits = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
