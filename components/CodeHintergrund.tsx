"use client";

import { useEffect, useRef, useState } from "react";

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

/**
 * Ruhiger Code-Teppich hinter der Projektsektion. Einzige Client-Komponente
 * der Seite: der Beobachter haelt die Schleife an, sobald die Sektion das
 * Sichtfeld verlaesst.
 */
export function CodeHintergrund() {
  const bereich = useRef<HTMLDivElement>(null);
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const element = bereich.current;
    if (!element) return;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => setSichtbar(eintrag.isIntersecting),
      { rootMargin: "128px" },
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
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
        <div
          className="code-lauf font-mono text-[11px] leading-5 tracking-tight whitespace-pre text-white/[0.07]"
          data-laeuft={sichtbar}
        >
          {/* Zweimal dieselbe Liste, damit die Schleife bei -50% nahtlos ansetzt */}
          {[...ZEILEN, ...ZEILEN].map((zeile, index) => (
            <div key={index}>{zeile === "" ? " " : zeile}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
