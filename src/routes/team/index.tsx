import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { team } from "#cc";
import * as m from "#p";
import { FaMastodon } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { AvatarImage, ThumbnailImage } from "~/components/OptimizedImage";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/team/")({
  loader: () => team.members,
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
  const team = Route.useLoaderData();
  const posthog = usePostHog();

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

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:_balance]">
          {team.map((member) => (
            <div key={member.vorname} className="mb-8 break-inside-avoid">
              <Link
                to="/team/$vorname"
                params={{ vorname: member.vorname }}
                onClick={() =>
                  posthog.capture("team_member_clicked", {
                    member_name: member.vorname,
                    member_role: member.rolle,
                    member_school: member.schule,
                  })
                }
                className="team-card group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {member.banner_image && (
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <ThumbnailImage
                      src={member.banner_image}
                      alt={`${member.vorname} Banner`}
                      aspectRatio={16 / 9}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {member.profile_image && (
                      <AvatarImage
                        src={member.profile_image}
                        alt={member.vorname}
                        size={64}
                        className="w-16 h-16 border-2 border-border group-hover:border-primary/50 transition-colors duration-300"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold capitalize group-hover:text-primary transition-colors duration-300">
                        {member.vorname}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.rolle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground shrink-0 pt-1">
                      {member.socials?.mastodon && (
                        <FaMastodon className="w-5 h-5" aria-label="Mastodon" />
                      )}
                      {member.socials?.instagram && (
                        <CiInstagram
                          className="w-5 h-5"
                          aria-label="Instagram"
                        />
                      )}
                      {member.email && (
                        <Mail className="w-5 h-5" aria-label="E-Mail" />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
