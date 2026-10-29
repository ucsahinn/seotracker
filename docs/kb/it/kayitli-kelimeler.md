---
title: Parole chiave salvate
description: Seguire le parole chiave salvate nell'archivio locale: periodi, osservazioni, dati mancanti, variazioni di posizione ed esportazione.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

Le ricerche importanti si salvano da **Rendimento della ricerca** o da **Monitoraggio del posizionamento**. Salvare non avvia un nuovo monitoraggio presso Google: la pagina abbina le parole salvate alle osservazioni già presenti nell'archivio locale.

## Periodo e conteggi

Il periodo può essere di 30, 90 o 180 giorni; il valore predefinito è 90. La schermata mostra le date esatte del periodo corrente e del periodo precedente di uguale durata. Le date seguono il fuso orario del Pacifico, con un ritardo presunto di tre giorni; questo ritardo non garantisce che l'archivio sia completo.

Le schede in alto contano:

- le parole salvate che superano i filtri di testo ed etichette;
- le **Parole chiave osservate** nel periodo;
- i movimenti significativi confrontabili;
- le parole con **Posizione sconosciuta**.

Le barre usano la stessa base e, con un clic, filtrano la tabella. Questi numeri non sono volumi di ricerca e non coprono tutte le query del sito. Parole salvate per mercati diversi restano separate, ma le osservazioni coprono tutti i paesi e i dispositivi.

Se nessuna parola è confrontabile, la scheda dei movimenti mostra **Nessun confronto** invece di zero. Se tutte le parole sono state osservate, la scheda **Posizione sconosciuta** non segnala osservazioni mancanti. Le schede senza risultati corrispondenti non sono cliccabili.

## Come si calcola la posizione

La posizione è una media ponderata per le impressioni. Nel confronto con le query di Google gli spazi multipli vengono ridotti e le maiuscole seguono le regole del turco, quindi I/ı resta distinto da İ/i. Le varianti originali della stessa parola si combinano in base alle impressioni.

Un dato mancante non è una posizione zero né una perdita certa. Un movimento è significativo da 0,5 posizioni in su; le variazioni minori compaiono nei dettagli. "Nessun confronto" non significa "invariato".

## Esaminare una parola

La tabella mostra parola, posizione media, variazione, impressioni ed etichette; sul telefono le misure compaiono sotto la parola. I **Dettagli dell'archivio** usano gli stessi periodi e riportano varianti originali, media precedente, giorni osservati e mercato salvato. Lì si trovano anche la data di aggiunta e l'eventuale intento registrato in passato: l'app non misura un nuovo intento.

**Mostra le osservazioni giornaliere dell'archivio** carica lo storico giorno per giorno, con le stesse date e lo stesso abbinamento. I giorni mancanti restano vuoti. Il grafico si esplora da tastiera ed esiste anche un elenco testuale dei valori.

Il collegamento secondario cerca il testo della parola negli ultimi 28 giorni di **Rendimento della ricerca**; non è la stessa misura dell'archivio.

## Filtri e ordinamento

- **Contiene**: tutti i termini devono comparire. **Non contiene**: nessuno dei termini deve comparire. Ogni campo accetta al massimo 20 termini.
- **Etichette**: basta una delle etichette scelte; si possono selezionare fino a 50 etichette. Questo non limita quante etichette può avere il progetto. I conteggi per etichetta valgono sull'intero progetto.
- Filtri, fascia di posizione, periodo, ordinamento e pagina restano nell'URL. **Cancella tutto** rimuove anche una fascia attiva senza risultati.

L'ordine predefinito è per data di aggiunta; si può ordinare anche per posizione, movimento, impressioni e parola. Ordinare per **Cali significativi** aiuta a decidere da dove partire, ma non indica la causa del calo.

La selezione di righe vale solo per la pagina corrente. Mentre un filtro o un aggiornamento è in corso, le azioni sulle righe precedenti sono bloccate. La rimozione di parole chiede conferma.

## Archivio ed esportazione

Connessione mancante, archivio mai importato, copertura parziale ed errore di lettura hanno ciascuno una spiegazione propria. **Aggiorna elenco** rilegge solo il database locale; per scaricare nuovi dati da Google si aggiorna l'archivio in **Monitoraggio del posizionamento**. Google può omettere le query rare: l'assenza di osservazioni non prova che la pagina sia assente dalla ricerca.

**Scarica CSV** ed **Esporta in Fogli Google** usano lo stesso insieme filtrato. Le prime colonne sono parola, intento, etichette e data di aggiunta; seguono posizione attuale e precedente, variazione, stato, giorni, date, copertura, varianti, ambito, mercato, ID e istantanea. Le misure sconosciute restano vuote. Se i dati cambiano durante l'esportazione, la avvii di nuovo.
