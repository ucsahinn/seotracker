import { describe, expect, it } from "vitest";
import { runSelfhostPreflight } from "./selfhost-preflight";

function itemFor(
  result: ReturnType<typeof runSelfhostPreflight>,
  name: string,
) {
  return result.items.find((item) => item.name === name);
}

describe("runSelfhostPreflight", () => {
  it("passes the stock Docker setup", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "local_noauth",
    });

    expect(result.failed).toBe(false);
    expect(itemFor(result, "AUTH_MODE")?.level).toBe("ok");
  });

  it("fails an invalid AUTH_MODE with the valid list", () => {
    const result = runSelfhostPreflight({ AUTH_MODE: "local-noauth" });

    expect(result.failed).toBe(true);
    expect(itemFor(result, "AUTH_MODE")?.message).toContain(
      "cloudflare_access, local_noauth",
    );
  });

  it("fails cloudflare_access mode without TEAM_DOMAIN and POLICY_AUD", () => {
    const result = runSelfhostPreflight({});

    expect(result.failed).toBe(true);
    const item = itemFor(result, "AUTH_MODE");
    expect(item?.message).toContain("TEAM_DOMAIN and POLICY_AUD");
    expect(item?.message).toContain("AUTH_MODE is unset");
  });

  it("fails a bare-hostname TEAM_DOMAIN with the https:// fix", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "cloudflare_access",
      TEAM_DOMAIN: "your-team.cloudflareaccess.com",
      POLICY_AUD: "aud-tag",
    });

    expect(result.failed).toBe(true);
    expect(itemFor(result, "TEAM_DOMAIN")?.message).toContain("https://");
  });

  /*
   * Not a warning. The key normally lives in the database, entered on the
   * settings page, and this check runs before the app can read it -- so an
   * absent variable is the expected state of a correctly configured install,
   * and warning about it trained the operator to ignore the startup banner.
   */
  it("points at Settings when no PageSpeed key is in the environment", () => {
    const result = runSelfhostPreflight({ AUTH_MODE: "local_noauth" });

    expect(itemFor(result, "PageSpeed")?.level).toBe("info");
    expect(itemFor(result, "PageSpeed")?.message).toContain("Settings");
    expect(itemFor(result, "PageSpeed")?.message).toContain("429");
    expect(result.failed).toBe(false);
  });

  it("accepts a PageSpeed key without inspecting its shape", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "local_noauth",
      PAGESPEED_API_KEY: "AIzaSyExample",
    });

    expect(itemFor(result, "PageSpeed")?.level).toBe("ok");
  });

  it("warns that GSC stays disabled on a short BETTER_AUTH_SECRET", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "local_noauth",
      GOOGLE_CLIENT_ID: "id",
      GOOGLE_CLIENT_SECRET: "secret",
      BETTER_AUTH_SECRET: "too-short",
    });

    expect(itemFor(result, "Search Console")?.level).toBe("warn");
    expect(itemFor(result, "Search Console")?.message).toContain("32");
  });

  it("mentions ALLOWED_HOST when unset", () => {
    const result = runSelfhostPreflight({ AUTH_MODE: "local_noauth" });

    expect(itemFor(result, "ALLOWED_HOST")?.level).toBe("info");
    expect(itemFor(result, "ALLOWED_HOST")?.message).toContain("reverse proxy");
  });
});
