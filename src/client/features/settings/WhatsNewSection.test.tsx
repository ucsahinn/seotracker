import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { WhatsNewSection } from "./WhatsNewSection";

afterEach(() => setLocale("tr"));

describe("WhatsNewSection", () => {
  it("shows release notes in the selected English interface language", () => {
    setLocale("en");
    render(<WhatsNewSection version="0.8.0" />);

    expect(screen.getByRole("heading", { name: /Site audit/ })).toBeDefined();
    expect(screen.getByText(/Your site's security settings/)).toBeDefined();
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
