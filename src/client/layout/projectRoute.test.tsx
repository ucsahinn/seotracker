import { act, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ projectId: "p1", mounts: 0, shell: 0 }));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: { component: () => React.ReactNode }) => ({
    component: options.component,
    useParams: () => ({ projectId: state.projectId }),
  }),
  Outlet: function FakeOutlet() {
    useEffect(() => {
      state.mounts += 1;
    }, []);
    return <div>page</div>;
  },
  useMatch: () => false,
  useNavigate: () => () => undefined,
}));
vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({ error: null }),
}));
vi.mock("@/client/lib/active-project", () => ({ setLastProjectId: () => {} }));
vi.mock("@/serverFunctions/projects", () => ({ getProjectAccess: () => {} }));
vi.mock("@/client/layout/AppShell", () => ({
  AuthenticatedAppLayout: function FakeShell({
    children,
  }: {
    children: React.ReactNode;
  }) {
    useEffect(() => {
      state.shell += 1;
    }, []);
    return <div>{children}</div>;
  },
}));

import { ProjectLayout } from "@/routes/_project/p/$projectId/route";

describe("project layout", () => {
  it("remounts the page outlet, not the shell, when the project changes", () => {
    const Layout = ProjectLayout;
    const { rerender } = render(<Layout />);
    expect(screen.getByText("page")).toBeTruthy();
    state.projectId = "p2";
    act(() => rerender(<Layout />));
    expect(state.mounts).toBe(2);
    expect(state.shell).toBe(1);
  });
});
