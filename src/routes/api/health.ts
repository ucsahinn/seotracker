import { createFileRoute } from "@tanstack/react-router";

// Unauthenticated setup/health endpoint: reports per-feature configuration
// status (statuses and guidance only — never secret values) so "container is up
// but misconfigured" is diagnosable with one curl. The Docker HEALTHCHECK
// probes it.
async function handleHealthRequest(request: Request): Promise<Response> {
  const { getSelfHostSetupStatus } = await import("@/server/lib/setup-status");
  // The request URL gives `port.actual`; see getPortFacts.
  const setup = await getSelfHostSetupStatus({ requestUrl: request.url });
  const hasError = Object.values(setup.checks).some(
    (check) => check.status === "error",
  );

  return Response.json({ status: hasError ? "issues" : "ok", ...setup });
}

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: ({ request }) => handleHealthRequest(request),
    },
  },
});
