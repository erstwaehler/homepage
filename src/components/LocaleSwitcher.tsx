"use client";

import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getLocale, locales, setLocale } from "~/paraglide/runtime";

const languageConfig = {
  de: { name: "Deutsch", flag: "🇩🇪" },
  en: { name: "English", flag: "🇬🇧" },
} as const;

const fallbackLanguage = { name: "Unknown", flag: "🌐" };

export default function LocaleSwitcher() {
  const currentLocale = getLocale();

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as typeof currentLocale);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[180px] gap-2">
        <Languages className="w-4 h-4" />
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>
              {
                (
                  languageConfig[
                    currentLocale as keyof typeof languageConfig
                  ] ?? fallbackLanguage
                ).flag
              }
            </span>
            <span>
              {
                (
                  languageConfig[
                    currentLocale as keyof typeof languageConfig
                  ] ?? fallbackLanguage
                ).name
              }
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={6} align="end">
        {locales.map((locale) => {
          const config =
            languageConfig[locale as keyof typeof languageConfig] ??
            fallbackLanguage;
          return (
            <SelectItem key={locale} value={locale}>
              <span className="flex items-center gap-2">
                <span className="text-xl">{config.flag}</span>
                <span>{config.name}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
