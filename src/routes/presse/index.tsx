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
import { allPms } from "#cc";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import NewsList, { type NewsItem } from "~/components/NewsList";
import SharedNoteCard from "~/components/SharedNoteCard";
import PageHero from "~/components/PageHero";

export const Route = createFileRoute("/presse/")({
  loader: () =>
    [...allPms].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
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

function PressePage() {
  const releases = Route.useLoaderData();
  const latestReleases = releases.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".press-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".press-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".press-hero p", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          ".press-card",
          {
            y: 36,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.16,
          },
          "-=0.2",
        )
        .fromTo(
          ".press-release-item",
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.45",
        )
        .fromTo(
          ".press-link-item",
          {
            y: 12,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.35",
        )
        .fromTo(
          ".press-info-card",
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .fromTo(
          ".press-info-card .w-12",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.1,
          },
          "-=0.45",
        )
        .fromTo(
          ".press-info-card h2",
          {
            y: 14,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.4",
        );
    });

    return () => ctx.revert();
  }, []);

  const newsItems: NewsItem[] = latestReleases.map((release) => ({
    title: release.title,
    date: release.date,
    category: "Pressemitteilung",
    excerpt: release.description || release.title,
    to: `/presse/${release.slug}`,
    ariaLabel: `Pressemitteilung ${release.title} öffnen`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <PageHero
          className="press-hero"
          badge={
            <div className="press-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
              <Megaphone className="w-4 h-4" />
              Pressemitteilungen & Meldungen
            </div>
          }
          title="Pressemitteilungen"
          subtitle={
            <>
              Hier findest du die neuesten Mitteilungen, Hintergrundinfos und
              den direkten Zugang zum Pressearchiv.
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

              <NewsList items={newsItems} className="press-release-item" />

              <div className="mt-6">
                <Link
                  to="/presse/archiv"
                  className="press-link-item inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Zum Archiv
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SharedNoteCard
                icon={<FileText className="w-5 h-5" />}
                title="Pressemappe"
                className="press-info-card"
              >
                <p className="text-muted-foreground leading-relaxed">
                  Kompakte Hintergrundinfos, Kurzbeschreibung des Projekts und
                  Eckdaten zur Veranstaltung.
                </p>
                <a
                  href="/pressemappe.pdf"
                  className="press-link-item inline-flex items-center gap-2 px-4 py-2 my-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Download
                </a>
              </SharedNoteCard>

              <SharedNoteCard
                icon={<ImageIcon className="w-5 h-5" />}
                title="Bildmaterial"
                className="press-info-card"
              >
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Auf Anfrage stellen wir Logo, Bilder und weitere Materialien
                  für Berichterstattung und Ankündigungen bereit.
                </p>
                <a
                  href="/kontakt"
                  className="press-link-item inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
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
              className="press-info-card"
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
              </div>
            </SharedNoteCard>

            <SharedNoteCard
              icon={<Quote className="w-5 h-5" />}
              title="Hinweise für Medien"
              className="press-info-card"
            >
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>• Die neuesten 3 Mitteilungen stehen hier direkt oben.</li>
                <li>• Das Pressearchiv ist nach Jahr sortiert.</li>
                <li>
                  • PDF-Download jeder Mitteilung erfolgt über die Detailseite.
                </li>
              </ul>
            </SharedNoteCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
