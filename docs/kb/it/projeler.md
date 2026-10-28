---
title: Progetti
description: Progetti aiuta a scegliere un sito e completare le connessioni. Ogni progetto conserva le proprie proprietà Google, verifiche e rapporti.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Progetti aiuta a scegliere un sito e completare le connessioni. Ogni progetto conserva le proprie proprietà Google, verifiche e rapporti.

## Leggere la schermata

Con più progetti puoi cercare e ordinare per nome o dominio. **Ultimo aperto** indica il progetto ricordato dal browser, non uno stato SEO. L’azione principale permette di aggiungere il sito, collegare Search Console o aprire la panoramica secondo la configurazione nota. Le informazioni del progetto aprono le note; le impostazioni aprono la configurazione.

L’archivio di ricerca contiene dati Web locali per tutti i dispositivi e paesi. Le date sono visibili. La finestra termina all’ultimo giorno registrato, che può essere vecchio. Se mancano giorni, i clic sono il subtotale delle sole osservazioni presenti. Un giorno mancante è uno spazio nel grafico, non zero. Il confronto richiede due periodi completi. Totali uguali sono indicati come invariati; partendo da zero compaiono i conteggi precedenti e attuali. I dettagli mostrano ultimo giorno e orario di lettura disponibile. I vecchi record non conservano la prova della definitività.

La verifica riguarda l’host del sito scelto. L’ultima completata è distinta da un tentativo più recente fallito o in corso. Una connessione salvata non dimostra una lettura Google riuscita. Una fonte illeggibile non è né scollegata né uno zero misurato: riprova. Aggiornare rilegge identità e dati locali senza chiamare Google o avviare verifiche.

## Creare e gestire

Nuovo progetto richiede nome, dominio facoltativo, paese e lingua. Crearlo non raccoglie dati. Scegli le proprietà Google in Impostazioni → Connessioni. Le impostazioni generali cambiano identità e mercato. Ogni progetto ha una proprietà Search Console e una Analytics.

Archiviare conserva i dati; Ripristina rende nuovamente visibile il progetto. L’ultimo progetto non può essere archiviato. I clic differiscono da sessioni GA4 e totali dell’archivio delle query. Periodi diversi non vengono sommati.

Quando il periodo precedente ha meno di 20 clic, il badge mostra la differenza di clic anziché una percentuale. Passare da 1 a 5 significa per esempio +4 clic; con numeri piccoli, questa variazione da sola non dimostra una forte crescita.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
