import { KontaktFormular } from "@/components/KontaktFormular";

const EMAIL = "kontakt@philippgasser.at";
/** Anzeige mit Leerzeichen, im Link ohne: tel: vertraegt keine. */
const TELEFON_ANZEIGE = "+43 664 99708458";
const TELEFON_LINK = "+4366499708458";

const DIREKT = `
  block w-fit text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-[-0.01em]
  text-foreground underline decoration-[var(--hairline)] decoration-1 underline-offset-[0.3em]
  transition-colors duration-200 hover:decoration-foreground
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
`;

/**
 * Kontaktsektion. Nur das Formular ist eine Client-Komponente, der Rahmen
 * hier wird auf dem Server gerendert.
 */
export function Kontakt() {
  return (
    <section
      id="kontakt"
      className="bg-background px-6 pt-8 pb-24 sm:px-12 md:px-24 md:pt-12 md:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Kopf wie in den anderen Sektionen: Auszeichnung, Ueberschrift, kurzer Absatz */}
        <header className="reveal mb-16 md:mb-24">
          <p className="text-sm tracking-[0.18em] text-muted uppercase">Kontakt</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] text-balance leading-[1.08]">
            Erzählen Sie mir von Ihrem Projekt.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[clamp(0.95rem,1.4vw,1.15rem)] text-pretty text-muted leading-relaxed">
            Ob laufende Weiterentwicklung, ein festes Projekt oder erst eine
            Idee: Schreiben Sie mir, was Sie vorhaben. Ich melde mich innerhalb
            eines Werktags.
          </p>
        </header>

        {/* Ab md zwei Spalten: links der direkte Weg, rechts das Formular. */}
        <div className="reveal grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <div className="space-y-5">
              <a href={`mailto:${EMAIL}`} className={DIREKT}>
                {EMAIL}
              </a>
              <a href={`tel:${TELEFON_LINK}`} className={DIREKT}>
                {TELEFON_ANZEIGE}
              </a>
            </div>

            <p className="mt-10 text-[clamp(0.95rem,1.3vw,1.05rem)] text-pretty text-muted leading-relaxed">
              Verfügbar ab sofort · 100 % remote · Voll- oder Teilzeit nach
              Absprache
            </p>

            <p className="mt-6 text-sm text-pretty text-muted/70 leading-relaxed">
              Auftragsabwicklung über UncutTV GmbH, Axams (AT), UID ATU 81526957
            </p>
          </div>

          <KontaktFormular />
        </div>
      </div>
    </section>
  );
}
