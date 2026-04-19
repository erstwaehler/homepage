"use client";

import { Link } from "@tanstack/react-router";
import { Mail, Vote } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import * as m from "~/paraglide/messages";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationItems = [
    { to: "/", label: m.nav_home() },
    { to: "/konzept", label: m.nav_konzept() },
    { to: "/zeitplan", label: m.nav_zeitplan() },
    { to: "/blog", label: m.nav_blog() },
    { to: "/partner", label: "Partner" },
    { to: "/impressum", label: m.nav_impressum() },
  ];

  const aboutItems = [
    { to: "/team", label: m.nav_team() },
    { to: "/partner", label: "Partner" },
    { to: "/presse", label: m.nav_presse() },
    { to: "/kontakt", label: m.nav_kontakt() },
  ];

  return (
    <footer className="bg-linear-to-b from-card via-card to-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Vote className="w-10 h-10 text-primary" />
              <span className="font-bold text-2xl">{m.site_title_full()}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {m.site_description()}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              {m.nav_navigation()}
            </h3>
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              {m.nav_whoweare()}
            </h3>
            <nav className="space-y-3">
              {aboutItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              {m.nav_socials()}
            </h3>
            <div className="flex gap-4 mb-8">
              <a
                href="mailto:info@ewf-stade.de"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="E-Mail"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="mailto:partner@ewf-stade.de"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="Partner E-Mail"
              >
                <span className="text-sm font-medium">Partner</span>
              </a>
              <a
                href="https://github.com/erstwaehler"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
            <LocaleSwitcher />
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            {m.copyright({
              currentYear,
              site_title_noyear: m.site_title_noyear(),
            })}
          </p>
          <div className="flex gap-6">
            <Link
              to="/impressum"
              className="hover:text-foreground transition-colors"
            >
              {m.nav_impressum()}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
