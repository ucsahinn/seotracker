import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  save: vi.fn(),
  fetch: vi.fn<typeof fetch>(),
}));

// Reaches the database, which this test stubs out entirely.
vi.mock("@/server/features/updates/UpdateCheckRepository", () => ({
  UpdateCheckRepository: { get: mocks.get, save: mocks.save },
}));

import { version as currentVersion } from "../../../../package.json";
import { UpdateCheckService } from "./UpdateCheckService";

const BLANK = {
  enabled: true,
  checkedAt: null,
  etag: null,
  latestTag: null,
  releaseUrl: null,
  publishedAt: null,
  lastStatus: null,
};

function release(tag: string) {
  return Response.json(
    {
      tag_name: tag,
      html_url: `https://github.com/ucsahinn/seotracker/releases/tag/${tag}`,
      published_at: "2026-09-22T00:00:00Z",
    },
    { status: 200, headers: { etag: 'W/"abc"' } },
  );
}

describe("UpdateCheckService", () => {
  beforeEach(() => {
    mocks.get.mockResolvedValue({ ...BLANK });
    // The service reads back what it wrote, so the save mock has to merge.
    mocks.save.mockImplementation(async (values: Record<string, unknown>) => ({
      ...BLANK,
      ...values,
    }));
    vi.stubGlobal("fetch", mocks.fetch);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    mocks.fetch.mockReset();
  });

  it("sends the User-Agent GitHub refuses requests without", async () => {
    mocks.fetch.mockResolvedValue(release("v9.9.9"));

    await UpdateCheckService.getStatus();

    const headers = new Headers(mocks.fetch.mock.calls[0]?.[1]?.headers);
    expect(headers.get("user-agent")).toMatch(/^seotracker\//);
  });

  /*
   * Derived from the shipped version rather than written as a literal. This
   * test used to say `v0.3.0`, which stopped being newer the day 0.3.0
   * shipped -- so cutting a release broke a test that was about comparison,
   * not about any particular number.
   */
  it("reports an update when the published tag is newer", async () => {
    const [major] = currentVersion.split(".");
    const newer = `v${Number(major) + 1}.0.0`;
    mocks.fetch.mockResolvedValue(release(newer));

    const status = await UpdateCheckService.getStatus();

    expect(status).toMatchObject({
      latestVersion: newer,
      updateAvailable: true,
      outcome: "ok",
    });
  });

  /*
   * The state this repo is actually in until the first release is cut, and
   * the one most likely to be mistaken for a fault: 404 is GitHub's ordinary
   * answer for a repo with no releases.
   */
  it("treats a 404 as 'nothing published yet', not as a failure", async () => {
    mocks.fetch.mockResolvedValue(new Response("", { status: 404 }));

    const status = await UpdateCheckService.getStatus();

    expect(status.outcome).toBe("no_releases");
    expect(status.updateAvailable).toBe(false);
  });

  it("degrades to 'unreachable' rather than throwing when the call fails", async () => {
    mocks.fetch.mockRejectedValue(new Error("getaddrinfo ENOTFOUND"));

    const status = await UpdateCheckService.getStatus();

    expect(status.outcome).toBe("unreachable");
  });

  // Every call is one of 60 an hour, shared with everything else on the
  // operator's IP, so a fresh answer must not spend another.
  it("serves the cached answer without asking GitHub again", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: new Date().toISOString(),
      lastStatus: 200,
      latestTag: "v0.3.0",
    });

    const status = await UpdateCheckService.getStatus();

    expect(mocks.fetch).not.toHaveBeenCalled();
    expect(status.latestVersion).toBe("v0.3.0");
  });

  it("asks again when the cached answer is a day old", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      lastStatus: 200,
      latestTag: "v0.2.0",
    });
    mocks.fetch.mockResolvedValue(release("v0.4.0"));

    await UpdateCheckService.getStatus();

    expect(mocks.fetch).toHaveBeenCalledOnce();
  });

  // Off has to mean the request is never constructed, not that the answer is
  // hidden — that is the difference between a setting and a placebo.
  it("never contacts GitHub when checking is switched off", async () => {
    mocks.get.mockResolvedValue({ ...BLANK, enabled: false });

    const status = await UpdateCheckService.getStatus({ force: true });

    expect(mocks.fetch).not.toHaveBeenCalled();
    expect(status.outcome).toBe("disabled");
  });
});
