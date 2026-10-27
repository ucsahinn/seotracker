import { afterEach, describe, expect, it, vi } from "vitest";
import { formatDateTime, formatRelativeTime } from "./format";
import { setLocale, type Locale } from "./i18n";

afterEach(() => {
  setLocale("tr");
  vi.useRealTimers();
});
describe("shared time formatting", () => {
  it.each(["tr", "en", "de", "fr", "it", "pt"] as Locale[])(
    "uses %s under a minute (previously non-English locales returned Turkish)",
    (locale) => {
      vi.useFakeTimers();
      vi.setSystemTime("2026-10-27T12:00:00Z");
      setLocale(locale);
      const expected = new Intl.RelativeTimeFormat(
        {
          tr: "tr-TR",
          en: "en-US",
          de: "de-DE",
          fr: "fr-FR",
          it: "it-IT",
          pt: "pt-PT",
        }[locale],
        { numeric: "auto" },
      ).format(0, "second");
      expect(formatRelativeTime("2026-10-27T11:59:45Z")).toBe(expected);
    },
  );
  it("identifies a prior-year timestamp (previously its year was omitted)", () => {
    vi.useFakeTimers();
    vi.setSystemTime("2026-10-27T12:00:00Z");
    expect(formatDateTime("2025-10-27T12:00:00Z")).toContain("2025");
    expect(formatDateTime("2026-10-27T12:00:00Z")).not.toContain("2026");
  });
});
