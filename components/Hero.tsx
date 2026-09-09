import Image from "next/image";
import heroImage from "@/public/hero.png";

/**
 * Zwei Layouts, ein DOM:
 * - unter 768px zweigeteilt, Bild oben, Text darunter auf dunklem Grund
 * - ab 768px vollflächiges Hintergrundbild mit Verlauf, Text darüber
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
      {/* Bildbereich: mobil obere Bildschirmhälfte, ab md vollflächig hinter dem Text */}
      <div className="relative -z-20 h-[48svh] w-full shrink-0 md:absolute md:inset-0 md:h-auto">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[18%_28%] animate-hero-fade md:object-[30%_center]"
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
            href="mailto:office@uncuttv.at"
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
