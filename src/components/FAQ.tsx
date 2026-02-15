'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Wer kann am Erstwähler Forum teilnehmen?',
    answer: 'Das Forum richtet sich an alle Erstwähler der Jahrgänge 10 und höher des Gymnasium Athenaeum Stade, der IGS Stade sowie des Vincent-Lübeck-Gymnasiums. Jahrgang 13 wird per Einladung teilnehmen.',
  },
  {
    question: 'Ist die Teilnahme verpflichtend?',
    answer: 'Ja, das Erstwähler Forum ist eine von den Schulleitungen genehmigte Pflichtveranstaltung für die teilnehmenden Jahrgänge.',
  },
  {
    question: 'Was kostet die Teilnahme?',
    answer: 'Die Teilnahme am Erstwähler Forum ist für alle Schülerinnen und Schüler kostenlos.',
  },
  {
    question: 'Welche Parteien werden vertreten sein?',
    answer: 'Alle demokratischen Parteien, die zur Kommunalwahl antreten, erhalten gleiche Möglichkeiten zur Präsentation. Das Forum ist strikt überparteilich ausgerichtet.',
  },
  {
    question: 'Wie ist das Programm strukturiert?',
    answer: 'Das Forum umfasst moderierte Podiumsdiskussionen zu jugendrelevanten Themen, einen Parteimarkt mit Informationsständen und kleinere Gesprächsformate für direkten Austausch mit Kandidaten.',
  },
  {
    question: 'Muss ich mich anmelden?',
    answer: 'Als Pflichtveranstaltung erfolgt die Koordination über die Schulen. Eine separate Anmeldung ist nicht erforderlich.',
  },
  {
    question: 'Kann ich Fragen an die Politiker stellen?',
    answer: 'Ja, genau das ist das Ziel! Sowohl in den Podiumsdiskussionen als auch am Parteimarkt und in den Gesprächsformaten könnt ihr direkt Fragen stellen.',
  },
  {
    question: 'Was passiert, wenn ich an dem Tag krank bin?',
    answer: 'Da es sich um eine Schulveranstaltung handelt, gelten die üblichen Regelungen. Bitte informiere deine Schule bei Krankheit wie gewohnt.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Häufige Fragen
          </h2>
          <p className="text-muted-foreground text-center mb-12 leading-relaxed">
            Hier findest du Antworten auf die wichtigsten Fragen zum Erstwähler Forum.
          </p>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center bg-card border border-border rounded-lg p-6">
            <p className="text-foreground mb-4">
              Hast du weitere Fragen?
            </p>
            <a
              href="mailto:info@ewf-stade.de"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              Kontaktiere uns →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
