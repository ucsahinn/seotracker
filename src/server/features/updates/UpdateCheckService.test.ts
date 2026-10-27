import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  get: vi.fn<() => Promise<Record<string, unknown>>>(),
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
  lastSuccessAt: null,
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
    mocks.save.mockImplementation(async (values: Record<string, unknown>) => {
      const current: Record<string, unknown> = await mocks.get();
      return { ...current, ...values };
    });
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
   * The repository has releases, so a 404 means it was renamed, removed or
   * made private. Reading it as "nothing published yet" hid that.
   */
  it("treats a 404 as a missing release source, not as 'no releases yet'", async () => {
    mocks.fetch.mockResolvedValue(new Response("", { status: 404 }));

    const status = await UpdateCheckService.getStatus();

    expect(status.outcome).toBe("source_missing");
    expect(status.updateAvailable).toBe(false);
  });

  it("asks again after six hours, in step with the tray launcher", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      lastStatus: 200,
      latestTag: `v${currentVersion}`,
    });
    mocks.fetch.mockResolvedValue(release(`v${currentVersion}`));

    await UpdateCheckService.getStatus();

    expect(mocks.fetch).toHaveBeenCalledOnce();
  });

  it("records a 200 that is not a release as a failed attempt", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: "2026-09-20T08:00:00.000Z",
      lastSuccessAt: "2026-09-20T08:00:00.000Z",
      lastStatus: 200,
      latestTag: "v0.3.0",
    });
    mocks.fetch.mockResolvedValue(Response.json({ message: "unexpected" }));

    const status = await UpdateCheckService.getStatus({ force: true });

    expect(status).toMatchObject({
      outcome: "error",
      lastSuccessAt: "2026-09-20T08:00:00.000Z",
    });
  });

  it.each([403, 429])(
    "reports HTTP %s as rate/access restriction, not offline",
    async (status) => {
      mocks.fetch.mockResolvedValue(new Response("", { status }));
      expect(await UpdateCheckService.getStatus()).toMatchObject({
        reason: "rate_limited",
      });
    },
  );
  it("distinguishes timeout and malformed successful responses", async () => {
    mocks.fetch.mockRejectedValue(
      new DOMException("timed out", "TimeoutError"),
    );
    expect((await UpdateCheckService.getStatus()).reason).toBe("timeout");
    mocks.fetch.mockResolvedValue(Response.json({ message: "not a release" }));
    expect((await UpdateCheckService.getStatus()).reason).toBe(
      "invalid_release",
    );
  });
  it("degrades to 'unreachable' rather than throwing when the call fails", async () => {
    mocks.fetch.mockRejectedValue(new Error("getaddrinfo ENOTFOUND"));

    const status = await UpdateCheckService.getStatus();

    expect(status.outcome).toBe("unreachable");
  });

  /*
   * The bug this pins: a forced check that failed used to keep outcome "ok"
   * because an older tag was cached, so the button answered "up to date"
   * after a failed GitHub call.
   */
  it.each([
    ["the network is down", () => Promise.reject(new Error("ENOTFOUND"))],
    [
      "GitHub rate limits the call",
      () => Promise.resolve(new Response("", { status: 403 })),
    ],
  ])(
    "reports a failed forced check when %s, keeping the cached version",
    async (_name, respond) => {
      const lastSuccessAt = "2026-09-20T08:00:00.000Z";
      mocks.get.mockResolvedValue({
        ...BLANK,
        checkedAt: lastSuccessAt,
        lastSuccessAt,
        lastStatus: 200,
        latestTag: "v0.3.0",
      });
      mocks.fetch.mockImplementation(respond);

      const status = await UpdateCheckService.getStatus({ force: true });

      expect(status).toMatchObject({
        outcome: "error",
        latestVersion: "v0.3.0",
        lastSuccessAt,
      });
      expect(status.checkedAt).not.toBe(lastSuccessAt);
    },
  );

  it("records when GitHub last answered, so a later failure can report it", async () => {
    mocks.fetch.mockResolvedValue(release("v0.3.0"));

    const status = await UpdateCheckService.getStatus();

    expect(status.lastSuccessAt).toBe(status.checkedAt);
  });

  // Every call is one of 60 an hour, shared with everything else on the
  // operator's IP, so a fresh answer must not spend another.
  it("serves the cached answer without asking GitHub again", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: new Date().toISOString(),
      lastStatus: 200,
      // Cache freshness follows attempt time, independently of the remote tag.
      latestTag: `v${currentVersion}`,
    });

    const status = await UpdateCheckService.getStatus();

    expect(mocks.fetch).not.toHaveBeenCalled();
    expect(status.latestVersion).toBe(`v${currentVersion}`);
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

  it("guards bug 1: an older remote tag still honors the six-hour attempt TTL", async () => {
    mocks.get.mockResolvedValue({
      ...BLANK,
      checkedAt: new Date().toISOString(),
      lastSuccessAt: new Date().toISOString(),
      lastStatus: 200,
      latestTag: "v0.0.1",
    });
    mocks.fetch.mockResolvedValue(release(`v${currentVersion}`));

    const status = await UpdateCheckService.getStatus();

    expect(mocks.fetch).not.toHaveBeenCalled();
    expect(status.latestVersion).toBe("v0.0.1");
  });

  it.each([429, 304, 200])(
    "guards bug 1: a stale older tag does not retry immediately after HTTP %s",
    async (httpStatus) => {
      let row: Record<string, unknown> = {
        ...BLANK,
        checkedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        latestTag: "v0.0.1",
        lastStatus: 200,
      };
      mocks.get.mockImplementation(async () => row);
      mocks.save.mockImplementation(async (values: Record<string, unknown>) => {
        row = { ...row, ...values };
        return row;
      });
      mocks.fetch.mockResolvedValue(
        httpStatus === 200
          ? release("v0.0.1")
          : new Response(null, { status: httpStatus }),
      );
      await UpdateCheckService.getStatus();
      const cached = await UpdateCheckService.getStatus();
      expect(mocks.fetch).toHaveBeenCalledOnce();
      expect(cached.latestVersion).toBe("v0.0.1");
      expect(cached.reason).toBe(httpStatus === 429 ? "rate_limited" : null);
    },
  );

  it("never contacts GitHub when checking is switched off", async () => {
    mocks.get.mockResolvedValue({ ...BLANK, enabled: false });

    const status = await UpdateCheckService.getStatus({ force: true });

    expect(mocks.fetch).not.toHaveBeenCalled();
    expect(status.outcome).toBe("disabled");
  });
});
