import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { getLocale } from "@/paraglide/runtime";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initPostHog } from "../integrations/posthog";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("lang", getLocale());
			initPostHog();
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
				title: "Erstwähler Forum 2026",
			},
			{
				name: "description",
				content:
					"Schulübergreifende Großveranstaltung zur politischen Bildung für Erstwähler in Stade",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootComponent,
	shellComponent: RootDocument,
});

function RootComponent() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={getLocale()}>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-slate-900 text-white">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
