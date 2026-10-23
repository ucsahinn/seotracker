---
title: Agent setup
description: Connect Claude Code, Codex or Cursor to the app. The address, the password, the 33 tools and 6 ready-made task templates, and which ones use up Google quota.
kind: nasil-yapilir
updated: 2026-10-22
---

This guide connects your AI assistant to the app and runs its first command. Once connected, you can say "audit the site and write a report". The assistant reads Search Console data, runs the audit and saves the report in the **Raporlar** (Reports) screen. This connection is called an assistant connection (MCP); it lets the assistant call the app's tools (for example list_projects). Connecting is optional, and the app is complete without it.

## What you need

- A running app and a project connected to Search Console.
- One of Claude Code, Codex, Cursor, VS Code Copilot or Gemini CLI. The app gives ready-made setup text for the first three.
- The **Ajan kurulumu** (Agent setup) screen in the app. It is in the left menu, under **Ajan** (Agent).

## Steps

1. Open the **Ajan kurulumu** (Agent setup) screen. The badge at the top says **Henüz bağlanmadı** (Not connected yet) or **Bağlandı** (Connected). If connected, it also shows text like "Claude Code, last call 2 min ago". Below it you see the connection address and a copy button: `http://127.0.0.1:3001/mcp` (`localhost` on Docker).
2. Find the password. The app protects the connection against unauthorized calls with a password, which is not shown on screen. In the Windows package, the password is in the `mcp-token` file in the data folder. From the taskbar menu, choose **Veri klasörünü aç** (Open data folder). On Docker, run this command: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (in Git Bash, put `MSYS_NO_PATHCONV=1` in front).
3. Follow the section for your assistant.

### Claude Code

In the terminal (the command window), run the following. Replace `<parola>` with your own password:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Then type `/mcp` inside Claude Code and choose **Reconnect**. Call the ready-made task templates with a slash, for example `/seo-audit`.

### Codex

Run this command:

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Then put the password in an environment variable (a setting your computer remembers) named `SEOTRACKER_MCP_AUTH`. On Windows, with PowerShell: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Call the templates like `$seo-audit`.

### Cursor

Write this in the `.cursor/mcp.json` file in your project:

```json
{
  "mcpServers": {
    "seotracker": {
      "url": "http://127.0.0.1:3001/mcp",
      "headers": { "Authorization": "Bearer ${env:SEOTRACKER_MCP_AUTH}" }
    }
  }
}
```

Set the environment variable the same way as for Codex. This setup has not been tried on a Cursor installation yet. If your Cursor version asks for a different field, check Cursor's documentation.

### Ready-made setup text

This is the easier route. First, copy the text:

1. Press the **Ajan kurulum istemini kopyala** (Copy agent setup prompt) button on the screen. There is a separate button for Codex.
2. Paste the text into your assistant. The assistant sets up the connection, tests it with "whoami" and "list_projects", and installs the templates.

The **Kurulum istemi (sıfırdan kurulum)** (Setup prompt, full setup) has the assistant do the whole setup for you, from getting the app running to the Google connection. It knows both the Windows package and the Docker setup.

### Installing the ready-made task templates

The **Beceriler** (Skills) tab describes the six ready-made task templates. Tell the assistant "install the seotracker skills". The setup text knows where to copy them. To update, press the **Güncelleme istemini kopyala** (Copy update prompt) button.

## Tools

There are 33 tools in total. The "Writes" column shows the tools that change data in the app. The "Quota" column shows the tools that use up Google's daily allowance. Do not let the assistant call a tool that writes without your approval. Well-built templates ask you first, but the app does not.

