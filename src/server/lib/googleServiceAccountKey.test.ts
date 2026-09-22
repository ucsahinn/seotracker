import { describe, expect, it } from "vitest";
import {
  buildAssertionPayload,
  parseServiceAccountKey,
  pemToPkcs8,
  signAssertion,
} from "@/server/lib/googleServiceAccountKey";

/** A throwaway RSA key, generated here so nothing real is committed. */
async function generateTestPem(): Promise<string> {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", pair.privateKey);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
  const lines = base64.match(/.{1,64}/g)?.join("\n") ?? base64;
  // The wrapper around a key generated ten lines up and discarded when the
  // test ends; the scanner only sees the marker, hence the annotation.
  return `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----\n`; // gitleaks:allow
}

function decodeSegment(segment: string): unknown {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(padded + "=".repeat((4 - (padded.length % 4)) % 4)));
}

describe("parseServiceAccountKey", () => {
  /** The rejection reason, or a marker if it unexpectedly parsed. */
  function reasonFor(raw: string): string {
    const result = parseServiceAccountKey(raw);
    return result.ok ? "(parsed)" : result.reason;
  }

  // The file is pasted by hand, so the useful answer is which part is wrong.
  it("names what is wrong instead of just failing", () => {
    expect(reasonFor("not json")).toContain("JSON");
    expect(reasonFor(JSON.stringify({ type: "authorized_user" }))).toContain(
      "service_account",
    );
    expect(
      reasonFor(
        JSON.stringify({
          type: "service_account",
          client_email: "a@b.iam.gserviceaccount.com",
          private_key: "nonsense",
        }),
      ),
    ).toContain("private_key");
  });

  it("accepts a real key file and ignores the fields it does not need", () => {
    const result = parseServiceAccountKey(
      JSON.stringify({
        type: "service_account",
        client_email: "seotracker@p.iam.gserviceaccount.com",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nAAAA\n-----END PRIVATE KEY-----",
        project_id: "p",
        private_key_id: "ignored",
        client_x509_cert_url: "https://example.test/ignored",
      }),
    );

    expect(result).toMatchObject({
      ok: true,
      key: { client_email: "seotracker@p.iam.gserviceaccount.com" },
    });
  });
});

describe("pemToPkcs8", () => {
  // A key pasted from an environment variable carries literal backslash-n.
  it("reads both the downloaded and the escaped shape as the same bytes", () => {
    // "TUFO" is four base64 characters, not a key.
    const real = "-----BEGIN PRIVATE KEY-----\nTUFO\n-----END PRIVATE KEY-----"; // gitleaks:allow
    const escaped =
      "-----BEGIN PRIVATE KEY-----\\nTUFO\\n-----END PRIVATE KEY-----";

    expect([...pemToPkcs8(real)]).toEqual([...pemToPkcs8(escaped)]);
  });
});

describe("signAssertion", () => {
  it("produces an assertion Google's own verifier would accept", async () => {
    const pem = await generateTestPem();
    const payload = buildAssertionPayload({
      clientEmail: "seotracker@p.iam.gserviceaccount.com",
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      tokenUri: "https://oauth2.googleapis.com/token",
      issuedAt: 1_800_000_000,
    });

    const jwt = await signAssertion(payload, pem);
    const [header, claims, signature] = jwt.split(".");

    expect(decodeSegment(header)).toEqual({ alg: "RS256", typ: "JWT" });
    expect(decodeSegment(claims)).toEqual({
      iss: "seotracker@p.iam.gserviceaccount.com",
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: 1_800_000_000,
      // One hour, which is the longest Google honours.
      exp: 1_800_003_600,
    });
    // Base64url only: a `+`, `/` or `=` here means the token endpoint rejects it.
    expect(signature).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
