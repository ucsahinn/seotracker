import { describe, expect, it } from "vitest";
import { describeIssueDetails, detailLineText } from "./details";

const text = (issueType: string, details: unknown) =>
  describeIssueDetails(issueType, JSON.stringify(details)).map(detailLineText);

describe("describeIssueDetails", () => {
  it("says why a sitemap could not be read", () => {
    expect(
      text("sitemap-unreadable", { reason: "status", statusCode: 404 }),
    ).toEqual(["Neden: Sunucu HTTP 404 döndürdü"]);
  });

  it("turns generic evidence into labelled lines", () => {
    expect(
      text("redirect-chain", { length: 82, statusCode: 404, hops: ["a", "b"] }),
    ).toEqual([
      "Uzunluk (karakter): 82",
      "Durum kodu: 404",
      "Yönlendirme zinciri: a → b",
    ]);
  });

  it("returns nothing for empty, broken or non-object details", () => {
    expect(describeIssueDetails("x", null)).toEqual([]);
    expect(describeIssueDetails("x", "{oops")).toEqual([]);
    expect(describeIssueDetails("x", "[1,2]")).toEqual([]);
  });

  it("states Lighthouse's estimated savings and lists examples as code", () => {
    const lines = describeIssueDetails(
      "lh-render-blocking",
      JSON.stringify({
        lighthouseAudit: "render-blocking-insight",
        savingsMs: 420,
        savingsBytes: 180_000,
        examples: ["https://a.com/app.css"],
      }),
    );
    expect(lines.map(detailLineText)).toEqual([
      "Tahmini kazanç: ~420 ms, 180 KB",
      "Örnekler: https://a.com/app.css",
      "Lighthouse denetimi: render-blocking-insight",
    ]);
    expect(lines[1]?.items).toEqual(["https://a.com/app.css"]);
  });

  it("puts a Core Web Vitals value against its bands and names the source", () => {
    expect(
      text("cwv-lcp-needs-improvement", {
        lcpMs: 3100,
        source: "field",
        goodMs: 2500,
        poorMs: 4000,
      }),
    ).toEqual([
      "LCP: 3,1 sn (iyi: en çok 2,5 sn, kötü: 4,0 sn üstü)",
      "Kaynak: saha verisi (gerçek Chrome kullanıcıları)",
    ]);
  });

  it("names a broken link's target and why it failed", () => {
    expect(
      text("broken-external-link", {
        targetUrl: "https://gone.example/x",
        status: 404,
        reason: "http",
      }),
    ).toEqual(["Kırık dış bağlantı: https://gone.example/x (404)"]);
    expect(
      text("broken-external-link", {
        targetUrl: "https://nx.example/",
        status: null,
        reason: "dns",
      }),
    ).toEqual([
      "Kırık dış bağlantı: https://nx.example/ (alan adı bulunamadı)",
    ]);
  });

  it("counts oversized images and lists each with its size", () => {
    expect(
      text("image-file-too-large", {
        count: 3,
        over500Kb: 1,
        limitBytes: 200_000,
        images: [
          { url: "https://a.com/big.jpg", bytes: 812_000, atLeast: true },
        ],
      }),
    ).toEqual([
      "3 görsel 200 KB'tan büyük",
      "1 görsel 500 KB'tan büyük",
      "Görseller: https://a.com/big.jpg · en az 812 KB",
    ]);
  });
});
