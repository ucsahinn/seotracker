import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, test } from "vitest";

// Exercise the real embedded preflight without installing files or contacting nginx.
const updater = readFileSync(
  new URL("../packaging/site/update-seowatcher-site.sh", import.meta.url),
  "utf8",
).replaceAll("\r\n", "\n");
const preflight = updater.split("<<'NGINX'\n")[1].split("\nNGINX")[0];
const include = "include /etc/nginx/snippets/seowatcher-redirects.conf;";
const server = (body: string) =>
  `server { listen 443 ssl; server_name seowatcher.io; ${body} }`;

test.each([
  server("# " + include + "\n"),
  server("") +
    `server { listen 443 ssl; server_name other.example; ${include} }`,
  `server { listen 80; server_name seowatcher.io; ${include} }` + server(""),
  server(`location / { ${include} }`),
  server(include + include),
  server(include) + server(""),
])(
  "updater refuses an absent, misplaced or duplicate HTTPS include: %s",
  (config) => {
    const directory = mkdtempSync(path.join(tmpdir(), "site-updater-"));
    try {
      const file = path.join(directory, "nginx.conf");
      writeFileSync(file, config);
      const result = spawnSync(
        process.platform === "win32" ? "python" : "python3",
        ["-c", preflight, file],
        { encoding: "utf8", timeout: 10000 },
      );
      expect(result.error).toBeUndefined();
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("STOP:");
      expect(result.stderr).toContain(include);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  },
);

test("updater accepts a direct include in each active apex HTTPS server block", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "site-updater-"));
  try {
    const file = path.join(directory, "nginx.conf");
    writeFileSync(
      file,
      `# configuration file /etc/nginx/sites-enabled/seowatcher.io.conf:\n` +
        server(include) +
        `server { listen [::]:443 ssl; server_name www.seowatcher.io seowatcher.io; ${include} location / { try_files $uri $uri/ =404; } }`,
    );
    const result = spawnSync(
      process.platform === "win32" ? "python" : "python3",
      ["-c", preflight, file],
      { encoding: "utf8", timeout: 10000 },
    );
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("2 server block(s)");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test.each([false, true])(
  "updater restores the prior snippet state after failure (existing: %s)",
  (existing) => {
    const directory = mkdtempSync(path.join(tmpdir(), "site-rollback-"));
    const snippet = path.join(directory, "redirects.conf");
    const rollback = updater.slice(
      updater.indexOf("switched=0\n"),
      updater.indexOf("\nnginx -T >"),
    );
    try {
      if (existing) writeFileSync(snippet, "previous redirects\n");
      const quote = (value: string) =>
        "'" + value.replaceAll("\\", "/").replaceAll("'", "'\\''") + "'";
      const result = spawnSync("bash", ["-s"], {
        input: `set -Eeuo pipefail\nstage=${quote(directory)}\nbase=${quote(directory)}\nold_target=previous-release\nsnippet=${quote(snippet)}\n${rollback}\nprintf 'new redirects' > "$snippet"\nsnippet_changed=1\nfalse\n`,
        encoding: "utf8",
        timeout: 10000,
      });
      expect(result.error).toBeUndefined();
      expect(result.status, result.stderr).toBe(1);
      expect(result.stderr).toContain("Update stopped (exit 1)");
      if (existing)
        expect(readFileSync(snippet, "utf8")).toBe("previous redirects\n");
      else expect(() => readFileSync(snippet)).toThrow();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  },
);
