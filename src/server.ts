import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    // Prüfen, ob die Anfrage von einer der alten Domains kommt
    const forbiddenHosts = [
      "erstwaehler.live",
      "www.erstwaehler.live",
      "www.ewf-stade.de",
    ];

    if (forbiddenHosts.includes(url.hostname)) {
      // Baue die neue URL mit dem gleichen Pfad und den gleichen Parametern
      const destination = `https://ewf-stade.de${url.pathname}${url.search}`;

      return new Response(null, {
        status: 301,
        headers: {
          Location: destination,
        },
      });
    }

    // Wenn die Domain korrekt ist, normal fortfahren
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};
