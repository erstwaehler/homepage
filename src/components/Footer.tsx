"use client";

import { Link } from "@tanstack/react-router";
import { Github, Mail, Vote } from "lucide-react";
import * as m from "~/paraglide/messages";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { to: "/", label: m.nav_home() },
    { to: "/konzept", label: m.nav_konzept() },
    { to: "/team", label: m.nav_team() },
    { to: "/traeger", label: m.nav_traeger() },
    { to: "/blog", label: m.nav_blog() },
    { to: "/impressum", label: m.nav_impressum() },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Vote className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">{m.site_title()}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {m.footer_tagline()}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{m.footer_navigation()}</h3>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Language & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">{m.footer_language()}</h3>
              <LocaleSwitcher />
            </div>
            <div>
              <h3 className="font-semibold mb-4">{m.footer_contact()}</h3>
              <div className="flex gap-4">
                <a
                  href="mailto:info@ewf-stade.de"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="E-Mail">
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/erstwaehlerforum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{m.footer_rights({ year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
