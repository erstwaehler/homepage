import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeInfo,
  BookOpen,
  CirclePlay,
  LayoutGrid,
  Megaphone,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/konzept/")({
  component: KonzeptPage,
  head: () => {
    const title = `Konzept - ${m.site_title()}`;
    const description =
      "Überblick über die Formate des Erstwählerforums 2026: Podien, Markt und Auftakt.";

    return generateMetaTags({
      title,
      description,
      url: "/konzept",
      type: "website",
    });
  },
});

const pillars = [
  {
    icon: MessagesSquare,
    title: "Moderierte Podien",
    text: "Schüler moderieren Themenrunden zu jugendrelevanten Fragen und schaffen einen Raum für nachvollziehbare, respektvolle politische Debatten.",
  },
  {
    icon: LayoutGrid,
    title: "Politischer Markt",
    text: "Im Foyer und in der Galerie können Schüler Parteien und Kandidierende direkt ansprechen, Fragen stellen und Positionen vergleichen.",
  },
  {
    icon: CirclePlay,
    title: "Kurzer Auftakt",
    text: "Ein prägnanter Einstieg erklärt die Idee des Forums, den Ablauf des Tages und die Besonderheiten kommunaler Wahlen.",
  },
  {
    icon: ShieldCheck,
    title: "Überparteilich & schulübergreifend",
    text: "Das Format ist als neutrale politische Bildungsveranstaltung angelegt und wird gemeinsam von mehreren Schulen getragen.",
  },
];

const focusPoints = [
  {
    title: "Kommunalpolitik verständlich machen",
    text: "Die Jugendlichen lernen, welche Entscheidungen auf kommunaler Ebene getroffen werden und warum diese ihren Alltag direkt betreffen.",
  },
  {
    title: "Persönlicher Austausch statt Frontalformat",
    text: "Nicht nur zuhören, sondern direkt nachfragen: Das Forum verbindet Bühne, Gespräch und Begegnung an den Ständen.",
  },
  {
    title: "Beteiligung fördern",
    text: "Das Format lädt Erstwähler ein, sich aktiv mit Positionen, Personen und Themen auseinanderzusetzen.",
  },
];

function KonzeptPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".konzept-hero .eyebrow", {
        y: 24,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".konzept-hero h1",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.35",
        )
        .from(
          ".konzept-hero p",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55",
        )
        .from(
          ".konzept-hero .hero-actions",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .fromTo(
          ".concept-card",
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .fromTo(
          ".focus-item",
          {
            x: -24,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.35",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <section className="konzept-hero mb-16">
          <div className="eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            Das Konzept
          </div>

          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-end">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                Politische Bildung, die man erleben kann
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                Das Erstwählerforum 2026 verbindet Orientierung, Begegnung und
                Diskussion. Wir zeigen, wie kommunale Demokratie funktioniert
                und schaffen echte Gesprächssituationen für Erstwähler.
              </p>

              <div className="hero-actions flex flex-wrap gap-4">
                <Link
                  to="/zeitplan"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-3"
                >
                  Zum Zeitplan
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
                >
                  Fragen stellen
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-3 mb-5">
                <BadgeInfo className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Kurzüberblick</h2>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p>
                    Schulübergreifendes Format mit Teilnehmenden aus mehreren
                    Jahrgängen und Schulen.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Megaphone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p>
                    Kurze Einführung, anschließende Gesprächsformate und
                    thematische Diskussionsrunden.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p>
                    Fokus auf Kommunalpolitik, Wahlverständnis und auf
                    jugendrelevante politische Fragen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="concept-card group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.text}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <article className="rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">Was uns wichtig ist</h2>
            </div>

            <div className="space-y-4">
              {focusPoints.map((item) => (
                <div
                  key={item.title}
                  className="focus-item rounded-2xl border border-border/70 bg-background/40 p-4"
                >
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-card p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-5">
                <Sparkles className="w-3 h-3" />
                So funktioniert es
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ein Tag mit klarer Dramaturgie
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Der Tag ist so aufgebaut, dass Schüler erst ein Grundverständnis
                bekommen, dann mit Kandidierenden ins Gespräch kommen und
                schließlich in thematischen Runden vertiefen können.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Kurze Einführung mit Erklärung von Wahl und Ablauf
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Offener Markt mit Ständen und direktem Austausch
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Mehrere Diskussionszyklen mit Moderation durch Schülerteams
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
