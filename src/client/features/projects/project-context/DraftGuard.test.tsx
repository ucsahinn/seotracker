import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { useState } from "react";
import { DraftGuard, useDirtyDraft } from "./DraftGuard";
const blocker = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-router", () => ({ useBlocker: blocker }));
function Editor() {
  const [dirty, setDirty] = useState(false);
  useDirtyDraft(dirty);
  return (
    <button onClick={() => setDirty(!dirty)}>{dirty ? "saved" : "edit"}</button>
  );
}
it("enables one leave warning only while an editor has unsaved changes", async () => {
  render(
    <DraftGuard>
      <Editor />
    </DraftGuard>,
  );
  expect(blocker.mock.lastCall?.[0]).toMatchObject({
    disabled: true,
    enableBeforeUnload: false,
  });
  fireEvent.click(screen.getByText("edit"));
  await waitFor(() =>
    expect(blocker.mock.lastCall?.[0]).toMatchObject({
      disabled: false,
      enableBeforeUnload: true,
    }),
  );
  fireEvent.click(screen.getByText("saved"));
  await waitFor(() =>
    expect(blocker.mock.lastCall?.[0]).toMatchObject({
      disabled: true,
      enableBeforeUnload: false,
    }),
  );
});
