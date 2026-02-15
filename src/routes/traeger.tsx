import { createFileRoute } from '@tanstack/react-router'
import { School, Heart } from 'lucide-react'

export const Route = createFileRoute('/traeger')({
  component: TraegerPage,
})

function TraegerPage() {
  const schools = [
    {
      name: 'Gymnasium Athenaeum Stade',
      short: 'ATHE',
      description: 'Das Gymnasium Athenaeum Stade ist eine der traditionsreichsten Schulen der Region und unterstützt das Erstwähler Forum als Träger.',
    },
    {
      name: 'IGS Stade',
      short: 'IGS',
      description: 'Die Integrierte Gesamtschule Stade bringt ihre Expertise in inklusiver Bildung in das Projekt ein.',
    },
    {
      name: 'Vincent-Lübeck-Gymnasium',
      short: 'VLG',
      description: 'Das Vincent-Lübeck-Gymnasium ist ein wichtiger Träger der Veranstaltung und fördert aktiv politische Bildung.',
    },
  ]

  const supporters = [
    {
      name: 'Stadtjugendring Stade',
      role: 'Beratung & Räumlichkeiten',
      description: 'Der Stadtjugendring unterstützt das Forum mit fachlicher Beratung und stellt Räumlichkeiten für die Organisation zur Verfügung.',
    },
    {
      name: 'Kreisjugendring Stade',
      role: 'Beratung & Unterstützung',
      description: 'Der Kreisjugendring berät das Organisationsteam bei der Planung und Durchführung der Veranstaltung.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Träger & Unterstützer</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Das Erstwähler Forum wird getragen von drei Stader Schulen und unterstützt von den lokalen Jugendringen.
            </p>
          </div>
        </div>
      </section>

      {/* Träger Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <School className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Träger der Veranstaltung</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {schools.map((school) => (
                <div
                  key={school.short}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{school.short}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{school.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{school.description}</p>
                </div>
              ))}
            </div>

            {/* School Leadership Image Placeholder */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <img
                src="/schulen/schulleitungen.png"
                alt="Schulleitungen der drei Träger-Schulen"
                className="max-w-full h-auto mx-auto rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
              <p className="text-sm text-muted-foreground mt-4">
                Die Schulleitungen der drei Träger-Schulen unterstützen das Erstwähler Forum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unterstützer Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Heart className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Unterstützer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {supporters.map((supporter) => (
                <div
                  key={supporter.name}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">{supporter.name}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{supporter.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{supporter.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
              <p className="text-foreground/90 font-medium">
                Ein großes Dankeschön an die Jugendringe für ihre Unterstützung und die Bereitstellung von Räumlichkeiten zur Organisation!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Zusammenarbeit für politische Bildung
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Die Kooperation zwischen den drei Schulen und den Jugendringen zeigt, 
              wie effektiv schulübergreifende Zusammenarbeit sein kann. 
              Gemeinsam schaffen wir ein einzigartiges Format für politische Bildung in der Region.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
