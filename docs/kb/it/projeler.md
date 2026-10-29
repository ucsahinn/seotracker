---
title: Progetti
description: Progetti elenca i siti monitorati e indica le connessioni mancanti. Ogni progetto ha proprietà Google, controlli e report propri.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

## Leggere la schermata

Con più progetti, l'elenco si può cercare e ordinare per nome o dominio. **Ultimo aperto** indica il progetto ricordato da questo browser; non è uno stato SEO. Il pulsante principale cambia secondo la configurazione: **Aggiungi sito**, **Collega Search Console** oppure **Apri dashboard**. **Contesto del progetto** apre le note, **Impostazioni** apre la configurazione.

### Archivio di ricerca

La riga **Archivio di ricerca · Web · tutti i dispositivi e paesi** riassume i dati di ricerca salvati in locale. Il periodo termina all'ultimo giorno registrato, che può essere lontano nel tempo; le date sono sempre indicate. Se mancano giorni, i clic sono il subtotale dei soli giorni osservati. Nel grafico un giorno mancante resta vuoto e non vale zero.

La variazione compare solo quando entrambi i periodi sono completi. Totali uguali risultano invariati; una variazione da zero mostra entrambi i conteggi. Se il periodo precedente ha meno di 20 clic, il badge mostra la differenza in clic invece della percentuale: da 1 a 5 clic si legge +4 clic. Con numeri così piccoli la variazione non dimostra una crescita.

I dettagli riportano l'ultimo giorno salvato e, quando è noto, l'orario della lettura. I record meno recenti non indicano su quale base un giorno è stato considerato definitivo.

### Controllo e connessioni

Il controllo riguarda l'host del sito scelto. L'ultimo controllo completato resta distinto da un tentativo più recente non riuscito o ancora in corso. Una connessione salvata non garantisce che la lettura da Google sia riuscita. Una fonte non leggibile non equivale a una fonte scollegata né a un valore zero: riprovi più tardi. **Aggiorna** rilegge identità e dati locali; non interroga Google e non avvia controlli.

## Creare e gestire

**Nuovo progetto** chiede nome, paese, lingua e, facoltativamente, il dominio. La creazione non raccoglie dati. Le proprietà Google si scelgono in **Impostazioni progetto → Connessioni**: ogni progetto ha una proprietà Search Console e una Google Analytics. In **Generale** si modificano identità e mercato.

**Archivia progetto** toglie il progetto dalla barra laterale senza cancellare dati; **Ripristina** lo rende di nuovo visibile. L'unico progetto rimasto non si può archiviare.

I clic di questa schermata non coincidono con le sessioni GA4 né con i totali per query dell'archivio. Periodi diversi non vengono sommati.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
