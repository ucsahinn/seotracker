import * as React from "react";

/**
 * Renders a translated sentence whose `{name}` placeholders are elements: a
 * link, a `<code>`, a bold word. The sentence stays one `t()` string, so
 * English can put the element where its own word order wants it instead of
 * gluing translated fragments around it. Placeholders with no part are left
 * as written.
 */
export function fillParts(
  template: string,
  parts: Record<string, React.ReactNode>,
): React.ReactNode {
  return template.split(/(\{\w+\})/).map((piece, index) => {
    const name = /^\{(\w+)\}$/.exec(piece)?.[1];
    if (name === undefined || !(name in parts)) return piece;
    // The pieces never reorder, so their index is a stable key.
    return <React.Fragment key={index}>{parts[name]}</React.Fragment>;
  });
}
