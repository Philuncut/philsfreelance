import Image from "next/image";

import foto from "@/public/ueber-mich.jpg";

/*
 * Drei uebereinanderliegende Verlaeufe, alle in derselben Farbe rgb(5 7 10),
 * der Hintergrundfarbe von Projektsektion und Textteil. Sie multiplizieren
 * sich zu einer Deckkraft, die oben und unten exakt 1 erreicht, sonst bliebe
 * an der Kante eine Naht stehen.
 *
 * Warum drei statt einem: unten liegt der Verlauf ueber dunklem Wald, oben
 * ueber hellem Himmel. Derselbe Deckkraftverlauf hat dort die vierfache
 * Wirkung auf die Helligkeit, und das Auge findet jeden Knick. Der obere Weg
 * ist deshalb doppelt so lang wie der untere und aus zwei Kurven gebaut:
 *
 * DECKUNG OBEN faellt in den ersten 17 Prozent schnell von deckend auf null.
 * SCHLEIER OBEN legt darueber einen sehr flachen Auslauf ueber 58 Prozent.
 * DECKUNG UNTEN traegt die Schrift und schliesst an den Textteil an.
 *
 * Beide oberen Kurven folgen (1 - y)^n, also einem Ease-out: steil am Anfang,
 * und der Auslauf endet mit Steigung null statt in einem Knick. Genau dieser
 * Knick am Ende eines geraden Verlaufs ist die Kante, die man sieht. Die
 * Stopps sind aus der Kurve abgetastet, dicht wo sie sich biegt.
 *
 * Ein Verlauf von links waere hier falsch: er verdeckt genau die Crew, die
 * das Bild zeigen soll. Die Schrift sitzt tief genug, um allein von der
 * unteren Deckung getragen zu werden.
 */
const VERLAUF = `linear-gradient(
    to bottom,
    rgb(5 7 10 / 1) 0%,
    rgb(5 7 10 / 0.864) 1%,
    rgb(5 7 10 / 0.738) 2.1%,
    rgb(5 7 10 / 0.623) 3.1%,
    rgb(5 7 10 / 0.517) 4.2%,
    rgb(5 7 10 / 0.42) 5.3%,
    rgb(5 7 10 / 0.334) 6.4%,
    rgb(5 7 10 / 0.257) 7.5%,
    rgb(5 7 10 / 0.191) 8.7%,
    rgb(5 7 10 / 0.134) 9.9%,
    rgb(5 7 10 / 0.087) 11.2%,
    rgb(5 7 10 / 0.05) 12.5%,
    rgb(5 7 10 / 0.024) 14%,
    rgb(5 7 10 / 0.007) 15.5%,
    rgb(5 7 10 / 0) 17.4%
  ),
  linear-gradient(
    to bottom,
    rgb(5 7 10 / 0.55) 0%,
    rgb(5 7 10 / 0.441) 4.1%,
    rgb(5 7 10 / 0.344) 8.4%,
    rgb(5 7 10 / 0.259) 12.8%,
    rgb(5 7 10 / 0.187) 17.5%,
    rgb(5 7 10 / 0.126) 22.5%,
    rgb(5 7 10 / 0.077) 27.9%,
    rgb(5 7 10 / 0.04) 33.8%,
    rgb(5 7 10 / 0.015) 40.5%,
    rgb(5 7 10 / 0.002) 49%,
    rgb(5 7 10 / 0) 58%
  ),
  linear-gradient(
    to bottom,
    rgb(5 7 10 / 0) 38%,
    rgb(5 7 10 / 0.02) 42%,
    rgb(5 7 10 / 0.05) 45%,
    rgb(5 7 10 / 0.09) 47.5%,
    rgb(5 7 10 / 0.13) 50%,
    rgb(5 7 10 / 0.19) 53%,
    rgb(5 7 10 / 0.26) 56%,
    rgb(5 7 10 / 0.33) 59%,
    rgb(5 7 10 / 0.40) 62%,
    rgb(5 7 10 / 0.56) 70%,
    rgb(5 7 10 / 0.68) 76%,
    rgb(5 7 10 / 0.82) 84%,
    rgb(5 7 10 / 0.93) 92%,
    rgb(5 7 10 / 1) 100%
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
        overflow-hidden faengt die 6 Prozent Ueberstand des Heranfahrens ab.
        Ab 3xl, also 2000px, greift eine Klammer: je flacher das Fenster im
        Verhaeltnis zur Breite, desto weniger vom Bild bliebe senkrecht uebrig,
        bis die Oberkante die Gesichter auf Augenhoehe abschneidet. 35vw haelt
        rund die halbe Bildhoehe im Rahmen, 75svh bleibt die Untergrenze,
        92svh die Obergrenze, damit das Banner nie den Schirm ausfuellt.
      */}
      <div className="slow-zoom-frame relative h-[60svh] w-full overflow-hidden md:h-[75svh] 3xl:h-[clamp(75svh,35vw,92svh)]">
        {/*
          object-position 50% top. Das Foto ist 3:2, im breiten Banner sind
          senkrecht nur rund zwei Drittel davon zu sehen. Die Drohne haengt im
          obersten Zehntel, deshalb liegt der Ausschnitt buendig an der
          Oberkante und wird unten beschnitten, wo nur Boden und Kisten sind.
          Waagrecht mittig: auf einem Handy bleiben damit sowohl die Drohne
          links als auch die Person mit der Fernsteuerung rechts im Bild.
          origin-top sorgt dafuer, dass auch das Heranfahren die Oberkante
          stehen laesst und nur nach unten hin auslaeuft. slow-zoom haengt am
          Scrollstand statt an der Uhr, siehe globals.css.
        */}
        <Image
          src={foto}
          alt="Filmcrew an einem Drehort über einem Fluss, eine Person steuert eine Drohne"
          fill
          sizes="100vw"
          placeholder="blur"
          className="slow-zoom origin-top object-cover object-[50%_top]"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: VERLAUF }}
        />

        {/* Gleiche Raender wie der Hero, damit Auszeichnung und Ueberschrift auf derselben Kante sitzen */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-12 md:px-24 md:pb-20">
          <div className="reveal max-w-4xl">
            <p className="text-sm tracking-[0.18em] text-muted uppercase">
              Über mich
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5.6vw,4.5rem)] font-bold tracking-[-0.03em] text-balance leading-[1.04]">
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
