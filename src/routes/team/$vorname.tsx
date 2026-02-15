import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { loadTeamMembers } from "@/lib/team";
import * as m from "@/paraglide/messages";

export const Route = createFileRoute("/team/$vorname")({
  loader: ({ params }) => {
    const team = loadTeamMembers();
    const member = team.find((m) => m.vorname === params.vorname);
    if (!member) throw notFound();
    return member;
  },
  component: TeamMemberPage,
});

function TeamMemberPage() {
  const member = Route.useLoaderData();
  const hasEmail = ["jack", "maite", "joshua", "oskar"].includes(
    member.vorname,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-80 bg-muted overflow-hidden">
        <img
          src={member.banner_image}
          alt={`${member.vorname} Banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-32 relative">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Team
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={member.profile_image}
              alt={member.vorname}
              className="w-32 h-32 rounded-full object-cover border-4 border-border"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-bold capitalize mb-2">
                {member.vorname}
              </h1>
              <p className="text-xl text-primary mb-4">{member.rolle}</p>

              <div className="space-y-2 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{m.team_school()}:</span>
                  <span>{member.schule}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {hasEmail && (
                  <a
                    href={`mailto:${member.vorname}@ewf-stade.de`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    E-Mail
                  </a>
                )}
                {member.mastodon && (
                  <a
                    href={member.mastodon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    Mastodon
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Über {member.vorname}</h2>
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
