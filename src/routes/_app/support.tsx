import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

const GITHUB_URL = "https://github.com/ucsahinn/seotracker";
const UPSTREAM_URL = "https://github.com/every-app/open-seo";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-8 pb-24 md:px-6 md:py-12 md:pb-8">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <p className="text-sm font-medium text-base-content/40">Help</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Where to look
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-base-content/70">
          This instance runs on your own machine, so almost every problem shows
          up in two places: the container log and the health endpoint.
        </p>

        <ul className="space-y-3 text-sm text-base-content/70">
          <li>
            <span className="font-medium text-base-content">Container log</span>{" "}
            — <code className="text-xs">docker compose logs -f</code>. Startup
            checks print here before the app serves anything.
          </li>
          <li>
            <span className="font-medium text-base-content">
              Health endpoint
            </span>{" "}
            —{" "}
            <a href="/api/health" className="link link-primary">
              /api/health
            </a>{" "}
            reports which integrations are configured and whether the database
            answers.
          </li>
          <li>
            <span className="font-medium text-base-content">Setup docs</span> —
            the <code className="text-xs">docs/</code> directory in the
            repository covers Docker, Search Console and Analytics setup.
          </li>
        </ul>

        <div className="space-y-2 border-t border-base-300 pt-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="link link-primary inline-flex items-center gap-1.5 text-sm"
          >
            This fork on GitHub
            <ExternalLink className="size-3.5" />
          </a>
          <p className="text-xs text-base-content/50">
            Forked from{" "}
            <a
              href={UPSTREAM_URL}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              every-app/open-seo
            </a>
            , MIT licensed.
          </p>
        </div>
      </div>
    </div>
  );
}
