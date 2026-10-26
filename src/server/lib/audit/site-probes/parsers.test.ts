import { afterEach, describe, expect, it, vi } from "vitest";
import { newestCertificate } from "./certificate";
import { lookupDns, parseDohAnswer, pickTaggedTxt } from "./dns";
import { classifyNotFound, findDeclaredIcon } from "./http-probes";
import { parseRdap } from "./rdap";
import { readRobotsFacts } from "./robots-facts";

const ORIGIN = "https://example.com";

describe("readRobotsFacts", () => {
  const blocked = (text: string) =>
    readRobotsFacts(ORIGIN, { status: 200, text })
      .access.filter((entry) => entry.blocked)
      .map((entry) => entry.bot);

  it("names the AI crawlers a group blocks and leaves search engines alone", () => {
    const text = [
      "User-agent: GPTBot",
      "User-agent: ClaudeBot",
      "Disallow: /",
      "",
      "User-agent: *",
      "Allow: /",
      "Sitemap: https://example.com/sitemap.xml",
    ].join("\n");
    expect(blocked(text)).toEqual(["GPTBot", "ClaudeBot"]);
    const facts = readRobotsFacts(ORIGIN, { status: 200, text });
    expect(facts.disallowAll).toBe(false);
    expect(facts.hasSitemapLine).toBe(true);
  });

  it("names the * rules Googlebot's own group lets through", () => {
    const rules = (text: string) =>
      readRobotsFacts(ORIGIN, { status: 200, text }).googlebotOnlyRules;
    // npr.org's shape: `*` closes query strings and scripts, Googlebot is open.
    expect(
      rules(
        [
          "User-agent: *",
          "Disallow: /*?*",
          "Disallow: /*.js",
          "Disallow: /account/",
          "Disallow: /rundowns/segment.php?",
          "",
          "User-agent: GPTBot",
          "Disallow: /",
          "",
          "User-agent: Googlebot",
          "Allow: /",
          "Disallow: /account/",
        ].join("\r\n"),
      ),
    ).toEqual(["/*?*", "/*.js", "/rundowns/segment.php?"]);
    // Without its own group Googlebot reads `*`, so nothing is Googlebot-only.
    expect(rules(["User-agent: *", "Disallow: /private/"].join("\n"))).toEqual(
      [],
    );
  });

  it("reads a disallow-all for every bot as closing the site to Google", () => {
    const facts = readRobotsFacts(ORIGIN, {
      status: 200,
      text: "User-agent: *\nDisallow: /\n",
    });
    expect(facts.disallowAll).toBe(true);
    expect(facts.hasSitemapLine).toBe(false);
  });

  it("knows a 404 means no rules but an unreachable file means unknown", () => {
    expect(
      readRobotsFacts(ORIGIN, { status: 404, text: null }).disallowAll,
    ).toBe(false);
    expect(
      readRobotsFacts(ORIGIN, { status: null, text: null }).disallowAll,
    ).toBeNull();
  });
});

describe("parseRdap", () => {
  it("reads registration, expiry and the registrar's name", () => {
    const facts = parseRdap(
      {
        ldhName: "EXAMPLE.COM",
        events: [
          { eventAction: "registration", eventDate: "1995-08-14T04:00:00Z" },
          { eventAction: "expiration", eventDate: "2027-08-13T04:00:00Z" },
          { eventAction: "last changed", eventDate: "2024-08-14T07:01:34Z" },
        ],
        entities: [
          {
            roles: ["registrar"],
            vcardArray: [
              "vcard",
              [
                ["version", {}, "text", "4.0"],
                ["fn", {}, "text", "Example Registrar, Inc."],
              ],
            ],
          },
        ],
      },
      "example.com",
    );
    expect(facts).toEqual({
      domain: "example.com",
      registeredAt: "1995-08-14T04:00:00.000Z",
      expiresAt: "2027-08-13T04:00:00.000Z",
      registrar: "Example Registrar, Inc.",
    });
  });

  it("leaves expiry unknown when the registry omits it", () => {
    expect(parseRdap({ events: [] }, "example.tr").expiresAt).toBeNull();
    expect(parseRdap("not json", "example.tr").expiresAt).toBeNull();
  });
});

const ctEntry = (overrides: Record<string, string>) => ({
  issuer_name: "C=US, O=Let's Encrypt, CN=R11",
  name_value: "example.com\nwww.example.com",
  not_before: "2026-08-01T00:00:00",
  not_after: "2026-10-30T00:00:00",
  ...overrides,
});

