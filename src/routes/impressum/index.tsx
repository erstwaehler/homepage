import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import { allPages } from "#cc";
import * as m from "#p";

export const Route = createFileRoute("/impressum/")({
  loader: () => {
    const page = allPages.find((p) => p.slug === "impressum");
    if (!page) throw new Error("Impressum page not found");
    return page;
  },
  component: ImpressumPage,
});

function ImpressumPage() {
  const page = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m.impressum_title()}
          </h1>
        </div>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <MDXContent code={page.mdx} />
        </div>
      </div>
    </div>
  );
}
