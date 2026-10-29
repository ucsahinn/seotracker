---
title: Opportunità
description: Quale pagina curare prima: le pagine già visibili su Google, ordinate per clic aggiuntivi massimi secondo Search Console, con il lavoro suggerito.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

Il calcolo usa i dati Search Console del progetto e le percentuali di clic del sito stesso. Per ogni pagina indica un tipo di lavoro suggerito e un limite massimo di clic aggiuntivi. Non è un risultato atteso né una garanzia.

## Da dove iniziare

**Inizia da qui** apre la pagina con il limite massimo di clic aggiuntivi più alto tra quelle stimabili, insieme al lavoro da verificare. Facilità e tempi del lavoro non sono misurati.

Ogni pagina rientra in un tipo di lavoro in base alle ricerche misurate:

| Tipo di lavoro                           | Situazione                                                                              | Azione suggerita                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Titolo e descrizione**                 | In prima pagina, ma cliccata meno delle altre ricerche del sito nella stessa posizione. | **Riscrivi titolo e descrizione**                               |
| **In prima pagina, posizioni 4-10**      | Sotto i primi tre risultati. Salire di una fascia aumenta nettamente i clic.            | **Rafforza il contenuto**                                       |
| **In seconda pagina, posizioni 11-20**   | Subito dopo la prima pagina; riceve pochi clic finché non ci arriva.                    | **Aggiungi link interni, amplia il contenuto**                  |
| **In profondità, oltre la posizione 20** | Ha impressioni, ma una posizione bassa.                                                 | **Esamina intento di ricerca e argomenti coperti dalla pagina** |

Per una pagina con guadagno sconosciuto, il lavoro suggerito si basa solo sulla posizione media:

| Posizione  | Lavoro suggerito                |
| ---------- | ------------------------------- |
| 1–5        | rivedere titolo e snippet       |
| 6–10       | migliorare il contenuto         |
| 11–20      | link interni e contenuto        |
| 21 e oltre | verificare l'intento di ricerca |

Il suggerimento non prova un CTR basso né un guadagno futuro.

## Date e ambito

Il periodo può essere di 7, 28 o 90 giorni. Search Console usa giorni completi del calendario del Pacifico. Se Google non indica fino a quando i dati sono completi, l'app dichiara il ritardo che ha presunto. Le date effettive di inizio e fine restano visibili. Analytics legge le stesse date nel fuso orario della proprietà, quindi l'intervallo di tempo può essere diverso.

Il **limite massimo su base 30 giorni** riporta il periodo scelto a 30 giorni. Non è una previsione mensile, una garanzia né un volume di ricerca. Copre solo le query ricevute, identificabili e con dati sufficienti. La quota di query nascoste resta sconosciuta; i limiti di righe sono dichiarati. La stima per query del Pannello usa un modello diverso: non sommi le due cifre. Il confronto con i clic attuali usa tutti i clic delle pagine candidate, compresi quelli di brand.

## Elenco e filtri

I filtri per tipo di lavoro e per conversioni si combinano tra loro (devono valere entrambi). Il server filtra tutte le pagine candidate prima di mostrare le prime 25, 50 o 100; i totali generali non cambiano. Una pagina può rientrare in più tipi di lavoro, quindi i conteggi per tipo non si sommano. Periodo, numero di righe e filtri restano nell'URL. **Mostra le pagine con conversioni** compare solo quando esistono conversioni confermate.

Sul computer l'elenco è una tabella ordinabile; sul telefono ogni pagina è una riga con il pulsante **Dettagli**. I dettagli riportano impressioni, posizione, fascia di posizione obiettivo e contributo assegnato a ciascuna query. Sono mostrate le dieci query principali e, a parte, il resto: insieme corrispondono al limite della pagina. Lo scarto di CTR, in punti percentuali, usa solo query non di brand confrontabili, con la stessa base di impressioni.

## Guadagno sconosciuto

Compaiono anche le pagine con impressioni ma senza stima: prima le pagine stimate, per guadagno, poi le altre, per impressioni. **Guadagno sconosciuto** non significa zero; i totali sommano solo i guadagni calcolati. Query non abbinate, impressioni insufficienti e percentuali obiettivo mancanti sono contate a parte rispetto a uno zero misurato. Se Google non restituisce righe, questo non prova l'assenza di impressioni.

Con guadagno sconosciuto, esamini prima la pagina e le query osservate; cambi titolo o contenuto solo dopo aver confermato una mancata corrispondenza. I dettagli elencano le query non di brand per impressioni e segnalano le pagine che ricevono solo ricerche di brand. Se nessun guadagno è calcolabile, i tipi di lavoro mostrano il numero di pagine candidate senza barre.

Pochi dati non significano potenziale zero. La mancanza di query non di brand utilizzabili può dipendere da query nascoste, dall'esclusione del brand o dai limiti dei dati. Per esaminare le query con impressioni apra **Rendimento della ricerca**. I dettagli del calcolo si trovano nella sezione chiusa **Copertura dei dati e calcolo**.

## Dati di Analytics

Analytics aggiunge sessioni organiche, eventi chiave e quota di sessioni con un evento chiave, così come sono stati misurati. Non proietta eventi futuri a partire dai clic aggiuntivi. Le metriche limitate restano sconosciute. Più varianti di un URL possono condividere lo stesso gruppo Analytics: non sommi le sue sessioni su più righe. Il riepilogo delle conversioni separa le pagine abbinate da quelle con stato sconosciuto; l'assenza di copertura Analytics non equivale a zero conversioni. I dati Analytics mancanti sono spiegati nei dettagli della pagina, non riga per riga.

- **Quota esaurita**: attenda e aggiorni.
- **Autorizzazioni mancanti**: controlli la connessione del progetto.
- **Aggiornamento non riuscito**: restano i dati precedenti, con le date originali e un avviso.

**Esamina il gruppo di indirizzi Analytics**, nella riga o nei dettagli, apre le pagine di destinazione organiche con le date della fonte e il gruppo di indirizzi normalizzato. Se indirizzo o date non si possono abbinare, al posto del link compare una spiegazione. Il gruppo viene filtrato prima della paginazione, sulle stesse righe di origine usate da Opportunità (al massimo 1.000). Analytics segnala i limiti che impediscono di verificare l'intero gruppo.

## Esportare e verificare il risultato

**CSV** ed **Esporta in Fogli Google** includono le righe filtrate visibili, le date osservate, l'unità normalizzata, il modello, la proprietà, l'origine dei termini di brand, i limiti della fonte e il gruppo Analytics. Il guadagno sconosciuto resta vuoto; sono inclusi stato, motivo, indicatore di brand e query osservate. La scrittura in Fogli avviene solo quando si sceglie l'esportazione.

**Apri in Rendimento della ricerca** mantiene le date di inizio e fine e apre i dettagli dell'URL esatto. Se un periodo non è leggibile, la schermata lo spiega invece di sostituire le date.

Dopo una modifica, ne prenda nota e confronti clic, CTR e posizione misurati su periodi equivalenti. Una stima in calo non prova da sola un successo. Una posizione bassa o una stima ridotta non giustificano l'eliminazione di contenuti; valuti l'unione di due pagine solo dopo aver confermato che rispondono alla stessa esigenza.
