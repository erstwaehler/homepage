import { createFileRoute } from "@tanstack/react-router";
import { Building2, GraduationCap, School, Users2 } from "lucide-react";
import { useEffect } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/schulen/")({
  component: SchulenPage,
  head: () => {
    const title = `${m.nav_schulen()} - ${m.site_title()}`;
    const description =
      "Die beteiligten Schulen hinter dem Erstwählerforum 2026 und ihre gemeinsame Zusammenarbeit.";

    return generateMetaTags({
      title,
      description,
      url: "/schulen",
      type: "website",
    });
  },
});

const schools = [
  {
    name: "Gymnasium Athenaeum Stade",
    short: "Athenaeum",
    icon: GraduationCap,
    description:
      "Ein zentraler Mitinitiator des Projekts mit engagierten Schüler:innen aus der Ober- und Mittelstufe.",
    highlight:
      "Schulübergreifende Mitgestaltung von Konzept, Organisation und Kommunikation.",
    status: "Kooperationsschule",
  },
  {
    name: "IGS Stade",
    short: "IGS Stade",
    icon: School,
    description:
      "Bringt eine große und vielfältige Schülerschaft in das Forum ein und stärkt den praxisnahen Austausch.",
    highlight:
      "Wichtiger Partner für Beteiligung, Rückmeldungen und die schulische Umsetzung.",
    status: "Kooperationsschule",
  },
  {
    name: "Vincent-Lübeck-Gymnasium",
    short: "VLG",
    icon: Building2,
    description:
      "Unterstützt das Erstwählerforum als dritte große weiterführende Schule in Stade.",
    highlight:
      "Sorgt gemeinsam mit den anderen Schulen für eine breite schulische Verankerung.",
    status: "Kooperationsschule",
  },
  {
    name: "Realschule Camper Höhe",
    short: "RCH",
    icon: Users2,
    description:
      "Wird perspektivisch in die Teilnehmenden- und Informationsstruktur einbezogen.",
    highlight:
      "Wichtiger Baustein für die Erweiterung des schulischen Netzwerks und der Reichweite.",
    status: "Interessierte Partnerschule",
  },
];

function SchulenPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".schools-hero h1", {
        y: 40,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".schools-hero p",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".school-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="schools-hero mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <School className="w-4 h-4" />
            Kooperationsschulen
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Gemeinsam für das Erstwählerforum
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Das Erstwählerforum 2026 ist ein schulübergreifendes Projekt. Die
            beteiligten Schulen bringen unterschiedliche Perspektiven,
            Erfahrungen und Ideen ein und machen das Forum erst möglich.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {schools.map((school) => {
            const Icon = school.icon;

            return (
              <article
                key={school.name}
                className="school-card group bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                        {school.status}
                      </p>
                      <h2 className="text-2xl font-bold leading-tight">
                        {school.name}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground whitespace-nowrap">
                    {school.short}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {school.description}
                  </p>

                  <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                    <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                      Beitrag zum Projekt
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {school.highlight}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="bg-linear-to-br from-primary/10 via-card to-background border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Warum mehrere Schulen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Das Forum lebt von einer breiten Perspektive. Durch die
              Zusammenarbeit mehrerer Schulen entsteht ein Projekt, das viele
              Jugendliche erreicht und die politische Bildung in Stade stärker
              vernetzt.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Die Schulen arbeiten dabei nicht nur organisatorisch zusammen,
              sondern auch inhaltlich: bei Fragen, Rückmeldungen und der
              Umsetzung vor Ort.
            </p>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Kurz & knapp</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Schulübergreifendes Kooperationsprojekt</li>
              <li>• Beteiligung von Schüler:innen aus Stade</li>
              <li>• Politische Bildung mit Praxisbezug</li>
              <li>• Gemeinsame Verantwortung für das Forum</li>
            </ul>
          </aside>
        </section>
      </div>
    </div>
  );
}
