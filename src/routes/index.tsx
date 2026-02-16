import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, MessageSquare, Users, Vote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as m from "#p";
import { gsap } from "~/lib/gsap";
import { generateMetaTags, generateWebSiteSchema } from "~/lib/meta";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => {
    const title = m.site_title();
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
  const posthog = usePostHog();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const standpointsRef = useRef<HTMLDivElement>(null);
  const uniqueRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Initial animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.from(words, {
          y: 120,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.8",
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.6",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero image fade out on scroll
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

      // Standpoints section animation
      if (standpointsRef.current) {
        const cards =
          standpointsRef.current.querySelectorAll(".standpoint-card");

        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: standpointsRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      }

      // Unique section animation
      if (uniqueRef.current) {
        gsap.fromTo(
          uniqueRef.current.querySelector(".unique-content"),
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: uniqueRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroTitle = m.hero_title();
  const heroWords = heroTitle.split(" ");

  return (
    <div
      ref={containerRef}
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
      }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden snap-start"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168, 139, 250, 0.15) 0%, transparent 70%)",
        }}
      >
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${HERO_IMAGES[currentImageIndex]}')`,
            opacity: 0.5,
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-block px-6 py-2 mb-8 rounded-full border border-[#A88BFA]/30 bg-[#A88BFA]/5">
            <span className="text-sm font-medium" style={{ color: "#A88BFA" }}>
              {m.site_title()}
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]"
            style={{ color: "#ffffff" }}
          >
            {heroWords.map((word) => (
              <span key={word} className="word inline-block mr-4">
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="text-2xl md:text-4xl mb-12 font-light"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {m.hero_subtitle()}
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <div
              className="flex items-center gap-3"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-lg">{m.hero_date()}</span>
            </div>
            <span
              className="hidden sm:block"
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
            >
              •
            </span>
            <div
              className="flex items-center gap-3"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-lg">{m.hero_location()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Standpoints Section */}
      <section
        ref={standpointsRef}
        className="py-32 px-6 snap-start"
        style={{
          background: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="standpoint-card text-center p-10 rounded-2xl border transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 139, 250, 0.05) 0%, rgba(255, 217, 72, 0.05) 100%)",
                borderColor: "rgba(168, 139, 250, 0.2)",
              }}
            >
              <Users
                className="w-14 h-14 mx-auto mb-6"
                style={{ color: "#A88BFA" }}
              />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Schulübergreifend
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Drei Stader Schulen kommen zusammen für eine gemeinsame
                Großveranstaltung
              </p>
            </div>
            <div
              className="standpoint-card text-center p-10 rounded-2xl border transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 139, 250, 0.05) 0%, rgba(255, 217, 72, 0.05) 100%)",
                borderColor: "rgba(255, 217, 72, 0.2)",
              }}
            >
              <MessageSquare
                className="w-14 h-14 mx-auto mb-6"
                style={{ color: "#FFD948" }}
              />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Direkte Gespräche
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Podiumsdiskussionen und Parteimarkt für direkten Austausch mit
                Politikern
              </p>
            </div>
            <div
              className="standpoint-card text-center p-10 rounded-2xl border transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 139, 250, 0.05) 0%, rgba(255, 217, 72, 0.05) 100%)",
                borderColor: "rgba(168, 139, 250, 0.2)",
              }}
            >
              <Vote
                className="w-14 h-14 mx-auto mb-6"
                style={{ color: "#A88BFA" }}
              />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Deine Stimme zählt
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Politische Bildung für Erstwähler zur Kommunal- und
                Bürgermeisterwahl
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Section */}
      <section
        ref={uniqueRef}
        className="py-32 px-6 snap-start"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div
            className="unique-content rounded-3xl p-16 text-center border"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168, 139, 250, 0.1) 0%, transparent 70%)",
              borderColor: "rgba(168, 139, 250, 0.3)",
            }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#ffffff" }}
            >
              Einzigartig in Deutschland
            </h2>
            <p
              className="text-xl mb-12"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Das Erstwähler Forum 2026 ist die erste Veranstaltung dieser Art
              in der Region – wenn nicht sogar bundesweit. Eine
              schulübergreifende Initiative, die jungen Menschen einen
              einzigartigen Zugang zur Kommunalpolitik bietet.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/team"
                onClick={() =>
                  posthog.capture("team_link_clicked", {
                    source: "homepage_cta",
                  })
                }
                className="magnetic-target inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-full font-semibold transition-all hover:scale-105"
                style={{
                  borderColor: "rgba(168, 139, 250, 0.4)",
                  color: "#ffffff",
                }}
              >
                Unser Team kennenlernen
              </Link>
              <Link
                to="/blog"
                onClick={() =>
                  posthog.capture("blog_link_clicked", {
                    source: "homepage_cta",
                  })
                }
                className="magnetic-target inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #A88BFA 0%, #FFD948 100%)",
                  color: "#000000",
                }}
              >
                Aktuelle Neuigkeiten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
