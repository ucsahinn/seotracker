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

it("C27/C31 groups property and read status with selection and identity in one disclosure", () => {
  const { container } = render(
    <GoogleConnectedState
      property="sc-domain:example.com"
      email="owner@example.com"
      bindingDate="2026-10-23T08:30:00Z"
      usesServiceAccount
      accessEvidence={{ observedAt: "2026-10-28T08:30:00Z", reason: null }}
      canManage={false}
      canManageAccounts={false}
      disabled={false}
      disconnecting={false}
      onChange={() => {}}
      onDisconnect={() => {}}
    />,
  );
  expect(container.querySelectorAll(".fact-strip")).toHaveLength(1);
  expect(screen.getByText("example.com").closest("details")).toBeNull();
  expect(
    screen.getByText(/Son başarılı Google okuması/).closest("details"),
  ).toBeNull();
  expect(screen.getByText("Seçildi").closest("details")).not.toBeNull();
  expect(screen.queryByText("Dönem")).toBeNull();
  expect(
    screen
      .getByText("owner@example.com")
      .closest("details")
      ?.querySelector("summary")?.textContent,
  ).toContain("Bağlantı ayrıntıları");
});
