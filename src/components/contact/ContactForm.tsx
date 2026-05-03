"use client";

import { m } from "#p";
import { Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  honeypot: string;
};

type ContactFormProps = {
  onSubmit: (state: Omit<ContactFormState, "honeypot">) => void;
  initialCategory?: string;
  submitLabel?: string;
};

export default function ContactForm({
  onSubmit,
  initialCategory = "allgemein",
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<ContactFormState>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: initialCategory,
      message: "",
      honeypot: "",
    },
  });

  const category = watch("category", initialCategory);

  const submitHandler = handleSubmit((data) => {
    if (data.honeypot) return;

    onSubmit({
      name: data.name,
      email: data.email,
      subject: data.subject,
      category: data.category,
      message: data.message,
    });
  });

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">{m.contact_form_name()}</span>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder={m.contact_form_name_placeholder()}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">{m.contact_form_email()}</span>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder={m.contact_form_email_placeholder()}
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="text-sm font-medium">
          {m.contact_form_cathegory()}
        </span>
        <select
          {...register("category")}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
        >
          <option value="allgemein">
            {m.contact_form_cathegory_allgemein()}
          </option>
          <option value="schule">{m.contact_form_cathegory_schule()}</option>
          <option value="presse">{m.contact_form_cathegory_presse()}</option>
          <option value="politik">{m.contact_form_cathegory_politik()}</option>
          <option value="frage">{m.contact_form_cathegory_frage()}</option>
        </select>
      </label>

      <label className="space-y-2 block">
        <span className="text-sm font-medium">{m.contact_form_subject()}</span>
        <input
          type="text"
          {...register("subject")}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
          placeholder={m.contact_form_subject_placeholder()}
        />
      </label>

      <label className="space-y-2 block">
        <span className="text-sm font-medium">{m.contact_form_message()}</span>
        <textarea
          {...register("message", { required: true })}
          rows={7}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary resize-none"
          placeholder={m.contact_form_message_placeholder()}
        />
      </label>

      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          {m.contact_form_no_processing()}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-3 disabled:opacity-60 disabled:pointer-events-none"
        >
          <Send className="w-4 h-4" />
          {m.contact_form_submit()}
        </button>
      </div>
    </form>
  );
}
