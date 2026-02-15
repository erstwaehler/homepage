import { createFileRoute, Link } from '@tanstack/react-router'
import { getBlogPosts } from '@/lib/content'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/blog/')({
  loader: async () => {
    const posts = await getBlogPosts()
    return { posts }
  },
  component: BlogPage,
})

function BlogPage() {
  const { posts } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Neuigkeiten, Updates und Hintergrundinformationen zum Erstwähler Forum 2026
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Noch keine Beiträge vorhanden. Schau bald wieder vorbei!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.frontmatter.title}
                        </h2>
                        {post.frontmatter.description && (
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {post.frontmatter.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-primary font-medium">
                          Weiterlesen
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
