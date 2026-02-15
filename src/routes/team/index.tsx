import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { teamMembers } from "~/data/team";
import * as m from "#p";

export const Route = createFileRoute("/team/")({
  loader: () => teamMembers,
  component: TeamListPage,
});

function TeamListPage() {
  const posthog = usePostHog();
  const team = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {m.team_title()}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {m.team_description()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <Link
              key={member.vorname}
              to="/team/$vorname"
              params={{ vorname: member.vorname }}
              onClick={() =>
                posthog.capture("team_member_selected", {
                  member_name: member.vorname,
                  member_role: member.rolle,
                  member_school: member.schule,
                })
              }
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={member.banner_image}
                  alt={`${member.vorname} Banner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={member.profile_image}
                    alt={member.vorname}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold capitalize">
                      {member.vorname}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.rolle}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-medium">
                      {m.team_school()}:
                    </span>
                    <span className="text-foreground">{member.schule}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
