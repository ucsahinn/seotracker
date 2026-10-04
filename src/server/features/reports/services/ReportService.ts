import { ReportRepository } from "@/server/features/reports/repositories/ReportRepository";
import { AppError } from "@/server/lib/errors";
import { formatEnglishCount } from "@/shared/format";
import {
  REPORT_MAX_BYTES_PER_ORG,
  REPORT_MAX_HTML_BYTES,
  REPORT_MAX_PER_PROJECT,
  REPORT_MAX_SUMMARY_CHARS,
  REPORT_MAX_TITLE_CHARS,
  type ReportMetadata,
} from "@/types/schemas/reports";

// Reports: the HTML documents agents write for a project. Every caller (server
// function, MCP tool, SAM) comes through here, so the caps and the refusal copy
// exist once. Authorization is NOT done here — the caller has already
// authorized `projectId` (ensureUserMiddleware for server functions,
// withMcpProjectAuth for MCP tools) and every query is scoped to it.

// The over-size refusal prints the actual size and the limit side by side, so
// they must never round to the same number: 499,900 bytes reading "500 KB; the
// limit is 500 KB" tells the agent to shrink by nothing. Round the actual size
// up and the limit down.
const kbUp = (bytes: number) =>
  `${formatEnglishCount(Math.ceil(bytes / 1000))} KB`;
const kbDown = (bytes: number) =>
  `${formatEnglishCount(Math.floor(bytes / 1000))} KB`;
const mb = (bytes: number) =>
  `${formatEnglishCount(Math.round(bytes / 1_000_000))} MB`;

const htmlBytes = (html: string) => new TextEncoder().encode(html).length;

