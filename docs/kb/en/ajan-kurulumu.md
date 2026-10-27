---
title: Agent setup
description: Connect an agent safely, verify a new tool call and use SEO skills.
kind: nasil-yapilir
updated: 2026-10-27
---

## Connect your agent

Open Agent setup in the running application. Choose Claude Code, Codex or Other and copy the setup prompt. Arrow keys, Home and End select the client without copying. The prompt contains no actual token; the agent uses the local installation secret. From-scratch installation is a separate option.

## Verify a new call

Select Verify connection and ask the agent to call a seowatcher tool. The page checks the local call record every five seconds for at most 60 seconds. A historical call cannot verify a new setup. Polling stops on a hidden tab, read error or cancellation. If no new call appears, inspect your client's MCP status and try again; this is not proof the connection failed.

Connected and last-call dates describe historical use, not a continuously online session. Retry an unreadable status. Tool access covers the installation, rather than only the project open in the browser.

## Protect the token

Prefer the setup prompt. For manual setup, use only your client's local secret header field: `Authorization: Bearer <token>`. Windows PowerShell can copy without displaying:

`(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

For Docker in PowerShell:

`(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Paste into the local secret field and clear the clipboard. Never paste the token into chat, terminal output, screenshots or source code. The Windows tray's Open data folder action locates the token file.

## Skills and recovery

The Skills tab lists SEO workflows. The setup prompt installs them; copy the update prompt to refresh an existing installation. Use /seo-audit in Claude Code or $seo-audit in Codex. For 401, check that the client sends its local authorization header. For refused connections, check the running application and endpoint. Refresh MCP status in the client and verify a new tool call.
