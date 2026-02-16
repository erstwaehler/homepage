import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import * as m from "#p";
import { AvatarImage, ThumbnailImage } from "~/components/OptimizedImage";
import { teamMembers } from "~/data/team";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/team/")({
  loader: () => teamMembers,
  component: TeamListPage,
  head: () => {
    const title = `${m.team_title()} - ${m.site_title()}`;
    const description = m.team_description();

    return generateMetaTags({
      title,
      description,
      url: "/team",
      type: "website",
    });
  },
});

function TeamListPage() {
  const posthog = usePostHog();
  const team = Route.useLoaderData();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-hero h1", {
        y: 40,
        duration: 0.8,
        ease: "expo.out",
      });
      gsap.from(".team-hero p", {
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: "expo.out",
      });
      gsap.from(".team-card", {
        y: 50,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.3,
        ease: "expo.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="team-hero mb-12 text-center">
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
              className="team-card group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <ThumbnailImage
                  src={member.banner_image}
                  alt={`${member.vorname} Banner`}
                  aspectRatio={16 / 9}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <AvatarImage
                    src={member.profile_image}
                    alt={member.vorname}
                    size={64}
                    className="w-16 h-16 border-2 border-border group-hover:border-primary/50 transition-colors duration-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold capitalize group-hover:text-primary transition-colors duration-300">
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
