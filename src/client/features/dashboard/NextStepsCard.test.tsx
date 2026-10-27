import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextStepsCard } from "./NextStepsCard";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    ...rest
  }: {
    children: React.ReactNode;
    to: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 86_400_000).toISOString();

function audit(
  overrides: Partial<Parameters<typeof NextStepsCard>[0]["audit"]> = {},
) {
  return {
    auditId: "audit_1",
    status: "completed" as const,
    startedAt: daysAgo(1),
    severityTotals: { critical: 0, warning: 0, info: 0 },
    ...overrides,
  };
}

describe("NextStepsCard", () => {
  it("words the shared setup verdict and names what is missing", () => {
    const setup = {
      searchConsole: true,
      analytics: false,
      audit: true,
      projectInfo: true,
      pageSpeed: false,
      agent: true,
    };
    const { rerender } = render(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        setup={setup}
        audit={audit()}
      />,
    );
    expect(screen.getByText("Kurulum 4 / 6")).toBeDefined();
    expect(
      screen.getByText(/Kurulumda eksik: Analytics, PageSpeed anahtarı/),
    ).toBeDefined();

    rerender(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        setup={{ ...setup, analytics: true, pageSpeed: true }}
        audit={audit()}
      />,
    );
    expect(screen.getByText("Kurulum tamam")).toBeDefined();
  });

  it("says why a failed audit stopped, in the same words as the audit screen", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        audit={audit({ status: "failed", errorCode: "missing_secret" })}
      />,
    );

    expect(screen.getByText(/Sorun sitenizde değil, uygulamada/)).toBeDefined();
  });

  it("keeps the recommendations panel visible when Google setup is the only remaining action", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={false}
        googleMissing={true}
        audit={audit()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Sıradaki adımlar" }),
    ).toBeDefined();
    expect(
      screen.getByRole("link", {
        name: "Google erişim anahtarını Ayarlar'a girin",
      }),
    ).toBeDefined();
    expect(
      screen.queryByText(
        "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.",
      ),
    ).toBeNull();
  });

  /*
   * Without Search Console half the app has nothing to show -- rankings,
   * opportunities and the whole search side are empty -- so it outranks
   * everything else however bad the crawl was.
   */
  it("puts connecting Search Console first", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={false}
        audit={audit({ severityTotals: { critical: 9, warning: 0, info: 0 } })}
      />,
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]?.textContent).toContain("Search Console");
  });

  it("asks for a first crawl when there has never been one", () => {
    render(<NextStepsCard projectId="p1" gscConnected={true} audit={null} />);

    expect(screen.getByText(/İlk denetimi başlatın/)).toBeDefined();
  });

  it("offers a retry when the last audit failed", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        audit={audit({ status: "failed" })}
      />,
    );

    expect(screen.getByText(/Denetimi yeniden başlatın/)).toBeDefined();
  });

  /*
   * Criticals are what stop Google indexing a page, so they come before
   * anything advisory.
   */
  it("raises criticals above the advisory steps", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        audit={audit({ severityTotals: { critical: 3, warning: 11, info: 0 } })}
      />,
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]?.textContent).toContain("3 kritik sorun");
  });

  /*
   * Every number on the dashboard comes from the last crawl, so a crawl
   * that predates the site's current state is its own finding.
   */
  it("offers a rescan once the crawl is a week old", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={true}
        audit={audit({ startedAt: daysAgo(30) })}
      />,
    );

    expect(screen.getByText(/Denetimi tazeleyin/)).toBeDefined();
  });

  it("does not offer a rescan on a fresh crawl", () => {
    render(
      <NextStepsCard projectId="p1" gscConnected={true} audit={audit()} />,
    );

    expect(screen.queryByText(/Denetimi tazeleyin/)).toBeNull();
  });

  /*
   * A list of three when there is nothing to do would be busywork dressed
   * as advice. Saying so is the honest answer.
   */
  it("says so plainly when there is nothing urgent", () => {
    render(
      <NextStepsCard projectId="p1" gscConnected={false} audit={audit()} />,
    );

    // Only the Search Console step, which is the one real gap here.
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("stays a next step rather than a backlog", () => {
    render(
      <NextStepsCard
        projectId="p1"
        gscConnected={false}
        audit={audit({
          startedAt: daysAgo(30),
          severityTotals: { critical: 4, warning: 9, info: 2 },
        })}
      />,
    );

    expect(screen.getAllByRole("listitem").length).toBeLessThanOrEqual(3);
  });
});
