import { describe, expect, it } from "vitest";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import { makeCrawledPage } from "@/server/lib/audit/issues/page-test-fixtures";

/*
 * Findings read off the heading counts and the image list -- two columns
 * every crawl has written since the analyzer existed, and neither of which
 * anything read until now. Split from `page-reporters.test.ts`, which was
 * already at the file-length ceiling.
 */
function issueTypes(page: Parameters<typeof runPageReporters>[0]): string[] {
  return runPageReporters(page).map((issue) => issue.issueType);
}

const makePage = makeCrawledPage;

describe("no-subheadings", () => {
  /*
   * The heading counts have been written by every crawl since the analyzer
   * was built and read by nothing. This is the question they answer.
   */
  it("reports a long page with nothing below the H1", () => {
    expect(
      issueTypes(
        makePage({ wordCount: 900, h1Count: 1, h2Count: 0, h3Count: 0 }),
      ),
    ).toContain("no-subheadings");
  });

  it("says nothing when the page has sections", () => {
    expect(
      issueTypes(
        makePage({ wordCount: 900, h1Count: 1, h2Count: 3, h3Count: 0 }),
      ),
    ).not.toContain("no-subheadings");
    expect(
      issueTypes(
        makePage({ wordCount: 900, h1Count: 1, h2Count: 0, h3Count: 2 }),
      ),
    ).not.toContain("no-subheadings");
  });

  /*
   * A short page needs no sections, and saying otherwise on every small
   * page would bury the pages where it matters.
   */
  it("leaves a short page alone", () => {
    expect(
      issueTypes(
        makePage({ wordCount: 200, h1Count: 1, h2Count: 0, h3Count: 0 }),
      ),
    ).not.toContain("no-subheadings");
  });
});

describe("alt text quality", () => {
  const withImages = (...alts: Array<string | null>) =>
    issueTypes(
      makePage({
        images: alts.map((alt) => ({
          src: "/i.jpg",
          alt,
          missingDimensions: false,
        })),
        imagesTotal: alts.length,
        imagesMissingAlt: alts.filter((a) => !a).length,
      }),
    );

  /*
   * An alt of "IMG_2231.jpg" passes the missing-alt count and helps nobody:
   * a screen reader announces the filename and image search learns nothing.
   */
  it("reports alt text that is really a filename", () => {
    expect(withImages("IMG_2231.jpg")).toContain("alt-is-filename");
    expect(withImages("DSC0043")).toContain("alt-is-filename");
    expect(withImages("screenshot-2.png")).toContain("alt-is-filename");
  });

  it("leaves a real description alone", () => {
    expect(withImages("Kırmızı koltukta oturan kadın")).not.toContain(
      "alt-is-filename",
    );
  });

  // Screen readers do not truncate; a long alt becomes a paragraph.
  it("reports an alt long enough to stop being a description", () => {
    expect(withImages("a".repeat(300))).toContain("alt-too-long");
    expect(withImages("a".repeat(100))).not.toContain("alt-too-long");
  });

  /*
   * An empty alt is the correct markup for a decorative image, and a
   * missing one is already reported by `images-missing-alt`.
   */
  it("says nothing about an image with no alt at all", () => {
    const types = withImages(null, "");
    expect(types).not.toContain("alt-is-filename");
    expect(types).not.toContain("alt-too-long");
  });
});

describe("images-missing-alt names its images", () => {
  const missingAlt = (images: Array<{ src: string; alt: string | null }>) =>
    runPageReporters(
      makePage({
        images: images.map((image) => ({ ...image, missingDimensions: false })),
        imagesTotal: images.length,
        imagesMissingAlt: images.filter((image) => !image.alt?.trim()).length,
      }),
    ).find((issue) => issue.issueType === "images-missing-alt");

  /*
   * The finding used to say "3 of 12" and nothing else, so fixing it meant
   * opening the page and hunting. `images_json` had carried every src since
   * the analyzer was written.
   */
  it("lists the addresses of the images with no alt text", () => {
    const issue = missingAlt([
      { src: "/img/hero.jpg", alt: "Ekip toplantısı" },
      { src: "/img/logo-old.png", alt: null },
      { src: "/img/banner.webp", alt: "" },
    ]);

    expect(issue?.details).toMatchObject({
      examples: ["/img/logo-old.png", "/img/banner.webp"],
    });
  });

  /*
   * The row lives in `details_json`, read on every issues screen, and a page
   * can carry hundreds of images. A sample, not the list.
   */
  it("caps the sample so the row stays small", () => {
    const issue = missingAlt(
      Array.from({ length: 40 }, (_, index) => ({
        src: `/img/${index}.jpg`,
        alt: null,
      })),
    );

    expect(issue?.details?.["examples"]).toHaveLength(3);
    // The count still says the truth about all of them.
    expect(issue?.details).toMatchObject({ imagesMissingAlt: 40 });
  });

  it("does not report a page whose images all have alt text", () => {
    expect(
      missingAlt([{ src: "/img/hero.jpg", alt: "Ekip toplantısı" }]),
    ).toBeUndefined();
  });
});
