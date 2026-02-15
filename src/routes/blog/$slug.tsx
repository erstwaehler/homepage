import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { allPosts } from "#cc";
import * as m from "#p";
import {
  generateArticleSchema,
  generateMetaTags,
  SITE_BASE_URL,
} from "~/lib/meta";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostPage,
  head: ({ loaderData: post }) => {
    const title = `${post.title} - ${m.site_title()}`;
    const description = post.description || post.title;
    const url = `/blog/${post.slug}`;
    const image = `${SITE_BASE_URL}/og-image.png`;

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
          author: post.author || "Erstwähler Forum Team",
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {m.blog_back()}
        </Link>

        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {post.author && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <MDXContent code={post.mdx} />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Alle Beiträge ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}
