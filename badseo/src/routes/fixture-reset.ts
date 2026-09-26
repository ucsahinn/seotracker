import { createFileRoute } from "@tanstack/react-router";
import { resetFixtureState } from "../fixtures/http-status";

/**
 * Put the fixture site's mutable state back to its starting point.
 *
 * Only the rate-limit counter today. It exists because the worker outlives
 * an audit run: a run that stops partway through the refuse-refuse-serve
 * sequence leaves the counter mid-cycle, and the next run then collects
 * extra 429s that inflate the crawl's shared cooldown and drop unrelated
 * pages. The harness calls this before it starts crawling.
 *
 * Unlinked and not in the sitemap, so the crawler never reaches it. Named
 * without a `__` prefix because TanStack's file-based router treats that
 * as a non-route marker and silently generates no route for it.
 */
export const Route = createFileRoute("/fixture-reset")({
  server: {
    handlers: {
      POST: () => {
        resetFixtureState();
        return new Response("ok", {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
