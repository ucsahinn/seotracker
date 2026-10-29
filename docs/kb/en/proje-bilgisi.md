---
title: Project context
description: Write down what the business sells, its goal and its key pages, so you and a connected assistant work from the same notes.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Project context is a set of notes about one project. The app stores them locally and does not verify them. A connected assistant can read and edit them through MCP, but only if it chooses to call the project context tool.

## Sections and limits

The four main sections are **Business overview**, **Current goal**, **Positioning** and **Writing preferences**. Each holds up to 4,000 characters and shows who last edited it and when. The top of the page shows which main sections are filled and the stored goal. **Fill the first empty section** or **Go to section** takes you to a section. **Save changes** saves only the main sections you changed.

**Competitors** and **Key pages** are optional lists you curate yourself. They do not measure rankings or conversions.

| List            | Entries | Field limits                               |
| --------------- | ------- | ------------------------------------------ |
| Competitors     | 100     | Domain 255, name 120, notes 500 characters |
| Key pages       | 100     | URL 2,048, topic 200, notes 500 characters |
| Custom sections | 20      | Title 120, body 4,000 characters           |

A key page's role is a label for your own use. Custom sections are created by an assistant; you can edit or remove them.

## Working with an assistant

**Draft with an agent** gives you a prompt to copy. It asks the assistant to request your approval before saving. The approval is part of the prompt only: the app's tools write as soon as they are called. The prompt becomes available once the project's identity has loaded.

If a section changes elsewhere while you are editing it, for example because an assistant saved it, the app rejects your whole save and keeps your draft. It then shows the text from when you started editing, the latest saved text and your draft. Merge them and save again. Assistants get the same protection by sending `expectedContent` with their write; older clients that omit it still work.

## Research log

The **Research log** shows the newest 20 entries from the last 90 days. Each entry holds up to 1,000 characters and is dated by the server's UTC day. Older entries drop out of the view even if nothing new is written, and a notice tells you when more entries exist in the window. The log is a recent-activity view, not a complete history.

## Source and setup

**Source and setup** counts six shared configuration signals for the project. It reports a missing signal and an unreadable one separately and ignores the optional lists. It is not an SEO score. A saved connection does not prove that Google data can be read, a saved PageSpeed key does not guarantee quota, and a recorded tool call by an assistant does not prove that it read this project.

**Refresh** reads the notes and setup again. If a background read fails, the screen keeps the stored information and your drafts and shows a warning. If you try to leave with unsaved changes, the app asks you to confirm.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
