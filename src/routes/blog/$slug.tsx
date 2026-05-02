import { MDXContent } from "@content-collections/mdx/react";
import { usePostHog } from "@posthog/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ExternalLink, Share2, User } from "lucide-react";
import { useEffect } from "react";
import { allPosts } from "#cc";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import {
  generateArticleSchema,
  generateMetaTags,
  SITE_BASE_URL,
} from "~/lib/meta";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = allPosts.find((entry) => entry.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostPage,
  head: ({ loaderData }) => {
    const post = loaderData;
    if (!post) {
      throw notFound();
    }
    const title = `${post.title} - ${m.site_title()}`;
    const description = post.description || post.title;
    const url = `/blog/${post.slug}`;
    const image = post.banner
      ? `${SITE_BASE_URL}${post.banner}`
      : `${SITE_BASE_URL}/og-image.png`;

    return {
      ...generateMetaTags({
        title,
        description,
        url,
        type: "article",
        author: post.author,
        publishedTime: post.date,
        image,
      }),
      scripts: [
        generateArticleSchema({
          headline: post.title,
          description,
          author: post.author || m.team_press(),
          datePublished: post.date,
          dateModified: post.date,
          image,
          url: `${SITE_BASE_URL}${url}`,
        }),
      ],
    };
  },
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("blog_post_viewed", {
      post_slug: post.slug,
      post_title: post.title,
      post_author: post.author,
      post_date: post.date,
    });
  }, [post.slug, post.title, post.author, post.date, posthog]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".article-backlink", {
        x: -20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".article-kicker",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        )
        .from(
          ".article-title",
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.2",
        )
        .from(
          ".article-meta",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          ".article-banner",
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".article-description",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        )
        .from(
          ".article-body > *",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.15",
        );
    });

    return () => ctx.revert();
  }, []);

  const formattedDate = new Date(post.date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canShare =
    typeof navigator !== "undefined" &&
    "share" in navigator &&
    typeof window !== "undefined";

  const articleUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : `${SITE_BASE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/blog"
          className="article-backlink inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {m.blog_back()}
        </Link>

        <article className="relative">
          <header className="mb-10">
            <div className="article-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Blog
            </div>

            <h1 className="article-title max-w-4xl text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="article-meta flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>

              {post.author && (
                <>
                  <span className="hidden sm:inline text-border">•</span>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </>
              )}

              <span className="hidden sm:inline text-border">•</span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Mehr erfahren
              </a>

              {canShare && (
                <>
                  <span className="hidden sm:inline text-border">•</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.share({
                        title: post.title,
                        text: post.description || post.title,
                        url: articleUrl,
                      });
                    }}
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Teilen
                  </button>
                </>
              )}
            </div>
          </header>

          {post.banner && (
            <div className="article-banner relative mb-12 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src={post.banner}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
                {post.bannerCredit && (
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <p className="inline-flex max-w-[90%] rounded-full bg-black/50 px-3 py-1.5 text-xs leading-relaxed text-white/80 backdrop-blur-sm">
                      {post.bannerCredit}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {post.description && (
            <p className="article-description max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
              {post.description}
            </p>
          )}

          <div className="article-body prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-p:leading-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-hr:border-border prose-img:rounded-2xl prose-img:shadow-lg">
            <MDXContent code={post.mdx} />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {m.blog_back_to_list()}
          </Link>

          <div className="text-sm text-muted-foreground">
            Erstwähler Forum 2026
          </div>
        </div>
      </div>
    </div>
  );
}
