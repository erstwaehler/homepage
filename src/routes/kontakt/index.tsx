import { createFileRoute } from "@tanstack/react-router";
import { Mail, MailQuestion, MapPin, MessageSquare, Users } from "lucide-react";
import { useEffect, useMemo } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";
import ContactForm from "~/components/contact/ContactForm";
import ContactInfoCard from "~/components/contact/ContactInfoCard";
import PageHero from "~/components/PageHero";
import SimpleAccordion from "~/components/SimpleAccordion";
import { Logo } from "~/components/logo";
import { RedactEventData, RedactPostadresse } from "~/lib/constants";

export const Route = createFileRoute("/kontakt/")({
  component: ContactPage,
  head: () => {
    const title = `${m.contact_title()} - ${m.site_title()}`;
    const description = m.contact_meta_description();

    return generateMetaTags({
      title,
      description,
      url: "/kontakt",
      type: "website",
    });
  },
});

type FAQItem = {
  question: string;
  answer: string;
};

function ContactPage() {
  const faqs: FAQItem[] = useMemo(
    () => [
      // {
      //   question:
      //     "Ist die Veranstaltung für Schülerinnen und Schüler verpflichtend?",
      //   answer:
      //     "Ja. Für die teilnehmenden Schulen ist das Erstwählerforum als schulübergreifende Pflichtveranstaltung für die Jahrgänge 10 und 11 geplant.",
      // },
      // {
      //   question: "Wie läuft die Teilnahme am Forum ab?",
      //   answer:
      //     "Der Tag beginnt mit einer gemeinsamen Einführung. Danach folgen wechselnde Zyklen aus Diskussionsrunden und Markt-/Gesprächsformaten, sodass alle Gruppen beide Formate erleben.",
      // },
      // {
      //   question:
      //     "Dürfen Parteien, Medien oder andere Organisationen anfragen?",
      //   answer:
      //     "Ja. Wir freuen uns über Anfragen von Parteien, Pressevertreterinnen und -vertretern, schulischen Ansprechpersonen sowie unterstützenden Organisationen. Bitte nutzt dafür die passende Kategorie im Formular.",
      // },
      // {
      //   question: "Gibt es eine zentrale E-Mail-Adresse?",
      //   answer:
      //     "Ja, ihr könnt uns unter info@ewf-stade.de erreichen. Für Presseanfragen ist das die schnellste erste Anlaufstelle.",
      // },
      // {
      //   question: "Kann man Fragen für die Diskussionen stellen?",
      //   answer:
      //     "Ja. Schülerinnen und Schüler dürfen Fragen für die Diskussionsrunden stellen. Dafür eignet sich das Kontaktformular oder der dafür vorgesehene Link auf der Startseite.",
      // },
      // {
      //   question: "Wer steckt hinter dem Projekt?",
      //   answer:
      //     "Das Erstwählerforum 2026 ist ein schulübergreifendes Kooperationsprojekt der weiterführenden Schulen in Stade. Das Organisationsteam besteht aus Schülerinnen und Schülern verschiedener Schulen.",
      // },
    ],
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".contact-hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".contact-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".contact-hero p", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          ".contact-card",
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (state: {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
  }) => {
    const subject = encodeURIComponent(
      state.subject || `Kontaktanfrage (${state.category})`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${state.name}`,
        `E-Mail: ${state.email}`,
        `Kategorie: ${state.category}`,
        "",
        state.message,
      ].join("\n"),
    );

    window.location.href = `mailto:info@ewf-stade.de?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <PageHero
          className="contact-hero"
          badge={
            <div className="contact-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
              <MailQuestion className="w-4 h-4" />
              {m.contact_kicker()}
            </div>
          }
          title={m.contact_title()}
          subtitle={m.contact_description()}
        />

        <section className="grid lg:grid-cols-3 gap-6 mb-16">
          <ContactInfoCard
            icon={<Mail className="w-6 h-6" />}
            title={m.contact_centralmail()}
          >
            <a
              href="mailto:info@ewf-stade.de"
              className="text-muted-foreground hover:text-primary transition-colors break-all"
            >
              info@ewf-stade.de
            </a>
          </ContactInfoCard>

          <ContactInfoCard
            icon={<MessageSquare className="w-6 h-6" />}
            title={m.contact_quickcontact()}
          >
            <p className="text-muted-foreground leading-relaxed">
              {m.contact_quickcontact_description()}
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={<MapPin className="w-6 h-6" />} title="Ort">
            <p className="text-muted-foreground leading-relaxed">
              {m.trans_event()}:{" "}
              <p className={`${RedactEventData ? "blurhide" : ""}`}>
                {RedactEventData
                  ? m.contact_location_stadeum_redacted()
                  : m.contact_location_stadeum()}
              </p>
              {m.trans_postal_address()}:{" "}
              <p className={`${RedactPostadresse ? "blurhide" : ""}`}>
                {RedactPostadresse
                  ? m.contact_location_postal_redacted()
                  : m.contact_location_postal()}
              </p>
            </p>
          </ContactInfoCard>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="contact-card bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{m.contact_form()}</h2>
                <p className="text-sm text-muted-foreground">
                  {m.contact_asap()}
                </p>
              </div>
            </div>

            <ContactForm onSubmit={handleSubmit} />
          </div>

          <div className="space-y-6">
            {faqs.length > 0 && (
              <div className="contact-card bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Häufige Fragen</h2>
                    <p className="text-sm text-muted-foreground">
                      {m.contact_faq_kicker()}
                    </p>
                  </div>
                </div>

                <SimpleAccordion
                  items={faqs.map((item, index) => ({
                    id: item.question,
                    title: item.question,
                    content: (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    ),
                    defaultOpen: index === 0,
                  }))}
                  className="space-y-3"
                />
              </div>
            )}

            <ContactInfoCard
              icon={<Logo />}
              title={m.contact_formforwhoom_title()}
            >
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                  {m.contact_formforwhoom_press()}
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                  {m.contact_formforwhoom_parties()}
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                  {m.contact_formforwhoom_students()}
                </li>
              </ul>
            </ContactInfoCard>
          </div>
        </section>
      </div>
    </div>
  );
}
