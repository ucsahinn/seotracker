---
title: Informazioni sul progetto
description: Conservare obiettivi e note del progetto in locale per te e per un assistente collegato. Capire la portata delle note e i loro limiti.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Le informazioni del progetto sono note locali per te e per un assistente collegato. Un testo compilato non è verificato e non tutti gli assistenti lo leggono automaticamente.

## Parti dall’obiettivo

In alto trovi il numero di sezioni principali compilate e l’obiettivo salvato. Apri la prima sezione vuota o usa il selettore. Attività, obiettivo attuale, posizionamento e preferenze di scrittura consentono 4.000 caratteri ciascuno. Autore e data assoluta sono visibili per sezione. Salva modifiche invia solo le sezioni principali cambiate.

Concorrenti e pagine importanti sono liste facoltative, non misure di ranking o conversioni. Ciascuna consente 100 voci. Dominio/nome/nota: 255/120/500 caratteri; indirizzo/argomento/nota: 2.048/200/500. I ruoli sono etichette tue. Gli assistenti creano sezioni personalizzate; puoi modificarle o rimuoverle. Limiti: 20 sezioni, titolo di 120 caratteri, contenuto di 4.000.

## Salvare e aggiornare

Aggiorna rilegge note e configurazione. Un errore in background conserva informazioni e bozze mostrando un avviso. Uscire con modifiche principali o nei moduli in linea non salvate attiva un avviso. Il server non impedisce ancora sovrascritture simultanee della stessa sezione: confronta il testo più recente prima di salvare.

Il prompt per l’assistente gli chiede di ottenere il tuo consenso prima di scrivere. Gli strumenti applicativi possono scrivere subito e non impongono un’ulteriore conferma. Il prompt resta indisponibile finché l’identità del progetto non è letta.

Il diario di ricerca mostra le 20 note più recenti degli ultimi 90 giorni, di 1.000 caratteri ciascuna. La data usa il giorno UTC del server. Le note scadute vengono filtrate a ogni lettura. Un avviso indica altre note nello stesso periodo. Non è la cronologia completa.

Se un altro client modifica una sezione durante la scrittura, l’intero salvataggio viene rifiutato e la bozza resta disponibile. Confronta il testo iniziale, l’ultimo testo salvato e la bozza, poi uniscili prima di riprovare. Gli agenti possono inviare `expectedContent` per la stessa protezione; i client precedenti senza questo campo restano compatibili.

Fonti e configurazione conta sei segnali condivisi distinguendo mancanze e letture fallite. Le liste facoltative non contano. Una connessione non è un test dal vivo, una chiave PageSpeed non garantisce quota, una chiamata strumento dell’installazione non prova la lettura di questo progetto. Non è un punteggio SEO.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
