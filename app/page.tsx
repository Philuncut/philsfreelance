import { Fusszeile } from "@/components/Fusszeile";
import { Hero } from "@/components/Hero";
import { Kontakt } from "@/components/Kontakt";
import { Projekte } from "@/components/Projekte";
import { UeberMich } from "@/components/UeberMich";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Projekte />
        <UeberMich />
        <Kontakt />
      </main>
      <Fusszeile />
    </>
  );
}
