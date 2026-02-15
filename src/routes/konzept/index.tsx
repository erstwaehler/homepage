import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import { allPages } from "#cc";
import * as m from "#p";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/konzept/")({
  loader: () => {
    const page = allPages.find((p) => p.slug === "konzept");
    if (!page) throw new Error("Konzept page not found");
    return page;
  },
  component: KonzeptPage,
  head: ({ loaderData: page }) => {
    const title = `${m.konzept_title()} - ${m.site_title()}`;
    const description =
      page.description ||
      "Das Konzept des Erstwähler Forums 2026 - eine schulübergreifende Großveranstaltung zur politischen Bildung";

    return generateMetaTags({
      title,
      description,
      url: "/konzept",
      type: "website",
    });
  },
});

function KonzeptPage() {
  const page = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m.konzept_title()}
          </h1>
          {page.description && (
            <p className="text-xl text-muted-foreground">{page.description}</p>
          )}
        </div>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <MDXContent code={page.mdx} />
        </div>
      </div>
    </div>
  );
}
