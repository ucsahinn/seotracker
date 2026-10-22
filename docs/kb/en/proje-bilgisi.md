---
title: Project info
description: The place where you write what is not written anywhere else about your site: a summary of the business, the goal, competitors, key pages. Your assistant reads it before starting work.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

On this page you learn how to tell your assistant about your site once, and not tell it again.

The **Proje bilgisi** (Project info) screen is where you write the things Google does not know. You write what you sell, what you are aiming for now, who your competitor is, which pages earn money and how you want things written. You or your AI assistant (the screen says "ajan", agent) fill in the screen. The assistant reads it before it starts work and writes what it learns here. If you see something wrong, fix it yourself. It is useful even if you do not use an assistant. Six months from now, the answer to "why did we focus on this page" is here.

## What is on the screen

**Four main sections.** **İşin özeti** (Summary of the business), **Şu anki hedef** (Current goal), **Konumlandırma** (Positioning) (how you describe yourself in the market) and **Yazım tercihleri** (Writing preferences). Each is free text, at most 4,000 characters. Under it, it says who updated it and when.

**Custom sections.** For topics that do not fit the four sections, you open your own heading. There can be at most 20 custom sections, and a heading is at most 120 characters.

**Competitors.** The domain name is required. Writing a name and a note is optional. You can add at most 100 competitors, and a note is at most 500 characters. The app does not pull the competitor's data. The list is for you and your assistant to remember.

**Key pages.** You write the address, role, topic and note. The roles are:

- **Merkez sayfa** (Hub page): the entry page of a topic.
- **Destek sayfası** (Support page): a sub-page that feeds the hub page.
- **Dönüşüm sayfası** (Conversion page): a page that earns money or has a form.
- **Diğer** (Other).

You can add at most 100 pages. Addresses are corrected to start with https.

**Research log.** These are dated notes that the assistant leaves, saying "I researched this, and this came out". Only the assistant writes them, and each note is at most 1,000 characters. You can delete them. Notes are deleted by themselves after 90 days. The screen shows the newest 20 notes.

**Agent card.** It offers two ready-made texts: "Ajanınıza doldurtun" (Have your agent fill it in) and "Ajanınıza gözden geçirtin" (Have your agent review it). You copy it with **İstemi kopyala** (Copy the prompt) and paste it to your assistant. In an empty project, the first text makes the assistant ask you a few questions and fill in the sections.

## How to use it

1. As soon as you open the project, write three or five sentences in **İşin özeti**. Write what you sell, who you sell it to, the languages of your site and your conversion page. Every report from the assistant is based on this paragraph.
2. Write **Şu anki hedef** in concrete terms. Do not write "traffic". Write "product pages getting into the index (Google's list of pages)" or "five requests a month from the demo form". The assistant orders its suggestions by this.
3. In **Önemli sayfalar** (Key pages), add the conversion pages first, then the hub pages. The assistant understands from here which work to put first.
4. In **Yazım tercihleri**, write the words not to use and the tone. Examples: "do not say industry leader", "use the 'you' form", "give the version number". The assistant's reports follow these rules.
5. If you use an assistant, copy and paste the **Ajanınıza doldurtun** text on the first day. The assistant fills in the sections by talking with you. Once a month, read the research log and fix what is wrong.

## How the numbers are calculated

There are no calculated numbers on this screen, only limits. These are written above.

The assistant can make at most 50 changes at a time. Each change is written immediately, and no approval is asked. So make it a habit to tell your assistant "ask me before you write". Well-built assistant skills already ask.

A key page address is at most 2,048 characters. A competitor domain name is at most 255 characters, and a name is at most 120. The app writes the date of log notes, and the assistant cannot make up a date.

## Frequently asked questions

**The assistant wrote something wrong. What should I do?** Open the section and fix it. The last updater becomes "you" ("siz"). The assistant sees your version the next time it reads.

**I added a competitor, but no data came.** It will not come. The app does not pull competitor data. The list is there so the assistant knows what to look at when it searches the web.

**A note in the log disappeared.** Notes older than 90 days are deleted. Move lasting information into the sections. The log is a temporary notebook.

**Does this information go to Google?** No. This information is stored on this computer. Only the assistant you connected reads it.

## Limits

The screen is free text. It does not check whether what you write is consistent. If you write something contradictory, the assistant may not notice the contradiction. Competitors and key pages are a reminder list, not a tracking tool. Only the assistant writes the research log. Write your own notes in the sections.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
