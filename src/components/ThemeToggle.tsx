"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "ewf-theme";
const THEME_CHANGE_EVENT = "ewf-theme-change";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);

    const syncTheme = () => {
      setTheme(getPreferredTheme());
    };

    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group/theme relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-background/80 p-1 text-foreground shadow-lg shadow-primary/10 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
      data-theme={theme}
      aria-label={`Zu ${nextTheme === "dark" ? "Dark Mode" : "Light Mode"} wechseln`}
      aria-pressed={theme === "dark"}
    >
      <span
        className={[
          "absolute inset-y-1 left-1 aspect-square rounded-full bg-primary shadow-md shadow-primary/30 transition-transform duration-500 ease-out",
          theme === "dark" ? "translate-x-7" : "translate-x-0",
        ].join(" ")}
      />
      <span className="relative z-10 grid h-7 w-7 place-items-center">
        <Sun
          className={[
            "h-4 w-4 transition-all duration-500",
            theme === "dark"
              ? "rotate-90 scale-75 opacity-45"
              : "rotate-0 scale-100 opacity-100",
          ].join(" ")}
        />
      </span>
      <span className="relative z-10 grid h-7 w-7 place-items-center">
        <Moon
          className={[
            "h-4 w-4 transition-all duration-500",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-75 opacity-45",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
