import Image from "next/image";

import foto from "@/public/ueber-mich.jpg";

/*
 * Verlauf wie im Hero: senkrecht von offen nach deckend, dazu einer von links.
 * Der linke traegt die Schrift, der senkrechte schliesst unten nahtlos an den
 * Textbereich an. Ohne den linken muesste der senkrechte so frueh dunkeln,
 * dass das Fernsteuerungsgeraet im unteren Bilddrittel verschwindet.
 */
const VERLAUF = `linear-gradient(
    to bottom,
    rgb(5 7 10 / 0) 0%,
    rgb(5 7 10 / 0.12) 45%,
    rgb(5 7 10 / 0.42) 76%,
    rgb(5 7 10 / 0.90) 94%,
    rgb(5 7 10 / 1) 100%
  ),
  linear-gradient(
    to right,
    rgb(5 7 10 / 0.88) 0%,
    rgb(5 7 10 / 0.62) 32%,
    rgb(5 7 10 / 0.18) 55%,
    rgb(5 7 10 / 0) 70%
  )`;

const ABSAETZE = [
  "Angefangen habe ich vor über zwanzig Jahren mit Webseiten, Photoshop und After Effects, ausgebildet an der Bayerischen Akademie für Fernsehen. Danach kamen ein Filmlabel, ein Restaurant und die Erkenntnis, dass es für die meisten Probleme, die ich hatte, keine passende Software gab.",
  "Also habe ich sie gebaut. Eine Streaming-Plattform mit Abrechnung an Rechteinhaber. Ein Bestellsystem, weil das gekaufte nicht taugte. Eine Versandautomatisierung, weil das Etikettenkleben zu lange dauerte.",
  "Deshalb weiß ich, was hinter den Anforderungen steckt, wenn jemand von Steuerlogik, Ausschüttung oder Kassendruck spricht. Ich habe diese Prozesse selbst geführt, bevor ich sie programmiert habe.",
  "Ich bin an Filmsets gestanden und habe zugesehen, wie Abläufe unter Zeitdruck tatsächlich funktionieren. Das prägt bis heute, wie ich entwickle: nicht nur, ob eine Funktion technisch stimmt, sondern ob sie im Arbeitsalltag trägt. Software wird von Menschen benutzt, die etwas anderes zu tun haben, als sich mit Software zu beschäftigen.",
  "Und weil ich meine Systeme selbst betreibe, entwickle ich anders: Ich suche die Ursache, statt das Symptom zu kaschieren, und ich treffe Entscheidungen mit Blick darauf, wie sie sich in zwei Jahren anfühlen.",
];

/**
 * Eigene Sektion mit ruhigem Hintergrund. Der Code-Teppich der Projektsektion
 * endet an deren Rand und laeuft hier bewusst nicht weiter.
 */
export function UeberMich() {
  return (
    <section id="ueber-mich" className="bg-background">
      {/*
        Bild ueber die volle Breite. object-position 60% 45%: das Foto ist
        quadratisch, im breiten Banner sind senkrecht nur rund 44 Prozent davon
        zu sehen. 45 Prozent ist der Kompromiss, bei dem beide Gesichter im Bild
        bleiben und das Fernsteuerungsgeraet unten rechts noch sichtbar ist.
        Waagrecht 60 Prozent, damit das Geraet auf schmalen Schirmen nicht
        rechts herausfaellt.
      */}
      <div className="relative h-[55svh] w-full overflow-hidden md:h-[70svh]">
        <Image
          src={foto}
          alt="Zwei Personen an einem Drehort, eine von ihnen bedient ein Fernsteuerungsgerät"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[60%_45%]"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: VERLAUF }}
        />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-12 md:px-24 md:pb-16">
          <div className="reveal mx-auto w-full max-w-7xl">
            <p className="text-sm tracking-[0.18em] text-muted uppercase">
              Über mich
            </p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] text-balance leading-[1.08]">
              Ich bin kein reiner Entwickler.
            </h2>
          </div>
        </div>
      </div>

      {/* Direkt darunter, ohne Absatz zum Bild, gleiche Hintergrundfarbe. */}
      <div className="px-6 pt-12 pb-24 sm:px-12 md:px-24 md:pt-16 md:pb-32">
        {/*
          50ch statt 65ch: die Einheit ch misst die Breite der Null, die in
          dieser Schrift deutlich breiter ist als der Schnitt der Buchstaben.
          Gemessen ergibt das rund 65 tatsaechliche Zeichen pro Zeile.
        */}
        <div className="reveal mx-auto max-w-[50ch] space-y-6 text-[clamp(0.95rem,1.4vw,1.15rem)] text-pretty text-muted leading-relaxed">
          {ABSAETZE.map((absatz, index) => (
            <p key={index}>{absatz}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
