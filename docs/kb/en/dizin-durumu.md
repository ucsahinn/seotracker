---
title: Index status
description: Google's answer for each of your pages: is it in search, if not why, and when it last visited. You can ask at most 2,000 queries a day.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

This tab shows which of your pages Google has put into search.

The site audit tells you a page can be opened, but not whether Google has added it to its index (Google's list of pages). The **Dizin durumu** (Index status) tab asks Google and saves the answer on this computer. A page is asked about again only when its answer has gone stale. This matters because Google allows 2,000 questions a day per property (your site's record in Search Console), and the app and your assistant share that allowance.

## What is on the screen

**The "Google bu sayfalarla ne yapmış?" (What has Google done with these pages?) chart.** This donut chart splits the crawled pages into three groups:

- **Google'da** (In Google): can appear in search.
- **Dizinde değil** (Not in the index): Google looked at the page but did not add it.
- **Yanıt bekleyen** (Waiting for an answer): not asked yet, or no answer could be received.

**Summary boxes.** They show how many pages were asked about, how many are in the index, how many are not and how many are waiting. The "Google'ın farklı adresi seçtiği sayfalar" (Pages where Google chose a different address) box counts pages where Google chose a different address from the canonical you declared (the tag that names a page's main address). The "Bu denetimde henüz sorulmamış" (Not yet asked in this audit) box shows how many pages are left to ask about.

**The "Google'da durumunu kontrol et" (Check status in Google) button.** Each press asks about at most 25 pages, starting with those that have gone longest without an answer. When the daily limit is used up, the warning "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Google's daily limit of 2,000 addresses was reached) appears. The button is disabled if Search Console is not connected or if the audited domain is outside the connected property.

**Table.** Columns: **Sayfa** (Page), **Durum** (Status), **Sebep** (Reason), **Google'ın seçtiği adres** (Address Google chose), **Google'ın son ziyareti** (Google's last visit). The status cell shows "Google'da", "Kontrol edilmedi" (Not checked), "Yanıt alınamadı" (No answer received), "Hata" (Error), or the Turkish version of Google's own status. The app translates 18 statuses into Turkish. Examples:

- "Keşfedildi, henüz taranmadı" (Discovered, not yet crawled)
- "'noindex' etiketiyle dışlandı" (Excluded by the 'noindex' tag) (the page is kept out of search)
- "robots.txt engelliyor" (robots.txt blocks it) (robots.txt is the file that tells Google which pages it may visit)
- "Yumuşak 404" (Soft 404) (the page exists but Google treats it as empty)
- "Google bu adresi bilmiyor" (Google does not know this address)

You can download the table as CSV.

## How to use it

1. When the audit finishes, open the tab. If the "Yanıt bekleyen" number is high, press **Google'da durumunu kontrol et**. Each press covers 25 more pages, so a few presses are enough for a small site.
2. Look at the "Dizinde değil" group first. The **Sebep** column gives Google's reason, which often tells you what to do. If it says "robots.txt engelliyor", remove the block. If it says "'noindex' etiketiyle dışlandı", remove the tag. If it says "Keşfedildi, henüz taranmadı", waiting is usually enough.
3. Add important pages that say "Google bu adresi bilmiyor" to your sitemap and submit the sitemap to Search Console. For the three or four most important pages, also click "Dizine eklenmesini iste" (Request indexing) by hand in Search Console.
4. If the "Google'ın farklı adresi seçtiği sayfalar" box is not zero, look at the **Google'ın seçtiği adres** column. Google disagrees with the main address you declared. Either correct yours or make the address Google chose the main one.
5. Press again after a few days. Only stale answers are asked again, so your quota is not wasted.

## How the numbers are calculated

If Google says "indexed", the page counts as "Google'da". If it says "not indexed" or "unknown", the page counts as "Dizinde değil". If there is no answer, the page is "Yanıt bekleyen".

An answer is treated as stale after a set time and is asked about again: 14 days for a page in the index, 3 days for a page not in the index or an answer with an error. A page that has never been asked about is always eligible. The daily limit is calculated from the number of questions in the last 24 hours. The app counts only its own questions; queries you run by hand in Search Console are not in this counter, but they do count against Google's real limit.

A canonical mismatch means the address Google chose differs from the one you declared, even by a trailing slash.

If Google's last crawl is older than 90 days, the audit reports the problem "Google bu sayfayı uzun süredir taramadı" (Google has not crawled this page for a long time). Stale answers are collected into a single problem, "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" (Google's answer about some pages is out of date).

## Frequently asked questions

**Why is the button disabled?** There are three possible reasons: Search Console is not connected, there are no pages left to ask about, or the audited domain is outside the connected property (for example, because you audited another site).

**What does the 2,000 limit apply to?** The property. Two projects connected to the same property, and your assistant, spend from the same pool.

**What should I do for a page that says "Keşfedildi, henüz taranmadı"?** Usually nothing. On new sites Google can leave pages waiting for weeks. Linking to the page from pages that Google crawls often speeds it up.

**Does this tab tell Google about new pages?** No, it only asks. To tell Google about a page, use the sitemap and "Dizine eklenmesini iste" in Search Console.

## Limits

The answers are only as good as what Google returns, and Google can leave some fields empty. You cannot go over 2,000 questions a day, so covering a 10,000-page site takes five days. The tab asks only about crawled pages; addresses that were not part of the audit do not appear in the list.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
