import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageActions, RefreshButton } from "./RefreshButton";

describe("RefreshButton", () => {
  it("calls onRefresh on click", () => {
    const onRefresh = vi.fn();
    render(<RefreshButton onRefresh={onRefresh} />);
    fireEvent.click(screen.getByRole("button", { name: "Yenile" }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows a spinner, is disabled and busy while fetching", () => {
    const { container } = render(
      <RefreshButton onRefresh={() => {}} isFetching />,
    );
    const button = screen.getByRole("button", { name: "Yenile" });
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelector(".animate-spin")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain("Güncelleniyor");
  });

  it("announces Güncellendi after a fetch ends and shows the time", () => {
    const at = new Date(2026, 0, 5, 14, 32).getTime();
    const { rerender } = render(
      <RefreshButton onRefresh={() => {}} isFetching dataUpdatedAt={at} />,
    );
    rerender(
      <RefreshButton
        onRefresh={() => {}}
        isFetching={false}
        dataUpdatedAt={at}
      />,
    );
    expect(screen.getByRole("status").textContent).toContain("Güncellendi");
    expect(screen.getByText("Güncellendi: 14:32")).toBeTruthy();
  });

  it("honours disabled", () => {
    const onRefresh = vi.fn();
    render(<RefreshButton onRefresh={onRefresh} disabled />);
    fireEvent.click(screen.getByRole("button", { name: "Yenile" }));
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("opt-in r shortcut ignores typing in inputs", () => {
    const onRefresh = vi.fn();
    render(
      <>
        <input aria-label="ara" />
        <RefreshButton onRefresh={onRefresh} shortcut />
      </>,
    );
    fireEvent.keyDown(screen.getByLabelText("ara"), { key: "r" });
    expect(onRefresh).not.toHaveBeenCalled();
    fireEvent.keyDown(document.body, { key: "r" });
    expect(onRefresh).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document.body, { key: "r", ctrlKey: true });
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("does not bind the shortcut by default", () => {
    const onRefresh = vi.fn();
    render(<RefreshButton onRefresh={onRefresh} />);
    fireEvent.keyDown(document.body, { key: "r" });
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("PageActions renders its children", () => {
    render(
      <PageActions>
        <span>x</span>
      </PageActions>,
    );
    expect(screen.getByText("x")).toBeTruthy();
  });
});
