import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EMPTY_PAGES_FILTERS } from "./AuditResultsTableFilterLogic";
import { PagesSummary } from "./PagesSummary";
import { depthBuckets, statusBuckets, unlinkedCount } from "./pagesBuckets";

const row = (
  statusCode: number | null,
  crawlDepth: number | null = 1,
  responseTimeMs: number | null = 100,
) => ({ statusCode, crawlDepth, responseTimeMs });

describe("statusBuckets", () => {
  it("cuts at the class boundaries and keeps unreachable pages apart", () => {
    const counts = Object.fromEntries(
      statusBuckets([
        row(200),
        row(299),
        row(300),
        row(399),
        row(400),
        row(503),
        row(null),
      ]).map((bucket) => [bucket.key, bucket.count]),
    );

    expect(counts).toEqual({ ok: 2, redirect: 2, error: 2, missing: 1 });
  });
});

describe("depthBuckets", () => {
  it("groups four clicks and deeper, and leaves unlinked pages out of the bars", () => {
    const pages = [
      row(200, 0),
      row(200, 1),
      row(200, 4),
      row(200, 11),
      row(200, null),
    ];

    expect(depthBuckets(pages).map((bucket) => bucket.count)).toEqual([
      1, 1, 0, 0, 2,
    ]);
    expect(unlinkedCount(pages)).toBe(1);
  });

  it("writes a closed range for a single depth and an open one for 4+", () => {
    const buckets = depthBuckets([]);

    expect(buckets[0]?.apply(EMPTY_PAGES_FILTERS)).toMatchObject({
      minDepth: "0",
      maxDepth: "0",
    });
    expect(buckets[4]?.apply(EMPTY_PAGES_FILTERS)).toMatchObject({
      minDepth: "4",
      maxDepth: "",
    });
  });
});

describe("PagesSummary", () => {
  const pages = [row(200, 0), row(404, 2), row(404, 2)];

  it("filters to the clicked status and releases it on a second click", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <PagesSummary
        pages={pages}
        filters={EMPTY_PAGES_FILTERS}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Hatalı/ }));
    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_PAGES_FILTERS,
      status: "error",
    });

    rerender(
      <PagesSummary
        pages={pages}
        filters={{ ...EMPTY_PAGES_FILTERS, status: "error" }}
        onChange={onChange}
      />,
    );
    const active = screen.getByRole("button", { name: /Hatalı/ });
    expect(active.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(active);
    expect(onChange).toHaveBeenLastCalledWith(EMPTY_PAGES_FILTERS);
  });

  it("filters to a depth band", () => {
    const onChange = vi.fn();
    render(
      <PagesSummary
        pages={pages}
        filters={EMPTY_PAGES_FILTERS}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /2 tık/ }));

    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_PAGES_FILTERS,
      minDepth: "2",
      maxDepth: "2",
    });
  });

  it("keeps an empty bucket visible but not clickable", () => {
    render(
      <PagesSummary
        pages={pages}
        filters={EMPTY_PAGES_FILTERS}
        onChange={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /Yönlendirme/ });
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
