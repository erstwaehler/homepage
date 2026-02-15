import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { allPosts } from "#cc";
import * as m from "#p";
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
  const posthog = usePostHog();
  const posts = Route.useLoaderData();
  const currentLocale = getLocale();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m.blog_title()}
          </h1>
          <p className="text-xl text-muted-foreground">{m.blog_subtitle()}</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              onClick={() =>
                posthog.capture("blog_post_selected", {
                  post_slug: post.slug,
                  post_title: post.title,
                  post_author: post.author,
                })
              }
              className="group block bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(currentLocale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              {post.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
