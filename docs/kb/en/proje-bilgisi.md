---
title: Project info
description: Write what the app cannot know about your site: the business, the goal, competitors, key pages. Your assistant reads it before it starts work.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

This screen lets you tell your assistant about your site once, so you never repeat it.

The **Project context** screen is where you write what Google does not know: what you sell, your current goal, who your competitors are, which pages earn money and how you want things written. You or your AI assistant (the screen says "ajan", agent) can fill it in. The assistant reads it before it starts work and records what it learns here. If something is wrong, fix it yourself. It is useful even without an assistant: six months from now, the answer to "why did we focus on this page" is here.

## What is on the screen

**Four main sections.** **Business overview**, **Current goal**, **Positioning** (how you describe yourself in the market) and **Writing preferences**. Each is free text of at most 4,000 characters. Under each section you see who last updated it and when.

**Custom sections.** For topics that do not fit the four sections, add your own heading. There can be at most 20 custom sections, and a heading is at most 120 characters.

**Competitors.** The domain name is required; a name and a note are optional. You can add at most 100 competitors, and a note is at most 500 characters. The app does not pull the competitor's data. The list is a memory aid for you and your assistant.

**Key pages.** For each page you enter the address, role, topic and note. The roles are:

- **Hub page**: the entry page of a topic.
- **Supporting page**: a page that supports the hub page.
- **Conversion page**: a page that earns money or has a form.
- **Other**.

You can add at most 100 pages. Addresses are changed to start with https.

**Research log.** Dated notes the assistant leaves about what it researched and what it found. Only the assistant writes them, each note is at most 1,000 characters, and you can delete them. Notes are removed automatically after 90 days. The screen shows the newest 20.

**Agent card.** It offers two ready-made texts: "Let your agent fill it in" and "Have your agent review it". Copy it with **Copy prompt** and paste it into your assistant. In an empty project, the first text has the assistant ask you a few questions and fill in the sections.

## How to use it

1. Right after opening the project, write three to five sentences in **Business overview**: what you sell, who you sell it to, the languages of your site and your conversion page. Every report from the assistant builds on this paragraph.
2. State **Current goal** in concrete terms. Not "traffic" but "product pages getting into the index (Google's list of pages)" or "five requests a month from the demo form". The assistant prioritizes its suggestions accordingly.
3. In **Key pages**, add the conversion pages first, then the hub pages. This tells the assistant which work to put first.
4. In **Writing preferences**, write the words not to use and the tone. Examples: "do not say industry leader", "use the 'you' form", "give the version number". The assistant's reports follow these rules.
5. If you use an assistant, copy the **Let your agent fill it in** text into your assistant on the first day. The assistant fills in the sections by talking with you. Once a month, read the research log and fix what is wrong.

## How the numbers are calculated

This screen has no calculated numbers, only limits, which are listed above.

The assistant can make at most 50 changes at a time. Each change is saved immediately, without asking for approval, so tell your assistant "ask me before you write". Well-built assistant skills already do.

A key page address is at most 2,048 characters. A competitor domain name is at most 255 characters, and a name is at most 120. The app sets the date of each log note; the assistant cannot invent one.

## Frequently asked questions

**The assistant wrote something wrong. What should I do?** Open the section and fix it. The last updater becomes "you" ("siz"). The assistant sees your version the next time it reads.

**I added a competitor, but no data came.** None will. The app does not pull competitor data. The list only tells the assistant what to look at when it searches the web.

**A note in the log disappeared.** Notes older than 90 days are deleted. Move lasting information into the sections. The log is a temporary notebook.

**Does this information go to Google?** No. This information is stored on this computer. Only the assistant you connected reads it.

## Limits

The screen is free text and does not check consistency. If you write something contradictory, the assistant may not notice. Competitors and key pages are a reminder list, not a tracking tool. Only the assistant writes the research log. Write your own notes in the sections.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
