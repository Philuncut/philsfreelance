"use client";

import { useEffect, useState } from "react";

/*
 * Einzige Client-Komponente der Kontaktsektion. Sie schickt die Felder per
 * fetch an die API-Route; die Seite wird dabei nicht neu geladen.
 */

const FELD = `
  w-full rounded-sm border border-[var(--hairline)] bg-white/[0.04] px-4 py-3
  text-foreground placeholder:text-muted/60
  transition-colors duration-200 hover:border-foreground/60
  focus:border-foreground focus:outline-none
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
`;

const BESCHRIFTUNG = "mb-2 block text-sm tracking-[0.06em] text-muted uppercase";

/** Einziges Gruen der Seite, nur fuer die Bestaetigung. */
const GRUEN = "#5cd68a";

/*
 * blendetAus liegt zwischen sendet und fertig: das Formular ist noch montiert
 * und faehrt aus. Ohne diesen Zwischenschritt waere es schlagartig weg und die
 * Bestaetigung koennte nur einblenden, nicht ueberblenden.
 */
type Zustand =
  | { art: "ruht" }
  | { art: "sendet" }
  | { art: "blendetAus" }
  | { art: "fertig" }
  | { art: "fehler"; text: string };

/*
 * Muss zur Dauer der Klasse duration-300 unten passen, mit etwas Zuschlag.
 * Der Wert darf dort nicht eingesetzt werden: Tailwind liest Klassennamen aus
 * dem Quelltext und sieht zusammengebaute Namen nicht.
 */
const AUSBLENDEN_MS = 340;

export function KontaktFormular() {
  const [zustand, setZustand] = useState<Zustand>({ art: "ruht" });

  useEffect(() => {
    if (zustand.art !== "blendetAus") return;
    const zeitgeber = setTimeout(
      () => setZustand({ art: "fertig" }),
      AUSBLENDEN_MS,
    );
    return () => clearTimeout(zeitgeber);
  }, [zustand.art]);

  async function absenden(ereignis: React.FormEvent<HTMLFormElement>) {
    ereignis.preventDefault();
    if (zustand.art === "sendet") return;

    const daten = Object.fromEntries(new FormData(ereignis.currentTarget));
    setZustand({ art: "sendet" });

    try {
      const antwort = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daten),
      });
      const inhalt = await antwort.json().catch(() => ({}));

      if (!antwort.ok || !inhalt.ok) {
        // Das Formular bleibt stehen, samt allem, was eingetippt wurde.
        setZustand({
          art: "fehler",
          text:
            typeof inhalt.fehler === "string"
              ? inhalt.fehler
              : "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal.",
        });
        return;
      }

      setZustand({ art: "blendetAus" });
    } catch {
      setZustand({
        art: "fehler",
        text: "Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.",
      });
    }
  }

  // Beim Zurueckschalten wird das Formular neu montiert und ist damit leer.
  if (zustand.art === "fertig") {
    return (
      <div
        role="status"
        className="animate-hero-rise flex flex-col items-center py-6 text-center"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden
          className="shrink-0"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke={GRUEN}
            strokeWidth="2"
            strokeOpacity="0.55"
          />
          <path
            d="M14.5 24.5 21 31l12.5-13.5"
            stroke={GRUEN}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="mt-6 text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-[-0.02em] text-foreground">
          Nachricht gesendet.
        </p>

        <p className="mt-3 max-w-[38ch] text-pretty text-muted leading-relaxed">
          Danke, Ihre Nachricht ist angekommen. Ich melde mich innerhalb eines
          Werktags.
        </p>

        <button
          type="button"
          onClick={() => setZustand({ art: "ruht" })}
          className="
            mt-8 rounded-sm text-sm text-muted underline
            decoration-[var(--hairline)] underline-offset-4
            transition-colors duration-200 hover:text-foreground hover:decoration-foreground
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
          "
        >
          Weitere Nachricht schreiben
        </button>
      </div>
    );
  }

  const sendet = zustand.art === "sendet";
  const geht = zustand.art === "blendetAus";

  return (
    <form
      onSubmit={absenden}
      noValidate
      // Nur Deckkraft und Verschiebung, damit nichts umbricht waehrend es geht.
      className={`space-y-6 transition-[opacity,transform] duration-300 ease-[var(--ease-hero)] ${
        geht ? "pointer-events-none -translate-y-2 opacity-0" : ""
      }`}
    >
      <div>
        <label htmlFor="name" className={BESCHRIFTUNG}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          className={FELD}
        />
      </div>

      <div>
        <label htmlFor="email" className={BESCHRIFTUNG}>
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={FELD}
        />
      </div>

      <div>
        <label htmlFor="firma" className={BESCHRIFTUNG}>
          Firma <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="firma"
          name="firma"
          type="text"
          maxLength={100}
          autoComplete="organization"
          className={FELD}
        />
      </div>

      <div>
        <label htmlFor="nachricht" className={BESCHRIFTUNG}>
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          required
          rows={6}
          maxLength={5000}
          className={`${FELD} resize-y`}
        />
      </div>

      {/*
        Honigtopf. Fuer Menschen unerreichbar, aber nicht per display:none
        versteckt, weil manche Automaten genau darauf achten. Automaten fuellen
        jedes Feld aus, die Route weist die Zusendung dann ab.
      */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0 -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={sendet || geht}
        className="
          inline-flex min-h-12 items-center justify-center rounded-sm border border-transparent
          bg-accent px-8 py-3 font-semibold tracking-[0.03em] text-background
          transition-colors duration-200 hover:bg-white
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
          disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent
        "
      >
        {sendet ? "Wird gesendet …" : "Nachricht senden"}
      </button>

      {/*
        Nur noch der Fehlerfall: der Erfolg hat einen eigenen Block. role=alert
        meldet ihn Vorleseprogrammen, ohne dass sich der Fokus bewegt.
      */}
      <p role="alert" aria-live="assertive" className="min-h-6 text-sm leading-relaxed">
        {zustand.art === "fehler" && (
          <span className="text-[#ff9d9d]">{zustand.text}</span>
        )}
      </p>
    </form>
  );
}
