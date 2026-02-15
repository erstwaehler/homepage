import { createFileRoute } from "@tanstack/react-router";
import { Building2, Heart, Users } from "lucide-react";
import * as m from "@/paraglide/messages";

export const Route = createFileRoute("/traeger/")({
  component: TraegerPage,
});

function TraegerPage() {
  const schools = [
    {
      name: "Gymnasium Athenaeum Stade",
      description:
        "Das Gymnasium Athenaeum Stade ist eine der ältesten Schulen in Norddeutschland und steht für exzellente Bildung und Tradition.",
      website: "https://www.gymnasium-athenaeum-stade.de",
    },
    {
      name: "IGS Stade",
      description:
        "Die Integrierte Gesamtschule Stade bietet ein modernes Bildungskonzept mit individueller Förderung für alle Schülerinnen und Schüler.",
      website: "https://www.igs-stade.de",
    },
    {
      name: "Vincent-Lübeck-Gymnasium",
      description:
        "Das Vincent-Lübeck-Gymnasium verbindet musische Bildung mit naturwissenschaftlichem Schwerpunkt und fördert vielfältige Talente.",
      website: "https://www.vlg-stade.de",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m.traeger_title()}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Das Erstwähler Forum 2026 wird getragen von drei Stader Schulen, die
            gemeinsam diese einzigartige Veranstaltung zur politischen Bildung
            ermöglichen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {schools.map((school) => (
            <div
              key={school.name}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all"
            >
              <Building2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{school.name}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {school.description}
              </p>
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Zur Website →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/schulen/schulleitungen.png"
                alt="Schulleitungen"
                className="w-full rounded-lg border border-border"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Gemeinsame Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Die Schulleitungen aller drei Schulen haben das Erstwähler
                  Forum als offizielle Pflichtveranstaltung genehmigt. Diese
                  schulübergreifende Kooperation zeigt das gemeinsame Engagement
                  für politische Bildung und demokratische Partizipation junger
                  Menschen.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Besonderer Dank</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ein großes Dankeschön gilt dem{" "}
                  <strong>Stadtjugendring Stade</strong> und dem{" "}
                  <strong>Kreisjugendring Stade</strong> für ihre wertvolle
                  Unterstützung und die Bereitstellung von Räumlichkeiten für
                  die Organisation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Drei beratende Vertreter der Jugendringe begleiten das
                  Planungsteam und bringen ihre Expertise in der Jugendarbeit
                  und politischen Bildung ein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
