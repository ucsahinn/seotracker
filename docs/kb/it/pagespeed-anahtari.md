---
title: Chiave PageSpeed
description: Salvare una chiave PageSpeed e capire test e contatori audit.
kind: nasil-yapilir
updated: 2026-10-27
---

## Aggiungere una chiave

Attiva PageSpeed Insights API in Google Cloud, crea una chiave e limita l'accesso a questa API. Salvala in Impostazioni → Misurazione velocità. È cifrata e mai mostrata. Docker accetta PAGESPEED_API_KEY; il valore salvato ha priorità.

## Significato del test

Il test invia una richiesta mobile reale per example.com. Non misura il tuo sito e non incrementa il contatore audit. Mostra risultato e data. Il pulsante resta disabilitato durante la richiesta e per almeno dieci secondi dal clic. Cambiare chiave rimuove il risultato precedente.

## Limiti e problemi

Senza chiave l'app tenta al massimo 50 pagine per audit. Google può limitare prima; una chiave non garantisce successo. Verifica la quota reale in Google Cloud. Il contatore PageSpeed copre solo audit iniziati nelle ultime 24 ore, escludendo test e altri programmi.

Chiave invalida: copiala di nuovo. Per 403 verifica API attiva e restrizioni. Attendi per limiti giornalieri o di frequenza e controlla le quote Cloud. Riprova gli errori di rete. Salvato indica configurazione; un test riuscito conferma solo quella richiesta.
