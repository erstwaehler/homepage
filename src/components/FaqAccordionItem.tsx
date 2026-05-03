import { AlertCircle } from "lucide-react";
import { useState } from "react";

type FaqAccordionItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FaqAccordionItem({
  question,
  answer,
  defaultOpen = false,
}: FaqAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <button
      type="button"
      onClick={() => setIsOpen((current) => !current)}
      className="w-full text-left rounded-xl border border-border p-4 hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium">{question}</span>
        <AlertCircle
          className={[
            "w-4 h-4 shrink-0 transition-transform duration-300",
            isOpen ? "rotate-180 text-primary" : "text-muted-foreground",
          ].join(" ")}
        />
      </div>

      <div
        className={[
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </button>
  );
}
