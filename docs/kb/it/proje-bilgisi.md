---
title: Contesto del progetto
description: Contesto del progetto conserva in locale obiettivi, concorrenti e note che Lei e un agente collegato possono usare. Limiti e salvataggio.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Il testo inserito qui non viene verificato. Non tutti gli agenti lo leggono automaticamente: alcuni devono essere invitati a consultarlo.

## Partire dall'obiettivo

In alto la schermata mostra quante sezioni principali sono compilate e l'obiettivo salvato. **Compila la prima sezione vuota** apre la sezione mancante; **Vai alla sezione** porta a qualsiasi altra. **Panoramica dell'attività**, obiettivo attuale, posizionamento e **Preferenze di scrittura** accettano fino a 4.000 caratteri ciascuno. Ogni sezione indica l'ultimo autore e la data esatta della modifica. **Salva modifiche** salva solo le sezioni principali modificate.

**Concorrenti** e **Pagine importanti** sono elenchi facoltativi, compilati a mano. Non misurano posizionamento né conversioni. Ogni elenco accetta 100 voci:

| Elenco            | Limiti in caratteri                      |
| ----------------- | ---------------------------------------- |
| Concorrenti       | dominio 255, nome 120, note 500          |
| Pagine importanti | indirizzo 2.048, argomento 200, note 500 |

Il ruolo di una pagina è un'etichetta scelta dall'utente. Gli agenti possono creare **Sezioni personalizzate**, che si possono modificare o rimuovere: al massimo 20, con titolo fino a 120 caratteri e contenuto fino a 4.000.

## Salvare e aggiornare

**Aggiorna** rilegge note e configurazione. Se una lettura in background non riesce, informazioni e bozze restano al loro posto e compare un avviso. Uscendo dalla pagina con modifiche non salvate, nelle sezioni principali o nei moduli in linea, compare un avviso.

Se un altro client modifica una sezione mentre la si sta scrivendo, l'intero salvataggio viene rifiutato e la bozza resta disponibile. La schermata affianca **Testo all'inizio della modifica**, **Ultimo testo salvato** e la bozza: li confronti, unisca le modifiche e salvi di nuovo. Gli agenti ottengono la stessa protezione inviando `expectedContent`; i client meno recenti che non lo inviano restano compatibili.

## Bozza con l'agente

**Prepara una bozza con l'agente** offre un prompt da copiare con **Copia prompt**. Il prompt chiede all'agente di ottenere il consenso dell'utente prima di salvare. Gli strumenti dell'app, invece, scrivono subito e non chiedono un'ulteriore conferma. Il prompt è disponibile solo dopo che l'identità del progetto è stata letta.

## Registro delle ricerche

Il **Registro delle ricerche** mostra le 20 voci più recenti degli ultimi 90 giorni; ogni voce arriva a 1.000 caratteri. La data segue il giorno UTC del server. Le voci scadute vengono filtrate a ogni lettura. Un avviso segnala quando nello stesso periodo esistono altre voci non mostrate: il registro non è una cronologia completa.

## Origine e installazione

**Origine e installazione** conta sei segnali di configurazione condivisi e distingue ciò che manca da ciò che non è stato possibile leggere. Gli elenchi facoltativi non contano. Una connessione salvata non è un test dal vivo, una chiave PageSpeed non garantisce la quota e una chiamata a uno strumento dell'installazione non prova che questo progetto sia stato letto. Il conteggio non è un punteggio SEO.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
