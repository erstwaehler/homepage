import { usePostHog } from "@posthog/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect } from "react";
import * as m from "#p";
import { AvatarImage, HeroImage } from "~/components/OptimizedImage";
import { teamMembers } from "~/data/team";
import { gsap } from "~/lib/gsap";
import {
  generateMetaTags,
  generatePersonSchema,
  SITE_BASE_URL,
} from "~/lib/meta";

export const Route = createFileRoute("/team/$vorname")({
  loader: ({ params }) => {
    const member = teamMembers.find((tm) => tm.vorname === params.vorname);
    if (!member) throw notFound();
    return member;
  },
  component: TeamMemberPage,
  head: ({ loaderData: member }) => {
    if (!member) {
      return generateMetaTags({
        title: m.site_title(),
        description: m.site_description(),
        url: "/team",
        type: "website",
      });
    }

    const name =
      member.vorname.charAt(0).toUpperCase() + member.vorname.slice(1);
    const title = `${name} - ${member.rolle} - ${m.site_title()}`;
    const description = member.bio;
    const url = `/team/${member.vorname}`;
    const image = `${SITE_BASE_URL}${member.profile_image}`;
    const hasEmail = ["jack", "maite", "joshua", "oskar"].includes(
      member.vorname,
    );

    return {
      ...generateMetaTags({
        title,
        description,
        url,
        type: "profile",
        image,
      }),
      scripts: [
        generatePersonSchema({
          name,
          jobTitle: member.rolle,
          description: member.bio,
          image,
          url: `${SITE_BASE_URL}${url}`,
          ...(hasEmail ? { email: `${member.vorname}@ewf-stade.de` } : {}),
        }),
      ],
    };
  },
});

function TeamMemberPage() {
  const posthog = usePostHog();
  const member = Route.useLoaderData();
  const hasEmail = ["jack", "maite", "joshua", "oskar"].includes(
    member.vorname,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".member-banner img", {
        scale: 1.1,
        duration: 1.2,
        ease: "expo.out",
      });
      gsap.from(".member-back-link", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: 0.2,
        ease: "expo.out",
      });
      gsap.from(".member-profile-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.3,
        ease: "expo.out",
      });
      gsap.from(".member-bio-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.5,
        ease: "expo.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="member-banner relative h-80 bg-muted overflow-hidden">
        <HeroImage
          src={member.banner_image}
          alt={`${member.vorname} Banner`}
          aspectRatio={21 / 9}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-32 relative">
        <Link
          to="/team"
          className="member-back-link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Team
        </Link>

        <div className="member-profile-card bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <AvatarImage
              src={member.profile_image}
              alt={member.vorname}
              size={128}
              className="w-32 h-32 border-4 border-border"
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
                    onClick={() =>
                      posthog.capture("team_member_email_clicked", {
                        member_name: member.vorname,
                        member_role: member.rolle,
                      })
                    }
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
                    onClick={() =>
                      posthog.capture("team_member_mastodon_clicked", {
                        member_name: member.vorname,
                        mastodon_url: member.mastodon,
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    Mastodon
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="member-bio-card bg-card border border-border rounded-2xl p-8">
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
