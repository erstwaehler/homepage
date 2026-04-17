import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";
import { notFound } from "@tanstack/react-router";

// Server-side URL localization/redirects for Paraglide
export default {
  fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};
