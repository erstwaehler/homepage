import { m } from "#p";
import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { useRef, useEffect } from "react";

export function ForbiddenPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const ease = "expo.out";

      const tl = gsap.timeline({ defaults: { ease } });

      tl.from(logoRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(messageRef.current, { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(buttonRef.current, { y: 18, opacity: 0, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-accent/20 via-background to-accent/10 px-6">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Icon */}
        <div className="flex justify-center" ref={logoRef}>
          <div className="relative">
            <Logo className="w-24 h-24 text-destructive/20 absolute blur-xl dark:invert" />
            <Logo className="w-24 h-24 text-destructive relative dark:invert" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1
            className="text-5xl md:text-7xl font-bold text-foreground"
            ref={titleRef}
          >
            {m.error_401_title()}
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
            ref={messageRef}
          >
            {m.error_401_message()}
          </p>
        </div>

        {/* Button */}
        <div className="pt-4" ref={buttonRef}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card hover:bg-card/80 text-foreground rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-border"
          >
            <span className="font-medium">{m.error_401_cta()}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
