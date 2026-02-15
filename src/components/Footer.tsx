import { Link } from '@tanstack/react-router'
import { Mail, MapPin } from 'lucide-react'
import * as m from '@/paraglide/messages'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-4">
              <span className="text-primary">EWF</span>
              <span className="text-accent">26</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Erstwähler Forum 2026 - Eine schulübergreifende Initiative für politische Bildung in Stade.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_home()}
              </Link>
              <Link
                to="/konzept"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_konzept()}
              </Link>
              <Link
                to="/team"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_team()}
              </Link>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_blog()}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Rechtliches</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/impressum"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_impressum()}
              </Link>
              <Link
                to="/traeger"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {m.nav_traeger()}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{m.contact()}</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@ewf-stade.de"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@ewf-stade.de
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Harsefelder Straße 40</div>
                  <div>21680 Stade</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Erstwähler Forum Stade. Alle Rechte vorbehalten.</p>
            <p className="text-xs">
              Getragen von Gymnasium Athenaeum, IGS Stade & Vincent-Lübeck-Gymnasium
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
