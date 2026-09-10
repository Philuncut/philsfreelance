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

export const PROJEKTE: Projekt[] = [
  {
    slug: "phils",
    titel: "phils.at",
    untertitel: "Restaurant-Website mit Bestellsystem",
    beschreibung:
      "Website und Bestellsystem für ein Restaurant in Innsbruck. Gäste bestellen zum Abholen, zur Lieferung oder direkt am Tisch über einen QR-Code, der den Tisch automatisch zuordnet, Nachbestellungen laufen über dieselbe Sitzung und bezahlt wird über Stripe. Bons gehen getrennt an Küche und Bar, Öffnungszeiten, Ruhetage und Saisonwechsel steuert die Datenbank selbst, und das Personal arbeitet über eine eigene Tablet-App.",
    technologien: ["Next.js", "React", "TypeScript", "PostgreSQL", "Stripe"],
    bild: phils,
    alt: "Startseite von phils.at mit Speisekarte und Bestellfunktion",
  },
  {
    slug: "uncuttv-app",
    titel: "uncuttv.app",
    untertitel: "Streaming-Plattform",
    beschreibung:
      "Streaming-Plattform mit Abo, Altersverifikation und Geoblocking, dazu Apps für Android, Fire TV und LG webOS. Rechteinhaber reichen ihre Filme über ein eigenes Portal ein und werden monatlich nach tatsächlicher Wiedergabezeit ausgezahlt. Die Abrechnung läuft über ein Journal, das jede Sitzung nachvollziehbar festhält.",
    technologien: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    bild: uncuttvApp,
    alt: "Filmdetailseite der Streaming-Plattform uncuttv.app mit Abspielen-Schaltfläche und Beschreibung",
  },
  {
    slug: "dubtrix",
    titel: "Dubtrix",
    untertitel: "ADR-Software",
    beschreibung:
      "Werkzeug für Synchronstudios. Bild, laufendes Rythmoband und Regieansicht liegen auf getrennten Bildschirmen und bleiben über Stunden frame-genau zusammen. Die Kopplung an die Audio-Workstation läuft über ein eigenes VST3-Plugin. Ein Dialogbuch, das früher vier Tage Handarbeit war, ist jetzt in einer Viertelstunde zugeordnet.",
    technologien: ["Electron", "TypeScript", "Cubase MMC", "Timecode"],
    bild: dubtrix,
    alt: "Dubtrix neben der Schnittsoftware, mit Timecode, Cue-Verwaltung und Dialogbuch",
    breit: true,
  },
  {
    slug: "uncuttv-social",
    titel: "UncutTV Social",
    untertitel: "Videoplattform mit eigenem Server",
    beschreibung:
      "Eigene Videoplattform für Interviews, Podcasts und Livestreams, aufgebaut nachdem externe Anbieter keine Option mehr waren. Die komplette Kette läuft auf einem selbst administrierten Server: Ingest über nginx-RTMP, Transkodierung mit FFmpeg, Auslieferung als HLS. Ein Konto gilt für Shop und Plattform.",
    technologien: [
      "Next.js",
      "React",
      "TypeScript",
      "Ubuntu",
      "nginx-RTMP",
      "FFmpeg",
      "HLS",
    ],
    bild: uncuttvSocial,
    alt: "Oberfläche der Videoplattform UncutTV Social",
  },
  {
    slug: "ventrha",
    titel: "VENTRHA",
    untertitel: "Versandautomatisierung",
    beschreibung:
      "Desktop-Anwendung, die den Versand eines Onlineshops vollständig übernimmt: Bestellung holen, Etikett beim Dienstleister erzeugen, drucken, Status zurückschreiben. Zollformulare entstehen automatisch, neue Shop- oder Versandanbieter kommen als Adapter dazu. Läuft täglich im Lager.",
    technologien: [
      "Electron",
      "React",
      "TypeScript",
      "Supabase",
      "ESC/POS",
      "ZPL",
    ],
    bild: ventrha,
    alt: "Startseite von VENTRHA mit der Zeile Versand neu gedacht",
  },
  {
    slug: "uncuttv-shop",
    titel: "uncuttv.at",
    untertitel: "Shop mit Händlerportal",
    beschreibung:
      "Onlineshop mit angeschlossenem Händlerportal. Drei Kundengruppen, drei verschiedene Steuerwege: Endkunden brutto, österreichische Händler netto, EU-Händler im Reverse-Charge-Verfahren. Rechnungen, Gutscheine und Versandzonen laufen automatisch, das Frontend ist von WooCommerce entkoppelt.",
    technologien: [
      "Next.js",
      "React",
      "TypeScript",
      "WooCommerce",
      "Stripe",
      "PayPal",
    ],
    bild: uncuttvShop,
    alt: "Shop-Oberfläche von uncuttv.at",
  },
];
