import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  ImageIcon,
  Mail,
  Megaphone,
  Newspaper,
  Quote,
} from "lucide-react";
import { useEffect } from "react";
import { gsap } from "~/lib/gsap";
import * as m from "#p";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/presse/")({
  component: PressePage,
  head: () => {
    const title = `Presse - ${m.site_title()}`;
    const description =
      "Pressebereich des Erstwählerforums 2026 mit Mitteilungen, Kontakt und Hinweisen für Medien.";

    return generateMetaTags({
      title,
      description,
      url: "/presse",
      type: "website",
    });
  },
});

const releases = [
  {
    title: "Erstwählerforum 2026 angekündigt",
    date: "2026-03-01",
    category: "Mitteilung",
    excerpt:
      "Das schulübergreifende Forum bringt Jugendliche, Schulen und lokale Akteure zusammen.",
  },
  {
    title: "Stadeum als Veranstaltungsort bestätigt",
    date: "2026-02-25",
    category: "Update",
    excerpt:
      "Die Organisation hat sich für das Stadeum als zentrale Location entschieden.",
  },
  {
    title: "Konzeptphase geht in die Detailplanung",
    date: "2026-02-11",
    category: "Hintergrund",
    excerpt:
      "Die Formate Markt, Podien und Impulsrunden werden aktuell ausformuliert.",
  },
];

function PressePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".press-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".press-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".press-hero p", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".press-card",
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
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <section className="press-hero mb-16 max-w-4xl">
          <div className="press-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Megaphone className="w-4 h-4" />
            Pressebereich
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Presse, Mitteilungen und Material
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Hier finden sich Pressetexte, Hintergrundinfos und der direkte Weg
            zum Pressekontakt des Erstwählerforums 2026.
          </p>
        </section>

        <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-8 items-start">
          <section className="space-y-6">
            <div className="press-card bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Aktuelle Mitteilungen</h2>
              </div>

              <div className="space-y-4">
                {releases.map((release) => (
                  <article
                    key={release.title}
                    className="group rounded-xl border border-border/70 bg-background/50 hover:bg-background transition-colors duration-300 overflow-hidden"
                  >
                    <Link
                      to="/presse"
                      className="block p-5 md:p-6"
                      aria-label={release.title}
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {release.category}
                        </span>
                        <time dateTime={release.date}>
                          {new Date(release.date).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>

                      <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {release.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {release.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="press-card bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Pressemappe</h2>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Kompakte Hintergrundinfos, Kurzbeschreibung des Projekts und
                  Eckdaten zur Veranstaltung.
                </p>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Download
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="press-card bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Bildmaterial</h2>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Auf Anfrage stellen wir Logo, Bilder und weitere Materialien
                  für Berichterstattung und Ankündigungen bereit.
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  Anfrage senden
                </Link>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="press-card sticky top-28 bg-card border border-border rounded-2xl p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Pressekontakt</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                  <p className="text-muted-foreground mb-1">E-Mail</p>
                  <a
                    href="mailto:info@ewf-stade.de"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    info@ewf-stade.de
                  </a>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/50 p-4">
                  <p className="text-muted-foreground mb-1">Ansprechpartner</p>
                  <p className="font-medium">
                    Organisationsteam Erstwählerforum 2026
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm text-muted-foreground leading-relaxed">
                Bitte Anfragen mit Medium, Thema und gewünschtem Zeitrahmen
                senden. Wir melden uns so schnell wie möglich zurück.
              </div>
            </div>

            <div className="press-card bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Quote className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Hinweise für Medien</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>
                  • Offizielle Mitteilungen werden hier nach und nach ergänzt.
                </li>
                <li>• Fotos und Logos nur auf Anfrage verwenden.</li>
                <li>
                  • Termin- und Ortsänderungen werden an dieser Stelle
                  aktualisiert.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
