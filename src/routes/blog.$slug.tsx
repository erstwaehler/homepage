import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getBlogPost } from '@/lib/content'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Markdown from '@/components/Markdown'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getBlogPost(params.slug)
    if (!post) {
      throw notFound()
    }
    return { post }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Blog
            </Link>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                {post.frontmatter.title}
              </h1>
              {post.frontmatter.description && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.frontmatter.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {post.frontmatter.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                )}
                {post.frontmatter.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.frontmatter.author}</span>
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-slate prose-lg max-w-none">
              <Markdown content={post.content} />
            </div>

            <footer className="mt-12 pt-8 border-t border-border">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Alle Beiträge ansehen
              </Link>
            </footer>
          </article>
        </div>
      </section>
    </div>
  )
}
