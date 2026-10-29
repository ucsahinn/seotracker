---
title: Agent setup
description: Connect Claude Code, Codex or another MCP client to seowatcher, confirm it with a fresh tool call and install the six SEO skills.
kind: nasil-yapilir
updated: 2026-10-27
---

seowatcher exposes its data to AI assistants over MCP (Model Context Protocol). A connected assistant can read your Search Console, Analytics and audit data, start audits and save reports. It works with Claude Code, Codex, Cursor, ChatGPT and any other client that supports MCP. Anything the assistant reads can be sent to that assistant's provider.

## Connect your agent

1. Open **Agent setup** in the app.
2. Under **Which agent do you use?**, choose **Claude Code**, **Codex** or **Other**. Arrow keys, Home and End move between the options without copying anything.
3. Select **Copy setup command** and paste the command into your agent.

The agent connects seowatcher, installs the SEO skills and walks you through any step you must do by hand. The command contains no token: the agent reads the local token from your computer instead of writing it into the chat.

If you have just installed seowatcher and nothing is configured yet, use **Fresh install** instead. That command has the agent check the install, the Google connection, the PageSpeed key and your first project before it connects itself.

## Confirm the connection

Select **Verify connection**, then ask your agent to call any seowatcher tool. The page checks for a new call every five seconds for up to 60 seconds. A call made before you started verifying does not count. Checking stops if you switch tabs, cancel or a read fails.

If no new call arrives, check your client's MCP status and try again. A timeout does not prove that the connection is broken.

The connected and last-call dates describe past use, not a live session. An assistant's access covers the whole installation, not only the project open in the browser.

## Skills

The **Skills** tab lists the six SEO workflows the setup command installs, such as `seo-audit` and `seo-report`. Call them as `/seo-audit` in Claude Code or `$seo-audit` in Codex. To refresh skills you installed earlier, use **Copy update command**; your connection settings and your own edits stay as they are.

## Manual setup and the token

Use the setup command when you can. For a manual setup, put the token only in your client's local header field: `Authorization: Bearer <token>`. These PowerShell commands copy it to the clipboard without printing it.

Windows package:

`(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker:

`(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

After pasting, clear the clipboard. Never put the token in a chat, terminal output, screenshot or source code. On Windows, **Veri klasörünü aç** (Open data folder) in the tray menu opens the folder that holds the token file.

## If the agent cannot connect

- **401 Unauthorized**: the client is not sending the `Authorization` header, or the token is wrong.
- **Connection refused**: seowatcher is not running, or the client points to the wrong address or port.

After fixing either one, reconnect MCP in your client and verify with a new tool call. See [Troubleshooting](/docs/sorun-giderme/) for more detail.
