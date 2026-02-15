export default function Partners() {
  const schools = [
    {
      name: 'Gymnasium Athenaeum Stade',
      type: 'Träger',
      description: 'Traditionsreiches Gymnasium in Stade',
    },
    {
      name: 'IGS Stade',
      type: 'Träger',
      description: 'Integrierte Gesamtschule Stade',
    },
    {
      name: 'Vincent-Lübeck-Gymnasium',
      type: 'Träger',
      description: 'Gymnasium mit musischem Schwerpunkt',
    },
  ]

  const supporters = [
    {
      name: 'Stadtjugendring Stade',
      type: 'Unterstützer',
      description: 'Beratung und Räumlichkeiten',
    },
    {
      name: 'Kreisjugendring Stade',
      type: 'Unterstützer',
      description: 'Fachliche Beratung',
    },
    {
      name: 'Stadeum Stade',
      type: 'Veranstaltungsort',
      description: 'Moderne Event-Location',
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Partner & Unterstützer
          </h2>
          <p className="text-muted-foreground text-center mb-12 leading-relaxed max-w-2xl mx-auto">
            Das Erstwähler Forum wird von drei Stader Schulen getragen und von lokalen Organisationen unterstützt.
          </p>

          {/* Träger */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Träger der Veranstaltung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schools.map((school) => (
                <div
                  key={school.name}
                  className="bg-card border-2 border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {school.name.split(' ')[0].substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{school.name}</h4>
                  <p className="text-xs text-accent font-medium mb-2">{school.type}</p>
                  <p className="text-sm text-muted-foreground">{school.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unterstützer */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Unterstützer & Partner
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supporters.map((supporter) => (
                <div
                  key={supporter.name}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-accent">
                      {supporter.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{supporter.name}</h4>
                  <p className="text-xs text-muted-foreground font-medium mb-2">{supporter.type}</p>
                  <p className="text-sm text-muted-foreground">{supporter.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-8 text-center">
            <p className="text-lg text-foreground/90 font-medium">
              Ein großes Dankeschön an alle Partner und Unterstützer, die das Erstwähler Forum möglich machen!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
