import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/client/components/NotFound";

/*
 * An unknown path inside a project. The project layout is client-only
 * (`ssr: false`), and leaving the miss to the router's not-found handling
 * there rendered an empty document; a catch-all keeps the sidebar and shows
 * the same page as everywhere else.
 */
export const Route = createFileRoute("/_project/p/$projectId/$")({
  component: NotFound,
});
