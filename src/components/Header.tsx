"use client";

import { Link } from "@tanstack/react-router";
import { Vote, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as m from "#p";
import { gsap, ScrollTrigger } from "~/lib/gsap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const handleNavLinkClick = () => {
    handleMenuClose();
  };

  useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;

    const header = headerRef.current;

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

  // Animate menu on open/close
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // Fade in overlay
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      // Animate menu items
      const ctx = gsap.context(() => {
        gsap.from(".menu-item", {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "expo.out",
          delay: 0.2,
        });
      }, menuRef);

      return () => ctx.revert();
    } else if (menuRef.current) {
      // Fade out overlay
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
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
        className="fixed top-0 z-40 w-full transition-all duration-300 h-32 pointer-events-none"
        style={{ backgroundColor: "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between pointer-events-auto">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity magnetic-target group">
            <Vote className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl hidden sm:inline text-white">
              {m.site_title()}
            </span>
            <span className="font-bold text-xl sm:hidden text-white">
              EWF'26
            </span>
          </Link>

          <button
            type="button"
            onClick={handleMenuOpen}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            aria-label="Open menu">
            <span className="text-2xl font-light group-hover:tracking-wider transition-all">
              +
            </span>
            <span className="text-sm font-medium uppercase tracking-wider">
              MENU
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 bg-card/95 backdrop-blur-xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 h-screen flex flex-col">
            {/* Menu Header */}
            <div className="h-20 flex items-center justify-between">
              <Link
                to="/"
                onClick={handleMenuClose}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                <Vote className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xl hidden sm:inline text-foreground">
                  {m.site_title()}
                </span>
                <span className="font-bold text-xl sm:hidden text-foreground">
                  EWF'26
                </span>
              </Link>

              <button
                type="button"
                onClick={handleMenuClose}
                className="flex items-center gap-2 hover:text-muted-foreground transition-colors group"
                aria-label="Close menu">
                <X className="w-6 h-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  CLOSE
                </span>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 flex items-center justify-center">
              <div className="space-y-2 w-full max-w-3xl">
                {navItems.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleNavLinkClick}
                    className="menu-item block group"
                    activeProps={{
                      className: "menu-item block group active",
                    }}>
                    <div className="flex items-center justify-between py-6 px-8 border-b border-border/50 hover:border-primary/50 transition-all duration-300">
                      <span className="text-4xl md:text-6xl font-bold group-hover:text-primary group-hover:translate-x-4 transition-all duration-300">
                        {item.label}
                      </span>
                      <span className="text-lg md:text-2xl text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                        ({String(index + 1).padStart(2, "0")})
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Menu Footer */}
            <div className="h-20 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} {m.site_title()}
              </p>
              <p className="hidden md:block">Erstwähler Forum 2026 – Stade</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
