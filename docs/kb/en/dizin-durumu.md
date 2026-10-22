---
title: Index status
description: Google's answer for each of your pages: is it in search, if not why, and when it last visited. You can ask at most 2,000 queries a day.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

On this page you see how to find out which of your pages Google has put into search.

The site audit tells you a page can be opened. It cannot tell you whether Google has really added it to its index (Google's list of pages). The **Dizin durumu** (Index status) tab asks Google this and saves the answer. The answers are stored on this computer. The same question is not asked again and again. Only answers that have gone stale are asked again. This matters because Google gives 2,000 questions a day for each property (your site's record in Search Console). The app and your assistant share this allowance.

## What is on the screen

**The "Google bu sayfalarla ne yapmış?" (What has Google done with these pages?) ring.** The crawled pages are split into three groups:

- **Google'da** (In Google): can appear in search.
- **Dizinde değil** (Not in the index): Google looked but did not take it.
- **Yanıt bekleyen** (Waiting for an answer): not asked yet, or no answer could be received.

**Summary boxes.** They show how many pages were asked, how many are in the index, how many are not, and how many are waiting. The "Google'ın farklı adresi seçtiği sayfalar" (Pages where Google chose a different address) box counts the pages where Google chose an address other than the canonical (the notice that says which address is the main one) you declared. The "Bu denetimde henüz sorulmamış" (Not yet asked in this audit) box is the number of pages left to ask.

**The "Google'da durumunu kontrol et" (Check status in Google) button.** Each press asks about at most 25 pages. The pages that have gone longest without an answer come first. If the daily limit is full, the warning "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Google's daily limit of 2,000 addresses was reached) appears. If Search Console is not connected, the button is disabled. It is also disabled if the audited domain is not inside the connected property.

**Table.** Columns: **Sayfa** (Page), **Durum** (Status), **Sebep** (Reason), **Google'ın seçtiği adres** (Address Google chose), **Google'ın son ziyareti** (Google's last visit). The status cell shows "Google'da", "Kontrol edilmedi" (Not checked), "Yanıt alınamadı" (No answer received), "Hata" (Error), or the Turkish version of Google's own status. In total, 18 statuses are translated into Turkish. Examples:

- "Keşfedildi, henüz taranmadı" (Discovered, not yet crawled)
- "'noindex' etiketiyle dışlandı" (Excluded by the 'noindex' tag) (the page is hidden from search)
- "robots.txt engelliyor" (robots.txt blocks it) (robots.txt: the file that tells Google which pages it may enter)
- "Yumuşak 404" (Soft 404) (the page exists but Google counts it as empty)
- "Google bu adresi bilmiyor" (Google does not know this address)

You can download the table as CSV.

## How to use it

1. When the audit finishes, open the tab. If the "Yanıt bekleyen" number is high, press **Google'da durumunu kontrol et**. Each press moves 25 pages forward. On a small site, a few presses are enough.
2. Look at the "Dizinde değil" group first. The **Sebep** column is Google's reason, and it often tells you what to do. If it says "robots.txt engelliyor", remove the block. If it says "'noindex' etiketiyle dışlandı", delete the tag. If it says "Keşfedildi, henüz taranmadı", waiting is usually enough.
3. Add important pages that say "Google bu adresi bilmiyor" to the sitemap. Submit the sitemap to Search Console. For the three or four most important pages, click "Dizine eklenmesini iste" (Request indexing) by hand in Search Console.
4. If the "Google'ın farklı adresi seçtiği sayfalar" box is not zero, look at the **Google'ın seçtiği adres** column. Google did not like the main address you declared. Either fix yours, or make the one Google chose the main address.
5. Press again after a few days. Only stale answers are asked again, so your quota is not wasted.

## How the numbers are calculated

If Google says "indexed", the page counts as "Google'da". If it says "not indexed" or "unknown", the page counts as "Dizinde değil". If there is no answer, the page is "Yanıt bekleyen".

An answer counts as old after a set time and is asked again. For a page in the index, this time is 14 days. For a page not in the index, or an answer with an error, it is 3 days. A page that has never been asked is always ready to be asked. The daily limit is calculated from the number of questions in the last 24 hours. The app counts only its own questions. Queries you make by hand in Search Console do not enter this counter, but they do count against Google's real limit.

A canonical mismatch means that the address Google chose and the address you declared are different. A difference of a trailing slash also counts.

If Google's last crawl is older than 90 days, the audit reports the problem "Google bu sayfayı uzun süredir taramadı" (Google has not crawled this page for a long time). Stale answers are collected into a single problem, "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" (Google's answer about some pages is out of date).

## Frequently asked questions

**Why is the button disabled?** There can be three reasons. Search Console is not connected. There are no pages left to ask. Or the domain you audited is not inside the connected property. This happens if you audited another site.

**Whose is the 2,000 limit?** The property's. Two projects connected to the same property and your assistant spend from the same pool.

**What should I do for a page that says "Keşfedildi, henüz taranmadı"?** Most of the time, nothing. On new sites, Google can make pages wait for weeks. Linking to the page from pages of the site that are crawled often speeds it up.

**Does this tab tell Google about new pages?** No, it only asks. To tell Google, there is the sitemap and "Dizine eklenmesini iste" in Search Console.

## Limits

The answers are only as good as what Google gives. Google can leave some fields empty. You cannot go over 2,000 questions a day. Asking about a 10,000-page site completely takes five days. The tab asks only about crawled pages. Addresses that were not part of the audit do not appear in the list.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
