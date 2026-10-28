import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { GoogleConnectedState } from "./GoogleConnectedState";

afterEach(cleanup);

it("provides a concrete report destination without claiming a fresh access check", () => {
  render(
    <GoogleConnectedState
      property="sc-domain:example.com"
      reportHref="/p/p1/search-performance"
      reportLabel="Arama performansı"
      accessEvidence={{ observedAt: "2026-10-28T08:30:00Z", reason: null }}
      canManage={false}
      canManageAccounts={false}
      disabled={false}
      disconnecting={false}
      onChange={() => {}}
      onDisconnect={() => {}}
    />,
  );
  expect(
    screen
      .getByRole("link", { name: "Arama performansı" })
      .getAttribute("href"),
  ).toBe("/p/p1/search-performance");
  expect(
    screen.getByText(/Bu ekran Google’dan yeni veri istemez/),
  ).toBeDefined();
  expect(screen.getByText(/Son başarılı Google okuması/)).toBeDefined();
});

it("separates report and credential destinations with a wrapping gap", () => {
  render(
    <GoogleConnectedState
      property="example.com"
      reportHref="/p/p1/search-performance"
      reportLabel="Arama performansı"
      canManage={false}
      canManageAccounts={false}
      disabled={false}
      disconnecting={false}
      onChange={() => {}}
      onDisconnect={() => {}}
    />,
  );
  const report = screen.getByRole("link", { name: "Arama performansı" });
  const credentials = screen.getByRole("link", {
    name: "Kurulumun Google kimlik ayarları",
  });
  expect(report.parentElement).toBe(credentials.parentElement);
  expect(report.parentElement?.className).toMatch(/flex-wrap/);
  expect(report.parentElement?.className).toMatch(/gap-3/);
  expect(report.className).toContain("min-h-11");
});
