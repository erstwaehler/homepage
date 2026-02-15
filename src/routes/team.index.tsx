import { createFileRoute, Link } from '@tanstack/react-router'
import { getTeamMembers, type TeamMember } from '@/lib/team'
import { Mail, Instagram, Linkedin } from 'lucide-react'

export const Route = createFileRoute('/team/')({
  loader: async () => {
    const team = await getTeamMembers()
    return { team }
  },
  component: TeamPage,
})

function TeamPage() {
  const { team } = Route.useLoaderData()

  const schools = {
    VLG: 'Vincent-Lübeck-Gymnasium',
    IGS: 'IGS Stade',
    ATHE: 'Gymnasium Athenaeum Stade',
    Jugendring: 'Jugendring (Beratung)',
  }

  const groupedTeam = team.reduce((acc, member) => {
    const school = member.schule || 'Jugendring'
    if (!acc[school]) {
      acc[school] = []
    }
    acc[school].push(member)
    return acc
  }, {} as Record<string, TeamMember[]>)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unser Team</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Das Erstwähler Forum wird von engagierten Schülerinnen und Schülern aus drei Stader Schulen organisiert,
              unterstützt von erfahrenen Vertretern der Jugendringe.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members by School */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {Object.entries(groupedTeam).map(([school, members]) => (
            <div key={school} className="mb-16 last:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {schools[school as keyof typeof schools] || school}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {members.map((member) => (
                  <TeamCard key={member.vorname} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Kontakt zum Team
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Habt ihr Fragen oder Anregungen? Wir freuen uns auf eure Nachricht!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@ewf-stade.de"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@ewf-stade.de
              </a>
              <a
                href="mailto:team@ewf-stade.de"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                team@ewf-stade.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      to="/team/$vorname"
      params={{ vorname: member.vorname.toLowerCase() }}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={member.picture_profile}
          alt={`${member.vorname} ${member.nachname}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E' + member.vorname.charAt(0) + member.nachname.charAt(0) + '%3C/text%3E%3C/svg%3E'
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {member.vorname} {member.nachname}
        </h3>
        <p className="text-sm text-accent font-medium mb-2">{member.rolle}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.schule}</p>
        {member.bio && (
          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        )}
        <div className="flex gap-3 mt-4">
          {member.email && (
            <Mail className="w-4 h-4 text-muted-foreground" />
          )}
          {member.social?.instagram && (
            <Instagram className="w-4 h-4 text-muted-foreground" />
          )}
          {member.social?.linkedin && (
            <Linkedin className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </Link>
  )
}
