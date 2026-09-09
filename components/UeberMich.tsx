import Image from "next/image";

import foto from "@/public/ueber-mich.jpg";

/**
 * Eigene Sektion mit ruhigem Hintergrund. Der Code-Teppich der Projektsektion
 * endet an deren Rand und laeuft hier bewusst nicht weiter.
 */
export function UeberMich() {
  return (
    <section
      id="ueber-mich"
      className="relative bg-background px-6 py-24 sm:px-12 md:px-24 md:py-32"
    >
      <div className="reveal mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-start md:gap-16">
        <div className="overflow-hidden rounded-sm border border-white/10">
          <Image
            src={foto}
            alt="Philipp Gassner am Filmset, mit einer Fernsteuerung in der Hand"
            sizes="(min-width: 768px) 288px, 100vw"
            placeholder="blur"
            className="h-auto w-full"
          />
        </div>

        <div>
          <h2 className="text-sm tracking-[0.18em] text-muted uppercase">
            Über mich
          </h2>
          {/*
            50ch, nicht 65ch: die Einheit ch misst die Breite der Null, die in
            dieser Schrift deutlich breiter ist als der Schnitt der Buchstaben.
            Gemessen ergibt das rund 65 tatsaechliche Zeichen pro Zeile.
          */}
          <div className="mt-6 max-w-[50ch] space-y-6 text-[clamp(0.95rem,1.4vw,1.15rem)] text-pretty text-muted leading-relaxed">
            <p>
              Ich bin an Filmsets gestanden und habe zugesehen, wie Abläufe
              unter Zeitdruck tatsächlich funktionieren. Das prägt bis heute,
              wie ich entwickle: nicht nur, ob eine Funktion technisch stimmt,
              sondern ob sie im Arbeitsalltag trägt. Software wird von Menschen
              benutzt, die etwas anderes zu tun haben, als sich mit Software zu
              beschäftigen.
            </p>
            <p>
              Und weil ich meine Systeme selbst betreibe, entwickle ich anders:
              Ich suche die Ursache, statt das Symptom zu kaschieren, und ich
              treffe Entscheidungen mit Blick darauf, wie sie sich in zwei
              Jahren anfühlen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
