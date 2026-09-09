"use client";

import { memo, useEffect, useRef, useState } from "react";

const ZEILEN = [
  "export async function POST(req: Request) {",
  "  const { tisch, artikel } = await req.json();",
  "  const sitzung = await sitzungFuerTisch(tisch);",
  "  return Response.json({ ok: true, sitzung });",
  "}",
  "",
  "await stripe.paymentIntents.create({",
  "  amount: summe, currency: 'eur',",
  "  metadata: { tisch, sitzung },",
  "});",
  "",
  "const bons = gruppiere(artikel, (a) => a.station);",
  "await Promise.all([drucke(bons.kueche), drucke(bons.bar)]);",
  "",
  "application ingest {",
  "  live on;",
  "  exec ffmpeg -i rtmp://localhost/$name",
  "    -c:v libx264 -b:v 4500k -f hls $hls/$name.m3u8;",
  "}",
  "",
  "const { data } = await supabase",
  "  .from('bestellungen')",
  "  .select('id, status, zieladresse')",
  "  .eq('status', 'offen');",
  "",
  "const etikett = await carrier.label(sendung);",
  "await drucker.senden(etikett.zpl);",
  "await shop.status(sendung.id, 'versandt');",
  "",
  "if (kunde.land !== 'AT' && kunde.uid) {",
  "  return steuer.reverseCharge(position);",
  "}",
  "",
];

/** So viele Zeilen bleiben stehen, aeltere laufen oben aus dem Bild. */
const MAX_ZEILEN = 48;

/**
 * Grundtempo 32 bis 50 Zeichen pro Sekunde. Die seltenen Denkpausen und die
 * Pause am Zeilenende druecken den Schnitt auf die geforderten 25 bis 40.
 */
function tippPause() {
  const proSekunde = 38 + Math.random() * 18;
  const grund = 1000 / proSekunde;
  return Math.random() < 0.05 ? grund + 90 + Math.random() * 170 : grund;
}

const FertigeZeilen = memo(function FertigeZeilen({
  zeilen,
}: {
  zeilen: string[];
}) {
  return (
    <>
      {zeilen.map((zeile, index) => (
        <div key={index}>{zeile === "" ? " " : zeile}</div>
      ))}
    </>
  );
});

/**
 * Ruhiger Code-Teppich hinter der Projektsektion, Zeile fuer Zeile getippt.
 * Einzige Client-Komponente der Seite. Der Beobachter haelt das Tippen an,
 * sobald die Sektion das Sichtfeld verlaesst.
 */
export function CodeHintergrund() {
  const bereich = useRef<HTMLDivElement>(null);
  const sichtbar = useRef(false);
  const [zeilen, setZeilen] = useState<string[]>([]);
  const [aktiv, setAktiv] = useState("");
  const [statisch, setStatisch] = useState(false);

  useEffect(() => {
    const element = bereich.current;
    if (!element) return;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        sichtbar.current = eintrag.isIntersecting;
      },
      // Kein Vorlauf: die Sektion beginnt genau eine Bildschirmhoehe unter dem
      // Seitenanfang, jeder Vorlauf wuerde sie dauerhaft als sichtbar melden.
      { rootMargin: "0px" },
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, []);

  useEffect(() => {
    const reduziert = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let zeilenIndex = 0;
    let zeichen = 0;
    let timer = 0;

    const schritt = () => {
      // Ausserhalb des Sichtfelds wird nicht getippt, nur gelegentlich geprueft.
      if (!sichtbar.current) {
        timer = window.setTimeout(schritt, 250);
        return;
      }

      const zeile = ZEILEN[zeilenIndex % ZEILEN.length];

      if (zeichen < zeile.length) {
        zeichen += 1;
        setAktiv(zeile.slice(0, zeichen));
        timer = window.setTimeout(schritt, tippPause());
        return;
      }

      setZeilen((bisher) => [...bisher, zeile].slice(-MAX_ZEILEN));
      setAktiv("");
      zeilenIndex += 1;
      zeichen = 0;
      timer = window.setTimeout(schritt, 180 + Math.random() * 180);
    };

    timer = window.setTimeout(() => {
      // Ohne Bewegung: der Code steht fertig da, kein Tippen, kein Cursor.
      if (reduziert) {
        setStatisch(true);
        setZeilen(ZEILEN.slice(-MAX_ZEILEN));
        return;
      }
      schritt();
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      ref={bereich}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 select-none"
    >
      {/*
        Kein overflow-hidden auf dem aeusseren Element: das wuerde einen
        Scroll-Container erzeugen und position: sticky wirkungslos machen.
      */}
      <div className="sticky top-0 h-svh overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="flex h-full flex-col justify-end px-6 pb-10 font-mono text-[11px] leading-5 tracking-tight whitespace-pre text-white/[0.22] sm:px-12 md:px-24">
          <FertigeZeilen zeilen={zeilen} />
          {!statisch && (
            <div>
              {aktiv}
              <span className="code-cursor">▍</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
