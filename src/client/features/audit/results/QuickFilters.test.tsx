import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuickFilters, quickFilterCounts } from "./QuickFilters";
import { EMPTY_PAGES_FILTERS } from "./AuditResultsTableFilterLogic";

const counts = {
  noindex: 3,
  slow: 2,
  alt: 5,
  sitemap: 0,
};

function page(
  overrides: Partial<Parameters<typeof quickFilterCounts>[0][number]> = {},
) {
  return {
    isIndexable: true,
    inSitemap: true,
    imagesMissingAlt: 0,
    responseTimeMs: 100,
    ...overrides,
  };
}

describe("quickFilterCounts", () => {
  /*
   * Counted over the whole crawl, not the filtered view — a chip that only
   * counted what is already on screen would read zero the moment you used
   * it, which is the opposite of what a count on a filter is for.
   */
  it("counts each preset over every page", () => {
    const result = quickFilterCounts([
      page({ isIndexable: false }),
      page({ responseTimeMs: 4000 }),
      page({ imagesMissingAlt: 2 }),
      page({ inSitemap: false }),
      page(),
    ]);

    expect(result).toEqual({
      noindex: 1,
      slow: 1,
      alt: 1,
      sitemap: 1,
    });
  });

  it("treats a page with no measured response time as not slow", () => {
    expect(quickFilterCounts([page({ responseTimeMs: null })]).slow).toBe(0);
  });
});

describe("QuickFilters", () => {
  it("writes into the same filter state the panel uses", () => {
    const onChange = vi.fn();
    render(
      <QuickFilters
        filters={EMPTY_PAGES_FILTERS}
        onChange={onChange}
        counts={counts}
        sitemapFound
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Dizine kapalı/ }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ indexable: "no" }),
    );
  });

  /*
   * One preset at a time. Stacking them silently — "noindex AND slow" —
   * produces an empty table and no way to tell which chip caused it.
   */
  it("replaces the previous preset rather than stacking", () => {
    const onChange = vi.fn();
    render(
      <QuickFilters
        filters={{ ...EMPTY_PAGES_FILTERS, indexable: "no" }}
        onChange={onChange}
        counts={counts}
        sitemapFound
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Yavaş/ }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ indexable: "all", minResponseMs: "1000" }),
    );
  });

  it("pressing the active preset clears it", () => {
    const onChange = vi.fn();
    render(
      <QuickFilters
        filters={{ ...EMPTY_PAGES_FILTERS, indexable: "no" }}
        onChange={onChange}
        counts={counts}
        sitemapFound
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Dizine kapalı/ }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ indexable: "all" }),
    );
  });

  /*
   * "No sitemap misses" is an answer worth seeing, so the chip stays — it just
   * cannot be pressed into an empty table.
   */
  it("shows a preset with nothing behind it, disabled", () => {
    render(
      <QuickFilters
        filters={EMPTY_PAGES_FILTERS}
        onChange={vi.fn()}
        counts={counts}
        sitemapFound
      />,
    );

    expect(
      screen.getByRole("button", { name: /Site haritasında yok/ }),
    ).toHaveProperty("disabled", true);
  });

  /*
   * With no sitemap found every page reads "not in it", so the chip would
   * count the whole crawl. It is replaced by a visible reason instead.
   */
  it("replaces the sitemap chip with a reason when no sitemap was found", () => {
    render(
      <QuickFilters
        filters={EMPTY_PAGES_FILTERS}
        onChange={vi.fn()}
        counts={counts}
        sitemapFound={false}
      />,
    );

    expect(screen.queryByRole("button", { name: /Site haritasında yok/ })).toBe(
      null,
    );
    expect(screen.getByText(/site haritası bulunamadı/)).toBeTruthy();
  });

  it("does not offer a second Hatalı control next to the summary bar", () => {
    render(
      <QuickFilters
        filters={EMPTY_PAGES_FILTERS}
        onChange={vi.fn()}
        counts={counts}
        sitemapFound
      />,
    );

    expect(screen.queryByRole("button", { name: /Hatalı/ })).toBe(null);
  });
});
