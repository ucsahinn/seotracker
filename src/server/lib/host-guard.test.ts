import { describe, expect, it } from "vitest";
import { hostGuardRejection } from "./host-guard";

function requestFor(host: string) {
  return new Request("http://127.0.0.1:3001/api/health", {
    headers: { host },
  });
}

describe("hostGuardRejection", () => {
  it("answers 421 to a name nobody configured: the DNS rebinding case", () => {
    expect(
      hostGuardRejection(requestFor("evil.test:3001"), "local_noauth", {})
        ?.status,
    ).toBe(421);
  });

  it.each(["localhost:3001", "127.0.0.1:3001", "[::1]:3001", "192.168.1.20"])(
    "lets %s through without configuration",
    (host) => {
      expect(
        hostGuardRejection(requestFor(host), "local_noauth", {}),
      ).toBeNull();
    },
  );

  it("lets the configured names through, and only those", () => {
    const settings = {
      allowedHost: "seo.example.com",
      authUrl: "https://auth.example.com",
    };
    expect(
      hostGuardRejection(
        requestFor("SEO.example.com:443"),
        "local_noauth",
        settings,
      ),
    ).toBeNull();
    expect(
      hostGuardRejection(
        requestFor("auth.example.com"),
        "local_noauth",
        settings,
      ),
    ).toBeNull();
    expect(
      hostGuardRejection(
        requestFor("seo.example.com.evil.test"),
        "local_noauth",
        settings,
      )?.status,
    ).toBe(421);
  });

  it.each(["x@127.0.0.1", "evil.test/..@localhost", "127.0.0.1.evil.test"])(
    "refuses %s, which only looks local",
    (host) => {
      expect(
        hostGuardRejection(requestFor(host), "local_noauth", {})?.status,
      ).toBe(421);
    },
  );

  it.each(["localhost.:3001", "LOCALHOST:3001"])(
    "reads %s as localhost",
    (host) => {
      expect(
        hostGuardRejection(requestFor(host), "local_noauth", {}),
      ).toBeNull();
    },
  );

  it("judges a request without a Host header by its request line", () => {
    expect(
      hostGuardRejection(
        new Request("http://evil.test/api/health"),
        "local_noauth",
        {},
      )?.status,
    ).toBe(421);
  });

  it("leaves a signed-in deployment to its own access layer", () => {
    expect(
      hostGuardRejection(requestFor("evil.test"), "cloudflare_access", {}),
    ).toBeNull();
  });
});
