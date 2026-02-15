import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Clock, MapPin, Users, MessageSquare, Building2 } from 'lucide-react'
import * as m from '@/paraglide/messages'
import Countdown from '@/components/Countdown'
import FAQ from '@/components/FAQ'
import Partners from '@/components/Partners'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-primary to-accent/20 opacity-90"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              02. Juni 2026 • Stadeum Stade
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {m.hero_title()}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90 font-light">
              {m.hero_subtitle()}
            </p>
            <p className="text-lg mb-10 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {m.hero_description()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/konzept"
                className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg transition-colors shadow-lg"
              >
                {m.hero_cta()}
              </Link>
              <Link
                to="/team"
                className="px-8 py-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold rounded-lg transition-colors"
              >
                {m.section_team()}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Countdown bis zum Erstwähler Forum
            </h2>
            <Countdown />
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{m.event_date()}</h3>
              <p className="text-muted-foreground">Montag</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{m.event_time()}</h3>
              <p className="text-muted-foreground">Ganztägig</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{m.event_location()}</h3>
              <p className="text-muted-foreground">Stade, Niedersachsen</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              {m.section_about()}
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed text-center mb-8">
                Das Erstwähler Forum 2026 ist eine schulübergreifende Großveranstaltung zur politischen Bildung, 
                die Schülerinnen und Schüler aller teilnehmenden Schulen an einem gemeinsamen Ort zusammenbringt.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Podiumsdiskussionen</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Moderierte Diskussionen zu Themen, die den Alltag junger Menschen unmittelbar betreffen.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Parteimarkt</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Freie Fläche mit Ständen der Parteien, Jugendorganisationen und anderen Organisationen.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Direkte Gespräche</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Gesprächsformate, in denen Schüler direkt mit lokalen Kandidaten ins Gespräch kommen.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Schulübergreifend</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Drei Stader Schulen arbeiten zusammen für eine umfassende politische Bildung.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                to="/konzept"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                {m.read_more()} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Partners Section */}
      <Partners />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Eine einzigartige Initiative
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Dies ist die erste Veranstaltung dieser Art in der Region, wenn nicht sogar in ganz Deutschland. 
              Wir setzen Maßstäbe für innovative politische Bildung.
            </p>
            <Link
              to="/team"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg transition-colors shadow-lg"
            >
              Lerne das Team kennen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
