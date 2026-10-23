---
title: Parole chiave salvate
description: Qui si salvano le ricerche che contano, le si etichetta e si guarda la loro posizione media degli ultimi 90 giorni. Si possono esportare in CSV o nei fogli di calcolo.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Qui si raccolgono le ricerche che contano, le si etichetta e se ne seguono le posizioni.

L'app non suggerisce parole chiave. Nella schermata Arama performansı (Prestazioni di ricerca) o Sıralama takibi (Monitoraggio delle posizioni), dal menu di una riga si sceglie **Kelime olarak kaydet** (Salva come parola chiave) e la parola finisce qui. Qui si vede la posizione media di ogni parola negli ultimi 90 giorni. La posizione arriva dall'archivio di Sıralama takibi. Salvare non avvia un nuovo monitoraggio su Google: filtra per queste parole i dati che vengono già raccolti.

## Cosa c'è nella schermata

**Barra superiore.** Ci sono una riga di spiegazione e i pulsanti **E-Tablolar'a aktar** (Esporta nei fogli di calcolo), **CSV indir** (Scarica il CSV) e **Yenile** (Aggiorna). Sotto compare "{n} kayıtlı kelime" ({n} parole chiave salvate).

**Scheda della distribuzione delle posizioni.** Le barre mostrano quante parole chiave sono nelle posizioni 1-3, 4-10, 11-20 e 21+. Sotto c'è la nota "sıralar son 90 günün ortalaması" (le posizioni sono la media degli ultimi 90 giorni). Una parola chiave senza registrazioni nell'archivio conta come "Verisi yok" (Senza dati). Se l'archivio è incompleto, si vede "Bilinmiyor (arşiv kesildi)" (Sconosciuta, archivio interrotto). I pulsanti **İlk 10** (Primi 10) e **Sıra 11-20** (Posizione 11-20) restringono la tabella a quella fascia.

**Pannello dei filtri.** Sotto **Sonuçları filtrele** (Filtra i risultati) ci sono le caselle **İçersin** (Deve contenere) e **İçermesin** (Non deve contenere). Entrambe cercano testo all'interno della parola. Per cercare un'etichetta, usare **Etiket ara** (Cerca etichetta). **Tümünü temizle** (Cancella tutto) azzera tutto. In un progetto possono esserci al massimo 50 etichette.

**Tabella.** Le colonne sono: **Kelime** (Parola), **Ort. sıra** (Posizione media), **Amaç** (Intento), **Etiketler** (Etichette), **Eklenme** (Aggiunta). Se la posizione è vuota, passando il mouse sopra si legge "Search Console bu kelime için sıra kaydetmemiş" (Search Console non ha registrato una posizione per questa parola). La colonna **Amaç** mostra che cosa vuole chi cerca la parola:

- Bilgi amaçlı (Informativo): vuole imparare.
- Ticari araştırma (Ricerca commerciale): confronterà e sceglierà.
- İşlem odaklı (Orientato all'azione): è pronto ad acquistare.
- Yönlendirici (Di navigazione): cerca un sito preciso.
- Bilinmiyor (Sconosciuto): non è chiaro.

Nella tabella compaiono le forme brevi: Bilgi, Ticari, İşlem, Gezinme e un punto interrogativo. Il menu della riga ha tre opzioni: **Kelimeyi kopyala** (Copia la parola), **Arama performansında ara** (Cerca nelle prestazioni di ricerca), **Kelimeyi sil** (Elimina la parola).

**Azioni multiple.** Selezionando le righe, in alto compaiono **Kelimeleri kopyala** (Copia le parole), **Etiketleri güncelle** (Aggiorna le etichette) e il pulsante di eliminazione. Prima di eliminare arriva l'avviso "kalıcı olarak silinecek. Bu geri alınamaz." (sarà eliminata in modo permanente. L'operazione non si può annullare.).

**Stati vuoti.** Se non c'è nessuna parola chiave, la schermata scrive "Henüz kayıtlı kelime yok" (Ancora nessuna parola chiave salvata). Compaiono due scorciatoie: **Sorgulara göz at** (Sfoglia le query) e **Sıralamayı aç** (Apri il monitoraggio delle posizioni). Se nessuna parola corrisponde al filtro, scrive "Bu filtrelere uyan kelime yok" (Nessuna parola corrisponde a questi filtri).

## Come si usa

1. In Arama performansı aprire la scheda **Sıra 5-20**. Segnare con **Kelime olarak kaydet** cinque o dieci ricerche che si ritengono importanti. Scegliere le ricerche delle pagine che fanno guadagnare. Servono quanto scegliere le ricerche più mostrate.
2. Venire qui e selezionare le parole. Con **Etiketleri güncelle** assegnare etichette come "ürün" (prodotto), "blog" o "marka" (marchio). Il mese prossimo il confronto sarà più facile.
3. Una volta al mese guardare la scheda **Sıra dağılımı** (Distribuzione delle posizioni). Le parole nella fascia 11-20 sono le più vicine alla prima pagina. Trovare le pagine di quelle parole nella schermata Fırsatlar (Opportunità).
4. Per un report, scegliere **CSV indir** o **E-Tablolar'a aktar**. Il file arriva con i filtri applicati.

## Come si calcolano i numeri

Parole chiave ed etichette stanno nel database su questo computer. **Ort. sıra** è calcolata per gli ultimi 90 giorni dall'archivio di Sıralama takibi. I giorni con molte impressioni pesano di più sulla media. Maiuscole e minuscole non contano.

Dall'archivio si prendono le 500 ricerche più mostrate. Se una parola chiave salvata è fuori da queste 500, la sua posizione risulta "sconosciuta".

L'informazione sull'intento viene scritta solo se è arrivata quando la parola è stata salvata. Non viene calcolata dopo. L'elenco è diviso in pagine da 50, 100 o 250.

## Domande frequenti

**La parola è stata salvata, perché la posizione è vuota?** L'archivio può non aver ancora raccolto giorni per quella parola. Aprire la schermata Sıralama takibi e attendere che l'archivio si riempia. Poi qui scegliere **Yenile**.

**Cercando su Google la posizione risulta diversa.** La posizione qui è la media di 90 giorni. Non si può confrontare con una singola ricerca.

**Dov'è la colonna del volume di ricerca?** Non c'è. L'app non stima i volumi. Il numero di impressioni si vede nella schermata Arama performansı.

**Si può salvare due volte la stessa parola?** No. Lo stesso testo diventa una sola voce.

**Eliminando un'etichetta si eliminano le parole?** No. L'etichetta sparisce, le parole restano.

## Limiti

Questa schermata non è uno strumento di ricerca di parole chiave. Non suggerisce parole e non mostra volume né difficoltà. L'informazione sulla posizione è limitata ai giorni coperti dall'archivio. La posizione delle ricerche rare che Google nasconde non arriva mai. I dati stanno nel database di questa installazione e la copia di sicurezza spetta all'utente.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
