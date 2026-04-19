import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Vote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags, generateWebSiteSchema } from "~/lib/meta";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => {
    const title = m.site_title_full();
    const description = m.site_description();

    return {
      ...generateMetaTags({
        title,
        description,
        url: "/",
        type: "website",
      }),
      scripts: [generateWebSiteSchema()],
    };
  },
});

const HERO_IMAGES = [
  "/hero/stadeum.png",
  "/hero/team1.png",
  "/hero/team2.png",
  "/hero/team_beim_stadeum.png",
];

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.from(words, {
          y: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.55",
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "expo.out",
          },
          "-=0.45",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroTitle = m.hero_title();
  const heroWords = heroTitle.split(" ");

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#070708] text-foreground"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(168, 139, 250, 0.14) 0%, transparent 45%), linear-gradient(180deg, #070708 0%, #0b0b0e 50%, #09090b 100%)",
      }}
    >
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden px-6"
      >
        <div
          ref={heroImageRef}
          className="absolute inset-0 pointer-events-none"
        >
          {HERO_IMAGES.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
                index === currentImageIndex ? "opacity-35" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${src}')`,
                filter: "saturate(0.8) contrast(1.05)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/55 to-[#070708]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto pt-28 pb-20 min-h-screen flex items-center justify-center text-center">
          <div className="w-full max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Vote className="w-4 h-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.24em] text-white/75">
                Erstwählerforum 2026
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-black tracking-tight leading-[0.92] text-white"
            >
              {heroWords.map((word) => (
                <span key={word} className="word inline-block mr-4">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl md:text-3xl max-w-2xl mx-auto text-white/72 leading-relaxed"
            >
              {m.hero_subtitle()}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-white/85">{m.hero_date()}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-white/85">{m.hero_location()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                to="/konzept"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-all duration-300 hover:gap-3 hover:bg-primary/90"
              >
                Konzept ansehen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/zeitplan"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                Zum Zeitplan
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#070708] to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
