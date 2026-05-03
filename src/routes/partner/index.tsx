import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  BriefcaseBusiness,
  Mail,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { useEffect } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import HeroBadge from "~/components/HeroBadge";
import PageHero from "~/components/PageHero";
import SectionCard from "~/components/SectionCard";
import { PreLaunchErrorPage } from "~/components/pre-launch-errorpage";
import { RedactEventData } from "~/lib/constants";

type PartnerData = {
  title: string;
  description: string;
  schools: Array<{
    name: string;
    studentsSent: number;
    note?: string;
  }>;
  supporters: Array<{
    name: string;
    kind: "schule" | "foerderverein" | "partner" | "presse" | "sonstiges";
    description?: string;
    amount?: number;
    status: "confirmed" | "pending" | "declined";
  }>;
  policy: {
    noPrivateDonations: true;
    noAdsOrTitleSponsors: true;
    noDonationReceipts: true;
    backgroundCheckRequired: true;
    responseTimeBusinessDays: 2;
    replyEmail: string;
    contactEmail: string;
    contactDescription?: string;
  };
  publicNotes?: string[];
};

const fallbackPartnerData: PartnerData = {
  title: "Partner & Unterstützer",
  description:
    "Informationen zu Unterstützung, Schulen, Fördervereinen und den Regeln für Partner beim Erstwählerforum 2026.",
  schools: [
    {
      name: "Gymnasium Athenaeum Stade",
      studentsSent: 0,
      note: "Gesendete Schülerzahl wird nach finaler Rückmeldung ergänzt.",
    },
    {
      name: "IGS Stade",
      studentsSent: 0,
      note: "Gesendete Schülerzahl wird nach finaler Rückmeldung ergänzt.",
    },
    {
      name: "Vincent-Lübeck-Gymnasium",
      studentsSent: 0,
      note: "Gesendete Schülerzahl wird nach finaler Rückmeldung ergänzt.",
    },
    {
      name: "Realschule Camper Höhe",
      studentsSent: 0,
      note: "Gesendete Schülerzahl wird nach finaler Rückmeldung ergänzt.",
    },
  ],
  supporters: [
    {
      name: "Förderverein Gymnasium Athenaeum Stade",
      kind: "foerderverein",
      description: "Unterstützung für die diesjährige Veranstaltung",
      amount: 1000,
      status: "confirmed",
    },
    {
      name: "Förderverein IGS Stade",
      kind: "foerderverein",
      description: "Unterstützung für die diesjährige Veranstaltung",
      amount: 1000,
      status: "confirmed",
    },
    {
      name: "Förderverein Vincent-Lübeck-Gymnasium",
      kind: "foerderverein",
      description: "Unterstützung für die diesjährige Veranstaltung",
      amount: 1000,
      status: "confirmed",
    },
    {
      name: "Förderverein Realschule Camper Höhe",
      kind: "foerderverein",
      description: "Unterstützung für die diesjährige Veranstaltung",
      amount: 400,
      status: "confirmed",
    },
  ],
  policy: {
    noPrivateDonations: true,
    noAdsOrTitleSponsors: true,
    noDonationReceipts: true,
    backgroundCheckRequired: true,
    responseTimeBusinessDays: 2,
    replyEmail: "partner@ewf-stade.de",
    contactEmail: "partner@ewf-stade.de",
    contactDescription:
      "Anfragen zu Kooperationen, Förderungen und Unterstützungsformen",
  },
  publicNotes: [
    "Wir sind aktuell eine Schülerinitiative und kein eingetragener Verein. Deshalb können wir keine Spendenquittungen ausstellen.",
    "Für die diesjährige Veranstaltung nehmen wir keine Werbepartner oder Titelsponsoren an.",
    "Unterstützer erscheinen weder auf der Veranstaltung noch in unseren Materialien; sichtbar ist nur die Web-Liste sowie ggf. ein dedizierter Blogpost oder eine Pressemitteilung nach Absprache.",
    "Partner und Unterstützer werden vor Aufnahme geprüft, damit sie mit unseren Grundsätzen zu Demokratie und Rechtsstaatlichkeit übereinstimmen.",
    "Pressemitteilungen mit Partnerbezug werden vor Veröffentlichung zur Freigabe versendet; die Rückmeldung muss innerhalb von maximal 2 Werktagen erfolgen.",
    "Private Spenden nehmen wir in diesem Jahr aus infrastrukturellen und steuerlichen Gründen nicht an.",
  ],
};

