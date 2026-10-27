---
title: Report e modelli
description: Ogni report scaricato da un controllo o dal Rendimento della ricerca, o scritto dall'assistente, è un solo file HTML. Si apre sul telefono, si stampa o si invia per e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Qui si trova come ottenere un report, a chi inviarlo e come ripeterlo con un modello.

La schermata **Report** tiene in un unico elenco tutti i report fatti per questo progetto. Un report nasce in tre modi. Il pulsante **Scarica report** della schermata **Controllo del sito** produce il report del controllo. Il pulsante **Scarica report** della schermata **Rendimento della ricerca** produce un report della vista mostrata. Anche l'assistente di intelligenza artificiale può fare ricerche e salvare i risultati come report. Ogni report è un solo file HTML senza script (codice che gira nella pagina), risorse esterne o caratteri incorporati. Per questo si apre sul telefono, si stampa in PDF e si invia per e-mail. L'app non ha un editor per scrivere un report a mano: lo scrive l'app o l'assistente.

## Cosa c'è nella schermata

**Barra in alto.** I pulsanti **Aggiorna**, **Copia prompt del report** e **Modelli**. **Copia prompt del report** mette negli appunti un testo da incollare nell'assistente. Se non c'è ancora nessun report, il pulsante sta nella scheda dello stato vuoto.

**Riquadri di riepilogo.** Sono tre.

- **Ultimo report**: da quanto tempo è stato scritto o aggiornato l'ultimo report. Il collegamento sotto apre il report.
- **Negli ultimi 7 giorni**: il numero di report scritti o aggiornati in questo periodo.
- **Totale**: tutti i report. Sotto si vede quanti sono report di controllo, quanti nati da una skill e quanti da un modello.

**Report per tipo.** Un grafico ad anello divide i report per tipo. Un clic su un tipo restringe l'elenco ai report di quel tipo. Un altro clic toglie il filtro.

**Come funziona?** Una breve spiegazione che si presenta chiusa. Spiega la differenza tra i report scritti dall'agente e il report di verifica del sito.

**Filtri.** Tutti, Ultimi 7 giorni, Creato con un modello, Creato con una skill. Accanto c'è la casella **Cerca nei report**.

**Tabella.** Ha le colonne **Report**, **Tipo**, **Creato** e **Dimensione**. Un clic sull'intestazione ordina. **Tipo** dice da dove viene il report. Per esempio "Report di controllo del sito" è fatto dall'app stessa. Quelli scritti dall'assistente portano nomi come "Controllo SEO", "Confronto tra periodi", "Analisi del calo di traffico", "Report SEO", "Nota di coaching" o "Configurazione del progetto". Un report di tipo non noto dice "Non specificato". Per i report scritti con un modello compare il nome del modello. L'elenco mostra gli ultimi 100 report. Se ce ne sono di più, una nota sotto lo dice.

**Pagina del report.** Il report si apre in una sua cornice isolata. Pulsanti: **Scarica come HTML**, **Salva come PDF (stampa)**, **Apri in una nuova scheda**. Il menu **Altre azioni** contiene **Copia link**. Il collegamento funziona solo su questa installazione, da fuori nessuno può raggiungerlo. La pagina indica anche chi ha creato il report, il tipo, quando è stato creato e aggiornato e la dimensione.

**Modelli di report.** Si raggiungono dal pulsante **Modelli**. Un modello è una ricetta salvata che dice all'assistente come scrivere il report: chi lo leggerà, quali sezioni avrà e in che lingua sarà scritto. I campi sono tre:

- **Nome**: al massimo 80 caratteri, unico nel progetto.
- **Descrizione**: al massimo 200 caratteri. Una frase che dice quando usarlo.
- **Istruzione**: al massimo 3.000 caratteri.

Un progetto può avere al massimo 10 modelli. Eliminando un modello non si eliminano i report fatti con esso.

## I report propri dell'app

**Report di controllo del sito.** Prodotto da **Scarica report** nel dettaglio del controllo. Se il controllo si è fermato a metà, al titolo del report si aggiunge "(parziale)". Per esempio "Controllo del sito esempio.it (parziale)". La copertina di un report simile porta l'avviso "Il report potrebbe essere incompleto." e il motivo: il controllo si è interrotto per un errore, è ancora in esecuzione oppure non è stato possibile scansionare nessuna pagina. Un report parziale non ha sezioni di punteggio. Se la scansione si è interrotta presto a causa del limite di velocità del sito, la copertina dice "Verifica incompleta, nessun punteggio". Se sono stati misurati pochi controlli, il punteggio è scritto come "Punteggio provvisorio" insieme alla copertura delle misure. Anche il riepilogo del report indica la situazione. Così un assistente che legge l'elenco dei report capisce che un report è incompleto.

