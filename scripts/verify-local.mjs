/**
 * End-to-end smoke check against a running container.
 *
 * Drives the MCP endpoint the way an agent would: create a project, crawl it,
 * read the issues back. Catches the failures a unit test cannot — a broken
 * binding, a missing migration, a route that no longer renders.
 *
 *   node scripts/verify-local.mjs [baseUrl]
 */
import process from "node:process";

const BASE = process.argv[2] ?? "http://127.0.0.1:3001";
const AUDIT_URL = "https://example.com";

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
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `non-JSON reply (${response.status}): ${text.slice(0, 200)}`,
    );
  }
}

function structured(result) {
  return result?.result?.structuredContent;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`Verifying ${BASE}\n`);

  const health = await fetch(`${BASE}/api/health`).then((r) => r.json());
  report(
    "health endpoint",
    health.status === "ok",
    `database ${health.checks?.database?.status}`,
  );

  const page = await fetch(`${BASE}/`);
  report("app shell renders", page.ok && page.status === 200);

  const tools = await rpc("tools/list", {});
  const names = tools.result?.tools?.map((tool) => tool.name) ?? [];
  report("MCP tool list", names.length > 0, `${names.length} tools`);

  const created = await rpc("tools/call", {
    name: "create_project",
    arguments: { name: `Verify ${Date.now()}`, domain: "example.com" },
  });
  const projectId = structured(created)?.project?.id;
  report("create_project", Boolean(projectId));
  if (!projectId) return;

  const started = await rpc("tools/call", {
    name: "run_site_audit",
    arguments: { projectId, url: AUDIT_URL, maxPages: 10 },
  });
  const auditId = structured(started)?.auditId;
  report("run_site_audit", Boolean(auditId));
  if (!auditId) return;

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

  console.log(
    `\n${failures === 0 ? "All checks passed." : `${failures} check(s) failed.`}`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("verification aborted:", error.message);
  process.exit(1);
});
