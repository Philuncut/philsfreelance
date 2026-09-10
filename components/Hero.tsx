import Image from "next/image";
import heroImage from "@/public/hero.png";
import unterschrift from "@/public/unterschrift.png";

/*
 * Schleier der Kopfzeile, unabhaengig vom Verlauf des Hero-Bildes. Er folgt
 * einem Smoothstep: oben eine Weile fast unveraendert, damit die Wortmarke
 * durchgehend Halt hat, und am Ende mit Steigung null auslaufend, damit keine
 * Kante stehen bleibt.
 */
const KOPF_VERLAUF = `linear-gradient(
    to bottom,
    rgb(5 7 10 / 0.45) 0%,
    rgb(5 7 10 / 0.44) 9%,
    rgb(5 7 10 / 0.408) 19%,
    rgb(5 7 10 / 0.347) 31%,
    rgb(5 7 10 / 0.22) 51%,
    rgb(5 7 10 / 0.1) 69%,
    rgb(5 7 10 / 0.04) 82%,
    rgb(5 7 10 / 0.009) 91%,
    rgb(5 7 10 / 0) 100%
  )`;

/**
 * Zwei Layouts, ein DOM:
 * - unter 768px zweigeteilt, Bild oben, Text darunter auf dunklem Grund
 * - ab 768px vollflächiges Hintergrundbild mit Verlauf, Text darüber
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
      {/*
        Eigene Kopfzeile ueber dem Bild. Sie steht ausserhalb des Bildcontainers
        und damit ausserhalb des Heranfahrens: die Wortmarke bleibt still,
        waehrend das Bild hinter ihr skaliert. Sie sitzt rechts oben ueber dem
        Bildschirm im Foto, auf denselben Raendern wie das uebrige Layout.
        Ab md haengt die linke Kante an 38vw plus 40 Pixeln statt am rechten
        Rand: der Bildausschnitt verschiebt sich mit der Fensterbreite, ein
        fester rechter Abstand schoebe die Marke sonst auf die Haftnotizen an
        der Wand. Deshalb dort auch kein seitlicher Innenabstand, sonst kaeme
        er noch hinzu. Unter md bleibt sie rechtsbuendig, 38 Prozent plus ihre
        Breite waeren auf dem Handy breiter als der Schirm.
      */}
      <header className="absolute inset-x-0 top-0 z-10">
        {/* Traegt die Wortmarke auf jedem Untergrund, auch auf hellen Stellen des Fotos */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(250px,34svh,420px)]"
          style={{ background: KOPF_VERLAUF }}
        />

        {/*
          Die Breite waechst mit 72vw unter md und 43vw darueber.

          Der Abstand nach oben trennt die beiden Layouts: unter md sitzt die
          Wortmarke bei 34,5svh, also bei 72 Prozent des 48svh hohen
          Bildbereichs. Oben laege sie dort ueber dem Gesicht, unten liegt sie
          auf der dunklen Tischflaeche. Der Wert haengt an svh und nicht an
          Pixeln, damit er dem Bildbereich folgt.

          Ab md ist der Abstand um 40 Pixel gekuerzt, die Untergrenze von 20
          Pixeln faengt das untere Ende ab, wo 4,9vw minus 40 gegen null liefe.

          max-w-full faengt Geraete unter 380px ab, wo die 280 Pixel plus
          Raender breiter waeren als der Schirm.
        */}
        <div className="relative px-6 pt-[34.5svh] sm:px-12 md:px-0 md:pt-[clamp(20px,4.9vw_-_40px,31px)]">
          <Image
            src={unterschrift}
            alt="Philipp Gasser, Full-Stack-Entwickler, Tirol"
            sizes="(min-width: 1210px) 620px, (min-width: 768px) 520px, 280px"
            className="animate-signature ml-auto h-auto md:ml-[calc(38vw_+_40px)] w-[clamp(280px,72vw,520px)] max-w-full [animation-delay:300ms] md:w-[clamp(520px,43vw,620px)]"
          />
        </div>
      </header>

      {/* Bildbereich: mobil obere Bildschirmhälfte, ab md vollflächig hinter dem Text */}
      {/* overflow-hidden faengt die 6 Prozent Ueberstand des Heranfahrens ab */}
      <div className="relative -z-20 h-[48svh] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:h-auto">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[18%_28%] animate-hero-image md:object-[30%_center]"
        />

        {/* Weicher Auslauf ins Dunkle, nur im geteilten Layout */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 md:hidden"
          style={{
            background: `linear-gradient(
              to bottom,
              rgb(5 7 10 / 0) 0%,
              rgb(5 7 10 / 0.18) 32%,
              rgb(5 7 10 / 0.62) 66%,
              rgb(5 7 10 / 0.94) 88%,
              rgb(5 7 10 / 1) 100%
            )`,
          }}
        />
      </div>

      {/* Vierstufiger Verlauf über dem Vollbild, unten deutlich dunkler, plus schwache Kante von links */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgb(5 7 10 / 0.30) 0%,
              rgb(5 7 10 / 0.48) 38%,
              rgb(5 7 10 / 0.80) 72%,
              rgb(5 7 10 / 0.96) 100%
            ),
            linear-gradient(to right, rgb(5 7 10 / 0.55), rgb(5 7 10 / 0) 65%)
          `,
        }}
      />

      {/*
        pt-[46svh] ab md hält den Textblock unter der Person: das Bild wird über
        die Höhe skaliert, Kinn und Hand enden bei rund 43svh.
      */}
      <div className="max-w-4xl px-6 pt-10 pb-16 sm:px-12 md:px-24 md:pt-[46svh] md:pb-[10svh]">
        <h1 className="text-[clamp(2.5rem,7.2vw,6rem)] text-balance font-bold tracking-[-0.03em] leading-[1.04] animate-hero-rise [animation-delay:120ms]">
          Ich baue Software, die läuft.
        </h1>

        <p className="mt-6 max-w-[46ch] text-[clamp(0.95rem,1.5vw,1.25rem)] text-pretty text-muted leading-relaxed tracking-[0.02em] animate-hero-rise [animation-delay:260ms] md:max-w-[58ch]">
          React, Next.js, Electron, Flutter und vieles mehr. Über 20 Jahre
          Erfahrung in Web, Grafik und Bewegtbild.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-hero-rise [animation-delay:400ms]">
          <a
            href="#kontakt"
            className="
              inline-flex min-h-12 items-center justify-center rounded-sm border border-transparent
              bg-accent px-8 py-3 font-semibold tracking-[0.03em] text-background
              transition-colors duration-200 hover:bg-white
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
            "
          >
            Kontakt aufnehmen
          </a>
          <a
            href="#projekte"
            className="
              inline-flex min-h-12 items-center justify-center rounded-sm border
              border-[var(--hairline)] px-8 py-3 font-semibold tracking-[0.03em] text-foreground
              transition-colors duration-200 hover:border-foreground hover:bg-white/8
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
            "
          >
            Projekte ansehen
          </a>
        </div>
      </div>
    </section>
  );
}
