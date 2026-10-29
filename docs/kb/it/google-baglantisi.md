---
title: Collegamento con Google
description: Collegare Search Console e GA4 con un account di servizio Google Cloud o un client OAuth, poi scegliere le proprietà di ogni progetto.
kind: nasil-yapilir
updated: 2026-10-27
---

La credenziale si salva una sola volta e vale per tutta l'installazione. La proprietà, invece, si sceglie per ogni progetto: una per Search Console e una per Google Analytics 4.

## Credenziali e proprietà

Le credenziali Google salvate in **Impostazioni** (sezioni **Google** e **Account di servizio**) valgono per l'intera installazione. La proprietà scelta in **Impostazioni progetto → Connessioni** vale solo per quel progetto. Gli stati "salvata" e "proprietà selezionata" confermano la configurazione, non l'accesso ai dati. L'accesso si verifica aprendo **Rendimento della ricerca** o **Analytics**. Scegliere una proprietà non installa alcun codice di monitoraggio sul sito.

## Account di servizio

È il metodo più breve.

1. In Google Cloud attivi la Search Console API e, per Analytics, la Admin API e la Data API.
2. Crei un account di servizio e scarichi la sua chiave JSON.
3. In **Impostazioni → Account di servizio** selezioni il file oppure usi **Incolla il contenuto JSON mantenendolo nascosto**, poi salvi. La chiave privata non viene mai mostrata.
4. Aggiunga l'indirizzo email dell'account mostrato a Search Console come utente con accesso completo e ad Analytics con ruolo Visualizzatore.
5. Scelga la proprietà in ogni progetto.

## OAuth in alternativa

Crei in Google Cloud un client OAuth di tipo "Applicazione web". Registri esattamente i due URL di reindirizzamento mostrati in **Impostazioni**. Salvi **ID client** e **Segreto client**, poi autorizzi l'account Google da **Connessioni** del progetto e scelga la proprietà. Se è salvato anche un account di servizio, ha la precedenza su OAuth.

## Se qualcosa non funziona

Se l'aggiornamento dell'elenco non riesce, restano visibili le proprietà precedenti. Un elenco vuoto, da solo, non prova la mancanza di accesso.

- **Autorizzazione scaduta**: ricolleghi l'account.
- **Accesso negato**: controlli i permessi sulla proprietà.
- **API disattivata**: la attivi nel progetto Google Cloud.
- **Limite di richieste**: attenda e riprovi.
- **Errore sconosciuto**: riprovi e apra la diagnostica in **Aiuto**.

Eliminare una credenziale qui non la revoca in Google. Cambiare il dominio del progetto conserva la proprietà collegata e lo storico.

## Ultima lettura

La scheda di connessione mostra la data dell'ultima lettura da Google già osservata con la credenziale e la proprietà attuali. Dopo un errore temporaneo resta la data dell'ultima lettura riuscita; senza storico l'accesso risulta non verificato. La scheda mostra anche fuso orario e valuta della proprietà Analytics. Aprire le impostazioni non invia richieste a Google. Dopo un cambio di credenziale, le prove di accesso e di quota precedenti non passano alla nuova identità: aggiorni i report.
