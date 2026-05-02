import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Newspaper } from "lucide-react";
import { allPms } from "#cc";
import * as m from "#p";
import { generateMetaTags } from "~/lib/meta";
import NewsList, { type NewsItem } from "~/components/NewsList";

export const Route = createFileRoute("/presse/archiv/")({
  component: PresseArchivIndexPage,
  head: () =>
    generateMetaTags({
      title: `${m.press_archive()} - ${m.site_title()}`,
      description: "Alle Pressemitteilungen nach Jahr sortiert.",
      url: "/presse/archiv",
      type: "website",
    }),
});

function PresseArchivIndexPage() {
  const years = [
    ...new Set(allPms.map((entry) => new Date(entry.date).getFullYear())),
  ].sort((a, b) => b - a);
  const currentYear = years[0];
  const releases = allPms
    .filter((entry) => new Date(entry.date).getFullYear() === currentYear)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items: NewsItem[] = releases.map((release) => ({
    title: release.title,
    date: release.date,
    category: "Pressemitteilung",
    excerpt: release.description || release.title,
    to: `/presse/${release.slug}`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-[0.2em]">
            <Newspaper className="w-4 h-4" />
            {m.press_archive()}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{currentYear}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {m.press_archive_explainer()}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {years.map((year) => (
            <Link
              key={year}
              to="/presse/archiv/$year"
              params={{ year: String(year) }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {year}
            </Link>
          ))}
        </div>

        <NewsList items={items} />
      </div>
    </div>
  );
}
