import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { WhatsNewSection } from "./WhatsNewSection";

afterEach(() => setLocale("tr"));

describe("WhatsNewSection", () => {
  it("shows release notes in the selected English interface language", () => {
    setLocale("en");
    render(<WhatsNewSection version="0.7.1" />);

    expect(screen.getByRole("heading", { name: "Features" })).toBeDefined();
    expect(
      screen.getByText(/Live announcements appear on the app/),
    ).toBeDefined();
    expect(screen.queryByText(/Canlı duyurular uygulamanın/)).toBeNull();
  });

  it("shows the selected locale's release notes", () => {
    setLocale("de");
    render(<WhatsNewSection version="0.7.1" />);

    expect(screen.getByRole("heading", { name: "Funktionen" })).toBeDefined();
    expect(screen.queryByText(/Canlı duyurular uygulamanın/)).toBeNull();
  });
});
