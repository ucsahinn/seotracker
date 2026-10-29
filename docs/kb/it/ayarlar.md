---
title: Impostazioni
description: Che cosa vale per il browser, per l'installazione o per il progetto: lingua, credenziali Google, chiave PageSpeed, limiti, aggiornamenti.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Nome, dominio e proprietà Google di un singolo progetto non sono qui: si trovano in **Impostazioni progetto**.

## A che cosa si applica ogni impostazione

| Impostazione                                                             | Ambito                                    |
| ------------------------------------------------------------------------ | ----------------------------------------- |
| **Aspetto**, **Lingua**                                                  | questo browser                            |
| **Google**, **Account di servizio**, **Test di velocità**, aggiornamenti | tutta l'installazione                     |
| **Limiti di Google e di sistema**                                        | un progetto alla volta                    |
| nome, dominio, paese, lingua del mercato, proprietà Google               | il progetto, in **Impostazioni progetto** |

La lingua si sceglie dall'elenco e si conferma con **Applica lingua**: spostarsi con i tasti freccia non ricarica la pagina. La lingua del mercato del progetto è un'impostazione separata.

## Credenziali Google

Le credenziali valgono per tutti i progetti; se sono salvati sia un account di servizio sia un client OAuth, prevale l'account di servizio. Selezioni il file JSON dell'account di servizio oppure usi il campo di incolla nascosto, poi salvi. La chiave privata non viene mai mostrata. Credenziali salvate e proprietà selezionata non dimostrano l'accesso ai dati. Se una lettura non riesce, resta visibile l'ultima configurazione insieme al pulsante per riprovare. La procedura completa è in [Collegamento con Google](/docs/google-baglantisi/).

In **Impostazioni progetto**, cambiare dominio conserva il collegamento a Google e lo storico. Paese e lingua del progetto sono i valori predefiniti di **Parole chiave salvate**; **Rendimento della ricerca** ha un proprio filtro per paese.

## Windows, velocità e limiti

Le preferenze **Windows** vengono lette dall'app nell'area di notifica. In Docker la sezione è solo informativa, senza interruttori. Se il programma di avvio non risponde, lo stato è sconosciuto, non disattivato: riprovi. Se un amministratore ha bloccato un'impostazione, la schermata lo spiega.

In **Test di velocità** si salva la chiave PageSpeed. Senza chiave l'app tenta al massimo 50 pagine per controllo. I dettagli sono in [Chiave PageSpeed](/docs/pagespeed-anahtari/).

In **Limiti di Google e di sistema** i contatori valgono per un progetto alla volta: lo si sceglie prima in **Progetto di cui sono mostrati i limiti**.

- **Controllo URL**: tentativi locali sulla proprietà nelle ultime 24 ore.
- **PageSpeed**: controlli avviati nelle ultime 24 ore.
- **GA4**: quota residua dell'ultima risposta di Google; il tetto delle proprietà standard è un'ipotesi.
- **Pagine**: provengono dall'ultimo controllo completato del dominio del progetto.
- **Report e modelli**: tutto il progetto.

Un dato vecchio o mancante viene indicato come sconosciuto.

## Aggiornamenti

Il controllo della versione nell'app interroga GitHub al massimo ogni sei ore. L'app Windows può controllare ogni giorno in modo indipendente; l'installazione automatica si regola tra le preferenze Windows. La data dell'ultimo controllo riuscito indica quanto è recente l'informazione sulla versione. In caso di limiti o restrizioni, attenda e riprovi; se la fonte manca, usi la diagnostica in **Aiuto**. Un'impostazione non leggibile non si può modificare.

## Notifiche di Windows

Faccia clic con il tasto destro sull'icona di seowatcher nell'area di notifica e usi **Windows bildirimleri** (Notifiche di Windows), attiva per impostazione predefinita. Finché il programma di avvio è in esecuzione, i controlli completati o non riusciti di tutti i progetti e i nuovi annunci compaiono come notifiche di Windows entro circa 90 secondi, anche con il browser chiuso o in secondo piano.

- Un clic sulla notifica apre la pagina relativa; più eventi vengono riuniti in un unico riepilogo.
- Al primo avvio gli eventi precedenti vengono ignorati; un riavvio non ripete quelli già mostrati.
- Gli eventi arrivati con le notifiche disattivate non vengono mostrati in seguito.
- Le notifiche di nuove versioni seguono l'impostazione degli aggiornamenti.
- La modalità Non disturbare di Windows può nasconderle.

Con il programma di avvio chiuso non arriva alcuna notifica. La funzione non esiste in Docker.
