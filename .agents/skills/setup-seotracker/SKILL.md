---
name: setup-seotracker
description: Connect seotracker to the current AI agent. Use when a user pastes the seotracker connection prompt or asks to connect its MCP server and SEO skills.
metadata:
  internal: true
---

Connect seotracker to this agent. Do what you can; guide me through anything that needs my input.

## 1. Check this agent

- Identify this agent and its version. Ask only if you cannot tell.
- Check for an existing seotracker connection. Preserve other integrations and avoid duplicates.

## 2. Add the MCP server

seotracker runs on my own machine and answers only to me, so there is no sign-in
and no token to paste.

- Add `http://localhost:3001/mcp` as an HTTP MCP server, using this agent's own documented command or config file.
- Claude Code, for example: `claude mcp add --transport http --scope user seotracker http://localhost:3001/mcp`
- Check the installed client's help before running commands.
- If I am reaching the instance through a tunnel or reverse proxy, use that hostname instead of localhost.

## 3. Install the SEO skills

The repository carries its skills under `.agents/skills/`. Install only the
public ones for this agent: `seo-audit`, `seo-project-setup`, `seo-coach`,
`seo-report`.

- Use this agent's own skill install flow. Do not copy the internal skills (`setup-seotracker`, `verify-local-mcp`, `papercuts`).
- If skills are unsupported here, use the MCP tools alone.

## 4. Reload and verify

- Use this agent's native reload flow, checking its installed version, help, or official documentation. Prefer automatic discovery or an in-place reload; restart only if required to load the new tools and skills.
- Once tools load in this session, run whoami and list_projects. Check skill discovery too. If a reload needs my action, give the instructions rather than repeatedly retrying unavailable tools.
- Track installation and verification separately. A connected server is not proof that this session can use its tools. Never claim verification before those two reads succeed.
- Do not create projects during installation.

## 5. Finish with a short handoff

Keep progress updates brief. The final reply must be **140 words or fewer** and follow this template:

**Status**
[Briefly say what succeeded or what blocked setup.]

**Next**
1. `[Give the native reload command or UI action for this agent, only if needed.]` Then say "Check that seotracker is connected."
2. Try one of these:
   - `[SEO Audit invocation]` **(recommended)** — find your website's biggest technical SEO issues.
   - `[SEO Project Setup invocation]` — interview you about your website and set up its project context.
   - `[SEO Coach invocation]` — explain what to work on next.

Want to know what was set up? Just ask.

Adapt the template to the actual result:
- If installation failed, name the blocker and replace reload with the fix.
- Recommend this agent's idiomatic way to invoke each installed skill: its native command, mention, picker, or natural-language request. Use the discovered skill name; do not assume `/skill-name` works everywhere or create aliases to force it. Check the agent's help or official documentation when unsure. If skills are unsupported, give equivalent plain-language requests using the connected tools. Recommend workflows; do not run them during installation.
- Keep tool names such as whoami and list_projects in your checks, not the final reply. Omit versions, paths, connection details, skill counts, other integrations, and cleanup commands unless they explain the blocker or I ask. Do not add more sections or a verification checklist.
