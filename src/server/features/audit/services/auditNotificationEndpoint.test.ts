import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleAuditNotificationRequest } from "@/routes/api/audit-notifications";
import { resolveUserContextFromHeaders } from "@/middleware/ensure-user/resolve";
import { getAuditNotificationFeed } from "./auditNotifications";

vi.mock("@/middleware/ensure-user/resolve", () => ({
  resolveUserContextFromHeaders: vi.fn(),
}));
vi.mock("./auditNotifications", () => ({ getAuditNotificationFeed: vi.fn() }));

beforeEach(() => {
  vi.mocked(resolveUserContextFromHeaders).mockResolvedValue({
    userId: "u",
    userEmail: "operator@example.com",
    emailVerified: true,
    role: "owner",
    organizationId: "org",
  });
  vi.mocked(getAuditNotificationFeed).mockResolvedValue({
    cursor: { finishedAt: "2026-10-28T12:00:00.000Z", id: "a" },
    events: [],
  });
});

describe("audit notification endpoint", () => {
  it("uses the existing authenticated organization and prevents caching", async () => {
    const response = await handleAuditNotificationRequest(
      new Request(
        "http://127.0.0.1:3001/api/audit-notifications?cursor=example",
      ),
    );
    expect(getAuditNotificationFeed).toHaveBeenCalledWith("org", "example");
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({
      cursor: { finishedAt: "2026-10-28T12:00:00.000Z", id: "a" },
      events: [],
    });
  });
  it("does not read outcomes when authentication fails", async () => {
    vi.mocked(resolveUserContextFromHeaders).mockRejectedValue(
      new Error("private auth detail"),
    );
    const response = await handleAuditNotificationRequest(
      new Request("http://127.0.0.1:3001/api/audit-notifications"),
    );
    expect(response.status).toBe(401);
    expect(getAuditNotificationFeed).not.toHaveBeenCalled();
    expect(await response.text()).not.toContain("private auth detail");
  });
  it("returns a client error for malformed JSON cursors", async () => {
    vi.mocked(getAuditNotificationFeed).mockRejectedValue(new SyntaxError());
    const response = await handleAuditNotificationRequest(
      new Request("http://127.0.0.1:3001/api/audit-notifications?cursor=bad"),
    );
    expect(response.status).toBe(400);
  });
  it("hides storage failure details and lets the launcher retry", async () => {
    vi.mocked(getAuditNotificationFeed).mockRejectedValue(
      new Error("private database detail"),
    );
    const response = await handleAuditNotificationRequest(
      new Request("http://127.0.0.1:3001/api/audit-notifications"),
    );
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private database detail");
  });
});
