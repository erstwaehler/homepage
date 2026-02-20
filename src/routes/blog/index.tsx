import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { useEffect } from "react";
import { allPosts } from "#cc";
import * as m from "#p";
import { HeroImage } from "~/components/OptimizedImage";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import { getLocale } from "~/paraglide/runtime";

export const Route = createFileRoute("/blog/")({
  loader: () => {
    return [...allPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
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
      gsap.from(".blog-hero h1", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });
      gsap.from(".blog-hero p", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "expo.out",
      });
      gsap.from(".featured-post", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "expo.out",
      });
      gsap.from(".more-stories", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "expo.out",
      });
      gsap.from(".blog-post", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.6,
        ease: "expo.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="blog-hero mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            {m.blog_title()}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            {m.blog_subtitle()}
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="featured-post mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Featured Post Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wider">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Neuester Beitrag
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {featuredPost.description}
                  </p>
                )}
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:gap-3 group">
                  <span className="font-medium">Mehr lesen</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Featured Post Card */}
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
                className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 via-primary/10 to-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]">
                {featuredPost.banner ? (
                  <>
                    <HeroImage
                      src={featuredPost.banner}
                      alt={featuredPost.title}
                      aspectRatio={4 / 3}
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Calendar className="w-10 h-10 text-primary" />
                        </div>
                        <p className="text-6xl font-bold text-primary">
                          {new Date(featuredPost.date).toLocaleDateString(
                            currentLocale,
                            {
                              day: "numeric",
                            },
                          )}
                        </p>
                        <p className="text-xl text-muted-foreground">
                          {new Date(featuredPost.date).toLocaleDateString(
                            currentLocale,
                            {
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </div>
          </div>
        )}

        {/* More Stories */}
        {otherPosts.length > 0 && (
          <div className="more-stories">
            <h2 className="text-3xl font-bold mb-8">Weitere Beiträge</h2>
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
                  className="blog-post group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Card Header with Gradient */}
                  <div className="h-32 bg-linear-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-xl text-muted-foreground">
              Noch keine Beiträge vorhanden.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
