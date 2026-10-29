---
title: Monitoraggio del posizionamento
description: Seguire la posizione media su Google delle query e le sue variazioni. L'archivio locale conserva i dati oltre i 16 mesi di Search Console.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

La schermata mostra le query Web di Search Console archiviate su questo computer. La posizione media non è un piazzamento fisso valido per ogni ricerca: luogo, dispositivo e contesto la modificano. Le impressioni non sono volumi di ricerca.

## Da dove iniziare

Il riepilogo conta le query osservate in entrambi i periodi e quelle che si sono mosse di almeno mezza posizione. I confronti non calcolabili sono contati a parte. Apra per primo il calo suggerito. La priorità moltiplica la variazione assoluta per le impressioni registrate: non è una stima dei clic persi. Ogni elenco mostra tre query; espandendolo arriva a cinque, ed è espandibile solo con più di tre movimenti.

Se nessuna query è stata osservata in entrambi i periodi, salite e discese non si possono calcolare. La scheda dei movimenti lo spiega invece di mostrare un movimento pari a zero.

## Date e copertura

Il periodo può essere di 30, 90, 180, 480 o 1825 giorni. L'ultima opzione copre gli ultimi cinque anni di archivio, non l'intera cronologia. I mesi indicati sono approssimativi; i dettagli riportano le date esatte nel calendario America/Los_Angeles. La data finale presume tre giorni di ritardo e non verifica in tempo reale che i dati siano completi. L'importazione chiede a Google solo dati definitivi.

I giorni sono contati per stato: risposta API completa, limite dell'app raggiunto, errore o copertura sconosciuta. I giorni importati in passato non vengono dichiarati completi a posteriori. Anche una risposta completa esclude le query che Google nasconde od omette. L'ultima osservazione e l'ultima data esaminata sono due informazioni diverse. Completare l'archivio può richiedere più esecuzioni; durante la sincronizzazione la cronologia esistente resta consultabile.

## Come si riempie l'archivio

Mentre questa schermata è aperta, i giorni mancanti si caricano da soli; anche **Rendimento della ricerca** aggiorna l'archivio quando è aperta. Con entrambe le schermate chiuse, o con l'app chiusa, non viene scaricato nulla.

- Dopo ogni trasferimento parziale, l'app attende 15 secondi prima di chiedere il blocco successivo.
- Quando l'archivio è aggiornato, ricontrolla ogni 15 minuti.
- Dopo un errore di connessione o di quota, attende 15 minuti prima di riprovare.
- Dopo un errore di autorizzazione, il collegamento va rinnovato a mano.

**Continua a riempire l'archivio** riprende il trasferimento a mano. La prima importazione parte dall'inizio della finestra di 16 mesi di Google; i giorni che Google non fornisce più non si possono recuperare. Ogni esecuzione tratta al massimo quattro finestre di tempo; quelle con molte righe vengono divise per giorno e riprese nelle esecuzioni successive. Per un giorno l'app legge fino a 50.000 righe; un giorno che resta incompleto viene segnato come tale.

## Distribuzione e ricerca

La distribuzione comprende tutte le query osservate nel periodo corrente. Le posizioni sono arrotondate: 3,4 rientra nel primo gruppo, 3,5 nel secondo. La lunghezza delle barre è relativa al gruppo più grande; la percentuale è la quota sulle query osservate. Le variazioni dei gruppi sono nette e si basano sulle stesse query confrontabili. Un confronto mancante non diventa zero.

Ricerca e filtri agiscono su tutte le query, senza il vecchio limite di cento. I contatori tengono conto del testo cercato e degli altri filtri attivi. Il filtro del quartile superiore per impressioni include i valori a pari merito. Il filtro "prime 10" include le query senza osservazione precedente; le uscite dalle prime 10 richiedono dati in entrambi i periodi. Un pulsante rimuove tutti i filtri. Le pagine mostrano 25, 50 o 100 righe; il numero di righe non cambia i riepiloghi.

Le query osservate in precedenza ma assenti nel periodo corrente sono elencate a parte. La loro assenza non prova una perdita di posizionamento né una posizione zero. L'elenco mostra le prime 25 per impressioni e rispetta anch'esso il testo cercato.

## Leggere la cronologia

Le posizioni medie sono ponderate per le impressioni. La variazione è la media precedente meno la media attuale. Sotto 0,05 posizioni la variazione è neutra; il filtro dei movimenti significativi usa 0,5. Il dettaglio di una query usa lo stesso confronto tra periodi della tabella. Primo e ultimo giorno registrato sono osservazioni distinte.

Il numero di giorni osservati è sempre visibile: 10 giorni su 90 non sono una copertura completa. I punti giornalieri seguono il calendario reale e i giorni mancanti interrompono la linea. Le date si esplorano con i tasti freccia, Home e Fine; i valori giornalieri si leggono espandendo l'elenco. Le settimane del tutto prive di dati restano vuote; quelle agli estremi del periodo possono essere parziali.

Il collegamento a **Rendimento della ricerca** mantiene la query esatta e le date dell'archivio. Se il periodo supera la conservazione dei dati di Google, prima di aprire la pagina viene indicata la prima data disponibile.

La schermata non offre posizionamenti dei concorrenti, volumi di ricerca o previsioni di traffico.
