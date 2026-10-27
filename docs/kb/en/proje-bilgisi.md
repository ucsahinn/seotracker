---
title: Project info
description: Project info stores local notes that you and a connected assistant can use. Filled text is not verified, and not every assistant necessarily reads it.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Project info stores local notes that you and a connected assistant can use. Filled text is not verified, and not every assistant necessarily reads it.

## Start with the goal

The lead shows filled main sections and the stored goal. Open the first empty section or use **Go to section**. Business overview, current goal, positioning and writing preferences each allow 4,000 characters. Each section shows its last author and absolute update time. **Save changes** saves changed main sections only.

Competitors and key pages are optional curated lists, not ranking or conversion measurements. Each allows 100 entries. Competitor domain/name/notes limits are 255/120/500 characters. Page URL/topic/notes limits are 2,048/200/500. Roles are your labels. Assistants create custom sections; you can edit or remove them. Limits: 20 custom sections, 120 characters per title and 4,000 per body.

## Save and refresh

Refresh reads notes and setup again. A failed background read retains stored information and drafts with a warning. Leaving with unsaved main or inline changes triggers a warning. The server does not yet prevent simultaneous edits of the same section from overwriting each other; compare the latest text before saving when editing with an assistant.

Under **Prepare a draft with an agent**, the prompt asks the assistant to request approval before saving. The application tools can write immediately without another approval gate. The prompt is unavailable until project identity is resolved.

**Research log** shows at most the newest 20 entries. Dates use the server's UTC day; entries allow 1,000 characters. Cleanup of records older than 90 days runs when a new entry is appended, so older notes can remain without new writes. This is not a complete history.

**Sources and setup** counts six shared configuration signals. Missing and unreadable states are separate; optional lists are excluded. A stored connection is not a live data test, a PageSpeed key does not guarantee quota, and an installation-level tool call does not prove this project was read. This is not an SEO score.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
