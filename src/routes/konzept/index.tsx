import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  Lightbulb,
  Target,
} from "lucide-react";
import { useEffect, useRef } from "react";
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
      page?.description ||
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
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initial animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".konzept-badge", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
      gsap.from(".konzept-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 0.2,
        ease: "expo.out",
      });
      gsap.from(".konzept-description", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: "expo.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Highlights animation
      if (highlightsRef.current) {
        const cards = highlightsRef.current.querySelectorAll(".highlight-card");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(168, 139, 250, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 217, 72, 0.15) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <div className="konzept-badge inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Unser Konzept
            </span>
          </div>

          {/* Title */}
          <h1 className="konzept-title text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            {m.konzept_title()}
          </h1>

          {/* Description */}
          {page.description && (
            <p className="konzept-description text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              {page.description}
            </p>
          )}
        </div>
      </section>

      {/* Key Highlights */}
      <section ref={highlightsRef} className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date & Location */}
            <div className="highlight-card group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Wann & Wo</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>02. Juni 2026, 8:00 - 14:00 Uhr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Stadeum Stade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="highlight-card group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Teilnehmer</h3>
                  <p className="text-muted-foreground">
                    Alle Erstwähler der Jahrgänge 10+ von drei Stader Schulen
                  </p>
                </div>
              </div>
            </div>

            {/* Format */}
            <div className="highlight-card group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Format</h3>
                  <p className="text-muted-foreground">
                    Podiumsdiskussionen, Parteimarkt und direkter Austausch mit
                    Kandidaten
                  </p>
                </div>
              </div>
            </div>

            {/* Goal */}
            <div className="highlight-card group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Unser Ziel</h3>
                  <p className="text-muted-foreground">
                    Praxisnaher, überparteilicher Zugang zur Kommunalpolitik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 my-16">
        <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Main Content */}
      <section ref={contentRef} className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <MDXContent code={page.mdx} />
          </div>
        </div>
      </section>
    </div>
  );
}
