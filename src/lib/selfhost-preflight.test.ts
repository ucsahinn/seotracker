import { describe, expect, it } from "vitest";
import { runSelfhostPreflight } from "./selfhost-preflight";

function itemFor(
  result: ReturnType<typeof runSelfhostPreflight>,
  name: string,
) {
  return result.items.find((item) => item.name === name);
}

describe("runSelfhostPreflight", () => {
  it("passes the stock Docker setup (local_noauth + DataForSEO key)", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "local_noauth",
    });

    expect(result.failed).toBe(false);
    expect(itemFor(result, "AUTH_MODE")?.level).toBe("ok");
    expect(itemFor(result, "PAGESPEED_API_KEY")?.level).toBe("warn");
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

  it("warns when no PageSpeed key is set", () => {
    const result = runSelfhostPreflight({ AUTH_MODE: "local_noauth" });

    expect(itemFor(result, "PAGESPEED_API_KEY")?.level).toBe("warn");
    expect(itemFor(result, "PAGESPEED_API_KEY")?.message).toContain("429");
    expect(result.failed).toBe(false);
  });

  it("accepts a PageSpeed key without inspecting its shape", () => {
    const result = runSelfhostPreflight({
      AUTH_MODE: "local_noauth",
      PAGESPEED_API_KEY: "AIzaSyExample",
    });

    expect(itemFor(result, "PAGESPEED_API_KEY")?.level).toBe("ok");
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