type SaveReportParams = {
  projectId: string;
  /** The project's organization, for the workspace-wide storage ceiling. */
  organizationId: string;
  reportId?: string;
  title: string;
  summary: string;
  html: string;
  skill?: string;
  /** Validated against the project by the caller, not here. */
  templateId?: string;
  /** Client label, stamped by the server. Never taken from the model. */
  createdBy: string;
  /** From the authenticated context, and nowhere else. */
  createdByUserId: string;
};

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
function findForbiddenMarkup(html: string): string | null {
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

/**
 * Create-or-update in one call. Everything is validated before anything is
 * written, so a rejected save leaves the stored report untouched — there is no
 * version history, and a half-written overwrite is unrecoverable.
 */
export async function saveReport(params: SaveReportParams): Promise<{
  reportId: string;
  title: string;
  created: boolean;
  htmlBytes: number;
}> {
  const { projectId, title, summary, html } = params;

  if (title.length > REPORT_MAX_TITLE_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Title is ${formatEnglishCount(title.length)} characters; the limit is ${formatEnglishCount(REPORT_MAX_TITLE_CHARS)}. Shorten it and save again.`,
    );
  }
  if (summary.length > REPORT_MAX_SUMMARY_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Summary is ${formatEnglishCount(summary.length)} characters; the limit is ${formatEnglishCount(REPORT_MAX_SUMMARY_CHARS)}. Shorten it and save again.`,
    );
  }
  // UTF-8 bytes, not code units: a `.length` check understates multi-byte
  // content and is what actually reaches the column and the worker's heap.
  const sizeBytes = htmlBytes(html);
  if (sizeBytes > REPORT_MAX_HTML_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Report is ${kbUp(sizeBytes)}; the limit is ${kbDown(REPORT_MAX_HTML_BYTES)}. Inlined images are the usual cause. Remove them and save again.`,
    );
  }
  // The cheap structural check, not an HTML parser: models have stopped
  // mid-document with no error, and update-in-place would silently destroy the
  // previous good report.
  const trimmed = html.trim().toLowerCase();
  if (!trimmed.includes("<html") || !trimmed.endsWith("</html>")) {
    throw new AppError(
      "VALIDATION_ERROR",
      "The HTML has no closing </html>; the model stopped early. On Codex, escape backticks and ${.",
    );
  }

  /*
   * Defence in depth. The report is served under a CSP `sandbox` that blocks
   * all of this, so the header is the real control; refusing it at save time
   * means a one-line regression of the header cannot turn a stored report into
   * script running on the app's origin, and the agent is told why instead of
   * saving something that renders half-broken. Tag context only, so prose
   * that merely mentions a script is not refused.
   */
  const forbidden = findForbiddenMarkup(html);
  if (forbidden) {
    throw new AppError(
      "VALIDATION_ERROR",
      `The HTML contains ${forbidden}, which reports may not use (scripts, event handlers, frames, forms, base or refresh tags are blocked when a report renders). Remove it and save again.`,
    );
  }

  const existing = params.reportId
    ? await ReportRepository.getReport(projectId, params.reportId)
    : null;
  if (params.reportId && !existing) {
    throw new AppError(
      "NOT_FOUND",
      `No report ${params.reportId} in this project. Call list_reports, or omit reportId to create a new one.`,
    );
  }

  // Titles are unique within a project, which the skills state as a contract
  // and which keeps the duplicate pointer below unambiguous. A rename has to
  // clear the same bar as a create.
  const clash = await ReportRepository.findReportByTitle(projectId, title);
  if (clash && clash.id !== existing?.id) {
    throw new AppError(
      "VALIDATION_ERROR",
      // A same-title save without a reportId is almost always an agent that
      // forgot to list first; point it at the id it should have reused.
      `A report titled '${clash.title}' exists (id ${clash.id}). Pass reportId to update it, or change the title.`,
    );
  }

  if (!existing) {
    // Plain read-then-write: concurrent saves can both pass at 99, so a project
    // may briefly hold a few more than the cap. That is accepted — this is a
    // storage guardrail, not an invariant, and the next save refuses.
    const total = await ReportRepository.countReports(projectId);
    if (total >= REPORT_MAX_PER_PROJECT) {
      throw new AppError(
        "VALIDATION_ERROR",
        `This project has ${formatEnglishCount(REPORT_MAX_PER_PROJECT)} reports, the limit. Delete one from the Reports page.`,
      );
    }
  }

  // The workspace-wide ceiling, checked on updates as well as creates: projects
  // are unlimited, so the per-project cap on its own bounds nothing, and an
  // update that grows a report is the other way to add bytes.
  const orgBytes = await ReportRepository.sumReportBytesForOrganization(
    params.organizationId,
  );
  if (
    orgBytes - (existing?.sizeBytes ?? 0) + sizeBytes >
    REPORT_MAX_BYTES_PER_ORG
  ) {
    throw new AppError(
      "VALIDATION_ERROR",
      `This workspace is storing ${mb(orgBytes)} of reports, the limit. Delete reports you no longer need from the Reports page.`,
    );
  }

  if (existing) {
    const updated = await guardTitle(title, () =>
      ReportRepository.updateReportContent({
        reportId: existing.id,
        projectId,
        title,
        summary,
        html,
        // An update that omits the slug keeps the stored one: `skill` is
        // optional on save_report, and clearing it would drop the report out of
        // the list's Type column for no reason the caller asked for.
        // `||`: an empty slug counts as omitted too.
        skill: params.skill || existing.skill,
        // Same rule for the template the report was written from.
        templateId: params.templateId ?? existing.templateId,
        sizeBytes,
      }),
    );
    if (!updated) throw notFound(existing.id);
    return {
      reportId: existing.id,
      title,
      created: false,
      htmlBytes: sizeBytes,
    };
  }

  const id = crypto.randomUUID();
  await guardTitle(title, () =>
    ReportRepository.insertReport({
      id,
      projectId,
      title,
      summary,
      html,
      skill: params.skill || null,
      templateId: params.templateId ?? null,
      createdBy: params.createdBy,
      createdByUserId: params.createdByUserId,
      sizeBytes,
    }),
  );
  return { reportId: id, title, created: true, htmlBytes: sizeBytes };
}

/** Metadata only, newest update first. `remaining` is the room left under the cap. */
async function listReports(params: {
  projectId: string;
  limit: number;
  offset: number;
}): Promise<{
  reports: ReportMetadata[];
  totalCount: number;
  remaining: number;
}> {
  const [rows, totalCount] = await Promise.all([
    ReportRepository.listReports(params),
    ReportRepository.countReports(params.projectId),
  ]);
  return {
    reports: rows,
    totalCount,
    remaining: Math.max(0, REPORT_MAX_PER_PROJECT - totalCount),
  };
}

export async function getReport(
  projectId: string,
  reportId: string,
): Promise<ReportMetadata> {
  const report = await ReportRepository.getReport(projectId, reportId);
  if (!report) throw notFound(reportId);
  return report;
}

/** The only reader of the `html` column, and it reads the metadata with it. */
async function getReportWithHtml(
  projectId: string,
  reportId: string,
): Promise<{ report: ReportMetadata; html: string }> {
  const row = await ReportRepository.getReportWithHtml(projectId, reportId);
  if (!row) throw notFound(reportId);
  const { html, ...report } = row;
  return { report, html };
}

export async function deleteReport(
  projectId: string,
  reportId: string,
): Promise<void> {
  const deleted = await ReportRepository.deleteReport(projectId, reportId);
  if (!deleted) throw notFound(reportId);
}

// The unique (project, title) index is the real guard; the read above only
// gives the friendly pointer. A concurrent save that slipped past it lands
// here, so it gets the same refusal rather than a raw database error.
async function guardTitle<T>(title: string, write: () => Promise<T>) {
  try {
    return await write();
  } catch (error) {
    const message = [error, error instanceof Error ? error.cause : null]
      .map((e) => (e instanceof Error ? e.message : ""))
      .join(" ");
    if (!message.includes("UNIQUE constraint failed")) throw error;
    throw new AppError(
      "VALIDATION_ERROR",
      `A report titled '${title}' exists. Call list_reports and pass its reportId to update it, or change the title.`,
    );
  }
}

// Shared by the reads and the delete, where `reportId` is a required argument —
// so no "omit reportId" hint here; that one belongs to save_report, which has
// its own message above.
function notFound(reportId: string) {
  return new AppError(
    "NOT_FOUND",
    `No report ${reportId} in this project. Call list_reports to see what exists.`,
  );
}

export const ReportService = {
  saveReport,
  listReports,
  getReport,
  getReportWithHtml,
  deleteReport,
} as const;
