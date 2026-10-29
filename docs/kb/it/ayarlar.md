---
title: Impostazioni
description: Ambito di browser, installazione e progetto; credenziali Google, contatori e versioni.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Le Impostazioni contengono le scelte che valgono per questo browser (aspetto e lingua) e per tutta l'installazione (credenziali Google, chiave PageSpeed, limiti e aggiornamenti). Nome, dominio e proprietà Google di un progetto si trovano in **Impostazioni progetto**. Questa pagina spiega l'ambito di ogni impostazione e dove cambiarla.

## Ambito delle impostazioni

Aspetto e lingua si applicano a questo browser. Scegli la lingua e conferma con il pulsante: scorrere l'elenco non ricarica la pagina. La lingua del mercato del progetto è separata.

Le credenziali Google valgono per tutta l'installazione; l'account di servizio ha priorità. Credenziali salvate e proprietà selezionata non provano l'accesso ai dati. Un errore di lettura conserva l'ultima configurazione con un nuovo tentativo. Seleziona il file JSON o usa il campo di incolla mascherato, poi salva. La chiave privata non viene mostrata.

Nome, dominio e proprietà si gestiscono nelle impostazioni del progetto. Cambiare dominio conserva collegamento Google e storico. Paese e lingua sono valori predefiniti delle parole chiave salvate; Rendimento di ricerca ha un filtro paese distinto.

## Windows, velocità e limiti

Le preferenze Windows sono confermate dall'app nella barra di sistema. Docker non mostra interruttori. Un launcher non raggiungibile significa sconosciuto, non disattivato. Riprova; i blocchi amministrativi sono spiegati.

Senza chiave PageSpeed, l'app tenta al massimo 50 pagine per audit. Google può limitare prima; la chiave non garantisce successo. Il test invia una richiesta mobile per example.com, esclusa dal contatore audit. Mostra la data; cambiare chiave rimuove il risultato precedente.

Scegli il progetto in Limiti. Controllo URL conta i tentativi locali della proprietà nelle ultime 24 ore. PageSpeed conta audit iniziati nel periodo. Il saldo GA4 risale all'ultima risposta; i limiti standard sono ipotesi. Fonti vecchie o mancanti sono sconosciute. Le pagine provengono dall'ultimo audit completato del dominio; report e modelli coprono l'intero progetto.

## Versioni

Il controllo nell'app consulta GitHub al massimo ogni sei ore. L'app Windows può controllare ogni giorno indipendentemente; l'installazione automatica si gestisce in Windows. La data dell'ultimo successo qualifica la versione nota. Attendi in caso di limiti/restrizioni e riprova; usa la diagnostica Aiuto per una fonte assente. Un'impostazione illeggibile non può essere modificata.

## Notifiche di Windows

Fai clic destro sull’icona seowatcher nell’area di notifica e usa **Windows bildirimleri** (attiva per impostazione predefinita). Finché il programma di avvio è in esecuzione, le verifiche completate o non riuscite di tutti i progetti e i nuovi annunci appaiono come fumetti Windows entro circa 90 secondi, anche con il browser chiuso o in secondo piano. Un clic apre la pagina relativa; più eventi vengono riuniti. Il primo avvio ignora gli eventi precedenti; il riavvio non ripete quelli già ricevuti. Gli eventi ricevuti con le notifiche disattivate non vengono mostrati in seguito. Le nuove versioni seguono l’impostazione di aggiornamento esistente. La modalità Concentrazione/Non disturbare può nascondere le notifiche. Nessuna notifica con il programma di avvio chiuso. Questa funzione non è disponibile in Docker.
