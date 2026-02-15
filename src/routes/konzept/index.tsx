import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { allPages } from "#cc";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".konzept-hero h1", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "expo.out",
      });
      gsap.from(".konzept-hero p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: "expo.out",
      });
      gsap.from(".konzept-divider", {
        scaleX: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "expo.out",
      });
      gsap.from(".konzept-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: "expo.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <div className="konzept-hero mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {m.konzept_title()}
          </h1>
          {page.description && (
            <p className="text-xl text-muted-foreground max-w-2xl">
              {page.description}
            </p>
          )}
        </div>
        <div className="konzept-divider h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mb-12 origin-left" />
        <div className="konzept-content prose prose-lg prose-slate dark:prose-invert max-w-none">
          <MDXContent code={page.mdx} />
        </div>
      </div>
    </div>
  );
}
