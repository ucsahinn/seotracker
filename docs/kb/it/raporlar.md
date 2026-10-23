---
title: Report e modelli
description: Ogni report scaricato dal controllo o fatto scrivere all'assistente è un solo file HTML. Si apre sul telefono, si stampa, si invia per e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Qui si trova come ottenere il report, a chi inviarlo e come ripeterlo con un modello.

Ogni report preparato per questo progetto sta in un unico elenco nella schermata **Raporlar** (Report). Un report nasce in due modi. Il pulsante **Raporu indir** (Scarica il report) della schermata Site denetimi (Controllo del sito) produce il report proprio dell'app. L'assistente di intelligenza artificiale, invece, fa una ricerca e salva ciò che trova come report. Ogni report è un solo file HTML. Non contiene script (codice che gira nella pagina), risorse esterne né caratteri incorporati. Per questo si apre sul telefono, si stampa in PDF, si invia per e-mail. Nell'app non c'è un editor per scrivere i report a mano. Il report lo scrive l'app oppure l'assistente.

## Cosa c'è nella schermata

**Barra superiore.** Il pulsante **Yeni rapor iste** (Richiedi un nuovo report) copia negli appunti un testo da incollare nell'assistente.

**Filtri.** Ci sono i filtri Tümü (Tutti), Son 7 gün (Ultimi 7 giorni), Şablonla yazılan (Scritti con un modello) e Beceriyle yazılan (Scritti con una skill). Compare anche una casella di ricerca.

**Tabella.** Le colonne sono **Rapor** (Report), **Tür** (Tipo), **Oluşturulma** (Creazione) e **Boyut** (Dimensione). La colonna **Tür** dice quale lavoro ha prodotto il report. Per esempio "Site denetimi raporu" (Report del controllo del sito) è quello dell'app stessa. Nei report scritti con un modello si vede il nome del modello.

**Pagina del report.** Il report si apre nella propria cornice sicura. Ci sono tre pulsanti: **HTML olarak indir** (Scarica come HTML), copia del collegamento e stampa. Il collegamento si apre solo su questa installazione: dall'esterno nessuno può accedervi.

**Modelli di report.** Vi si arriva dal menu o dalla schermata Raporlar. Un modello è una ricetta salvata che spiega all'assistente come scrivere il report. Si indica chi leggerà il report, quali sezioni avrà e in quale lingua sarà scritto. Ci sono tre campi:

- **Ad** (Nome) è al massimo di 80 caratteri e deve essere unico nel progetto.
- **Açıklama** (Descrizione) è al massimo di 200 caratteri. Scrivere in una frase quando usare il modello.
- **Yönerge** (Istruzioni) è al massimo di 3.000 caratteri.

In un progetto possono esserci al massimo 10 modelli. Se si elimina un modello, i report prodotti con quel modello non vengono eliminati.

## Come si usa

1. Per il primo report, nella schermata Site denetimi fare clic su **Raporu indir**. Il report viene scaricato sul computer e finisce in questo elenco. Comincia con la sezione "Bu hafta yapılacak N şey" (N cose da fare questa settimana).
2. Se si lavora con l'assistente, fare clic su **Yeni rapor iste**. Incollare il testo copiato in Claude Code, Codex o Cursor. L'assistente chiede quale report si vuole, legge i dati e salva qui il report.
3. Se si vuole lo stesso report ogni mese, scrivere un modello. Nelle istruzioni indicare chi legge ("la persona che gestisce il sito, non conosce la SEO"), le sezioni, l'ordine e il tono. Quando si chiede il modello per nome, l'assistente lo applica.
4. Per condividere, fare clic su **HTML olarak indir** e inviare il file. Chi lo riceve lo apre nel browser. Copiare il collegamento serve solo sullo stesso computer.
5. Non eliminare i vecchi report. Nella conversazione successiva l'assistente legge il riepilogo del report precedente e lo confronta.

## Come si calcolano i numeri

Il report del controllo è impaginato per la stampa in A4. Contiene le sezioni indice, "Bu hafta yapılacak N şey", problemi, misurazione della velocità, stato dell'indice di Google e mappa del sito. La sezione sullo stato dell'indice usa solo le risposte registrate e non pone nuove domande a Google.

Gli elenchi hanno dei limiti: 50 indirizzi per problema, 300 pagine, 50 righe di velocità, 3.000 indirizzi in allegato. Se il file supera 400 KB, gli elenchi si accorciano.

Un report può pesare al massimo 500.000 byte (si consigliano meno di 80 KB). Il titolo è al massimo di 120 caratteri e unico nel progetto. Il riepilogo è al massimo di 2.500 caratteri. Un secondo report con lo stesso titolo non viene accettato. In un progetto si conservano al massimo 10.000 report e nell'installazione sono riservati 5 GB in totale.

Per sicurezza, i file che contengono script, iframe (un riquadro che incorpora un'altra pagina in una pagina), moduli, stili esterni, gestori di eventi (come onclick), collegamenti javascript: o reindirizzamenti automatici vengono respinti al salvataggio. Inoltre, quando il report viene aperto, è mostrato in un riquadro chiuso e senza accesso alla rete. Quindi un report non può inviare nulla all'esterno a insaputa dell'utente.

## Domande frequenti

**Chi ha scritto il report?** Guardare la colonna **Tür**. "Site denetimi raporu" è dell'app, gli altri li ha scritti l'assistente. Anche nella pagina del report si vede chi l'ha salvato.

**Si può modificare il report?** Nell'app no. Dire all'assistente "cambia questa sezione" e lui aggiorna il report.

**Il collegamento è stato inviato, ma l'altra persona non riesce ad aprirlo.** Il collegamento funziona solo su questo computer. Inviare il file con **HTML olarak indir**.

**A che cosa fare attenzione scrivendo un modello?** Il modello è una ricetta di formato, non una fonte di informazioni. Scrivere le sezioni, il tono e per chi è scritto il report. Non scrivere numeri o affermazioni. L'assistente prende i numeri ogni volta dai dati.

## Limiti

I report non vengono pubblicati all'esterno. Per condividerli si invia il file. L'esattezza del report dipende dai dati letti da chi lo ha scritto. In fondo ai report dell'assistente c'è la sezione "Bu rapor nasıl hazırlandı" (Come è stato preparato questo report). Lì si vede quale strumento ha detto che cosa. Per un numero di cui si dubita, risalire alla fonte da quella sezione.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
