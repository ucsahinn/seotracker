---
title: Chiave PageSpeed
description: Salvare la chiave API di PageSpeed Insights, interpretare la prova della chiave e capire quote e contatori del controllo del sito.
kind: nasil-yapilir
updated: 2026-10-27
---

Con una chiave API di PageSpeed Insights, il controllo del sito misura la velocità delle pagine tramite il servizio di Google. La chiave è gratuita e facoltativa: senza chiave l'app tenta di misurare al massimo 50 pagine per controllo, e Google può fermare le richieste anche prima.

## Aggiungere una chiave

1. In Google Cloud attivi la PageSpeed Insights API.
2. Crei una chiave API e la limiti a questa sola API.
3. La salvi in **Impostazioni → Test di velocità**.

La chiave viene cifrata e non è mai mostrata. In Docker si può usare anche la variabile `PAGESPEED_API_KEY`; il valore salvato in **Impostazioni** ha la precedenza.

## Che cosa dimostra la prova

**Prova la chiave** invia una richiesta reale da dispositivo mobile per example.com. Non misura il Suo sito e non incrementa il contatore dei controlli. Al termine compaiono risultato e data. Il pulsante resta disattivato durante la richiesta e per almeno dieci secondi dal clic. Cambiando chiave, il risultato precedente viene rimosso.

Una chiave salvata conferma solo la configurazione; una prova riuscita conferma solo quella singola richiesta.

## Quote e problemi

Una chiave non garantisce che tutte le misure riescano. La quota reale si controlla in Google Cloud. Il contatore PageSpeed in **Impostazioni** comprende solo i controlli avviati nelle ultime 24 ore; esclude le prove della chiave e gli altri programmi.

- **Chiave non valida**: la copi di nuovo.
- **Errore 403 o accesso limitato**: verifichi che l'API sia attiva e controlli le restrizioni della chiave.
- **Limite giornaliero o di frequenza**: attenda e controlli le quote in Google Cloud.
- **Errore di rete**: riprovi.
