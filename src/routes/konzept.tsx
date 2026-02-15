import { createFileRoute } from '@tanstack/react-router'
import { getPageContent } from '@/lib/content'
import Markdown from '@/components/Markdown'

export const Route = createFileRoute('/konzept')({
  loader: async () => {
    const content = await getPageContent('konzept')
    return { content }
  },
  component: KonzeptPage,
})

function KonzeptPage() {
  const { content } = Route.useLoaderData()

  if (!content) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Konzept nicht gefunden</h1>
            <p className="text-muted-foreground">Der Inhalt konnte nicht geladen werden.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto prose prose-slate prose-lg">
            <Markdown content={content.content} />
          </article>
        </div>
      </section>
    </div>
  )
}
