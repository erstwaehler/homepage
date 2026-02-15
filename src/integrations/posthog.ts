import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
	if (typeof window === "undefined" || initialized) return;

	const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
	const apiHost = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

	if (!apiKey) return;

	posthog.init(apiKey, {
		api_host: apiHost,
		capture_pageview: true,
		capture_pageleave: true,
		persistence: "localStorage+cookie",
	});

	initialized = true;
}

export { posthog };
