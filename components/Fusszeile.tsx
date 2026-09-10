import Link from "next/link";

const JAHR = new Date().getFullYear();

const LINK = `
  rounded-sm text-muted transition-colors duration-200 hover:text-foreground
  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
`;

/**
 * Fusszeile. `weiter` ist der zweite Link neben der Copyright-Zeile: auf der
 * Startseite das Impressum, im Impressum der Weg zurueck.
 */
export function Fusszeile({
  weiter = { ziel: "/impressum", text: "Impressum" },
}: {
  weiter?: { ziel: string; text: string };
}) {
  return (
    <footer className="border-t border-[var(--hairline)]/40 bg-background px-6 py-10 sm:px-12 md:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">© {JAHR} Philipp Gasser</p>
        <Link href={weiter.ziel} className={LINK}>
          {weiter.text}
        </Link>
      </div>
    </footer>
  );
}
