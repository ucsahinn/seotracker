---
title: Note di versione
description: Che cosa cambia in seowatcher 2.4.3: installazione con un solo file su Windows, aggiornamento automatico, schermate più semplici, sito in sei lingue.
updated: 2026-10-23
---

L'ultima versione è la **2.4.3**, del 23 ottobre 2026. I dati restano intatti durante l'aggiornamento; il pacchetto Windows installa da solo le nuove versioni.

## In evidenza

- **Si apre su qualsiasi computer.** Il componente di Windows mancante è incluso nel programma di installazione, quindi l'app parte al primo colpo anche su un computer appena installato.
- **Si aggiorna da sola.** Scarica la nuova versione, la verifica e la installa in silenzio. **Güncelle** (Aggiorna) nel menu della barra delle applicazioni è sempre a un clic.
- **Schermate più semplici.** Ogni schermata vuota indica un solo passo successivo; menu e testi si leggono in modo naturale.
- **Un volto nuovo.** Sfondo nero, accento arancione e logo a forma di occhio; l'app e il sito ora hanno lo stesso aspetto.
- Nella configurazione dell'assistente, «Sıfırdan kurulum» (Installazione da zero) ora è in cima per chi installa la prima volta.
- La voce Güncelle mostra il controllo, la percentuale di download e l'installazione.

## Windows

- **Avvio su un computer nuovo.** Il programma di installazione include il runtime Microsoft Visual C++ e, se manca, lo installa una volta con il consenso dell'utente.
- **Aggiorna.** Sempre nel menu della barra delle applicazioni. Installa la nuova versione se c'è, altrimenti indica «Güncel» (Aggiornata).
- **Ripara l'installazione.** Elimina i file temporanei, controlla il pacchetto e riapre l'app.
- **Segnala un problema.** Apre una segnalazione già compilata. Nomi utente, nomi dei siti e indirizzi e-mail vengono mascherati.
- **Programma di installazione con versione.** Il nome del file e la procedura guidata mostrano la versione installata.

## L'app

- **Menu laterale.** I gruppi si chiamano «Arama ve site» (Ricerca e sito) e «Ajan» (Assistente); Aiuto e Impostazioni sono in basso.
- **Configurazione dell'assistente.** Una sola scheda e un solo pulsante di copia per Claude Code, Codex o qualsiasi altro assistente.
- **Impostazioni.** Il collegamento a Google è spiegato in tre passaggi; il tema è scuro per impostazione predefinita.
- **Riconosce entrambe le installazioni.** L'aiuto e le istruzioni per l'assistente descrivono la barra delle applicazioni su Windows e i comandi `docker compose` su Docker.

## Sito e guida

- **Sei lingue.** Turco, inglese, tedesco, francese, italiano e portoghese, con un menu a bandiere.
- **Scrittura chiara.** Frasi brevi, e ogni termine tecnico è spiegato alla prima occorrenza.

## Correzioni

- Il collegamento per il download sul sito puntava al tag di versione sbagliato.
- Su Git Bash il comando di configurazione di Codex non rimuoveva l'a capo alla fine della password.
- In una scheda del controllo del sito i numeri uscivano dal riquadro.
- Con il solo account di servizio collegato, il pannello segnalava per errore la chiave di accesso Google mancante.
- Sul telefono il controllo del sito e le Opportunità uscivano lateralmente dallo schermo.

La cronologia completa è in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) su GitHub.
