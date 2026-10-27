const FORBIDDEN_TAGS: Record<string, string> = {
  script: "a <script> tag",
  base: "a <base> tag",
  iframe: "an <iframe>, <object>, <embed> or <form>",
  object: "an <iframe>, <object>, <embed> or <form>",
  embed: "an <iframe>, <object>, <embed> or <form>",
  form: "an <iframe>, <object>, <embed> or <form>",
  link: "a <link> tag",
};
const URL_ATTRIBUTES = new Set([
  "href",
  "src",
  "action",
  "formaction",
  "xlink:href",
]);
const NAMED_ENTITIES: Record<string, string> = {
  colon: ":",
  tab: "\t",
  newline: "\n",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

const TAG_START = /<[a-z][^\s>/]*/gi;
// Elements whose content is text, not markup: a quote inside a <style> block
// is not an attribute.
const RAW_TEXT_ELEMENTS = new Set([
  "style",
  "textarea",
  "title",
  "xmp",
  "noembed",
  "noframes",
]);

/** What a browser sees in an attribute value: entities decoded once. */
function decodeEntities(value: string): string {
  return value.replace(
    /&(?:#x([0-9a-f]+)|#(\d+)|([a-z]+));?/gi,
    (match, hex?: string, dec?: string, name?: string) => {
      const code = hex ? parseInt(hex, 16) : dec ? parseInt(dec, 10) : NaN;
      if (hex || dec) {
        return Number.isInteger(code) && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : "";
      }
      return NAMED_ENTITIES[(name ?? "").toLowerCase()] ?? match;
    },
  );
}

function isScriptUrl(rawValue: string): boolean {
  // Browsers drop ASCII whitespace and control characters inside a scheme.
  const value = decodeEntities(rawValue)
    // oxlint-disable-next-line no-control-regex
    .replace(/[\0-\x20\x7f]/g, "")
    .toLowerCase();
  return /^(?:javascript|vbscript):|^data:text\/html/.test(value);
}

type StartTag = {
  name: string;
  attributes: Array<{ name: string; value: string }>;
};

const isSpace = (char: string) =>
  char === " " ||
  char === "\t" ||
  char === "\n" ||
  char === "\f" ||
  char === "\r";

/**
 * Reads one start tag's attributes the way the HTML tokenizer does: a name may
 * begin with any character (even `=`) and runs to whitespace, `/`, `>` or `=`;
 * a quote opens a value only after `name =`; an unquoted value runs to
 * whitespace or `>`. Returns the index after the closing `>`, or -1 when the
 * tag never closes (a browser drops it, so nothing in it can run).
 */
function readAttributes(
  html: string,
  start: number,
  attributes: StartTag["attributes"],
): number {
  let pos = start;
  while (pos < html.length) {
    const char = html.charAt(pos);
    if (char === ">") return pos + 1;
    if (isSpace(char) || char === "/") {
      pos += 1;
      continue;
    }
    const nameStart = pos;
    pos += 1;
    while (
      pos < html.length &&
      !isSpace(html.charAt(pos)) &&
      !"/>=".includes(html.charAt(pos))
    ) {
      pos += 1;
    }
    const name = html.slice(nameStart, pos).toLowerCase();
    let after = pos;
    while (isSpace(html.charAt(after))) after += 1;
    if (html.charAt(after) !== "=") {
      attributes.push({ name, value: "" });
      continue;
    }
    after += 1;
    while (isSpace(html.charAt(after))) after += 1;
    const quote = html.charAt(after);
    if (quote === '"' || quote === "'") {
      const close = html.indexOf(quote, after + 1);
      if (close === -1) return -1;
      attributes.push({ name, value: html.slice(after + 1, close) });
      pos = close + 1;
      continue;
    }
    const valueStart = after;
    while (
      after < html.length &&
      !isSpace(html.charAt(after)) &&
      html.charAt(after) !== ">"
    ) {
      after += 1;
    }
    attributes.push({ name, value: html.slice(valueStart, after) });
    pos = after;
  }
  return -1;
}

/** Index after a comment that starts at `<!--`, by the HTML end rules. */
function commentEnd(html: string, start: number): number {
  // `<!-->` and `<!--->` are complete, empty comments.
  if (html.startsWith("<!-->", start)) return start + 5;
  if (html.startsWith("<!--->", start)) return start + 6;
  const close = /--!?>/g;
  close.lastIndex = start + 4;
  const match = close.exec(html);
  return match ? match.index + match[0].length : html.length;
}

/**
 * Start tags exactly as a browser would find them: comments and raw-text
 * elements are skipped (their content is not markup), attributes follow the
 * tokenizer rules above. One linear pass, no regex backtracking.
 */
function* startTags(html: string): Generator<StartTag> {
  let pos = 0;
  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) return;
    if (html.startsWith("<!--", lt)) {
      pos = commentEnd(html, lt);
      continue;
    }
    TAG_START.lastIndex = lt;
    const match = TAG_START.exec(html);
    if (!match || match.index !== lt) {
      pos = lt + 1;
      continue;
    }
    const name = match[0].slice(1).toLowerCase();
    const attributes: StartTag["attributes"] = [];
    const end = readAttributes(html, lt + match[0].length, attributes);
    if (end === -1) return;
    yield { name, attributes };
    pos = end;
    if (RAW_TEXT_ELEMENTS.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, pos);
      if (close === -1) return;
      pos = close;
    }
  }
}

/*
 * A tokenizer rather than regexes over the whole document: attribute NAMES
 * are judged as names and VALUES as values, so a title that merely says
 * "onerror=" passes and `<img src="x"onerror=x>` or `<svg/onload=x>` do not.
 */
export function findForbiddenMarkup(html: string): string | null {
  for (const { name, attributes } of startTags(html)) {
    const forbiddenTag = FORBIDDEN_TAGS[name];
    if (forbiddenTag) return forbiddenTag;

    for (const { name: attrName, value } of attributes) {
      if (/^on[a-z]+$/.test(attrName)) return "an inline event handler (on…=)";
      if (URL_ATTRIBUTES.has(attrName) && isScriptUrl(value)) {
        return "a javascript: URL";
      }
      if (
        name === "meta" &&
        attrName === "http-equiv" &&
        decodeEntities(value).trim().toLowerCase() === "refresh"
      ) {
        return "a <meta http-equiv=refresh> tag";
      }
    }
  }
  return null;
}
