---
title: Saved keywords
description: Tag the searches you have saved here, follow their average position over the last 90 days, and export to CSV or Sheets.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

On this screen you collect the searches you care about, tag them and follow their positions.

The app does not suggest keywords. On the Arama performansı (Search performance) or Sıralama takibi (Rank tracking) screen, you choose **Kelime olarak kaydet** (Save as keyword) from a row's menu. The keyword lands here. Here you see each keyword's average position over the last 90 days. The position comes from the Sıralama takibi (Rank tracking) archive. Saving does not start a new tracking job in Google. It filters data that is already collected for these keywords.

## What is on the screen

**Top bar.** A description line, **E-Tablolar'a aktar** (Export to Sheets), **CSV indir** (Download CSV) and **Yenile** (Refresh). Below it, it says "{n} kayıtlı kelime" ({n} saved keywords).

**Position distribution card.** Bars showing how many of your keywords are in positions 1-3, 4-10, 11-20 and 21+. Below it there is a note: "sıralar son 90 günün ortalaması" (positions are the average of the last 90 days). A keyword with no record in the archive counts as "Verisi yok" (No data). If the archive is incomplete, you see "Bilinmiyor (arşiv kesildi)" (Unknown, archive cut off). The **İlk 10** (Top 10) and **Sıra 11-20** (Position 11-20) buttons narrow the table to that slice.

**Filter panel.** Under **Sonuçları filtrele** (Filter results) there are the **İçersin** (Contains) and **İçermesin** (Does not contain) boxes. These search for text inside the keyword. For tags, **Etiket ara** (Search tags) is used. **Tümünü temizle** (Clear all) resets everything. A project can have at most 50 tags.

**Table.** Columns: **Kelime** (Keyword), **Ort. sıra** (Avg. position), **Amaç** (Intent), **Etiketler** (Tags), **Eklenme** (Added). If the position is empty, hovering over it says "Search Console bu kelime için sıra kaydetmemiş" (Search Console has not recorded a position for this keyword). The **Amaç** (Intent) column shows what the person searching for the keyword wants:

- Bilgi amaçlı (Informational): wants to learn.
- Ticari araştırma (Commercial research): will compare and choose.
- İşlem odaklı (Transactional): ready to buy.
- Yönlendirici (Navigational): looking for a specific site.
- Bilinmiyor (Unknown): not clear.

The short forms are Bilgi, Ticari, İşlem, Gezinme and a question mark. The row menu: **Kelimeyi kopyala** (Copy keyword), **Arama performansında ara** (Search in Search performance), **Kelimeyi sil** (Delete keyword).

**Bulk actions.** When you tick rows, **Kelimeleri kopyala** (Copy keywords), **Etiketleri güncelle** (Update tags) and a delete button appear at the top. Before deleting, a warning comes up: "kalıcı olarak silinecek. Bu geri alınamaz." (will be permanently deleted. This cannot be undone.)

**Empty states.** If there are no keywords at all, it says "Henüz kayıtlı kelime yok" (No saved keywords yet). Two shortcuts appear: **Sorgulara göz at** (Browse queries) and **Sıralamayı aç** (Open rank tracking). If no keyword matches the filter, it says "Bu filtrelere uyan kelime yok" (No keyword matches these filters).

## How to use it

1. In Arama performansı (Search performance), open the **Sıra 5-20** (Position 5-20) tab. Mark five or ten searches you find important with **Kelime olarak kaydet** (Save as keyword). Pick the searches for the pages that earn you money. This is as useful as picking the most shown ones.
2. Come here and tick the keywords. With **Etiketleri güncelle** (Update tags), give tags like "ürün" (product), "blog" and "marka" (brand). It makes comparing next month easier.
3. Once a month, look at the **Sıra dağılımı** (Position distribution) card. The keywords in the 11-20 slice are the closest to the first page. Find the pages for those keywords in the Fırsatlar (Opportunities) screen.
4. For a report, choose **CSV indir** (Download CSV) or **E-Tablolar'a aktar** (Export to Sheets). The file comes with the filters you applied.

## How the numbers are calculated

Keywords and tags are in the database on this computer. **Ort. sıra** (Avg. position) is calculated from the Sıralama takibi (Rank tracking) archive for the last 90 days. Days with many impressions affect the average more. Upper and lower case are not told apart.

The 500 most shown searches are pulled from the archive. If your saved keyword is outside these 500, its position shows as "bilinmiyor" (unknown).

The intent information is written if it came when the keyword was saved. It is not calculated afterwards. The list is split into pages of 50, 100 or 250.

## Frequently asked questions

**I saved the keyword, so why is the position empty?** The archive may not have collected days for that keyword yet. Open the Sıralama takibi (Rank tracking) screen and wait for the archive to fill. Then choose **Yenile** (Refresh) here.

**My position is different when I search in Google.** The position here is the average of 90 days. It cannot be compared with a single search.

**Where is the search volume column?** There is none. The app does not estimate volume. You see the number of impressions in the Arama performansı (Search performance) screen.

**Can I save the same keyword twice?** No. The same text becomes one record.

**If I delete a tag, are the keywords deleted?** No. The tag goes away, and the keywords stay.

## Limits

This screen is not a keyword research tool. It does not produce suggestions, and it does not show volume or difficulty. Position information is limited to the archive. The positions of rare searches that Google hides never arrive. The data is in this installation's database. You need to make the backup yourself.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
