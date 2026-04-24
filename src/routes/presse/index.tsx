import { createFileRoute } from "@tanstack/react-router";
import {
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
import NewsList, { type NewsItem } from "~/components/NewsList";
import SharedNoteCard from "~/components/SharedNoteCard";
import PageHero from "~/components/PageHero";

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

const releases: NewsItem[] = [
  {
    title: "Erstwählerforum 2026 angekündigt",
    date: "2026-03-01",
    category: "Mitteilung",
    excerpt:
      "Das schulübergreifende Forum bringt Jugendliche, Schulen und lokale Akteure zusammen.",
    to: "/presse",
  },
  {
    title: "Stadeum als Veranstaltungsort bestätigt",
    date: "2026-02-25",
    category: "Update",
    excerpt:
      "Die Organisation hat sich für das Stadeum als zentrale Location entschieden.",
    to: "/presse",
  },
  {
    title: "Konzeptphase geht in die Detailplanung",
    date: "2026-02-11",
    category: "Hintergrund",
    excerpt:
      "Die Formate Markt, Podien und Gesprächsrunden werden aktuell ausformuliert.",
    to: "/presse",
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
        <PageHero
          className="press-hero"
          badge={
            <div className="press-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
              <Megaphone className="w-4 h-4" />
              Pressebereich
            </div>
          }
          title="Presse, Mitteilungen und Material"
          subtitle={
            <>
              Hier finden sich Pressetexte, Hintergrundinfos und der direkte Weg
              zum Pressekontakt des Erstwählerforums 2026.
            </>
          }
        />

        <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-8 items-start">
          <section className="space-y-6">
            <div className="press-card bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Aktuelle Mitteilungen</h2>
              </div>

              <NewsList items={releases} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SharedNoteCard
                icon={<FileText className="w-5 h-5" />}
                title="Pressemappe"
              >
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Kompakte Hintergrundinfos, Kurzbeschreibung des Projekts und
                  Eckdaten zur Veranstaltung.
                </p>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Download
                </a>
              </SharedNoteCard>

              <SharedNoteCard
                icon={<ImageIcon className="w-5 h-5" />}
                title="Bildmaterial"
              >
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Auf Anfrage stellen wir Logo, Bilder und weitere Materialien
                  für Berichterstattung und Ankündigungen bereit.
                </p>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  Anfrage senden
                </a>
              </SharedNoteCard>
            </div>
          </section>

          <aside className="space-y-6">
            <SharedNoteCard
              icon={<Mail className="w-5 h-5" />}
              title="Pressekontakt"
            >
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
                  <p className="font-medium">Jack Ruder</p>
                </div>

                <div className="rounded-xl border border-border/70 bg-background/50 p-4 text-muted-foreground leading-relaxed">
                  Verifizierte Pressevertreterinnen und Pressevertreter, die
                  sich bereits bei uns gemeldet haben, erhalten auf Wunsch eine
                  Telefonnummer für den direkten Austausch.
                </div>

                <div className="rounded-xl border border-border/70 bg-background/50 p-4 text-muted-foreground leading-relaxed">
                  In dringenden Fällen erreicht ihr unseren Partner, den
                  Kreisjugendring, unter 04141placeholder.
                </div>

                <div className="rounded-xl border border-border/70 bg-background/50 p-4 text-muted-foreground leading-relaxed">
                  Verifizierte Pressekontakte erhalten außerdem PMs bereits fünf
                  Tage vor Veröffentlichung auf unserer Presseseite.
                </div>
              </div>
            </SharedNoteCard>

            <SharedNoteCard
              icon={<Quote className="w-5 h-5" />}
              title="Hinweise für Medien"
            >
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
            </SharedNoteCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
