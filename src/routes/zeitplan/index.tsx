import { createFileRoute } from "@tanstack/react-router";
import { Clock3, MapPin, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import InfoCard from "~/components/timeline/InfoCard";
import TimelineRowItem from "~/components/timeline/TimelineRowItem";
import CycleRow from "~/components/timeline/CycleRow";
import type { TimelineRow } from "~/components/timeline/types";
import { ForbiddenPage } from "~/components/401";

const timeline: TimelineRow[] = [
  {
    kind: "section",
    time: "7:00",
    room: "Foyer & Hansesaal",
    title: "Einlass Externe & Motivationsrunde",
    details:
      "Ankommen der externen Gäste, kurze Aktivierungsrunde und organisatorische Vorbereitung.",
  },
  {
    kind: "section",
    time: "8:00",
    room: "Foyer & Hansesaal",
    title: "Einlass Schüler & Lehrkräfte",
  },
  {
    kind: "section",
    time: "8:30 – 9:15",
    room: "Hansesaal",
    title: "Einführung",
    details:
      "Einführung inklusive Rede des ersten Kreisrats über die Bedeutung deiner Wahl!",
  },
  {
    kind: "section",
    time: "9:15",
    room: "Foyer",
    title: "Eröffnung des Marktplatzes",
    details:
      "Der politische Marktplatz öffnet; ab 9:30 Uhr bleibt er dauerhaft zugänglich.",
  },
  {
    kind: "cycle",
    time: "9:30 – 10:30",
    room: "Foyer, Hansesaal & Konferenzräume",
    title: "Erster Zyklus",
    details: [
      {
        label: "Diskussionsrunde",
        duration: "45 min",
        description:
          "Moderierte Runde zu den Themen des jeweiligen Schwerpunktblocks.",
      },
      {
        label: "Wechsel- & Laufzeit",
        duration: "15 min",
        description:
          "Zeit für den Weg zwischen Marktplatz, Saal und Konferenzräumen sowie für kurze Übergaben.",
      },
    ],
  },
  {
    kind: "cycle",
    time: "10:30 – 11:30",
    room: "Foyer, Hansesaal & Konferenzräume",
    title: "Zweiter Zyklus",
    details: [
      {
        label: "Diskussionsrunde",
        duration: "45 min",
        description:
          "Die nächste Gruppe nimmt an den politischen Gesprächen teil.",
      },
      {
        label: "Wechsel- & Laufzeit",
        duration: "15 min",
        description:
          "Übergänge zwischen Marktplatz und Diskussionsformaten mit bewusst eingeplanter Pufferzeit.",
      },
    ],
  },
  {
    kind: "cycle",
    time: "11:30 – 12:30",
    room: "Foyer, Hansesaal & Konferenzräume",
    title: "Dritter Zyklus",
    details: [
      {
        label: "Diskussionsrunde",
        duration: "45 min",
        description:
          "Die letzte reguläre Runde der Diskussionen mit den anwesenden Gästen.",
      },
      {
        label: "Wechsel- & Laufzeit",
        duration: "15 min",
        description:
          "Die letzten 15 Minuten sind zusätzlich als Puffer für Herdenlauf-Zeit eingeplant.",
      },
    ],
  },
  {
    kind: "section",
    time: "12:30 – 13:00",
    room: "Hansesaal",
    title: "Verabschiedung der Schüler",
    details:
      "Gemeinsamer Abschluss für die teilnehmenden Schülerinnen und Schüler.",
  },
  {
    kind: "end",
    time: "13:00",
    room: "—",
    title: "Offizielles Ende des Erstwählerforums 2026",
  },
  {
    kind: "section",
    time: "13:00 – 13:20",
    room: "Foyer",
    title: "Verlassen des Geländes & Pause Externe",
    details:
      "Lehrkräfte und Schulleitungen verbleiben, während die Schüler das Gelände verlassen.",
  },
  {
    kind: "section",
    time: "13:20 – 13:50",
    room: "Hansesaal",
    title: "Verabschiedung der Externen",
    details: "Abschluss für Parteivertreter, Kandidierende und weitere Gäste.",
  },
  {
    kind: "section",
    time: "ab 13:50",
    room: "Überall",
    title: "Netzwerken",
    details: "Offener Austausch im Anschluss an das offizielle Programm.",
  },
  {
    kind: "section",
    time: "ab 14:00",
    room: "Überall",
    title: "Abbau",
    details: "Rückbau der Flächen und Abschluss des Veranstaltungstages.",
  },
];

export const Route = createFileRoute("/zeitplan/")({
  component: ForbiddenPage, // Platzhalter bis zur Veranstaltung
  head: () =>
    generateMetaTags({
      title: "Zeitplan - Erstwählerforum 2026",
      description:
        "Der Tagesablauf des Erstwählerforums 2026 mit Einführung, Marktplatz, Zyklen und Abschluss.",
      url: "/zeitplan",
      type: "website",
    }),
});

function RouteComponent() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-hero", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });

      gsap.from(".timeline-row", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        delay: 0.15,
        ease: "expo.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <section className="timeline-hero mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-5">
            <Clock3 className="w-4 h-4" />
            Pflichtveranstaltung
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Der Zeitplan</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Ein klarer Überblick über den Veranstaltungstag — inklusive Einlass,
            Einführung, Marktplatz, Zyklen und Abschluss.
          </p>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <InfoCard
            icon={<Clock3 className="w-5 h-5" />}
            title="Struktur"
            description="Der Tag ist in Einlass, Einführung, drei Zyklen und einen gemeinsamen Abschluss gegliedert."
          />
          <InfoCard
            icon={<MapPin className="w-5 h-5" />}
            title="Orte"
            description="Foyer, Hansesaal und Konferenzräume werden je nach Programmpunkt parallel genutzt."
          />
          <InfoCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Zyklen"
            description="Die Zyklen sind interaktiv und bieten aufklappbare Detailinfos zu Diskussions- und Wechselphasen."
          />
        </section>

        <section className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="divide-y divide-border/60">
            {timeline.map((row) =>
              row.kind === "cycle" ? (
                <CycleRow key={`cycle-group-${row.title}`} row={row} />
              ) : (
                <TimelineRowItem
                  key={`${row.kind}-${row.title}`}
                  row={row}
                  isEnd={row.kind === "end"}
                />
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