const CATEGORY_LABELS: Record<
  PartnerData["supporters"][number]["kind"],
  string
> = {
  schule: "Schule",
  foerderverein: "Förderverein",
  partner: "Partner",
  presse: "Presse",
  sonstiges: "Sonstiges",
};

function getPartnerData(): PartnerData {
  return fallbackPartnerData;
}

export const Route = createFileRoute("/partner/")({
  component: RedactEventData ? PreLaunchErrorPage : PartnerPage,
  head: () => {
    const title = `Partner & Unterstützer - ${m.site_title()}`;
    const description =
      "Informationen zu Unterstützern, Partnerregeln, Schulen und Fördervereinen des Erstwählerforums 2026.";

    return generateMetaTags({
      title,
      description,
      url: "/partner",
      type: "website",
    });
  },
});

function PartnerPage() {
  const data = getPartnerData();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".partner-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".partner-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".partner-hero p", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(
          ".partner-card",
          {
            y: 32,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.25",
        )
        .from(
          ".partner-list-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.05,
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <PageHero
          className="partner-hero"
          badge={
            <HeroBadge icon={<Users2 className="w-4 h-4" />}>
              Partner & Unterstützer
            </HeroBadge>
          }
          title="Unterstützung, die wirklich hilft"
          subtitle={
            <>
              Das Erstwählerforum lebt von Menschen und Organisationen, die das
              Projekt ideell, praktisch oder finanziell mittragen — ohne daraus
              ein Werbeformat zu machen.
            </>
          }
          actions={
            <>
              <a
                href="mailto:partner@ewf-stade.de"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-3"
              >
                <Mail className="w-4 h-4" />
                partner@ewf-stade.de
              </a>

              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
              >
                Allgemeine Anfrage
              </Link>
            </>
          }
        />

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mb-10">
          <div className="space-y-6">
            <SectionCard
              className="partner-card"
              icon={<ShieldCheck className="w-5 h-5 text-primary" />}
              title="Unsere Leitlinien"
              contentClassName="grid gap-4"
            >
              {data.publicNotes?.map((note) => (
                <div
                  key={note}
                  className="partner-list-item rounded-2xl border border-border/70 bg-background/60 p-4 leading-relaxed text-muted-foreground"
                >
                  {note}
                </div>
              ))}
            </SectionCard>

            <SectionCard
              className="partner-card"
              icon={<BadgeCheck className="w-5 h-5 text-primary" />}
              title="Was wir anbieten können"
              contentClassName="grid gap-4 md:grid-cols-2"
            >
              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  Sichtbarkeit
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aufnahme in die Liste der Unterstützer auf der Webseite.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  Redaktion
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Je nach Größe ein dedizierter Blogpost oder eine
                  Pressemitteilung.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4 md:col-span-2">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  Nutzungsrechte
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Auf Wunsch erhalten Partner die Rechte zur Vervielfältigung
                  und die Nutzung ausgewählter Bilder für die eigene
                  Öffentlichkeitsarbeit.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              className="partner-card"
              icon={<BriefcaseBusiness className="w-5 h-5 text-primary" />}
              title="Förderung"
              contentClassName="grid gap-4 md:grid-cols-2"
            >
              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  Keine privaten Spenden
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aus infrastrukturellen und steuerlichen Gründen nehmen wir
                  dieses Jahr keine Privatspenden an.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  Keine Sponsorenwerbung
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Werbe- oder Titelsponsoren nehmen wir in diesem Jahr nicht an.
                  Unterstützer erscheinen nicht auf der Veranstaltung oder in
                  unseren Materialien.
                </p>
              </div>
            </SectionCard>
          </div>

          <aside className="space-y-6">
            <SectionCard
              className="partner-card sticky top-28"
              icon={<Users2 className="w-5 h-5 text-primary" />}
              title="Kontakt & Prüfung"
              contentClassName="space-y-4 text-sm"
            >
              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-muted-foreground mb-1">Kontakt</p>
                <a
                  href={`mailto:${data.policy.contactEmail}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {data.policy.contactEmail}
                </a>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-muted-foreground mb-1">Antwortzeit</p>
                <p className="font-medium">
                  Maximal {data.policy.responseTimeBusinessDays} Werktage
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-muted-foreground mb-1">Wichtig</p>
                <p className="font-medium leading-relaxed">
                  Alle Partner werden vorab auf Übereinstimmung mit unseren
                  Grundsätzen zu Demokratie und Rechtsstaatlichkeit geprüft.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-muted-foreground leading-relaxed">
                Wenn ihr mit uns zusammenarbeiten wollt, schreibt bitte kurz
                dazu, wer ihr seid, welche Form der Unterstützung gemeint ist
                und ob es bereits eine konkrete Idee für die Umsetzung gibt.
              </div>
            </SectionCard>

            <SectionCard
              className="partner-card"
              icon={<AlertTriangle className="w-5 h-5 text-primary" />}
              title="Nicht möglich"
            >
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>• Keine Privatspenden in diesem Jahr</li>
                <li>• Keine Werbe- oder Titelsponsoren</li>
                <li>• Keine Spendenquittungen</li>
                <li>
                  • Kein Auftritt als Sponsor in Veranstaltungsmaterialien
                </li>
              </ul>
            </SectionCard>
          </aside>
        </section>

        <section className="mt-14">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="text-3xl font-bold">Schulen und Unterstützer</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              className="partner-card"
              icon={<ShieldCheck className="w-5 h-5 text-primary" />}
              title="Schulen"
              contentClassName="space-y-4"
            >
              {data.schools.map((school) => (
                <div
                  key={school.name}
                  className="partner-list-item rounded-2xl border border-border/70 bg-background/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="font-medium">{school.name}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {school.studentsSent} gesendet
                    </span>
                  </div>
                  {school.note && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {school.note}
                    </p>
                  )}
                </div>
              ))}
            </SectionCard>

            <SectionCard
              className="partner-card"
              icon={<BadgeCheck className="w-5 h-5 text-primary" />}
              title="Unterstützer"
              contentClassName="space-y-4"
            >
              {data.supporters.map((supporter) => (
                <div
                  key={supporter.name}
                  className="partner-list-item rounded-2xl border border-border/70 bg-background/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="font-medium">{supporter.name}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {CATEGORY_LABELS[supporter.kind]}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {supporter.amount != null && (
                      <span>
                        Betrag: {supporter.amount.toLocaleString("de-DE")} €
                      </span>
                    )}
                    <span>
                      Status:{" "}
                      {supporter.status === "confirmed"
                        ? "bestätigt"
                        : supporter.status === "pending"
                          ? "offen"
                          : "abgelehnt"}
                    </span>
                  </div>
                  {supporter.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {supporter.description}
                    </p>
                  )}
                </div>
              ))}
            </SectionCard>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Presse und Freigabe</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            Pressemitteilungen mit Partnerbezug werden vor Veröffentlichung an
            die betroffenen Partner zur Freigabe versendet. Die Rückmeldung
            erfolgt innerhalb von maximal zwei Werktagen, damit wir schnell und
            sauber arbeiten können.
          </p>
        </section>
      </div>
    </div>
  );
}
