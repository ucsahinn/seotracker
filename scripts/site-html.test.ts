import { expect, test } from "vitest";
import { compactSiteHtml } from "./site-html.mjs";

test("compaction preserves inline word boundaries and preformatted content", () => {
  const html = compactSiteHtml(`<p>Hello\n  <strong>world</strong> again.</p>
    <pre>  first\n    second</pre><textarea> a\n b </textarea>`);
  expect(html).toContain("<p>Hello <strong>world</strong> again.</p>");
  expect(html).toContain("<pre>  first\n    second</pre>");
  expect(html).toContain("<textarea> a\n b </textarea>");
});

test("compaction preserves executable text, SVG casing and escaped attributes", () => {
  const html = compactSiteHtml(`<script>const value = "two  spaces";</script>
    <style>.a::before { content: "two  spaces"; }</style>
    <svg viewBox="0 0 20 14"><linearGradient id="a"></linearGradient></svg>
    <a title="A &quot;quote&quot;" href="/?a=1&amp;b=2">Link</a>`);
  expect(html).toContain('const value = "two  spaces";');
  expect(html).toContain('content: "two  spaces";');
  expect(html).toContain('viewBox="0 0 20 14"');
  expect(html).toContain("<linearGradient");
  expect(html).toContain('title="A &quot;quote&quot;"');
  expect(html).toContain('href="/?a=1&amp;b=2"');
});

test("compaction keeps JSON-LD values while removing formatting", () => {
  expect(
    compactSiteHtml(`<script type="application/ld+json">{
      "name": "two  spaces", "version": "0.5.0"
    }</script>`),
  ).toContain('{"name":"two  spaces","version":"0.5.0"}');
});
