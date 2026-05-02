import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Download, FileText } from "lucide-react";
import { allPms } from "#cc";
import * as m from "#p";
import { generateMetaTags, SITE_BASE_URL } from "~/lib/meta";

export const Route = createFileRoute("/presse/$slug")({
  loader: ({ params }) => {
    const release = allPms.find((entry) => entry.slug === params.slug);
    if (!release) throw notFound();
    return release;
  },
  component: PresseMitteilungPage,
  head: ({ loaderData }) => {
    const release = loaderData;
    if (!release) throw notFound();

    return generateMetaTags({
      title: `${release.title} - ${m.site_title()}`,
      description: release.description || release.title,
      url: `/presse/${release.slug}`,
      type: "article",
      publishedTime: release.date,
      image: release.banner ? `${SITE_BASE_URL}${release.banner}` : undefined,
    });
  },
});

function PresseMitteilungPage() {
  const release = Route.useLoaderData();
  const formattedDate = new Date(release.date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/presse"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Presse
        </Link>

        <article className="space-y-10">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Pressemitteilung
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              {release.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={release.date}>{formattedDate}</time>
              </div>
            </div>
          </header>

          {release.banner && (
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
              <div className="relative aspect-video w-full bg-muted">
                <img
                  src={release.banner}
                  alt={release.title}
                  className="h-full w-full object-cover"
                />
                {release.bannerCredit && (
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <p className="inline-flex max-w-[90%] rounded-full bg-black/50 px-3 py-1.5 text-xs leading-relaxed text-white/80 backdrop-blur-sm">
                      {release.bannerCredit}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {release.description && (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {release.description}
            </p>
          )}

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-p:leading-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-hr:border-border">
            <MDXContent code={release.mdx} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <a
              href={release.pdf}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Download className="w-5 h-5" />
              Pressemitteilung als PDF
            </a>

            <Link
              to="/presse"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-accent transition-colors"
            >
              <FileText className="w-5 h-5" />
              Zur Presseübersicht
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
