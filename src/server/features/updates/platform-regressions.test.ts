import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { z } from "zod";

const workflowSchema = z.object({
  on: z.record(z.string(), z.unknown()),
  concurrency: z.object({ group: z.string() }),
  jobs: z.record(
    z.string(),
    z.object({
      needs: z.union([z.string(), z.array(z.string())]).optional(),
      uses: z.string().optional(),
      steps: z
        .array(
          z.object({
            name: z.string(),
            run: z.string().optional(),
            with: z.object({ ref: z.string().optional() }).optional(),
          }),
        )
        .default([]),
    }),
  ),
});
const workflow = workflowSchema.parse(
  parse(readFileSync(".github/workflows/release-windows.yml", "utf8")),
);
const ci = workflowSchema.parse(
  parse(readFileSync(".github/workflows/ci.yml", "utf8")),
);
const build = readFileSync("packaging/windows/build.ps1", "utf8");

function powershell(script: string) {
  const result = spawnSync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", script],
    {
      encoding: "utf8",
      timeout: 10000,
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  return result;
}

describe.skipIf(process.platform !== "win32")(
  "Windows publication boundaries",
  () => {
    it.each(["create", "upload", "edit"])(
      "guards bug 2: failed release %s aborts publication",
      (failure) => {
        const attach = workflow.jobs.release.steps.find(
          (step) => step.name === "Attach to release",
        );
        if (!attach?.run) throw new Error("Missing publication command block");
        const commands = attach.run.slice(
          attach.run.indexOf("$current = gh api"),
        );
        const result = powershell(`
        $ErrorActionPreference = 'Stop'
        $script:calls = @()
        function gh {
          $script:calls += ($args -join ' ')
          $global:LASTEXITCODE = 0
          if ($args[0] -eq 'api') { return 'v0.8.0' }
          if ($args[1] -eq 'view') { $global:LASTEXITCODE = ${failure === "edit" ? 0 : 1}; return }
          if ($args[1] -eq '${failure}') { $global:LASTEXITCODE = 1 }
        }
        function node { $global:LASTEXITCODE = 0; return 'true' }
        function Test-Path { param($LiteralPath, $PathType) return $true }
        function Get-Item { param($LiteralPath) return [pscustomobject]@{ Length = 1 } }
        $tag = 'v0.8.1'; $version = '0.8.1'; $releaseTitle = 'v0.8.1'; $notesFile = 'notes.md'
        $file = [pscustomobject]@{ FullName = 'setup.exe'; DirectoryName = '.' }
        $stable = 'stable.exe'
        $failed = $false
        try { & { ${commands} } } catch { $failed = $true }
        [pscustomobject]@{ failed = $failed; calls = @($script:calls) } | ConvertTo-Json -Compress
      `);
        expect(result.status, result.stderr).toBe(0);
        const observed = z
          .object({ failed: z.boolean(), calls: z.array(z.string()) })
          .parse(JSON.parse(result.stdout));
        expect(
          observed.calls.some((call: string) =>
            call.startsWith(`release ${failure} `),
          ),
        ).toBe(true);
        expect(observed.failed).toBe(true);
        expect(
          observed.calls.some((call: string) => call.includes("--draft=false")),
        ).toBe(false);
        if (failure === "create")
          expect(
            observed.calls.some((call: string) =>
              call.startsWith("release upload"),
            ),
          ).toBe(false);
      },
    );

    it.each(["-Version 9.9.9", "-SkipAppBuild"])(
      "guards bug 4: %s fails before any build or staging side effect",
      (args) => {
        // Execute only the real entry point's preflight; never run packaging collaborators.
        const preflight = build.slice(
          0,
          build.indexOf("# 1. Application build"),
        );
        const result = powershell(`
        $scriptText = '${preflight.replaceAll("'", "''")}'
        # The real path is needed by the preflight to find package.json.
        $scriptText = $scriptText.Replace('$MyInvocation.MyCommand.Path', "'${process.cwd().replaceAll("'", "''")}\\packaging\\windows\\build.ps1'")
        try { & ([scriptblock]::Create($scriptText)) ${args}; exit 0 } catch { Write-Output $_.Exception.Message; exit 1 }
      `);
        expect(result.status).toBe(1);
        expect(result.stdout).toMatch(
          args.includes("Version")
            ? /does not match package.json/
            : /SkipAppBuild.*unsupported/,
        );
      },
    );
  },
);

it("guards bug 3: only successful quality checks on this tag SHA unlock publication", () => {
  const needs = [workflow.jobs.release.needs ?? []].flat();
  const canPublish = (quality: string, qualitySha: string) => {
    const states: Record<string, string> = {
      package: "success",
      quality: qualitySha === "tag-sha" ? quality : "skipped",
    };
    return needs.every((job) => states[job] === "success");
  };
  expect(canPublish("failure", "tag-sha")).toBe(false);
  expect(canPublish("success", "other-sha")).toBe(false);
  expect(canPublish("success", "tag-sha")).toBe(true);
  expect(workflow.jobs.quality.uses).toBe("./.github/workflows/ci.yml");
  expect(ci.concurrency.group).toContain("github.workflow");
  expect(ci.on).toHaveProperty("workflow_call");
  const steps = ci.jobs.ci.steps;
  expect(steps.find((step) => step.name === "Checkout")?.with?.ref).toBe(
    "${{ github.event.pull_request.head.sha || github.sha }}",
  );
  expect(steps.map((step: { run?: string }) => step.run)).toEqual(
    expect.arrayContaining(["pnpm run ci:check", "pnpm run test:ci"]),
  );
});
