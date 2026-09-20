import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy | badseo.dev" },
      {
        name: "description",
        content:
          "BadSEO is a static test site for the seotracker audit crawler. It runs no analytics, sets no cookies, and collects nothing from visitors.",
      },
    ],
  }),
  component: PrivacyPage,
});

/*
 * Rewritten from upstream's policy, which described Plausible, Google
 * Analytics, a consent banner and Cloudflare hosting, and named another
 * company as the operator. None of that is true of this fork: the analytics
 * were removed along with the rest of the project's telemetry, and the site
 * is served from whatever machine the operator runs it on.
 */
function PrivacyPage() {
  return (
    <SiteLayout>
      <main className="main">
        <h1>Privacy policy</h1>
        <p className="lede">
          There is very little to say here, which is the point. Last updated
          September 20, 2026.
        </p>

        <h2>What this site is</h2>
        <p>
          BadSEO is a collection of deliberately broken pages used to test the
          seotracker site-audit crawler. Every page exists to trigger a specific
          audit finding. It has no accounts, no forms, no purchases and no
          user-submitted content, and nothing on it is intended for a human
          audience beyond the person testing the crawler.
        </p>

        <h2>What it collects</h2>
        <p>
          Nothing. The site runs no analytics, loads no third-party scripts, and
          sets no cookies. It stores nothing in your browser and sends nothing
          anywhere. Earlier versions of this page described an analytics stack
          and a consent banner; both were removed, and this page was rewritten
          rather than left describing software that is no longer here.
        </p>

        <h2>Who runs it</h2>
        <p>
          Whoever started it. BadSEO is part of the seotracker repository and is
          normally run on a developer&apos;s own machine alongside the audit
          harness. If you are reading this on someone else&apos;s deployment,
          the host of that deployment receives ordinary request information such
          as your address and the page you asked for, because that is how the
          web works, and this project has no say in what they keep.
        </p>

        <h2>Questions</h2>
        <p>
          Open an issue on the{" "}
          <a href="https://github.com/ucsahinn/seotracker">
            seotracker repository
          </a>
          .
        </p>
      </main>
    </SiteLayout>
  );
}
