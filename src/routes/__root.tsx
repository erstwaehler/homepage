// react-scan must be imported before React and TanStack Start

import { PostHogProvider } from "@posthog/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HotkeysProvider } from "@tanstack/react-hotkeys";
import { HotkeysDevtoolsPanel } from "@tanstack/react-hotkeys-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import * as m from "#p";
import { initLenis } from "~/lib/lenis";
import { getLocale } from "~/paraglide/runtime";
import CustomCursor from "../components/CustomCursor";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NoiseOverlay from "../components/NoiseOverlay";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";
import { NotFoundPage } from "~/components/404";
import { ServerErrorPage } from "~/components/500";

interface MyRouterContext {
  queryClient: QueryClient;
}

const themeInitScript = `
(() => {
  const storageKey = "ewf-theme";
  const storedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : prefersDark ? "dark" : "light";

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();
`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", getLocale());
    }
  },

  notFoundComponent: NotFoundPage,
  errorComponent: ServerErrorPage,

  head: () => {
    const siteUrl = "https://ewf-stade.de";
    const title = m.site_title_full();
    const description = m.site_description();
    const ogImage = `${siteUrl}/og-image.png`;

    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        // Open Graph
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:url",
          content: siteUrl,
        },
        {
          property: "og:image",
          content: ogImage,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: title,
        },
        {
          property: "og:locale",
          content: "de_DE",
        },
        // Twitter Card
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: ogImage,
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        {
          rel: "canonical",
          href: siteUrl,
        },
        {
          rel: "icon",
          href: "/favicon.ico",
          sizes: "any",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
      ],
    };
  },

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import("react-scan").then(({ scan }) => {
        scan({ enabled: true });
      });
    }
    initLenis();
  }, []);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Erstwähler Forum 2026",
    url: "https://ewf-stade.de",
    logo: "https://ewf-stade.de/logo.png",
    description:
      "Schulübergreifende Großveranstaltung zur politischen Bildung in Stade",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stade",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@ewf-stade.de",
      contactType: "General Inquiries",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Erstwähler Forum 2026",
    url: "https://ewf-stade.de",
    description:
      "Schulübergreifende Großveranstaltung zur politischen Bildung in Stade",
    inLanguage: "de",
  };

  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Prevents a light/dark flash before React hydrates
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string}
          options={{
            api_host: "/ingest",
            ui_host:
              import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
              "https://eu.posthog.com",
            defaults: "2025-05-24",
            capture_exceptions: true,
            // debug: import.meta.env.DEV,
            debug: false,
          }}
        >
          <HotkeysProvider>
            <NoiseOverlay />
            <CustomCursor />
            <Header />
            <main data-transition-container>{children}</main>
            <Footer />
            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
                {
                  name: "Tanstack Hotkeys",
                  render: (
                    <HotkeysDevtoolsPanel theme="dark" devtoolsOpen={false} />
                  ),
                },
              ]}
            />
          </HotkeysProvider>
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}
