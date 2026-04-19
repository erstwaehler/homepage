import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Users } from "lucide-react";
import { useEffect } from "react";
import { team } from "#cc";
import * as m from "#p";
import { CiInstagram } from "react-icons/ci";
import { FaMastodon } from "react-icons/fa";
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
  const members = Route.useLoaderData();
  const posthog = usePostHog();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".team-badge", { y: 18, opacity: 0, duration: 0.6 })
        .from(".team-hero h1", { y: 36, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".team-hero p", { y: 22, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".team-card",
          {
            y: 28,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <section className="team-hero mb-16 max-w-4xl">
          <div className="team-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Team
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Gemeinsam organisiert, gemeinsam getragen
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Wir sind ein Schülerteam mit klaren Aufgaben, viel Abstimmung und
            einem gemeinsamen Ziel: das Forum gut und verlässlich umzusetzen.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <Link
              key={member.vorname}
              to="/team/$vorname"
              params={{ vorname: member.vorname }}
              onClick={() =>
                posthog.capture("team_member_clicked", {
                  member_name: member.vorname,
                  member_role: member.rolle,
                  member_school: member.schule,
                })
              }
              className="team-card group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {member.banner_image ? (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <ThumbnailImage
                    src={member.banner_image}
                    alt={`${member.vorname} Banner`}
                    aspectRatio={16 / 9}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card/90 via-card/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="relative aspect-video bg-linear-to-br from-primary/20 via-card to-background flex items-end">
                  <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent" />
                  <div className="relative p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Teammitglied
                    </p>
                    <h2 className="text-2xl font-bold capitalize">
                      {member.vorname}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-4">
                  {member.profile_image ? (
                    <AvatarImage
                      src={member.profile_image}
                      alt={member.vorname}
                      size={80}
                      className="w-16 h-16 border-2 border-border group-hover:border-primary/50 transition-colors duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Users className="w-7 h-7" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold capitalize group-hover:text-primary transition-colors duration-300">
                          {member.vorname}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {member.rolle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        {member.socials?.mastodon && (
                          <FaMastodon
                            className="w-4 h-4"
                            aria-label="Mastodon"
                          />
                        )}
                        {member.socials?.instagram && (
                          <CiInstagram
                            className="w-4 h-4"
                            aria-label="Instagram"
                          />
                        )}
                        {member.email && (
                          <Mail className="w-4 h-4" aria-label="E-Mail" />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Schule:
                        </span>{" "}
                        {member.schule}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
