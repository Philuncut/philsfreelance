import type { StaticImageData } from "next/image";

import uncuttvApp from "@/public/projekte/uncuttv-app.png";
import uncuttvShop from "@/public/projekte/uncuttv-shop.png";
import phils from "@/public/projekte/phils.png";
import uncuttvSocial from "@/public/projekte/uncuttv-social.png";
import ventrha from "@/public/projekte/ventrha.png";
import dubtrix from "@/public/projekte/dubtrix.png";

export type Projekt = {
  slug: string;
  titel: string;
  untertitel: string;
  beschreibung: string;
  technologien: string[];
  bild: StaticImageData;
  alt: string;
  /** Sehr breite Aufnahmen (Dubtrix, 3:1) bekommen einen Block ueber die volle Breite. */
  breit?: boolean;
};

// PLATZHALTER: beschreibung und technologien werden noch ersetzt.
const PLATZHALTER =
  "Platzhalter. Hier stehen zwei bis drei Sätze zum Projekt: worum es ging, was gebaut wurde und woran die Arbeit gemessen wurde. Der Text folgt.";

export const PROJEKTE: Projekt[] = [
  {
    slug: "phils",
    titel: "phils.at",
    untertitel: "Restaurant-Website mit Bestellsystem",
    beschreibung: PLATZHALTER,
    technologien: ["Next.js", "React", "TypeScript", "Stripe"],
    bild: phils,
    alt: "Startseite von phils.at mit Speisekarte und Bestellfunktion",
  },
  {
    slug: "uncuttv-app",
    titel: "uncuttv.app",
    untertitel: "Streaming-Plattform",
    beschreibung: PLATZHALTER,
    technologien: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    bild: uncuttvApp,
    alt: "Filmdetailseite der Streaming-Plattform uncuttv.app mit Abspielen-Schaltfläche und Beschreibung",
  },
  {
    slug: "dubtrix",
    titel: "Dubtrix",
    untertitel: "ADR-Software",
    beschreibung: PLATZHALTER,
    technologien: ["Electron", "TypeScript", "Cubase MMC", "Timecode"],
    bild: dubtrix,
    alt: "Dubtrix neben der Schnittsoftware, mit Timecode, Cue-Verwaltung und Dialogbuch",
    breit: true,
  },
  {
    slug: "uncuttv-social",
    titel: "UncutTV Social",
    untertitel: "Videoplattform mit eigenem Server",
    beschreibung: PLATZHALTER,
    technologien: ["Next.js", "Node.js", "TypeScript", "FFmpeg"],
    bild: uncuttvSocial,
    alt: "Oberfläche der Videoplattform UncutTV Social",
  },
  {
    slug: "ventrha",
    titel: "VENTRHA",
    untertitel: "Versandautomatisierung",
    beschreibung: PLATZHALTER,
    technologien: ["Next.js", "TypeScript", "Node.js", "Carrier-APIs"],
    bild: ventrha,
    alt: "Startseite von VENTRHA mit der Zeile Versand neu gedacht",
  },
  {
    slug: "uncuttv-shop",
    titel: "uncuttv.at",
    untertitel: "Shop mit Händlerportal",
    beschreibung: PLATZHALTER,
    technologien: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    bild: uncuttvShop,
    alt: "Shop-Oberfläche von uncuttv.at",
  },
];
