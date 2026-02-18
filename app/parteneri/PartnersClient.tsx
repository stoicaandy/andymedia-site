"use client";

import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { useMemo, useState } from "react";

type PartnerCategory =
  | "Trupe exclusive"
  | "Trupe colaborări"
  | "DJ"
  | "Foto-Video"
  | "Artiști"
  | "Servicii"
  | "Booking";

type PartnerLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  spotify?: string;
  tiktok?: string;
  contact?: string;
};

type Partner = {
  id: string;
  name: string;
  city?: string;
  category: PartnerCategory;
  exclusive?: boolean;
  since?: string;
  collaborated?: boolean;
  description: string;
  image: string;
  tags?: string[];
  links?: PartnerLinks;
  /**
   * Acceptă fie ID (ex: rC35YDt2nDI), fie URL (watch/shorts/youtu.be).
   * Noi extragem automat ID-ul.
   */
  youtubeEmbed?: string;
  /** 1..10 = sus (featured), 999 = jos */
  priority?: number;
};

const PAGE_TITLE = "Parteneri • Booking • Trupe • DJ • Foto-Video | ANDYmedia";
const PAGE_DESC =
  "Trupe exclusive, colaborări, DJ, foto-video și artiști cu care lucrăm. Booking în dezvoltare: adăugăm constant noi parteneri.";

