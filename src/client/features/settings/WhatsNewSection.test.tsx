import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { WhatsNewSection } from "./WhatsNewSection";
import { CHANGELOG_ENTRIES_BY_LOCALE } from "./changelog";

afterEach(() => setLocale("tr"));

describe("WhatsNewSection", () => {
  it("keeps the installed version visible and opens the newest note when its version is absent", () => {
    render(<WhatsNewSection version="99.0.0" />);
    expect(screen.getByText("v99.0.0")).toBeDefined();
    expect(
      screen
        .getAllByRole("button")
        .some((button) => button.getAttribute("aria-expanded") === "true"),
    ).toBe(true);
    expect(
      screen.getByText(
        "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.",
      ),
    ).toBeDefined();
  });

  it("explains an empty bundled changelog and provides a guide destination", () => {
    const original = CHANGELOG_ENTRIES_BY_LOCALE.tr;
    CHANGELOG_ENTRIES_BY_LOCALE.tr = [];
    try {
      render(<WhatsNewSection version="0.8.0" />);
      expect(
        screen.getByText("Bu pakette sürüm notu bulunmuyor."),
      ).toBeDefined();
      expect(
        screen.getByRole("link", { name: /Kılavuzu aç/ }).getAttribute("href"),
      ).toBe("https://seowatcher.io/kilavuz/surum-notlari/");
    } finally {
      CHANGELOG_ENTRIES_BY_LOCALE.tr = original;
    }
  });

  it("keeps safe note links actionable and renders unsafe destinations as text", () => {
    const original = CHANGELOG_ENTRIES_BY_LOCALE.tr;
    CHANGELOG_ENTRIES_BY_LOCALE.tr = [
      {
        version: "1.0.0",
        date: "2026-10-27",
        intro:
          "[Guide](https://seowatcher.io/) [Unsafe](javascript:alert) [Settings](/settings)",
        sections: [],
      },
    ];
    try {
      render(<WhatsNewSection version="1.0.0" />);
      expect(
        screen.getByRole("link", { name: /^Guide/ }).getAttribute("href"),
      ).toBe("https://seowatcher.io/");
      expect(
        screen.getByRole("link", { name: "Settings" }).getAttribute("href"),
      ).toBe("/settings");
      expect(screen.queryByRole("link", { name: "Unsafe" })).toBeNull();
      const toggle = screen.getByRole("button", { name: /v1.0.0/ });
      fireEvent.click(toggle);
      expect(toggle.getAttribute("aria-expanded")).toBe("false");
      fireEvent.click(toggle);
      expect(toggle.getAttribute("aria-expanded")).toBe("true");
    } finally {
      CHANGELOG_ENTRIES_BY_LOCALE.tr = original;
    }
  });
  it("shows release notes in the selected English interface language", () => {
    setLocale("en");
    render(<WhatsNewSection version="0.8.0" />);

    expect(screen.getByRole("heading", { name: /Site audit/ })).toBeDefined();
    expect(screen.getByText(/Your site's security settings/)).toBeDefined();
    expect(
      screen.getByText(/Your site's security settings/).closest("details")
        ?.open,
    ).toBe(false);
    expect(screen.queryByText(/Sitenizin güvenlik ayarları/)).toBeNull();
  });

  it("shows the selected locale's release notes", () => {
    setLocale("de");
    render(<WhatsNewSection version="0.8.0" />);

    expect(
      screen.getByRole("heading", { name: /Website-Audit/ }),
    ).toBeDefined();
    expect(screen.queryByText(/Sitenizin güvenlik ayarları/)).toBeNull();
  });
});
