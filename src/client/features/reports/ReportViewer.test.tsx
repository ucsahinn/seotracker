import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReportViewer } from "./ReportViewer";

afterEach(() => vi.useRealTimers());
describe("ReportViewer", () => {
  it("turns an unresponsive preview into bounded recovery and retries", () => {
    vi.useFakeTimers();
    render(<ReportViewer src="/r/r1?v=1" title="Monthly" />);
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.getByRole("alert").textContent).toContain(
      "zamanında açılmadı",
    );
    fireEvent.click(screen.getByRole("button", { name: "Yeniden dene" }));
    expect(
      screen.getByTitle("Rapor önizlemesi: Monthly").getAttribute("sandbox"),
    ).not.toContain("allow-same-origin");
  });
  it("does not time out a loaded frame and remounts for same-ID replacement", () => {
    vi.useFakeTimers();
    const { rerender } = render(
      <ReportViewer src="/r/r1?v=1" title="Monthly" />,
    );
    const frame = screen.getByTitle("Rapor önizlemesi: Monthly");
    fireEvent.load(frame);
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(screen.queryByRole("alert")).toBeNull();
    rerender(<ReportViewer src="/r/r1?v=2" title="Monthly" />);
    expect(screen.getByTitle("Rapor önizlemesi: Monthly")).not.toBe(frame);
  });
  it("does not mount a document that is missing after metadata succeeded", async () => {
    render(
      <ReportViewer
        src="/r/r1"
        title="Missing"
        checkAvailability={async () => ({ available: false })}
      />,
    );
    expect((await screen.findByRole("alert")).textContent).toContain(
      "belgesi bulunamadı",
    );
    expect(screen.queryByTitle("Rapor önizlemesi: Missing")).toBeNull();
  });
});
