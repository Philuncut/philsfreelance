import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

const EMPFAENGER = "kontakt@philippgasser.at";
const ABSENDER = {
  name: "Kontaktformular philippgasser.at",
  address: "kontakt@philippgasser.at",
} as const;

const VARIABLEN = [
  "BREVO_SMTP_HOST",
  "BREVO_SMTP_PORT",
  "BREVO_SMTP_USER",
  "BREVO_SMTP_PASSWORD",
] as const;

/*
 * Ratenbegrenzung im Arbeitsspeicher: fuenf Zusendungen je IP in zehn Minuten.
 * Sie gilt pro laufendem Prozess und faellt beim Neustart weg. Fuer eine Seite
 * auf einem Server reicht das; laeuft die Seite spaeter auf mehreren
 * Instanzen, gehoert der Zaehler in einen gemeinsamen Speicher.
 */
const FENSTER_MS = 10 * 60 * 1000;
const MAX_PRO_FENSTER = 5;
const zugriffe = new Map<string, number[]>();

function zuOft(ip: string) {
  const jetzt = Date.now();
  const bisher = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);

  if (bisher.length >= MAX_PRO_FENSTER) {
    zugriffe.set(ip, bisher);
    return true;
  }

  bisher.push(jetzt);
  zugriffe.set(ip, bisher);

  // Aufraeumen, damit die Map nicht unbegrenzt waechst.
  if (zugriffe.size > 500) {
    for (const [schluessel, zeiten] of zugriffe) {
      if (zeiten.every((t) => jetzt - t >= FENSTER_MS)) zugriffe.delete(schluessel);
    }
  }

  return false;
}

function ipVon(anfrage: NextRequest) {
  const weitergeleitet = anfrage.headers.get("x-forwarded-for");
  if (weitergeleitet) return weitergeleitet.split(",")[0].trim();
  return anfrage.headers.get("x-real-ip") ?? "unbekannt";
}

/** Zeilenumbrueche raus: sie liessen sich sonst in Kopfzeilen schmuggeln. */
function einzeilig(wert: string) {
  return wert.replace(/[\r\n]+/g, " ").trim();
}

function text(wert: unknown) {
  return typeof wert === "string" ? wert.trim() : "";
}

const EMAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function pruefen(daten: Record<string, unknown>) {
  const name = text(daten.name);
  const email = text(daten.email);
  const firma = text(daten.firma);
  const nachricht = text(daten.nachricht);

  if (name.length < 2 || name.length > 100) return { fehler: "Bitte einen Namen mit 2 bis 100 Zeichen angeben." } as const;
  if (email.length > 200 || !EMAIL_MUSTER.test(email)) return { fehler: "Bitte eine gültige E-Mail-Adresse angeben." } as const;
  if (firma.length > 100) return { fehler: "Der Firmenname ist zu lang." } as const;
  if (nachricht.length < 10 || nachricht.length > 5000) return { fehler: "Bitte eine Nachricht mit 10 bis 5000 Zeichen schreiben." } as const;

  return { name, email, firma, nachricht } as const;
}

function antwort(status: number, koerper: Record<string, unknown>) {
  return Response.json(koerper, { status });
}

export async function POST(anfrage: NextRequest) {
  const fehlend = VARIABLEN.filter((v) => !process.env[v]);
  if (fehlend.length > 0) {
    // Deutlich im Serverlog, damit eine fehlende Konfiguration nicht als
    // stiller Ausfall durchgeht.
    console.error(`Kontaktformular: Umgebungsvariablen fehlen: ${fehlend.join(", ")}`);
    return antwort(500, {
      ok: false,
      fehler: "Der Versand ist nicht konfiguriert. Bitte schreiben Sie mir direkt an kontakt@philippgasser.at.",
    });
  }

  let daten: Record<string, unknown>;
  try {
    daten = await anfrage.json();
  } catch {
    return antwort(400, { ok: false, fehler: "Die Anfrage konnte nicht gelesen werden." });
  }

  // Honigtopf: ein fuer Menschen unsichtbares Feld. Ist es gefuellt, war es
  // ein Automat. Nach aussen sieht das aus wie ein Erfolg, damit der Automat
  // nichts dazulernt.
  if (text(daten.website) !== "") {
    return antwort(200, { ok: true });
  }

  if (zuOft(ipVon(anfrage))) {
    return antwort(429, {
      ok: false,
      fehler: "Zu viele Zusendungen in kurzer Zeit. Bitte versuchen Sie es später noch einmal.",
    });
  }

  const geprueft = pruefen(daten);
  if ("fehler" in geprueft) return antwort(400, { ok: false, fehler: geprueft.fehler });

  const { name, email, firma, nachricht } = geprueft;

  const versand = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    // Port 587 spricht zuerst im Klartext und hebt dann auf TLS ab.
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASSWORD,
    },
  });

  try {
    await versand.sendMail({
      from: ABSENDER,
      to: EMPFAENGER,
      // Damit eine Antwort direkt beim Absender landet und nicht bei mir selbst.
      replyTo: { name: einzeilig(name), address: email },
      subject: `Kontaktformular: ${einzeilig(name)}`,
      text: [
        `Name: ${einzeilig(name)}`,
        `E-Mail: ${email}`,
        `Firma: ${firma ? einzeilig(firma) : "—"}`,
        "",
        nachricht,
      ].join("\n"),
    });
  } catch (fehler) {
    console.error("Kontaktformular: Versand fehlgeschlagen", fehler);
    return antwort(502, {
      ok: false,
      fehler: "Die Nachricht konnte nicht zugestellt werden. Bitte schreiben Sie mir direkt an kontakt@philippgasser.at.",
    });
  }

  return antwort(200, { ok: true });
}
