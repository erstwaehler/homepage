import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock3, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { allPosts } from "#cc";
import * as m from "#p";
import { HeroImage } from "~/components/OptimizedImage";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import { getLocale } from "~/paraglide/runtime";

export const Route = createFileRoute("/blog/")({
  loader: () =>
    [...allPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  component: BlogListPage,
  head: () => {
    const title = `${m.blog_title()} - ${m.site_title()}`;
    const description = m.blog_subtitle();

    return generateMetaTags({
      title,
      description,
      url: "/blog",
      type: "website",
    });
  },
});

function BlogListPage() {
  const posts = Route.useLoaderData();
  const currentLocale = getLocale();
  const posthog = usePostHog();

  const [featuredPost, ...otherPosts] = posts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".blog-badge", { y: 18, opacity: 0, duration: 0.6 })
        .from(".blog-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".blog-hero p", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".featured-post", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".more-stories", { y: 32, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".blog-post",
          {
            y: 28,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.85",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <section className="blog-hero mb-16 max-w-4xl">
          <div className="blog-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Blog
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            {m.blog_title()}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {m.blog_subtitle()}
          </p>
        </section>

        {featuredPost && (
          <section className="featured-post mb-20">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
              <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Neuester Beitrag
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
                    {featuredPost.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={featuredPost.date}>
                        {new Date(featuredPost.date).toLocaleDateString(
                          currentLocale,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                    </div>

                    {featuredPost.author && (
                      <>
                        <span>•</span>
                        <span>{featuredPost.author}</span>
                      </>
                    )}
                  </div>

                  {featuredPost.description && (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                      {featuredPost.description}
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    onClick={() =>
                      posthog.capture("blog_post_clicked", {
                        post_slug: featuredPost.slug,
                        post_title: featuredPost.title,
                        post_type: "featured",
                      })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-3"
                  >
                    <span className="font-medium">Mehr lesen</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                onClick={() =>
                  posthog.capture("blog_post_clicked", {
                    post_slug: featuredPost.slug,
                    post_title: featuredPost.title,
                    post_type: "featured",
                  })
                }
                className="group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10 min-h-105 md:min-h-140"
              >
                {featuredPost.banner ? (
                  <>
                    <HeroImage
                      src={featuredPost.banner}
                      alt={featuredPost.bannerCredit || featuredPost.title}
                      aspectRatio={1}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#070708] via-[#070708]/50 to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                        Featured
                      </div>
                      <p className="text-white/90 text-lg md:text-xl font-medium">
                        {featuredPost.description || featuredPost.title}
                      </p>
                      {featuredPost.bannerCredit && (
                        <p className="text-white/60 text-xs leading-relaxed max-w-xs">
                          {featuredPost.bannerCredit}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-card to-background" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="max-w-sm text-center space-y-5">
                        <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold text-white leading-tight">
                          {featuredPost.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {featuredPost.description || "Aktueller Beitrag"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </div>
          </section>
        )}

        {otherPosts.length > 0 && (
          <section className="more-stories">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-3xl font-bold">Weitere Beiträge</h2>
              <p className="text-sm text-muted-foreground max-w-md hidden md:block">
                Ein Blick hinter die Kulissen, Updates und Einordnungen rund um
                das Erstwählerforum.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  onClick={() =>
                    posthog.capture("blog_post_clicked", {
                      post_slug: post.slug,
                      post_title: post.title,
                      post_type: "other",
                    })
                  }
                  className="blog-post group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className="h-32 bg-linear-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(currentLocale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post.author && (
                        <>
                          <span>•</span>
                          <span>{post.author}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-primary pt-2">
                      <span className="font-medium">Weiterlesen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {posts.length === 0 && (
        <div className="empty-state flex min-h-[55vh] items-center justify-center">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="flex justify-center">
              <div className="relative">
                <Sparkles className="w-24 h-24 text-primary/20 absolute blur-xl" />
                <Sparkles className="w-24 h-24 text-primary relative" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Noch keine Beiträge vorhanden
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hier erscheinen bald aktuelle Informationen, Berichte und
                Einblicke rund um das Erstwählerforum 2026.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:gap-3"
            >
              <span>Zur Startseite</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
