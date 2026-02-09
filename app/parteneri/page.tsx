import type { Metadata } from 'next';
import PartnersClient from './PartnersClient';

const SITE_NAME = 'ANDYmedia';
const BASE_URL = 'https://andymedia-site.vercel.app';

const PAGE_TITLE = 'Parteneri • Booking • Trupe • DJ • Foto-Video | ANDYmedia';
const PAGE_DESC =
  'Trupe exclusive, colaborări, DJ, foto-video și artiști cu care lucrăm. Booking în dezvoltare: adăugăm constant noi parteneri.';

const OG_IMAGE = '/parteneri/og-parteneri.jpg'; // pune imaginea în public/parteneri/

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: '/parteneri',
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: `${BASE_URL}/parteneri`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'ANDYmedia Parteneri',
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [OG_IMAGE],
  },
};

export default function ParteneriPage() {
  return <PartnersClient baseUrl={BASE_URL} />;
}
