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

  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: m.site_title(),
      },
      {
        name: "description",
        content: m.site_description(),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
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
