import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { expect, it, vi } from "vitest";
import { CreateProjectModal } from "./CreateProjectModal";
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/serverFunctions/projects", () => ({ createProject: vi.fn() }));

it("UX-02 returns focus to the New project opener after cancelling the real creation form", () => {
  function Page() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>New project</button>
        {open ? <CreateProjectModal onClose={() => setOpen(false)} /> : null}
      </>
    );
  }
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>,
  );
  const opener = screen.getByRole("button", { name: "New project" });
  opener.focus();
  fireEvent.click(opener);
  expect(document.activeElement).toBe(
    screen.getByRole("textbox", { name: "Ad" }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Vazgeç" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.activeElement).toBe(opener);
  client.clear();
});
