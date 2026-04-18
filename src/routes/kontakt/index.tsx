import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Vote,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags } from "~/lib/meta";

export const Route = createFileRoute("/kontakt/")({
  component: ContactPage,
  head: () => {
    const title = `Kontakt & FAQ - ${m.site_title()}`;
    const description =
      "Kontakt, FAQ und Anfrageformular für das Erstwählerforum 2026.";

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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    category: "allgemein",
    message: "",
    honeypot: "",
  });

  const faqs: FAQItem[] = useMemo(
    () => [
      {
        question:
          "Ist die Veranstaltung für Schülerinnen und Schüler verpflichtend?",
        answer:
          "Ja. Für die teilnehmenden Schulen ist das Erstwählerforum als schulübergreifende Pflichtveranstaltung geplant. Der 13. Jahrgang nimmt je nach Schule und Abstimmung ggf. freiwillig oder per Einladung teil.",
      },
      {
        question: "Wie läuft die Teilnahme am Forum ab?",
        answer:
          "Der Tag beginnt mit einer gemeinsamen Einführung. Danach folgen wechselnde Zyklen aus Diskussionsrunden und Markt-/Gesprächsformaten, sodass alle Gruppen beide Formate erleben.",
      },
      {
        question:
          "Dürfen Parteien, Medien oder andere Organisationen anfragen?",
        answer:
          "Ja. Wir freuen uns über Anfragen von Parteien, Pressevertreterinnen und -vertretern, schulischen Ansprechpersonen sowie unterstützenden Organisationen. Bitte nutzt dafür die passende Kategorie im Formular.",
      },
      {
        question: "Gibt es eine zentrale E-Mail-Adresse?",
        answer:
          "Ja, ihr könnt uns unter info@ewf-stade.de erreichen. Für Presseanfragen und schulische Abstimmungen ist das die schnellste erste Anlaufstelle.",
      },
      {
        question: "Kann man Fragen für die Diskussionen einreichen?",
        answer:
          "Ja. Wir sammeln Fragen und Thesen für die Diskussionsrunden im Vorfeld. Dafür eignet sich das Kontaktformular oder der dafür vorgesehene Link auf der Startseite.",
      },
      {
        question: "Wer steckt hinter dem Projekt?",
        answer:
          "Das Erstwählerforum 2026 ist ein schulübergreifendes Kooperationsprojekt der weiterführenden Schulen in Stade. Das Organisationsteam besteht aus Schülerinnen und Schülern verschiedener Schulen.",
      },
    ],
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".contact-hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".contact-hero h1", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".contact-hero p", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".contact-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.honeypot) return;

    const subject = encodeURIComponent(
      formState.subject || `Kontaktanfrage (${formState.category})`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${formState.name}`,
        `E-Mail: ${formState.email}`,
        `Kategorie: ${formState.category}`,
        "",
        formState.message,
      ].join("\n"),
    );

    window.location.href = `mailto:info@ewf-stade.de?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <section className="contact-hero mb-16 max-w-3xl">
          <div
            className={
              "contact-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6"
            }
          >
            <Sparkles className="w-4 h-4" />
            Kontakt & Unterstützung
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Kontakt, FAQ und Anfragen
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Hier findet ihr die wichtigsten Antworten und könnt uns direkt für
            Rückfragen, Presseanfragen, schulische Abstimmungen oder allgemeine
            Hinweise erreichen.
          </p>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mb-16">
          <div className="contact-card bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Zentrale E-Mail</h2>
            <a
              href="mailto:info@ewf-stade.de"
              className="text-muted-foreground hover:text-primary transition-colors break-all"
            >
              info@ewf-stade.de
            </a>
          </div>

          <div className="contact-card bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Schnellkontakt</h2>
            <p className="text-muted-foreground">
              Für dringende Schulabstimmungen oder organisatorische Rückfragen
              meldet euch am besten per Mail mit Betreff.
            </p>
          </div>

          <div className="contact-card bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Ort</h2>
            <p className="text-muted-foreground">
              Stade, Metropolregion Hamburg
              <br />
              Zusammenarbeit mit Schulen und Partnern vor Ort
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="contact-card bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Kontaktformular</h2>
                <p className="text-sm text-muted-foreground">
                  Wir antworten so schnell wie möglich.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                    placeholder="Dein Name"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium">E-Mail</span>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                    placeholder="name@example.de"
                  />
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-sm font-medium">Kategorie</span>
                <select
                  name="category"
                  value={formState.category}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                >
                  <option value="allgemein">Allgemeine Anfrage</option>
                  <option value="schule">Schulische Abstimmung</option>
                  <option value="presse">Presseanfrage</option>
                  <option value="politik">Partei / Kandidatur</option>
                  <option value="frage">Frage für Diskussionen</option>
                </select>
              </label>

              <label className="space-y-2 block">
                <span className="text-sm font-medium">Betreff</span>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Worum geht es?"
                />
              </label>

              <label className="space-y-2 block">
                <span className="text-sm font-medium">Nachricht</span>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={7}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary resize-none"
                  placeholder="Schreib uns hier deine Nachricht..."
                />
              </label>

              <input
                type="text"
                name="honeypot"
                value={formState.honeypot}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Deine Daten werden nur zur Bearbeitung deiner Anfrage genutzt.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-3"
                >
                  <Send className="w-4 h-4" />
                  Nachricht senden
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="contact-card bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Häufige Fragen</h2>
                  <p className="text-sm text-muted-foreground">
                    Kurz erklärt, was oft gefragt wird.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() =>
                        setOpenFaq((current) =>
                          current === index ? null : index,
                        )
                      }
                      className="w-full text-left rounded-xl border border-border p-4 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">{item.question}</span>
                        <AlertCircle
                          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`}
                        />
                      </div>

                      <div
                        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="contact-card bg-linear-to-br from-primary/10 via-card to-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Vote className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">
                  Für wen ist das Formular gedacht?
                </h2>
              </div>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  Schulen, die organisatorische Details abstimmen möchten
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  Presse und Medien für Anfragen zu Material und Terminen
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  Parteien und Kandidierende für Teilnahme- und Rückfragen
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  Schülerinnen und Schüler mit Ideen oder Fragen für die
                  Debatten
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
