"use client";

import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { Menu, Vote, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as m from "#p";
import { gsap, ScrollTrigger } from "~/lib/gsap";

export default function Header() {
  const posthog = usePostHog();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleMenuOpen = () => {
    posthog.capture("mobile_menu_opened");
    setIsOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;

    const header = headerRef.current;

    // Initialisierung der Maske für den Gradient-Blur-Effekt
    // Dies sorgt dafür, dass der Blur-Effekt nach unten hin weich ausläuft
    gsap.set(header, {
      webkitMaskImage:
        "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
      maskImage:
        "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
    });

    const scrollTrigger = ScrollTrigger.create({
      start: "top -10",
      end: "top -200",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const blur = progress * 20;
        const opacity = progress * 0.7;

        gsap.to(header, {
          backdropFilter: `blur(${blur}px)`,
          // Hintergrund-Gradient, der mit dem Scrollen dunkler wird
          background: `linear-gradient(to bottom, rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, 0))`,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const navItems = [
    { to: "/", label: m.nav_home() },
    { to: "/konzept", label: m.nav_konzept() },
    { to: "/team", label: m.nav_team() },
    { to: "/traeger", label: m.nav_traeger() },
    { to: "/blog", label: m.nav_blog() },
    { to: "/impressum", label: m.nav_impressum() },
  ];

  return (
    <>
      <header
        ref={headerRef}
        /* h-32 statt h-20, damit der Gradient Raum zum Auslaufen hat */
        className="fixed top-0 z-40 w-full transition-all duration-300 h-32 pointer-events-none"
        style={{ backgroundColor: "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between pointer-events-auto">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity magnetic-target">
            <Vote className="w-8 h-8 text-white" />
            <span className="font-bold text-xl hidden sm:inline text-white">
              {m.site_title()}
            </span>
            <span className="font-bold text-xl sm:hidden text-white">
              EWF'26
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors magnetic-target"
                activeProps={{
                  className: "text-sm font-medium text-white",
                }}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleMenuOpen}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-card border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Vote className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold">{m.site_title()}</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors mb-2"
              activeProps={{
                className:
                  "flex items-center gap-3 p-3 rounded-lg bg-primary text-primary-foreground transition-colors mb-2",
              }}>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
