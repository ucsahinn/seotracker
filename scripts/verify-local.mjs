/**
 * End-to-end smoke check against a running container.
 *
 * Drives the MCP endpoint the way an agent would: create a project, crawl it,
 * read the issues back. Catches the failures a unit test cannot — a broken
 * binding, a missing migration, a route that no longer renders.
 *
 *   node scripts/verify-local.mjs [baseUrl]
 *
 * When the endpoint needs a token, export it as SEOTRACKER_MCP_AUTH first (the
 * same variable the setup docs use). It is sent as a Bearer header and never
 * printed.
 */
import process from "node:process";

const BASE = process.argv[2] ?? "http://127.0.0.1:3001";
/** Fixed, so repeated runs reuse one project instead of adding another. */
const VERIFY_PROJECT_NAME = "seotracker verify";
const AUDIT_URL = "https://example.com";

const TOKEN = process.env.SEOTRACKER_MCP_AUTH?.trim() ?? "";

let failures = 0;

function report(name, ok, detail = "") {
  console.log(
    `${ok ? "  ok  " : " FAIL "} ${name}${detail ? ` — ${detail}` : ""}`,
  );
  if (!ok) failures += 1;
}

async function rpc(method, params) {
  const response = await fetch(`${BASE}/mcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
  });
  const text = await response.text();
  if (response.status === 401) {
    throw new Error(
      "MCP endpoint answered 401: export the token as SEOTRACKER_MCP_AUTH " +
        "(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).",
    );
  }
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(
      `non-JSON reply (${response.status}): ${text.slice(0, 200)}`,
    );
  }
  if (!response.ok) {
    throw new Error(`${method} failed with HTTP ${response.status}`);
  }
  if (body?.error) {
    throw new Error(
      `${method} RPC error: ${body.error.message ?? "unknown error"}`,
    );
  }
  return body;
}

function structured(result) {
  // A tool-level failure (isError) carries no structured data to trust.
  if (result?.result?.isError) return undefined;
  return result?.result?.structuredContent;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`Verifying ${BASE}\n`);

  const healthResponse = await fetch(`${BASE}/api/health`);
  const health = await healthResponse.json();
  report(
    "health endpoint",
    healthResponse.ok && health.status === "ok",
    `database ${health.checks?.database?.status}`,
  );

  const page = await fetch(`${BASE}/`);
  report("app shell renders", page.ok && page.status === 200);

  const tools = await rpc("tools/list", {});
  const names = tools.result?.tools?.map((tool) => tool.name) ?? [];
  report("MCP tool list", names.length > 0, `${names.length} tools`);

  /*
   * One project, reused.
   *
   * This used to be `Verify ${Date.now()}`, so every run of the check the
   * README tells operators to run left another project behind — and nothing
   * on the MCP surface can archive one, so the debris was permanent and
   * grew. Reusing a fixed name leaves exactly one, whatever anyone runs.
   */
  const existing = await rpc("tools/call", {
    name: "list_projects",
    arguments: {},
  });
  const reusable = structured(existing)?.projects?.find(
    (project) => project.name === VERIFY_PROJECT_NAME,
  );

  let projectId = reusable?.id ?? null;
  if (projectId) {
    report("create_project", true, "reused the existing verify project");
  } else {
    const created = await rpc("tools/call", {
      name: "create_project",
      arguments: { name: VERIFY_PROJECT_NAME, domain: "example.com" },
    });
    projectId = structured(created)?.project?.id ?? null;
    report("create_project", Boolean(projectId));
  }
  if (!projectId) return finish();

  const started = await rpc("tools/call", {
    name: "run_site_audit",
    arguments: { projectId, url: AUDIT_URL, maxPages: 10 },
  });
  const auditId = structured(started)?.auditId;
  report("run_site_audit", Boolean(auditId));
  if (!auditId) return finish();

  let status = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const poll = await rpc("tools/call", {
      name: "get_audit_status",
      arguments: { projectId, auditId },
    });
    status = structured(poll)?.status;
    if (status?.status && status.status !== "running") break;
    await sleep(5000);
  }
  report(
    "audit completes",
    status?.status === "completed",
    `${status?.pagesCrawled} page(s) crawled`,
  );

  const issues = await rpc("tools/call", {
    name: "get_audit_issues",
    arguments: { projectId, auditId },
  });
  const groups = structured(issues)?.issues ?? [];
  report(
    "issues reported",
    groups.length > 0,
    `${groups.length} issue type(s)`,
  );

  // The catch-up is the point of the archive: it must answer even with no
  // Search Console connected, rather than throwing.
  const history = await rpc("tools/call", {
    name: "list_projects",
    arguments: {},
  });
  report("list_projects", Array.isArray(structured(history)?.projects));

  return finish();
}

/** The one exit point: a failed or incomplete run never exits 0. */
function finish() {
  console.log(
    `\n${failures === 0 ? "All checks passed." : `${failures} check(s) failed.`}`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("verification aborted:", error.message);
  process.exit(1);
});