| Tool                                         | What it does                                                                                       | Writes | Quota                             |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------ | --------------------------------- |
| `whoami`                                     | Tells you which installation and user you are.                                                     |        |                                   |
| `get_diagnostics`                            | Gives the version, the setup checks, table counts, the last 25 audits and the quota counters.      |        |                                   |
| `list_projects`                              | Lists your projects. Every tool asks for a project number.                                         |        |                                   |
| `create_project`                             | Creates a new project.                                                                             | Yes    |                                   |
| `get_project_context`                        | Reads the Proje bilgisi (Project info) screen.                                                     |        |                                   |
| `update_project_context`                     | Changes the project info and adds a note to the research log.                                      | Yes    |                                   |
| `get_search_console_performance`             | Gives clicks, impressions, rate and position by query, page, country, device or date.              |        |                                   |
| `get_search_opportunities`                   | Builds a list of opportunities from Search Console and Analytics.                                  |        |                                   |
| `get_cannibalization`                        | Shows pages that compete with each other for the same search.                                      |        |                                   |
| `get_ranking_history`                        | Gives the ranking archive on your computer. It also keeps data older than Google's 16-month limit. |        |                                   |
| `get_index_coverage`                         | Gives the Google index answers saved earlier. It does not ask Google.                              |        |                                   |
| `inspect_urls`                               | Asks Google for the status of pages, 10 addresses per call.                                        | Yes    | 2,000 per day, per property       |
| `get_sitemaps`                               | Shows the sitemap status in Search Console.                                                        |        |                                   |
| `run_site_audit`                             | Starts the site audit.                                                                             | Yes    | PageSpeed, if speed testing is on |
| `get_audit_status`                           | Says which stage the audit is at. It can mark a stuck audit as failed.                             |        |                                   |
| `get_audit_issues`                           | Gives the problems found, with steps to fix them.                                                  |        |                                   |
| `get_audit_pages`                            | Lists the pages that were crawled.                                                                 |        |                                   |
| `get_google_analytics_organic_overview`      | Gives a summary of visits from search and the previous period.                                     |        |                                   |
| `get_google_analytics_organic_landing_pages` | Lists the first pages that visitors from search land on.                                           |        |                                   |
| `get_google_analytics_page_performance`      | Gives page views and engagement for pages.                                                         |        |                                   |
| `get_google_analytics_traffic_acquisition`   | Gives the split of visitors by channel, source and campaign.                                       |        |                                   |
| `get_google_analytics_key_events`            | Gives the events marked as key in Analytics.                                                       |        |                                   |
| `get_google_analytics_ecommerce_performance` | Gives product sales.                                                                               |        |                                   |
| `get_google_analytics_site_search`           | Gives the terms visitors typed into your site's search box.                                        |        |                                   |
| `get_google_analytics_audience_breakdown`    | Splits visitors by device, country, and new or returning.                                          |        |                                   |
| `get_google_analytics_measurement_health`    | Checks the measurement setup. It does not use report quota.                                        |        |                                   |
| `list_saved_keywords`                        | Lists the keywords you saved.                                                                      |        |                                   |
| `save_keywords`                              | Saves keywords.                                                                                    | Yes    |                                   |
| `list_reports`                               | Lists your reports.                                                                                |        |                                   |
| `get_report`                                 | Reads a report. It can also give the HTML version if you ask.                                      |        |                                   |
| `save_report`                                | Saves a report or updates an existing one.                                                         | Yes    |                                   |
| `list_report_templates`                      | Reads the report templates.                                                                        |        |                                   |
| `save_report_template`                       | Saves a report template.                                                                           | Yes    |                                   |

The Analytics tools use Google's Analytics report allowance (200,000 units a day on a standard property). You can follow this allowance in the app, in the Sınırlar (Limits) section of the **Ayarlar** (Settings) screen.

## Ready-made task templates (skills)

| Template            | When to use it                                                                                                                        | What it produces                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `seo-coach`         | When you ask "what should I do". It explains the road ahead and suggests the next step.                                               | A chat, and a coaching note if needed               |
| `seo-project-setup` | In a new project. It asks about your business, goal, competitors and key pages, and fills in the Proje bilgisi (Project info) screen. | Filled-in project info, saved keywords              |
| `seo-audit`         | When you say "audit the site". It runs the audit, combines it with Search Console and picks "the one thing to do this week".          | A one-page audit report                             |
| `seo-triage`        | When visits drop. It checks whether the drop is real, and where and when it happened.                                                 | A drop review report                                |
| `seo-check-in`      | Once a month. It compares this period with the previous one.                                                                          | A monthly check-in report; one builds up each month |
| `seo-report`        | After the other templates finish. It writes and saves a single-file HTML report.                                                      | A report in the **Raporlar** (Reports) screen       |

## Check

- Tell the assistant "call the whoami tool". It should tell you the installation ID.
- The badge on the **Ajan kurulumu** (Agent setup) screen should say **Bağlandı** (Connected), and the time of the last call should show.
- "list_projects" should list your projects.

## Frequently asked questions

**Does the assistant send my data outside?** Your data goes to whichever model the assistant uses. That depends on the assistant's own privacy terms. The app itself only answers connections on your computer.

**Does it work without a password?** On Docker it works with `MCP_TOKEN=off`. In the Windows package the password is always on. On a connection without a password, any program on the same computer can call the 33 tools.

**Can the assistant use up my Google allowance?** `inspect_urls` and `run_site_audit` use it. The templates ask about at most 20 addresses per task. They start an audit only when you ask. Set the same limit for any other assistant.

**Which assistant is better?** It makes no difference; the tools are the same. The setup text is ready for Claude Code, Codex and Cursor. Other assistants work with the same address and password if they support MCP.

## If something goes wrong

- **The assistant gets a 401 error.** The password is wrong or is not being sent. Copy the value from the file again. Make sure no line break is left at the end.
- **The connection is refused.** The app is not running. Check the taskbar icon, or the output of `docker compose ps`.
- **The assistant says "tool not found".** Reload the connection. In Claude Code, type `/mcp` and choose **Reconnect**.
- **The templates do not show up.** Paste the setup text again. The templates are copied into the assistant's own folder (`$HOME/.agents/skills` in Codex).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (33 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