const PARTNERS: Partner[] = [
  {
    id: "trupa-de-weekend-iasi",
    name: "Trupa de Weekend",
    city: "Iași",
    category: "Trupe exclusive",
    exclusive: true,
    since: "2021",
    priority: 2,
    description:
      "Trupă live cu repertoriu versatil (folclor → pop/evergreen). Show disciplinat, energie de scenă și flow bun pentru public mixt. ",
    image: "/parteneri/trupa-de-weekend-iasi.jpg",
    tags: ["party", "live", "evenimente", "cover", "corporate", "nuntă"],
    links: {
      website: "https://trupadeweekend.ro/",
      facebook: "https://www.facebook.com/trupaweekend",
      instagram: "https://www.instagram.com/trupadeweekend/",
      youtube: "https://www.youtube.com/channel/UC-rVV4JUokF9Sstoha35BkA",
      contact:
      "https://wa.me/4043341797?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
    },
    youtubeEmbed: "rC35YDt2nDI",
  },
{
  id: "dj-marius-voicescu-iasi",
  name: "DJ Marius Voicescu",
  city: "Iași",
  category: "DJ",
  priority: 80,
  description:
    "DJ & MC pentru evenimente în Iași și în țară — seturi personalizate, flow coerent și energie constantă pe ring. Potrivit pentru nunți, botezuri, corporate și petreceri tematice (retro / video party). ",
  image: "/parteneri/marius-voicescu-iasi.jpg",
  tags: ["dj", "mc", "nuntă", "botez", "corporate", "party", "retro", "Iași"],
  links: {
    facebook: "https://www.facebook.com/p/Dj-Marius-Voicescu-Nunti-Iasi-100057072895652/",
    instagram: "https://www.instagram.com/djmariusvoicescu/",
    youtube: "https://www.youtube.com/@djmariusvoicescu3455",
    spotify: undefined,
    tiktok: undefined,
    website: undefined,
    contact:
      "https://wa.me/40741054444?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/QFbfbizJZOU",
},
{
  id: "alex-maxim-vocea-romaniei",
  name: "Alex Maxim (Alexandru Ionuț Maxim)",
  city: "Iași",
  category: "Artiști",
  priority: 39,
  description:
    "Artist & performer, cunoscut publicului larg din Vocea României (finalist). Voce puternică, interpretare cu impact și prezență scenică. Potrivit pentru evenimente private, corporate și apariții live, cu repertoriu adaptat publicului și momentului.",
  image: "/parteneri/alex-maxim.jpg",
  tags: ["artist", "live", "Vocea României", "show", "evenimente", "corporate", "nuntă", "Iași"],
  links: {
    instagram: "https://www.instagram.com/alexmaxim.ro/?hl=ro",
    facebook: "https://www.facebook.com/alexmaxim.ro/",
    youtube: "https://www.youtube.com/@ImAlexMaxim",
    tiktok: "https://www.tiktok.com/@alexmaxim.ro",
    contact: "https://www.instagram.com/alexmaxim.ro/?hl=ro",
  },
  youtubeEmbed: "https://youtu.be/Err1svvzAYA",
},
{
  id: "ionut-galani",
  name: "Ionuț Galani",
  city: "Constanța",
  category: "Artiști",
  priority: 38,
  description:
    "Ionuț Galani — artist recunoscut pentru show-ul live de muzică grecească, energie ridicată și momente de ring care „prind” imediat. Format potrivit pentru nunți, evenimente private, corporate și seri tematice (Greek night), cu program adaptat publicului.",
  image: "/parteneri/ionut-galani.jpg",
  tags: ["artist", "muzică grecească", "live", "nuntă", "corporate", "evenimente", "Greek night"],
  links: {
    website: "https://www.ionutgalani.ro/",
    instagram: "https://www.instagram.com/ionutgalani/",
    facebook: "https://www.facebook.com/p/Ionut-Galani-Official-100044224669967/",
    youtube: "https://www.youtube.com/c/IonutGalani",
    spotify: undefined,
    tiktok: undefined,
    contact:
      "https://wa.me/40722226678?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/NisW5bQqfsI",
},
{
  id: "ioana-ignat",
  name: "Ioana Ignat",
  city: "București",
  category: "Artiști",
  priority: 15,
  description:
    "Ioana Ignat — artistă pop cu hituri cunoscute și prezență scenică puternică. Show live potrivit pentru evenimente private, corporate și concerte, cu repertoriu adaptat publicului și momentului.",
  image: "/parteneri/ioana-ignat.jpg",
  tags: ["artist", "pop", "live", "evenimente", "corporate", "concert", "București"],
  links: {
    instagram: "https://www.instagram.com/ioanaignatofficial/",
    facebook: "https://www.facebook.com/Ioanaignatofficial/",
    youtube: "https://www.youtube.com/channel/UC2114LUrKwLVB96aPsaabVQ",
    tiktok: "https://www.tiktok.com/@ioanaignatoficial",
    contact: "https://www.instagram.com/ioanaignatofficial/",
  },
  youtubeEmbed: "https://youtu.be/sRJUTKKmwpI",
},
{
  id: "alina-eremia",
  name: "Alina Eremia",
  city: "București",
  category: "Artiști",
  priority: 12,
  description:
    "Alina Eremia — artistă pop de top din România, cu hituri cunoscute și show live modern, potrivit pentru evenimente private, corporate și festivaluri.",
  image: "/parteneri/alina-eremia-iasi.jpg",
  tags: ["artist", "pop", "live", "evenimente", "corporate", "festival", "București"],
  links: {
    website: "https://alinaeremia.ro/",
    instagram: "https://www.instagram.com/alinaeremia/",
    facebook: "https://www.facebook.com/OfficialAlinaEremia/",
    youtube: "https://www.youtube.com/channel/UCfuFmKmtny4iQmDK6wREP4w",
    contact:
      "https://wa.me/40751144109?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/scl2UJnbk9Q",
},
{
  id: "carlas-dreams",
  name: "Carla’s Dreams",
  city: "Chișinău",
  category: "Trupe colaborări",
  priority: 10,
  description:
    "Carla’s Dreams — proiect muzical de top (MD/RO), cu show live puternic și repertoriu cunoscut. Potrivit pentru evenimente mari (corporate, festival, private premium).",
  image: "/parteneri/carlas-dreams-iasi.jpg",
  tags: ["trupă", "live", "corporate", "festival", "evenimente", "MD", "RO", "show"],
  links: {
    website: "https://www.carlasdreams.com/",
    facebook: "https://www.facebook.com/carlasdreamss/",
    instagram: "https://www.instagram.com/carlasdreams/",
    youtube: "https://www.youtube.com/channel/UCCJAzWoNFWPhIFXo-j17EPw",
    tiktok: "https://www.tiktok.com/@carlasdreams",
    contact:
      "https://wa.me/40746666313?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/Y-aVSs9ftiM",
},
{
  id: "proconsul",
  name: "Proconsul",
  city: "România",
  category: "Trupe colaborări",
  priority: 11,
  description:
    "Proconsul — una dintre cele mai iubite trupe pop-rock din România, cu un repertoriu cunoscut și un show live potrivit pentru evenimente mari (private, corporate, festival).",
  image: "/parteneri/proconsul-iasi.jpg",
  tags: ["trupă", "pop-rock", "live", "corporate", "festival", "evenimente", "România"],
  links: {
    website: "https://www.proconsul.com.ro/",
    facebook: "https://www.facebook.com/ProconsulOfficial/?locale=ro_RO",
    instagram: "https://www.instagram.com/proconsul_music/",
    youtube: "https://www.youtube.com/channel/UCCJAzWoNFWPhIFXo-j17EPw",
    contact:
      "https://wa.me/40744831410?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/9mTUM9RzPkI",
},
{
  id: "trupa-atelier",
  name: "Trupa Atelier",
  city: "București",
  category: "Trupe colaborări",
  priority: 30,
  description:
    "Trupa Atelier — cover band 100% live pentru nunți, corporate și evenimente private. Repertoriu larg (dance / pop / rock / latino / evergreen / șlagăre românești), cu show dinamic și execuție curată. Booking: 0723 310 310 • Email: contact@trupa-atelier.ro.",
  image: "/parteneri/trupa-atelier.jpg",
  tags: ["cover band", "live", "nuntă", "corporate", "evenimente", "București", "party"],
  links: {
    website: "https://www.trupa-atelier.ro/",
    facebook: "https://www.facebook.com/trupa.atelier/",
    instagram: "https://www.instagram.com/trupaatelier/",
    youtube: "https://www.youtube.com/@TrupaAtelier",
    contact:
      "https://wa.me/40723310310?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/AbSgSofD3Us",
},
{
  id: "pepe",
  name: "Pepe",
  city: "București",
  category: "Artiști",
  priority: 15,
  description:
    "Pepe — artist cu hituri cunoscute și show live energic, potrivit pentru evenimente private, corporate și festivaluri. Repertoriu pop/latin, interacțiune bună cu publicul și program adaptabil (format eveniment). Booking: 0722 825 860.",
  image: "/parteneri/pepe.jpg",
  tags: ["artist", "live", "pop", "latin", "corporate", "festival", "evenimente", "București"],
  links: {
    website: "https://pepe.ro/",
    facebook: "https://www.facebook.com/PepeOnline/",
    instagram: "https://www.instagram.com/official_pepe/",
    youtube: "https://www.youtube.com/channel/UCeEHd3DVXGm4NNxaDDZngKQ",
    contact:
      "https://wa.me/40722825860?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/3RcKxlbcXmY",
},
{
  id: "bogdan-alin-ota",
  name: "Bogdan Alin Ota",
  city: "Bacău",
  category: "Artiști",
  priority: 14,
  description:
    "Bogdan Alin Ota — pianist și compozitor de anvergură internațională (crossover / cinematic / new age), recunoscut pentru concerte sold-out și emoția pe care o transmite live. ",
  image: "/parteneri/bogdan-ota.jpg",
  tags: ["pianist", "compozitor", "crossover", "cinematic", "new age", "live", "corporate", "show premium"],
  links: {
    website: "https://www.bogdanota.com/",
    facebook: "https://www.facebook.com/BogdanOtaOfficial/",
    instagram: "https://www.instagram.com/bogdan_ota/",
    youtube: "https://www.youtube.com/@BogdanOtaOfficial",
    spotify: "https://open.spotify.com/artist/1O8tCRHNXK1i6SL7VNcGca",
    // Apple Music nu are câmp dedicat în tipul vostru; îl punem în "website" de regulă,
    // dar ca să nu stricăm tipurile, îl punem ca link suplimentar în descriere/website.
    // Dacă vrei, îți extind eu tipul PartnerLinks cu appleMusic.
    contact:
      "https://wa.me/40741550875?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
  },
  youtubeEmbed: "https://youtu.be/RwzzIn3UmIA",
},
{
  id: "andrei-banuta",
  name: "Andrei Bănuță",
  city: "Constanța (Eforie Sud)",
  category: "Artiști",
  priority: 13,
  description:
    "Andrei Bănuță — una dintre cele mai fresh voci din România, cu piese virale și concerte foarte cerute. Stil modern, emoție în interpretare și energie bună live (ideal pentru evenimente private, corporate și festivaluri).",
  image: "/parteneri/andrei-banuta-iasi.jpg",
  tags: ["artist", "live", "pop", "evenimente", "corporate", "festival", "România"],
  links: {
    instagram: "https://www.instagram.com/andrei_banuta/",
    facebook: "https://www.facebook.com/AndreiBanutaOfficial/",
    youtube: "https://www.youtube.com/@AndreiBanuta.",
    spotify: "https://open.spotify.com/artist/7rtpTWA4CYQOAvg9GD2Xr2",
    contact:
      "https://wa.me/40722179782?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
  },
  youtubeEmbed: "https://youtu.be/YsjwcyG15mc",
},
{
  id: "elena-ionescu",
  name: "Elena Ionescu",
  city: "București",
  category: "Artiști",
  priority: 16,
  description:
    "Elena Ionescu — artistă pop (ex-Mandinga) cu show live energic și repertoriu potrivit pentru evenimente private, corporate și festivaluri.",
  image: "/parteneri/elena-ionescu.jpg",
  tags: ["artist", "pop", "live", "evenimente", "corporate", "festival", "București"],
  links: {
    instagram: "https://www.instagram.com/elenaionescumusic/",
    facebook: "https://www.facebook.com/Elena.Ionescu.oficial/",
    youtube: "https://www.youtube.com/@elenaionescuofficial43",
    contact:
      "https://wa.me/40720990989?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/cSpRXk2AifY",
},
{
  id: "andra-botez",
  name: "Andra Botez",
  city: "București",
  category: "Artiști",
  priority: 3,
  description:
    "Andra Botez — voce de jazz/soul și una dintre cele mai respectate prezențe din zona vocală: CVT Certified Practitioner / vocal coach . Finalista Vocea Romaniei 2022 ",
  image: "/parteneri/andra-botez.jpg",
  tags: ["artist", "jazz" , "live", "Vocea României", "show", "evenimente", "corporate", "București"],
  links: {
    instagram: "https://www.instagram.com/andrabotezvoice/",
    facebook: "https://www.facebook.com/AndraBotezOfficial/",
    youtube: "https://www.youtube.com/@andrabotez3909",
    spotify: "https://open.spotify.com/artist/6D13IqlSUTSNtDqs15v0vb",
    website: undefined,
    tiktok: undefined,
    contact:
      "https://wa.me/40747131907?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/aHqb_NBnWXA",
},
{
  id: "fetele-din-botosani",
  name: "Fetele din Botoșani",
  city: "Botoșani",
  category: "Artiști",
  priority: 24,
  description:
    "Fetele din Botoșani — proiect folcloric cunoscut, cu repertoriu autentic moldovenesc și momente live pline de energie. Potrivite pentru nunți, evenimente private, spectacole și festivaluri.",
  image: "/parteneri/fetele-din-botosani.jpg",
  tags: ["folclor", "moldovenesc", "live", "nuntă", "evenimente", "spectacol", "festival"],
  links: {
    facebook: "https://www.facebook.com/FeteleDinBotosani/",
    instagram: "https://www.instagram.com/fetele.din.botosani/",
    youtube: "https://www.youtube.com/c/FeteledinBoto%C8%99ani",
    contact:
      "https://wa.me/40748710887?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/xrUl8_RH4LM",
},
{
  id: "dj-ralmm-iasi",
  name: "DJ RALMM",
  city: "Iași",
  category: "DJ",
  priority: 80,
  description:
    "DJ & producer cu experiență solidă, seturi versatile (club / house / afro / latino) și control bun al energiei pe ring. Potrivit pentru nunți, corporate și party-uri, cu selecție adaptată publicului și momentului.",
  image: "/parteneri/dj-ralm-iasi.jpg",
  tags: ["dj", "producer", "Iași", "club", "house", "afro", "latin", "party", "evenimente"],
  links: {
    facebook: "https://www.facebook.com/RALMM.RO/",
    instagram: "https://www.instagram.com/ralmm.ro/",
    tiktok: "https://www.tiktok.com/@ralmm.ro",
    youtube: "https://www.youtube.com/@ralmmro",
    contact:
      "https://wa.me/40743566030?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/JS0PsJkmP8E",
},
{
    id: "soundcheck-band-iasi",
    name: "SoundCheck Band",
    city: "Iași",
    category: "Trupe exclusive",
    exclusive: true,
    since: "2018",
    priority: 1,
    description:
      "Grup de muzicieni licențiați din Iași, pentru publicul care vrea să vadă și să audă «altceva». De la jazz la disco, de la rock la reggae, din anii ’30 până azi — show-ul surprinde de fiecare dată, vizual și auditiv. ",
    image: "/parteneri/soundcheck-band-iasi.jpg",
    tags: ["live", "corporate", "nuntă", "cover band", "jazz", "rock", "disco", "reggae"],
    links: {
      website: "https://www.soundcheckband.ro/",
      youtube: "https://www.youtube.com/c/soundcheckiasi/videos",
      tiktok: "https://www.tiktok.com/@soundcheckband.ro",
      contact:
      "https://wa.me/40742137647?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
    },
    youtubeEmbed: "4H0ZJeZGSJg",
  },
 {
  id: "ion-paladi",
  name: "Ion Paladi",
  city: "Chișinău",
  category: "Artiști",
  priority: 20,
  description:
    "Este unul dintre cei mai cunoscuți artiști de muzică populară din Republica Moldova, apreciat pentru repertoriul autentic, vocea inconfundabilă și show-ul live energic. Ideal pentru nunți, evenimente corporate și festivaluri, cu program adaptat publicului și momentului.",
  image: "/parteneri/ion-paladi.jpg",
  tags: ["artist", "muzică populară", "live", "nuntă", "corporate", "festival", "show"],
  links: {
    website: "https://ionpaladi.md/",
    facebook: "https://www.facebook.com/ionpaladi.ro/",
    instagram: "https://www.instagram.com/ionpaladiofficial/",
    youtube: "https://www.youtube.com/@ionpaladiofficial",
    contact:
      "https://wa.me/40755588995?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Fora%C8%99%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/xNW-Hfz4lo8",
},
{
  id: "viorica-macovei",
  name: "Viorica Macovei",
  city: "Bucovina",
  category: "Artiști",
  priority: 23,
  description:
    " Este una dintre cele mai apreciate voci ale folclorului bucovinean, iubită pentru autenticitate, emoție și energie pe scenă. Repertoriu bogat (hore, sârbe, cântece de suflet) și prezență scenică puternică, potrivită pentru nunți, spectacole, festivaluri și evenimente private.",
  image: "/parteneri/viorica-macovei-iasi.jpg",
  tags: ["folclor", "Bucovina", "live", "nuntă", "evenimente", "spectacol", "festival"],
  links: {
    website: "https://vioricamacovei.ro/",
    facebook: "https://www.facebook.com/oficialvioricamacovei/?locale=ro_RO",
    instagram: "https://www.instagram.com/oficial_viorica_macovei/",
    youtube: "https://www.youtube.com/@VioricaMacoveiOficial",
    contact:
      "https://wa.me/40744307675?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/d62681XF_Ns",
},
{
  id: "mioara-velicu",
  name: "Mioara Velicu",
  city: "Galați",
  category: "Artiști",
  priority: 22,
  description:
    "Legendă a folclorului românesc, voce emblematică și interpretă cu o carieră de peste 6 decenii. Repertoriu autentic, stil inconfundabil și prezență scenică rară, apreciată de generații întregi. Potrivită pentru spectacole, festivaluri și evenimente de gală. Apple Music: https://music.apple.com/ro/artist/mioara-velicu/1460276156",
  image: "/parteneri/mioara-velicu-iasi.jpg",
  tags: ["folclor", "muzică populară", "legendă", "spectacol", "festival", "gală", "live"],
  links: {
    facebook: "https://www.facebook.com/mioaravelicuofficial/?locale=ro_RO",
    instagram: "https://www.instagram.com/mioaravelicu/",
    youtube: "https://www.youtube.com/@mioaravelicu5751",
    spotify: "https://open.spotify.com/artist/1HKgbD6noLi48d8pK0eYN0",
    contact:
      "https://wa.me/40724648042?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Mul%C8%9Bumesc!",
  },
  youtubeEmbed: "https://youtu.be/fsKosMWsUyg",
},
  {
    id: "dj-jonny-black-iasi",
    name: "DJ Jonny Black",
    city: "Iași",
    category: "DJ",
    priority: 90,
    description:
      "DJ adaptat publicului și momentului: warm-up corect, peak-time controlat, flow coerent. Focus pe experiență, nu pe “random playlist”.",
    image: "/parteneri/dj-jonny-black-iasi.jpg",
    tags: ["nuntă", "corporate", "party", "open format"],
    links: {
      facebook: "https://facebook.com/eventiasi",
      tiktok: "https://www.tiktok.com/@johnny.events?_r=1&_t=ZN-93mcjtQZu9W",
      contact:
        "https://wa.me/40757666811?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
    },
  },
  {
  id: "fara-zahar",
  name: "Fără Zahăr",
  city: "Iași",
  category: "Trupe colaborări",
  priority: 17,
  description:
    "Fără Zahăr — trupă de muzică & umor (satiră socială) cu show live foarte energic și repertoriu cunoscut. Potrivită pentru festivaluri, evenimente corporate și spectacole (public mare), cu momente interactive și entertainment garantat. Booking (număr publicat frecvent pentru impresariat): 0756 011 001.",
  image: "/parteneri/fara-zahar.jpg",
  tags: ["trupă", "live", "umor", "satiră", "festival", "corporate", "show", "Iași"],
  links: {
    facebook: "https://www.facebook.com/farazahar/",
    instagram: "https://www.instagram.com/trupafarazahar/",
    youtube: "https://www.youtube.com/channel/UC5DLUvo7x0Jd0HZw4GoBing",
    spotify: "https://open.spotify.com/artist/73sGfnuU0aoVWa1oXgBxcu",
    website: "https://farazahar.bandcamp.com/",
    contact:
      "https://wa.me/40756011001?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20dumneavoastr%C4%83.%20V%C4%83%20rog%20s%C4%83-mi%20trimite%C8%9Bi%20disponibilitatea%20%C8%99i%20o%20ofert%C4%83%20orientativ%C4%83%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Mul%C8%9Bumesc%21",
  },
  youtubeEmbed: "https://youtu.be/vJpHg86tQE0",
},
  {
    id: "smart-music-iasi",
    name: "Smart Music",
    city: "Iași",
    category: "Trupe colaborări",
    collaborated: true,
    priority: 55,
    description:
      "Formație de evenimente (colaborare periodică). Repertoriu pentru petreceri / momente dedicate, livrat curat și adaptat publicului.",
    image: "/parteneri/smart-music-iasi.jpg",
    tags: ["formație", "evenimente", "colaborare", "Iași"],
    links: {
      instagram: "https://www.instagram.com/iasi.smartmusic/",
      facebook: "https://www.facebook.com/iasi.smartmusic/",
      youtube: "https://www.youtube.com/@smartmusiciasi",
      tiktok: "https://www.tiktok.com/@smartmusic.iasi",
      contact:
        "https://wa.me/40742453047?text=Salut%21%20ANDYmedia%20a%20recomandat%20contactul%20tau.%20Te%20rog%20sa-mi%20trimiti%20disponibilitatea%20si%20o%20oferta%20orientativa%20pentru%20eveniment%20(data%2Foras%2Finterval).%20Multumesc!",
    },
    youtubeEmbed: "https://www.youtube.com/shorts/USqoBAt16WU?feature=share",
  },

  {
    id: "booking-in-dezvoltare",
    name: "Booking (în dezvoltare)",
    category: "Booking",
    priority: 999,
    description:
      "Adăugăm constant artiști și formații imediat ce avem contactul lor. Dacă vrei recomandări rapide, trimite-ne detaliile evenimentului.",
    image: "/parteneri/booking-andymedia.jpg",
    tags: ["booking", "artiști", "formații", "DJ"],
    links: {
      contact: "/cere-oferta",
    },
  },
];

const CATEGORIES: Array<{ key: PartnerCategory | "Toate"; label: string }> = [
  { key: "Toate", label: "Toate" },
  { key: "Trupe exclusive", label: "Trupe exclusive" },
  { key: "Trupe colaborări", label: "Colaborări" },
  { key: "DJ", label: "DJ" },
  { key: "Foto-Video", label: "Foto-Video" },
  { key: "Artiști", label: "Artiști" },
  { key: "Servicii", label: "Servicii" },
  { key: "Booking", label: "Booking" },
];

function normalize(s: string) {
  return s.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** ✅ Extrage ID-ul YouTube din ID simplu sau URL (watch, shorts, youtu.be). */
function getYouTubeId(input?: string): string | undefined {
  if (!input) return undefined;

  const raw = input.trim();

  // deja e ID (11 char), acceptăm direct
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  // încearcă să parseze ca URL
  try {
    const url = new URL(raw);

    // watch?v=
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    // youtu.be/<id>
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com/shorts/<id>
    const parts = url.pathname.split("/").filter(Boolean);
    const shortsIdx = parts.indexOf("shorts");
    if (shortsIdx >= 0) {
      const id = parts[shortsIdx + 1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com/embed/<id>
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0) {
      const id = parts[embedIdx + 1];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // nu e URL valid → ignorăm
  }

  // fallback: regex (în caz de input ciudat)
  const m =
    raw.match(/v=([a-zA-Z0-9_-]{11})/) ||
    raw.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    raw.match(/shorts\/([a-zA-Z0-9_-]{11})/) ||
    raw.match(/embed\/([a-zA-Z0-9_-]{11})/);

  return m?.[1];
}

function IconLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="h-2 w-2 rounded-full bg-white/50" />
      {label}
    </a>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
      {children}
    </span>
  );
}

function StatPill({ k, v }: { k: string; v: string | number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md">
      <span className="text-white font-semibold">{v}</span>
      <span className="text-white/60">{k}</span>
    </span>
  );
}

function categoryRank(c: PartnerCategory) {
  const order: Record<PartnerCategory, number> = {
    "Trupe exclusive": 10,
    DJ: 20,
    "Trupe colaborări": 30,
    "Artiști": 40,
    "Foto-Video": 50,
    "Servicii": 60,
    Booking: 99,
  };
  return order[c] ?? 999;
}

export default function PartnersClient({ baseUrl }: { baseUrl: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PartnerCategory | "Toate">("Toate");
  const [yt, setYt] = useState<{ open: boolean; title?: string; id?: string }>({ open: false });

  const filtered = useMemo(() => {
    const nq = normalize(q);

    const arr = PARTNERS.filter((p) => {
      const inCat = cat === "Toate" ? true : p.category === cat;
      const hay = [p.name, p.city ?? "", p.category, p.description, ...(p.tags ?? [])].join(" ");
      const inQuery = nq.length === 0 ? true : normalize(hay).includes(nq);
      return inCat && inQuery;
    });

    arr.sort((a, b) => {
      const pa = a.priority ?? 100;
      const pb = b.priority ?? 100;
      if (pa !== pb) return pa - pb;

      const ca = categoryRank(a.category);
      const cb = categoryRank(b.category);
      if (ca !== cb) return ca - cb;

      return a.name.localeCompare(b.name, "ro");
    });

    return arr;
  }, [q, cat]);

  const stats = useMemo(() => {
    const exclusiveCount = PARTNERS.filter((p) => p.exclusive).length;
    const total = PARTNERS.length;
    const cities = new Set(PARTNERS.map((p) => p.city).filter(Boolean) as string[]);
    return { exclusiveCount, total, citiesCount: cities.size };
  }, []);

  const jsonLd = useMemo(() => {
    const items = PARTNERS.filter((p) => p.name && p.image).map((p) => ({
      "@type": "Organization",
      name: p.name,
      url: p.links?.website || p.links?.facebook || p.links?.instagram || undefined,
      image: `${baseUrl}${p.image}`,
      areaServed: p.city ? { "@type": "City", name: p.city } : undefined,
      description: p.description,
      sameAs: [
        p.links?.website,
        p.links?.facebook,
        p.links?.instagram,
        p.links?.youtube,
        p.links?.tiktok,
        p.links?.spotify,
      ].filter(Boolean),
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESC,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((it, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: it,
        })),
      },
    };
  }, [baseUrl]);

  return (
    <>
      <Script
        id="parteneri-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO + FILTERS */}
      <section className="mx-auto max-w-6xl px-8 md:px-10 pt-8 md:pt-10 pb-8">
        <h1 className="text-2xl md:text-3xl font-medium tracking-wide">
          Parteneri <span className="text-amber-300">.</span>
        </h1>

        <p className="mt-2 text-zinc-300/85 max-w-3xl">
          Caută rapid în listă sau filtrează pe categorie (DJ, trupe exclusive, colaborări etc.).
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <StatPill k="Parteneri" v={stats.total} />
          <StatPill k="Exclusivi" v={stats.exclusiveCount} />
          <StatPill k="Orașe" v={stats.citiesCount} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_auto] lg:items-start">
          {/* Search */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
              Căutare rapidă
            </div>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută: nume, oraș, tag, descriere…"
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-amber-300/40"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = cat === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCat(c.key)}
                    className={[
                      "rounded-full border px-4 py-2 text-xs transition",
                      active
                        ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
                        : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06] hover:border-amber-300/30",
                    ].join(" ")}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCat("Toate");
                }}
                className="text-sm text-zinc-300/80 hover:text-white transition"
              >
                Reset filtre →
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-300/70">
              Booking / recomandări
            </div>
            <p className="mt-2 text-sm text-zinc-300/85 leading-snug">
              Spune-ne data, orașul și tipul evenimentului — îți trimitem recomandări rapide.
            </p>

            <div className="mt-4">
              <Link
                href="/cere-oferta"
                className="inline-flex rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm hover:border-amber-300/60 hover:bg-amber-300/15 transition"
              >
                Cere ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-8 md:px-10 pb-14">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-black/30 p-10 text-center backdrop-blur-md">
            <div className="text-xl font-bold">Niciun rezultat</div>
            <p className="mt-2 text-white/75">Încearcă alt cuvânt-cheie sau schimbă filtrul.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const ytId = getYouTubeId(p.youtubeEmbed);

              return (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 transition hover:border-white/20 hover:bg-black/35 backdrop-blur-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.name}${p.city ? ` - ${p.city}` : ""} - ANDYmedia partener`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {p.priority && p.priority <= 10 ? <Chip>ANDYmedia Preferred</Chip> : null}
                      {p.exclusive ? <Chip>Exclusiv</Chip> : null}
                      {!p.exclusive && p.collaborated ? <Chip>Colaborat</Chip> : null}
                      <Chip>{p.category}</Chip>
                      {p.since ? <Chip>din {p.since}</Chip> : null}
                    </div>

                    <h2 className="text-xl font-extrabold tracking-tight">{p.name}</h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/70">
                      {p.city ? <span>{p.city}</span> : null}
                      {p.tags?.length ? (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="line-clamp-1">{p.tags.join(" · ")}</span>
                        </>
                      ) : null}
                    </div>

                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/80">
                      {p.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.links?.website ? <IconLink href={p.links.website} label="Website" /> : null}
                      {p.links?.facebook ? <IconLink href={p.links.facebook} label="Facebook" /> : null}
                      {p.links?.instagram ? <IconLink href={p.links.instagram} label="Instagram" /> : null}
                      {p.links?.youtube ? <IconLink href={p.links.youtube} label="YouTube" /> : null}
                      {p.links?.tiktok ? <IconLink href={p.links.tiktok} label="TikTok" /> : null}
                      {p.links?.spotify ? <IconLink href={p.links.spotify} label="Spotify" /> : null}

                      {p.links?.contact ? (
                        /^\/|^#/.test(p.links.contact) ? (
                          <Link
                            href={p.links.contact}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                            aria-label="Contact"
                            title="Contact"
                          >
                            <span className="h-2 w-2 rounded-full bg-white/50" />
                            Contact
                          </Link>
                        ) : (
                          <IconLink href={p.links.contact} label="Contact" />
                        )
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="text-xs text-white/55">Linkuri oficiale & demo</div>

                      {ytId ? (
                        <button
                          onClick={() => setYt({ open: true, title: p.name, id: ytId })}
                          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                          type="button"
                        >
                          Vezi video
                        </button>
                      ) : (
                        <span className="text-xs text-white/40">—</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* YT MODAL */}
      {yt.open && yt.id ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="YouTube preview"
          onClick={() => setYt({ open: false })}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="text-sm font-semibold text-white/90">
                {yt.title ? `Preview: ${yt.title}` : "Preview"}
              </div>
              <button
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                onClick={() => setYt({ open: false })}
                type="button"
              >
                Închide
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${yt.id}?autoplay=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
