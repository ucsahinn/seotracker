import type { ReactNode } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectFacts } from "./ProjectFacts";
import { archiveTrend } from "@/shared/archiveTrend";
vi.mock("@tanstack/react-router", () => ({
  // An href gives the stand-in the link role the real Link renders with.
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));
afterEach(cleanup);
const facts = (current: number, prior: number) => ({
  projectId: "p1",
  searchConsole: true,
  analytics: false,
  property: "sc-domain:example.com",
  archiveStatus: "available" as const,
  auditStatus: "available" as const,
  clicks: archiveTrend(
    [
      { date: "2026-10-24", clicks: prior },
      { date: "2026-10-25", clicks: current },
    ],
    1,
  ),
  snapshot: null,
  latestAttempt: null,
});
describe("ProjectFacts", () => {
  it("keeps known equal traffic visible as unchanged", () => {
    render(<ProjectFacts overview={facts(0, 0)} onRetry={() => {}} />);
    expect(screen.getByText("Değişmedi")).toBeDefined();
    expect(
      screen.getByText("Kayıtlı günlerde ölçülen tıklama sayısı sıfır."),
    ).toBeDefined();
    expect(
      screen
        .getByText("Kayıtlı günlerde ölçülen tıklama sayısı sıfır.")
        .closest("details")?.open,
    ).toBe(false);
    expect(screen.getByText("sc-domain:example.com")).toBeDefined();
  });
  it("prints explicit counts for a zero-base comparison", () => {
    render(<ProjectFacts overview={facts(8, 0)} onRetry={() => {}} />);
    expect(screen.getByText("0 → 8 tıklama")).toBeDefined();
  });
  it("shows the count change instead of a dramatic percentage on a small base", () => {
    render(<ProjectFacts overview={facts(5, 1)} onRetry={() => {}} />);
    expect(screen.getByText("1 → 5 tıklama")).toBeDefined();
    expect(screen.getByText("+4")).toBeDefined();
    expect(screen.queryByText(/400/)).toBeNull();
  });
  it("explains why partial periods have no change", () => {
    const overview = facts(8, 0);
    overview.clicks = archiveTrend([{ date: "2026-10-25", clicks: 8 }], 1);
    render(<ProjectFacts overview={overview} onRetry={() => {}} />);
    expect(
      screen.getByText(
        "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.",
      ),
    ).toBeDefined();
    expect(screen.queryByText("Değişmedi")).toBeNull();
  });
});

it("C28 keeps one provenance disclosure and one action row per project", () => {
  const { container } = render(
    <ProjectFacts overview={facts(8, 0)} onRetry={() => {}} />,
  );
  expect(container.querySelectorAll("details")).toHaveLength(1);
  const search = screen.getByRole("link", { name: "Arama performansı" });
  const audit = screen.getByRole("link", { name: "Site denetimlerini aç" });
  expect(search.parentElement).toBe(audit.parentElement);
  expect(
    screen
      .getByText("Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.")
      .closest("details")?.open,
  ).toBe(false);
});
