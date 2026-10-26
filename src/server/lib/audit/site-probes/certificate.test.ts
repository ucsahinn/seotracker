import { describe, expect, it, vi } from "vitest";
import { lookupCertificate } from "./certificate";
import { fetchPublicJson } from "./third-party-fetch";

vi.mock("./third-party-fetch", () => ({ fetchPublicJson: vi.fn() }));

const now = new Date("2026-10-26T00:00:00Z");
const cert = (name_value: string, not_after: string) => ({
  issuer_name: "C=US, O=Let's Encrypt, CN=R11",
  name_value,
  not_before: "2026-08-01T00:00:00",
  not_after,
});

/** Answers each crt.sh identity from the table; null is a failed lookup. */
function logs(byIdentity: Record<string, unknown>) {
  vi.mocked(fetchPublicJson).mockImplementation(async (url) => {
    const identity = new URL(url).searchParams.get("q") ?? "";
    return byIdentity[identity] ?? null;
  });
}

describe("lookupCertificate", () => {
  // crt.sh's exact-name search misses the wildcard a subdomain is served
  // under, and an older exact-name certificate then read as "expiring".
  it("reads the wildcard certificate a subdomain is served under", async () => {
    logs({
      "www.example.com": [cert("www.example.com", "2026-11-01T00:00:00")],
      "*.example.com": [cert("*.example.com", "2027-01-20T00:00:00")],
    });

    const facts = await lookupCertificate("www.example.com", now);

    expect(facts.notAfter).toBe("2027-01-20T00:00:00.000Z");
  });

  it("is unknown when the wildcard lookup failed", async () => {
    logs({
      "www.example.com": [cert("www.example.com", "2026-11-01T00:00:00")],
    });

    const facts = await lookupCertificate("www.example.com", now);

    expect(facts.notAfter).toBeNull();
  });

  it("asks only for the apex itself", async () => {
    logs({ "example.com": [cert("example.com", "2027-01-20T00:00:00")] });

    expect((await lookupCertificate("example.com", now)).notAfter).toBe(
      "2027-01-20T00:00:00.000Z",
    );
    expect(fetchPublicJson).toHaveBeenCalledTimes(1);
  });

  it("never reports a certificate that has already expired", async () => {
    logs({ "example.com": [cert("example.com", "2026-10-20T00:00:00")] });

    expect((await lookupCertificate("example.com", now)).notAfter).toBeNull();
  });
});
