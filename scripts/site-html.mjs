import { DomUtils, parseDocument } from "htmlparser2";

/** Collapse ordinary HTML whitespace without touching code or preformatted text. */
export function compactSiteHtml(html) {
  const document = parseDocument(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
  });
  const preserve = new Set(["pre", "textarea", "script", "style"]);
  function visit(node, verbatim = false) {
    const keep = verbatim || preserve.has(node.name);
    if (node.type === "text" && !keep)
      node.data = node.data.replace(/[\t\r\n ]+/g, " ");
    if (node.children) {
      node.children = node.children.filter((child) => child.type !== "comment");
      node.children.forEach((child) => visit(child, keep));
    }
    if (
      node.name === "script" &&
      node.attribs?.type === "application/ld+json"
    ) {
      const text = node.children?.find((child) => child.type === "text");
      if (text) text.data = JSON.stringify(JSON.parse(text.data));
    }
  }
  visit(document);
  return (
    DomUtils.getOuterHTML(document, { encodeEntities: false }).trim() + "\n"
  );
}
