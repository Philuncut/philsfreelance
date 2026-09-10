"use client";

import { useState } from "react";

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

type Zustand =
  | { art: "ruht" }
  | { art: "sendet" }
  | { art: "fertig" }
  | { art: "fehler"; text: string };

export function KontaktFormular() {
  const [zustand, setZustand] = useState<Zustand>({ art: "ruht" });

  async function absenden(ereignis: React.FormEvent<HTMLFormElement>) {
    ereignis.preventDefault();
    if (zustand.art === "sendet") return;

    const formular = ereignis.currentTarget;
    const daten = Object.fromEntries(new FormData(formular));
    setZustand({ art: "sendet" });

    try {
      const antwort = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daten),
      });
      const inhalt = await antwort.json().catch(() => ({}));

      if (!antwort.ok || !inhalt.ok) {
        setZustand({
          art: "fehler",
          text:
            typeof inhalt.fehler === "string"
              ? inhalt.fehler
              : "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später noch einmal.",
        });
        return;
      }

      formular.reset();
      setZustand({ art: "fertig" });
    } catch {
      setZustand({
        art: "fehler",
        text: "Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.",
      });
    }
  }

  const sendet = zustand.art === "sendet";

  return (
    <form onSubmit={absenden} noValidate className="space-y-6">
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
        disabled={sendet}
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
        aria-live: Vorleseprogramme geben die Rueckmeldung aus, ohne dass sich
        der Fokus bewegt. role=status meldet ruhig, role=alert unterbricht.
      */}
      <p
        role={zustand.art === "fehler" ? "alert" : "status"}
        aria-live={zustand.art === "fehler" ? "assertive" : "polite"}
        className="min-h-6 text-sm leading-relaxed"
      >
        {zustand.art === "fertig" && (
          <span className="text-foreground">
            Danke, Ihre Nachricht ist angekommen. Ich melde mich innerhalb eines
            Werktags.
          </span>
        )}
        {zustand.art === "fehler" && (
          <span className="text-[#ff9d9d]">{zustand.text}</span>
        )}
      </p>
    </form>
  );
}
