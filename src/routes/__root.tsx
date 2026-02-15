import { PostHogProvider } from "@posthog/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { env } from "#env";
import * as m from "#p";
import { initLenis } from "~/lib/lenis";
import { getLocale } from "~/paraglide/runtime";
import CustomCursor from "../components/CustomCursor";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NoiseOverlay from "../components/NoiseOverlay";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

if (typeof window !== "undefined") {
  initLenis();
}

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", getLocale());
    }
  },

  head: () => {
    const siteUrl = "https://ewf-stade.de";
    const title = m.site_title();
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
      ],
    };
  },

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
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
      <body className="dark">
        <PostHogProvider
          apiKey={env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: "/ingest",
            ui_host: env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
            defaults: "2026-05-24",
            capture_exceptions: true,
            debug: import.meta.env.DEV,
          }}>
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
            ]}
          />
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}
