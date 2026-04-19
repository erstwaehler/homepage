import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Clock3, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

type CycleDetail = {
  label: string;
  duration: string;
  description: string;
};

type TimelineRow =
  | {
      kind: "section";
      time: string;
      room: string;
      title: string;
      details?: string;
    }
  | {
      kind: "cycle";
      time: string;
      room: string;
      title: string;
      details: CycleDetail[];
    }
  | {
      kind: "end";
      time: string;
      room: string;
      title: string;
      details?: string;
    };

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
    title: "Eröffnung des Marktes",
    details:
      "Der politische Markt öffnet; ab 9:30 Uhr bleibt er dauerhaft zugänglich.",
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
          "Zeit für den Weg zwischen Markt, Saal und Konferenzräumen sowie für kurze Übergaben.",
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
          "Übergänge zwischen Markt und Diskussionsformaten mit bewusst eingeplanter Pufferzeit.",
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
  component: RouteComponent,
  head: () =>
    generateMetaTags({
      title: "Zeitplan - Erstwählerforum 2026",
      description:
        "Der Tagesablauf des Erstwählerforums 2026 mit Einführung, Zyklen und Abschluss.",
      url: "/zeitplan",
      type: "website",
    }),
});

function RouteComponent() {
  const [openCycle, setOpenCycle] = useState<number | null>(null);

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
          <div
            className={
              "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-5"
            }
          >
            <Clock3 className="w-4 h-4" />
            Pflichtveranstaltung
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Der Zeitplan</h1>
          <p className={"text-xl text-muted-foreground max-w-3xl"}>
            Ein klarer Überblick über den Veranstaltungstag — inklusive Einlass,
            Einführung, Zyklen, Marktphasen und Abschluss.
          </p>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock3 className="w-5 h-5" />
              </div>
              <h2 className="font-semibold">Struktur</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Der Tag ist in Einlass, Einführung, drei Zyklen und einen
              gemeinsamen Abschluss gegliedert.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-semibold">Orte</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Foyer, Hansesaal und Konferenzräume werden je nach Programmpunkt
              parallel genutzt.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-semibold">Zyklen</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Die Zyklen sind interaktiv und bieten aufklappbare Detailinfos zu
              Diskussions- und Wechselphasen.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="divide-y divide-border/60">
            {timeline.map((row, idx) => {
              const isOpen = row.kind === "cycle" && openCycle === idx;

              if (row.kind === "cycle") {
                return (
                  <div
                    key={`cycle-group-${row.title}`}
                    className="timeline-row"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCycle((current) =>
                          current === idx ? null : idx,
                        )
                      }
                      className={[
                        "w-full grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_220px]",
                        "gap-0 text-left transition-colors hover:bg-accent/40",
                        isOpen ? "bg-accent/50" : "",
                      ].join(" ")}
                    >
                      <span className="px-6 py-5 align-top whitespace-nowrap font-medium">
                        {row.time}
                      </span>
                      <span className="px-6 py-5 align-top text-muted-foreground">
                        {row.room}
                      </span>
                      <span className="px-6 py-5 align-top">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{row.title}</span>
                          <ChevronDown
                            className={[
                              "w-4 h-4 text-muted-foreground transition-transform duration-300",
                              isOpen ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </div>
                      </span>
                      <span className="px-6 py-5 align-top hidden md:block text-muted-foreground">
                        Aufklappbare Details
                      </span>
                    </button>

                    <div
                      className={[
                        "grid transition-all duration-300 overflow-hidden",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="min-h-0 bg-muted/20">
                        <div className="px-6 pb-5 pt-0 grid gap-3 md:grid-cols-2">
                          {row.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="rounded-2xl border border-border bg-background p-4"
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <h4 className="font-semibold">
                                  {detail.label}
                                </h4>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                  {detail.duration}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {detail.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`${row.kind}-${row.title}`}
                  className="timeline-row grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_220px] gap-0 hover:bg-accent/30 transition-colors"
                >
                  <div className="px-6 py-5 align-top whitespace-nowrap font-medium">
                    {row.time}
                  </div>
                  <div className="px-6 py-5 align-top text-muted-foreground">
                    {row.room}
                  </div>
                  <div className="px-6 py-5 align-top">
                    <span
                      className={[
                        "font-medium",
                        row.kind === "end" ? "text-primary" : "text-foreground",
                      ].join(" ")}
                    >
                      {row.title}
                    </span>
                  </div>
                  <div className="px-6 py-5 align-top hidden md:block text-muted-foreground">
                    {row.details ?? "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