**Report sul rendimento della ricerca.** Prodotto da **Scarica report** nella schermata Rendimento della ricerca. Trasforma la vista che si sta guardando nella schermata (periodo, dispositivo, paese, tipo di ricerca) in un documento stampabile. La copertina riporta i giorni definitivi, il confronto, i filtri, la data degli ultimi dati e il momento della creazione. Seguono i quattro totali, il riquadro "Stato dei dati", i lavori sotto **Inizia da queste**, il grafico **Nel tempo** (con gli aggiornamenti di Google e le note segnati), le opportunità, le variazioni e le pagine in competizione per la stessa query. I numeri sono gli stessi della schermata. Riprenderlo con lo stesso sito, lo stesso intervallo di date e gli stessi filtri non aggiunge un nuovo report. Aggiorna il report precedente dell'app. Se il report supera il limite di archiviazione, viene chiesto di scegliere un periodo o un filtro più breve.

Entrambi i report vengono prima salvati, poi scaricati sul computer. Se lo scaricamento fallisce per qualche motivo, il report resta comunque nell'elenco **Report**. Lo si scarica da lì.

## Come si usa

1. Per un primo report, fare clic su **Scarica report** nella schermata Controllo del sito. Il report si scarica sul computer e compare anche in questo elenco. Comincia con la sezione "N cose da fare questa settimana".
2. Per documentare la situazione nella ricerca, impostare periodo e filtri nella schermata Rendimento della ricerca, poi fare clic su **Scarica report**.
3. Se si lavora con un assistente, fare clic su **Copia prompt del report**. Incollare il testo copiato in Claude Code, Codex o Cursor. L'assistente chiede quale report si vuole, legge i dati e salva qui il report.
4. Se si vuole lo stesso report ogni mese, scrivere un modello. Nell'istruzione indicare il lettore ("la persona che gestisce il sito, non conosce la SEO"), le sezioni, l'ordine e il tono. Chiedendo il modello per nome, l'assistente lo applica.
5. Per condividere, fare clic su **Scarica come HTML** e inviare il file. Chi lo riceve lo apre in un browser. Un collegamento copiato funziona solo sullo stesso computer.
6. Non eliminare i vecchi report. Alla conversazione successiva l'assistente legge il riepilogo del report precedente e confronta.

## Come si calcolano i numeri

Il report di controllo è impaginato per la stampa A4. Contiene l'indice, "N cose da fare questa settimana", i problemi, la misurazione della velocità, lo stato dell'indice di Google e la mappa del sito. La sezione sullo stato dell'indice usa solo risposte salvate e non pone nuove domande a Google.

Gli elenchi hanno dei limiti: 50 indirizzi per problema, 300 pagine, 50 righe di velocità, 3.000 indirizzi in appendice. Se il file supera i 400 KB, gli elenchi vengono accorciati.

Un report può pesare al massimo 500.000 byte (meno di 80 KB è consigliato). Il titolo è di al massimo 120 caratteri ed è unico nel progetto. Il riepilogo è di al massimo 2.500 caratteri. Un secondo report con lo stesso titolo non viene accettato. Un progetto può avere al massimo 10.000 report, e l'installazione riserva in tutto 5 GB.

Per sicurezza, al salvataggio vengono rifiutati i file che contengono uno script, un iframe (una casella che incorpora una pagina in un'altra), un modulo, uno stile esterno, un gestore di eventi (come onclick), un collegamento javascript: o un reindirizzamento automatico. All'apertura il report viene inoltre mostrato in una cornice sigillata, senza accesso alla rete. Un report quindi non può inviare nulla all'esterno a insaputa dell'utente.

## Domande frequenti

**Chi ha scritto il report?** La colonna **Tipo** lo dice. "Report di controllo del sito" viene dall'app, tutti gli altri dall'assistente. Anche la pagina del report mostra chi lo ha salvato.

**Nel titolo c'è scritto "(parziale)", cosa fare?** Il controllo si è fermato a metà. La copertina del report ne dice il motivo. Eseguire di nuovo il controllo e scaricare di nuovo il report.

**Si può modificare il report?** Non nell'app. Dire all'assistente "cambia questa sezione": aggiornerà il report.

**Ho inviato il collegamento, ma l'altra persona non riesce ad aprirlo.** Il collegamento funziona solo su questo computer. Inviare il file con **Scarica come HTML**.

**A cosa fare attenzione scrivendo un modello?** Un modello è una ricetta di forma, non una fonte di informazioni. Scrivere le sezioni, il tono e per chi è scritto il report. Non scriverci numeri o affermazioni. L'assistente prende i numeri dai dati ogni volta.

## Limiti

I report non vengono mai pubblicati all'esterno. Per condividerli si invia il file. Un report è accurato quanto i dati letti da chi lo ha scritto. La sezione "Come è stato preparato questo report" in fondo ai report dell'assistente indica quale strumento ha fornito quale informazione. Per un numero di cui si dubita, risalire alla fonte da lì.

<!-- Fonti: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
