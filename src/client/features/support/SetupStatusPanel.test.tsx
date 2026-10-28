import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SetupStatusPanel } from "./SetupStatusPanel";
import { setLocale } from "@/shared/i18n";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));
vi.mock("./useSetupSnapshot", () => ({
  useSetupSnapshot: () => ({
    googleReady: false,
    update: undefined,
    diagnostics: {
      isPending: false,
      isError: false,
      data: {
        version: "0.8.2",
        authMode: "local_noauth",
        generatedAt: "2026-10-28T08:00:00Z",
        setup: {
          checks: {},
          port: { actual: 3001, configured: 3001, fallback: null },
        },
        projects: [],
        connections: { searchConsole: [], analytics: [] },
        tables: {},
        audits: [],
      },
    },
  }),
}));

it("explains the Connections to report to Refresh path for a current Google read", () => {
  render(<SetupStatusPanel />);
  expect(
    screen.getByText(
      /Bağlantıları açın, seçili mülkün raporuna gidin ve Yenile/,
    ),
  ).toBeDefined();
  expect(
    screen.queryByText(/Erişimi proje bağlantılarından doğrulayın/),
  ).toBeNull();
});

it("names the current Project context destination in English Help", () => {
  setLocale("en");
  try {
    render(<SetupStatusPanel />);
    expect(
      screen.getByText(
        "This install itself. A project's setup checklist is on the Dashboard and in Project context.",
      ),
    ).toBeDefined();
    expect(screen.queryByText(/Project info/)).toBeNull();
  } finally {
    setLocale("tr");
  }
});
