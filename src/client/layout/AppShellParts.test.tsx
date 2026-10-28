import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";
import { MobileSidebarDrawer } from "./AppShellParts";
import { ProjectSwitcher } from "@/client/features/projects/ProjectSwitcher";

vi.mock("@/client/components/Sidebar", () => ({
  Sidebar: () => <ProjectSwitcher activeProjectId={null} />,
}));
vi.mock("@/serverFunctions/projects", () => ({ getProjects: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ state: { matches: [] }, navigate: vi.fn() }),
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => (
    <a href="/projects">{children}</a>
  ),
}));

function setup() {
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  client.setQueryData(
    ["projects"],
    [{ id: "p1", name: "Example", domain: null }],
  );
  function Page() {
    const [open, setOpen] = useState(false);
    const opener = useRef<HTMLButtonElement>(null);
    return (
      <>
        <main>
          <button ref={opener} onClick={() => setOpen(true)}>
            Open menu
          </button>
        </main>
        <MobileSidebarDrawer
          open={open}
          projectId={null}
          openerRef={opener}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }
  const view = render(
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>,
  );
  const opener = screen.getByRole("button", { name: "Open menu" });
  opener.focus();
  return { opener, view, client };
}

it("UX-03 isolates background content and preserves pre-existing inert state on close and unmount", () => {
  const existing = document.createElement("div");
  existing.setAttribute("inert", "");
  document.body.appendChild(existing);
  const { opener, view, client } = setup();
  fireEvent.click(opener);
  expect(opener.closest("[inert]")).not.toBeNull();
  expect(screen.getByRole("dialog").closest("[inert]")).toBeNull();
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
  expect(opener.closest("[inert]")).toBeNull();
  expect(existing.hasAttribute("inert")).toBe(true);
  expect(document.activeElement).toBe(opener);
  fireEvent.click(opener);
  view.unmount();
  expect(view.container.hasAttribute("inert")).toBe(false);
  expect(existing.hasAttribute("inert")).toBe(true);
  existing.remove();
  client.clear();
});

it("UX-06 consumes project picker Escape before closing the mobile drawer on the next Escape", () => {
  const { opener, client } = setup();
  fireEvent.click(opener);
  const consumed = new KeyboardEvent("keydown", {
    key: "Escape",
    bubbles: true,
    cancelable: true,
  });
  consumed.preventDefault();
  fireEvent(screen.getByRole("dialog"), consumed);
  expect(screen.getByRole("dialog")).toBeDefined();
  const trigger = screen.getByRole("button", { name: "Proje değiştir" });
  fireEvent.click(trigger);
  fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(screen.getByRole("dialog")).toBeDefined();
  expect(document.activeElement).toBe(trigger);
  fireEvent.keyDown(trigger, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.activeElement).toBe(opener);
  client.clear();
});
