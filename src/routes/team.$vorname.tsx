import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getTeamMember } from '@/lib/team'
import { Mail, Instagram, Linkedin, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/team/$vorname')({
  loader: async ({ params }) => {
    const member = await getTeamMember(params.vorname)
    if (!member) {
      throw notFound()
    }
    return { member }
  },
  component: TeamMemberPage,
})

function TeamMemberPage() {
  const { member } = Route.useLoaderData()

  const schools = {
    VLG: 'Vincent-Lübeck-Gymnasium',
    IGS: 'IGS Stade',
    ATHE: 'Gymnasium Athenaeum Stade',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <section className="relative h-80 bg-muted overflow-hidden">
        <img
          src={member.picture_banner}
          alt={`${member.vorname} Banner`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"%3E%3Crect fill="%23e5e7eb" width="1200" height="400"/%3E%3C/svg%3E'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </section>

      {/* Profile Section */}
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative -mt-32 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={member.picture_profile}
                  alt={`${member.vorname} ${member.nachname}`}
                  className="w-48 h-48 rounded-lg border-4 border-background shadow-xl object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="192" height="192"%3E%3Crect fill="%23e5e7eb" width="192" height="192"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="48" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E' + member.vorname.charAt(0) + member.nachname.charAt(0) + '%3C/text%3E%3C/svg%3E'
                  }}
                />
                <div className="flex-1 pt-0 md:pt-8">
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zum Team
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {member.vorname} {member.nachname}
                  </h1>
                  <p className="text-lg text-accent font-medium mb-2">{member.rolle}</p>
                  <p className="text-muted-foreground mb-4">
                    {schools[member.schule as keyof typeof schools] || member.schule}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        E-Mail
                      </a>
                    )}
                    {member.social?.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border hover:bg-accent text-foreground rounded-md transition-colors text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border hover:bg-accent text-foreground rounded-md transition-colors text-sm"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Über {member.vorname}</h2>
              <p className="text-foreground/90 leading-relaxed">{member.bio}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Rolle</h3>
                <p className="text-muted-foreground">{member.rolle}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Schule/Organisation</h3>
                <p className="text-muted-foreground">
                  {schools[member.schule as keyof typeof schools] || member.schule}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
