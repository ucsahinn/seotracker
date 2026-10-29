---
title: Report e modelli
description: Salvare report di ricerca, controllo e agente come file HTML singoli, ritrovarli, stamparli in PDF e condividerli; modelli e limiti.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Un report è un documento HTML salvato nel progetto. Aprirlo non aggiorna i dati Google, e la data di salvataggio non coincide con la data delle misurazioni.

## Creare un report

- **Prepara report di ricerca** apre **Rendimento della ricerca**: scelga periodo, dispositivo, paese e tipo di ricerca, poi scarichi il report.
- **Prepara report di audit** apre **Controllo del sito**, dove si sceglie la scansione da cui partire.
- **Copia prompt del report** copia il comando da incollare nell'agente, che scrive il report e lo salva qui.

Il documento viene salvato prima del download e resta leggibile anche se la fonte viene scollegata. I modelli sono istruzioni per l'agente: non generano report da soli e non li pianificano.

## Trovare un report

In alto compare l'**Ultimo report aggiornato**, con il riepilogo salvato e i pulsanti per aprirlo e scaricarlo. Se mancano il riepilogo o il periodo in forma strutturata, la schermata lo indica: in quel caso controlli date e limiti nel documento. L'app non analizza titolo o HTML per ricostruirne la provenienza. Il report in alto non è un riepilogo aggiornato del sito.

**Cerca nei report** esamina titolo e riepilogo. I conteggi per tipo tengono conto della ricerca e del filtro degli ultimi sette giorni, ma non del filtro per tipo. "Ultimi sette giorni" indica i file salvati o aggiornati in quel periodo, non le singole modifiche né dati Google recenti. Il numero dei risultati e il totale del progetto sono indicati separatamente.

Il server restituisce 25 report per pagina, e tutti restano raggiungibili e ricercabili, anche oltre il centesimo. L'ordine predefinito è l'ultimo aggiornamento: modificare un vecchio file lo riporta in cima. Si può ordinare anche per data di creazione e per titolo. Ricerca, tipo, filtro recente, ordinamento e pagina restano nell'URL, quindi Indietro e il ricaricamento li conservano.

## Tipi di report

I nuovi report su rendimento della ricerca e controllo del sito hanno ciascuno un tipo salvato. I report più vecchi creati dall'app compaiono come **Report dell'app, tipo non salvato**: il loro tipo non viene dedotto dal titolo e non vengono contati come controlli. Le skill dell'agente e i nomi dei modelli salvati restano visibili. Un numero maggiore di file non indica un progresso SEO. La dimensione mostrata è quella dell'HTML salvato; il file scaricato può essere più grande per i metadati di sicurezza.

Un report di ricerca si identifica per proprietà, date e filtri; un report di audit per l'ID del controllo. Rigenerare la stessa fonte in un'altra lingua aggiorna lo stesso record e può cambiarne la lingua. Un titolo già usato da un report dell'agente viene rifiutato; se un vecchio documento ha lo stesso titolo, resta com'è e il nuovo salvataggio viene rifiutato. I titoli lunghi rispettano il limite di lunghezza e il server li distingue in base a fonte e filtri.

I report dell'app si rigenerano dalla loro schermata di origine; gli agenti non possono sostituirne il contenuto con `save_report`.

## Leggere, stampare e condividere

L'anteprima si apre in un riquadro isolato, senza script né accesso alla rete. Le informazioni su fonte e salvataggio si espandono sotto il documento. Il report mantiene la lingua in cui è stato creato; per un'altra lingua o per dati nuovi lo ricrei dalla schermata di origine.

- **Scarica come HTML** produce un file leggibile offline, da inviare come allegato.
- Il PDF si ottiene con la stampa del browser. Se la scheda di stampa è bloccata, consenta i popup oppure scelga **Apri in una nuova scheda** e stampi da lì.
- A schermo intero il focus della tastiera resta nel documento; i comandi per uscire sono sopra e sotto.

Il link al report funziona solo in questa installazione: per condividerlo, invii il file.

## Se l'anteprima non si apre

Dopo 15 secondi senza anteprima compaiono **Riprova** e **Apri in una nuova scheda**. Documento mancante, accesso negato, problema di connessione ed errore del server hanno ciascuno un'indicazione propria. Se l'aggiornamento dell'elenco non riesce, restano i dati precedenti con un avviso. Se il controllo dello spazio di archiviazione non è disponibile, questo non prova che ci sia spazio libero.

## Limiti dei dati nel report

Il report di ricerca riporta periodo effettivo, confronto, filtri e momento di creazione. I giorni seguono l'ora del Pacifico. Se Google non indica fino a quando i dati sono completi, il report dichiara il ritardo presunto. Se è stato raggiunto il limite di righe, la parte non elencata comprende sia le query nascoste sia le righe non lette. I limiti per query, pagina e coppia query-pagina influiscono sulle opportunità, non sui totali del sito.

La sezione sulle sovrapposizioni indica periodo e soglie anche quando non trova nulla; un report di sette giorni può usare 28 giorni per questa analisi. Più pagine sulla stessa query non provano clic persi o danni SEO. Dati storici o di aspetto non disponibili non diventano zero. Gli elenchi troncati indicano quante righe sono mostrate e quante osservate. Il budget di richieste riguarda la vista di ricerca e non comprende analisi aggiuntive e cache.

Creare un report rilegge i dati dal server. Google può correggere il passato e il periodo può essere ricalcolato, quindi il risultato può differire da una schermata vista in precedenza.

Il report di audit indica nella metodologia il periodo del traffico GSC, il limite di righe e l'eventuale misurazione CrUX da mobile salvata. Mostra il sito di origine quando la scansione originale permette di verificarlo; se è diverso dal sito del progetto, compare un avviso. Senza una fonte verificata il report potrebbe riguardare un altro sito, e i report precedenti sono marcati **Report precedente · fonte e data non verificate**. **Apri i controlli del sito** apre la cronologia dei controlli: se esiste un controllo adatto, lo apra e scarichi il report. Il link non avvia un controllo e non crea report; i vecchi file restano invariati.

## Modelli e limiti di archiviazione

Ogni progetto può avere dieci modelli. Il nome arriva a 80 caratteri, la descrizione a 200, le istruzioni a 3.000. Eliminare un modello non elimina i report creati con esso. **Cancella ricerca** mostra di nuovo i modelli nascosti dalla ricerca.

| Limite                   | Valore          |
| ------------------------ | --------------- |
| dimensione di un report  | 500.000 byte    |
| titolo                   | 120 caratteri   |
| riepilogo                | 2.500 caratteri |
| report per progetto      | 10.000          |
| spazio per installazione | 5 GB            |

Sono limiti di archiviazione, non misure SEO.
