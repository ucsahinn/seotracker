---
title: Parole chiave salvate
description: Si salvano le ricerche che contano, le si etichetta e si guarda la loro posizione media negli ultimi 90 giorni. Esportazione in CSV.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Qui si raccolgono le ricerche che contano, le si etichetta e se ne seguono le posizioni.

L'app non suggerisce parole chiave. Nella schermata Rendimento della ricerca o Monitoraggio del posizionamento, dal menu di una riga si sceglie **Salva come parola chiave** e la parola finisce qui. Qui si vede la posizione media di ogni parola negli ultimi 90 giorni. La posizione arriva dall'archivio di Monitoraggio del posizionamento. Salvare non avvia un nuovo monitoraggio su Google: filtra per queste parole i dati che vengono già raccolti.

## Cosa c'è nella schermata

**Barra superiore.** Ci sono una riga di spiegazione e i pulsanti **Esporta in Fogli Google**, **Scarica CSV** e **Aggiorna**. Sotto compare "N parole chiave salvate".

**Scheda della distribuzione delle posizioni.** Le barre mostrano quante parole chiave sono nelle posizioni 1-3, 4-10, 11-20 e 21+. Sotto c'è la nota "le posizioni sono la media degli ultimi 90 giorni". Una parola chiave senza registrazioni nell'archivio conta come "Nessun dato". Se l'archivio è incompleto, si vede "Sconosciuto (archivio interrotto)". I pulsanti **Primi 10** e **Posizione 11-20** restringono la tabella a quella fascia.

**Pannello dei filtri.** Sotto **Filtra risultati** ci sono le caselle **Deve contenere** e **Non deve contenere**. Entrambe cercano testo all'interno della parola. Per cercare un'etichetta, usare **Cerca etichette**. **Cancella tutto** azzera tutto. In un progetto possono esserci al massimo 50 etichette.

**Tabella.** Le colonne sono: **Parola chiave**, **Pos. media**, **Intento**, **Etichette**, **Aggiunta**. Se la posizione è vuota, passando il mouse sopra si legge "Search Console non ha registrato una posizione per questa parola chiave". La colonna **Intento** mostra che cosa vuole chi cerca la parola:

- Informativa: vuole imparare.
- Ricerca commerciale: confronterà e sceglierà.
- Transazionale: è pronto ad acquistare.
- Navigazionale: cerca un sito preciso.
- Sconosciuto: non è chiaro.

Nella tabella compaiono le forme brevi: Informativa, Commerciale, Transazionale, Navigazionale e un punto interrogativo. Il menu della riga ha tre opzioni: **Copia parola chiave**, **Cerca in Rendimento della ricerca**, **Elimina parola chiave**.

**Azioni multiple.** Selezionando le righe, in alto compaiono **Copia parole chiave**, **Aggiorna etichette** e il pulsante di eliminazione. Prima di eliminare arriva l'avviso "sarà eliminata in modo permanente. L'operazione non si può annullare.".

**Stati vuoti.** Se non c'è nessuna parola chiave, la schermata scrive "Non ci sono ancora parole chiave salvate". Compare una scorciatoia: **Esplora query**; se Search Console non è ancora collegata, al suo posto compare **Collega Search Console**. Se nessuna parola corrisponde al filtro, scrive "Nessuna parola chiave corrisponde ai filtri".

## Come si usa

1. In Rendimento della ricerca aprire la scheda **Opportunità di posizionamento**. Segnare con **Salva come parola chiave** cinque o dieci ricerche che si ritengono importanti. Scegliere anche le ricerche delle pagine che fanno guadagnare: sono utili quanto quelle più mostrate.
2. Venire qui e selezionare le parole. Con **Aggiorna etichette** assegnare etichette come "ürün" (prodotto), "blog" o "marka" (marchio). Il mese prossimo il confronto sarà più facile.
3. Una volta al mese guardare la scheda **Distribuzione delle posizioni**. Le parole nella fascia 11-20 sono le più vicine alla prima pagina. Trovare le pagine di quelle parole nella schermata Opportunità.
4. Per un report, scegliere **Scarica CSV** o **Esporta in Fogli Google**. Il file arriva con i filtri applicati.

## Come si calcolano i numeri

Parole chiave ed etichette stanno nel database su questo computer. **Pos. media** è calcolata per gli ultimi 90 giorni dall'archivio di Monitoraggio del posizionamento. I giorni con molte impressioni pesano di più sulla media. Maiuscole e minuscole non contano.

Dall'archivio si prendono le 500 ricerche più mostrate. Se una parola chiave salvata è fuori da queste 500, la sua posizione risulta "sconosciuta".

L'informazione sull'intento viene scritta solo se è arrivata quando la parola è stata salvata. Non viene calcolata dopo. L'elenco è diviso in pagine da 50, 100 o 250.

## Domande frequenti

**La parola è stata salvata, perché la posizione è vuota?** L'archivio può non aver ancora raccolto giorni per quella parola. Aprire la schermata Monitoraggio del posizionamento e attendere che l'archivio si riempia. Poi qui scegliere **Aggiorna**.

**Cercando su Google la posizione risulta diversa.** La posizione qui è la media di 90 giorni. Non si può confrontare con una singola ricerca.

**Dov'è la colonna del volume di ricerca?** Non c'è. L'app non stima i volumi. Il numero di impressioni si vede nella schermata Rendimento della ricerca.

**Si può salvare due volte la stessa parola?** No. Lo stesso testo diventa una sola voce.

**Eliminando un'etichetta si eliminano le parole?** No. L'etichetta sparisce, le parole restano.

## Limiti

Questa schermata non è uno strumento di ricerca di parole chiave. Non suggerisce parole e non mostra volume né difficoltà. L'informazione sulla posizione è limitata ai giorni coperti dall'archivio. La posizione delle ricerche rare che Google nasconde non arriva mai. I dati stanno nel database di questa installazione e la copia di sicurezza spetta all'utente.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
