import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Fusszeile } from "@/components/Fusszeile";

export const metadata: Metadata = {
  title: "Impressum — Philipp Gasser",
  description:
    "Offenlegung nach § 5 E-Commerce-Gesetz und § 25 Mediengesetz.",
};

/**
 * Noch offene Angabe. Bewusst sichtbar und nicht als stiller Leerraum: ein
 * Impressum mit unbemerkter Luecke ist schlechter als eines, dem man die
 * Luecke ansieht.
 */
function Platzhalter({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-[#ff9d9d]/12 px-2 py-0.5 font-semibold text-[#ff9d9d]">
      PLATZHALTER: {children}
    </span>
  );
}

function Block({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className="border-t border-[var(--hairline)]/30 pt-8">
      <h2 className="text-sm tracking-[0.18em] text-muted uppercase">{titel}</h2>
      <div className="mt-4 space-y-2 text-[clamp(0.95rem,1.3vw,1.05rem)] text-pretty leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const LINK = `
  rounded-sm text-foreground underline decoration-[var(--hairline)] underline-offset-4
  transition-colors duration-200 hover:decoration-foreground
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
`;

export default function Impressum() {
  return (
    <>
      <main className="flex-1 px-6 pt-20 pb-24 sm:px-12 md:px-24 md:pt-28 md:pb-32">
        {/* Schmale Spalte, gleiche Zeilenlaenge wie der Fliesstext der Startseite */}
        <div className="mx-auto max-w-[68ch]">
          <header>
            <p className="text-sm tracking-[0.18em] text-muted uppercase">
              Offenlegung
            </p>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-balance leading-[1.08]">
              Impressum
            </h1>
            <p className="mt-6 text-[clamp(0.95rem,1.4vw,1.15rem)] text-pretty text-muted leading-relaxed">
              Angaben nach § 5 E-Commerce-Gesetz und § 25 Mediengesetz.
            </p>
          </header>

          <div className="mt-16 space-y-12 text-muted">
            <Block titel="Medieninhaber und Diensteanbieter">
              <p className="text-foreground">UncutTV GmbH</p>
              <p>
                <Platzhalter>Straße und Hausnummer</Platzhalter>
              </p>
              <p>
                <Platzhalter>Postleitzahl</Platzhalter> Axams, Österreich
              </p>
              <p>Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)</p>
            </Block>

            <Block titel="Firmenbuch">
              <p>
                Firmenbuchnummer: <Platzhalter>FN-Nummer</Platzhalter>
              </p>
              <p>
                Firmenbuchgericht: <Platzhalter>zuständiges Gericht</Platzhalter>
              </p>
              <p>Umsatzsteuer-Identifikationsnummer: ATU 81526957</p>
            </Block>

            <Block titel="Vertretungsbefugtes Organ">
              <p>Geschäftsführer: Florian Schütz und Philipp Gasser</p>
            </Block>

            <Block titel="Unternehmensgegenstand">
              <p>
                Handel mit Filmen und verwandten Medienprodukten, Medien- und
                Filmproduktion.
              </p>
            </Block>

            <Block titel="Aufsichtsbehörde">
              <p>Bezirkshauptmannschaft Innsbruck-Land</p>
            </Block>

            <Block titel="Kammerzugehörigkeit">
              <p>
                Mitglied der Wirtschaftskammer Österreich, Wirtschaftskammer
                Tirol, Fachgruppe Filmproduktion.
              </p>
              <p>
                <a
                  href="https://www.wko.at/tirol/gewerbe-handwerk/film-musikwirtschaft/start"
                  className={LINK}
                  rel="noopener"
                >
                  Fachvertretung Film- und Musikwirtschaft, Wirtschaftskammer
                  Tirol
                </a>
              </p>
            </Block>

            <Block titel="Anwendbare Rechtsvorschrift">
              <p>
                Gewerbeordnung (GewO) in der geltenden Fassung, abrufbar im
                Rechtsinformationssystem des Bundes.
              </p>
              <p>
                <a href="https://www.ris.bka.gv.at/" className={LINK} rel="noopener">
                  ris.bka.gv.at
                </a>
              </p>
            </Block>

            <Block titel="Streitbeilegung">
              <p>
                Die EU-Verordnung über die Online-Streitbeilegung wurde mit 20.
                Juli 2025 aufgehoben, die Plattform der Europäischen Kommission
                ist abgeschaltet. Weiterhin gilt das
                Alternative-Streitbeilegung-Gesetz.
              </p>
              <p>
                Wir sind nicht verpflichtet und nicht bereit, an einem
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <p>
                <a
                  href="https://www.wko.at/vertragsrecht/alternative-streitbeilegung-verbraucherangelegenheiten"
                  className={LINK}
                  rel="noopener"
                >
                  Alternative Streitbeilegung, Wirtschaftskammer Österreich
                </a>
              </p>
            </Block>

            <Block titel="Kontakt">
              <p>
                <a href="mailto:kontakt@philippgasser.at" className={LINK}>
                  kontakt@philippgasser.at
                </a>
              </p>
              <p>
                <a href="tel:+4366499708458" className={LINK}>
                  +43 664 99708458
                </a>
              </p>
            </Block>
          </div>
        </div>
      </main>

      <Fusszeile weiter={{ ziel: "/", text: "Zur Startseite" }} />
    </>
  );
}
