import Image from "next/image";

import { PROJEKTE, type Projekt } from "@/content/projekte";

/** Breite der Bildspalte, damit next/image nicht zu grosse Dateien ausliefert. */
const SIZES_HALB = "(min-width: 1280px) 516px, (min-width: 768px) 46vw, 100vw";
const SIZES_VOLL = "(min-width: 1280px) 1088px, (min-width: 768px) 92vw, 100vw";

function Rahmen({
  projekt,
  sizes,
}: {
  projekt: Projekt;
  sizes: string;
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
      {/*
        Ohne fill und ohne feste Hoehe: das Bild behaelt sein eigenes
        Seitenverhaeltnis, 3:2 und 3:1 laufen beide ohne Beschnitt.
      */}
      <Image
        src={projekt.bild}
        alt={projekt.alt}
        sizes={sizes}
        placeholder="blur"
        className="h-auto w-full"
      />
    </div>
  );
}

function Text({ projekt }: { projekt: Projekt }) {
  return (
    <div className={projekt.breit ? "max-w-3xl" : undefined}>
      <p className="text-sm tracking-[0.18em] text-muted uppercase">
        {projekt.untertitel}
      </p>
      <h3 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold tracking-[-0.02em] text-balance">
        {projekt.titel}
      </h3>
      <p className="mt-4 max-w-[52ch] text-[clamp(0.95rem,1.3vw,1.125rem)] text-pretty text-muted leading-relaxed">
        {projekt.beschreibung}
      </p>
      <ul className="mt-7 flex flex-wrap gap-2">
        {projekt.technologien.map((technologie) => (
          <li
            key={technologie}
            className="rounded-sm border border-white/12 bg-white/[0.06] px-3 py-1.5 text-sm tracking-[0.02em] text-muted"
          >
            {technologie}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projekte() {
  return (
    <section
      id="projekte"
      className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-12 md:px-24 md:py-32"
    >
      <h2 className="sr-only">Projekte</h2>

      <div className="flex flex-col gap-24 md:gap-36">
        {PROJEKTE.map((projekt, index) =>
          projekt.breit ? (
            <article key={projekt.slug} className="reveal flex flex-col gap-8">
              <Rahmen projekt={projekt} sizes={SIZES_VOLL} />
              <Text projekt={projekt} />
            </article>
          ) : (
            <article
              key={projekt.slug}
              className="reveal grid gap-8 md:grid-cols-2 md:items-center md:gap-14"
            >
              {/* Ab md wechselt die Bildspalte die Seite, gestapelt steht das Bild immer oben. */}
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <Rahmen projekt={projekt} sizes={SIZES_HALB} />
              </div>
              <Text projekt={projekt} />
            </article>
          ),
        )}
      </div>
    </section>
  );
}
