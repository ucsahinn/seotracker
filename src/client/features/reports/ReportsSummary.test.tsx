import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ReportsSummary } from "./ReportsSummary";
import type { ReportListItem } from "@/serverFunctions/reports";
vi.mock("./ReportDownloadButton", () => ({ ReportDownloadButton: () => null }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));
const legacy: ReportListItem = {
  id: "r",
  projectId: "p",
  title: "detaydepo.com site denetimi",
  summary: "Historical text",
  nativeKind: null,
  nativeIdentity: null,
  skill: null,
  templateId: null,
  templateName: null,
  createdBy: "app:site-audit",
  createdByUserId: "u",
  createdByName: null,
  sizeBytes: 1,
  createdAt: "2026-10-26",
  updatedAt: "2026-10-26",
};
it("F14 does not promote an unverified legacy title as the current site summary", () => {
  render(<ReportsSummary projectId="p" latest={legacy} />);
  expect(screen.queryByText("Son güncellenen rapor")).toBeNull();
  expect(
    screen.getByText(
      "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.",
    ),
  ).toBeTruthy();
});
it("F14 flags a verified source that differs from the project site", () => {
  render(
    <ReportsSummary
      projectId="p"
      latest={{
        ...legacy,
        nativeKind: "site-audit-export",
        sourceUrl: "https://detaydepo.com/",
        projectDomain: "vaultpilot.io",
      }}
    />,
  );
  expect(screen.getByText("Kaynak site: detaydepo.com")).toBeTruthy();
  expect(
    screen.getByText("Bu rapor projenin sitesine ait değil: vaultpilot.io."),
  ).toBeTruthy();
});
it("F15 offers a current audit without classifying a legacy report from its title", () => {
  render(<ReportsSummary projectId="p" latest={legacy} />);
  expect(
    screen.getByText("Eski rapor · kaynak ve tarih doğrulanmamış"),
  ).toBeTruthy();
  expect(
    screen
      .getByRole("link", { name: "Güncel bir denetim raporu oluştur" })
      .getAttribute("href"),
  ).toBe("/p/$projectId/audit");
  expect(screen.queryByText("Uygulama raporu, tür kaydedilmemiş")).toBeNull();
});
