import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { allPms } from "#cc";
import * as m from "#p";
import { generateMetaTags } from "~/lib/meta";
import NewsList, { type NewsItem } from "~/components/NewsList";

const currentYear = new Date().getFullYear();

export const Route = createFileRoute("/presse/archiv/$year")({
  loader: ({ params }) => {
    const year = Number(params.year);
    if (!Number.isInteger(year)) throw notFound();

    const releases = allPms
      .filter((entry) => new Date(entry.date).getFullYear() === year)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (releases.length === 0) throw notFound();

    return { year, releases };
  },
  component: PresseArchivYearPage,
  head: ({ loaderData }) => {
    const year = loaderData?.year ?? currentYear;

    return generateMetaTags({
      title: `Pressearchiv ${year} - ${m.site_title()}`,
      description: `Alle Pressemitteilungen aus dem Jahr ${year}.`,
      url: `/presse/archiv/${year}`,
      type: "website",
    });
  },
});

function PresseArchivYearPage() {
  const { year, releases } = Route.useLoaderData();
  const items: NewsItem[] = releases.map((release) => ({
    title: release.title,
    date: release.date,
    category: "Pressemitteilung",
    excerpt: release.description || release.title,
    to: `/presse/${release.slug}`,
  }));

  const years = [...new Set(allPms.map((entry) => new Date(entry.date).getFullYear()))].sort(
    (a, b) => b - a,
  );
  const currentIndex = years.indexOf(year);
  const prevYear = years[currentIndex + 1];
  const nextYear = years[currentIndex - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/presse/archiv"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Archiv
        </Link>

        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-[0.2em]">
            <Calendar className="w-4 h-4" />
            Pressearchiv
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{year}</h1>
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to={prevYear ? "/presse/archiv/$year" : "/presse/archiv"}
            params={prevYear ? { year: String(prevYear) } : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Älter
          </Link>

          <Link
            to={nextYear ? "/presse/archiv/$year" : "/presse/archiv"}
            params={nextYear ? { year: String(nextYear) } : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
          >
            Neuer
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <NewsList items={items} />
      </div>
    </div>
  );
}
