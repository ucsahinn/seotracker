import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { DataTrustStrip } from "./DataTrustStrip";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
import { formatDate } from "@/shared/format";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

it("qualifies an assumed lag throughout the strip, even without provisional rows", () => {
  const view = searchViewFixture();
  view.window.incompleteSource = "assumed";
  const { container } = render(
    <DataTrustStrip projectId="p" view={view} compare="none" />,
  );
  expect(screen.getByText("Toplamların son günü")).toBeDefined();
  expect(screen.getByText("Gecikme varsayıldı")).toBeDefined();
  expect(
    screen.getByText("Toplamların son günü").nextElementSibling?.textContent,
  ).toContain(formatDate(view.window.endDate));
  expect(container.textContent).not.toMatch(
    /Kesin veri|Kesin günler|sayımı bitmiş|Kesinleşmemiş gün yok/,
  );
  expect(screen.getByText(/Google kesinleşme tarihi bildirmedi/)).toBeDefined();
});

it("uses a confirmed-final label only when Google supplies completeness metadata", () => {
  render(
    <DataTrustStrip projectId="p" view={searchViewFixture()} compare="none" />,
  );
  expect(screen.getByText("Google'ın kesinleştirdiği veri")).toBeDefined();
  expect(screen.queryByText("Gecikme varsayıldı")).toBeNull();
});