describe("newestCertificate", () => {
  const now = new Date("2026-10-26T00:00:00Z");

  it("picks the latest-expiring certificate already valid for the host", () => {
    const facts = newestCertificate(
      [
        ctEntry({}),
        ctEntry({
          not_before: "2026-09-25T00:00:00",
          not_after: "2026-12-24T00:00:00",
        }),
        // Not yet valid: issued for tomorrow.
        ctEntry({
          not_before: "2026-10-27T00:00:00",
          not_after: "2027-01-25T00:00:00",
        }),
        // Another host entirely.
        ctEntry({
          name_value: "shop.example.com",
          not_after: "2027-06-01T00:00:00",
        }),
      ],
      "www.example.com",
      now,
    );
    expect(facts).toEqual({
      issuer: "Let's Encrypt",
      notBefore: "2026-09-25T00:00:00.000Z",
      notAfter: "2026-12-24T00:00:00.000Z",
    });
  });

  it("accepts a wildcard one label up and reads a quoted organisation", () => {
    const facts = newestCertificate(
      [
        ctEntry({
          name_value: "*.example.com",
          issuer_name:
            'C=US, O="Cloudflare, Inc.", CN=Cloudflare TLS Issuing ECC CA 1',
        }),
      ],
      "www.example.com",
      now,
    );
    expect(facts.issuer).toBe("Cloudflare, Inc.");
  });

  it("is unknown when nothing covers the host", () => {
    expect(newestCertificate([], "example.com", now).notAfter).toBeNull();
  });
});

describe("parseDohAnswer", () => {
  it("joins split TXT strings and finds SPF and DMARC by their tags", () => {
    const txt = parseDohAnswer(
      {
        Status: 0,
        Answer: [
          { type: 16, data: '"google-site-verification=abc"' },
          { type: 16, data: '"v=spf1 include:_spf.google.com " "~all"' },
        ],
      },
      "TXT",
    );
    expect(pickTaggedTxt(txt ?? [], "v=spf1")).toEqual([
      "v=spf1 include:_spf.google.com ~all",
    ]);
    const dmarc = parseDohAnswer(
      { Status: 0, Answer: [{ type: 16, data: '"v=DMARC1; p=none"' }] },
      "TXT",
    );
    expect(pickTaggedTxt(dmarc ?? [], "v=dmarc1")).toEqual([
      "v=DMARC1; p=none",
    ]);
  });

  it("treats NXDOMAIN as no records and SERVFAIL as unknown", () => {
    expect(parseDohAnswer({ Status: 3 }, "TXT")).toEqual([]);
    expect(parseDohAnswer({ Status: 2 }, "TXT")).toBeNull();
  });

  it("drops CNAME hops and decodes a CAA record sent in RFC 3597 form", () => {
    expect(
      parseDohAnswer(
        {
          Status: 0,
          Answer: [
            { type: 5, data: "example.com.cdn.net." },
            {
              type: 257,
              data: "\\# 19 00 05 69 73 73 75 65 6c 65 74 73 65 6e 63 72 79 70 74",
            },
          ],
        },
        "CAA",
      ),
    ).toEqual(['0 issue "letsencrypt"']);
  });
});

describe("classifyNotFound", () => {
  const probeUrl = `${ORIGIN}/seotracker-404-check-abc`;

  it("calls a redirect that lands on / a redirect home", () => {
    expect(
      classifyNotFound({ probeUrl, finalUrl: `${ORIGIN}/`, hops: 1 }),
    ).toEqual({ redirectedHome: true });
  });

  it("does not when the missing URL answered in place", () => {
    expect(classifyNotFound({ probeUrl, finalUrl: probeUrl, hops: 0 })).toEqual(
      { redirectedHome: false },
    );
  });
});

describe("findDeclaredIcon", () => {
  it("resolves the first declared icon against the page", () => {
    expect(
      findDeclaredIcon(
        '<head><link rel="stylesheet" href="/a.css"><link rel="shortcut icon" href="/img/fav.png"></head>',
        `${ORIGIN}/blog/`,
      ),
    ).toBe(`${ORIGIN}/img/fav.png`);
    expect(findDeclaredIcon("<head></head>", ORIGIN)).toBeNull();
  });
});

describe("lookupDns", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("marks a record it had to cut, so a long SPF is not shown as whole", async () => {
    const spf = `v=spf1 ${"ip4:198.51.100.0/24 ".repeat(60)}-all`;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string) => {
        const type = new URL(input).searchParams.get("type");
        const answer =
          type === "TXT" && !input.includes("_dmarc")
            ? [{ type: 16, data: `"${spf}"` }]
            : [];
        return Response.json({ Status: 0, Answer: answer });
      }),
    );
    const { records } = await lookupDns("example.com", "example.com");
    const shown = records.find((record) => record.type === "SPF")?.value;
    expect(shown).toHaveLength(300);
    expect(shown?.endsWith("…")).toBe(true);
  });
});
