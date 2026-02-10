import { SITE } from "@/app/data/site";

type JsonLdProps = {
  id?: string;
};

export default function JsonLd({ id = "localbusiness-jsonld" }: JsonLdProps) {
  // JSON-LD minim, valid, fără adresă (o completăm etapizat)
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.brand,
    url: SITE.url,
    telephone: SITE.phoneE164,
    areaServed: SITE.areaServed,
    priceRange: SITE.priceRange,
    // Social links doar dacă există
    sameAs: [SITE.facebook, SITE.instagram, SITE.tiktok, SITE.youtube].filter(Boolean),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
